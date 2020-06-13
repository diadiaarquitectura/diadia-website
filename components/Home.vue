<template lang="pug">
#home
	#canvas
	#logo
		img.logo(src="~/assets/img/logo-diadia.svg")
		img.sublogo(src="~/assets/img/logo-arquitectura.svg")
	#text Diseñamos espacios cotidianos para la convivencia, el encuentro, el aprendizaje, la crianza y el diálogo.
	#arrow-down
		a(href="#" @click="gotoProjects()")
			img(src="~/assets/img/arrow-down.svg")

</template>

<script>
import gsap from 'gsap'

export default {
  mounted() {
		let sketch = p => {
			p.setup = () => {
				p.createCanvas(p.windowWidth, p.windowHeight)
				console.log('holasss')
			}

			p.draw = () => {
				p.background('white')
				p.noStroke()
				p.fill('black')
				p.circle(p.width * 0.75, 0, p.width * 0.35)

				p.triangle(p.width, p.height / 2, p.width, p.height, p.width * 0.85, p.height)
			}

			p.windowResized = () => {
				p.resizeCanvas(p.windowWidth, p.windowHeight)
			}
		}

		new p5(sketch, window.document.getElementById('canvas'))
	},
	
	methods: {
		gotoProjects() {
			let height = window.innerHeight
			gsap.to('#main', { top: -height, duration: 1, ease: 'power2.out' })
		}
	}
}
</script>

<style lang="scss" scoped>
#home {
	position: relative;
  width: 100vw;
  height: 100vh;
  background-color: white;
	overflow: hidden;

	#canvas {
		width: 100vw;
		height: 100vh;
	}

	#logo {
		position: absolute;
		top: 35px;
		left: 35px;

		.logo {
			position: absolute;
		}

		.sublogo {
			position: absolute;
			top: 50px;
		}
	}

	#text {
		position: absolute;
		top: 42%;
		left: 10%;
		width: 50%;
		font-size: 2.8vw;
	}

	#arrow-down {
		position: absolute;
		bottom: 25px;
		left: calc(50% - 28px);
		animation-name: sine;
		animation-duration: 1.5s;
		animation-iteration-count: infinite;
	}

	@keyframes sine {
		0% { bottom: 20px }
		50% { bottom: 30px }
		100% { bottom: 20px }
		
	}
}
</style>