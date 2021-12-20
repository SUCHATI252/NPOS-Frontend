<template>
  <v-container>
    <v-card class="pa-5">
      <v-toolbar flat>
        <v-tabs
          v-model="tab"
          right
          icons-and-text
        >
          <v-tab href="#tab-1">
            TO Day
            <v-icon>mdi-calendar</v-icon>
          </v-tab>
          <v-tab href="#tab-2">
            Month
            <v-icon>mdi-calendar-month</v-icon>
          </v-tab>
          <v-tab href="#tab-3">
            Favorites
            <v-icon>mdi-heart</v-icon>
          </v-tab>
        </v-tabs>
      </v-toolbar>
      <v-divider />

      <v-tabs-items v-model="tab">
        <v-tab-item value="tab-1">
          <v-card flat>
            <v-card-text>
              111
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item value="tab-2">
          <v-card flat>
            <v-card-text>
              222
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item value="tab-3">
          <v-card flat>
            <v-card-text>
              3333
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'ReportPage',
  layout: 'dashboard',
  data: () => ({
    tab: null,
    items: [
      'web', 'shopping', 'videos'
    ],
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'

  })
}
</script>
