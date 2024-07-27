"use client";

import NavCrear from "@/components/nav/navCrear";
import { useCrearModelo } from "./useCrearModelo";
import BannerSection from "../shared-components/bannerSection";
import FilesSection from "../dataset/components/fileSection";
import DropdownMenu from "@/components/dropdown/dropdown";
import { svg_frameworks as svgf } from "@/helpers/svgs";
import ReadmeSection from "../shared-components/readmeSection";

export default function CrearModelo() {
    const {
        items,
        files, handleChangeFiles,
        imgHeader, setHeaderImage,
        readme, setValue,
        handleSubmit, handleCancel, handleMetadataChange,
        framework, setFramework,
        license, setLicense,
    } = useCrearModelo()

    const accept = {
        "image": [".png", ".jpeg", ".jpg", ".webp"],
    };

    const itemsSelect = items?.map((item) => ({ name: item.nombre, icon: svgf[item.nombre] })) || []

    const licencias = [
        { name: "Apache" }, { name: "MIT" }, { name: "GNU" }
    ]

    return (
        <div className="mx-auto w-5/6 h-full">
            <NavCrear onSubmit={handleSubmit} onCancel={handleCancel} />
            <BannerSection setHeaderImage={setHeaderImage} handleMetadataChange={handleMetadataChange} accept={accept} titleHolder='Titulo' descriptionHolder='Breve descripcion del modelo' />
            <FilesSection handleChangeFiles={handleChangeFiles} />
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mb-7">
                <div>
                    <DropdownMenu label="Framework" items={itemsSelect} setItem={(item)=>setFramework(item.name)} className="my-4" />
                </div>
                <div>
                    <DropdownMenu label="Licencia" items={licencias} setItem={(item)=>setLicense(item.name)} className="my-4" />
                </div>
            </div>
            <ReadmeSection subtitle="Guia de uso" readme={readme} setValue={setValue} />
        </div>
    );
}
