<template lang="pug">
#studio-mobile
  #loading(v-if='!isLoaded')
    #loading-studio
    .message cargando {{ parseInt(loader.t * 100) }}%
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
import Loader from '../plugins/loader'
import imagesLoaded from 'imagesloaded'

export default {
  components: { Viewer },

  mounted() {
    let counter = 0
    this.loader = new Loader('loading-studio')
    let grid = document.querySelector('#studio-mobile .grid')
    document.querySelector('#studio-mobile').style.overflowY = 'hidden'

    this.imagesloaded = imagesLoaded(grid)

    this.masonry = new Isotope(grid, {
      itemSelector: '.grid-item',
      masonry: {
        horizontalOrder: true,
      },
    })

    this.imagesloaded.on('done', () => {
      this.isLoaded = true
    })

    this.imagesloaded.on('progress', () => {
      this.masonry.layout()
    })

    this.$nuxt.$on('show-project', () => {
      this.isShowingProject = true
    })

    this.$nuxt.$on('close-project', () => {
      this.isShowingProject = false
    })

    this.$nuxt.$on('studio-selected', () => {
      this.masonry.arrange()

      setTimeout(() => {
        this.masonry.layout()
      }, 100)
    })
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
      scrollTop: 0,
      loader: { t: 0 },
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

#studio-mobile {
  position: absolute;
  width: 100%;
  padding: 0 3% 15vh 3%;
  overflow-y: scroll;
  overflow-x: hidden;
  scrollbar-color: #ddd #f0f0f0;
  scrollbar-width: thin;
  top: 162px;
  height: calc(100% - 200px);

  #loading {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    #loading-studio {
      display: block;
      height: 50px;
      transform: translate(0, -50px);
    }

    .message {
      display: block;
      color: black;
      transform: translate(0, -50px);
    }
  }

  .grid {
    opacity: 0;
    transition: opacity 0.6s;
    overflow-x: hidden;
    overflow-y: hidden;
    margin-bottom: 100px;

    .grid-item {
      margin-left: 0.7%;
      margin-right: 0.7%;
      margin-top: 0;
      margin-bottom: 1.4%;
      float: left;
      position: relative;
      width: 100%;

      .hover {
        position: relative;
        background-color: white;
        color: black;
        display: inline-block;
        padding: 7px 0;
        text-align: left;
        top: 0;
        left: 0;
      }

      img {
        width: 100% !important;
      }
    }
  }
}
</style>