<template lang="pug">
#gallery
  #arrows(v-if='isArrowsVisible')
    #arrow-up(@click='onUp()')
      img(src='/images/arrow-up.svg')
    #arrow-down(@click='onDown()')
      img(src='/images/arrow-down.svg')
  .grid
    .grid-item.default(@click='showItem(item.nombre)', v-for='item in itemsDefault')
      img.image.lozad(
        width='30%',
        height='100',
        src='~/assets/images/placeholder.svg',
        :data-src='item.galería[0].url'
      )
      .hover {{ item.nombre.toUpperCase() }}
    .grid-item.bases(@click='showItem(item.nombre)', v-for='item in itemsBases')
      img.image.lozad(
        width='30%',
        height='100',
        src='~/assets/images/placeholder.svg',
        :data-src='item.galería[0].url'
      )
      .hover {{ item.nombre.toUpperCase() }}
    .grid-item.medias(@click='showItem(item.nombre)', v-for='item in itemsMedia')
      img.image.lozad(
        width='30%',
        height='100',
        src='~/assets/images/placeholder.svg',
        :data-src='item.galería[0].url'
      )
      .hover {{ item.nombre.toUpperCase() }}
    .grid-item.work(@click='showItem(item.nombre)', v-for='item in itemsWork')
      img.image.lozad(
        width='30%',
        height='100',
        src='~/assets/images/placeholder.svg',
        :data-src='item.galería[0].url'
      )
      .hover {{ item.nombre.toUpperCase() }}
  transition(name='fade')
    viewer(v-if='isShowingItem')
</template>

<script>
import Viewer from '../components/Viewer'
import { mapGetters, mapMutations } from 'vuex'
import imagesLoaded from 'imagesloaded'
import gsap from 'gsap'
import lozad from 'lozad'

