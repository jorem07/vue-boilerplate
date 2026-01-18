  import { createVuetify } from 'vuetify'
  import * as components from 'vuetify/components'
  import * as directives from 'vuetify/directives'
  import '@mdi/font/css/materialdesignicons.css'
  import 'vuetify/styles'

  export default defineNuxtPlugin((nuxtApp) => {
    const vuetify = createVuetify({
      components,
      directives,
      theme: {
        defaultTheme: 'myTheme',
        themes: {
          myTheme: {
            dark: false,
            colors: {
              primary: '#6200EE',
              secondary: '#03DAC6',
              accent: '#FF4081',
              success: '#4CAF50',
              warning: '#FB8C00',
              error: '#B00020',
              info: '#2196F3',
              indigoDark: '#4B0082'
            },
          },
        },
      },
    })

    nuxtApp.vueApp.use(vuetify)
  })
