import { NextResponse } from 'next/server';
import { getProjects } from '@/lib/projects';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const language = searchParams.get('lang') || 'fr';
    
    const projects = await getProjects(language);
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error loading projects:', error);
    return NextResponse.json({ error: 'Failed to load projects' }, { status: 500 });
  }
}