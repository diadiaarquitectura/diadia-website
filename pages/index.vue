<template lang="pug">
#main.noselect
	home
	gallery
</template>

<script>
import Home from '../components/Home'
import Gallery from '../components/Gallery'
import axios from 'axios'
import gsap from 'gsap'

export default {
  components: { Home, Gallery },

  mounted() {
    window.addEventListener('resize', this.onWindowResize)
		window.addEventListener('wheel', this.onMouseWheel)
		
		axios.get('../content/proyectos.json').then((response) => {
			console.log(response)
		})
  },

  methods: {
    onMouseWheel() {
      let height = window.innerHeight
      gsap.to('#main', { top: -height, duration: 0.7, ease: 'power2.out' })
    },

    onWindowResize() {
      this.onMouseWheel()
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
}
</style>