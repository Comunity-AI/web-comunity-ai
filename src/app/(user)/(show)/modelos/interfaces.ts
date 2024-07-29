export interface ResVariacion {
    _id: string;
    slug: string;
    license: string;
    version: string;
    guia_de_uso: string | null;
    archivos: object[];
}

export type Framework = {
    [uuid: string]: string;
  };

export interface ResModelo {
    uuid: string;
    titulo: string;
    descripcion: string;
    bannerURL: string;
    tags: string;
    frameworks: Framework;
    variaciones: ResVariacion[];
    createdAt: string;
    updatedAt: string;
    autor_id: string;
    autor: object;
}