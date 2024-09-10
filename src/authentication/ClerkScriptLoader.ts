import { useEffect } from 'react';

const loadClerkScript = () => {
    const script = document.createElement('script');
    script.src = 'https://helping-sole-38.clerk.accounts.dev/npm/@clerk/clerk-js@latest/dist/clerk.browser.js';
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.dataset.clerkPublishableKey = 'pk_test_aGVscGluZy1zb2xlLTM4LmNsZXJrLmFjY291bnRzLmRldiQ';
    script.type = 'text/javascript';
    document.body.appendChild(script);
};

export const ClerkScriptLoader = () => {
    useEffect(() => {
        loadClerkScript();
    }, []);

    return null;
};
