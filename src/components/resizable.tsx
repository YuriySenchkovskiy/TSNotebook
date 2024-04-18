import './resizable.css';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import React, {useEffect, useState} from "react";

interface ResizableProps {
    direction: 'horizontal' | 'vertical';
    children?: React.ReactNode;
    onResizeStart?: () => void;
    onResizeStop?: () => void;
}

const Resizable: React.FC<ResizableProps> = ({ direction, children, onResizeStart, onResizeStop }) => {
    let resizableProps: ResizableBoxProps;
    const [innerHeight, setInnerHeight] = useState(window.innerHeight);
    const [innerWidth, setInnerWidth] = useState(window.innerWidth);

    useEffect(() => {
        const listener = () => {
            setInnerHeight(window.innerHeight);
            setInnerWidth(window.innerWidth);
        };
        window.addEventListener('resize', listener);

        return () => {
            window.removeEventListener('resize', listener);
        };
    }, []);

    if(direction === 'horizontal') {
        resizableProps = {
            className: 'resize-horizontal',
            maxConstraints: [innerWidth * 0.75, Infinity],
            minConstraints: [innerWidth * 0.2, Infinity],
            height: Infinity,
            width: innerWidth * 0.75,
            resizeHandles: ['e'],
        };
    } else {
        resizableProps = {
            maxConstraints: [Infinity, innerHeight * 0.9],
            minConstraints: [Infinity, 50],
            height: 300,
            width: Infinity,
            resizeHandles: ['s'],
        };
    }

    return (
        <ResizableBox
            {...resizableProps}
            onResizeStart={onResizeStart}
            onResizeStop={onResizeStop}
        >
            {children}
        </ResizableBox>
    );
};

export default Resizable;
