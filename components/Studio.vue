<template lang="pug">
#studio
  .content(v-html='markdown')
</template>

<script>
import Viewer from '../components/Viewer'
import { mapGetters, mapMutations } from 'vuex'

const md = require('markdown-it')()

export default {
  components: { Viewer },

  mounted() {},

  computed: {
    ...mapGetters({ studio: 'getStudioInfo' }),
    markdown() {
      return(md.render(this.studio.content))
    },
  },

  methods: {
    ...mapMutations({ setCurrentProject: 'setCurrentProject' }),
  },

  data() {
    return {}
  },
}
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

#studio {
  position: absolute;
  top: 150px;
  height: calc(100% - 190px);
  width: 100%;
  padding: 0 3%;
  overflow-x: hidden;
  overflow-y: scroll;
  scrollbar-color: #ddd #f0f0f0;
  scrollbar-width: thin;
  margin-left: auto;

  .content {
    width: 98%;
    font-size: 1.1rem;
    font-weight: normal;
    text-align: justify;
    margin-left: 1%;
    margin-bottom: 1%;

    img {
      width: 100%;
      margin: 2% 0;
    }
  }
}
</style>