interface ImgBannerProps {
    url: string;
    title: string;
    description: string;
    publishDate: string;
}

function formatDate(date: string){
    return new Date(date).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
}

export default function ImgBanner(props: ImgBannerProps) {
    return (
        <div className="relative bg-cover bg-center h-96 text-white py-24 px-10 object-cover mt-12">
            <div className="w-full absolute inset-0 -z-10">
                <img
                    className="object-cover h-full w-full rounded-lg brightness-90"
                    src={`https:${props.url}`}
                    alt={props.title}
                />
            </div>
            <div className="h-full w-full flex justify-center">
                <div className="my-auto">
                    <p className="text-md mb-5">{formatDate(props.publishDate)}</p>
                    <p className="text-4xl font-bold mb-2">{props.title}</p>
                    <p className="text-xl mb-10 leading-none">{props.description}</p>
                </div>
            </div>
        </div>
    )
}