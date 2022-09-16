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
                <h1 class="mb-8">{{companyName}}</h1>
                <h4 class="font-weight-bold">BidOut Modules</h4>
              </div>
              <v-form>
                <div class="create-bid text-left mt-5 pa-4">
                  <div class="d-flex justify-space-between align-center mb-5 label-title">
                    <h1 class="font-weight-bold">RFx Platform - Create Bids</h1>
                    <v-sheet>
                      <v-switch
                        v-model="createBid"
                        inset
                      ></v-switch>
                    </v-sheet>
                  </div>
                  <p class="font-weight-medium">BidOut's flagship RFP Platform. The ability to create and distribute RPF's to BidOut's network or <br>service providers.</p>
                  <div class="d-inline-block">
                    <v-btn color="#0D9647" large dense width="100%" height="56" class="font-weight-bold white--text text-capitalize pa-4" @click="generateContract('rfx')">Execute Agreement Now <v-icon class="pl-2" color="#fff">mdi-arrow-right-circle</v-icon></v-btn>
                  </div>
                  <!-- <div class="d-inline-block agreement-box pa-3">
                    <div class="d-flex">
                      <v-icon color="#0D9647">mdi-check-circle-outline</v-icon>
                      <div class="pl-2">
                        <p class="mb-0">Execute Agreement Now</p>
                        <p class="mb-0">{{ new Date() | moment("MM/D/YYYY h:mm a") }} </p>
                      </div>
                    </div>
                  </div> -->
                </div>
                <!-- <div class="create-bid text-left mt-5 pa-4">
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
                </div> -->
                <div class="create-bid text-left mt-10 pa-4">
                  <div class="d-flex justify-space-between align-center mb-5 label-title">
                    <h1 class="font-weight-bold">Respond to Bids - OFS Directory</h1>
                    <h1 class="price-text"><span v-if="trial_end == 'free'">Free</span><span v-else>
                      <template v-if="package == 1">$99.99/month</template>
                      <template v-else-if="package == 2">$119.99/month</template>
                      <template v-else-if="package == 3">$2400/year</template>
                      <template v-else>$79.99/month</template>
                    </span></h1>
                    <v-sheet>
                      <v-switch
                        v-model="providerListing"
                        inset
                        
                      ></v-switch>
                    </v-sheet>
                  </div>
                  <p class="font-weight-medium">Respond to bid invitiations & showcase your services to oil and gas operators to gain access to <br>greater visibility.</p>
                  <div class="d-flex">
                    <v-radio-group
                      v-model="trial_end"
                      mandatory
                      row
                    >
                      <v-radio
                        label="Standard Edition (Free)"
                        color="#0D9647"
                        value="free"
                      ></v-radio>
                      <v-radio
                        label="Premium Edition"
                        color="#0D9647"
                        value="paid"
                      ></v-radio>
                    </v-radio-group>
                  </div>
                  <v-row>
                    <v-col cols="12" sm="12" v-show="trial_end == 'paid'">
                      <label class="d-block text-left input-label mb-2 font-weight-bold">Sales Team Users</label>
                      <v-select outlined placeholder="Select" v-model="package" :items="packages" item-text="name" item-value="id"></v-select>
                      
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="4" text="left">
                      <v-btn color="#0D9647" large dense width="100%" height="56" class="font-weight-bold white--text text-capitalize pa-4" @click="generateContract('ofs')">Execute Agreement Now <v-icon class="pl-2" color="#fff">mdi-arrow-right-circle</v-icon></v-btn>
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
  import { mapActions } from "vuex";
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
      trial_end : 'premium',
      package: { name: '1-5 Users - $79.99/month or $800/year prepaid', id: 0},
      packages: [
        { name: '1-5 Users - $79.99/month or $800/year prepaid', id: 0},
        { name: '6-10 Users - $99.99/month or $1,000/year prepaid', id: 1},
        { name: '11-15 Users - $119.99/month or $1,200/year prepaid', id: 2},
        { name: '16+ Users or Unlimited - $2,400/year prepaid', id: 3},
      ],
    };
  },
  computed:{
   companyName(){
    return this.$store.getters.companyName;
   },
   contractData(){
    return this.$store.getters.contractData;
   },
   ip(){
    return this.$store.getters.userIp;
   },
  },
  methods: {
    ...mapActions(["contractGenerate","getIpAddress"]),
    generateContract(type){
      var contract = {
        ip: this.$store.getters.userIp,
        contractType: type,
        plan: this.package,
        id: this.$store.getters.userId,
      }
      // console.log(contract);
      this.contractGenerate(contract);
    }
    
  },
  mounted() {
    document.title = "Module Selection - BidOut" 
    this.getIpAddress();
  }
};
</script>
<style scoped lang="scss">

</style>
