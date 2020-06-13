<template lang="pug">
#gallery
	#topbar
		#logo
			a(href="#") 
				img(src="~/assets/img/diadia-logo.svg" alt="diadia" width="100%")
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
	#feed
</template>

<style lang="scss" scoped>
#gallery {
  width: 100vw;
  height: 100vh;
  background-color: white;
  padding: 30px;

  #topbar {
    position: relative;

    #logo {
      position: absolute;
      top: 0;
      left: 0;
      width: 160px;
    }

    #filters {
      position: absolute;
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
      right: 0;
      top: 13px;

      ul {
        list-style: none;
				margin: 0;
				padding: 0;

        li {
          display: inline-block;
					padding: 0 20px;
					letter-spacing: 1px;
					
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
}
</style>