<template lang="pug">
#gallery
  #loading(v-if='!isLoaded')
  #grid(:style='{ opacity: isLoaded ? 1 : 0 }')
    .grid-item.default(@click='showItem(item.nombre)', v-for='item in itemsDefault')
      img.image(:src='item.galería[0].url')
      .hover {{ item.nombre.toUpperCase() }}
    .grid-item.bases(@click='showItem(item.nombre)', v-for='item in itemsBases')
      img.image(:src='item.galería[0].url')
      .hover {{ item.nombre.toUpperCase() }}
    .grid-item.media(@click='showItem(item.nombre)', v-for='item in itemsMedia')
      img.image(:src='item.galería[0].url')
      .hover {{ item.nombre.toUpperCase() }}
    .grid-item.work(@click='showItem(item.nombre)', v-for='item in itemsWork')
      img.image(:src='item.galería[0].url')
      .hover {{ item.nombre.toUpperCase() }}
  transition(name='fade')
    viewer(v-if='isShowingItem')
</template>

<script>
import Viewer from '../components/Viewer'
import { mapGetters } from 'vuex'
import { mapMutations } from 'vuex'
import imagesLoaded from 'imagesloaded'
import gsap from 'gsap'
import Loader from '../plugins/loader'
import Isotope from 'isotope-layout'
import { WheelGestures } from 'wheel-gestures'

export default {
  components: { Viewer },

  props: ['type'],

  mounted() {
    let counter = 0
    let loader = new Loader('loading-media')
    let grid = document.querySelector('#gallery #grid')

    // masonry
    this.masonry = new Isotope(grid, {
      itemSelector: '.grid-item',
      layoutMode: 'masonry',
      filter: '.base',
    })

    // this.masonry.on('arrangeComplete', () => {
    //   console.log('hola')
    //   this.masonry.layout()
    //   document.getElementById('grid').style.top = 0
    // })

    // images loaded
    this.imagesloaded = imagesLoaded(grid)
    this.imagesloaded.on('done', () => {
      this.isLoaded = true
    })

    this.imagesloaded.on('progress', () => {
      counter++
      loader.t = counter / this.imagesloaded.images.length
      this.masonry.layout()
    })

    // events
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

      console.log('default')
    })

    this.$nuxt.$on('bases-selected', () => {
      this.masonry.arrange({
        filter: '.bases',
      })
    })

    this.$nuxt.$on('work-selected', () => {
      this.masonry.arrange({
        filter: '.work',
      })
    })

    this.$nuxt.$on('media-selected', () => {
      this.masonry.arrange({
        filter: '.media',
      })
    })
  },

  computed: {
    ...mapGetters({ projects: 'getProjects' }),

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

    showItem(name) {
      for (let i = 0; i < this.items.length; i++) {
        let item = this.items[i]
        if (item.nombre == name) {
          console.log(item, this.nombre)
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
      isLoaded: false,
      masonry: null,
      imagesloaded: null,
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

#gallery {
  position: absolute;
  top: 150px;
  height: calc(100% - 170px);
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-color: #ddd #f0f0f0;
  scrollbar-width: thin;

  #loading {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .text {
      color: #ccc;
    }
  }

  #grid {
    opacity: 0;
    transition: opacity 0.6s;

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

@media (max-width: 1200px) {
  #gallery {
    top: 162px;
    height: calc(100% - 200px);
    #grid {
      .grid-item {
        width: 100%;
        position: relative;

        .hover {
          position: relative;
          background-color: white;
          color: black;
          display: inline-block;
          padding: 7px 0;
          text-align: left;
          top: 0;
          left: 0;

          &:hover {
            background-color: white;
          }
        }
      }
    }
  }
}
</style>