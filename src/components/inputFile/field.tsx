"use client";

import { useCallback, useState } from 'react';
import { FileRejection, DropEvent } from 'react-dropzone'
import ListFiles from './listFiles';
import InputFile from './dndInput';

interface FieldProps {
    multiple?: boolean;
    onFilesChange: (files: File[]) => void;
}

export default function FieldInputFile({ multiple, onFilesChange }: FieldProps) {

    const [filesUploads, setFilesUploads] = useState<File[]>([]);

    const handleDrop = useCallback((acceptedFiles:any, fileRejections:FileRejection[], e:DropEvent) => {
        setFilesUploads(prevFiles => {
            const updatedFiles = [...prevFiles, ...acceptedFiles]
            onFilesChange(updatedFiles)
            return updatedFiles
        })
    }, [])


    return (
        <div className='w-full p-5 grid grid-cols-2 gap-3 h-72'>
                <InputFile onDrop={handleDrop} multiple={multiple}/>
                <ListFiles files={filesUploads}/>
        </div>
    )
}