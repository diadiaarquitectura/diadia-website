<template lang="pug">
#topbar
  #logo
    a(href='#', @click='gotoHome()') 
      img(src='images/logo-diadia.svg', alt='diadia', width='100%')
  #filters(:style='{ opacity: currentSection.includes("gallery") ? 1 : 0 }')
    .filter
      a(href='#', @click='onGalleryWorkClick()')
        .label(:style='{ opacity: currentSection == "gallery-work" ? 1 : 0 }') obra
        img(src='images/icons/icon-tiempo.svg', alt='tiempo', width='100%')
    .filter
      a(href='#', @click='onGalleryMediaClick()') 
        .label(:style='{ opacity: currentSection == "gallery-media" ? 1 : 0 }') medios
        img(src='images/icons/icon-archivo.svg', alt='uso', width='100%')
    .filter
      a(href='#', @click='onGalleryBasesClick()') 
        .label(:style='{ opacity: currentSection == "gallery-bases" ? 1 : 0 }') bases
        img(src='images/icons/icon-uso.svg', alt='archivo', width='100%')
  #menu-desktop(v-if='!isMobileMenu')
    ul
      li(:class='{ bold: currentSection.includes("gallery") }')
        a(href='#', @click='setCurrentSection("gallery-time"); onProjectsClick()') PROYECTOS
      li(:class='{ bold: currentSection == "studio" }')
        a(href='#', @click='setCurrentSection("studio")') ESTUDIO
      li(:class='{ bold: currentSection == "contact" }')
        a(href='#', @click='setCurrentSection("contact")') CONTACTO

  #hamburger(v-if='isMobileMenu', @click='showMobileMenu()')
    img(src='images/hamburger.svg')

  transition(name='fade')
    #menu-mobile(v-if='isMobileMenuActive' @click="onVeilClick($event)")
      .content
        ul
          li(:class='{ bold: currentSection.includes("gallery") }')
            a(
              href='#',
              @click='setCurrentSection("gallery-time"); onProjectsClick(); hideMobileMenu()'
            ) PROYECTOS
          li(:class='{ bold: currentSection == "studio" }')
            a(href='#', @click='setCurrentSection("studio"); hideMobileMenu()') ESTUDIO
          li(:class='{ bold: currentSection == "contact" }')
            a(href='#', @click='setCurrentSection("contact"); hideMobileMenu()') CONTACTO
</template>

<script>
import gsap from 'gsap'
import { mapGetters } from 'vuex'
import { mapMutations } from 'vuex'

export default {
  mounted() {
    setInterval(() => {
      if (window.innerWidth < 1200) {
        this.isMobileMenu = true
      } else {
        this.isMobileMenu = false
      }
    }, 100)
  },

  methods: {
    ...mapMutations({ setCurrentSection: 'setCurrentSection' }),

    gotoHome() {
      gsap.to('#main', { top: 0, duration: 0.8, ease: 'power2.out' })
    },

    onVeilClick(e) {
      console.log(e)
      if (e.clientX < window.innerWidth - 250) {
        this.isMobileMenuActive = false
      }
    },

    onProjectsClick() {
      this.setCurrentSection('gallery-work')
    },

    onGalleryWorkClick() {
      this.setCurrentSection('gallery-work')
    },

    onGalleryMediaClick() {
      this.setCurrentSection('gallery-media')
    },

    onGalleryBasesClick() {
      this.setCurrentSection('gallery-bases')
    },

    showMobileMenu() {
      this.isMobileMenuActive = true
    },

    hideMobileMenu() {
      this.isMobileMenuActive = false
    },
  },

  computed: {
    ...mapGetters({ currentSection: 'getCurrentSection' }),
  },

  data() {
    return {
      isMobileMenu: false,
      isMobileMenuActive: false,
    }
  },
}
</script>
<style lang="sass" scoped>
.fade-enter-active,
.fade-leave-active
  transition: opacity 0.2s

.fade-enter,
.fade-leave-to
  opacity: 0

#topbar
  position: absolute
  width: 100%
  height: 100px
  background-color: #00000000

  #hamburger
    position: absolute
    right: 4px
    top: 27px
    cursor: pointer

  #logo
    position: absolute
    top: 45px
    width: 170px

  #filters
    position: absolute
    top: 45px
    text-align: center
    width: 200px
    left: calc(50% - 100px)
    transition: all 0.2s

    .filter
      display: inline-block
      padding: 0px 13px

      a
        color: black
        text-decoration: none

      .label
        font-size: 0.85rem
        margin-bottom: 5px
        transition: all 0.4s

      img
        width: 20px
        transition: all 0.2s

        &:hover
          transform: scale(1.1)
          transition: all 0.2s

  #menu-desktop
    position: absolute
    right: 0px
    top: 70px

    ul
      list-style: none
      margin: 0
      padding: 0

      li
        display: inline-block
        padding-left: 40px
        letter-spacing: 1.5px
        font-size: 0.9rem

        a
          color: black
          text-decoration: none

        &:hover
          filter: brightness(2)

      .bold
        font-weight: bold

  #menu-mobile
    position: fixed
    left: 0px
    top: 0px
    height: 100vh
    width: 100vw
    background: rgba(0, 0, 0, 0.6)

    .content
      position: fixed
      right: 0px
      top: 0px
      height: 100%
      width: 250px
      background: white
      display: flex
      justify-content: center
      align-items: center

      img
        width: 180px
        margin-left: 35px
        margin-top: 50px

      ul
        list-style: none
        margin: 0
        padding: 0
        // margin-top: 50%

        li
          display: block
          letter-spacing: 1.5px
          font-size: 0.9rem
          padding-top: 15px

          a
            color: black
            text-decoration: none

          &:hover
            filter: brightness(2)

        .bold
          font-weight: bold

@media (max-width: 1200px)
  #topbar
    height: 190px

    #logo
      position: absolute
      top: 30px
      left: calc(50% - 85px)

    #filters
      top: 92px

    #hamburger
      top: 27px
</style>