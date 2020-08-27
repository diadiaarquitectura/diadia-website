<template lang="pug">
#base
  #base-inner
    #image
      .content
        img
        #name {{ bases[currentBase].nombre.toUpperCase() }}
        #footer
          .right {{ currentImage + 1 + "/" + bases[currentBase].galería.length }}
    #arrow-left(v-if='currentImage > 0')
      a(href='#')
        img(src='images/arrow-left.svg', @click='prevImage()')
    #arrow-right(v-if='currentImage < bases[currentBase].galería.length - 1')
      a(href='#')
        img(src='images/arrow-right.svg', @click='nextImage()')
    #close
      a(href='#')
        img(src='images/close.svg', @click='closeBase()', width='100%')
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  mounted() {
    let image = document.querySelector('#image img')
    image.style.opacity = 1
    image.src = this.bases[this.currentBase].galería[0].url
  },

  methods: {
    prevImage() {
      this.currentImage--
      if (this.currentImage < 0) {
        this.currentImage = 0
      }
      this.currentUrl = this.bases[this.currentBase].galería[this.currentImage].url
      this.loadImage()
    },

    nextImage() {
      this.currentImage++
      if (this.currentImage > this.bases[this.currentBase].galería.length - 1) {
        this.currentImage = this.bases[this.currentBase].galería.length - 1
      }
      this.currentUrl = this.bases[this.currentBase].galería[this.currentImage].url
      this.loadImage()
    },

    loadImage() {
      let image = document.querySelector('#image img')
      image.style.opacity = 0.3

      let timer = setTimeout(() => {
        image.src = this.currentUrl
        image.onload = () => {
          image.style.opacity = 1
        }
      }, 200)
    },

    closeBase() {
      this.$nuxt.$emit('close-base')
    },

    selectGallery() {
      this.isText = false
    },

    selectText() {
      this.isText = true
    },
  },

  computed: {
    ...mapGetters({ bases: 'getBasesInfo', currentBase: 'getCurrentBase' }),
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
#base
  position: fixed
  left: 0
  top: 0
  z-index: 10
  width: 100vw
  height: 100vh
  background-color: rgba(255, 255, 255, 1)
  display: flex
  justify-content: center
  align-items: center

  #base-inner
    position: relative
    display: flex
    justify-content: center
    align-items: center

    #name
      position: absolute
      left: 0
      top: -25px
      letter-spacing: 1px

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

  #close
    position: fixed
    right: 20px
    top: 20px
    transform: scale(0.9)
    transition: all 0.2s

    &:hover
      transform: scale(1)
      transition: all 0.2s

@media (max-width: 768px)
  #base
    #arrow-left
      left: 5px
      
      img
        width: 40px

    #arrow-right
      right: 5px

      img
        width: 40px
</style>