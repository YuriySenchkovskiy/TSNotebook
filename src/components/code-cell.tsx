import './code-cell.css';
import {useEffect, useState} from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import Resizable from './resizable';
import {Cell} from "../state";
import {useActions} from "../hooks/use-actions";
import {useTypedSelector} from "../hooks/use-typed-selector";
import {useCumulativeCode} from "../hooks/use-cumulative-code";

interface codeCellProps {
    cell: Cell
}

const CodeCell: React.FC<codeCellProps> = ({cell}) => {
    const [resizing, setResizing] = useState(false);
    const {updateCell, createBundle} = useActions();
    const bundle = useTypedSelector((state) => state.bundles[cell.id]);
    const cumulativeCode = useCumulativeCode(cell.id);

    useEffect(() => {
        if(!bundle) {
            createBundle(cell.id, cumulativeCode);
            return;
        }

        const timer = setTimeout(async() => {
            createBundle(cell.id, cumulativeCode);
        }, 1000);

        return () => {
          clearTimeout(timer);
        };
    }, [cumulativeCode, cell.id, createBundle]);

    return (
        <Resizable
            direction="vertical"
            onResizeStart={() => setResizing(true)}
            onResizeStop={() => setResizing(false)}
        >
            <div style={{height: 'calc(100% - 10px)', display: 'flex', flexDirection: 'row'}}>
                <Resizable direction={"horizontal"}>
                    <CodeEditor
                        initialValue={cell.content}
                        onChange={(value) => updateCell(cell.id, value)}
                    />
                </Resizable>
                <div className='progress-wrapper'>
                    {
                        !bundle || bundle.loading
                            ?
                            <div className='progress-cover'>
                                <progress className='progress is-small is-primary' max='100'>
                                    Loading
                                </progress>
                            </div>

                        : <Preview code={bundle.code} bundlingStatus={bundle.err}/>
                    }
                </div>
                {resizing && <div className="resizing-overlay"></div>}
            </div>
        </Resizable>
    );
};

export default CodeCell;
