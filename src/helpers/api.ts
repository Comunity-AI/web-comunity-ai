export async function getInfo(id: string, serviceName: string) {
    const cacheKey = `${serviceName}/${id}`;
    
    const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${cacheKey}`);
    if (req.status == 404) {
        return { error: true, notFound: true };
    } else if (req.status >= 400) {
        return { error: true };
    }

    const res = await req.json();

    return res;
}

export async function getPreview(id: string) {
    const cacheKey = `preview/${id}`;

    const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${cacheKey}`);
    const res = await req.json();

    if (req.status == 404) {
        return { error: true, notFound: true };
    } else if (req.status >= 400) {
        return { error: true };
    }

    return res;
}