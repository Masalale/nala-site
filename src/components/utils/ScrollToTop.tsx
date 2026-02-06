import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollToTop() {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        // If there's a hash, the Navbar handleLinkClick might be handling it, 
        // but on initial page load or cross-page hash navigation, we might need to scroll.
        if (!hash) {
            window.scrollTo(0, 0);
        } else {
            // If there is a hash, wait a bit for the element to render then scroll to it
            setTimeout(() => {
                const id = hash.replace('#', '');
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }
    }, [pathname, hash]);

    return null;
}
