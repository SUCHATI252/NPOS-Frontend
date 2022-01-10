<template>
  <v-container fluid class="fill-height">
    <app-bar />
    <v-row justify="center" class="mt-n16">
      <v-col
        cols="12"
        sm="6"
        md="4"
      >
        <v-card color="transparent" flat>
          <v-form ref="form_search" @submit.prevent="search">
            <v-text-field
              ref="customerID"
              v-model="customerID"
              v-mask="'#############'"
              class="searchcustomer"
              label="Customer ID"
              prepend-inner-icon="mdi-magnify"
              append-icon="mdi-arrow-right-thin-circle-outline"
              :rules="[
                v => !!v || 'login.val_data',
                (v) => v.length >= 8 || 'val_min8'
              ]"
              solo
              rounded
              full-width
              @click:append="search"
            />
          </v-form>
          <v-expand-transition>
            <v-card v-if="showdata" rounded="lg">
              <v-card-title>
                ID : {{ changcode(customer.id) }}
                <v-spacer />
                <v-btn icon @click="cleardata">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-card-title>
              <v-divider />
              <v-card-text>
                <v-list>
                  <v-list-item two-line>
                    <v-list-item-avatar>
                      <v-icon large class="grey lighten-1" dark>
                        mdi-account
                      </v-icon>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title>Name: {{ customer.name }}</v-list-item-title>
                      <v-list-item-subtitle>{{ customer.money | currency('฿ ') }}</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-icon>
                      <v-btn color="success" @click="$refs.topup.open()">
                        topup
                      </v-btn>
                    </v-list-item-icon>
                  </v-list-item>

                  <v-divider inset />

                  <v-list-item>
                    <v-list-item-icon />
                    <v-list-item-content>
                      <v-list-item-subtitle>
                        Email : {{ changmail(customer.email) }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-divider inset />

                  <v-list-item>
                    <v-list-item-icon />
                    <v-list-item-content>
                      <v-list-item-subtitle>
                        Phone : {{ changphone(customer.phone) }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-divider inset />

                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon>mdi-history</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>History</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-expand-transition>
          <div v-if="!showdata" class="text-center">
            <span>Enter customer code to search for information or top up.</span>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <topup-modal ref="topup" />
  </v-container>
</template>

<script>
export default {
  name: 'HomePage',
  auth: false,
  data: () => ({
    customerID: '',
    showdata: false,
    dialog_topup: false,
    customer: {
      id: '',
      name: '',
      email: '',
      phone: ''
    }
  }),
  methods: {
    FormData (obj) {
      const data = new FormData()
      for (const key in obj) {
        data.append(key, obj[key])
      }
      return data
    },
    async search () {
      if (this.$refs.form_search.validate()) {
        const data = this.FormData({ code: this.customerID })
        await this.$axios.$post('customers/findID', data)
          .then((res) => {
            if (res.success) {
              this.customer = {
                id: res.customer.cus_code,
                money: res.customer.cus_cash,
                name: res.customer.cus_name,
                email: res.customer.cus_email,
                phone: res.customer.cus_phone
              }
              this.customerID = ''
              this.showdata = true
              this.$refs.form_search.resetValidation()
            } else {
              this.showdata = false
              this.$store.commit('SET_ERROR', 'NO Data For This ID')
            }
          })
      }
    },
    cleardata () {
      this.showdata = false
      this.customerID = ''
      this.customer = {
        id: '',
        name: '',
        email: '',
        phone: ''
      }
      this.$refs.customerID.focus()
    },
    changmail (email) {
      if (email) {
        return email.replace(email.substr(2, email.search('@')), '*****')
      }
    },
    changphone (phone) {
      if (phone) {
        return phone.replace(phone.substr(5, 5), '*****')
      }
    },
    changcode (code) {
      if (code) {
        return code.replace(code.substr(5, 5), '*******')
      }
    }
  }
}
</script>
<style>
.searchcustomer .v-text-field__details {
    margin-left: 30px;
}
</style>
