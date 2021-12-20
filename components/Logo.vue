<template>
  <v-img
    :max-height="maxheight"
    :max-width="maxwidth"
    :src="ImgLogo"
  />
</template>

<script>
export default {
  name: 'LoGo',
  props: {
    maxheight: {
      type: String,
      default: '100'
    },
    maxwidth: {
      type: String,
      default: '100'
    }
  },
  data: () => ({
    ImgLogo: ''
  }),
  fetch () {
    this.ImgLogo = '/images/LOGO.png'
  }
}
</script>

<style>

</style>
