import { Project } from './types';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function getProjects(language: string = 'fr'): Promise<Project[]> {
  const projectsDirectory = path.join(process.cwd(), 'src/content/projects');
  
  try {
    const filenames = fs.readdirSync(projectsDirectory);
    
    // Get unique project slugs by filtering out language extensions
    const projectSlugs = new Set<string>();
    filenames
      .filter(name => name.endsWith('.mdx'))
      .forEach(name => {
        const slug = name.replace(/\.(en|fr)\.mdx$/, '').replace(/\.mdx$/, '');
        projectSlugs.add(slug);
      });
    
    const projects = Array.from(projectSlugs).map(slug => {
      // Try to load language-specific file first, then fall back to default
      // For 'fr', try default file first (since .mdx files are in French)
      const languageFile = `${slug}.${language}.mdx`;
      const defaultFile = `${slug}.mdx`;
      
      let filePath: string;
      let fileName: string;
      
      // For French, prefer the default .mdx file (which is in French)
      if (language === 'fr' && filenames.includes(defaultFile)) {
        fileName = defaultFile;
        filePath = path.join(projectsDirectory, defaultFile);
      } else if (filenames.includes(languageFile)) {
        fileName = languageFile;
        filePath = path.join(projectsDirectory, languageFile);
      } else if (filenames.includes(defaultFile)) {
        fileName = defaultFile;
        filePath = path.join(projectsDirectory, defaultFile);
      } else {
        return null; // Skip if neither file exists
      }
      
      try {
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContents);
        
        return {
          ...data,
          body: content,
        } as Project;
      } catch (error) {
        console.warn(`Error reading project file ${fileName}:`, error);
        return null;
      }
    }).filter(Boolean) as Project[];
    
    return projects;
  } catch (error) {
    console.warn('Projects directory not found, returning empty array');
    return [];
  }
}