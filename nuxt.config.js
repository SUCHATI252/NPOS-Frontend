export default {
  ssr: false,
  target: 'static',

  loading: {
    color: '#00cd81'
  },
  loadingIndicator: {
    name: 'rectangle-bounce',
    color: 'white',
    background: '#121212'
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s',
    title: 'NPOS',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/styles.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/vue-plugins.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/dotenv'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/i18n',
    'cookie-universal-nuxt'
  ],

  router: {
    middleware: ['auth']
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.SERVER_URL
  },
  auth: {
    redirect: {
      login: '/login',
      logout: '/login',
      callback: '/login',
      home: '/'
    },
    strategies: {
      local: {
        token: {
          property: 'token'
        },
        user: {
          property: 'user'
        },
        endpoints: {
          login: { url: '/login/check_login', method: 'post' },
          user: { url: '/users/me', method: 'post' },
          logout: false
        }
      }
    }
  },

  i18n: {
    locales: [
      {
        code: 'en',
        name: 'TH',
        file: 'en.js'
      },
      {
        code: 'th',
        name: 'EN',
        file: 'th.js'
      }
    ],
    lazy: true,
    langDir: 'languages/',
    defaultLocale: 'en',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'language'
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {},

  publicRuntimeConfig: {
    SERVER_URL: process.env.SERVER_URL
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    publicPath: '/assets/'
  }
}
