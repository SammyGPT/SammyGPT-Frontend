module.exports = {
    darkMode: 'class',
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./nuxt.config.{js,ts}",
    ],
    theme: {
        extend: {
            colors: {
                "primary": "#202024",
                "secondary": "#fafafa",
                "light-background": "#d7d7de",
                "background": "#050505",
                "patchBG": "#5c5c67",
                "accent1": "#151515",
                "accent2": "#eaeaea",
                "accent3": "#3e3e42"
            }
        }
    },
}