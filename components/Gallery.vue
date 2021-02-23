<template lang="pug">
#gallery
  #arrows(v-if='isArrowsVisible')
    #arrow-up(@click='onUp()')
      img(src='/images/arrow-up.svg')
    #arrow-down(@click='onDown()')
      img(src='/images/arrow-down.svg')
  .grid
    .grid-item.default(@click='showItem(item.nombre)', v-for='item in itemsDefault')
      img.image.lozad.default(
        width='30%',
        height='100',
        src='~/assets/images/placeholder.svg',
        :data-src='item.galería[0].url'
      )
      .hover {{ item.nombre.toUpperCase() }}
    .grid-item.bases(@click='showItem(item.nombre)', v-for='item in itemsBases')
      img.image.lozad.bases(
        width='30%',
        height='100',
        src='~/assets/images/placeholder.svg',
        :data-src='item.galería[0].url'
      )
      .hover {{ item.nombre.toUpperCase() }}
    .grid-item.medias(@click='showItem(item.nombre)', v-for='item in itemsMedia')
      img.image.lozad.medias(
        width='30%',
        height='100',
        src='~/assets/images/placeholder.svg',
        :data-src='item.galería[0].url'
      )
      .hover {{ item.nombre.toUpperCase() }}
    .grid-item.work(@click='showItem(item.nombre)', v-for='item in itemsWork')
      img.image.lozad.work(
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

      let observer = lozad('#gallery .lozad.default')

      this.masonry.on('arrangeComplete', () => {
        observer.observe()
      })
    })

    this.$nuxt.$on('bases-selected', () => {
      this.masonry.arrange({
        filter: '.bases',
      })

      let observer = lozad('#gallery .lozad.bases')

      this.masonry.on('arrangeComplete', () => {
        observer.observe()
      })
    })

    this.$nuxt.$on('work-selected', () => {
      this.masonry.arrange({
        filter: '.work',
      })

      let observer = lozad('#gallery .lozad.work')

      this.masonry.on('arrangeComplete', () => {
        observer.observe()
      })
    })

    this.$nuxt.$on('media-selected', () => {
      this.masonry.arrange({
        filter: '.medias',
      })

      let observer = lozad('#gallery .lozad.medias')

      this.masonry.on('arrangeComplete', () => {
        observer.observe()
      })
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