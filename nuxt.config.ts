// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'], 
  css: ['~/assets/css/font.css'],
  ssr: false,
  runtimeConfig: {
    public: {
      api: "siths2024.com:5555",
      protocol: "https",
      ws_protocol: "wss"
    }
  }
})
