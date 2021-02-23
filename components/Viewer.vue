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
        img(
          :src='isText ? "images/description-on.svg" : "images/description-off.svg"',
          @click='viewDescription()',
          width='100%'
        )
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

    if (!this.isMobile()) {
      tippy('#viewer #download', {
        content: 'descargar',
      })

      tippy('#viewer #text', {
        interactive: true,
        content: 'descripción',
      })

      tippy('#viewer #close', {
        content: 'cerrar',
      })
    }
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

    isMobile() {
      let check = false
      ;(function (a) {
        if (
          /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
            a
          ) ||
          /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
            a.substr(0, 4)
          )
        )
          check = true
      })(navigator.userAgent || navigator.vendor || window.opera)
      return check
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