"use client";

import Banner from "@/components/publicaciones/banner/banner";
import MDEditor from '@uiw/react-md-editor';
import Preview from "@/components/publicaciones/preview/preview";
import Loader from "@/components/utils/loader";
import { useDataset } from "../useDataset";
import FileExplorer from "@/components/publicaciones/fileExplorer";
import NotFound from "@/components/404/bosque";
import IndexPage from "../index"

export default function ShowDataset({ params }: { params: { id: string } }) {
    const { id } = params;

    if(id === undefined){
        return <IndexPage/>
    }

    const { data, error, status, notFound, previews, currentPreview, setCurrentPreview } = useDataset(id);

    if (status === 'fetching') {
        return <Loader />;
    }

    if(notFound){
        return <NotFound/>
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!data) {
        return <Loader />;
    }

    const files = previews?.map((e) => ({ preview:e.preview, filename: e.filename, mime_type: e.mime_type.split("/").slice(-1)[0], size:e.size }));

    return (
        <div className="mx-auto w-5/6 h-full">
            <Banner titulo={data.titulo} description={data.descripcion} imageURL={`${process.env.NEXT_PUBLIC_API_URL}/image/${data.bannerURL}` || "https://th.bing.com/th/id/OIP.-hglU4IZ_6pcYLDEcTIn-gHaFA?w=740&h=501&rs=1&pid=ImgDetMain"} />
            <div className="my-5">
                <MDEditor.Markdown source={data.contenido} style={{ whiteSpace: 'pre-wrap' }} />
            </div>
            <div className="mt-9 grid grid-cols-8 gap-4">
                <div className="col-span-6">
                    {currentPreview && (
                        <Preview hash={currentPreview.url} data={currentPreview.preview} description={currentPreview.description} filename={currentPreview.filename} type={currentPreview.mime_type.split("/").slice(-1)[0]} />
                    )}
                </div>
                <div className="col-span-2">
                    <div className="font-notojp">
                        <p className="font-bold text-lg">Resumen de archivos</p>
                        {
                            files && (
                                <FileExplorer files={files} current={currentPreview?.filename} onClick={setCurrentPreview}/>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

