<template>
  <v-container>
    <v-card class="pa-5">
      <v-data-table :items="lists" :search="search">
        <template #top>
          <v-card-title>
            <span>
              Listsales
            </span>
            <v-spacer />
            <v-flex xs3 class="mr-1 mb-n6">
              <v-text-field v-model="search" append-icon="mdi-magnify" placeholder="Search" filled dense />
            </v-flex>
            <v-flex xs3 class="ml-1 mb-n6">
              <v-select
                :items="itemselect"
                label="Outlined style"
                dense
                outlined
              />
            </v-flex>
          </v-card-title>
          <div class="py-2">
            <v-divider />
          </div>
        </template>

        <template #body="{ items }">
          <thead>
            <tr>
              <th>#</th>
              <th>OrderNO</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Get</th>
              <th>Change</th>
              <th>Payment</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in items" :key="index" @click="list_info(item.s_order)">
              <td>{{ index+1 }}</td>
              <td>{{ item.s_order }}</td>
              <td>{{ item.cus_name }}</td>
              <td>{{ item.s_total }}</td>
              <td>{{ item.s_get }}</td>
              <td>{{ item.s_change }}</td>
              <td>{{ item.pay_type }}</td>
              <td>{{ item.s_date }}</td>
            </tr>
          </tbody>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="List_dialog" width="600">
      <v-card>
        <v-card-title class="headline">
          Order NO.{{ Order }}
          <v-spacer />
          <v-btn icon class="mt-n2 mr-n3" @click="List_dialog=false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-divider />

        <v-card-text>
          <v-simple-table>
            <template #default>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product Name</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in listsale_info" :key="index">
                  <td>{{ index+1 }}</td>
                  <td>{{ item.pd_name }}</td>
                  <td>{{ item.qty }}</td>
                  <td>{{ item.sd_price }}</td>
                  <td>{{ item.qty * item.sd_price }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>

        <v-divider />

        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" text @click="List_dialog = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: 'ListsalesPage',
  layout: 'dashboard',
  data: () => ({
    lists: [],
    listsale_info: [],
    search: '',
    List_dialog: false,
    Order: '',
    itemselect: ['Day', 'Week', 'Month', 'Year']
  }),
  async fetch () {
    this.lists = await this.$axios.$post('/sales/listsales').then(res => res.lists)
  },
  methods: {
    async list_info (order) {
      await this.$axios.$put(`/sales/listsale_info/${order}`).then((res) => {
        if (res.success) {
          this.listsale_info = res.listsale
          this.Order = order
          this.List_dialog = true
        }
      })
    }
  }
}
</script>
