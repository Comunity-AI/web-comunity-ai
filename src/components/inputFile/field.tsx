"use client";

import { useCallback, useEffect, useState } from 'react';
import { FileRejection, DropEvent } from 'react-dropzone'
import ListFiles from './listFiles';
import InputFile from './dndInput';

interface FieldProps {
    multiple?: boolean;
    accept?: object;
    onFilesChange: (files: File[]) => void;
}

export default function FieldInputFile({ multiple, onFilesChange, accept }: FieldProps) {

    const [filesUploads, setFilesUploads] = useState<File[]>([]);
    const [newFiles, setNewFiles] = useState<File[]>([]);

    const handleDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[], e: DropEvent) => {
        setFilesUploads(prevFiles => {

            const updatedFiles = multiple ? [...prevFiles, ...acceptedFiles] : [...acceptedFiles];
            setNewFiles(updatedFiles); 
            return updatedFiles;
        });
    }, []);

    useEffect(() => {
        if (newFiles.length > 0) {
            onFilesChange(newFiles);
        }
    }, [newFiles, onFilesChange]);  // Update state in useEffect


    return (
        <div className='w-full p-5 grid grid-cols-2 gap-3 h-72'>
                <InputFile onDrop={handleDrop} multiple={multiple} accept={accept}/>
                <ListFiles files={filesUploads}/>
        </div>
    )
}