export default {
  components: { Viewer },

  props: ['type'],

  mounted() {
    let grid = document.querySelector('#gallery .grid')

    this.imagesloaded = imagesLoaded(grid)

    // masonry
    this.masonry = new Isotope(grid, {
      itemSelector: '#gallery .grid-item',
      filter: '.base',
      masonry: {
        horizontalOrder: true,
      },
    })

    let observer = lozad('#gallery .lozad')

    this.masonry.on('arrangeComplete', () => {
        observer.observe()
    })

    setInterval(() => {
      this.masonry.layout()
    }, 100)

    this.imagesloaded.on('progress', () => {
      this.masonry.layout()
    })

    // content
    this.$nuxt.$on('show-project', () => {
      this.isShowingItem = true
    })

    this.$nuxt.$on('close-project', () => {
      this.isShowingItem = false
    })

    this.$nuxt.$on('default-selected', () => {
      this.masonry.arrange({
        filter: '.default',
      })

      setTimeout(() => {
        this.masonry.layout()
      }, 100)

      this.relocate()
    })

    this.$nuxt.$on('bases-selected', () => {
      this.masonry.arrange({
        filter: '.bases',
      })

      setTimeout(() => {
        this.masonry.layout()
      }, 100)

      this.relocate()
    })

    this.$nuxt.$on('work-selected', () => {
      this.masonry.arrange({
        filter: '.work',
      })

      setTimeout(() => {
        this.masonry.layout()
      }, 100)

      this.relocate()
    })

    this.$nuxt.$on('media-selected', () => {
      this.masonry.arrange({
        filter: '.medias',
      })

      setTimeout(() => {
        this.masonry.layout()
      }, 100)

      this.relocate()
    })

    // arrows
    this.$nuxt.$on('show-arrows', () => {
      this.isArrowsVisible = true
    })

    this.$nuxt.$on('hide-arrows', () => {
      this.isArrowsVisible = false
    })
  },

  computed: {
    ...mapGetters({ projects: 'getProjects', currentSection: 'getCurrentSection' }),

    items() {
      return [...this.itemsBases, ...this.itemsWork, ...this.itemsDefault, ...this.itemsMedia]
    },

    itemsBases() {
      return this.projects.filter((project) => {
        return project.estado == 'base'
      })
    },

    itemsWork() {
      let items = []

      // agragar proyectos terminados:
      this.projects.forEach((project) => {
        if (project.estado == 'realizado') {
          items.push({
            nombre: project.nombre,
            galería: project.galería,
          })
        }
      })

      // agragar proyectos no terminados:
      this.projects.forEach((project) => {
        if (project.estado == 'noRealizado') {
          items.push({
            nombre: project.nombre,
            galería: project.galería,
          })
        }
      })

      return items
    },

    itemsDefault() {
      let items = []
      // agragar proyectos no terminados:
      this.projects.forEach((project) => {
        items.push({
          nombre: project.nombre,
          galería: project.galería,
          descargable: project.descargable,
        })
      })

      return items
    },

    itemsMedia() {
      let images = []

      // agragar sketch:
      this.projects.forEach((project, index) => {
        if (project.estado != 'base') {
          project.galería.forEach((image, i) => {
            image.nombre = project.nombre
            image.indiceProyecto = index
            image.galería = [project.galería[i]]
            images.push(image)
          })
        }
      })

      let order = {
        sketch: 0,
        diagramas: 1,
        maquetas: 2,
        planimetrias: 3,
        vista3d: 4,
        fotoObra: 5,
        fotoUso: 6,
      }

      images = images.sort((a, b) => {
        if (order[a.tipo] < order[b.tipo]) return -1
        if (order[a.tipo] > order[b.tipo]) return 1
        return 0
      })

      return images
    },
  },

  methods: {
    ...mapMutations({ setCurrentProject: 'setCurrentProject' }),

    onImageEnter() {
      console.log('enter')
      this.masonry.layout()
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

    relocate() {
      this.scrollTop = 0
      if (this.isMobile()) {
        let grid = document.querySelector('#gallery .grid')
        if (!grid) return

        grid.style.display = 'none'
        setTimeout(() => {
          grid.style.display = 'block'
        }, 5)
      }
    },

    onUp() {
      let gallery = document.querySelector('#gallery')
      gsap.to('#gallery', { scrollTop: gallery.scrollTop - 200, duration: 0.5 })
    },

    onDown() {
      let gallery = document.querySelector('#gallery')
      gsap.to('#gallery', { scrollTop: gallery.scrollTop + 200, duration: 0.5 })
    },

    showItem(name) {
      for (let i = 0; i < this.items.length; i++) {
        let item = this.items[i]
        if (item.nombre == name) {
          this.setCurrentProject(item)
          break
        }
      }

      this.$nuxt.$emit('show-project')
    },
  },

  data() {
    return {
      isShowingItem: false,
      masonry: null,
      imagesloaded: null,
      scrollTop: 0,
      loader: { t: 0 },
      isArrowsVisible: false,
    }
  },
}
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

img.loaded {
  background-color: white;
}

#gallery {
  position: absolute;
  top: 150px;
  height: calc(100% - 170px);
  width: 100%;
  padding: 0 3%;
  overflow-x: hidden;
  overflow-y: scroll;
  scrollbar-color: #ddd #f0f0f0;
  scrollbar-width: thin;

  #arrow-up,
  #arrow-down {
    position: fixed;
    right: 2.5%;
    width: 1%;
    height: 1%;
    cursor: pointer;

    img {
      width: 100%;
    }
  }

  #arrow-up {
    top: calc(50% - 2.5%);
  }

  #arrow-down {
    top: calc(50% + 2.5%);
  }

  .grid {
    transition: opacity 0.6s;
    margin-bottom: 50px;

    .grid-item {
      width: 31.9%;
      margin-left: 0.7%;
      margin-right: 0.7%;
      margin-top: 0;
      margin-bottom: 1.4%;
      float: left;
      cursor: pointer;
      position: relative;

      .hover {
        position: absolute;
        background-color: rgba(255, 255, 255, 0);
        color: rgba(0, 0, 0, 0);
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        font-size: 0.9rem;
        letter-spacing: 1px;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all 0.3s;

        &:hover {
          background-color: rgba(255, 255, 255, 0.85);
          color: rgba(0, 0, 0, 1);
          transition: all 0.3s;
        }
      }

      img {
        width: 100% !important;
        height: auto !important;
      }
    }
  }
}

@media (max-width: 767px) {
  #arrows {
    display: none;
  }

  #gallery {
    position: absolute;
    width: 100%;
    padding: 0 3% 100px 3%;
    overflow-x: hidden;
    overflow-y: scroll;
    scrollbar-color: #ddd #f0f0f0;
    scrollbar-width: thin;
    top: 162px;
    height: calc(100% - 200px);

    .grid {
      overflow-x: hidden;
      overflow-y: hidden;
      transition: opacity 0.6s;

      .grid-item {
        width: 100%;
        margin-left: 0.7%;
        margin-right: 0.7%;
        margin-top: 0;
        margin-bottom: 1.4%;
        float: left;
        cursor: pointer;
        position: relative;

        .hover {
          width: 100%;
          height: 100%;
          font-size: 0.9rem;
          letter-spacing: 1px;
          justify-content: center;
          align-items: center;
          transition: all 0.3s;
          position: relative;
          background-color: rgba(255, 255, 255, 0);
          color: black;
          display: block;
          padding: 7px 0;
          text-align: left;
          top: 0;
          left: 0;
        }

        img {
          position: relative;
          display: block;
          width: 100% !important;
          height: auto !important;
        }
      }
    }
  }
}
</style>