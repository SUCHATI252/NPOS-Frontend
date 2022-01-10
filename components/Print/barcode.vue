<template>
  <v-dialog v-model="barcode_dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
    <v-card>
      <v-card-title>
        <v-spacer />
        <v-btn icon @click="barcode_dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col>
            <barcode :value="barcode" format="EAN13" height="20" />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import VueBarcode from 'vue-barcode'
export default {
  name: 'PrintBarcode',
  components: {
    barcode: VueBarcode
  },
  data: () => ({
    barcode_dialog: false,
    barcode: ''
  }),
  methods: {
    open (barcode) {
      this.barcode = barcode
      this.barcode_dialog = true
    }
  }

}
</script>
