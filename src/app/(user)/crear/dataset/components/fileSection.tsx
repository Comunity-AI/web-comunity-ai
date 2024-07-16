// FilesSection.js
import React from 'react';
import FieldInputFile from '@/components/inputFile/field';

interface FilesSectionProps {
    handleChangeFiles: (files: File[]) => void;
}

const FilesSection = ({ handleChangeFiles }: FilesSectionProps) => (
    <section className='mb-5'>
        <div className='border-b border-morado mb-5 w-auto pr-4'>
            <h1 className='font-notojp text-xl mb-2'>Subir archivos</h1>
        </div>
        <FieldInputFile onFilesChange={handleChangeFiles} />
    </section>
);

export default FilesSection;
