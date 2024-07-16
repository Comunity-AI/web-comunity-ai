"use client";

import Banner from "@/components/publicaciones/banner/banner";
import MDEditor from '@uiw/react-md-editor';
import Preview from "@/components/publicaciones/preview/preview";
import { useEffect, useState } from "react";
import Loader from "@/components/utils/loader";

interface ResponseDs {
    uuid: string;
    bannerURL: string;
    titulo: string;
    tags: string[];
    name: string;
    descripcion: string;
    contenido: string;
    created_at: string;
    autor_name: string;
    autor: object;
}

interface ResponsePreview {
    preview: string;
    filename: string;
    url: string;
    description: string;
    mime_type: string;
    image: string;
}
async function getInfo(id: string) {
    const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dataset/${id}`)
    const res = await req.json()
    return res
}

async function getPreview(id:string) {
    const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/preview/${id}`)
    const res = await req.json()
    return res
}

export default function ShowDataset({ params }: { params: { id: string } }) {
    const { id } = params;
    const [data, setData] = useState<ResponseDs | null>(null);
    const [preview, setPreview] = useState<ResponsePreview | null>(null);

    useEffect(() => {
        // Esta función se ejecutará una vez al montar el componente
        fetchData(id, setData);
    }, [id]);

    useEffect(() => {
        // Esta función se ejecutará cuando data haya sido cargado
        if (data) {
            fetchPreview(id, setPreview);
        }
    }, [data, id]);

    // Renderizar un spinner o mensaje de carga mientras los datos están siendo cargados
    if (!data) {
        return <Loader/>;
    }

    return (
        <div className="mx-auto w-5/6 h-full">
            <Banner titulo={data.titulo} description={data.descripcion} imageURL={`${process.env.NEXT_PUBLIC_API_URL}/image/${data.bannerURL}` || "https://th.bing.com/th/id/OIP.-hglU4IZ_6pcYLDEcTIn-gHaFA?w=740&h=501&rs=1&pid=ImgDetMain"} />
            <div className="my-5">
                <MDEditor.Markdown source={data.contenido} style={{ whiteSpace: 'pre-wrap' }} />
            </div>
            {preview && (
                <Preview hash={preview.url} data={preview.preview} description={preview.description} filename={preview.filename} type={preview.mime_type.split("/")[1]} />
            )}
        </div>
    );
}

async function fetchData(id: string, setData: (data: ResponseDs) => void) {
    const fetchedData = await getInfo(id);
    setData(fetchedData);
}

async function fetchPreview(id: string, setPreview: (preview: ResponsePreview) => void) {
    const fetchedPreview = await getPreview(id);
    setPreview(fetchedPreview);
}