"use client";

import { useApi } from "@/helpers/cache";
import { useSession } from "next-auth/react";
import { ResModelo } from "../interfaces";

export const useModelo = (id: string) => {
    const { data: session } = useSession();
    const { data: modeloData, error: modeloError, status: modeloStatus, notFound: modeloNotFound } = useApi<ResModelo>(id ? `modelo/${id}` : undefined);

    return { modeloData, modeloError, modeloStatus, modeloNotFound };
}