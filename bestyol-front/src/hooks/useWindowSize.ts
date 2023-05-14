import { useEffect, useState } from "react";

export default function useWindowSize() {
    const [windowHeight, setWindowHeight] = useState(0);
    const [windowWidth, setWindowWidth] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            setWindowHeight(window.innerHeight);
            setWindowWidth(window.innerWidth);
        };

        setWindowHeight(window.innerHeight);
        setWindowWidth(window.innerWidth);

        if (typeof window !== "undefined") {
            window.addEventListener("resize", () => {
                setWindowHeight(window.innerHeight);
                setWindowWidth(window.innerWidth);
            });
        }

        return () => {
            if (typeof window !== "undefined") {
                window.removeEventListener("resize", handleResize);
            }
        };
    }, []);

    return { windowWidth, windowHeight };
}

export function useIsMobile() {
    const { windowWidth } = useWindowSize();
    return windowWidth < 900;
}
