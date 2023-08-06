// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss','nuxt-vue3-google-signin'], 
  googleSignIn: {
    clientId: '512779933430-oo9c90p46eum9l21goil03hul7eso364.apps.googleusercontent.com',
  },
  css: ['~/assets/css/font.css', '~/assets/css/base.css'],
  ssr: false,
  runtimeConfig: {
    public: {
      // api: "siths2024.com:5555",
      // protocol: "https",
      // ws_protocol: "wss",
      api: "localhost:5000",
      protocol: "http",
      ws_protocol: "ws",
    }
  }
})
