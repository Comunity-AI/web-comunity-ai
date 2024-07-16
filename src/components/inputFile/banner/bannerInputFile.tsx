"use client";

import { DropEvent, FileRejection, useDropzone } from "react-dropzone";
import { InputFileProps } from "../props/inputFileProps";
import { useCallback, useEffect, useState } from "react";

interface Props {
    onMetadataChange: (title: string, description: string) => void;
    accept: InputFileProps['accept'];
    onFilesChange: (file: File) => void;
}

export default function BannerInput({ onMetadataChange, onFilesChange, accept }: Props) {
    const [file, setFileUploads] = useState<File | null>(null);
    const [imageURL, setImageURL] = useState<string | null>(null);
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const onDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[], e: DropEvent) => {
        if (acceptedFiles.length > 0) {
            const [file] = acceptedFiles;
            setFileUploads(file);
            onFilesChange(file);
        }
    }, [onFilesChange]);

    useEffect(() => {
        if (!file) return;

        const url = URL.createObjectURL(file);
        setImageURL(url);

        return () => {
            URL.revokeObjectURL(url);
            setImageURL(null);
        };
    }, [file]);

    const { getRootProps, getInputProps, isDragActive, open } = useDropzone({ onDrop, accept, noClick: true, noKeyboard: true });

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        setTitle(newTitle);
        onMetadataChange(newTitle, description);
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newDescription = e.target.value;
        setDescription(newDescription);
        onMetadataChange(title, newDescription);
    };

    return (
        <div
            {...getRootProps()}
            className={`relative m-auto self-center w-full h-48 bg-gray-800 border border-dashed ${isDragActive ? 'border-verde' : 'border-morado'}`}
        >
            <input {...getInputProps()} />
            {file && <img className="w-full h-full object-cover absolute z-10" src={imageURL || ""} alt="Preview" />}
            <div className="absolute w-full grid grid-rows-2 gap-4 z-20 px-4 pt-5 my-auto">
                <div className='inline-flex w-1/2'>
                    <input
                        type="text"
                        placeholder='Titulo del Dataset'
                        className='bg-transparent text-3xl font-notojp outline-none focus:border-b focus:border-b-blanco'
                        maxLength={50}
                        onChange={handleTitleChange}
                    />
                </div>
                <div>
                    <textarea
                        name="description"
                        id="description"
                        className='w-full resize-none bg-transparent'
                        maxLength={200}
                        placeholder="Breve descripcion del Dataset"
                        onChange={handleDescriptionChange}
                    />
                </div>
            </div>
            <div className="absolute top-3 right-3 z-20" onClick={open}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>
            </div>
        </div>
    );
}
