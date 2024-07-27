import { useState } from "react";
import { Select, Option } from "@material-tailwind/react";
import { ResVariacion } from "../../interfaces";

interface VariationCardProps {
    frameworksNames: string[];
    variations: ResVariacion[];
    onChangeFramework?: (framework: string) => void;
}

export default function VariationCard({ frameworksNames, variations, onChangeFramework }: VariationCardProps) {
    const [currentDetailsFramework, setFramework] = useState<string | null>(null);

    const handleFrameworkClick = (framework: string) => {
        setFramework(framework);
        if (onChangeFramework)
            onChangeFramework(framework);
    };

    return (
        <div className="grid grid-rows-4 gap-6">
            <h2 className="text-lg font-semibold">Variaciones</h2>
            <div className="flex flex-wrap gap-2">
                {frameworksNames.map((framework, index) => (
                    <button key={index} className="px-4 py-2 bg-verde rounded-full">{framework}</button>
                ))}
            </div>
            <div className="my-auto grid grid-cols-3">
                <div className="w-72">
                    <Select label="Seleccionar variación" value={variations[0].slug}>
                        {
                        variations.map((variation, index) => (
                            <Option key={index} onClick={() => handleFrameworkClick(variation.slug)}>{variation.slug}</Option>
                        ))
                        }
                    </Select>
                </div>
                <div>
                    <p>Version {variations[0].version}</p>
                </div>
            </div>
        </div>
    );
}