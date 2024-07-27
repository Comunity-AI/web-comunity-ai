"use client";

import NavCrear from "@/components/nav/navCrear";
import BannerSection from "../shared-components/bannerSection";
import FileSection from "./components/fileSection";
import { usePaper } from "./usePaper";

export default function CrearPaper(){
    const {
        setTitle,
        setDescription,
        setHeaderImage,
        handleChangeFile,
        handleSubmit,
        handleCancel
    } = usePaper();
    
    const accept= {
        banner:{
            'image/jpeg': ['.jpeg', '.jpg'],
            'image/webp': ['.webp'],
            'image/png': ['.png']
        },
        paper : {
            'application/pdf': ['.pdf'],
            'application/msword': ['.doc', '.docx']
        }
    };
    
    const handleMetadataChange = (newTitle:string, newDescription:string) => {
        setTitle(newTitle);
        setDescription(newDescription);
    };

    return (
        <div className="mx-auto w-5/6 h-full">
            <NavCrear onSubmit={handleSubmit} onCancel={handleCancel} />
            <BannerSection setHeaderImage={setHeaderImage} handleMetadataChange={handleMetadataChange} accept={accept.banner} titleHolder="Titulo del Paper" descriptionHolder="Breve descripcion del Paper"/>
            <FileSection handleChangeFiles={handleChangeFile} accept={accept.paper}/>
        </div>
    )
}

