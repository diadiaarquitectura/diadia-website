<template lang="pug">
#gallery-media
  #loading-media(v-if='!isLoaded')
  .grid(:style='{ opacity: isLoaded ? 1 : 0 }')
    .grid-item(@click='showProject(image.indiceProyecto)', v-for='(image, i) in orderedImages')
      img.image(:src='image.url')
      .hover {{ image.nombreProyecto.toUpperCase() }}
  transition(name='fade')
    viewer(v-if='isShowingProject')
</template>

<script>
import Viewer from '../components/Viewer'
import { mapGetters } from 'vuex'
import { mapMutations } from 'vuex'
import imagesLoaded from 'imagesloaded'
import gsap from 'gsap'
import Loader from '../plugins/loader'

export default {
  components: { Viewer },

  mounted() {
    let grid = document.querySelector('#gallery-media .grid')

    this.imagesloaded = imagesLoaded(grid)
    let counter = 0
    let loader = new Loader('loading-media')

    this.imagesloaded.on('done', () => {
      this.masonry = new Masonry(grid, {
        itemSelector: '#gallery-media .grid-item',
        horizontalOrder: true,
        gutter: 12,
      })

      this.masonry.on('layoutComplete', () => {
        this.isLoaded = true
      })
      this.masonry.layout()
      // window.dispatchEvent(new Event('resize'))
    })

    this.imagesloaded.on('progress', () => {
      counter++
      loader.t = counter / this.imagesloaded.images.length
    })

    this.$nuxt.$on('close-project', () => {
      this.isShowingProject = false
    })
  },

  beforeDestroy() {
    this.imagesloaded.off('progress')
    this.masonry.off('layoutComplete')
  },

  computed: {
    ...mapGetters({ projects: 'getProjects' }),

    orderedImages: {
      get() {
        let images = []
        this.projects.forEach((project, index) => {
          project.galería.forEach((image) => {
            image.nombreProyecto = project.nombre
            image.indiceProyecto = index
            images.push(image)
          })
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
  },

  methods: {
    ...mapMutations({ setProjects: 'setProjects', setCurrentProject: 'setCurrentProject' }),

    showProject(i) {
      this.isShowingProject = true
      this.setCurrentProject(this.projects[i])
    },
  },

  data() {
    return {
      isShowingProject: false,
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

#gallery-media {
  position: absolute;
  top: 150px;
  height: calc(100% - 170px);
  width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  scrollbar-color: #ddd #f0f0f0;
  scrollbar-width: thin;

  #loading-media {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .text {
      color: #ccc;
    }
  }

  .grid {
    opacity: 0;
    transition: opacity 0.6s;

    .grid-item {
      width: calc((100% - 24px) / 3);
      margin-bottom: 12px;
      float: left;
      cursor: pointer;

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
        border: solid 1px rgba(0, 0, 0, 0);

        &:hover {
          background-color: rgba(255, 255, 255, 0.85);
          color: rgba(0, 0, 0, 1);
          transition: all 0.3s;
          border: solid 1px rgba(0, 0, 0, 0.08);
        }
      }

      img {
        display: block;
        max-width: 100%;
        width: 100% !important;
        height: auto !important;
      }
    }

    &:after {
      content: '';
      display: block;
      clear: both;
    }
  }
}

@media (max-width: 1200px) {
  #gallery-media {
    top: 162px;
    height: calc(100% - 200px);
    .grid {
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