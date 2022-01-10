<template>
  <v-container class="fill-height justify-center">
    <app-bar />
    <v-col md="6" lg="4" sm="7">
      <v-form ref="form_reset" @submit.prevent="reset_password">
        <v-card class="pa-5" rounded="lg" elevation="5">
          <v-card-title class="title pt-0 justify-center">
            <div>
              <div class="d-flex align-start justify-center">
                <v-icon size="100">
                  mdi-lock-reset
                </v-icon>
              </div>
              <div class="d-flex align-end justify-center">
                <span class="text-h4 font-weight-bold">
                  {{ $t('resetpassword.title') }}
                </span>
              </div>
            </div>
          </v-card-title>
          <v-card-text>
            <v-text-field
              ref="code"
              v-model="code"
              v-mask="'######'"
              autofocus
              validate-on-blur
              outlined
              placeholder="000000"
              prepend-inner-icon="mdi-shield-key-outline"
              :label="$t('resetpassword.code_lbl')"
              :rules="[
                (v) => !! v || $t('resetpassword.val_code'),
                (v) => v.length >= 6 || $t('resetpassword.val_min6')
              ]"
            />

            <v-text-field
              ref="new_password"
              v-model="new_password"
              counter
              outlined
              validate-on-blur
              prepend-inner-icon="mdi-key-outline"
              :label="$t('resetpassword.pass_new')"
              :append-icon="showicon ? (showpass ? 'mdi-eye' : 'mdi-eye-off') : ''"
              :type="showpass ? 'text' : 'password'"
              :rules="[
                (v) => !!v || $t('resetpassword.val_password'),
                (v) => v.length >= 8 || $t('resetpassword.val_min8')
              ]"
              @click:append="showpass = !showpass"
            />
            <v-text-field
              ref="new_pass_try"
              v-model="new_pass_try"
              counter
              outlined
              validate-on-blur
              prepend-inner-icon="mdi-key-outline"
              :label="$t('resetpassword.pass_confirm')"
              :append-icon="showicon2 ? (showpass2 ? 'mdi-eye' : 'mdi-eye-off') : ''"
              :type="showpass2 ? 'text' : 'password'"
              :rules="[
                (v) => !!v || $t('resetpassword.val_password'),
                (v) => v.length >= 8 || $t('resetpassword.val_min8'),
                confirm_password || $t('resetpassword.some_value')
              ]"
              @click:append="showpass2 = !showpass2"
            />
            <v-btn
              large
              block
              type="submit"
              color="primary"
              v-text="$t('resetpassword.save')"
            />
          </v-card-text>
          <v-card-actions class="mx-2">
            <v-spacer />
            <span class="caption grey--text">
              {{ $t('resetpassword.time_left') }} : {{ Time }}
            </span>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-col>
  </v-container>
</template>

<script>
export default {
  name: 'ResetpasswordPage',
  auth: 'guest',
  data: () => ({
    code: '',
    code_mask: '#',
    new_password: '',
    new_pass_try: '',
    showpass: false,
    showicon: false,
    showpass2: false,
    showicon2: false,
    Time: 300
  }),
  head () {
    return {
      title: this.$t('resetpassword.title')
    }
  },
  computed: {
    confirm_password () {
      return this.new_pass_try === this.new_password
    }
  },
  watch: {
    new_password (val) {
      val ? this.showicon = true : this.showicon = false
    },
    showpass (val) {
      val && setTimeout(() => { this.showpass = false }, 2000)
    },
    new_pass_try (val) {
      val ? this.showicon2 = true : this.showicon2 = false
    },
    showpass2 (val) {
      val && setTimeout(() => { this.showpass2 = false }, 2000)
    }
  },
  mounted () {
    if (!this.$route.query.token) {
      return this.$router.push(this.localePath('/login'))
    }
    this.checkTime()
  },
  methods: {
    FormData (obj) {
      const Data = new FormData()
      for (const key in obj) {
        Data.append(key, obj[key])
      }
      return Data
    },
    async reset_password () {
      if (this.$refs.form_reset.validate()) {
        this.$store.commit('LOADIND_DIALOG', true)
        const Data = this.FormData({
          token: this.$route.query.token,
          code: this.code,
          password: this.new_password
        })
        await this.$axios.$post('/resetpassword/changpassword', Data).then((res) => {
          setTimeout(() => {
            if (res.success) {
              this.$store.commit('SET_SUCCESS', 'Your password has been changed successfully.')
              setTimeout(() => {
                this.$router.push(this.localePath('/login'))
              }, 5000)
            } else if (res.exit_code) {
              this.$refs.code.focus()
              this.$store.commit('SET_ERROR', 'erroe code')
            } else if (res.exit_time) {
              this.$refs.code.focus()
              this.$store.commit('SET_ERROR', 'Expiration time')
            } else {
              this.$store.commit('SET_ERROR', 'There was an error resetting the password.')
              setTimeout(() => {
                this.$router.push(this.localePath('/login'))
              }, 5000)
            }
            this.code = ''
            this.new_password = ''
            this.new_pass_try = ''
            this.$store.commit('LOADIND_DIALOG', false)
          }, 1000)
        })
      }
    },
    checkTime () {
      if (this.Time > 0) {
        setTimeout(() => {
          this.Time -= 1
          this.checkTime()
        }, 1000)
      } else {
        return this.$router.push(/* this.localePath('/login') */)
      }
    }
  }
}
</script>
