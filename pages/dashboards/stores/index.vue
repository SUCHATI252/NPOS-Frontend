<template>
  <v-container>
    <v-card class="pa-5">
      <v-data-table :headers="headers" :items="products" :search="search">
        <template #top>
          <v-toolbar elevation="0" color="transparent">
            <v-divider class="mx-4" vertical />
            <v-btn color="primary" dark @click="AddProduct">
              <v-icon>mdi-plus-circle-outline</v-icon> NEW product
            </v-btn>
            <v-divider class="mx-4" vertical />

            <v-spacer />

            <v-flex xs3 class="mb-n6">
              <v-text-field v-model="search" append-icon="mdi-magnify" placeholder="Search" filled dense />
            </v-flex>
            <v-divider class="mx-4" vertical />
            <v-autocomplete
              v-model="cateid"
              :items="categorys"
              item-text="cat_name"
              item-value="cat_id"
              label="Category"
              style="max-width:150px!important;"
              clearable
              class="mb-n3 mr-3"
              @change="productofcategory()"
            />

            <v-tooltip bottom>
              <template #activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  icon
                  v-bind="attrs"
                  v-on="on"
                  @click="Addcategory"
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </template>
              <span>New Category</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template #activator="{ on, attrs }">
                <v-btn color="primary" dark v-bind="attrs" v-on="on" @click="allcategory_dialog = true">
                  <v-icon>mdi-group</v-icon>
                </v-btn>
              </template>
              <span>All Category</span>
            </v-tooltip>

            <v-divider class="mx-4" vertical />

            <v-tooltip bottom>
              <template #activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" :to="localePath('/dashboards/stores/recyclebin')" v-on="on">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </template>
              <span>Recycle Bin</span>
            </v-tooltip>
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
                <v-edit-dialog
                  :return-value.sync="item.stock"
                  large
                  @save="addstock(item.pd_id)"
                >
                  {{ item.stock }}
                  <template #input>
                    <v-text-field
                      v-model="editstock"
                      label="Edit"
                      single-line
                    />
                  </template>
                </v-edit-dialog>
              </td>
              <td>{{ item.cat_name }}</td>
              <td align="right">
                <v-row>
                  <v-btn small icon class="mr-2" color="success" @click="EditProduct(item)">
                    <v-icon small>
                      mdi-pencil
                    </v-icon>
                  </v-btn>
                  <v-btn small color="error" icon @click="DeleteProduct(item)">
                    <v-icon small>
                      mdi-delete
                    </v-icon>
                  </v-btn>
                </v-row>
              </td>
            </tr>
          </tbody>
        </template>
      </v-data-table>
      <v-btn color="primary" @click="printproduct">
        print
      </v-btn>
    </v-card>

    <v-dialog v-model="allcategory_dialog" max-width="600">
      <v-card class="pa-5">
        <v-card-title class="mr-n5 mt-n5 headline">
          <span class="headline">Categorys</span>
          <v-spacer />
          <v-btn icon @click="allcategory_dialog=false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-data-table :headers="headercategory" :items="categorys" :search="searchcategory">
          <template #top>
            <v-toolbar elevation="0" color="transparent">
              <v-tooltip bottom>
                <template #activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    @click="Addcategory"
                  >
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </template>
                <span>New Category</span>
              </v-tooltip>
              <v-divider class="mx-4" vertical />

              <v-spacer />

              <v-flex>
                <v-text-field
                  v-model="searchcategory"
                  append-icon="mdi-magnify"
                  placeholder="Search"
                  filled
                  dense
                  class="mb-n5"
                />
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
                <td>{{ item.cat_name }}</td>
                <td>{{ item.cat_details }}</td>
                <td width="120" align="right">
                  <v-btn icon class="mr-2" color="success" @click="EditCategory(item)">
                    <v-icon small>
                      mdi-pencil
                    </v-icon>
                  </v-btn>
                  <v-btn color="error" icon @click="DeleteCategory(item)">
                    <v-icon small>
                      mdi-delete
                    </v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-data-table>
      </v-card>
    </v-dialog>

    <v-dialog v-model="confirmCategory" max-width="350">
      <v-card class="pa-3">
        <v-form ref="form_del_Cate" @submit.prevent="submitDeletecategory">
          <v-card-title class="headline">
            ยืนยันการลบ?
          </v-card-title>
          <v-card-text>
            เมื่อคุณยืนยันการลบ คุณจะไม่สามารถกู้คืนข้อมูลนี้ได้
            <p>
              Category <v-chip color="red lighten-4" class="ml-0 mr-2 black--text" label small>
                {{ cateName }}
              </v-chip>
            </p>
            <v-text-field
              v-model="cateNameDel"
              label="Category Name"
              :rules="[
                v => !!v || 'Enter Category Name',
              ]"
              outlined
              dense
              class="px-5"
            />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn @click="confirmCategory = false">
              Cancel
            </v-btn>
            <v-btn color="success" type="submit">
              Confirm
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>

    <print-products ref="printproducts" :data="products" />
    <print-barcode ref="printbarcode" />

    <forms-product ref="productform" @add="submitAddproduct" @edit="submitEditproduct" />
    <forms-category ref="categoryform" @add="submitAddcategory" @edit="submitEditcategory" />
  </v-container>
