<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'Base',
  metaInfo: {
      title: 'BidOut',
      titleTemplate: '%s | BidOut',
      htmlAttrs: {
        lang: 'en-US'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'description', content: 'An example Vue application with vue-meta.' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    },
  components: {
  },
};
</script>
