<template>
  <v-container>
    <v-card class="pa-5">
      <v-data-table :headers="headers" :items="products" :search="search">
        <template #top>
          <v-toolbar elevation="0" color="transparent">
            <v-toolbar-title>Recycle Bin</v-toolbar-title>

            <v-spacer />

            <v-flex xs3 class="mb-n6">
              <v-text-field v-model="search" append-icon="mdi-magnify" placeholder="Search" filled dense />
            </v-flex>
          </v-toolbar>
          <div class="py-2">
            <v-divider />
          </div>
        </template>

        <template #body="{ items }">
          <tbody>
            <tr v-for="(item, index) in items" :key="index">
              <td>{{ index+1 }}</td>
              <td>
                <v-img aspect-ratio="1.4" contain :src="`${$config.SERVER_URL}products/Image/${item.pd_image}`" />
              </td>
              <td>
                <v-btn color="transparent" text @click="$refs.printbarcode.open(item.pd_code)">
                  <barcode
                    :value="item.pd_code"
                    format="EAN13"
                    height="10"
                    width="1"
                  />
                </v-btn>
              </td>
              <td>{{ item.pd_name }}</td>
              <td>{{ item.pd_buy | currency('') }}</td>
              <td>{{ item.pd_sale | currency('') }}</td>
              <td>
                {{ item.stock }}
              </td>
              <td>{{ item.cat_name }}</td>
              <td align="right">
                <v-row>
                  <v-btn icon color="success" @click="restore(item.pd_id)">
                    <v-icon>
                      mdi-restore
                    </v-icon>
                  </v-btn>
                  <v-btn color="error" icon @click="DeleteProduct(item)">
                    <v-icon>
                      mdi-delete
                    </v-icon>
                  </v-btn>
                </v-row>
              </td>
            </tr>
          </tbody>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="confirm" max-width="350">
      <v-card class="pa-3">
        <v-form ref="form_del" @submit.prevent="submitDeleteproduct">
          <v-card-title class="headline">
            ยืนยันการลบ?
          </v-card-title>
          <v-card-text>
            เมื่อคุณยืนยันการลบ คุณจะไม่สามารถกู้คืนข้อมูลนี้ได้
            <p>
              Barcode <v-chip color="red lighten-4" class="ml-0 mr-2 black--text" label small>
                {{ productNameDel }}
              </v-chip>
            </p>
            <v-text-field
              v-model="productCodeDel"
              v-mask="mask_barcode"
              label="Barcode"
              :rules="[
                v => !!v || 'enter Barcode',
                v => (v && v.length >= 13) || 'Min 13 characters'
              ]"
              outlined
              dense
              class="px-5"
            />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn @click="confirm = false">
              Cancel
            </v-btn>
            <v-btn color="success" type="submit">
              Confirm
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import VueBarcode from 'vue-barcode'
export default {
  name: 'RecycleBin',
  components: {
    barcode: VueBarcode
  },
  layout: 'dashboard',
  data: () => ({
    products: [],
    confirm: false,
    headers: [
      {
        text: '#',
        align: 'start',
        value: 'index'
      },
      {
        text: 'IMG',
        value: 'pd_image'
      },
      {
        text: 'Barcode',
        value: 'pd_code'
      },
      {
        text: 'Name ',
        value: 'pd_name '
      },
      {
        text: 'Cost',
        value: 'pd_buy'
      },
      {
        text: 'Price',
        value: 'pd_sale'
      },
      {
        text: 'Stock',
        value: 'stock'
      },
      {
        text: 'Category',
        value: 'cat_name'
      },
      {
        text: 'Actions',
        value: 'actions',
        sortable: false,
        align: 'right'
      }
    ],
    search: '',
    mask_barcode: '#############',
    id: '',
    productCodeDel: '',
    productNameDel: ''
  }),
  async fetch () {
    this.products = await this.$axios.$post('/products/RecycleBin').then(res => res.products)
  },
  watch: {
  },
  methods: {
    async restore (id) {
      await this.$axios.$post(`/products/Restore/${id}`).then((res) => {
        if (res.success) {
          this.$store.commit('SET_SUCCESS', 'Restore Product successfully')
          this.$fetch()
        } else {
          this.$store.commit('SET_ERROR', 'Error Restore')
        }
      })
    },
    DeleteProduct (data) {
      this.id = data.pd_id
      this.productNameDel = data.pd_code
      this.confirm = true
    },
    async submitDeleteproduct () {
      if (this.$refs.form_del.validate()) {
        this.confirm = false
        await this.$axios.$delete(`/products/delete_recyclebin/${this.id}/${this.productCodeDel}`)
          .then((res) => {
            if (res.success) {
              this.$store.commit('SET_SUCCESS', 'Delete Product success')
            } else if (res.error_code) {
              this.$store.commit('SET_ERROR', 'Error BARCODE')
            } else {
              this.$store.commit('SET_ERROR', 'Error Delete')
            }
            this.$fetch()
            this.id = ''
            this.productNameDel = ''
          })
      }
    }
  }
}
</script>
