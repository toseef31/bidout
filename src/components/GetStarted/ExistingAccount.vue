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
        <v-main>
          <v-row justify="center">
            <v-col cols="12" md="9">
              <div class="alert-section">
                <v-img :src="require('@/assets/images/getStarted/warning.png')" max-width="120px" class="mx-auto mb-8"></v-img>
                <!-- <v-icon color="#0D9647" x-large>mdi-alert-outline</v-icon> -->
                <p>An existing account already exists for <strong>Baker Hughes</strong>.</p>
                <p>A notification has been sent to the Administrator on the account to approve your access request. For immediate assistence, please reach out your team members at Baker Hughes wich include: <strong>Tyler Cherry, Tom Hall</strong>.</p>
              </div>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" md="8">
              <div class="getStart-box pa-6 text-left">
                <h1 class="mb-3 font-weight-bold">For Immediate assistance!</h1>
                <div class="d-flex align-start">
                  <v-icon class="pr-4 mt-1" color="#0D9647">mdi-phone-outline</v-icon>
                  <p>Contact BidOut's support team at <br><strong>832-786-2400</strong></p>
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
  import NavbarBeforeLogin from '../Layout/NavbarBeforeLogin.vue'
  import Footer from '../Layout/Footer.vue'
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
  },
  methods: {
    
  },
  mounted() {
     document.title = "Existing Account - BidOut"
  }
};
</script>
<style scoped lang="scss">

</style>
