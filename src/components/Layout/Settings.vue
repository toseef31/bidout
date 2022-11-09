<template>
  <v-app>
    <v-main>
      <section class="section-container fill-height">
        <Navbar></Navbar>
        <v-row class="mx-0">
          <v-col :class="[ showSideBar ? 'col-12' : 'toggleLeft-sidebar']" class="left-sidebar pr-1">
            <LeftSidebar></LeftSidebar>
          </v-col>
          
          <router-view :key="$route.path" />
        </v-row>
      </section>
    </v-main>
  </v-app>
</template>
<script>
  import Navbar from './Navbar.vue'
  import LeftSidebar from './Dashboard/LeftSidebar.vue'
  import RightSidebar from './Dashboard/RightSidebar.vue'
export default {
  name: 'Settings',
  metaInfo: {
    title: 'BidOut',
    titleTemplate: '%s | BidOut',
    htmlAttrs: {
      lang: 'en',
      amp: true,
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'description', content: 'An example Vue application with vue-meta.' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ]
  },
  components: {
    Navbar,
    LeftSidebar,
    RightSidebar
  },

  computed:{
    showSideBar(){
        return this.$store.getters.g_sideBarOpen;
    },
    activityPanel(){
        return this.$store.getters.g_activityPanel;
    },
    users(){
      return this.$store.getters.userList;
    },
    userStatus () {
      return this.$store.getters.userStatus
    },
    statusMessage () {
      return this.$store.getters.statusMessage
    },
    responseId () {
      return this.$store.getters.responseId
    },
    loader(){
      return this.$store.getters.pageLoader;
    },
  },
};
</script>
