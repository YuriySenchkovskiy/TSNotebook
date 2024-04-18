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
    const [width, setWidth] = useState(window.innerHeight * 0.75);

    useEffect(() => {
        let timer: any;
        const listener = () => {
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(() => {
                setInnerHeight(window.innerHeight);
                setInnerWidth(window.innerWidth);
                if (window.innerWidth * 0.75 < width) {
                    setWidth(window.innerWidth * 0.75);
                }
            }, 100);
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
            width,
            resizeHandles: ['e'],
            onResizeStop: (event, data) => {
                setWidth(data.size.width);
            }
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
