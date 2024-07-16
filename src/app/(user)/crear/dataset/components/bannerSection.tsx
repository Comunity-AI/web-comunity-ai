// BannerSection.js
import React from 'react';
import BannerInput from '@/components/inputFile/banner/bannerInputFile';

interface BannerSectionProps {
    setHeaderImage: React.Dispatch<React.SetStateAction<any>>;
    handleMetadataChange: (name: string, value: string) => void;
    accept: object;
}

const BannerSection = ({ setHeaderImage, handleMetadataChange, accept }: BannerSectionProps) => (
    <section className='mb-5'>
        <BannerInput onFilesChange={setHeaderImage} accept={accept} onMetadataChange={handleMetadataChange} />
    </section>
);

export default BannerSection;
