import { NextResponse } from 'next/server';
import { getEducationContent } from '@/lib/markdown';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const language = searchParams.get('lang') || 'fr';
    
    const content = await getEducationContent(language);
    return NextResponse.json({ content });
  } catch (error) {
    console.error('Error loading education content:', error);
    return NextResponse.json({ error: 'Failed to load education content' }, { status: 500 });
  }
}