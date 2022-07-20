<template>
  <section class="fill-height error-module white">
    <NavbarBeforeLogin></NavbarBeforeLogin>
      <v-container>
        <v-main>
          <v-row justify="center">
            <v-col cols="12" md="9">
              <div class="alert-section">
                <div class="error-title mb-5">
                	<h1 class="font-weight-bold">Opps! - BidOut</h1>
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
                	<v-btn 
                	large
                	outlined
                	color="#0D9647"
                	class="font-weight-bold text-capitalize"
                	height="52"
                	><router-link to="/" class="text-decoration-none">Access OFS Directory</router-link></v-btn>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-main>
      </v-container>
      <Footer></Footer>
   </section>
</template>
<script>
  import NavbarBeforeLogin from './Layout/NavbarBeforeLogin.vue'
  import Footer from './Layout/Footer.vue'
export default {
  name : "PageNotFound",
  components: {
    NavbarBeforeLogin,
    Footer,
  },
  
  data() {
    return {
      isActivity : false,
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
    
}
};
</script>
<style scoped lang="scss">

</style>
