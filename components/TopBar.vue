<template lang="pug">
#topbar
  #logo
    a(href='#', @click='gotoHome()') 
      img(src='/images/logo-diadia.svg', width='100%')
  #filters(v-if='isLoaded', :style='{ opacity: currentSection.includes("gallery") ? 1 : 0 }')
    .filter
      a(
        href='#',
        @mouseover='isMouseOverBases = true',
        @mouseleave='isMouseOverBases = false',
        @click='onGalleryBasesClick()'
      )
        .label(:style='{ opacity: galleryBasesOpacity }') bases
        img(src='/images/icons/icon-tiempo.svg', width='100%')
    .filter
      a(
        href='#',
        @mouseover='isMouseOverMedia = true',
        @mouseleave='isMouseOverMedia = false',
        @click='onGalleryMediaClick()'
      ) 
        .label(:style='{ opacity: galleryMediaOpacity }') medios
        img(src='images/icons/icon-archivo.svg', width='100%')
    .filter
      a(
        href='#',
        @mouseover='isMouseOverWork = true',
        @mouseleave='isMouseOverWork = false',
        @click='onGalleryWorkClick()'
      ) 
        .label(:style='{ opacity: galleryWorkOpacity }') obra
        img(src='images/icons/icon-uso.svg', width='100%')
  #menu-desktop(v-if='!isMobileMenu && isLoaded')
    ul
      li(:class='{ bold: currentSection.includes("gallery") }')
        a(href='#', @click='onProjectsClick()') PROYECTOS
      li(:class='{ bold: currentSection == "studio" }')
        a(href='#', @click='setCurrentSection("studio"); onStudio()') ESTUDIO
      li(:class='{ bold: currentSection == "contact" }')
        a(href='#', @click='setCurrentSection("contact")') CONTACTO

  #hamburger(v-if='isMobileMenu && isLoaded', @click='showMobileMenu()')
    img(src='images/hamburger.svg')

  #menu-mobile(v-if='isLoaded')
    .veil(@click='onVeilClick($event)')
    .content
      ul
        li(:class='{ bold: currentSection.includes("gallery") }')
          a(href='#', @click='onProjectsClick()') PROYECTOS
        li(:class='{ bold: currentSection == "studio" }')
          a(href='#', @click='setCurrentSection("studio"); hideMobileMenu(); onStudio()') ESTUDIO
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

    this.$nuxt.$on('page-loaded', () => {
      this.isLoaded = true
    })
  },

  methods: {
    ...mapMutations({ setCurrentSection: 'setCurrentSection' }),

    gotoHome() {
      gsap.to('#main', { top: 0, duration: 0.8, ease: 'power2.out' })
      this.$nuxt.$emit('reload-home')
    },

    onStudio() {
      this.$nuxt.$emit('studio-selected')
    },

    onVeilClick(e) {
      if (e.clientX < window.innerWidth - 250) {
        this.isMobileMenuActive = false
        this.hideMobileMenu()
      }
    },

    onProjectsClick() {
      this.hideMobileMenu()
      this.setCurrentSection('gallery-default')
      this.$nuxt.$emit('default-selected')
      gsap.to('#gallery', { scrollTop: '0', duration: 0.5 })
    },

    onGalleryWorkClick() {
      this.setCurrentSection('gallery-work')
      this.$nuxt.$emit('work-selected')
      gsap.to('#gallery', { scrollTop: '0', duration: 0.5 })
    },

    onGalleryMediaClick() {
      this.setCurrentSection('gallery-media')
      this.$nuxt.$emit('media-selected')
      gsap.to('#gallery', { scrollTop: '0', duration: 0.5 })
    },

    onGalleryBasesClick() {
      this.setCurrentSection('gallery-bases')
      this.$nuxt.$emit('bases-selected')
      gsap.to('#gallery', { scrollTop: '0', duration: 0.5 })
    },

    showMobileMenu() {
      this.isMobileMenuActive = true
      let animation = gsap.timeline()
      animation
        .set('#menu-mobile', { display: 'block' })
        .set('#menu-mobile .veil', { backgroundColor: 'rgba(0, 0, 0, 0)' })
        .set('#menu-mobile .content', { right: '-250px' })
        .to('#menu-mobile .veil', { backgroundColor: 'rgba(0, 0, 0, 0.7)', duration: 0.4 }, 0)
        .to('#menu-mobile .content', { right: '0', duration: 0.4 }, 0)
    },

    hideMobileMenu() {
      let animation = gsap.timeline()
      animation
        .to('#menu-mobile .veil', { backgroundColor: 'rgba(0, 0, 0, 0)', duration: 0.2 }, 0)
        .to('#menu-mobile .content', { right: '-250px', duration: 0.2 }, 0)
        .set('#menu-mobile', { display: 'none' })
    },
  },

  computed: {
    ...mapGetters({ currentSection: 'getCurrentSection' }),

    galleryWorkOpacity() {
      if (this.currentSection == 'gallery-work') {
        return 1
      } else {
        if (this.isMouseOverWork) return 0.4
        else return 0
      }
    },

    galleryMediaOpacity() {
      if (this.currentSection == 'gallery-media') {
        return 1
      } else {
        if (this.isMouseOverMedia) return 0.4
        else return 0
      }
    },

    galleryBasesOpacity() {
      if (this.currentSection == 'gallery-bases') {
        return 1
      } else {
        if (this.isMouseOverBases) return 0.4
        else return 0
      }
    },
  },

  data() {
    return {
      isMobileMenu: false,
      isMobileMenuActive: false,
      isMouseOverWork: false,
      isMouseOverMedia: false,
      isMouseOverBases: false,
      isLoaded: false,
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
  z-index: 4000

  #hamburger
    position: absolute
    right: 2.5vw
    top: 27px
    cursor: pointer

  #logo
    position: absolute
    top: 45px
    margin-left: 4%
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
    right: 3%
    top: 70px
    margin-right: 1%

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
    display: none

    .veil
      position: fixed
      left: 0px
      top: 0px
      height: 100vh
      width: 100vw
      background-color: rgba(0, 0, 0, 0)

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
      margin: 0
      left: calc(50% - 85px)

    #filters
      top: 92px

    #hamburger
      top: 27px
</style>