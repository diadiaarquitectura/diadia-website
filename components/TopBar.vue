<template lang="pug">
#topbar
	#logo
		a(href="#" @click="gotoHome()") 
			img(src="~/assets/img/logo-diadia.svg" alt="diadia" width="100%")
	#filters
		.filter
			a(href="#")
				.label tiempo
				img(src="~/assets/img/icons/icon-tiempo.svg" alt="tiempo" width="100%")
		.filter
			a(href="#") 
				.label uso
				img(src="~/assets/img/icons/icon-uso.svg" alt="uso" width="100%")
		.filter
			a(href="#") 
				.label archivo
				img(src="~/assets/img/icons/icon-archivo.svg" alt="archivo" width="100%")
	#menu
		ul
			li.bold 
				a(href="#") PROYECTOS
			li 
				a(href="#") BASES
			li 
				a(href="#") ESTUDIO
			li 
				a(href="#") CONTACTO
</template>

<script>
import gsap from 'gsap'

export default {
  methods: {
    gotoHome() {
      // let height = window.innerHeight
			gsap.to('#main', { top: 0, duration: 0.6, ease: 'power2.out' })
    }
  }
}
</script>
<style lang="scss" scoped>
#topbar {
  position: relative;
  width: 100%;
  height: 100px;
  background-color: white;

  #logo {
    position: absolute;
		top: 40px;
    left: 50px;
    width: 170px;
  }

  #filters {
    position: absolute;
    top: 35px;
    text-align: center;
    width: 200px;
    left: calc(50% - 100px);

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
      }

      img {
        width: 22px;
      }
    }
  }

  #menu {
    position: absolute;
    right: 50px;
    top: 50px;

    ul {
      list-style: none;
      margin: 0;
      padding: 0;

      li {
        display: inline-block;
        padding-left: 20px;
        letter-spacing: 1px;
        font-size: 0.95rem;

        a {
          color: black;
          text-decoration: none;
        }
      }

      .bold {
        font-weight: bold;
      }
    }
  }
}
</style>