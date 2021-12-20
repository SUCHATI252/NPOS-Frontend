<template>
  <v-app dark>
    <v-main :class="!$vuetify.theme.dark && 'blue lighten-5'">
      <v-container fluid class="fill-height">
        <nuxt />
      </v-container>
    </v-main>
    <snack-bar />
  </v-app>
</template>

<script>
export default {
  name: 'SaleLayout',
  head () {
    return {
      htmlAttrs: { lang: this.$i18n.locale }
    }
  },
  watch: {
    '$vuetify.theme.dark' (val) {
      this.$cookies.set('dark', val)
    }
  },
  beforeCreate () {
    this.$vuetify.theme.dark = (this.$cookies.get('dark') === true)
  },
  methods: {
    logout () {
      // eslint-disable-next-line no-console
      console.log('55555')
    }
  }
}
</script>
