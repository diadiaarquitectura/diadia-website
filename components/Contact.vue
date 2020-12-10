<template lang="pug">
#contact
  transition(name='fade')
    .content.row(v-show='isLoaded')
      .pic.col-md-8(:style='{ backgroundImage: "url(" + contactInfo.imagen + ")" }')
      .column.col-md-4
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
    imagesloaded('#contact .content .pic', { background: true }, () => {
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

#contact
  position: absolute
  top: 30px
  width: 100%
  height: 100%
  display: flex
  text-align: center
  align-items: center

  .content
    max-width: 980px
    width: 80%
    margin: 0 auto
    background-color: white
    overflow: scroll
    font-size: 1.1rem
    overflow-x: hidden

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
      padding-left: 25px
      padding-right: 10px
</style>