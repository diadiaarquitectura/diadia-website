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
      { src: 'https://unpkg.com/isotope-layout@3.0.4/dist/isotope.pkgd.min.js' },
      { src: 'https://npmcdn.com/isotope-fit-columns@1/fit-columns.js' },
      { src: 'https://rawgit.com/metafizzy/isotope-packery/master/packery-mode.pkgd.js' },
      { src: 'https://cdn.jsdelivr.net/npm/vanilla-lazyload@17.3.1/dist/lazyload.min.js' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
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
