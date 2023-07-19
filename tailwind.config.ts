module.exports = {
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
        "secondary": "#d7d7de",
        "background": "#050505",
        "patchBG": "#5c5c67",
        "accent1": "#151515",
      }
    }
  }
  // ...
}