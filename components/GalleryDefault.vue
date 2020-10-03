<template lang="pug">
#gallery-default
  #loading-work(v-if='!isLoaded')
  .grid(:style='{ opacity: isLoaded ? 1 : 0 }')
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
    let grid = document.querySelector('#gallery-default .grid')

    this.imagesloaded = imagesLoaded(grid)
    let counter = 0
    let loader = new Loader('loading-media')

    this.imagesloaded.on('done', () => {
      this.masonry = new Masonry(grid, {
        itemSelector: '#gallery-default .grid-item',
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

    this.$nuxt.$on('show-project', () => {
      this.isShowingProject = true
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
    ...mapGetters({
      projects: 'getProjects',
      bases: 'getBasesInfo',
    }),

    allItems() {
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
  },

  methods: {
    ...mapMutations({ setProjects: 'setProjects', setCurrentProject: 'setCurrentProject' }),

    showProject(name) {
      this.allItems.forEach((item, i) => {
        if (item.nombre == name) {
          this.setCurrentProject(item)
          return
        }
      })
      this.$nuxt.$emit('show-project')
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
        // border: solid 1px rgba(0, 0, 0, 0.05);

        &:hover {
          background-color: rgba(255, 255, 255, 0.85);
          color: rgba(0, 0, 0, 1);
          transition: all 0.3s;
          // border: solid 1px rgba(0, 0, 0, 0.08);
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
          border: solid 1px rgba(0, 0, 0, 0);

          &:hover {
            background-color: white;
          }
        }

        img {
          border: solid 1px rgba(0, 0, 0, 0.05);
        }
      }
    }
  }
}
</style>