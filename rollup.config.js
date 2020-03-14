import svelte from 'rollup-plugin-svelte';
const svelteConfig = require('./svelte.config');
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import css from 'rollup-plugin-css-only';


const production = !process.env.ROLLUP_WATCH;

export default {
    input: 'web/svelte/main.js',
    output: {
        sourcemap: true,
        format: 'iife',
        name: 'app',
        file: 'web/public/build/bundle.js',
    },
    plugins: [
        svelte({
            dev: !production,
            css: css => {
                css.write('web/public/build/bundle.css');
            },
            ...svelteConfig,
        }),
        css({
            output: 'web/public/build/extra.css',
        }),
        resolve({
            browser: true,
            dedupe: ['svelte'],
        }),
        commonjs(),

        !production && serve(),
        !production && livereload(),
    ],
    watch: {
        clearScreen: false,
    }
};

function serve() {
    let started = false;

    return {
        writeBundle() {
            if (!started) {
                started = true;

                require('child_process').spawn('npm', ['run', 'web:start', '--', '--dev'], {
                    stdio: ['ignore', 'inherit', 'inherit'],
                    shell: true
                });
            }
        }
    };
}
