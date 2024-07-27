"use client";

import React from "react";
import { useModelo } from "./useShowModelo";
import Loader from "@/components/utils/loader";
import NotFound from "@/components/404/bosque";
import Banner from "@/components/publicaciones/banner/banner";
import VariationCard from "@/app/(user)/(show)/modelo/components/card/variationCard";

export default function Modelos({ params }: { params: { id: string } }) {
    const { id } = params;
    const { modeloData, modeloError, modeloStatus, modeloNotFound } = useModelo(id);


    if (modeloStatus === 'fetching') {
        return <Loader />;
    }

    if (modeloNotFound) {
        return <NotFound />;
    }

    if (modeloError) {
        return <div>Error: {modeloError}</div>;
    }

    if (!modeloData) {
        return <Loader />;
    }

    const frameworksNames = Object.values(modeloData.frameworks);

    console.log(modeloData.variaciones);
    return (
        <div className="mx-auto w-5/6 h-full">
            <Banner titulo={modeloData.titulo} description={modeloData.descripcion} imageURL={`${process.env.NEXT_PUBLIC_API_URL}/image/${modeloData.bannerURL}` || "https://th.bing.com/th/id/OIP.-hglU4IZ_6pcYLDEcTIn-gHaFA?w=740&h=501&rs=1&pid=ImgDetMain"} />
            <div className="mt-9 grid grid-cols-8 gap-4">
                <div className="col-span-2">
                </div>
            </div>
            <VariationCard frameworksNames={frameworksNames} variations={modeloData.variaciones}/>
        </div>
    )
}
