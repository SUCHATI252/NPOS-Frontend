<template>
  <v-container>
    <app-bar />
    <v-row justify="center" class="mt-n16">
      <v-col
        cols="12"
        sm="6"
        md="4"
      >
        <v-card>
          <v-card-text>
            <v-form @submit.prevent="add">
              <v-file-input
                v-model="qrcode"
                accept="image/*"
                label="File input"
                rounded
              />
              <v-btn block type="submit" color="primary">
                save
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'SettingPage',
  auth: false,
  data: () => ({
    qrcode: [],
    settingdata: {}
  }),
  async fetch () {
    this.settingdata = await this.$axios.$post('setting').then(res => res)
    // eslint-disable-next-line no-console
    console.log(this.settingdata.setting_bank_qrcode)
  },
  methods: {
    FormData (obj) {
      const Data = new FormData()
      for (const key in obj) {
        Data.append(key, obj[key])
      }
      return Data
    },
    async add () {
      const DATA = this.FormData({ img: this.qrcode })
      await this.$axios.$post('/setting/update', DATA, {
        headers: { 'Content-type': 'multipart/form-data' }
      }).then((res) => {
        if (res.success) {
          this.$store.commit('SET_SUCCESS', 'Update successfully')
        } else {
          this.$store.commit('SET_ERROR', 'Error Update')
        }
      })
    }
  }
}
</script>
