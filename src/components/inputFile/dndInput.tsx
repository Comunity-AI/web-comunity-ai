"use client";

import { useDropzone } from "react-dropzone";
import { InputFileProps } from "./props/inputFileProps"

export default function InputFile({ onDrop, multiple = true, accept }: InputFileProps) {

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple, accept })

    return (
        <div {...getRootProps()} className={`flex h-full bg-gray-800 border border-dashed ${isDragActive ? 'border-verde' : 'border-morado'}`}>
            <input {...getInputProps()} />
            {
                isDragActive ?
                    <p className='flex text-center m-auto'>Drop the files here ...</p> :
                    <p className='flex text-center m-auto'>Drag 'n' drop some files here, or click to select files</p>
            }
        </div>
    )
}