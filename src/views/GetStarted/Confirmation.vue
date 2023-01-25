<template>
  <section class="fill-height getstarted-module white">
    <NavbarBeforeLogin></NavbarBeforeLogin>
      <div class="get-topHeader d-flex">
        <v-container fill-height>
          <v-row
            align="center"
            justify="center"
            no-gutters
          >
            <v-col
              class="text-left"
              cols="12"
            >
              <h1 class="font-weight-bolder white--text">
                Get Started
              </h1>
            </v-col>
          </v-row>
        </v-container>
      </div>
      <v-container>
        <v-main class="pt-15">
          <v-row justify="center">
            <v-col cols="12" md="10">
              <div class="alert-section mb-5">
                <v-img :src="require('@/assets/images/getStarted/confirm.png')" max-width="120px" class="mx-auto mb-8"></v-img>
                <h1 class="font-weight-bold mt-15">Congratulations!</h1>
                <h1 class="font-weight-medium">Your account at BidOut is now setup, we will log you in to our Dashboard in 3 seconds.</h1>
              </div>
              <div class="confirm-box pt-5">
                <h1 class="font-weight-medium">If you are not automatically redirected, click here</h1>
                <div class="mt-6">
                  <v-btn color="#0D9647" large dense height="56" class="font-weight-bold white--text text-capitalize" @click="loginRequest">Access BidOut Dashboard <v-icon class="pl-2" color="#fff">mdi-arrow-right-circle</v-icon></v-btn>
                </div>
              </div>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" md="8">
              <div class="getStart-box pa-6 text-left">
                <h1 class="mb-3 font-weight-bold">Get Started Today for Free!</h1>
                <div class="d-flex align-start">
                  <v-icon class="pr-4 mt-1" color="#0D9647">mdi-phone-outline</v-icon>
                  <p>Contact a BidOut Team Member Today by calling <br><strong>832-786-2400</strong></p>
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
  import NavbarBeforeLogin from '../../components/Layout/NavbarBeforeLogin.vue'
  import Footer from '../../components/Layout/Footer.vue'
  import { mapActions } from "vuex";
export default {
  name : "GetStarted",
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
    contractData(){
     if(this.$store.getters.contractData){
       return this.$store.getters.contractData;
     }
     
    },
    credent(){
      return this.$store.getters.credentials;
    }
  },
  methods: {
    ...mapActions(["signInAction"]),
    loginRequest() {
      var data = {
        email: this.$store.getters.credentials.email, 
        password: this.$store.getters.credentials.password
      }
      this.signInAction(data);
      
    },
  },
  mounted() {
    document.title = "Confirmation - BidOut"
    this.loginRequest();
  }
};
</script>
<style scoped lang="scss">

</style>
