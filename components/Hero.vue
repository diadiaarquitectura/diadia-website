<template lang="pug">
#hero
  #canvas-background
  #logo
    img.logo(src='~/assets/img/logo-diadia.svg')
    img.sublogo(src='~/assets/img/logo-arquitectura.svg')
  #text 
    | Diseñamos espacios cotidianos para
    br
    | la convivencia, el encuentro,
    br
    | el aprendizaje, la crianza y el diálogo.
  #arrow-down
    a(href='#', @click='gotoHome()')
      img(src='~/assets/img/arrow-down.svg')
</template>

<script>
import gsap from 'gsap'

export default {
  mounted() {
    gsap.to('#hero', { opacity: 1, duration: 2 })
    gsap.to('#text', { left: '10%', opacity: 1, duration: 1.5 })

    let sketch = (p) => {
      let circlePosition
      let position

      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight)
      }

      p.draw = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight)
        circlePosition = p.createVector(p.width * 0.75, 0)
        p.background('white')
        p.noStroke()
        p.fill('black')
        p.circle(circlePosition.x, circlePosition.y, p.width * 0.35)
        p.triangle(p.width, p.height / 2, p.width, p.height, p.width * 0.85, p.height)
      }

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight)
      }
    }

    new p5(sketch, 'canvas-background')
  },

  methods: {
    gotoHome() {
      let height = document.getElementById('home').offsetTop
      gsap.to('#main', { top: -height, duration: 1, ease: 'power2.out' })
    },
  },
}
</script>

<style lang="scss" scoped>
#hero {
  position: relative;
  opacity: 0;
  width: 100vw;
  height: 100vh;
  background-color: white;
  overflow: hidden;

  #canvas-background {
    background: white;
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
    opacity: 0;
    top: 42%;
    left: -5%;
    width: 60%;
    font-size: 2.8vw;
  }

  #arrow-down {
    position: fixed;
    top: calc(100% - 75px);
    left: calc(50% - 28px);
    animation-name: sine;
    animation-duration: 1.5s;
    animation-iteration-count: infinite;
  }

  @keyframes sine {
    0% {
      bottom: 20px;
    }
    50% {
      bottom: 30px;
    }
    100% {
      bottom: 20px;
    }
  }
}

@media (max-width: 768px) {
  #hero {
    #text {
			top: 35%;
			font-size: 5vw;
		}
  }
}
</style>