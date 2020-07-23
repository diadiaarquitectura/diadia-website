<template lang="pug">
#contact
  .content
    img.pic(:src='contactInfo.imagen')
		.column
			.title Contacto
			.text {{ contactInfo.mensaje }}
			.title Estudio
			.text {{ contactInfo.direccion }}
			.title Mail
			.text {{ contactInfo.email }}
			.title Instagram
			.text {{ contactInfo.enlaceInstagram }}
			.title Web
			.text {{ contactInfo.web }}
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  mounted() {
    console.log(this.studioInfo)
  },

  computed: {
    ...mapGetters({ contactInfo: 'getContactInfo' }),
  },
}
</script>

<style lang="scss" scoped>
#contact {
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
</style>