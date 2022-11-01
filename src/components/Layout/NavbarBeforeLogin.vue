<template>
  <div class="navbarNoLogin-module">
        <v-app-bar height="88">
           
            <template>
              <router-link to="/" class="logo_main">
                <img
                :src="require('@/assets/images/green-black.png')">
              </router-link>
            </template>
            <v-spacer></v-spacer>
      
            
            <div class="d-flex justify-center align-center main-menu">
              <v-list class="px-7">
                <a class="text-decoration-none" href="https://bidout.app"><v-list-item-title class="font-weight-bold">Home</v-list-item-title></a>
              </v-list>
              <v-list class="px-7">
                <router-link to="/" class="text-decoration-none"><v-list-item-title class="font-weight-bold">OFS Directory</v-list-item-title></router-link>
              </v-list>
              <router-link to="/get-started" color="white" large height="56" class="font-weight-bold text-capitalize mr-3 text-decoration-none pa-3 white menu-btn">
                Get Started Now  <v-icon class="pl-2" color="#0D9647">mdi-arrow-right-circle</v-icon>
              </router-link>
              
              <router-link to="/login" color="white" large height="56" class="font-weight-bold text-capitalize ml-3 text-decoration-none pa-3 white menu-btn">
                Log In<v-icon class="pl-2" color="#0D9647">mdi-arrow-right-circle</v-icon>
              </router-link>
            </div>
            <v-app-bar-nav-icon @click="drawer = true" class="mobile-icon d-none"></v-app-bar-nav-icon>
        </v-app-bar>
        <!-- Add a navigation bar -->
        <v-navigation-drawer
          v-model="drawer"
          absolute
          temporary
        >
          <v-list
            nav
            dense class="responsive-menu"
          >
            <v-list-item-group
            >
              <v-list-item>
                <a href="https://bidout.app" class="text-decoration-none">
                  <v-list-item-title @click="tab = index" class="text-left">Home</v-list-item-title>
                </a>
              </v-list-item>
              <v-list-item v-for="(item, index) in items" :key="index">
                <router-link :to="item.link" class="text-decoration-none">
                  <v-list-item-title @click="tab = index" class="text-left">{{ item.title }}</v-list-item-title>
                </router-link>
              </v-list-item>

            </v-list-item-group>
          </v-list>
        </v-navigation-drawer>
        <!-- Navigation bar ends -->
    
  </div>
</template>

<script>

export default {
  name : "NavbarBeforeLogin",
  data() {
    return {
      drawer: false,
      tab: null,
        items: [
          {title: 'OFS Directory', link: '/'},
          {title: 'Get started Now', link: '/get-started'},
          {title: 'Log In', link: '/login'}
        ],
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
