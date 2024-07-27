import { typesFiles } from "@/helpers/svgs"

interface PropsFileExplorer {
    files: { preview: string, filename: string, mime_type: string }[]
    onClick: (value: any) => any
    current?: string
}

export default function FileExplorer({ files, onClick, current }: PropsFileExplorer) {
    return (
        <div className="h-full overflow-scroll px-3 py-2">
            <ul>
                {
                    files.map(file => (
                        <li key={file.filename}>
                            <div className={`flex p-2 ${current == file.filename ? 'bg-slate-800' : 'hover:bg-slate-800 cursor-pointer'}`} onClick={(e)=> current != file.filename && onClick(file) }>
                            {
                                typeof (typesFiles[file.mime_type]) == "string" || !typesFiles[file.mime_type] ?
                                    <span className="material-symbols-outlined mr-3">{typesFiles[file.mime_type] ?? typesFiles.file}</span>
                                    :
                                    <span className="mr-3">{typesFiles[file.mime_type]}</span>
                            }
                            {file.filename}
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}