<template>
  <v-app dark>
    <v-app-bar dense app>
      <v-app-bar-nav-icon @click.stop="mini = !mini">
        <v-icon v-if="mini">
          mdi-format-indent-increase
        </v-icon>
        <v-icon v-else>
          mdi-format-indent-decrease
        </v-icon>
      </v-app-bar-nav-icon>
      <v-divider class="mx-3" inset vertical />
      <v-toolbar-title>Dashboard</v-toolbar-title>
      <v-spacer />
      <notification />
      <v-menu offset-y>
        <template #activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon v-text="'mdi-dots-vertical'" />
          </v-btn>
        </template>
        <v-list>
          <v-list-item to="/dashboards/users/profile">
            <v-list-item-icon>
              <v-icon v-text="'mdi-account-circle-outline'" />
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="'Profile'" />
            </v-list-item-content>
          </v-list-item>
          <v-divider />
          <v-list-item>
            <v-list-item-icon>
              <v-icon v-text="'mdi-account-circle-outline'" />
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="'item.text'" />
            </v-list-item-content>
          </v-list-item>
          <v-divider />
          <v-list-item @click="logout">
            <v-list-item-icon>
              <v-icon v-text="'mdi-power'" />
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="'Logout'" />
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-navigation-drawer
      app
      permanent
      :dark="offonImage"
      :mini-variant="mini"
      v-bind="$attrs"
    >
      <template v-if="offonImage" #img="props">
        <v-img
          :src="`/images/sidebar/sidebar-${barImage}.jpg`"
          :gradient="`to bottom, ${sidebarColor}`"
          v-bind="props"
        />
      </template>
      <v-list-item :class="mini ? 'px-2' : ''">
        <v-list-item-avatar>
          <v-img src="/images/LOGO.png" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="title">
            {{ $auth.user.name }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ $auth.user.email }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider />
      <v-list
        :dense="mini"
        nav
      >
        <div v-for="(menu, index) in menus" :key="index">
          <v-list-item :to="localePath(menu.link)" link :active-class="offoncolor && offonImage ? color : ''">
            <v-list-item-icon :class="!mini && 'pl-2'">
              <v-icon>{{ menu.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="$t(`dashboard.${menu.text}`)" />
            </v-list-item-content>
          </v-list-item>

          <v-divider :class="mini ? 'mb-1' : 'mb-2'" />
        </div>
      </v-list>
      <template #append>
        <v-menu
          v-model="sidebarsetting"
          offset-x
          transition="slide-x-transition"
        >
          <template #activator="{ on, attrs }">
            <v-divider />
            <v-list-item v-bind="attrs" v-on="on">
              <v-list-item-icon :class="!mini && 'pl-2'">
                <v-icon>mdi-cog-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Setting</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-icon>{{ sidebarsetting ? 'mdi-menu-left' : 'mdi-menu-right' }}</v-icon>
              </v-list-item-action>
            </v-list-item>
          </template>
          <v-card width="260">
            <v-card-title class="py-1 pr-1">
              Setting
              <v-spacer />
              <v-btn icon @click="sidebarsetting = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>

            <v-divider />

            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title> Languages </v-list-item-title>
                </v-list-item-content>
                <v-list-item-icon>
                  <v-btn-toggle dense>
                    <v-btn x-small :to="switchLocalePath('th')" v-text="'th'" />
                    <v-btn x-small :to="switchLocalePath('en')" v-text="'en'" />
                  </v-btn-toggle>
                </v-list-item-icon>
              </v-list-item>

              <v-divider />

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title> Dark Mode </v-list-item-title>
                </v-list-item-content>
                <v-list-item-icon>
                  <v-switch
                    v-model="$vuetify.theme.dark"
                    :label="$vuetify.theme.dark ? 'ON' : 'OFF'"
                    class="ma-0 pa-0"
                    inset
                    hide-details
                  />
                </v-list-item-icon>
              </v-list-item>

              <v-divider v-if="offonImage" />

              <v-list-item v-if="offonImage">
                <v-list-item-content>
                  <v-list-item-title> Link Color </v-list-item-title>
                </v-list-item-content>
                <v-list-item-icon>
                  <v-switch
                    v-model="offoncolor"
                    :label="offoncolor ? 'ON' : 'OFF'"
                    class="ma-0 pa-0"
                    inset
                    hide-details
                  />
                </v-list-item-icon>
              </v-list-item>
              <v-divider v-if="offoncolor && offonImage" />
              <v-list-item v-if="offoncolor && offonImage">
                <v-list-item-content>
                  <v-item-group
                    v-model="color"
                    class="d-flex justify-space-between mb-3"
                  >
                    <v-item
                      v-for="(col, index) in colors"
                      :key="index"
                      :value="col"
                      class="mx-1"
                    >
                      <template #default="{ active }">
                        <v-avatar
                          size="30"
                          :color="col"
                          :class="active && 'v-settings__item--active'"
                          class="d-inline-block v-settings__item"
                          @click="color = col"
                        />
                      </template>
                    </v-item>
                  </v-item-group>
                </v-list-item-content>
              </v-list-item>

              <v-divider />

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title> Background </v-list-item-title>
                </v-list-item-content>
                <v-list-item-icon>
                  <v-switch
                    v-model="offonImage"
                    :label="offonImage ? 'ON' : 'OFF'"
                    class="ma-0 pa-0"
                    inset
                    hide-details
                  />
                </v-list-item-icon>
              </v-list-item>
              <v-divider />
              <v-list-item v-if="offonImage">
                <v-list-item-content>
                  <v-item-group
                    v-model="image"
                    class="d-flex justify-space-between mb-3"
                  >
                    <v-item
                      v-for="(img, index) in images"
                      :key="index"
                      :value="img"
                      class="mx-1"
                    >
                      <template #default="{ active, toggle }">
                        <v-sheet
                          :class="active && 'v-settings__item--active'"
                          class="d-inline-block v-settings__item rounded-lg"
                          @click="toggle((barImage = img))"
                        >
                          <v-img
                            class="rounded-lg"
                            :src="`/images/sidebar/sidebar-${img}.jpg`"
                            height="100"
                            width="43"
                          />
                        </v-sheet>
                      </template>
                    </v-item>
                  </v-item-group>
                </v-list-item-content>
              </v-list-item>

              <v-divider v-if="offonImage" />

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Database</v-list-item-title>
                </v-list-item-content>
                <v-list-item-icon>
                  <v-btn
                    color="primary"
                    small
                    :loading="backuploading"
                    @click="startBackup"
                  >
                    backup
                  </v-btn>
                </v-list-item-icon>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Auto Backup</v-list-item-title>
                </v-list-item-content>
                <v-list-item-icon>
                  <v-switch
                    v-model="autobackup"
                    :label="autobackup ? 'ON' : 'OFF'"
                    class="ma-0 pa-0"
                    inset
                    hide-details
                  />
                </v-list-item-icon>
              </v-list-item>

              <v-divider />
            </v-list>
          </v-card>
        </v-menu>
      </template>
    </v-navigation-drawer>
    <v-main :class="!$vuetify.theme.dark && 'blue lighten-5'">
      <Nuxt />
    </v-main>
    <overlay />
    <loading-dialog />
    <snack-bar />
    <logout ref="logout" />
  </v-app>
</template>

<script>
export default {
  name: 'DashboardLayout',
  data: () => ({
    mini: false,
    menus: [
      { link: '/dashboards/dashboard', text: 'Dashboard', icon: 'mdi-view-dashboard' },
      { link: '/dashboards/users', text: 'Users', icon: 'mdi-account-outline' },
      { link: '/dashboards/stores', text: 'Stores', icon: 'mdi-store-outline' },
      { link: '/dashboards/customers', text: 'Customers', icon: 'mdi-account-group-outline' },
      { link: '/dashboards/listsales', text: 'Listsale', icon: 'mdi-format-list-numbered' },
      { link: '/sales', text: 'Sales', icon: 'mdi-cash-register' }
    ],
    sidebarsetting: false,
    offonImage: true,
    barImage: '1',
    sidebarColor: 'rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4)',
    image: '1',
    images: ['1', '2', '3', '4'],
    offoncolor: false,
    color: '',
    colors: ['primary', 'success', 'pink', 'red', 'teal', 'amber'],
    backuploading: false,
    autobackup: false
  }),
  head () {
    return {
      title: 'Dashboard',
      htmlAttrs: { lang: this.$i18n.locale }
    }
  },
  computed: {
    confirm_password () {
      return this.new_pass_try === this.new_password
    }
  },
  watch: {
    '$vuetify.theme.dark' (val) {
      this.$cookies.set('dark', val)
    },
    '$vuetify.breakpoint.mdAndDown' (val) {
      this.mini = val
    }
    // ,
    // autobackup (val) {
    // this.$store.commit('BACKUP', val)
    // }
  },
  beforeCreate () {
    this.$vuetify.theme.dark = (this.$cookies.get('dark') === true)
  },
  methods: {
    logout () {
      this.$refs.logout.open()
    },
    FormData (obj) {
      const data = new FormData()
      for (const key in obj) {
        data.append(key, obj[key])
      }
      return data
    },
    async startBackup () {
      this.backuploading = true
      await this.$axios.$post('home/backup').then((res) => {
        setTimeout(() => {
          if (res.success) {
            this.$store.commit('SET_SUCCESS', 'BACKUP DATABASE SUCCESS...')
          } else {
            this.$store.commit('SET_ERROR', 'ERROR BACKUP')
          }
          this.backuploading = false
        }, 3000)
      })
    }
  }
}
</script>
<style>
  .v-avatar.v-settings__item,
  .v-settings__item > * {
    cursor: pointer;
  }
  .v-settings__item {
    border-width: 3px;
    border-style: solid;
    border-color: transparent !important;
  }
  .v-avatar.v-settings__item.v-settings__item--active,
  .v-settings__item--active {
    border-color: #00cae3 !important;
  }
</style>
