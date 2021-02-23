<template lang="pug">
#viewer(v-if='currentProject')
  #description(v-show='isText')
    div
      //- .date 2017
      .container
        .title Ubicación
        .text Comunidad Yagua Las Palmeras, Perú
      .container
        .title Área
        .text Terreno 4,500 m2
        .text Techada 950 m2
      .container
        .title Cliente
        .text FADV Fondazione l'Albero delta Vita
      .container
        .title Equipo
        .text Michele Albaneli, Carmen Omonte con Alonso Melgar
      .container
        .title Colaboración
        .text -
      .container
        .title Fotografía
        .text -
      .container
        .text Contener la selva <br> El proyecto busca crear una nueva centralidad educativa y cívica, que permita el encuentro de toda la comunidad. Propiciando una condición íntima en el extenso entorno de la selva. Se busca "asignar escala" a la selva, medirla, contenerla a través de la arquitectura de la escuela.<br>El sistema circular de organización y distribución de las estructuras propone una variante al tradicional sistema lineal de organicación de los palafitos, y permite la constante relación entre los usuarios de la escuela y el entorno.<br>Se usan técnicas constructivas, materiales, tipologías típicas de la comunidad, generando así un vínculo simbólico e identitario con la misma.
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
  //- #download(v-if='currentProject.descargable')
  #viewer-buttons
    #download(v-if='true')
      a(:href='currentProject.descargable', target='__blank')
        img(src='images/download.svg', width='100%')
    #text
      a(href='#')
        img(src='images/description-off.svg', @click='viewDescription()', width='100%')
    #close
      a(href='#')
        img(src='images/close.svg', @click='closeProject()', width='100%')
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

  #viewer-buttons
    position: absolute
    top: 20px
    right: 20px

    #close, #download, #text
      width: 30px
      margin-left: 3px
      // transform: scale(0.9)
      // transition: all 0.2s
      cursor: pointer
      display: inline-block

      // &:hover
      //   transform: scale(1)

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