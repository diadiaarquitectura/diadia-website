<template lang="pug">
#hero
  transition(name='fade')
    .inner(v-if='isLoaded')
      .content
        .icons
          img(src='images/icons/icon-tiempo.svg')
          img(src='images/icons/icon-archivo.svg')
          img(src='images/icons/icon-uso.svg')
        .title BIENVENIDOS
        .text
          p Somos DIADIA Arquitectura
          p Diseñamos espacios cotidianos para <br> la convivencia, el encuentro, <br> el aprendizaje, la crianza y el diálogo.
      #arrow-down
        a(href='#', @click='gotoHome()')
          img(src='images/arrow-down.svg')
</template>

<script>
import gsap from 'gsap'
import imagesLoaded from 'imagesloaded'

export default {
  mounted() {
    imagesLoaded('#hero', () => {
      this.isLoaded = true
    })
  },

  methods: {
    gotoHome() {
      let height = document.getElementById('home').offsetTop
      gsap.to('#main', { top: -height, duration: 1, ease: 'power2.out' })
    },
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

#hero
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

    .icons
      img
        margin: 0 20px

    .title
      margin-top: 50px
      margin-bottom: 30px
      letter-spacing: 4px

    .text
      font-weight: 100

@media (max-width: 640px)
  #hero
    width: 250px

    .content
      text-align: center
      font-size: 1rem
</style>