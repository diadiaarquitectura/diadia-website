export default {
  mode: 'spa',
  head: {
    title: 'DIADIA',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, user-scalable=no, minimum-scale=1, maximum-scale=1'
      },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],

    script: [
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.0.0/p5.min.js' },
      { src: 'https://unpkg.com/imagesloaded@4/imagesloaded.pkgd.min.js' },
      { src: 'https://unpkg.com/masonry-layout@4.2.2/dist/masonry.pkgd.min.js' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      {
        rel: 'stylesheet',
        type: 'image/x-icon',
        href: 'https://fonts.googleapis.com/css?family=Roboto&display=swap'
      }
    ]
  },

  loadingIndicator: false,
  css: [],
  plugins: [],
  buildModules: [],
  modules: [ 'bootstrap-vue/nuxt', '@nuxtjs/axios' ],
  axios: {},
  build: {
    extend(config, ctx) {}
  }
}
