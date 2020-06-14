<template lang="pug">
#project
	#project-inner
		#name {{ projects[currentProject].nombre.toUpperCase() }}
		#image
			img
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
    let image = document.querySelector('#image img')
    image.style.opacity = 1
    image.src = this.projects[this.currentProject].galería[0].url
  },

  methods: {
    prevImage() {
      this.currentImage--
      if (this.currentImage < 0) {
        this.currentImage = 0
      }
      this.currentUrl = this.projects[this.currentProject].galería[this.currentImage].url
      this.loadImage()
    },

    nextImage() {
      this.currentImage++
      if (this.currentImage > this.projects[this.currentProject].galería.length - 1) {
        this.currentImage = this.projects[this.currentProject].galería.length - 1
      }
      this.currentUrl = this.projects[this.currentProject].galería[this.currentImage].url
      this.loadImage()
    },

    loadImage() {
      let image = document.querySelector('#image img')
      image.style.opacity = 0.3

      let timer = setTimeout(() => {
        image.src = this.currentUrl
        image.onload = () => {
          image.style.opacity = 1
        }
      }, 200)
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
      currentUrl: '',
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

      img {
        top: 0;
        left: 0;
        height: 100%;
        transition: all 0.2s;
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