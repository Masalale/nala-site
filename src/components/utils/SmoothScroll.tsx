import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export const lenisRef = { current: null as Lenis | null };

export function SmoothScroll() {
    const reqIdRef = useRef<number>(0);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
        });

        lenisRef.current = lenis;

        function raf(time: number) {
            lenis.raf(time);
            reqIdRef.current = requestAnimationFrame(raf);
        }

        reqIdRef.current = requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
            cancelAnimationFrame(reqIdRef.current);
            lenisRef.current = null;
        };
    }, []);

    return null;
}
