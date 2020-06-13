<template lang="pug">
#project
	#project-inner
		#name {{ projects[currentProject].nombre.toUpperCase() }}
		#image
			img(:src="projects[currentProject].galería[currentImage].url" height="100%")
		#footer 
			.left {{ (currentImage + 1) + '/' + (projects[currentProject].galería.length) }}
			.right
				a(v-if="isText" href="#")
					img(src="~/assets/img/icon-off.svg" @click="selectGallery()" width="100%")
				a(v-else href="#")
					img(src="~/assets/img/icon-on.svg" @click="selectGallery()" width="100%")
				a(v-if="isText" href="#")
					img(src="~/assets/img/icon-on.svg" @click="selectText()" width="100%")
				a(v-else href="#")
					img(src="~/assets/img/icon-off.svg" @click="selectText()" width="100%")
		#arrow-left(v-if="currentImage > 0")
			a(href="#")
				img(src="~/assets/img/arrow-left.svg" @click="prevImage()")
		#arrow-right(v-if="currentImage < projects[currentProject].galería.length - 1")
			a(href="#")
				img(src="~/assets/img/arrow-right.svg" @click="nextImage()")
		#close
			a(href="#")
				img(src="~/assets/img/close.svg" @click="closeProject()" width="100%")
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  methods: {
    prevImage() {
      this.currentImage--
      if (this.currentImage < 0) this.currentImage = 0
    },

    nextImage() {
      this.currentImage++
      if (this.currentImage > this.projects[this.currentProject].galería.length - 1) {
        this.currentImage = this.projects[this.currentProject].galería.length - 1
      }
    },

    closeProject() {
      this.$nuxt.$emit('closeProject')
    },

    selectGallery() {
      this.isText = false
      console.log('g')
    },

    selectText() {
      this.isText = true
      console.log('t')
    }
  },

  computed: {
    ...mapGetters({ projects: 'getProjects', currentProject: 'getCurrentProject' })
  },

  data() {
    return {
      currentImage: 0,
      isText: false
    }
  }
}
</script>

<style lang="scss" scoped>
#project {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10;
  width: 100vw;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.95);
  display: flex;
  justify-content: center;
  align-items: center;

  #project-inner {
    position: relative;
    background-color: blue;
    height: 70%;

    #name {
      position: absolute;
      left: 0;
      top: -15px;
      letter-spacing: 1px;
    }

    #image {
      height: 100%;
    }

    #footer {
      position: relative;
      top: 15px;

      .left {
        float: left;
      }

      .right {
        float: right;

        img {
          transform: translate(0, -10px);
          width: 20px;
          margin-left: 7px;
          transition: all 0.2s;

          &:hover {
            transform: translate(0, -10px) scale(1.1);
            transition: all 0.2s;
          }
        }
      }
    }
  }

  #arrow-left {
    position: fixed;
    left: 10px;
    top: calc(50% - 35px);
    transform: scale(1.3);
    transition: all 0.2s;

    &:hover {
      transform: scale(1.5);
      transition: all 0.2s;
    }
  }

  #arrow-right {
    position: fixed;
    right: 10px;
    top: calc(50% - 35px);
    transform: scale(1.3);
    transition: all 0.2s;

    &:hover {
      transform: scale(1.5);
      transition: all 0.2s;
    }
  }

  #close {
    position: fixed;
    right: 20px;
    top: 20px;
    transform: scale(0.9);
    transition: all 0.2s;

    &:hover {
      transform: scale(1);
      transition: all 0.2s;
    }
  }
}
</style>