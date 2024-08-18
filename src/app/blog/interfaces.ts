export interface Tag {
    sys: {
        id: string;
        linkType: string;
    }
}

export interface Content {
    nodeType: string;
    data: {}, 
    content: {
        data: {},
        nodeType: string;
        value: string;
    }[],
}

export interface FeaturedImage {
    fields: {
        description: string;
        title: string;
        file: {
            url: string;
            details: {
                size: number;
                image: {
                    width: number;
                    height: number;
                }
            }
        };
        content: Content
    };
}

export interface Fields {
    shortDescription: string;
    category: string;
    slug: string;
    title: string;
    content: Content[];
    featuredImage: FeaturedImage;
}

export interface Article {
    sys: {
        id: string;
        createdAt: string;
    };
    metadata: {
        tags: Tag[];
    };
    fields: Fields;
}

export interface Articulos {
    News: Article[],
    Research: Article[],
    Blog: Article[],
    [key: string]: Article[]
}
