"use client";

import { useEffect, useState } from "react";
import { Article } from "../interfaces";
import ImgBanner from "../components/imgBanner";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Error500 from "@/components/errors/500/500";
import Loader from "@/components/utils/loader";
import NotFound from "@/components/errors/404/bosque";
import { BLOCKS } from '@contentful/rich-text-types';
import Paragraph from "../components/paragraph";
import Navbar from "@/components/nav/navbar";

export default function RouteBlog({ params }: { params: { tag: string[] } }) {
    const [article, setArticle] = useState<Article | null>(null);
    const [error404, setError404] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (params.tag.length < 2) {
            <div className="h-screen flex m-auto"><NotFound /></div>;
            return
        };

        const fetchArticle = async () => {
            try {
                const req = await fetch(`/api/blog/view-article?slug=${params.tag[1]}`);
                if(req.status === 404){
                    setError404('No se pudo encontrar el artículo');
                }

                const items = await req.json();
                console.log({items})
                if (items) {
                    setArticle((items as Article));
                }
            } catch (err) {
                setError('No se pudo cargar el artículo');
            }
        };

        fetchArticle();
    }, [params.tag]);

    if (error) {
        return <Error500 />;
    }

    if (error404) {
        return <div className="h-screen flex m-auto"><NotFound error={error404} /></div>;
    }

    if (!article) {
        return <Loader />;
    }

    const bannerImgData = {
        url: article.fields.featuredImage.fields.file.url,
        title: article.fields.title,
        description: article.fields.shortDescription,
        publishDate: article.sys.createdAt,
    }

    const options = {
        renderNode: {
            [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
                const { title, description, file } = node.data.target.fields;
                return <img src={file.url} alt={title} title={description} />;
            },
            [BLOCKS.PARAGRAPH]: (node: any, children: any) => <Paragraph>{children}</Paragraph>
        }
    };

    return (
        <>
            <Navbar />
            <div className="w-full flex justify-center relative h-full">
                <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
                <div className="relative w-3/4">
                    <ImgBanner {...bannerImgData} />
                    <div className="w-2/3 grid mx-auto mt-10">
                        {
                            //@ts-ignore
                            article.fields.content && documentToReactComponents(article.fields.content, options)
                        }
                    </div>
                </div>
            </div>
        </>
    );
}
