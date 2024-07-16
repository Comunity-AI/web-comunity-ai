import JsonView from '@uiw/react-json-view';
import { vscodeTheme } from "@uiw/react-json-view/vscode"

interface JsonProp {
    value: string;
}

export function ViewerJSON({ value }: JsonProp) {
    const content = JSON.parse(JSON.parse(value))
    return (
        <JsonView value={content} style={vscodeTheme}/>
    );
}