import MonacoEditor, {EditorDidMount} from '@monaco-editor/react';
import './code-editor.css';
import prettier from 'prettier';
import parser from "prettier/parser-babel";
import React, {useRef} from "react";
// import codeShift from 'jscodeshift';
// import Highlighter from 'monaco-jsx-highlighter';

interface CodeEditorProps {
    initialValue: string;
    onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({onChange, initialValue}) => {
    const editorRef = useRef<any>();
    const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
        editorRef.current = monacoEditor;
        monacoEditor.onDidChangeModelContent(() => {
           onChange(getValue());
        });

        monacoEditor.getModel()?.updateOptions({tabSize: 2});

        // const highlighter = new Highlighter(
        //     // @ts-ignore
        //     window.monaco,
        //     codeShift,
        //     monacoEditor
        // );
        //
        // highlighter.highLightOnDidChangeModelContent(
        //  () => {},
        //  () => {},
        //  undefined,
        //  () => {},
        // );
    };

    // add prettier to our editor
    const onFormatClick = () => {
        const unformatted = editorRef.current.getModel().getValue();
        const formatted = prettier.format(unformatted, {
            parser: 'babel',
            plugins: [parser],
            useTabs: false,
            semi: true,
            singleQuote: true,
        }).replace(/\n$/, '');
        editorRef.current.setValue(formatted); // delete last additional string inside the editor after formatting
    };

    return (
        <div className='editor-wrapper'>
            <button className="button button-format is-primary is-small button-format" onClick={onFormatClick}>Format</button>
            <MonacoEditor
                editorDidMount={onEditorDidMount}
                value={initialValue} // initial value
                theme='dark'
                language='javascript'
                height="300px"
                options={{
                    wordWrap: 'on',
                    minimap: {enabled: false},
                    showUnused: false, // don't highlight import that is not using
                    folding: false,
                    lineNumbersMinChars: 3,
                    fontSize: 16,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    }
                }
            />;
        </div>
    )
}

export default CodeEditor;