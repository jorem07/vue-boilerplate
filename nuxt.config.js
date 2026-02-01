// nuxt.config.js
export default  {
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
