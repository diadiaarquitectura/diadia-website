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

    let urls = ['./_nuxt/img/e6b22c8.svg']
    this.preloadImages(urls, () => {})

    axios.get('content/proyectos.json').then((response) => {
      this.setProjects(response.data.proyectos)
    })

    axios.get('content/estudio.json').then((response) => {
      this.setStudioInfo(response.data)
    })

    axios.get('content/contacto.json').then((response) => {
      this.setContactInfo(response.data)
    })

    axios.get('content/bases.json').then((response) => {
      this.setBasesInfo(response.data)
    })

    let sketch = (p) => {
      let bg
      let msk
      let t = 0
      let tRadiusInit = 0
      let tRadiusEnd = 0
      let radius = 0
      let state = 'init'
      let counter = 0

      p.setup = () => {
        p.createCanvas(50, 50)
        bg = p.createGraphics(50, 50)
        msk = p.createGraphics(50, 50)
      }

      p.draw = () => {
        p.clear()
        msk.clear()
        msk.noStroke()
        msk.fill('white')
        msk.circle(25, 25, radius)

        switch (state) {
          case 'init': {
            radius = p.lerp(0, 24, easeOutBack(tRadiusInit))
            tRadiusInit += 0.05
            if (tRadiusInit > 1) tRadiusInit = 1

            let h = p.lerp(13, 37, ease(t))
            t += 0.005

            if (t > 1) {
              t = 0
              state = 'white'
              counter++
            }

            bg.background('white')
            bg.noStroke()
            bg.fill('black')
            bg.rect(0, 0, h, p.height)

            break
          }

          case 'black': {
            let h = p.lerp(13, 37, ease(t))
            t += 0.015

            if (t > 1) {
              t = 0
              state = 'white'
              counter++
            }

            bg.background('white')
            bg.noStroke()
            bg.fill('black')
            bg.rect(0, p.height, p.width - h, h)

            break
          }

          case 'white': {
            let h = p.lerp(13, 37, ease(t))
            t += 0.015

            if (t > 1) {
              t = 0
              state = 'black'
              counter++
            }

            bg.background('black')
            bg.noStroke()
            bg.fill('white')
            bg.rect(0, p.height, p.width - h, h)

            break
          }

          case 'end': {
            radius = p.lerp(24, 0, ease(tRadiusEnd))
            tRadiusEnd += 0.025
            if (tRadiusEnd > 1) {
              state = 'none'
              tRadiusEnd = 1

              this.isDataLoaded = true
              loadingAnimation.remove()
            }

            let h = p.lerp(13, 37, ease(t))
            t += 0.015

            if (t > 1) {
              t = 0
            }

            bg.background('black')
            bg.noStroke()
            bg.fill('white')
            bg.rect(0, p.height, p.width - h, h)

            break
          }

          case 'none': {
            break
          }
        }

        if (counter == 1) state = 'end'

        let clone = bg.get()
        clone.mask(msk.get())
        p.image(clone, 0, 0)
        p.noFill()
        p.circle(25, 25, radius)
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

    let loadingAnimation = new p5(sketch, 'loading-canvas')
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
          console.log('Number of loaded images: ' + loadedCounter)
          if (loadedCounter == toBeLoadedNumber) {
            // allImagesLoadedCallback()
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