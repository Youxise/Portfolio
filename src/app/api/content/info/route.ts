import { NextResponse } from 'next/server';
import { getInfoContent } from '@/lib/markdown';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const language = searchParams.get('lang') || 'fr';
    
    const content = await getInfoContent(language);
    return NextResponse.json({ content });
  } catch (error) {
    console.error('Error loading info content:', error);
    return NextResponse.json({ error: 'Failed to load info content' }, { status: 500 });
  }
}