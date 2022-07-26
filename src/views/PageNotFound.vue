<template>
  <section class="fill-height error-module white">
    <NavbarBeforeLogin v-if="!users"></NavbarBeforeLogin>
    <Navbar v-else></Navbar>
      <v-container v-if="!users">
        <v-main>
          <v-row justify="center">
            <v-col cols="12" md="9">
              <div class="alert-section">
                <div class="error-title mb-5">
                	<h1 class="font-weight-bold">Opps!</h1>
                	<h1 class="font-weight-medium">This page is not available.</h1>
                </div>
                
                <div class="btn-section mt-8 mb-16 pb-16">
                	<a class="text-decoration-none" href="https://bidout.app"><v-btn 
                	large
                	outlined
                	color="#0D9647"
                	height="52"
                	class="mr-5 font-weight-bold text-capitalize"
                	>Access Homepage</v-btn></a>
                	<router-link to="/" class="text-decoration-none"><v-btn 
                	large
                	outlined
                	color="#0D9647"
                	class="font-weight-bold text-capitalize"
                	height="52"
                	>Access OFS Directory</v-btn></router-link>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-main>
        
      </v-container>
      <v-row class="mx-0" v-else>
        <v-col :class="[ showSideBar ? 'col-12' : 'toggleLeft-sidebar']" class="left-sidebar pr-1">
           <LeftSidebar></LeftSidebar>
        </v-col>
        <v-col class="mid-content pa-0 pa-sm-3 justify-center align-center" :class="[ showSideBar ? 'col-md-9 col-12 col-sm-7' : 'mid-content-collapse', activityPanel ? 'd-sm-block' : 'd-md-flex']" v-show="!activityPanel">
           <div class="alert-section">
             <div class="error-title mb-5">
              <h1 class="font-weight-bold">Opps!</h1>
              <h1 class="font-weight-medium">This page is not available.</h1>
             </div>
             
             <div class="btn-section mt-8 mb-16 pb-16">
              <a class="text-decoration-none" href="https://bidout.app"><v-btn 
              large
              outlined
              color="#0D9647"
              height="52"
              class="mr-5 font-weight-bold text-capitalize"
              >Access Homepage</v-btn></a>
              <router-link to="/dashboard" class="text-decoration-none"><v-btn 
              large
              outlined
              color="#0D9647"
              class="font-weight-bold text-capitalize"
              height="52"
              >Access Dashboard</v-btn></router-link>
             </div>
           </div>
        </v-col>
      </v-row>
      <Footer v-if="!users"></Footer>
   </section>
</template>
<script>
  import Navbar from './Layout/Navbar.vue'
  import NavbarBeforeLogin from './Layout/NavbarBeforeLogin.vue'
  import LeftSidebar from './Layout/Dashboard/LeftSidebar.vue'
  import Footer from './Layout/Footer.vue'
export default {
  name : "PageNotFound",
  components: {
    Navbar,
    NavbarBeforeLogin,
    Footer,
    LeftSidebar
  },
  
  data() {
    return {
      isActivity : false,
      users: ''
    };
  },
  computed:{
    showSideBar(){
        return this.$store.getters.g_sideBarOpen;
    },
    activityPanel(){
        return this.$store.getters.g_activityPanel;
    },
  },
  methods: {
    
  },
  mounted() {
    document.title = "Opps! - BidOut";  
    this.users = JSON.parse(localStorage.getItem("userData")).user;
    console.log(this.users);
  }
};
</script>
<style scoped lang="scss">

</style>
