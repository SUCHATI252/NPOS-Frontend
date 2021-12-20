<template>
  <v-dialog v-model="dialog_logout" width="320">
    <v-card>
      <v-card-title class="headline">
        Logout
      </v-card-title>
      <v-divider />
      <v-card-text>
        Lorem ipsum dolor sit amet, consectetur.
      </v-card-text>

      <v-divider />

      <v-card-actions>
        <v-spacer />
        <v-btn color="success" @click="ok">
          yes
        </v-btn>
        <v-btn color="error" @click="dialog_logout = false">
          no
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'LogOut',
  data: () => ({
    dialog_logout: false
  }),
  methods: {
    open () {
      this.dialog_logout = true
    },
    async ok () {
      await this.$auth.logout()
      // .then(() => {
      //   this.$router.push(this.localePath('/login'))
      //   // this.$axios.$post('home/backup')
      // })
      // await this.$axios.$post('/home/logout').then(() => this.$router.push(this.localePath('/login')))
    }
  }
}
</script>
