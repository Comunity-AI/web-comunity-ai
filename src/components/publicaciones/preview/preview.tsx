"use client";

import { ReactNode } from "react";
import { ViewerJSON } from "./json"
import ViewerCSV from "./csv";
import dynamic from "next/dynamic";
import blooming from "@/public/blooming.svg";
import Image from "next/image";

interface PreviewProps {
    filename: string;
    description: string | null;
    data: any;
    type: string;
    hash: string;
}

function download(filename: string, blob: Blob) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}`;
    a.click();
    URL.revokeObjectURL(url);
}

function DataPreview(data: string, type: string): ReactNode {
    if (type === 'image') {
        return (
            <div className="flex m-auto justify-center">
                <div className="block">
                    <Image src={data} alt="" className="mb-5" />
                </div>
            </div>
        )
    }
    if (type === 'json') {
        return <ViewerJSON value={data} />
    }
    if (type === 'csv') {
        return <ViewerCSV csvData={data} />
    }
    if (type === 'pdf') {
        const ViewerPDF = dynamic(() => import('../preview/pdf'), { ssr: false });
        return <ViewerPDF data={data} />
    }
    return (
        <div className="flex m-auto justify-center">
            <div className="block">
                <Image src={blooming} alt="" width={250} height={250} className="mb-5" />
                <p className="font-notojp">Sin vista previa disponible</p>
            </div>
        </div>
    )
}

export default function Preview({ hash, filename, description, data, type }: PreviewProps) {
    const handleDownload = () => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/download/${hash}`)
            .then(res => res.blob())
            .then(blob => {
                download(filename, blob);
            })
    };

    return (
        <section className="border border-gray-300 rounded-md">
            <div className="p-4 bg-morado/70 rounded-t-md">
                <div className="flex justify-between">
                    <h1 className="font-notojp text-2xl">{filename}</h1>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer" onClick={handleDownload}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                </div>
                <p className="font-notojp">{description}</p>
            </div>
            <div className="max-h-screen overflow-y-scroll">
                {
                    DataPreview(data, type)
                }
            </div>
        </section>
    )
}