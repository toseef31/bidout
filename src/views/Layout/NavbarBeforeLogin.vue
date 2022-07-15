<template>
  <div class="navbar-module">
    <v-app-bar
        color="white"
        height="104" fixed dense app
      >
      <template>
        <v-app-bar-nav-icon @click="toggleSideBar"></v-app-bar-nav-icon>
        </template>
        <template>
          <router-link to="" class="logo_main"><img
            :src="require('@/assets/images/green-black.png')"
            class="ml-3"
          ></router-link>
        </template>
        <template>
          <div class="toggle-btn">
            <v-btn
              fab
              dark
              small
              color="#0D9648"
            >
              <v-icon dark>
                {{isHidden ? 'mdi-close' : 'mdi-plus'}}
              </v-icon>
            </v-btn>
            <div>
              <v-card
                  class="mx-auto menu-card"
                  min-width="290"
                  tile
                  outlined
                >
                  <v-list class="pa-0">
                    <v-list-item-group
                      color="success"
                    >
                      <v-list-item
                        v-for="(item, i) in items"
                        :key="i"
                      >
                        <v-list-item-icon class="mr-2 my-2">
                          <v-icon color="#0D9648" v-text="item.icon"></v-icon>
                        </v-list-item-icon>
                        <v-list-item-content align-start color="#0D9648" class="pa-0">
                          <v-list-item-title v-text="item.text" color="#0D9648"></v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </v-card>
            </div>
          </div>
        </template>
        <v-spacer></v-spacer>

        <v-list>
          <v-list-item class="pr-0">
            <router-link to="/edit-profile" class="d-flex text-decoration-none">
              <v-list-item-title class="mr-3">Aubrey  McClendon</v-list-item-title>
              <v-avatar>
                <v-img :src="require('@/assets/images/user.png')"></v-img>
              </v-avatar>
            </router-link>
          </v-list-item>
        </v-list>
      </v-app-bar>
  </div>
</template>

<script>

export default {
  name : "NavbarBeforeLogin",
  data() {
    return {
      
    };
  },
  computed: {
    
  },
  methods: {
    
  },
};
</script>
<style scoped lang="scss">

</style>
