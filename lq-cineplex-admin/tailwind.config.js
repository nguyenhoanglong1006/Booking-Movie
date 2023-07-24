/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                'lq-white': '#ffffff',
            },
            backgroundImage: {
                'lq-bg-login': "url('/src/layouts/asset/bg_login.png')",
                'lq-bg-home': "url('/src/layouts/asset/bg_homepage.jpg')",
            },
        },
    },
    plugins: [],
};
