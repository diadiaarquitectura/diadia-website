<template lang="pug">
#main
  #loading-canvas(v-if='!isDataLoaded')
  transition(name='fade')
    .noselect(v-if='isDataLoaded')
      hero
      home
</template>

<script>
import Hero from '../components/Hero'
import Home from '../components/Home'
import axios from 'axios'
import gsap from 'gsap'
import { mapMutations } from 'vuex'

export default {
  components: { Hero, Home },

  mounted() {
    window.addEventListener('resize', this.onWindowResize)
    window.addEventListener('onorientationchange', this.onWindowResize)

    document.ontouchmove = function (event) {
      event.preventDefault()
    }

    let urls
    let projects, studio, contact, bases

    axios.get('content/proyectos.json').then((response) => {
      this.setProjects(response.data.proyectos)
      projects = response.data.proyectos
      axios.get('content/estudio.json').then((response) => {
        this.setStudioInfo(response.data)
        studio = response.data
        axios.get('content/contacto.json').then((response) => {
          this.setContactInfo(response.data)
          contact = response.data
          axios.get('content/bases.json').then((response) => {
            this.setBasesInfo(response.data.bases)
            bases = response.data.bases

            urls = [
              '/images/icons/icon-uso.svg',
              '/images/icons/icon-archivo.svg',
              '/images/icons/icon-tiempo.svg',
              '/images/arrow-down.svg',
              '/images/arrow-left.svg',
              '/images/arrow-right.svg',
              '/images/close.svg',
              '/images/diadia-logo-300.svg',
              '/images/hamburger.svg',
              '/images/logo-diadia.svg',
            ]


            projects.forEach(project => {
              project.galería.forEach(foto => {
                // urls.push(foto.url)
              })
            })

            bases.forEach(base => {
              base.galería.forEach(foto => {
                // urls.push(foto.url)
              })
            })

            this.p5 = new p5(sketch, 'loading-canvas')
          })
        })
      })
    })

    let sketch = (p) => {
      let bg
      let msk
      let radius = 0

      p.setup = () => {
        p.createCanvas(50, 50)
        bg = p.createGraphics(50, 50)
        msk = p.createGraphics(50, 50)

        this.preloadImages(urls, () => {
          setTimeout(() => {
            this.isDataLoaded = true
          }, 1000)
        })
      }

      p.draw = () => {
        p.clear()
        msk.clear()
        msk.noStroke()
        msk.fill('white')
        msk.circle(25, 25, 25)

        let h = p.lerp(13, 37, ease(this.t))

        bg.background('white')
        bg.noStroke()
        bg.fill('black')
        bg.rect(0, 0, h, p.height)

        let clone = bg.get()
        clone.mask(msk.get())
        p.image(clone, 0, 0)
        p.noFill()
        p.circle(25, 25, 25)
      }

      function ease(t) {
        return t < 0.5 ? 4 * p.pow(t, 3) : 1 - p.pow(-2 * t + 2, 3) / 2
      }

      function easeOutBack(t) {
        return 1 + 2.70158 * p.pow(t - 1, 3) + 1.70158 * p.pow(t - 1, 2)
      }

      function easeInBack(t) {
        return 2.70158 * p.pow(t, 3) - 1.70158 * p.pow(t, 2)
      }
    }
  },

  methods: {
    ...mapMutations({
      setProjects: 'setProjects',
      setStudioInfo: 'setStudioInfo',
      setContactInfo: 'setContactInfo',
      setBasesInfo: 'setBasesInfo',
    }),

    preloadImages(urls, allImagesLoadedCallback) {
      var loadedCounter = 0
      var toBeLoadedNumber = urls.length
      urls.forEach((url) => {
        this.preloadImage(url, () => {
          loadedCounter++
          this.t = loadedCounter / toBeLoadedNumber
          // console.log('t: ' + this.t)
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
      let height = document.getElementById('home').offsetTop
      gsap.to('#main', { top: -height, duration: 1, ease: 'power2.out' })
    },

    onWindowResize() {
      if (!this.isDataLoaded) return
      this.gotoHome()
    },
  },

  data() {
    return {
      percentage: 0,
      isDataLoaded: false,
      t: 0,
      p5: null,
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

  #loading-canvas {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  }
}
</style>