// useShowModel.tsx

"use client";

import { useApi } from "@/helpers/cache";
import { useSession } from "next-auth/react";
import { ResModelo, ResVariacion } from "../interfaces";
import axiosInstance from '@/utils/axiosConfig';
import Swal from "sweetalert2";
import { useState, useEffect } from "react";

export const useModelo = (id: string) => {
    const { data: session } = useSession();
    const { data: modeloData, error: modeloError, status: modeloStatus, notFound: modeloNotFound } = useApi<ResModelo>(id ? `modelo/${id}` : undefined);
    
    const [variationForFrameworks, setVariationForFrameworks] = useState<ResVariacion[]>([])
    const [currentVariation, setVariation] = useState<ResVariacion | null>(null);
    const [currentFramework, setFramework] = useState<string>(''); // save a id framework
    const [valGuia, setGuia] = useState<string>('');
    const [activeEditGuia, setActiveEditGuia] = useState<boolean>(false);
    
    const { data: frameworkData, error: frameworkError, status: frameworkStatus, notFound: frameworkNotFound } = useApi<ResModelo>(`modelo/${id}/framework/${currentFramework}`);
    
    useEffect(() => {
        if (modeloData && modeloData.variaciones.length > 0) {
            setFramework(Object.keys(modeloData.frameworks)[0]);  
            setVariation(modeloData.variaciones[0]);
            setGuia(modeloData.variaciones[0].guia_de_uso || '');
            setVariationForFrameworks(modeloData.variaciones)
        }
    }, [modeloData]);

    useEffect(() => {
        if (frameworkData && frameworkData.variaciones.length > 0) {
            setVariation(frameworkData.variaciones[0]);
            setGuia(frameworkData.variaciones[0].guia_de_uso || '');
            setVariationForFrameworks(frameworkData.variaciones)
        }
    }, [frameworkData]);

    const handleChangeFramework = (framework_id: string) => {
        if(currentFramework == framework_id) return
        setFramework(framework_id);
    }

    const handleChangeVariation = (value: any | null) => {
        const framework = modeloData?.variaciones[Number(value?.value)];
        if (framework && framework._id !== currentVariation?._id) {
            setVariation(framework);
            setGuia(framework.guia_de_uso || '');
        }
    };

    const handleSaveGuia = async (value: string) => {
        if (!modeloData?.uuid) return;
        if (!value.trim()) return Swal.fire('Error', 'El campo guía de uso no puede estar vacío', 'error')

        const data = JSON.stringify({
            modeloId: modeloData?.uuid,
            variationID: currentVariation?._id,
            guiaUso: value.trim()
        });
        const response = await axiosInstance.post('/model/update-guia-uso', data, {
            headers: {
                Authorization: session?.accessToken,
            },
        });

        if (response.data.error) {
            return Swal.fire('Error', response.data.details, 'error');
        }
        setActiveEditGuia(false);
        modeloData.variaciones[0].guia_de_uso = value
        setGuia(value);
    };

    const handleActiveEditGuia = (val: boolean) => {
        setActiveEditGuia(val);
    };

    return {
        modeloData,
        modeloError,
        modeloStatus,
        modeloNotFound,
        variationForFrameworks,
        currentVariation,
        valGuia,
        activeEditGuia,
        currentFramework,
        handleChangeVariation,
        handleSaveGuia,
        handleActiveEditGuia,
        handleChangeFramework,
        setGuia
    };
};
