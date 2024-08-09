"use client";

import React from "react";
import { useModelo } from "./useShowModelo";
import Loader from "@/components/utils/loader";
import NotFound from "@/components/errors/404/bosque";
import Banner from "@/components/publicaciones/banner/banner";
import VariationCard from "@/app/(user)/(show)/modelos/components/card/variationCard";
import { useSession } from "next-auth/react";
import Error500 from "@/components/errors/500/500";

export default function Modelos({ params }: { params: { id: string } }) {
    const { id } = params;
    const {data: session} = useSession();
    const {
        modeloData, modeloError, modeloStatus, modeloNotFound,
        currentVariation,
        valGuia,
        activeEditGuia,
        variationForFrameworks,
        currentFramework,
        handleChangeVariation,
        handleSaveGuia,
        handleActiveEditGuia,
        handleChangeFramework,
        setGuia,
    } = useModelo(id);


    if (modeloStatus === 'fetching') {
        return <Loader />;
    }

    if (modeloNotFound) {
        return <NotFound />;
    }

    if (modeloError) {
        return <Error500 />;
    }

    if (!modeloData) {
        return <Loader />;
    }

    const listFrameworks = modeloData.frameworks;

    const isAuthor = modeloData.autor_id == session?.user?.uuid;
    return (
        <div className="mx-auto w-5/6 h-full">
            <Banner titulo={modeloData.titulo} description={modeloData.descripcion} imageURL={`${process.env.NEXT_PUBLIC_API_URL}/image/${modeloData.bannerURL}` || "https://th.bing.com/th/id/OIP.-hglU4IZ_6pcYLDEcTIn-gHaFA?w=740&h=501&rs=1&pid=ImgDetMain"} />
            <div className="mt-9 grid grid-cols-8 gap-4">
                <div className="col-span-2">
                </div>
            </div>
            <VariationCard listFrameworks={listFrameworks} variations={variationForFrameworks} 
                            isAuthor={isAuthor} handleSaveGuia={handleSaveGuia} currentVariation={currentVariation}
                            valGuia={valGuia} setGuia={setGuia} activeEditGuia={activeEditGuia} 
                            handleActiveEditGuia={handleActiveEditGuia} handleChangeVariation={handleChangeVariation} 
                            currentFramework={currentFramework} onChangeFramework={handleChangeFramework}/>
        </div>
    )
}
