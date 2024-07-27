// ReadmeSection.js
import React from 'react';
import MDEditor from '@uiw/react-md-editor';

interface ReadmeSectionProps {
    subtitle:string;
    readme: string;
    setValue: any;
}

const ReadmeSection = ({ subtitle, readme, setValue }: ReadmeSectionProps) => (
    <section className='mb-5'>
        <div className='border-b border-morado mb-5 w-auto pr-4'>
            <h1 className='font-notojp text-xl mb-2'>{subtitle}</h1>
        </div>
        <MDEditor value={readme} onChange={setValue} />
    </section>
);

export default ReadmeSection;
