<template lang="pug">
#feed
	#images(v-for="(project, i) in projects")
		.image-container
			img(:src="project.galería[0].url")
			.hover(@click="showProject(i)") {{ project.nombre.toUpperCase() }}
	#images(v-for="(project, i) in projects")
		.image-container
			img(:src="project.galería[0].url")
			.hover(@click="showProject(i)") {{ project.nombre.toUpperCase() }}
	#images(v-for="(project, i) in projects")
		.image-container
			img(:src="project.galería[0].url")
			.hover(@click="showProject(i)") {{ project.nombre.toUpperCase() }}
	#images(v-for="(project, i) in projects")
		.image-container
			img(:src="project.galería[0].url")
			.hover(@click="showProject(i)") {{ project.nombre.toUpperCase() }}
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
    document.getElementById('gallery').addEventListener('wheel', this.onMouseWheel)

    this.$nuxt.$on('showProject', () => {
      this.isShowingProject = true
    })

    this.$nuxt.$on('closeProject', () => {
      this.isShowingProject = false
    })
  },

  computed: {
    ...mapGetters({ projects: 'getProjects' })
  },

  methods: {
    ...mapMutations({ setProjects: 'setProjects', setCurrentProject: 'setCurrentProject' }),

    onMouseWheel(e) {
      if (this.isShowingProject) return

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
        if (topTo > 100) topTo = 100
        gsap.to('#feed', { top: topTo, duration: 0.3, ease: 'power1.inout' })
      }
    },

    showProject(i) {
      this.$nuxt.$emit('showProject')
      this.setCurrentProject(i)
    }
  },

  data() {
    return {
      isShowingProject: false
    }
  }
}
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

#feed {
  position: absolute;
  top: 100px;
  padding: 0 50px;
  line-height: 0;
  -webkit-column-count: 3;
  -moz-column-count: 3;
  column-count: 3;
  -webkit-column-gap: 10px;
  -moz-column-gap: 10px;
  column-gap: 10px;

  .image-container {
    position: relative;
    width: 100% !important;
    height: 100% !important;
    margin-bottom: 10px;

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
</style>