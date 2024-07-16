"use client";

import { useCallback, useState } from "react";
import { DropEvent, FileRejection } from "react-dropzone";
import InputFile from "./dndInput";
import PreviewImage from "./preview";

interface InputPreviewProps {
    onFilesChange: (file: File) => void;
}

export default function FileInputPreview({ onFilesChange }: InputPreviewProps) { 
    const [file, setFile] = useState<File|null>(null);

    const handleDrop = useCallback((acceptedFiles:any, fileRejections:FileRejection[], e:DropEvent) => {
        setFile(() => {
            const currentFile = acceptedFiles[0]
            onFilesChange(currentFile);
            return currentFile
        })
    }, [])

    const handleRemove = useCallback(() => setFile(null) , [])

    const accept = {
        "image": [".png", ".jpeg", ".jpg", ".webp"],
    }

    return (
        <div className="w-full p-5 grid grid-cols-2 gap-3 h-72">
            {
                file ? 
                    <PreviewImage image={file} alt="headerImage" onRemove={handleRemove}/>
                :
                    <InputFile onDrop={handleDrop} multiple={false} accept={accept}/>
            }
        </div>
    )
}