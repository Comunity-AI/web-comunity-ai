// ReadmeSection.js
import React from 'react';
import MDEditor from '@uiw/react-md-editor';

interface ReadmeSectionProps {
    readme: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
}

const ReadmeSection = ({ readme, setValue }: ReadmeSectionProps) => (
    <section className='mb-5'>
        <div className='border-b border-morado mb-5 w-auto pr-4'>
            <h1 className='font-notojp text-xl mb-2'>A cerca del Dataset</h1>
        </div>
        <MDEditor value={readme} onChange={setValue} />
    </section>
);

export default ReadmeSection;
