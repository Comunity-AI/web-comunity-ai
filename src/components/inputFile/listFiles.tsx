import { typesFiles } from "@/helpers/svgs";
import { ReactNode } from "react";

interface ListFilesProps {
    files: File[]
}

function clasifyFile(file:File) : ReactNode{
    const [generic, filetype] = file.type.split("/");
    const ext = file.name.split(".").slice(-1)[0]

    const type = typesFiles[filetype] ? filetype : typesFiles[ext] ? ext : generic; 

    return (
        <li key={file.name}>
            <div className="flex">
                {
                    typeof(typesFiles[type]) == "string" || !typesFiles[type] ?
                        <span className="material-symbols-outlined mr-3">{typesFiles[type] ?? typesFiles.file}</span>
                    :
                        <span className="mr-3">{typesFiles[type]}</span>
                }
                <p>{file.name}</p>
            </div>
        </li>
    )
}

export default function ListFiles({ files }:ListFilesProps) {
    return (
        <div className='h-full overflow-scroll px-3 py-2'>
            <ul>
                {
                    files.map(file => clasifyFile(file))
                }
            </ul>
        </div>
    )
}