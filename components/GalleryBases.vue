<template lang="pug">
#gallery-bases
  .grid
    .grid-item(v-for='(base, i) in bases')
      .image
      .hover base
</template>

<script>
import Project from '../components/Project'
import { mapGetters } from 'vuex'
import { mapMutations } from 'vuex'

import gsap from 'gsap'

export default {
  components: { Project },

  mounted() {
    this.timer = setInterval(() => {
      this.masonry = new Masonry('#gallery-bases .grid', {
        itemSelector: '#gallery-bases .grid-item',
        horizontalOrder: true,
        gutter: 12,
      })

      let loaded = imagesLoaded('#gallery-bases .grid')
      loaded.on('progress', (image) => {
        this.masonry.layout()
      })
    }, 50)
  },

  beforeDestroy() {
    clearInterval(this.timer)
  },

  computed: {
    // ...mapGetters({ projects: 'getProjects', currentSection: 'getCurrentSection' }),
    // orderedProjects: {
    //   get() {
    //     return this.projects
    //   },
    // },
  },

  methods: {
    // ...mapMutations({ setProjects: 'setProjects', setCurrentProject: 'setCurrentProject' }),
    // showProject(i) {
    //   this.$nuxt.$emit('showProject')
    //   this.setCurrentProject(i)
    // },
  },

  data() {
    return {
      isShowingProject: false,
      timer: 0,
      masonry: null,
      bases: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
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

#gallery-bases {
  position: absolute;
  top: 150px;
  height: calc(100% - 180px);
  width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  scrollbar-color: #ddd;
  scrollbar-width: thin;

  .grid {
    .grid-item {
      width: calc((100% - 24px) / 3);
      margin-bottom: 12px;
      float: left;
      background-color: #eee;
      height: 300px;

      .hover {
        position: absolute;
        color: rgba(0, 0, 0, 0.3);
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
      }

      img {
        width: 100% !important;
        height: auto !important;
      }
    }
  }
}

@media (max-width: 1200px) {
  #gallery-bases {
    height: calc(100% - 200px);
    top: 162px;
    .grid {
      .grid-item {
        width: 100%;

        .hover {
          position: relative;
          color: black;
          padding: 7px 0;
          text-align: left;

          &:hover {
            background-color: #f9f9f9;
          }
        }
      }
    }
  }
}
</style>