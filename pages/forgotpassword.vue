<template>
  <v-form ref="form_forgot" @submit.prevent="forgot">
    <v-card class="pa-5" rounded="lg" elevation="5">
      <v-alert
        v-model="forgot_alert_success"
        dense
        text
        type="success"
      >
        The code and link has been sent to {{ email_text }}.
        <br>
        Please check your email.
      </v-alert>
      <v-sheet v-if="!forgot_alert_success">
        <v-card-title class="pb-1 title justify-center">
          <div>
            <div class="d-flex align-start justify-center">
              <v-icon size="100">
                mdi-lock-reset
              </v-icon>
            </div>
            <div class="d-flex align-end justify-center">
              <span class="text-h4 font-weight-bold">
                {{ $t('forgot.title') }}
              </span>
            </div>
          </div>
        </v-card-title>
        <v-card-text class="pt-0 pb-10">
          <v-sheet class="pb-5 text-center">
            <span class="caption grey--text text--darken-1">
              {{ $t('forgot.sub_email_title') }}
            </span>
            <br>
            <span class="caption grey--text text--darken-1">
              {{ $t('forgot.sub_email') }}
            </span>
          </v-sheet>
          <v-text-field
            v-model="email"
            :rules="[
              v => !!v || $t('forgot.val_data'),
              v => /.+@.+\..+/.test(v) || $t('forgot.val_email'),
              check_gmail || $t('forgot.no_gmail')
            ]"
            placeholder="yourname@gmail.com"
            prepend-inner-icon="mdi-email-outline"
            :label="$t('forgot.email')"
            validate-on-blur
            outlined
            autofocus
            type="email"
          />
          <v-btn
            large
            block
            type="submit"
            color="primary"
            v-text="$t('forgot.send')"
          />
        </v-card-text>
        <!--<v-card-actions class="pb-5 pt-0">
          <v-spacer />
          <v-btn
            text
            small
            color="primary"
            class="caption"
            :to="localePath('/login')"
          >
            <v-icon small class="mr-1">
              mdi-arrow-left-circle-outline
            </v-icon>
            {{ $t('login.title') }}
          </v-btn>
          <v-spacer />
        </v-card-actions> -->
      </v-sheet>
    </v-card>
  </v-form>
</template>

<script>
export default {
  name: 'ForgotpasswordPage',
  layout: 'guest',
  auth: 'guest',
  data: () => ({
    email: '',
    email_text: '',
    forgot_alert_success: false
  }),
  head () {
    return {
      title: this.$t('forgot.title')
    }
  },
  computed: {
    check_gmail () {
      return this.email.includes('@gmail.com')
    }
  },
  methods: {
    FormData (obj) {
      const Data = new FormData()
      for (const key in obj) {
        Data.append(key, obj[key])
      }
      return Data
    },
    async forgot () {
      if (this.$refs.form_forgot.validate()) {
        this.$store.commit('SET_OVERLAY', true)
        const data = this.FormData({ email: this.email })
        await this.$axios.$post('/forgotpassword/sendcode', data).then((res) => {
          setTimeout(() => {
            this.$store.commit('SET_OVERLAY', false)
            if (res.success) {
              this.email_text = this.email
              this.email = ''
              this.forgot_alert_success = true
              setTimeout(() => {
                this.$router.push({ path: this.localePath('/resetpassword'), query: { token: res.token } })
              }, 3000)
            } else if (res.noactivate) {
              this.email = ''
              this.$refs.email.focus()
              this.$store.commit('SET_ERROR', 'This is Username NO Activate')
            } else if (res.exit_email) {
              this.email = ''
              this.$refs.email.focus()
              this.$store.commit('SET_ERROR', 'exit_email')
            } else if (res.nosend) {
              this.email = ''
              this.$refs.email.focus()
              this.$store.commit('SET_ERROR', 'No_Send')
            } else {
              this.$store.commit('SET_ERROR', 'NO_User')
              this.email = ''
              this.$refs.email.focus()
            }
          }, 1000)
        })
      }
    }
  }
}
</script>
