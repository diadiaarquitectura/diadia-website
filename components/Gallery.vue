<template lang="pug">
#gallery
	feed
	top-bar
</template>

<script>
import TopBar from '~/components/TopBar'
import Feed from '~/components/Feed'

export default {
  components: { TopBar, Feed }
}
</script>

<style lang="scss" scoped>
#gallery {
	position: relative;
  width: 100vw;
  height: 100vh;
  background-color: white;
	overflow: hidden;
}
</style>