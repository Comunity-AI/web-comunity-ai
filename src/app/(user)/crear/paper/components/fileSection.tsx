import FieldInputFile from "@/components/inputFile/field";

interface FilesSectionProps {
    accept?: object;
    handleChangeFiles: (files: File[]) => void;
}

const FilesSection = ({ handleChangeFiles, accept }: FilesSectionProps) => (
    <section className='mb-5'>
        <div className='border-b border-morado mb-5 w-auto pr-4'>
            <h1 className='font-notojp text-xl mb-2'>Subir archivo</h1>
        </div>
        <FieldInputFile onFilesChange={handleChangeFiles} multiple={false} accept={accept}/>
    </section>
);

export default FilesSection;