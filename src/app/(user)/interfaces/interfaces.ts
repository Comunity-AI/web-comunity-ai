export interface DataPublicacion {
    uuid: string;
    bannerURL: string;
    titulo: string;
    tags: string[];
    name: string;
    descripcion: string;
    contenido: string;
    created_at: string;
    autor_name: string;
    autor: any;
}

export interface ResDataAPI extends DataPublicacion{
    error?: boolean;
    notFound?:boolean;
}

export interface ResponseAPI extends Response{
    id?: string;
    error?: string;
    details?: string;
    message?: string;
}

export interface ResponseFramework extends ResDataAPI {
    id: string;
    nombre: string;
    notFound: boolean;
}

export interface ResponsePreview extends ResponseAPI{
    preview: string;
    size:Number;
    filename: string;
    url: string;
    description: string;
    mime_type: string;
    image: string;
}

export interface ResponseList {
    count: number;
    results: DataPublicacion[];
}