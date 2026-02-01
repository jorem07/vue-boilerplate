// nuxt.config.js
export default  {
  app: {
    head: {
      title: 'Nuxt App', // default fallback title
      htmlAttrs: {
        lang: 'en'
      },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ],
    },
  },
  devServer: {
    host: '0.0.0.0',
    port: 3000
  },
  css: ['vuetify/styles'],
  build: {
    transpile: ['vuetify'],
  },
  devtools: false
}

// export default defineNuxtConfig({
//   css: ['vuetify/styles'],
//   build: {
//     transpile: ['vuetify'],
//   },
//   devServer: {
//     host: '0.0.0.0',
//     port: 5173
//   }
// })
