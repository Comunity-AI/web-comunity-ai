import { NextResponse } from 'next/server';
import { getArticles } from '@/utils/contentful';

export async function POST() {
    return NextResponse.json({ message: 'GET method not allowed' }, { status: 405 });
}

export async function GET() {
    const articles = await getArticles();
    return NextResponse.json(articles);
}