import { useState, useEffect } from "react";

const useWindowWidth = () => {
    const [ width, setWidth ] = useState(window.innerWidth);

    useEffect(() => {
        const handleWidthChange = () => {
            setWidth(window.innerWidth);
        }
        window.addEventListener('resize', handleWidthChange);
        return () => window.removeEventListener('resize', handleWidthChange)
    }, []);

    return width;
}

export default useWindowWidth;