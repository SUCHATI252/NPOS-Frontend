<template>
  <div v-if="notification!==0">
    <v-badge
      class="mr-2"
      :color="notification > 0 ? 'error' : ''"
      :content="notification > 0 ? notification : ''"
      overlap
    >
      <v-menu
        v-model="menu"
        transition="scale-transition"
        origin="right top"
        bottom
        left
        offset-y
      >
        <template #activator="{ on, attrs }">
          <v-icon
            v-bind="attrs"
            v-on="on"
          >
            mdi-bell
          </v-icon>
        </template>

        <v-card>
          <v-list v-if="notificationItem.length > 0">
            <div v-for="(item, index) in notificationItem" :key="index">
              <v-list-item>
                <v-list-item-avatar>
                  <v-img
                    :src="`http://pos.pos/products/Image/${item.pd_image}`"
                    aspect-ratio="1"
                    height="80px"
                    alt="productImage"
                  />
                </v-list-item-avatar>
                <v-list-item-title v-text="item.pd_name" />
                <v-list-item-icon>
                  <v-avatar
                    color="error"
                    size="20"
                    class="pa-3"
                  >
                    <span class="white--text text-caption">
                      {{ item.stock }}
                    </span>
                  </v-avatar>
                </v-list-item-icon>
              </v-list-item>

              <v-divider />
            </div>
          </v-list>
        </v-card>
      </v-menu>
    </v-badge>
    <v-divider class="mx-3" inset vertical />
  </div>
</template>

<script>
export default {
  name: 'NotifiCation',
  data: () => ({
    notification: 0,
    notificationItem: [],
    menu: false
  }),
  async fetch () {
    // this.notification = await this.$axios.$post('/products/notification').then(res => res.stock)
    // this.notificationItem = await this.$axios.$post('/products/notificationItem').then(res => res.list)
  }
}
</script>
