import {useState} from 'react';
import CodeEditor from "./code-editor";
import Preview from "./preview";
import bundle from '../bundler'

const CodeCell = () => {
    const [input, setInput] = useState('');
    const [code, setCode] = useState('');

    const onClick = async () => {
        const output = await bundle(input);
        setCode(output)
    };

    return (
        <div>
            <CodeEditor
                initialValue={'const a = 10;'}
                onChange={(value) => setInput(value)}
            />
            <textarea
                style={{width: '720px', height: '200px'}}
                value={input}
                onChange={(e) => {
                    setInput(e.target.value)
                }
                }
            ></textarea>
            <div>
                <button
                    style={{marginBottom: '10px'}}
                    onClick={onClick}
                >
                    Submit
                </button>
            </div>
            <Preview code={code} />

        </div>
    );
};

export default CodeCell;
