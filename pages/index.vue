<template lang="pug">
#main
	#loading(v-if="!isDataLoaded")
		p cargando...
	#content.noselect(v-else)
		home
		gallery
</template>

<script>
import Home from '../components/Home'
import Gallery from '../components/Gallery'
import axios from 'axios'
import gsap from 'gsap'
import { mapMutations } from 'vuex'

export default {
  components: { Home, Gallery },

  mounted() {
    window.addEventListener('resize', this.onWindowResize)
    window.addEventListener('wheel', this.onMouseWheel)

    axios.get('content/proyectos.json').then(response => {
      this.setProjects(response.data.proyectos)
      setTimeout(() => {
        this.isDataLoaded = true
      }, 1000)
    })
  },

  methods: {
    ...mapMutations({
      setProjects: 'setProjects'
    }),

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
      isDataLoaded: false
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
  }
}
</style>