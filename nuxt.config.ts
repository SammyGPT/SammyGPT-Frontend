// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'], 
  css: ['~/assets/css/font.css'],
  ssr: false,
  runtimeConfig: {
    public: {
      api: "http://192.168.1.189:5000/"
    }
  }
})
