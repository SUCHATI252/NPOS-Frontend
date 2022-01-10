<template>
  <v-container>
    <v-card class="pa-5">
      <v-data-table
        :headers="headers"
        :items="customers"
        :search="search"
      >
        <template #top>
          <v-card-title>
            <v-spacer />
            <v-flex xs3 class="mb-n6">
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                placeholder="Search"
                filled
                dense
              />
            </v-flex>
          </v-card-title>
          <div class="py-2">
            <v-divider />
          </div>
        </template>

        <template #body="{ items }">
          <tbody>
            <tr v-for="(item, index) in items" :key="index">
              <td>{{ index+1 }}</td>
              <td>{{ item.cus_email }}</td>
              <td>{{ item.cus_name }}</td>
              <td>{{ item.cus_phone }}</td>
              <td align="right" colspan="2">
                <v-btn
                  v-if="item.activate!=='1'"
                  :disabled="btnloading"
                  class="mr-2"
                  @click="activate(item.cus_id)"
                  v-text="'Activate'"
                />
                <v-icon
                  v-else
                  color="success"
                >
                  mdi-check-circle-outline
                </v-icon>
              </td>
            </tr>
          </tbody>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'CustomersPage',
  layout: 'dashboard',
  data: () => ({
    headers: [
      {
        text: '#',
        align: 'start',
        value: 'index'
      },
      {
        text: 'Email',
        value: 'cus_email'
      },
      {
        text: 'Name',
        value: 'cus_name'
      },
      {
        text: 'Phone',
        value: 'cus_phone'
      },
      {
        text: 'Actions',
        value: 'actions',
        sortable: false,
        align: 'right'
      }
    ],
    customers: [],
    search: '',
    btnloading: false
  }),
  async fetch () {
    this.customers = await this.$axios.$post('/customers').then(res => res.customers)
  },
  methods: {
    FormData (obj) {
      const Data = new FormData()
      for (const key in obj) {
        Data.append(key, obj[key])
      }
      return Data
    },
    async activate (id) {
      this.$store.commit('LOADIND_DIALOG', true)
      await this.$axios.$put(`/customers/Unlock/${id}`)
        .then((res) => {
          this.btnloading = true
          setTimeout(() => {
            if (res.success) {
              this.$store.commit('SET_SUCCESS', 'Activate User success')
            } else {
              this.$store.commit('SET_ERROR', 'erorr Activate')
            }
            this.$fetch()
            this.btnloading = false
            this.$store.commit('LOADIND_DIALOG', false)
          }, 3000)
        })
    }
  }
}
</script>
