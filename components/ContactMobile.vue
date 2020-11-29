<template lang="pug">
#contact-mobile
  transition(name='fade')
    .content(v-show='isLoaded')
      .pic(:style='{ backgroundImage: "url(" + contactInfo.imagen + ")" }')
      .column
        .text(v-html='contactInfo.mensaje')
        .title Estudio
        .text(v-html='contactInfo.direccion')
        .title Mail
        .text(v-html='contactInfo.email')
        .title Instagram
        .text(v-html='contactInfo.enlaceInstagram')
        .title Web
        .text(v-html='contactInfo.web')
</template>

<script>
import { mapGetters } from 'vuex'
import imagesloaded from 'imagesloaded'

export default {
  mounted() {
    imagesloaded('#contact-mobile .content .pic', { background: true }, () => {
      this.isLoaded = true
    })
  },

  computed: {
    ...mapGetters({ contactInfo: 'getContactInfo' }),
  },

  data() {
    return {
      isLoaded: false,
    }
  },
}
</script>

<style lang="sass" scoped>
.fade-enter-active,
.fade-leave-active
  transition: opacity 0.6s

.fade-enter,
.fade-leave-to
  opacity: 0

#contact-mobile
  position: absolute
  top: 130px
  width: 100%
  height: 100%
  display: flex
  text-align: center
  align-items: center
  display: inline-block
  overflow-y: scroll

  .content
    max-width: 980px
    width: 100%
    margin: 0 auto
    background-color: white
    overflow: scroll
    font-size: 1.1rem
    overflow-x: hidden
    margin-bottom: 50px
    padding-bottom: 80px

    .title
      font-weight: bold
      margin-top: 20px

    .description
      text-align: justify

    .pic
      width: 100%
      background-position: center
      background-size: cover

    .column
      text-align: left
      padding-right: 10px
      padding-left: 0
      margin-bottom: 50px
      margin-top: 20px

    .pic
      height: 40vh
      img
        max-width: 600px
</style>