<template lang="pug">
#container
  #container-inner
    transition(name='fade')
      gallery-default(v-if='currentSection == "gallery-default"')
    transition(name='fade')
      gallery-work(v-if='currentSection == "gallery-work"')
    transition(name='fade')
      gallery-media(v-if='currentSection == "gallery-media"')
    transition(name='fade')
      gallery-bases(v-if='currentSection == "gallery-bases"')
    transition(name='fade')
      studio(v-if='currentSection == "studio"')
    transition(name='fade')
      contact(v-if='currentSection == "contact"')
    top-bar
</template>

<script>
import TopBar from '~/components/TopBar'
import GalleryDefault from '~/components/GalleryDefault'
import GalleryWork from '~/components/GalleryWork'
import GalleryMedia from '~/components/GalleryMedia'
import GalleryBases from '~/components/GalleryBases'
import Studio from '~/components/Studio'
import Contact from '~/components/Contact'
import { mapGetters } from 'vuex'

export default {
  components: {
    TopBar,
    GalleryDefault,
    GalleryWork,
    GalleryMedia,
    GalleryBases,
    Studio,
    Contact,
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
  width: 95%;
  margin: 0 auto;
  padding: 0 50px;

  #container-inner {
    position: relative;
    width: 100%;
    height: 100%;
  }
}

@media (max-width: 1200px) {
  #container {
    padding: 0 20px;
  }
}
</style>