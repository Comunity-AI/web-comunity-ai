"use client";

import { getArticleBySlug } from "@/utils/contentful";
import { useEffect, useState } from "react";
import { Article } from "../interfaces";
import ImgBanner from "../components/imgBanner";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Error500 from "@/components/errors/500/500";
import Loader from "@/components/utils/loader";


export default function RouteBlog({ params }: { params: { tag: string[] } }) {
    const [article, setArticle] = useState<Article | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                console.log(params.tag[1])
                const items = await getArticleBySlug(params.tag[1]);
                console.log({ items });
                setArticle((items as Article));
            } catch (err) {
                setError('No se pudo cargar el artículo');
                console.error(err);
            }
        };

        fetchArticle();
    }, [params.tag]);

    if (error) {
        return <Error500 />;
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

    return (

        <div className="w-full flex justify-center relative h-full">
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>            
            <div className="relative w-3/4">
                <ImgBanner {...bannerImgData} />
                <div className="w-2/3 grid gap-4 mx-auto mt-10">
                    {
                        //@ts-ignore
                        article.fields.content && documentToReactComponents(article.fields.content)
                    }
                </div>
            </div>
        </div>
    );
}
