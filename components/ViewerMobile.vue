<template lang="pug">
#viewer-mobile(v-if='currentProject')
  #viewer-mobile-inner
    #image
      .content
        img
        #name {{ currentProject.nombre.toUpperCase() }}
        #footer
          .right {{ currentImage + 1 + "/" + currentProject.galería.length }}
    #arrow-left
      a(href='#')
        img(src='images/arrow-left.svg', @click='prevImage()')
    #arrow-right
      a(href='#')
        img(src='images/arrow-right.svg', @click='nextImage()')
    #close
      a(href='#')
        img(src='images/close.svg', @click='closeProject()', width='100%')
    #download(v-if='currentProject.descargable')
      a(:href="currentProject.descargable", target='__blank')
        img(src='images/download.svg', width='100%')
</template>

<script>
import { mapGetters } from 'vuex'
import tippy from 'tippy.js'
import 'tippy.js/dist/tippy.css'
import imagesloaded from 'imagesloaded'
import gsap from 'gsap'

export default {
  mounted() {
    if (!this.currentProject) return

    this.currentImage = 0
    console.log('show viewer')
    window.addEventListener('keydown', this.onKeydown)

    let image = document.querySelector('#viewer-mobile #image img')
    image.style.opacity = 1
    image.src = this.currentProject.galería[0].url

    let animation = gsap.timeline()

    let close = document.querySelector('#viewer-mobile #close')
    let download = document.querySelector('#viewer-mobile #download')
    let arrowLeft = document.querySelector('#viewer-mobile #arrow-left')
    let arrowRight = document.querySelector('#viewer-mobile #arrow-right')

    animation.set(close, { opacity: 0, scale: 0.6 }, 0)
    animation.set(download, { opacity: 0, scale: 0.6 }, 0)
    animation.set(arrowLeft, { opacity: 0, scale: 0.6 }, 0)
    animation.set(arrowRight, { opacity: 0, scale: 0.6 }, 0)

    imagesloaded('#viewer-mobile #viewer-mobile-inner', () => {
      animation.to(close, { opacity: 1, scale: 1, duration: 0.2 }, 0)
      animation.to(download, { opacity: 1, scale: 1, duration: 0.2 }, 0)
      animation.to(arrowLeft, { opacity: 1, scale: 1, duration: 0.2 }, 0)
      animation.to(arrowRight, { opacity: 1, scale: 1, duration: 0.2 }, 0)
    })

    tippy('#viewer-mobile #download', {
      content: 'descargar',
    })
  },

  beforeDestroy() {
    window.removeEventListener('keydown', this.onKeydown)
    this.currentImage = 0
  },

  methods: {
    onKeydown(e) {
      if (e.keyCode == 27) {
        this.closeProject()
        console.log('close')
      }

      if (e.keyCode == 37) {
        this.prevImage()
        console.log('prev', this.currentImage)
      }

      if (e.keyCode == 39) {
        this.nextImage()
        console.log('next', this.currentImage)
      }
    },

    prevImage() {
      this.currentImage--
      if (this.currentImage < 0) {
        this.currentImage = this.currentProject.galería.length - 1
      }
      this.currentUrl = this.currentProject.galería[this.currentImage].url
      this.loadImage()
    },

    nextImage() {
      this.currentImage++
      if (this.currentImage > this.currentProject.galería.length - 1) {
        this.currentImage = 0
      }
      this.currentUrl = this.currentProject.galería[this.currentImage].url
      this.loadImage()
    },

    loadImage() {
      let image = document.querySelector('#viewer-mobile #image img')
      image.style.opacity = 0.3

      let timer = setTimeout(() => {
        image.src = this.currentUrl
        image.onload = () => {
          image.style.opacity = 1
        }
      }, 100)
    },

    closeProject() {
      this.$nuxt.$emit('close-project')
    },

    selectGallery() {
      this.isText = false
    },

    selectText() {
      this.isText = true
    },
  },

  computed: {
    ...mapGetters({ projects: 'getProjects', currentProject: 'getCurrentProject' }),
  },

  data() {
    return {
      currentImage: 0,
      currentUrl: '',
      isText: false,
    }
  },
}
</script>

<style lang="sass" scoped>
#viewer-mobile
  position: fixed
  left: 0
  top: 0
  width: 100vw
  height: 100vh
  background-color: rgba(255, 255, 255, 1)
  display: flex
  justify-content: center
  align-items: center
  z-index: 5000

  #viewer-mobile-inner
    position: relative
    display: flex
    justify-content: center
    align-items: center

    #name
      position: absolute
      left: 0
      top: 0
      letter-spacing: 1px
      transform: translate(0, -100%);

    #image
      position: relative

      img
        top: 0
        left: 0
        max-height: 65vh
        max-width: 65vw
        transition: all 0.2s

    #footer
      position: relative
      top: 8px

      .right
        float: right

        img
          transform: translate(0, -10px)
          width: 20px
          margin-left: 7px
          margin-top: 9px
          transition: all 0.2s

          &:hover
            transform: translate(0, -10px) scale(1.1)
            transition: all 0.2s

  #arrow-left
    position: fixed
    left: 10px
    top: calc(50% - 35px)
    transform: scale(1.3)
    transition: all 0.2s

    img
      width: 50px

    &:hover
      transform: scale(1.5)
      transition: all 0.2s

  #arrow-right
    position: fixed
    right: 10px
    top: calc(50% - 35px)
    transform: scale(1.3)
    transition: all 0.2s

    img
      width: 50px

    &:hover
      transform: scale(1.5)
      transition: all 0.2s

  #close, #download
    position: fixed
    right: 20px
    top: 20px
    width: 35px
    transform: scale(0.9)
    transition: all 0.2s

    &:hover
      transform: scale(1)

  #download
    right: 60px

@media (max-width: 768px)
  #viewer-mobile
    #arrow-left
      left: 5px
      img
        width: 40px

    #arrow-right
      right: 5px
      img
        width: 40px
</style>