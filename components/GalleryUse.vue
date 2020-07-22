<template lang="pug">
#gallery-use
  .grid
    .grid-item(v-for="project in orderedProjects")
      img.image(:src="project.galería[0].url")
      .hover(@click="showProject(project.nombre)") {{ project.nombre.toUpperCase() }}
  transition(name="fade")
    project(v-if="isShowingProject")
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
      this.masonry = new Masonry('#gallery-use .grid', {
        itemSelector: '#gallery-use .grid-item',
        horizontalOrder: true,
        gutter: 12
      })

      let loaded = imagesLoaded('#gallery-use .grid')
      loaded.on('progress', image => {
        // this.masonry.reloadItems()
        this.masonry.layout()
      })
    }, 50)
  },

  beforeDestroy() {
    document.getElementById('home').removeEventListener('wheel', this.onMouseWheel)
    clearInterval(this.timer)
  },

  computed: {
    ...mapGetters({ projects: 'getProjects', currentSection: 'getCurrentSection' }),

    orderedProjects: {
      get() {
        return [...this.projects]
          .sort((a, b) => {
            return new Date(a.tipologia) - new Date(b.tipologia)
          })
          .reverse()
      }
    }
  },

  methods: {
    ...mapMutations({ setProjects: 'setProjects', setCurrentProject: 'setCurrentProject' }),

    showProject(name) {
      this.$nuxt.$emit('showProject')
      this.projects.forEach((project, i) => {
        if (project.nombre == name) {
          this.setCurrentProject(i)
          return
        }
      })
    }
  },

  data() {
    return {
      isShowingProject: false,
      timer: 0,
      masonry: null
    }
  }
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

#gallery-use {
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
</style>