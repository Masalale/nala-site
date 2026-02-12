import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { lenisRef } from './SmoothScroll';

export function ScrollToTop() {
    const { pathname, hash, search } = useLocation();

    useEffect(() => {
        // If there's a hash, the Navbar handleLinkClick might be handling it, 
        // but on initial page load or cross-page hash navigation, we might need to scroll.
        if (!hash) {
            lenisRef.current?.scrollTo(0);
        } else {
            // If there is a hash, wait a bit for the element to render then scroll to it
            setTimeout(() => {
                const id = hash.replace('#', '');
                const element = document.getElementById(id);
                if (element) {
                    lenisRef.current?.scrollTo(element);
                }
            }, 500);
        }
    }, [pathname, hash, search]);

    return null;
}
