// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss', 'nuxt-vue3-google-signin', '@nuxtjs/i18n'],

  googleSignIn: {
      clientId: '885744489083-sesf2bhp70vs7cgqsl7mrgg5mi4l7s6k.apps.googleusercontent.com',
  },

  css: ['~/assets/css/font.css', '~/assets/css/base.css'],
  ssr: false,
  spaLoadingTemplate: false,

  runtimeConfig: {
      public: {
          // api: "siths2024.com:5555",
          // protocol: "https",
          // ws_protocol: "wss",
          api: "0.0.0.0:5000",
          protocol: "http",
          ws_protocol: "ws",
          // api: "sammy-api.siths.tech",
          // protocol: "https",
          // ws_protocol: "wss",
      }
  },

  // head: {
  //     script: {
  //         src: "https://some-website.com/stuff.js"
  //     }
  // }
  i18n: {
      /* module options */
      defaultLocale: "en",
      lazy: true,
      langDir: "languages",
      strategy: "prefix_except_default",
      locales: [
          {
              code: "en",
              name: "English",
              file: "en.json"
          },
          {
              code: "zh",
              name: "简体中文",
              file: "zh.json"
          },
          {
              code: "ru",
              name: "Русский",
              file: "ru.json"
          },
      ],
  },

  compatibilityDate: "2024-10-30"
})