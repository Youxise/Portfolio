import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface MarkdownContent {
  data: Record<string, any>;
  content: string;
}

export async function getMarkdownContent(
  filePath: string,
  language: string = 'fr'
): Promise<MarkdownContent | null> {
  const contentDirectory = path.join(process.cwd(), 'src/content');
  
  try {
    // Try to load language-specific file first
    const languageFile = filePath.replace('.mdx', `.${language}.mdx`);
    const languageFilePath = path.join(contentDirectory, languageFile);
    
    if (fs.existsSync(languageFilePath)) {
      const fileContents = fs.readFileSync(languageFilePath, 'utf8');
      const { data, content } = matter(fileContents);
      return { data, content };
    }
    
    // Fall back to default file
    const defaultFilePath = path.join(contentDirectory, filePath);
    if (fs.existsSync(defaultFilePath)) {
      const fileContents = fs.readFileSync(defaultFilePath, 'utf8');
      const { data, content } = matter(fileContents);
      return { data, content };
    }
    
    return null;
  } catch (error) {
    console.warn(`Error reading markdown file ${filePath}:`, error);
    return null;
  }
}

export async function getEducationContent(language: string = 'fr'): Promise<string> {
  const content = await getMarkdownContent('education.mdx', language);
  return content?.content || '';
}

export async function getExperienceContent(language: string = 'fr'): Promise<string> {
  const content = await getMarkdownContent('experience.mdx', language);
  return content?.content || '';
}

export async function getInfoContent(language: string = 'fr'): Promise<string> {
  const content = await getMarkdownContent('info.mdx', language);
  return content?.content || '';
}