<template lang="pug">
#feed
	#images(v-for="project in projects")
		.image-container
			img(:src="project.galería[0].url")
			.hover {{ project.nombre.toUpperCase() }}
</template>

<script>
import { mapGetters } from 'vuex'
import gsap from 'gsap'

export default {
  mounted() {
    this.projects = this.getProjects()
    document.getElementById('gallery').addEventListener('wheel', this.onMouseWheel)
  },

  methods: {
    ...mapGetters({ getProjects: 'getProjects' }),

    onMouseWheel(e) {
      let top = document.getElementById('feed').offsetTop
      let height = 15 + document.getElementById('feed').clientHeight - window.innerHeight
      let topTo
      gsap.killTweensOf('#feed')

      if (e.deltaY > 0) {
        topTo = top - 250
        if (topTo < -height) topTo = -height
        gsap.to('#feed', { top: topTo, duration: 0.3, ease: 'power1.inout' })
      } else {
        topTo = top + 250
        if (topTo > 115) topTo = 115
        gsap.to('#feed', { top: topTo, duration: 0.3, ease: 'power1.inout' })
      }
    }
  },

  data() {
    return {
      projects: null
    }
  }
}
</script>

<style lang="scss" scoped>
#feed {
  position: absolute;
  top: 115px;
  padding: 0 50px;
  line-height: 0;
  -webkit-column-count: 3;
  -moz-column-count: 3;
  column-count: 3;
  -webkit-column-gap: 15px;
  -moz-column-gap: 15px;
  column-gap: 15px;

  .image-container {
    position: relative;
    width: 100% !important;
    height: 100% !important;
		margin-bottom: 15px;

    .hover {
    	position: absolute;
    	background-color: rgba(255, 255, 255, 0);
			color: rgba(0, 0, 0, 0);
    	width: 100%;
    	height: 100%;
    	top: 0;
    	left: 0;
			font-size: 1.1rem;
			display: flex;
			justify-content: center;
			align-items: center;
			transition: all 0.1s;
			cursor: pointer;

			&:hover {
				background-color: rgba(255, 255, 255, 0.7);
				color: rgba(0, 0, 0, 1);
				transition: all 0.2s;
			}
    }

    img {
      width: 100% !important;
      height: auto !important;
    }
  }
}
</style>