<template lang="pug">
#project
	#project-inner
		#name {{ projects[currentProject].nombre.toUpperCase() }}
		#image
			//- #loading cargando...
			img(:src="projects[currentProject].galería[currentImage].url" height="100%" loading="lazy")
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
  mounted() {
    // document.querySelector('#image img').addEventListener('load', () => {
    //   document.querySelector('#image img').style.width = 'auto'
    // })
  },

  methods: {
    prevImage() {
      // let prevWidth = document.querySelector('#image img').clientWidth
      // document.querySelector('#image img').src = ''
      // document.querySelector('#image img').src = '~/assets/img/arrow-left.svg'
      // document.querySelector('#image img').style.width = prevWidth + 'px'
      this.currentImage--
      if (this.currentImage < 0) this.currentImage = 0
    },

    nextImage() {
      // let prevWidth = document.querySelector('#image img').clientWidth
      // document.querySelector('#image img').src = ''
      // document.querySelector('#image img').src = '~/assets/img/arrow-left.svg'
      // document.querySelector('#image img').style.width = prevWidth + 'px'
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
    },

    selectText() {
      this.isText = true
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

  .loading {
    background-color: red;
  }

  #project-inner {
    position: relative;
    height: 70%;

    #name {
      position: absolute;
      left: 0;
      top: -15px;
      letter-spacing: 1px;
    }

    #image {
      position: relative;
      height: 100%;
      transition: all 0.2s;

      #loading {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, 0);
      }

      img {
        top: 0;
        left: 0;
        transition: all 0.2s;
        z-index: 10;
      }
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