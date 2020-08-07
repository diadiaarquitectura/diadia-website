<template lang="pug">
#studio
  .content
    .pics
      img.pic-left(:src='studioInfo.imagen1')
      img.pic-right(:src='studioInfo.imagen2')
    .title {{ studioInfo.titulo }}
    .description(v-html='studioInfo.descripcion')
    img.animation(src='images/animation.gif')
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  mounted() {
    console.log(this.studioInfo)
  },

  computed: {
    ...mapGetters({ studioInfo: 'getStudioInfo' }),
  },
}
</script>

<style lang="scss" scoped>
#studio {
  position: absolute;
  top: 100px;
  width: 100%;
  height: calc(100%);
  display: flex;
  text-align: center;
  padding-bottom: 100px;

  .content {
    width: 600px;
    margin: 0 auto;
    background-color: white;
    overflow: scroll;
    font-size: 1.2rem;
    padding: 50px 10px 0 10px;
    overflow-x: hidden;

    .title {
      font-weight: bold;
      margin: 40px 0;
    }

    .description {
      text-align: justify;
    }

    .pics {
      max-width: 600px;
      width: 100%;

      .pic-left {
        width: 50%;
      }

      .pic-right {
        width: 50%;
      }
    }

    .animation {
      max-width: 600px;
      width: 100%;
    }
  }
}

@media (max-width: 768px) {
  #studio {
    .content {
      padding: 0px 10px 50px 10px;
      .title {
        font-size: 0.8rem;
        margin: 10px 0 30px 0;
      }
      .description {
        font-size: 0.9rem;
      }
    }
  }
}
</style>