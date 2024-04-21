import {useEffect, useState} from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import bundle from '../bundler';
import Resizable from './resizable';
import {Cell} from "../state";
import {useActions} from "../hooks/use-actions";

interface codeCellProps {
    cell: Cell
}

const CodeCell: React.FC<codeCellProps> = ({cell}) => {
    const [code, setCode] = useState('');
    const [resizing, setResizing] = useState(false);
    const [err, setErr] = useState('');

    const {updateCell} = useActions();

    useEffect(() => {
        const timer = setTimeout(async() => {
            const output = await bundle(cell.content);
            setCode(output.code);
            setErr(output.err);
        }, 1000);

        return () => {
          clearTimeout(timer);
        };
    }, [cell.content]);

    return (
        <Resizable
            direction="vertical"
            onResizeStart={() => setResizing(true)}
            onResizeStop={() => setResizing(false)}
        >
            <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
                <Resizable direction={"horizontal"}>
                <CodeEditor
                    initialValue={cell.content}
                    onChange={(value) => updateCell(cell.id, value)}
                />
                </Resizable>
                <Preview code={code} bundlingStatus={err}/>
                {resizing && <div className="resizing-overlay"></div>}
            </div>
        </Resizable>
    );
};

export default CodeCell;
