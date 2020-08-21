<template lang="pug">
#hero
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

export default {
  methods: {
    gotoHome() {
      let height = document.getElementById('home').offsetTop
      gsap.to('#main', { top: -height, duration: 1, ease: 'power2.out' })
    },
  },
}
</script>

<style lang="sass" scoped>
#arrow-down
  position: fixed
  top: calc(100% - 75px)
  left: calc(50% - 28px)
  animation-name: sine
  animation-duration: 1.5s
  animation-iteration-count: infinite

  // @keyframes sine
  //   0%
  //     bottom: 20px;

  //   50%
  //     bottom: 30px;

  //   100% 
  //     bottom: 20px;

#hero
  position: relative
  width: 100vw
  margin: auto
  height: 100vh
  background-color: white
  overflow: hidden
  display: flex
  justify-content: center
  align-items: center

  .content
    text-align: center
    font-size: 1.3rem

    .icons
      img
        margin: 0 20px
    .title
      margin-top: 50px
      margin-bottom: 30px
      letter-spacing: 4px

  @media (max-width: 768px)
    #hero
      width: 250px
</style>