<template lang="pug">
#home
  transition(name='fade')
    .inner(v-show='isLoaded')
      .content
        .icons
          img(src='~/assets/icons/icon-tiempo.svg')
          img(src='~/assets/icons/icon-archivo.svg')
          img(src='~/assets/icons/icon-uso.svg')
        .title(v-html='homeInfo.titulo')
        .text(v-html='homeInfo.texto')
      #arrow-down
        a(href='#', @click='gotoHome()')
          img(src='images/arrow-home-down.svg')
</template>

<script>
import gsap from 'gsap'
import imagesLoaded from 'imagesloaded'
import { mapGetters } from 'vuex'
import { WheelGestures } from 'wheel-gestures'

export default {
  mounted() {
    imagesLoaded('#home', () => {
      this.isLoaded = true
      this.animateUp()
    })

    this.$nuxt.$on('reload-home', () => {
      this.animateDown()
    })

    const wheelGestures = WheelGestures()
    const element = window.document.querySelector('#home')
    wheelGestures.observe(element)

    wheelGestures.on('wheel', (wheelEventState) => {
      if (wheelEventState.isStart) {
        this.gotoHome()
      }
    })
  },

  methods: {
    gotoHome() {
      let height = document.getElementById('container').offsetTop
      gsap.to('#main', { top: -height, duration: 1, ease: 'power2.out' })
      this.$nuxt.$emit('default-selected')
      this.$nuxt.$emit('show-arrows')
    },

    animateUp() {
      let animation = gsap.timeline()

      let icons = document.querySelector('#home .icons')
      let title = document.querySelector('#home .title')
      let text = document.querySelector('#home .text')

      animation.set(icons, { y: '+=50', opacity: 0 }, 0)
      animation.set(title, { y: '+=50', opacity: 0 }, 0)
      animation.set(text, { y: '+=50', opacity: 0 }, 0)

      animation.to(icons, { y: 0, opacity: 1, duration: 0.8 }, 0)
      animation.to(title, { y: 0, opacity: 1, duration: 0.8 }, 0.1)
      animation.to(text, { y: 0, opacity: 1, duration: 0.8 }, 0.2)
    },

    animateDown() {
      let animation = gsap.timeline()

      let icons = document.querySelector('#home .icons')
      let title = document.querySelector('#home .title')
      let text = document.querySelector('#home .text')

      animation.set(icons, { y: '-=50', opacity: 0 }, 0)
      animation.set(title, { y: '-=50', opacity: 0 }, 0)
      animation.set(text, { y: '-=50', opacity: 0 }, 0)

      animation.to(icons, { y: 0, opacity: 1, duration: 0.8 }, 0.5)
      animation.to(title, { y: 0, opacity: 1, duration: 0.8 }, 0.4)
      animation.to(text, { y: 0, opacity: 1, duration: 0.8 }, 0.3)
    },
  },

  computed: {
    ...mapGetters({ homeInfo: 'getHomeInfo' }),
  },

  data() {
    return {
      isLoaded: false,
    }
  },
}
</script>

<style lang="sass" scoped>
@keyframes sine
  0%
    bottom: 30px
  50%
    bottom: 36px
  100%
    bottom: 30px

.fade-enter-active,
.fade-leave-active
  transition: opacity 0.6s

.fade-enter,
.fade-leave-to
  opacity: 0

#home
  position: relative
  width: 100%
  height: 100vh
  margin: auto
  background-color: white
  overflow: hidden
  display: flex
  justify-content: center
  align-items: center

  #arrow-down
    position: fixed
    left: calc(50% - 28px)
    animation-name: sine
    animation-duration: 1.5s
    animation-iteration-count: infinite

  .content
    text-align: center
    font-size: 1.6rem
    transform: translate(0, -3vh)

    .icons
      opacity: 0
      img
        margin: 0 20px

    .title
      opacity: 0
      margin-top: 50px
      margin-bottom: 30px
      letter-spacing: 4px

    .text
      opacity: 0
      font-weight: 100

@media (max-width: 640px)
  #home
    width: 250px

    .content
      text-align: center
      font-size: 1rem
</style>