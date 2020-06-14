<template lang="pug">
#home
	transition(name="fade")
		gallery-time(v-if="currentSection=='gallery-time'")
	transition(name="fade")
		gallery-use(v-if="currentSection=='gallery-use'")
	transition(name="fade")
		gallery-archive(v-if="currentSection=='gallery-archive'")
	transition(name="fade")
		bases(v-if="currentSection=='bases'")
	transition(name="fade")
		studio(v-if="currentSection=='studio'")
	transition(name="fade")
		contact(v-if="currentSection=='contact'")
	top-bar
</template>

<script>
import TopBar from '~/components/TopBar'
import GalleryTime from '~/components/GalleryTime'
import GalleryUse from '~/components/GalleryUse'
import GalleryArchive from '~/components/GalleryArchive'
import Bases from '~/components/Bases'
import Studio from '~/components/Studio'
import Contact from '~/components/Contact'
import { mapGetters } from 'vuex'

export default {
  components: { TopBar, GalleryTime, GalleryUse, GalleryArchive, Bases, Studio, Contact },

  computed: {
    ...mapGetters({ currentSection: 'getCurrentSection' })
  }
}
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
	transform: scale(0.95);
}

#home {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: white;
  overflow: hidden;
}
</style>