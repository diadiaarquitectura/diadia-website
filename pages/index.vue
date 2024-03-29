<template lang="pug">
#main
  #loading-canvas(v-if='!isDataLoaded')
  transition(name='fade')
    .inner(v-if='isDataLoaded')
      home
      container
</template>

<script>
import Home from '../components/Home'
import Container from '../components/Container'
import axios from 'axios'
import gsap from 'gsap'
import { mapMutations } from 'vuex'
import Loader from '../plugins/loader'

export default {
  components: { Home, Container },

  mounted() {
    window.addEventListener('resize', this.onWindowResize)
    window.addEventListener('onorientationchange', this.onOrientationChange)

    this.loader = new Loader('loading-canvas')

    let urls

    axios.get('content/home.json').then((response) => {
      this.setHomeInfo(response.data)
      axios.get('content/proyectos.json').then((response) => {
        this.setProjects(response.data.proyectos)
        axios.get('content/estudio.json').then((response) => {
          this.setStudioInfo(response.data)
          axios.get('content/contacto.json').then((response) => {
            this.setContactInfo(response.data)
            urls = [
              '/images/arrow-down.svg',
              '/images/arrow-left.svg',
              '/images/arrow-right.svg',
              '/images/close.svg',
              '/images/diadia-logo-300.svg',
              '/images/hamburger.svg',
              '/images/logo-diadia.svg',
            ]

            this.preloadImages(urls, () => {
              setTimeout(() => {
                this.isDataLoaded = true
              }, 1000)
            })
          })
        })
      })
    })
  },

  methods: {
    ...mapMutations({
      setProjects: 'setProjects',
      setStudioInfo: 'setStudioInfo',
      setContactInfo: 'setContactInfo',
      setHomeInfo: 'setHomeInfo',
    }),

    preloadImages(urls, allImagesLoadedCallback) {
      var loadedCounter = 0
      var toBeLoadedNumber = urls.length
      urls.forEach((url) => {
        this.preloadImage(url, () => {
          loadedCounter++
          this.loader.t = loadedCounter / toBeLoadedNumber
          if (loadedCounter == toBeLoadedNumber) {
            allImagesLoadedCallback()
          }
        })
      })
    },

    preloadImage(url, anImageLoadedCallback) {
      var img = new Image()
      img.onload = anImageLoadedCallback
      img.src = url
    },

    gotoHome() {
      if (!this.isDataLoaded) return
      let height = document.getElementById('container').offsetTop
      gsap.to('#main', { top: -height, duration: 1, ease: 'power2.out' })
    },

    onWindowResize() {
      this.gotoHome()
    },

    onOrientationChange() {
      if (!this.isDataLoaded) return
      this.gotoHome()
    },
  },

  data() {
    return {
      percentage: 0,
      isDataLoaded: false,
      loader: null,
    }
  },
}
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

#main {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;

  .inner {
    height: 100%;
  }

  #loading-canvas {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100%;
  }
}
</style>