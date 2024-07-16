export interface BannerProps {
    imageURL: string;
    titulo: string;
    description: string;
}

export default function Banner({titulo, imageURL, description}: BannerProps){
    return (
        <div className='relative m-auto self-center w-full h-48'>
            <img className="w-full h-full object-cover absolute z-10" src={imageURL} alt="Preview" />
            <div className="absolute w-full grid grid-rows-2 gap-4 z-20 px-4 pt-5 my-auto">
                <div className='inline-flex w-1/2'>
                    <h2 className='bg-transparent text-3xl font-notojp outline-none focus:border-b focus:border-b-blanco'>{titulo}</h2>
                </div>
                <div>
                    <p>{description}</p>
                </div>
            </div>
        </div>
    );
}