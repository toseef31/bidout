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
          src="src/assets/logo.png"
        ></v-img>
      </template>

      <v-spacer></v-spacer>

      
      <v-list>
        <v-list-item
          prepend-avatar="src/assets/user.png"
          title="John Leider"
          subtitle="john@vuetifyjs.com"
        >
          <template>
            <v-list-item-avatar end>
              <v-btn size="small" variant="text" icon>mdi-menu-down</v-btn>
            </v-list-item-avatar>
          </template>
        </v-list-item>
      </v-list>
      <v-list >
        <v-img src="src/assets/user.png"></v-img>
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
