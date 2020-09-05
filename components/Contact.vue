<template lang="pug">
#contact
  .content.row
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

export default {
  mounted() {
  },

  computed: {
    ...mapGetters({ contactInfo: 'getContactInfo' }),
  },
}
</script>

<style lang="scss" scoped>
#contact {
  position: absolute;
  top: 30px;
  width: 100%;
  height: 100%;
  display: flex;
  text-align: center;
  align-items: center;
  // padding-bottom: 100px;
  // padding-right: 10px;
  // padding-left: 10px;

  .content {
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    background-color: white;
    overflow: scroll;
    font-size: 1.2rem;
    overflow-x: hidden;

    .title {
      font-weight: bold;
      margin-top: 20px;
    }

    .description {
      text-align: justify;
    }

    .pic {
      width: 100%;
      // height: 550px;
      background-position: center;
      background-size: cover;
    }

    .column {
      text-align: left;
      padding-left: 20px;
      padding-right: 10px;
    }
  }
}

@media (max-width: 692px) {
  #contact {
    display: inline-block;
    overflow-y: scroll;
    .content {
      margin-bottom: 50px;
      .column {
        padding-left: 0;
        margin-bottom: 50px;
      }

      .pic {
        height: 40vh;
        img {
          max-width: 600px;
        }
      }
    }
  }
}
</style>