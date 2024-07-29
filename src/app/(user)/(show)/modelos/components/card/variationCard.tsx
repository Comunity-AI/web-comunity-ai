import { useState } from "react";
import { Framework, ResVariacion } from "../../interfaces";
import MDEditor from "@uiw/react-md-editor";
import Select from "react-tailwindcss-select";
import ButtonAdd from "./buttonAdd";


interface VariationCardProps {
    listFrameworks: Framework;
    variations: ResVariacion[];
    isAuthor: boolean;
    currentVariation: ResVariacion | null;
    valGuia: string;
    activeEditGuia: boolean;
    currentFramework: string;
    handleChangeVariation: (value: any | null) => void;
    handleSaveGuia: (value: string) => void;
    handleActiveEditGuia: (val: boolean) => void;
    setGuia: (value: string) => void;
    onChangeFramework: (framework_id: string) => void;
}

const svg_edit = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
</svg>


export default function VariationCard({
    listFrameworks,
    variations,
    isAuthor,
    currentVariation,
    valGuia,
    activeEditGuia,
    currentFramework,
    handleChangeVariation,
    handleSaveGuia,
    handleActiveEditGuia,
    setGuia,
    onChangeFramework
}: VariationCardProps) {

    const optionsVariations = variations.map((variation, index) => ({
        label: variation.slug,
        value: String(index),
    }));
    return (
        <div className="grid grid-rows-3 gap-6">
            <h2 className="text-lg font-semibold">Variaciones</h2>
            <section className="grid grid-cols-12 gap-2">
                <div className="col-span-10 overflow-x-scroll">
                    {Object.entries(listFrameworks).map((framework, index) => (
                        <button onClick={()=>onChangeFramework(framework[0])} key={index} className={`px-4 mr-3 py-2  rounded-full ${currentFramework == framework[0] ? 'bg-verde' : ''}`}>{framework[1]}</button>
                    ))}
                </div>
                <div>
                    <div className="flex rounded-lg m-auto text-verde-claro cursor-pointer hover:scale-105">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                        </svg>
                    </div>
                </div>
            </section>
            <section className="my-auto grid grid-cols-3">
                <div className="w-72">
                    <Select
                        value={optionsVariations[0]}
                        onChange={handleChangeVariation}
                        options={optionsVariations}
                        classNames={{
                            //@ts-ignore
                            menuButton: ({ isDisabled }: { isDisabled: boolean | undefined }) => (
                                `flex text-sm text-gray-200 bg-transparent border border-gray-300 rounded shadow-sm transition-all duration-300 focus:outline-none ${isDisabled
                                    ? "bg-gray-200"
                                    : "hover:border-gray-400 focus:border-verde-claro focus:ring focus:ring-verde-claro/20"
                                }`
                            ),
                            menu: "absolute z-10 w-full bg-black shadow-lg border rounded py-1 mt-1.5 text-sm text-gray-700",
                            //@ts-ignore
                            listItem: ({ isSelected }: { isSelected: boolean | undefined }) => (
                                `block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded ${isSelected
                                    ? `text-white bg-fondo`
                                    : `text-gray-200 hover:bg-fondo hover:text-white`
                                }`
                            )
                        }}
                    />
                </div>
                <div className="flex flex-col">
                    <p>Version</p>
                    <p>{currentVariation?.version}</p>
                </div>
                <div className="flex flex-col">
                    <p>Licencia</p>
                    <p>{currentVariation?.license}</p>
                </div>
            </section>
            <section>
                <div className="flex flex-wrap justify-between">
                    <h1 className="text-xl font-notojp">Guia de uso</h1>
                    {
                        isAuthor && !activeEditGuia ?
                            <ButtonAdd className="flex justify-between border-none" onClick={() => { handleActiveEditGuia(true) }}>{svg_edit}</ButtonAdd>
                            :
                            <></>
                    }{
                        isAuthor && activeEditGuia ?
                            <div className="mb-4">
                                <div className="flex space-x-4">
                                    <button className="text-verde-claro hover:bg-verde hover:text-white rounded-md px-3 py-2 text-sm font-medium" onClick={()=>handleSaveGuia(valGuia)}>Guardar</button>
                                    <button className="text-rose-600 hover:bg-rose-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium" onClick={() => handleActiveEditGuia(false)}>Cancelar</button>
                                </div>
                            </div>
                            :
                            <></>
                    }
                </div>
                <div>
                    {
                        isAuthor && activeEditGuia ?
                            <MDEditor value={valGuia} onChange={(v)=>setGuia(v || '')} />
                            :
                            <></>
                    }
                    {
                        !activeEditGuia && currentVariation?.guia_de_uso ?
                            <MDEditor.Markdown source={valGuia} style={{ whiteSpace: 'pre-wrap' }} />
                            :
                            !activeEditGuia && <p>No hay guia de uso</p>
                    }
                </div>
            </section>
        </div>
    );
}