</template>

<script>
import VueBarcode from 'vue-barcode'
export default {
  name: 'StoresPage',
  components: {
    barcode: VueBarcode
  },
  layout: 'dashboard',
  data: () => ({
    products: [],
    id: '',
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
    confirm: false,
    // barcode_dialog: false,
    barcode: '',
    categorys: [],
    headercategory: [
      {
        text: '#',
        align: 'start',
        value: 'index'
      },
      {
        text: 'Name',
        value: 'cat_name'
      },
      {
        text: 'Details ',
        value: 'cat_details '
      },
      {
        text: 'Actions',
        value: 'actions',
        sortable: false,
        align: 'right'
      }
    ],
    cateid: '',
    // tbl_print: false,
    cat_id: '',
    mask_barcode: '#############',
    productCodeDel: '',
    productNameDel: '',
    allcategory_dialog: false,
    cateNameDel: '',
    cateName: '',
    confirmCategory: false,
    searchcategory: '',
    editstock: ''
  }),
  async fetch () {
    this.products = await this.$axios.$post('/products').then(res => res.products)
    this.categorys = await this.$axios.$post('/categorys').then(res => res.categorys)
  },
  watch: {
    confirm (val) {
      if (!val) {
        this.$refs.form_del.reset()
        this.id = ''
        this.productNameDel = ''
      }
    }
  },
  methods: {
    async addstock (id) {
      const dataform = this.FormData({ qty: this.editstock })
      await this.$axios.$post(`/products/add_stock/${id}`, dataform)
        .then((res) => {
          if (res.success) {
            this.$store.commit('SET_SUCCESS', 'Update User success')
          } else {
            this.$store.commit('SET_ERROR', 'Error Update')
          }
          this.editstock = ''
          this.$fetch()
        })
    },
    FormData (obj) {
      const Data = new FormData()
      for (const key in obj) {
        Data.append(key, obj[key])
      }
      return Data
    },
    AddProduct () {
      this.$refs.productform.open('add')
    },
    async submitAddproduct (data) {
      this.$store.commit('LOADIND_DIALOG', true)
      const DATA = this.FormData(data)
      await this.$axios.$post('/products/create', DATA, {
        headers: { 'Content-type': 'multipart/form-data' }
      }).then((res) => {
        if (res.success) {
          this.$store.commit('SET_SUCCESS', 'Add product success')
        } else if (res.error_code) {
          this.$store.commit('SET_ERROR', 'ERROR Product Code  ')
        } else if (res.erorr_img) {
          this.$store.commit('SET_ERROR', 'ERROR Product IMG  ')
        } else {
          this.$store.commit('SET_ERROR', 'Can`t Add product ')
        }
        this.$fetch()
        this.$refs.productform.close()
        this.$store.commit('LOADIND_DIALOG', false)
      })
    },
    EditProduct (data) {
      this.id = data.pd_id
      const dataedit = {
        p_id: data.pd_id,
        p_code: data.pd_code,
        p_name: data.pd_name,
        cost_price: data.pd_buy,
        sale_price: data.pd_sale,
        stock: data.stock,
        p_details: data.details,
        pd_image: data.pd_image,
        category: data.category,
        supplier: data.supplier
      }
      this.$refs.productform.open('edit', dataedit)
    },
    async submitEditproduct (data) {
      this.$store.commit('LOADIND_DIALOG', true)
      const dataform = this.FormData(data)
      await this.$axios.$post(`/products/update/${this.id}`, dataform)
        .then((res) => {
          if (res.success) {
            this.$store.commit('SET_SUCCESS', 'Update User success')
          } else {
            this.$store.commit('SET_ERROR', 'Error Update')
          }
          this.id = ''
          this.$fetch()
          this.$refs.productform.close()
          this.$store.commit('LOADIND_DIALOG', false)
        })
    },
    async DeleteProduct (data) {
      await this.$axios.$delete(`/products/delete/${data.pd_id}`)
        .then((res) => {
          if (res.success) {
            this.$store.commit('SET_SUCCESS', 'Delete Product success')
          } else {
            this.$store.commit('SET_ERROR', 'Error Delete')
          }
          this.$fetch()
        })
    },
    SHOW_Barcode (item) {
      this.$refs.printbarcode.open(item.pd_code)
    },
    async productofcategory () {
      if (this.cateid) {
        await this.$axios.$put(`/products/productbycategory/${this.cateid}`).then((res) => {
          if (res.success) {
            this.products = res.products
          } else {
            this.$store.commit('SET_ERROR', 'Error Find DATA')
            setTimeout(() => {
              this.$fetch()
            }, 2000)
          }
        })
      } else {
        this.$fetch()
      }
    },
    Addcategory () {
      this.$refs.categoryform.open('add')
    },
    async submitAddcategory (data) {
      this.$store.commit('LOADIND_DIALOG', true)
      const dataform = this.FormData(data)
      await this.$axios.$post('/categorys/create', dataform)
        .then((res) => {
          if (res.success) {
            this.$store.commit('SET_SUCCESS', 'Add Category success')
          } else if (res.error_name) {
            this.$store.commit('SET_ERROR', 'ERROR Category Name')
          } else {
            this.$store.commit('SET_ERROR', 'Can`t Add Category ')
          }
          this.$fetch()
          this.$refs.categoryform.close()
          this.$store.commit('LOADIND_DIALOG', false)
        })
    },
    EditCategory (data) {
      this.id = data.cat_id
      this.$refs.categoryform.open('edit', data)
    },
    async submitEditcategory (data) {
      this.$store.commit('LOADIND_DIALOG', true)
      const dataform = this.FormData(data)
      await this.$axios.$post(`/categorys/update/${this.id}`, dataform)
        .then((res) => {
          if (res.success) {
            this.$store.commit('SET_SUCCESS', 'Update User success')
          } else {
            this.$store.commit('SET_ERROR', 'Error Update')
          }
          this.id = ''
          this.$fetch()
          this.$refs.categoryform.close()
          this.$store.commit('LOADIND_DIALOG', false)
        })
    },
    DeleteCategory (data) {
      this.id = data.cat_id
      this.cateName = data.cat_name
      this.confirmCategory = true
    },
    async submitDeletecategory () {
      if (this.$refs.form_del_Cate.validate()) {
        this.confirmCategory = false
        await this.$axios.$delete(`/categorys/delete/${this.id}/${this.cateNameDel}`)
          .then((res) => {
            if (res.success) {
              this.$store.commit('SET_SUCCESS', 'Delete Product success')
            } else if (res.error_code) {
              this.$store.commit('SET_ERROR', 'Error CODE')
            } else if (res.Nodata) {
              this.$store.commit('SET_ERROR', 'Error Nodata')
            } else {
              this.$store.commit('SET_ERROR', 'Error Delete')
            }
            this.id = ''
            this.cateNameDel = ''
            this.$fetch()
          })
      }
    },
    printproduct () {
      this.$refs.printproducts.print()
    },
    async getdata_in_recyclebin () {
      this.products = await this.$axios.$post('/products/RecycleBin').then(res => res.products)
    }
  }
}
</script>
