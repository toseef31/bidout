<template>
  <section class="fill-height getstarted-module">
    <NavbarBeforeLogin></NavbarBeforeLogin>
      <div class="get-topHeader d-flex">
        <v-row
          align="center"
          justify="center"
          no-gutters
        >
          <v-col
            class="text-left pl-16"
            cols="12"
          >
            <h1 class="font-weight-bolder white--text">
              Get Started
            </h1>
          </v-col>
        </v-row>
      </div>
      <v-container>
        <v-main>
          <v-row justify="center">
            <v-col cols="12" md="9">
              <div class="tabs-head pa-6">
                <h4 class="text-left mb-4 font-weight-bold">Choose an option</h4>
                <template>
                  <v-tabs
                    v-model="currentItem"
                    centered
                    hide-slider grow  height="56"
                  >
                    <v-tab class="mr-4 text-capitalize" v-for="item in items"
                      :key="item">
                      {{item}}
                    </v-tab>
                  </v-tabs>
                </template>
              </div>
              <v-tabs-items v-model="currentItem">
                <v-tab-item>
                  <v-card flat>
                    <v-card-text>
                      <h2></h2>
                      
                    </v-card-text>
                  </v-card>
                </v-tab-item>
                <v-tab-item>
                  <v-form @submit.prevent="registerRequest" ref="form">
                    <v-container>
                      <v-row class="mt-8 bg-light">
                        <v-col cols="12" sm="12" text="left" class="pa-6">
                          <label class="d-block text-left input-label mb-2 font-weight-bold">Company Name</label>
                          <v-text-field prepend-inner-icon="search" label="Full name ..." single-line outlined type="text">
                          </v-text-field>
                        </v-col>
                      </v-row>
                      <v-row class="mt-12 bg-light pa-3">
                        <v-col cols="12" sm="12" text="left">
                          <label class="d-block text-left input-label mb-2 font-weight-bold">Company HQ Address 1</label>
                          <v-text-field label="Company HQ Address 1 ..." single-line outlined type="text" v-model="companyHq" color="#ffffff"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12" text="left">
                          <label class="d-block text-left input-label mb-2 font-weight-bold">Company HQ Address 2</label>
                          <v-text-field label="Company HQ Address 2 ..." single-line outlined type="text" v-model="companyHq2"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" text="left">
                          <label class="d-block text-left input-label mb-2 font-weight-bold">Company HQ Country</label>
                          <v-select :items="countries" outlined v-model="companyHqCountry" placeholder="Select"></v-select>
                        </v-col>
                        <v-col cols="12" sm="6" text="left">
                          <label class="d-block text-left input-label mb-2 font-weight-bold">Company HQ State</label>
                          <v-select outlined placeholder="Select" v-model="companyHqState"></v-select>
                        </v-col>
                        <v-col cols="12" sm="6" text="left">
                          <label class="d-block text-left input-label mb-2 font-weight-bold">Company HQ City</label>
                          <v-select outlined placeholder="Select" v-model="companyHqCity"></v-select>
                        </v-col>
                        <v-col cols="12" sm="6" text="left">
                          <label class="d-block text-left input-label mb-2 font-weight-bold">Company HQ ZIP</label>
                          <v-text-field label="ZIP Code ..." single-line outlined type="text" v-model="companyHqZip"></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row class="mt-12 bg-light pa-3">
                        <v-col cols="12" sm="12" text="left">
                          <label class="d-block text-left input-label mb-2 font-weight-bold">First Name</label>
                          <v-text-field label="First Name ..." single-line outlined type="text" color="#ffffff" v-model="firstName"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12" text="left">
                          <label class="d-block text-left input-label mb-2 font-weight-bold">Last Name</label>
                          <v-text-field label="Last Name ..." single-line outlined type="text" v-model="lastName"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12" text="left">
                          <label class="d-block text-left input-label mb-2 font-weight-bold">Email Address</label>
                          <v-text-field label="example@email.com" single-line outlined type="email" v-model="email"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12" text="left">
                          <label class="d-block text-left input-label mb-2 font-weight-bold">Title</label>
                          <v-text-field label="Title ..." single-line outlined type="text" v-model="title"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12" text="left">
                          <label class="d-block text-left input-label mb-2 font-weight-bold">Direct Phone Number</label>
                          <v-text-field label="000000-00" single-line outlined type="text" v-model="phoneNumber"></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row justify="center mt-10">
                        <v-col cols="12" md="3">
                          <v-btn color="#0D9647" large dense width="100%" height="56" class="font-weight-bold white--text text-capitalize" type="submit">Next <v-icon class="pl-2" color="#fff">mdi-arrow-right-circle</v-icon></v-btn>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-form>
                </v-tab-item>
              </v-tabs-items>
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
  import NavbarBeforeLogin from '../Layout/NavbarBeforeLogin.vue'
  import Footer from '../Layout/Footer.vue'
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
      currentItem: null,
      items: [
        'Operator', 'Service Provider',
      ],
      countries: [
        'Uninted States',
        'United Kingdom',
        'China',
        'Russia',
        'Germany',
        'Pakistan',
        'India',
        'Brazil',
        'Australia',
      ],
      companyHqCountry: 'Uninted States',
      companyHq: '',
      companyHq2: '',
      companyHqState: '',
      companyHqCity: '',
      companyHqZip: '',
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      title: ''
    };
  },
  computed:{
    activityPanel(){
        return this.$store.getters.g_activityPanel;
    },
  },
  methods: {
    ...mapActions(["signUpAction"]),
    registerRequest() {
      var providerData = {
        companyHq: this.companyHq,
        companyHq2: this.companyHq2,
        companyHqCountry: this.companyHqCountry,
        companyHqState: this.companyHqState,
        companyHqCity: this.companyHqCity,
        companyHqZip: this.companyHqZip,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        phoneNumber: this.phoneNumber,
        title: this.title
      }
      this.signUpAction(providerData);
    },
  },
  mounted() {
    
}
};
</script>
<style scoped lang="scss">

</style>
