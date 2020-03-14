const { globalStyle } = require('svelte-preprocess');

module.exports = {
    preprocess: [
        globalStyle(),
    ],
};