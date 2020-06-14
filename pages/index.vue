<template lang="pug">
#main
	#loading(v-if="!isDataLoaded")
		p cargando...
	#content.noselect(v-else)
		hero
		home
</template>

<script>
import Hero from '../components/Hero'
import Home from '../components/Home'
import axios from 'axios'
import gsap from 'gsap'
import { mapMutations } from 'vuex'

export default {
  components: { Hero, Home },

  mounted() {
    window.addEventListener('resize', this.onWindowResize)
    window.addEventListener('wheel', this.onMouseWheel)

    axios.get('content/proyectos.json').then(response => {
      this.setProjects(response.data.proyectos)

      setTimeout(() => {
        this.isDataLoaded = true
      }, 2000)
    })
  },

  methods: {
    ...mapMutations({
      setProjects: 'setProjects'
    }),

    addPreloadUrl(url) {
      this.preloadImages.push(url)
      this.totalPreloadImages++
    },

    onMouseWheel() {
      if (!this.isDataLoaded) return
      let height = window.innerHeight
      gsap.to('#main', { top: -height, duration: 1, ease: 'power2.out' })
    },

    onWindowResize() {
      if (!this.isDataLoaded) return
      this.onMouseWheel()
    }
  },

  data() {
    return {
      percentage: 0,
      isDataLoaded: false,
      totalPreloadImages: 0,
      preloadImages: []
    }
  }
}
</script>

<style lang="scss" scoped>
#main {
  position: fixed;
  top: 0;
  left: 0;
  overflow-x: hidden;

  #loading {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    animation-name: sine;
    animation-duration: 1.5s;
    animation-iteration-count: infinite;
  }

  @keyframes sine {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
}
</style>