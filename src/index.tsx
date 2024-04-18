import 'bulmaswatch/superhero/bulmaswatch.min.css';
import ReactDOM from 'react-dom/client';
import CodeCell from './components/code-cell';
import TextEditor from "./components/test-editor";

const el = document.getElementById('root');

const root = ReactDOM.createRoot(el!);

const App = () => {
    return (
        <div style={{display:'flex', flexDirection: 'column', gap: '10px'}}>
            <CodeCell />
            <TextEditor />
        </div>
    );
};

root.render(<App />);
