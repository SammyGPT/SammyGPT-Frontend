// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'], 
  css: ['~/assets/css/font.css'],
  ssr: false,
  runtimeConfig: {
    public: {
      api: "https://siths2024.com:5555"
    }
  }
})
