// CrearDataset.js
"use client";

import React from 'react';
import NavCrear from '@/components/nav/navCrear';
import { useCrearDataset } from './useCrearDataset';
import BannerSection from './components/bannerSection';
import ReadmeSection from './components/readmeSection';
import FilesSection from './components/fileSection';

const CrearDataset = () => {
    const {
        title,
        setTitle,
        description,
        setDescription,
        readme,
        setValue,
        files,
        setFiles,
        imgHeader,
        setHeaderImage,
        handleChangeFiles,
        handleSubmit,
        handleCancel
    } = useCrearDataset();

    const accept = {
        "image": [".png", ".jpeg", ".jpg", ".webp"],
    };

    const handleMetadataChange = (newTitle:string, newDescription:string) => {
        setTitle(newTitle);
        setDescription(newDescription);
    };
    

    return (
        <div className="mx-auto w-5/6 h-full">
            <NavCrear onSubmit={handleSubmit} onCancel={handleCancel} />
            <BannerSection setHeaderImage={setHeaderImage} handleMetadataChange={handleMetadataChange} accept={accept} />
            <ReadmeSection readme={readme} setValue={setValue} />
            <FilesSection handleChangeFiles={handleChangeFiles} />
        </div>
    );
};

export default CrearDataset;