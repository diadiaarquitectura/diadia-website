<template lang="pug">
#gallery-media
  #loading-media(v-if='!isLoaded')
  transition(name='fade')
    .grid(v-show='isLoaded')
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
    this.masonry = new Masonry('#gallery-media .grid', {
      itemSelector: '#gallery-media .grid-item',
      horizontalOrder: true,
      gutter: 12,
    })

    this.timer = setInterval(() => {
      this.masonry.layout()
    }, 100)

    let imagesloaded = imagesLoaded('#gallery-media .grid')
    let counter = 0
    let loader = new Loader('loading-media')

    imagesloaded.on('progress', (instance, image) => {
      counter++
      loader.t = counter / imagesloaded.images.length
    })

    imagesloaded.on('done', () => {
      console.log('complete')
      this.isLoaded = true
    })

    this.$nuxt.$on('show-project', () => {
      this.isShowingProject = true
    })

    this.$nuxt.$on('close-project', () => {
      this.isShowingProject = false
    })
  },

  beforeDestroy() {
    clearInterval(this.timer)
  },

  computed: {
    ...mapGetters({ projects: 'getProjects', currentSection: 'getCurrentSection' }),

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
      this.$nuxt.$emit('show-project')
      this.setCurrentProject(this.projects[i])
    },
  },

  data() {
    return {
      isShowingProject: false,
      isLoaded: false,
      timer: 0,
      masonry: null,
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
        width: 100% !important;
        height: auto !important;
      }
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