<template lang="pug">
#viewer(v-if='currentProject')
  #description(v-show='isText')
    div
      //- .date 2017
      .container
        .title Ubicación
        .text -
      .container
        .title Área
        .text -
      .container
        .title Cliente
        .text -
      .container
        .title Equipo
        .text -
      .container
        .title Colaboración
        .text -
      .container
        .title Fotografía
        .text -
      .container
        .text -
  #viewer-inner(v-show='!isText')
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
  #viewer-buttons
    #download(v-if='currentProject.descargable')
      a(:href='currentProject.descargable', target='__blank')
        img(src='images/download.svg', width='100%')
    #text
      a(href='#')
        img(src='images/description-off.svg', @click='viewDescription()', width='100%')
    #close
      a(href='#')
        img(
          src='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIgogICB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgaWQ9InN2ZzM4OTUiCiAgIHZlcnNpb249IjEuMSIKICAgdmlld0JveD0iMCAwIDEzLjIyOTE2NiAxMy4yMjkxNjciCiAgIGhlaWdodD0iNTAiCiAgIHdpZHRoPSI1MCI+CiAgPGRlZnMKICAgICBpZD0iZGVmczM4ODkiIC8+CiAgPG1ldGFkYXRhCiAgICAgaWQ9Im1ldGFkYXRhMzg5MiI+CiAgICA8cmRmOlJERj4KICAgICAgPGNjOldvcmsKICAgICAgICAgcmRmOmFib3V0PSIiPgogICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2Uvc3ZnK3htbDwvZGM6Zm9ybWF0PgogICAgICAgIDxkYzp0eXBlCiAgICAgICAgICAgcmRmOnJlc291cmNlPSJodHRwOi8vcHVybC5vcmcvZGMvZGNtaXR5cGUvU3RpbGxJbWFnZSIgLz4KICAgICAgICA8ZGM6dGl0bGU+PC9kYzp0aXRsZT4KICAgICAgPC9jYzpXb3JrPgogICAgPC9yZGY6UkRGPgogIDwvbWV0YWRhdGE+CiAgPGcKICAgICB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLC0yODUuNjIyOSkiCiAgICAgaWQ9ImxheWVyMSI+CiAgICA8cmVjdAogICAgICAgdHJhbnNmb3JtPSJyb3RhdGUoLTQ1KSIKICAgICAgIHk9IjIwNS45MDE0NyIKICAgICAgIHg9Ii0yMDIuODk1MzkiCiAgICAgICBoZWlnaHQ9IjEwLjgzNzY5NSIKICAgICAgIHdpZHRoPSIxLjg1ODk4MTMiCiAgICAgICBpZD0icmVjdDgzMiIKICAgICAgIHN0eWxlPSJmaWxsOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjEuNDQ0MjI7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1vcGFjaXR5OjAuNzcyMzk7cGFpbnQtb3JkZXI6bWFya2VycyBzdHJva2UgZmlsbCIgLz4KICAgIDxyZWN0CiAgICAgICB0cmFuc2Zvcm09InJvdGF0ZSg0NSkiCiAgICAgICBzdHlsZT0iZmlsbDojMDAwMDAwO3N0cm9rZS13aWR0aDoxLjQ0NDIyO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2Utb3BhY2l0eTowLjc3MjM5O3BhaW50LW9yZGVyOm1hcmtlcnMgc3Ryb2tlIGZpbGwiCiAgICAgICBpZD0icmVjdDgzMi0zIgogICAgICAgd2lkdGg9IjEuODU4OTgxMyIKICAgICAgIGhlaWdodD0iMTAuODM3Njk1IgogICAgICAgeD0iMjEwLjM5MDg0IgogICAgICAgeT0iMTk2LjU0NzA0IiAvPgogIDwvZz4KPC9zdmc+Cg==',
          @click='closeProject()',
          width='100%'
        )
</template>

<script>
import { mapGetters } from 'vuex'
import tippy from 'tippy.js'
import 'tippy.js/dist/tippy.css'
import imagesloaded from 'imagesloaded'
import gsap from 'gsap'

export default {
  mounted() {
    console.log(this.currentProject)
    // if (!this.currentProject) return

    this.$nuxt.$on('show-project', () => {
      this.currentImage = 0
      let image = document.querySelector('#image img')
      image.style.opacity = 1
      image.src = this.currentProject.galería[0].url

      console.log('imagen: ' + image.src)
    })

    this.currentImage = 0
    window.addEventListener('keydown', this.onKeydown)

    let image = document.querySelector('#image img')
    image.style.opacity = 1
    image.src = this.currentProject.galería[0].url

    let animation = gsap.timeline()

    let text = document.querySelector('#viewer #text')
    let close = document.querySelector('#viewer #close')
    let download = document.querySelector('#viewer #download')
    let arrowLeft = document.querySelector('#viewer #arrow-left')
    let arrowRight = document.querySelector('#viewer #arrow-right')

    animation.set(text, { opacity: 0, scale: 0.6 }, 0)
    animation.set(close, { opacity: 0, scale: 0.6 }, 0)
    animation.set(download, { opacity: 0, scale: 0.6 }, 0)
    animation.set(arrowLeft, { opacity: 0, scale: 0.6 }, 0)
    animation.set(arrowRight, { opacity: 0, scale: 0.6 }, 0)

    imagesloaded('#viewer #viewer-inner', () => {
      animation.to(text, { opacity: 1, scale: 1, duration: 0.2 }, 0)
      animation.to(close, { opacity: 1, scale: 1, duration: 0.2 }, 0)
      animation.to(download, { opacity: 1, scale: 1, duration: 0.2 }, 0)
      animation.to(arrowLeft, { opacity: 1, scale: 1, duration: 0.2 }, 0)
      animation.to(arrowRight, { opacity: 1, scale: 1, duration: 0.2 }, 0)
    })

    tippy('#viewer #download', {
      content: 'descargar',
    })

    tippy('#viewer #text', {
      content: 'ver descripción',
    })

    tippy('#viewer #close', {
      content: 'cerrar',
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
      let image = document.querySelector('#viewer #image img')
      image.style.opacity = 0.3

      let timer = setTimeout(() => {
        image.src = this.currentUrl
        image.onload = () => {
          image.style.opacity = 1
          image.style.backgroundColor = 'white'
        }
      }, 100)
    },

    closeProject() {
      this.$nuxt.$emit('close-project')
    },

    viewDescription() {
      this.isText = !this.isText
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
#viewer
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

  #description
    background-color: white
    width: 100%
    height: 100%
    max-width: 760px
    display: grid
    justify-content: center
    align-items: center
    padding: 2vw 0
    position: relative

    .date
      position: absolute
      right: 10vw
      top: 10vw
      font-weight: bold
      font-size: 16px

    .container
      margin-bottom: 10px
      .title
        font-weight: bold

  #viewer-inner
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
        min-width: 20vh
        min-height: 20vh
        border: none
        max-height: 65vh
        max-width: 65vw
        transition: all 0.2s
        background-color: #eee

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

  #viewer-buttons
    position: absolute
    top: 20px
    right: 20px

    #close, #download, #text
      width: 30px
      margin-left: 3px
      cursor: pointer
      display: inline-block

@media (max-width: 768px)
  #viewer
    #arrow-left
      left: 5px
      img
        width: 40px

    #arrow-right
      right: 5px
      img
        width: 40px
</style>