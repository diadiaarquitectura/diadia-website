<template lang="pug">
#gallery-mobile
  #loading(v-if='!isLoaded')
    #loading-gallery-mobile
    .message cargando {{ parseInt(loader.t * 100) }}%
  .grid(:style='{ opacity: isLoaded ? 1 : 0 }')
    .grid-item.default(@click='showItem(item.nombre)', v-for='item in itemsDefault')
      img.image(:src='item.galería[0].url')
      .hover {{ item.nombre.toUpperCase() }}
    .grid-item.bases(@click='showItem(item.nombre)', v-for='item in itemsBases')
      img.image(:src='item.galería[0].url')
      .hover {{ item.nombre.toUpperCase() }}
    .grid-item.medias(@click='showItem(item.nombre)', v-for='item in itemsMedia')
      img.image(:src='item.galería[0].url')
      .hover {{ item.nombre.toUpperCase() }}
    .grid-item.work(@click='showItem(item.nombre)', v-for='item in itemsWork')
      img.image(:src='item.galería[0].url')
      .hover {{ item.nombre.toUpperCase() }}
  transition(name='fade')
    viewer-mobile(v-if='isShowingItem')
</template>

<script>
import ViewerMobile from '../components/ViewerMobile'
import { mapGetters } from 'vuex'
import { mapMutations } from 'vuex'
import imagesLoaded from 'imagesloaded'
import gsap from 'gsap'
import Loader from '../plugins/loader'
import Isotope from 'isotope-layout'
import { WheelGestures } from 'wheel-gestures'

export default {
  components: { ViewerMobile },

  props: ['type'],

  mounted() {
    let counter = 0
    this.loader = new Loader('loading-gallery-mobile')
    let grid = document.querySelector('#gallery-mobile .grid')

    requestAnimationFrame(this.update)

    this.imagesloaded = imagesLoaded(grid)

    // masonry
    this.masonry = new Isotope(grid, {
      itemSelector: '.grid-item',
      layoutMode: 'masonry',
      filter: '.base',
    })

    // images loaded
    this.imagesloaded.on('done', () => {
      this.isLoaded = true
    })

    this.imagesloaded.on('progress', () => {
      counter++
      this.loader.t = counter / this.imagesloaded.images.length
      if (this.loader.t >= 1) this.isLoaded = true
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

    relocate() {
      let grid = document.querySelector('#gallery-mobile .grid')
      if (!grid) return

      grid.style.display = 'none'
      setTimeout(() => {
        grid.style.display = 'block'
      }, 50)
    },

    update() {
      requestAnimationFrame(this.update)
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
      isLoaded: false,
      masonry: null,
      imagesloaded: null,
      loader: { t: 0 },
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

#gallery-mobile {
  position: absolute;
  width: 100%;
  padding: 0 3%;
  overflow-y: scroll;
  overflow-x: hidden;
  scrollbar-color: #ddd #f0f0f0;
  scrollbar-width: thin;
  top: 162px;
  height: calc(100% - 200px);

  #loading {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    #loading-gallery-mobile {
      display: block;
      height: 50px;
    }

    .message {
      display: block;
      color: black;
    }
  }

  .grid {
    opacity: 0;
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
</style>