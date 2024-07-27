import React from 'react';
import BannerInput from '@/components/inputFile/banner/bannerInputFile';

interface BannerSectionProps {
    setHeaderImage: React.Dispatch<React.SetStateAction<any>>;
    handleMetadataChange: (name: string, value: string) => void;
    accept: object;
    titleHolder?: string;
    descriptionHolder?: string;
}

const BannerSection = ({ setHeaderImage, handleMetadataChange, accept, titleHolder, descriptionHolder }: BannerSectionProps) => (
    <section className='mb-5'>
        <BannerInput titleHolder={titleHolder} descriptionHolder={descriptionHolder} onFilesChange={setHeaderImage} accept={accept} onMetadataChange={handleMetadataChange} />
    </section>
);

export default BannerSection;
