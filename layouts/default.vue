<template>
  <v-app dark>
    <v-main :class="!$vuetify.theme.dark && 'blue lighten-5'">
      <Nuxt />
    </v-main>
    <snack-bar />
    <overlay />
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  head () {
    return {
      htmlAttrs: { lang: this.$i18n.locale }
    }
  },
  watch: {
    '$vuetify.theme.dark' (val) {
      this.$cookies.set('Dark', val)
    }
  },
  beforeCreate () {
    this.$vuetify.theme.dark = (this.$cookies.get('Dark') === true)
  }
}
</script>
