<template>
  <v-dialog v-model="tbl_print">
    <div id="tbl_product">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">
              #
            </th>
            <th scope="col">
              #
            </th>
            <th scope="col">
              #
            </th>
            <th scope="col">
              #
            </th>
            <th scope="col">
              #
            </th>
            <th scope="col">
              #
            </th>
            <th scope="col">
              #
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in data" :key="index" scope="row">
            <td>{{ index+1 }}</td>
            <td>{{ item.p_code }}</td>
            <td>{{ item.p_name }}</td>
            <td>{{ item.cost_price | currency('') }}</td>
            <td>{{ item.sale_price | currency('') }}</td>
            <td>{{ item.stock }}</td>
            <td>{{ item.cat_name }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </v-dialog>
</template>

<script>
export default {
  name: 'PrintProduct',
  props: {
    data: {
      type: Array,
      default: null
    }
  },
  data: () => ({
    tbl_print: false
  }),
  methods: {
    print () {
      this.tbl_print = true
      setTimeout(() => {
        this.$htmlToPaper('tbl_product')
        setTimeout(() => {
          this.tbl_print = false
        }, 1)
      }, 1)
    }
  }
}
</script>
