<template lang="pug">
#studio
  #loading-bases(v-if='!isLoaded')
  .grid(:style='{ opacity: isLoaded ? 1 : 0 }')
    .grid-item(v-for='image in studio.galería')
      img.image(:src='image.url')
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
    let grid = document.querySelector('#studio .grid')

    this.imagesloaded = imagesLoaded(grid)
    let counter = 0
    let loader = new Loader('loading-media')

    this.imagesloaded.on('done', () => {
      this.masonry = new Masonry(grid, {
        itemSelector: '#studio .grid-item',
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
    ...mapGetters({ studio: 'getStudioInfo' }),
  },

  methods: {
    ...mapMutations({ setCurrentProject: 'setCurrentProject' }),
  },

  data() {
    return {
      isShowingProject: false,
      isLoaded: false,
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

#studio {
  position: absolute;
  top: 150px;
  height: calc(100% - 170px);
  width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  scrollbar-color: #ddd #f0f0f0;
  scrollbar-width: thin;

  #loading-bases {
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

      img {
        width: 100% !important;
        height: auto !important;
      }
    }
  }
}

@media (max-width: 1200px) {
  #studio {
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