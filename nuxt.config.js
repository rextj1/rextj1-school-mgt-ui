const inProduction = process.env.NODE_ENV === 'production'
const host = inProduction ? '127.0.0.1' : `school-ms.test`
// const apiRoot = process.env.APP_API_ROOT || `http://school-sms.test`

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  universal: false,
  server: {
    host,
    port: 3000,
  },
  head: {
    title: 'Responsive side nav',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/scss/index.scss', 'bootstrap-vue/dist/bootstrap-vue.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/bootstrap-vue-icons',
    '~/plugins/otp',
    '~/plugins/form',
    { src: '~/plugins/apex-chart', ssr: false },
    { src: '~/plugins/html2Pdf', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    // '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    // '@nuxtjs/stylelint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    // '@nuxtjs/auth-next',
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
    '@nuxtjs/apollo',
  ],

  bootstrapVue: {
    bootstrapCSS: true,
    bootstrapVueCSS: true,
  },

  styleResources: {
    scss: [
      '~/node_modules/bootstrap/scss/_functions.scss',
      '~/node_modules/bootstrap/scss/_variables.scss',
      '~/node_modules/bootstrap/scss/_mixins.scss',
    ],
  },
  extend(config, ctx) {
    // if (ctx.isDev || ctx.isClient) {
    //   config.module.rules.push({
    //     enforce: 'pre',
    //     test: /\.(js|vue)$/,
    //     loader: 'eslint-loader',
    //     exclude: /(node_modules)/,
    //   })
    // }
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
    theme_color: '#563bd1',
  },

  // router: {
  //   scrollBehavior: function () {
  //     console.log('Scoll behavior')
  //     return false
  //   },
  // },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    friendlyErrors: false,
  },

  apollo: {
    // tokenName: 'yourApolloTokenName', // optional, default: apollo-token
    cookieAttributes: {
      /**
       * Define when the cookie will be removed. Value can be a Number
       * which will be interpreted as days from time of creation or a
       * Date instance. If omitted, the cookie becomes a session cookie.
       */
      expires: 7, // optional, default: 7 (days)

      /**
       * Define the path where the cookie is available. Defaults to '/'
       */
      // path: '/', // optional
      /**
       * Define the domain where the cookie is available. Defaults to
       * the domain of the page where the cookie was created.
       */
      domain: `.${host}`,
      /**
       * A Boolean indicating if the cookie transmission requires a
       * secure protocol (https). Defaults to false.
       */
      secure: inProduction,
    },
    includeNodeModules: true, // optional, default: false (this includes graphql-tag for node_modules folder)
    // authenticationType: 'Bearer', // optional, default: 'Bearer'
    // (Optional) Default 'apollo' definition
    defaultOptions: {
      // See 'apollo' definition
      // For example: default query options
      $query: {
        loadingKey: 'loading',
        fetchPolicy: 'cache-and-network',
      },
    },
    // optional
    errorHandler: '~/graphql/apollo/error-handler.js',
    // required
    clientConfigs: {
      default: '~/graphql/apollo/default-client.js',
    },
  },
}
