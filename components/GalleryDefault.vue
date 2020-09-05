<template lang="pug">
#gallery-default
  #loading-work(v-if='!isLoaded')
  .grid(v-show='isLoaded')
    .grid-item(@click='showProject(item.nombre)', v-for='item in allItems')
      img.image(:src='item.galería[0].url')
      .hover {{ item.nombre.toUpperCase() }}
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
    let imagesloaded = imagesLoaded('#gallery-default .grid')
    let counter = 0
    let loader = new Loader('loading-media')

    imagesloaded.on('progress', (instance, image) => {
      counter++
      loader.t = counter / imagesloaded.images.length
      if (counter == imagesloaded.images.length) {
        this.isLoaded = true
      }
    })

    this.$nuxt.$on('showProject', () => {
      this.isShowingProject = true
    })

    this.$nuxt.$on('close-project', () => {
      this.isShowingProject = false
    })

    this.timer = setInterval(() => {
      this.masonry = new Masonry('#gallery-default .grid', {
        itemSelector: '#gallery-default .grid-item',
        horizontalOrder: true,
        gutter: 12,
      })

      imagesloaded.on('progress', (image) => {
        this.masonry.layout()
      })

      imagesloaded.on('always', (image) => {
        this.masonry.layout()
      })
    }, 100)
  },

  beforeDestroy() {
    clearInterval(this.timer)
  },

  computed: {
    ...mapGetters({
      projects: 'getProjects',
      currentSection: 'getCurrentSection',
      bases: 'getBasesInfo',
    }),

    allItems() {
      let items = []
      // agragar proyectos no terminados:
      this.projects.forEach((project) => {
        if (project.estado == 'noRealizado') {
          items.push({
            nombre: project.nombre,
            galería: project.galería,
          })
        }
      })

      // agragar proyectos terminados:
      this.projects.forEach((project) => {
        if (project.estado == 'realizado') {
          items.push({
            nombre: project.nombre,
            galería: project.galería,
          })
        }
      })

      // agregar bases
      this.bases.forEach((base) => {
        items.push({
          nombre: base.nombre,
          galería: base.galería,
        })
      })

      return items
    },
  },

  methods: {
    ...mapMutations({ setProjects: 'setProjects', setCurrentProject: 'setCurrentProject' }),

    showProject(name) {
      this.$nuxt.$emit('showProject')
      this.projects.forEach((project, i) => {
        if (project.nombre == name) {
          this.setCurrentProject(project)
          return
        }
      })
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

#gallery-default {
  position: absolute;
  top: 150px;
  height: calc(100% - 170px);
  width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  scrollbar-color: #ddd #f0f0f0;
  scrollbar-width: thin;

  #loading-work {
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
  #gallery-default {
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