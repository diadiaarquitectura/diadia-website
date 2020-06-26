<template lang="pug">
#topbar
	#logo
		a(href="#" @click="gotoHome()") 
			img(src="~/assets/img/logo-diadia.svg" alt="diadia" width="100%")
	#filters(:style="{ opacity : currentSection.includes('gallery') ? 1 : 0 }")
		.filter
			a(href="#" @click="onGalleryTimeClick()")
				.label(:style="{ opacity: currentSection == 'gallery-time' ? 1 : 0.35 }") tiempo
				img(src="~/assets/img/icons/icon-tiempo.svg" alt="tiempo" width="100%")
		.filter
			a(href="#" @click="onGalleryUseClick()") 
				.label(:style="{ opacity: currentSection == 'gallery-use' ? 1 : 0.35 }") uso
				img(src="~/assets/img/icons/icon-uso.svg" alt="uso" width="100%")
		.filter
			a(href="#" @click="onGalleryArchiveClick()") 
				.label(:style="{ opacity: currentSection == 'gallery-archive' ? 1 : 0.35 }") archivo
				img(src="~/assets/img/icons/icon-archivo.svg" alt="archivo" width="100%")
	#menu-desktop
		ul
			li(:class="{ bold: currentSection.includes('gallery') }")
				a(href="#" @click="setCurrentSection('gallery-time'); onProjectsClick()") PROYECTOS
			li(:class="{ bold: currentSection == 'bases' }")
				a(href="#" @click="setCurrentSection('bases')") BASES
			li(:class="{ bold: currentSection == 'studio' }")
				a(href="#" @click="setCurrentSection('studio')") ESTUDIO
			li(:class="{ bold: currentSection == 'contact' }")
				a(href="#" @click="setCurrentSection('contact')") CONTACTO 
	//- #menu-mobile
	//- 	ul
	//- 		li(:class="{ bold: currentSection.includes('gallery') }")
	//- 			a(href="#" @click="setCurrentSection('gallery-time'); onProjectsClick()") PROYECTOS
	//- 		li(:class="{ bold: currentSection == 'bases' }")
	//- 			a(href="#" @click="setCurrentSection('bases')") BASES
	//- 		li(:class="{ bold: currentSection == 'studio' }")
	//- 			a(href="#" @click="setCurrentSection('studio')") ESTUDIO
	//- 		li(:class="{ bold: currentSection == 'contact' }")
	//- 			a(href="#" @click="setCurrentSection('contact')") CONTACTO 

</template>

<script>
import gsap from 'gsap'
import { mapGetters } from 'vuex'
import { mapMutations } from 'vuex'

export default {
  methods: {
    ...mapMutations({ setCurrentSection: 'setCurrentSection' }),

    gotoHome() {
      gsap.to('#main', { top: 0, duration: 0.8, ease: 'power2.out' })
    },

    onProjectsClick() {
      this.setCurrentSection('gallery-custom')
    },

    onGalleryTimeClick() {
      this.setCurrentSection('gallery-time')
    },

    onGalleryUseClick() {
      this.setCurrentSection('gallery-use')
    },

    onGalleryArchiveClick() {
      this.setCurrentSection('gallery-archive')
    }
  },

  computed: {
    ...mapGetters({ currentSection: 'getCurrentSection' })
  }
}
</script>
<style lang="scss" scoped>
#topbar {
  position: absolute;
  width: 100%;
  height: 100px;
  background-color: white;

  #logo {
    position: absolute;
    top: 30px;
    width: 170px;
  }

  #filters {
    position: absolute;
    top: 27px;
    text-align: center;
    width: 200px;
    left: calc(50% - 100px);
    transition: all 0.2s;

    .filter {
      display: inline-block;
      padding: 0px 13px;

      a {
        color: black;
        text-decoration: none;
      }

      .label {
        font-size: 0.85rem;
        margin-bottom: 5px;
        transition: all 0.2s;
      }

      img {
        width: 20px;
        transition: all 0.2s;

        &:hover {
          transform: scale(1.1);
          transition: all 0.2s;
        }
      }
    }
  }

  #menu-desktop {
    position: absolute;
    right: 0px;
    top: 43px;

    ul {
      list-style: none;
      margin: 0;
      padding: 0;

      li {
        display: inline-block;
        padding-left: 40px;
        letter-spacing: 1.5px;
        font-size: 0.9rem;

        a {
          color: black;
          text-decoration: none;
        }

        &:hover {
          filter: brightness(2);
        }
      }

      .bold {
        font-weight: bold;
      }
    }
  }

  #menu-mobile {
    position: fixed;
    right: 0px;
    top: 0px;
    height: 100%;
    width: 250px;
    background: red;

    ul {
      list-style: none;
      margin: 0;
      padding: 0;

      li {
        display: block;
        padding-left: 40px;
        letter-spacing: 1.5px;
        font-size: 0.9rem;

        a {
          color: black;
          text-decoration: none;
        }

        &:hover {
          filter: brightness(2);
        }
      }

      .bold {
        font-weight: bold;
      }
    }
  }
}
</style>