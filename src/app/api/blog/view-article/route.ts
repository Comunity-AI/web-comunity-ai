import { NextResponse } from 'next/server';
import { getArticleBySlug } from '@/utils/contentful';

export async function POST() {
    return NextResponse.json({ message: 'GET method not allowed' }, { status: 405 });
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    if (!slug) {
        return NextResponse.json({ message: 'Slug is required' }, { status: 400 });
    }
    const article = await getArticleBySlug(slug);
    if (!article) {
        return NextResponse.json({ message: 'Article not found' }, { status: 404 });
    }
    return NextResponse.json(article);
}