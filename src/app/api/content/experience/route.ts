import { NextResponse } from 'next/server';
import { getExperienceContent } from '@/lib/markdown';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const language = searchParams.get('lang') || 'fr';
    
    const content = await getExperienceContent(language);
    return NextResponse.json({ content });
  } catch (error) {
    console.error('Error loading experience content:', error);
    return NextResponse.json({ error: 'Failed to load experience content' }, { status: 500 });
  }
}