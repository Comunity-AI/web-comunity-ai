import { useEffect, useState } from "react";
import { ResDataAPI, ResponsePreview } from "../../interfaces/interfaces";
import { useApi } from "@/helpers/cache";

export const useDataset = (id: string) => {
    const { data: datasetData, error: datasetError, status: datasetStatus, notFound: datasetNotFound } = useApi<ResDataAPI>(id ? `paper/${id}` : undefined);
    const { data: previews, error: previewsError, status: previewsStatus } = useApi<ResponsePreview[]>(id ? `preview/${id}` : undefined);

    const [currentPreview, setCurrentPreview] = useState<ResponsePreview | null>(null);

    useEffect(() => {
        if (previews && previews.length > 0) {
            setCurrentPreview(previews[0]);
        }
    }, [previews]);

    return {
        data: datasetData,
        error: datasetError,
        status: datasetStatus,
        notFound: datasetNotFound,
        previews,
        currentPreview,
        setCurrentPreview
    };
}