<template>
  <section class="fill-height error-module white">
    <Navbar></Navbar>
      <v-container>
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
   </section>
</template>
<script>
  import Footer from './Layout/Footer.vue'
export default {
  name : "PageNotFound",
  components: {
    Navbar,
    NavbarBeforeLogin,
    Footer,
  },
  
  data() {
    return {
      isActivity : false,
      users: ''
    };
  },
  computed:{
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
