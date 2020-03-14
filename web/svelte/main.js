import App from './App.svelte';

const app = new App({
    target: document.body,
    props: {
        logo: !window.noLogo,
    }
});

export default app;
