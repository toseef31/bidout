<template>
  <section class="fill-height module-selection white">
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
              <div class="title-head text-left">
                <h3 class="mb-4">New Account Setup:</h3>
                <h1 class="mb-8">Tetra Technologies</h1>
                <h4 class="font-weight-bold">BidOut Modules</h4>
              </div>
              <v-form>
                <div class="create-bid text-left mt-5 pa-4">
                  <div class="d-flex justify-space-between align-center mb-5 label-title">
                    <h1 class="font-weight-bold">RFP Platform - Create Bids</h1>
                    <v-sheet>
                      <v-switch
                        v-model="createBid"
                        inset
                      ></v-switch>
                    </v-sheet>
                  </div>
                  <p class="font-weight-medium">BidOut's flagship RFP Platform. The ability to create and distribute RPF's to BidOut's network or <br>service providers.</p>
                  <div class="d-inline-block agreement-box pa-3">
                    <div class="d-flex">
                      <v-icon color="#0D9647">mdi-check-circle-outline</v-icon>
                      <div class="pl-2">
                        <p class="mb-0">Agreement Executed </p>
                        <p class="mb-0">07/05/2022 12:52pm </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="create-bid text-left mt-5 pa-4">
                  <div class="d-flex justify-space-between align-center mb-5 label-title">
                    <h1 class="font-weight-bold">RFP Platform - Respond to Bids</h1>
                    <v-sheet>
                      <v-switch
                        v-model="bidRespond"
                        inset
                        
                      ></v-switch>
                    </v-sheet>
                  </div>
                  <p class="font-weight-medium">Signup today as a service provider to get access to more work trhoughout BidOut Platform. By <br> enabling this module, Operators can invite your business to respond to bids.</p>
                </div>
                <div class="create-bid text-left mt-5 pa-4">
                  <div class="d-flex justify-space-between align-center mb-5 label-title">
                    <h1 class="font-weight-bold">OFS Directory - Service Provider Listing </h1>
                    <h1 class="price-text">$79/month</h1>
                    <v-sheet>
                      <v-switch
                        v-model="providerListing"
                        inset
                        
                      ></v-switch>
                    </v-sheet>
                  </div>
                  <p class="font-weight-medium">Showcase your Service Provide to oil and gas operators to gain access to more visibility and more <br>work.</p>
                  <div class="d-flex">
                    <v-radio-group
                      v-model="editions"
                      mandatory
                      row
                    >
                      <v-radio
                        label="Standard Edition (Free)"
                        color="#0D9647"
                        value="standard"
                      ></v-radio>
                      <v-radio
                        label="Premium Edition"
                        color="#0D9647"
                        value="premium"
                      ></v-radio>
                    </v-radio-group>
                  </div>
                  <v-row>
                    <v-col cols="12" sm="12" text="left">
                      <label class="d-block text-left input-label mb-2 font-weight-bold">Sale Contact</label>
                      <v-select outlined placeholder="Select" :items="packages"></v-select>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="4" text="left">
                      <router-link to="get-started/contract"width="100%" class="font-weight-bold white--text text-capitalize text-decoration-none agreement-link pa-4">Execute Agreement Now <v-icon class="pl-2" color="#fff">mdi-arrow-right-circle</v-icon></router-link>
                      <!-- <v-btn color="#0D9647" large dense width="100%" height="56" class="font-weight-bold white--text text-capitalize">Execute Agreement Now <v-icon class="pl-2" color="#fff">mdi-arrow-right-circle</v-icon></v-btn> -->
                    </v-col>
                  </v-row>
                </div>
                <v-row justify="center mt-10">
                  <v-col cols="12" md="3">
                    <v-btn color="#0D9647" large dense width="100%" height="56" class="font-weight-bold white--text text-capitalize">Next <v-icon class="pl-2" color="#fff">mdi-arrow-right-circle</v-icon></v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" md="8">
              <div class="getStart-box pa-6 text-left">
                <h1 class="mb-3 font-weight-bold">Questions? Interested in an Enterpise Agreement?</h1>
                <div class="d-flex align-start">
                  <v-icon class="pr-4 mt-1" color="#0D9647">mdi-phone-outline</v-icon>
                  <p>Call BidOut <br><strong>832-786-2400</strong></p>
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
  name : "ModuleSelection",
  components: {
    NavbarBeforeLogin,
    Footer,
  },
  
  data() {
    return {
      createBid: true,
      bidRespond: false,
      providerListing: true,
      editions : 'premium',
      packages: ['1-5 Staff Members - $79.99 month or $800/year', '5-10 Staff Members - $159.99 month or $1600/year', '10-15 Staff Members - $139.99 month or $2400/year'],
    };
  },
  computed:{
   
  },
  methods: {
    
  },
  mounted() {
    
}
};
</script>
<style scoped lang="scss">

</style>
