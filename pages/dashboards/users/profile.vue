<template>
  <v-container class="mt-5">
    <v-row>
      <v-col
        cols="12"
        sm="8"
      >
        <v-card>
          <v-card-title>
            Edit Profile
          </v-card-title>
          <v-card-text>
            <v-form
              ref="form"
              lazy-validation
            >
              <v-text-field
                label="Name"
                required
              />

              <v-text-field
                label="E-mail"
                required
              />

              <v-checkbox
                :rules="[v => !!v || 'You must agree to continue!']"
                label="Do you agree?"
                required
              />

              <v-btn
                color="success"
                class="mr-4"
              >
                Validate
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col
        cols="12"
        sm="4"
      >
        <v-card class="pa-3">
          <v-card-title class="justify-center">
            <div class="text-center">
              <v-hover v-slot="{ hover }">
                <v-avatar size="120">
                  <v-img
                    src="https://cdn.vuetifyjs.com/images/john.jpg"
                    alt="John"
                  >
                    <v-row
                      class="fill-height"
                      justify="center"
                      align="end"
                    >
                      <v-btn
                        v-if="hover"
                        text
                        block
                      >
                        <v-icon color="white">
                          mdi-image-edit-outline
                        </v-icon>
                      </v-btn>
                    </v-row>
                  </v-img>
                </v-avatar>
              </v-hover>
              <div class="text-h5 pt-3">
                {{ $auth.user.name }}
              </div>

              <div class="grey--text text-subtitle-1">
                {{ $auth.user.email }}
              </div>
            </div>
          </v-card-title>
          <v-divider />
          <v-card-text>
            <div class="text-center">
              Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.
            </div>
          </v-card-text>
          <v-card-actions>
            <v-dialog v-model="chang_pass_dialog" width="400">
              <template #activator="{ on, attrs }">
                <v-btn
                  block
                  color="success"
                  rounded
                  large
                  v-bind="attrs"
                  v-on="on"
                >
                  chang password
                </v-btn>
              </template>
              <v-card>
                <v-form ref="changpass_form" @submit.prevent="changpassword">
                  <v-card-title>
                    <span>Chang Password</span>
                    <v-spacer />
                    <v-btn icon @click="chang_pass_dialog=false">
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                  </v-card-title>
                  <v-card-text class="px-10">
                    <v-text-field
                      ref="old_password"
                      v-model="old_password"
                      prepend-inner-icon="mdi-lock-outline"
                      label="You Password"
                      :append-icon="showicon1 ? (showpass1 ? 'mdi-eye' : 'mdi-eye-off') : ''"
                      :type="showpass1 ? 'text' : 'password'"
                      counter
                      validate-on-blur
                      class="login"
                      :rules="[
                        (v) => !!v || $t('login.val_password'),
                        (v) => v.length >= 8 || $t('login.val_min8')
                      ]"
                      @click:append="showpass1 = !showpass1"
                    />
                    <v-text-field
                      ref="new_password"
                      v-model="new_password"
                      prepend-inner-icon="mdi-lock-outline"
                      label="New password"
                      :append-icon="showicon2 ? (showpass2 ? 'mdi-eye' : 'mdi-eye-off') : ''"
                      :type="showpass2 ? 'text' : 'password'"
                      counter
                      validate-on-blur
                      class="login"
                      :rules="[
                        (v) => !!v || $t('login.val_password'),
                        (v) => v.length >= 8 || $t('login.val_min8')
                      ]"
                      @click:append="showpass2 = !showpass2"
                    />
                    <v-text-field
                      ref="new_pass_try"
                      v-model="new_pass_try"
                      prepend-inner-icon="mdi-lock-outline"
                      label="Comfirm New password"
                      :append-icon="showicon3 ? (showpass3 ? 'mdi-eye' : 'mdi-eye-off') : ''"
                      :type="showpass3 ? 'text' : 'password'"
                      counter
                      validate-on-blur
                      class="login"
                      :rules="[
                        (v) => !!v || $t('login.val_password'),
                        (v) => v.length >= 8 || $t('login.val_min8'),
                        confirm_password || $t('dashboard.some_value')
                      ]"
                      @click:append="showpass3 = !showpass3"
                    />
                  </v-card-text>
                  <v-card-actions class="px-10 pb-10">
                    <v-btn large rounded block type="submit" color="primary">
                      changpassword
                    </v-btn>
                  </v-card-actions>
                </v-form>
              </v-card>
            </v-dialog>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'ProfilePage',
  layout: 'dashboard',
  data: () => ({
    chang_pass_dialog: false,
    showpass1: false,
    showpass2: false,
    showpass3: false,
    showicon1: false,
    showicon2: false,
    showicon3: false,
    old_password: '',
    new_password: '',
    new_pass_try: ''
  }),
  computed: {
    confirm_password () {
      return this.new_pass_try === this.new_password
    }
  },
  watch: {
    chang_pass_dialog (val) {
      val || this.$refs.changpass_form.resetValidation()
    },
    old_password (val) {
      val ? this.showicon1 = true : this.showicon1 = false
    },
    new_password (val) {
      val ? this.showicon2 = true : this.showicon2 = false
    },
    new_pass_try (val) {
      val ? this.showicon3 = true : this.showicon3 = false
    },
    showpass1 (val) {
      if (val) {
        setTimeout(() => { this.showpass1 = false }, 1000)
      }
    },
    showpass2 (val) {
      if (val) {
        setTimeout(() => { this.showpass2 = false }, 1000)
      }
    },
    showpass3 (val) {
      if (val) {
        setTimeout(() => { this.showpass3 = false }, 1000)
      }
    }
  },
  methods: {
    async changpassword () {
      if (this.$refs.changpass_form.validate()) {
        this.chang_pass_dialog = false
        this.$store.commit('SET_OVERLAY', true)
        const data = this.FormData({ old_password: this.old_password, new_password: this.new_password })
        await this.$axios.$post('/users/chang_password', data)
          .then((res) => {
            setTimeout(() => {
              if (res.error_password) {
                this.old_password = ''
                this.new_password = ''
                this.new_pass_try = ''
                this.$store.commit('SET_ERROR', 'ERROR PASSWORD')
              } else if (res.success) {
                this.$store.commit('SET_OVERLAY', false)
                this.$store.commit('SET_SUCCESS', 'CHANG PASSWORD SUCCESS...')
              } else {
                this.old_password = ''
                this.new_password = ''
                this.new_pass_try = ''
                this.$store.commit('SET_ERROR', 'ERROR ID')
              }
            }, 3000)
          })
      }
    }
  }
}
</script>
