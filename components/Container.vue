<template lang="pug">
#container
  #container-inner
    top-bar
    transition(name='fade')
      gallery(v-show='currentSection.includes("gallery")')
    transition(name='fade')
      studio(v-show='!isMobile && currentSection == "studio"')
    transition(name='fade')
      studio-mobile(v-show='isMobile && currentSection == "studio"')
    transition(name='fade')
      contact(v-show='!isMobile && currentSection == "contact"')
    transition(name='fade')
      contact-mobile(v-show='isMobile && currentSection == "contact"')
</template>

<script>
import TopBar from '~/components/TopBar'
import Gallery from '~/components/Gallery'
import Studio from '~/components/Studio'
import StudioMobile from '~/components/StudioMobile'
import Contact from '~/components/Contact'
import ContactMobile from '~/components/ContactMobile'
import { mapGetters } from 'vuex'

export default {
  components: {
    TopBar,
    Gallery,
    Studio,
    StudioMobile,
    Contact,
    ContactMobile
  },

  mounted() {
    requestAnimationFrame(this.update)
  },

  methods: {
    update() {
      this.isMobile = window.innerWidth < 768
      requestAnimationFrame(this.update)
    },
  },

  data() {
    return {
      isMobile: true,
    }
  },

  computed: {
    ...mapGetters({ currentSection: 'getCurrentSection' }),
  },
}
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

#container {
  position: relative;
  height: 100vh;
  background-color: white;
  width: 100%;
  margin: 0 auto;
  padding: 0 2vw;

  #container-inner {
    position: relative;
    width: 100%;
    height: 100%;
  }
}
</style>