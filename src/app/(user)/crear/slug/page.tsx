"use client";

import CrearDataset from '../datasets';

export default function CrearPage({ params }: { params: { slug: string } }) {
    const { slug } = params;

    let content;
    switch (slug) {
        case 'dataset':
            content = <CrearDataset />;
            break;
        default:
            content = <p>Seleccione una opción válida para crear.</p>;
    }

    return content
        
}
