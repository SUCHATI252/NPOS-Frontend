<template>
  <v-app-bar dense app flat color="transparent">
    <v-spacer />
    <v-tooltip bottom>
      <template #activator="{ on, attrs }">
        <v-btn
          id="theme-guest"
          aria-label="theme-dark"
          icon
          class="mr-3"
          v-bind="attrs"
          @click="$vuetify.theme.dark=!$vuetify.theme.dark"
          v-on="on"
        >
          <v-icon>mdi-invert-colors</v-icon>
        </v-btn>
      </template>
      <span>{{ $vuetify.theme.dark?'Light':'Dark' }}</span>
    </v-tooltip>
    <v-btn-toggle dense>
      <v-btn :to="switchLocalePath('th')" x-small>
        th
      </v-btn>
      <v-btn :to="switchLocalePath('en')" x-small>
        en
      </v-btn>
    </v-btn-toggle>
  </v-app-bar>
</template>

<script>
export default {
  name: 'AppBar'
}
</script>
