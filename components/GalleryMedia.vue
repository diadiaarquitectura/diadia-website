<template lang="pug">
#gallery-media
  .grid
    .grid-item(v-for='(image, i) in orderedImages')
      img.image(:src='image.url')
      .hover(@click='showProject(image.indiceProyecto)') {{ image.nombreProyecto.toUpperCase() }}
  transition(name='fade')
    project(v-if='isShowingProject')
</template>

<script>
import Project from '../components/Project'
import { mapGetters } from 'vuex'
import { mapMutations } from 'vuex'

import gsap from 'gsap'

export default {
  components: { Project },

  mounted() {
    this.$nuxt.$on('showProject', () => {
      this.isShowingProject = true
    })

    this.$nuxt.$on('closeProject', () => {
      this.isShowingProject = false
    })

    this.timer = setInterval(() => {
      this.masonry = new Masonry('#gallery-media .grid', {
        itemSelector: '#gallery-media .grid-item',
        horizontalOrder: true,
        gutter: 12,
      })

      let loaded = imagesLoaded('#gallery-media .grid')
      loaded.on('progress', (image) => {
        this.masonry.layout()
      })
    }, 50)
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

        images = images.sort((a, b) => {
          if (a.tipo > b.tipo) return -1
          if (a.tipo < b.tipo) return 1
          return 0
        })

        console.log(images)
        return images
      },
    },
  },

  methods: {
    ...mapMutations({ setProjects: 'setProjects', setCurrentProject: 'setCurrentProject' }),

    showProject(i) {
      this.$nuxt.$emit('showProject')
      this.setCurrentProject(i)
    },
  },

  data() {
    return {
      isShowingProject: false,
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
  top: 100px;
  height: calc(100% - 130px);
  width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  scrollbar-color: #ddd #f0f0f0;
  scrollbar-width: thin;

  .grid {
    .grid-item {
      width: calc((100% - 24px) / 3);
      margin-bottom: 12px;
      float: left;

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
        cursor: pointer;

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
  #gallery-media {
    height: calc(100% - 200px);
    top: 180px;
    .grid {
      .grid-item {
        width: calc((100% - 12px) / 2);
      }
    }
  }
}

@media (max-width: 768px) {
  #gallery-media {
    top: 180px;
    .grid {
      .grid-item {
        width: 100%;

        .hover {
          position: relative;
          background-color: white;
          color: black;
          display: inline-block;
          padding: 7px 0;
          text-align: left;

          &:hover {
            background-color: white;
          }
        }
      }
    }
  }
}
</style>