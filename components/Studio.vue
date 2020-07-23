<template lang="pug">
#studio
  .content
    .pics
      img.pic-left(:src='studioInfo.imagen1')
      img.pic-right(:src='studioInfo.imagen2')
    .title {{ studioInfo.titulo }}
    .description {{ studioInfo.descripcion }}
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

  .content {
		padding-top: 80px;
    width: 600px;
    margin: 0 auto;
    background-color: white;
    overflow: scroll;

    .pic-left {
      width: 300px;
    }

    .pic-right {
      width: 300px;
    }
  }
}
</style>