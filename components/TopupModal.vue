<template>
  <v-dialog v-model="dialog_topup" persistent max-width="400">
    <v-card>
      <v-card-title>
        <span>TOPUP</span>
        <v-spacer />
        <v-btn icon dack class="mr-n4 mt-n3" @click="dialog_topup=false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider />
      <v-window v-model="step">
        <v-window-item :value="1">
          <v-card-text>
            <v-img
              max-height="300"
              src="http://server.npos/setting/qrcode_img"
            />
            <div class="text-center">
              <span>
                Scan This QRCond and Enter Next
              </span>
            </div>
            <br>
            <span class="caption grey--text text--darken-1">
              Bank: BangkokBank
            </span>
            <br>
            <span class="caption grey--text text--darken-1">
              Account Name: BangkokBank
            </span>
            <br>
            <span class="caption grey--text text--darken-1">
              Account Number: 123-4567-89
            </span>
          </v-card-text>
        </v-window-item>

        <v-window-item :value="2">
          <v-card-text>
            <v-file-input
              label="Img"
              validate-on-blur
              accept="image/*"
              class="py-0"
            />
            <span class="caption grey--text text--darken-1">
              Please enter a password for your account
            </span>
          </v-card-text>
        </v-window-item>

        <v-window-item :value="3">
          <div class="pa-4 text-center">
            <v-img
              class="mb-4"
              contain
              height="128"
              src="https://cdn.vuetifyjs.com/images/logos/v.svg"
            />
            <h3 class="title font-weight-light mb-2">
              Welcome to Vuetify
            </h3>
            <span class="caption grey--text">Thanks for signing up!</span>
          </div>
        </v-window-item>
      </v-window>

      <v-divider />

      <v-card-actions>
        <v-btn
          :disabled="step === 1"
          text
          @click="step--"
        >
          Back
        </v-btn>
        <v-spacer />
        <v-btn
          :disabled="step === 3"
          color="primary"
          depressed
          @click="step++"
        >
          Next
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import QRious from 'qrious'
export default {
  data: () => ({
    dialog_topup: false,
    mode: '',
    customer: {
      cus_code: '',
      cus_cas: ''
    },
    step: 1,
    qrcode: new QRious({ size: 200, padding: 25 })
  }),
  fetch () {
    this.qrcode.value = 'npos.com'
  },
  computed: {
    newQRCode () {
      return this.qrcode.toDataURL()
    }
  },
  methods: {
    open (mode, data) {
      this.dialog_topup = true
      this.mode = mode
      if (data) {
        this.customer = { ...data }
      }
    },
    close () {
      this.dialog_topup = false
    },
    save () {
      if (this.$refs.form_topup.validate()) {
        this.$emit(this.mode, this.customer)
      }
    }
  }

}
</script>
