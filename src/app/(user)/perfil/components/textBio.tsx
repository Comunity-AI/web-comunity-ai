interface BioInputTextProps {
    handleChangeBio: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    lenBio: number;
    bio: string;
}

export default function BioInputText({handleChangeBio, lenBio, bio}: BioInputTextProps){
    return (
        <div className="w-full block">
            <textarea value={bio} maxLength={250} className="border-b border-b-morado bg-transparent p-2 w-full resize-x"  onChange={handleChangeBio}/>
            <p className="text-xs text-muted-foreground">{lenBio}/250</p>
        </div>
    )
}