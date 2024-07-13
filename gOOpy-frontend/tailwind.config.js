const defaultTheme = require('tailwindcss/defaultTheme');
/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                serif: ['"Caprasimo"', ...defaultTheme.fontFamily.serif],
            },
        },
        colors: {
            'bg-yellow': '#FFF3D1',
            'font-brown': '#450a0a',
            'hd-color': '#fbbf24',
            'editor-box': '#fed7aa',
            'editor-hover': '#EAB272',
            white: '#FFFFFF',
            'panel-primary': '#FED7AA',
            'error-red': '#D70040',
            'disabled-gray': '#DDBB94',
        },
    },
    plugins: [],
};
