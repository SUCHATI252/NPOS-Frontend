<template>
  <v-container>
    <v-card class="pa-5">
      <v-data-table
        :headers="headers"
        :items="users"
        :search="search"
      >
        <template #top>
          <v-card-title>
            <v-btn color="primary" dark @click="$refs.UserForm.open('add')">
              <v-icon>mdi-plus-circle-outline</v-icon>
              <span class="ml-1">NEW</span>
            </v-btn>
            <v-divider class="mx-4" vertical />
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
              <td>{{ item.email }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.phone }}</td>
              <td align="right" colspan="2">
                <v-btn
                  v-if="item.activate!=='1'"
                  :disabled="btnloading"
                  class="mr-2"
                  @click="activate(item.u_id)"
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
    <forms-user ref="UserForm" @add="submitAdd" />
  </v-container>
</template>

<script>
export default {
  name: 'UserPage',
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
        value: 'email'
      },
      {
        text: 'Name',
        value: 'u_name'
      },
      {
        text: 'Phone',
        value: 'phone'
      },
      {
        text: 'Actions',
        value: 'actions',
        sortable: false,
        align: 'right'
      }
    ],
    users: [],
    search: '',
    user_id: '',
    confirm: false,
    loading_dialog: false,
    btnloading: false,
    usernameDel: '',
    UName: ''
  }),
  async fetch () {
    this.users = await this.$axios.$post('/users').then(res => res.users)
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
      await this.$axios.$put(`/users/Unlock/${id}`)
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
    },
    async submitAdd (data) {
      const DATA = this.FormData(data)
      this.$store.commit('LOADIND_DIALOG', true)
      await this.$axios.$post('/users/create', DATA)
        .then((res) => {
          setTimeout(() => {
            if (res.success) {
              this.$store.commit('SET_SUCCESS', 'Add User success')
            } else if (res.status === 409) {
              this.$store.commit('SET_ERROR', 'erorr_email')
              this.$refs.UserForm.emailfocus()
            } else {
              this.$store.commit('SET_ERROR', 'ERROR')
            }
            this.$fetch()
            this.$refs.UserForm.close()
            this.$store.commit('LOADIND_DIALOG', false)
          }, 1000)
        })
    }
  }
}
</script>
