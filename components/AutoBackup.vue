<template>
  <v-switch
    v-model="autobackup"
    :label="autobackup ? 'ON' : 'OFF'"
    class="ma-0 pa-0"
    inset
    hide-details
  />
</template>

<script>
export default {
  data: () => ({
    autobackup: false
  }),
  watch: {
    autobackup (val) {
      this.$store.commit('BACKUP', val)
    }
  }
}
</script>

<style>

</style>
