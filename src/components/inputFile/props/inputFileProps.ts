import { DropEvent, FileRejection } from "react-dropzone";

export interface InputFileProps {
    onDrop: (acceptedFiles: any, fileRejections: FileRejection[], e: DropEvent) => void;
    multiple?: boolean;
    accept?: any;
}