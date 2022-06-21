<template>
  <v-app-bar
      color="white"
    >
    <template>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      </template>
      <template>
        <v-img
        max-height="100"
        max-width="100"
          :src="require('@/assets/images/logo.png')"
        ></v-img>
      </template>

      <v-spacer></v-spacer>

      
      
      <v-list >
        <v-list-item>
          <v-list-item-title class="mr-3">Aubrey  McClendon</v-list-item-title>
          <v-avatar>
            <v-img :src="require('@/assets/images/user.png')"></v-img>
          </v-avatar>
        </v-list-item>
      </v-list>
    </v-app-bar>
</template>

<script>

export default {
  name : "Navbar",
  data() {
    return {
      drawer: false,
          tab: null,
            items: [
              'web', 'shopping', 'videos', 'images', 'news',
            ],
    };
  },
  methods: {
    menuItems() {
      return this.menu;
    },
  },
};
</script>
<style scoped lang="scss">

</style>
