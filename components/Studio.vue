<template lang="pug">
#studio
  #loading-bases(v-if='!isLoaded')
  transition(name='fade')
    .grid(v-show='isLoaded')
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
    this.masonry = new Masonry('#studio .grid', {
      itemSelector: '#studio .grid-item',
      horizontalOrder: true,
      gutter: 12,
    })

    this.timer = setInterval(() => {
      this.masonry.layout()
    }, 100)

    let imagesloaded = imagesLoaded('#studio .grid')
    let counter = 0
    let loader = new Loader('loading-bases')

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
    ...mapGetters({ studio: 'getStudioInfo' }),
  },

  methods: {
    ...mapMutations({ setCurrentProject: 'setCurrentProject' }),
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