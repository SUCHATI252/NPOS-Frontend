<template>
  <v-container>
    <v-row class="mt-2">
      <v-col
        v-for="(widget, i) in widgets"
        :key="i"
        cols="12"
        sm="6"
        md="3"
        lg="3"
        class="mt-5"
      >
        <v-card class="d-flex justify-space-between px-3 py-5">
          <div>
            <div class="mt-n8 pa-4 v-sheet" :class="widget.color">
              <v-icon x-large dark>
                {{ widget.icon }}
              </v-icon>
            </div>
          </div>
          <div>
            <div class="pr-3 text-right mr-n3">
              <div class="grey--text body-2">
                {{ widget.text }}
              </div>
              <h3 class="text-h5 font-weight">
                {{ widget.value || 0 }}
              </h3>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <!--------------// ROW Widget------------------->

    <!-------------- ROW CHART ------------------>
    <v-row>
      <v-container grid-list-xl>
        <v-layout wrap>
          <!--------------List ToDay ----------------->
          <v-flex md4>
            <v-card class="mt-5 mx-auto">
              <v-card-title>
                <span>สิ้นค้าขายดี</span>
              </v-card-title>
              <v-divider />
              <v-card-text>
                <v-simple-table>
                  <template #default>
                    <tbody>
                      <tr v-for="(item, index) in producttoday" :key="index">
                        <td># {{ index + 1 }}</td>
                        <td>{{ item.pd_name }}</td>
                        <td>{{ item.product_qty }}</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
                <v-divider class="mb-2" />
              </v-card-text>
            </v-card>
          </v-flex>
          <!-------------- //List ToDay --------------->

          <!-------------- CHART Day  ----------------->
          <v-flex md8>
            <v-card class="mt-5 mx-auto">
              <v-card-text>
                <v-card-title>
                  <v-icon large left style="color: #1f8ef1">
                    mdi-poll
                  </v-icon>
                  <span class="title font-weight-light">
                    สรุปยอดขายเดือนนี้
                  </span>
                  <v-spacer />
                  <h3 class="display-1 font-weight">
                    {{ saletomonth || 0 }} ฿
                  </h3>
                </v-card-title>
                <v-divider class="mb-4 mt-n4" />
                <v-skeleton-loader
                  :loading="load_M_data"
                  tile
                  transition="scale-transition"
                  type="card"
                >
                  <!-- >article -->
                  <bar-chart
                    :chart-data="Monthdata"
                    :label="Monthlabel"
                    :height="M_h"
                    border-color="#1f8ef1"
                    rgb1="rgba(29,140,248,0.2)"
                    rgb2="rgba(29,140,248,0.0)"
                    rgb3="rgba(29,140,248,0)"
                  />
                </v-skeleton-loader>
                <v-divider class="mx-2 mb-2" />
              </v-card-text>
            </v-card>
          </v-flex>
          <!-------------- // CHART Day ------------->
        </v-layout>
      </v-container>
    </v-row>
    <!-------------- //ROW ------------------>

    <!-------------- CHART Month ----------------->
    <v-row>
      <v-container grid-list-xl>
        <v-layout wrap>
          <v-flex>
            <v-card class="mt-5 mx-auto">
              <v-card-text>
                <v-card-title>
                  <v-icon large left style="color: #00d6b4">
                    mdi-poll
                  </v-icon>
                  <span class="title font-weight-light"> สรุปยอดขายปีนี้ </span>
                  <v-spacer />
                  <h3 class="display-1 font-weight">
                    {{ saletoYear || 0 }} ฿
                  </h3>
                </v-card-title>
                <v-divider class="mb-4 mt-n4" />
                <v-skeleton-loader
                  :loading="load_Y_data"
                  tile
                  transition="scale-transition"
                  type="card"
                >
                  <bar-chart
                    :chart-data="Yeardata"
                    :label="Yearlabel"
                    :height="Y_h"
                    border-color="#00d6b4"
                    rgb1="rgba(66,134,121,0.15)"
                    rgb2="rgba(66,134,121,0.05)"
                    rgb3="rgba(66,134,121,0)"
                  />
                </v-skeleton-loader>
                <v-divider class="mx-2 mb-2" />
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'DashboardPage',
  layout: 'dashboard',
  data: () => ({
    widgets: [
      { icon: 'mdi-calendar-today', color: 'primary', text: 'ยอดขายวันนี้', value: '' },
      { icon: 'mdi-calendar-month', color: 'success', text: 'ยอดขายเดือนนี้', value: '' },
      { icon: 'mdi-barcode', color: 'info', text: 'สินค้า / รายการ', value: '' },
      { icon: 'mdi-account-group', color: 'orange', text: 'พนักงาน / คน', value: '' }
    ],
    load_M_data: true,
    Monthdata: [],
    Monthlabel: [],
    M_h: 115,
    load_Y_data: true,
    Yeardata: [],
    Yearlabel: [],
    Y_h: 100,
    producttoday: [],
    saletomonth: '',
    saletoYear: ''
  }),
  async fetch () {
    this.widgets[0].value = await this.$axios.$post('/sales/saletoday').then(res => this.$options.filters.currency(res.today, '฿'))
    this.widgets[1].value = await this.$axios.$post('/sales/saletomonth').then(res => this.$options.filters.currency(res.tomonth, '฿'))
    this.widgets[2].value = await this.$axios.$post('/products/count').then(res => res.total)
    this.widgets[3].value = await this.$axios.$post('/users/count').then(res => res.total)
    this.producttoday = await this.$axios.$post('/sales/productsaletoday').then(res => res.products)
    // this.saletoday = await this.$axios.$post('/sales/saletoday').then(res => res.today)
    this.saletomonth = await this.$axios.$post('/sales/saletomonth').then(res => res.tomonth)
    this.saletoYear = await this.$axios.$post('/sales/saletoyear').then(res => res.toyear)

    await this.$axios.$post('/sales/chartmonth').then((res) => {
      for (const m in res.month) {
        this.Monthdata.push(res.month[m].total)
        this.Monthlabel.push(res.month[m].day)
      }
      this.load_M_data = false
    })
    await this.$axios.$post('/sales/chartyear').then((res) => {
      const month = []
      month[1] = 'January'
      month[2] = 'February'
      month[3] = 'March'
      month[4] = 'April'
      month[5] = 'May'
      month[6] = 'June'
      month[7] = 'July'
      month[8] = 'August'
      month[9] = 'September'
      month[10] = 'October'
      month[11] = 'November'
      month[12] = 'December'
      this.load_Y_data = false
      for (const y in res.year) {
        this.Yeardata.push(res.year[y].total)
        this.Yearlabel.push(month[res.year[y].month])
      }
    })
  }
}
</script>
