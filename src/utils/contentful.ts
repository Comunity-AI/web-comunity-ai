// utils/contentful.js
import { createClient, EntryCollection } from 'contentful';

export const client = createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || '',
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN || '',
});

export async function getArticles() {
    const response: EntryCollection<any> = await client.getEntries({
        content_type: 'pageLanding', // Cambia 'article' por el ID de tu tipo de contenido
    });
    return response.items;
}