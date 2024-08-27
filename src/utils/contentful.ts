// utils/contentful.js
import { createClient, EntryCollection } from 'contentful';

export const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID || '',
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || '',
});

export async function getArticles() {
    const response: EntryCollection<any> = await client.getEntries({
        content_type: 'pageBlogPost',
    });
    return response.items;
}

export async function getArticleBySlug(slug: string): Promise<any> {
    const response: EntryCollection<any> = await client.getEntries({
        content_type: 'pageBlogPost',
        'fields.slug': slug,
    });
    return response.items[0];
}