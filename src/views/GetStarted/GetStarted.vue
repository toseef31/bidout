<template>
  <section class="fill-height getstarted-module">
    <NavbarBeforeLogin></NavbarBeforeLogin>
    <div class="get-topHeader d-flex">
      <v-container fill-height>
        <v-row align="center" justify="center" no-gutters>
          <v-col class="text-left" cols="12">
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
            <div class="tabs-head px-6 pb-6 pt-7 mt-4">
              <h4 class="text-left mb-4 font-weight-bold">Choose an option</h4>
              <template>
                <v-tabs optional v-model="currentItem" centered hide-slider grow height="56">
                  <v-tab class=" text-capitalize" v-for="(item, index) in items" :class="{ 'mr-8': index === 0 }"
                    :key="item">
                    {{ item }}
                  </v-tab>
                </v-tabs>
              </template>
            </div>
            <v-tabs-items v-model="currentItem">
              <!-- BUYER SECTION -->
              <v-tab-item>
                <v-form @submit.prevent="buyerRequest" ref="buyerForm" v-model="buyerValid">
                  <v-container>

                    <v-row class="mt-8 bg-light pa-3">
                      <v-col cols="12" sm="12" text="left" class="pb-0">
                        <label class="d-block text-left input-label mb-2 font-weight-bold">First Name</label>
                        <v-text-field placeholder="First Name" single-line outlined type="text" color="#ffffff"
                          v-model="buyer.firstName" :rules="buyer.firstNameRule"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" text="left" class="pb-0">
                        <label class="d-block text-left input-label mb-2 font-weight-bold">Last Name</label>
                        <v-text-field placeholder="Last Name" single-line outlined type="text" v-model="buyer.lastName"
                          :rules="buyer.lastNameRule"></v-text-field>
                      </v-col>

                      <!-- <v-col cols="12" sm="12" text="left" class=" pb-0">
                        <label class="d-block text-left input-label mb-2 font-weight-bold">Company Name</label>
                        <v-text-field placeholder="Company name" single-line outlined type="text"
                          v-model="buyer.companyName" :rules="buyer.companyNameRule" required>
                          <span class="d-block red--text text-left" v-if="companyMsg">{{ companyMsg }}</span>
                        </v-text-field>
                      </v-col> -->

                      <v-col cols="12" sm="12" text="left" class="pb-3">
                        <label class="d-block text-left input-label mb-2 font-weight-bold">Company Name</label>
                        <v-text-field prepend-inner-icon="search" placeholder="Company name" single-line outlined
                          type="text" v-model="company" @keyup="getSupplierList" :rules="companyRule" clearable>
                        </v-text-field>
                        <input type="hidden" v-model="companyId">
                        <template v-if="getHideList === true">
                          <v-list class="company-list" v-if="suppliers != ''">
                            <template v-for="(item) in suppliers">
                              <v-list-item :key="item.title">
                                <v-list-item-content>
                                  <v-list-item-title v-html="item.company"
                                    @click="companyList(item.company, item.objectID); hideList = !hideList"
                                    class="text-left"></v-list-item-title>
                                </v-list-item-content>
                              </v-list-item>
                            </template>
                          </v-list>
                        </template>
                      </v-col>

                      <v-col cols="12" sm="12" text="left" class="pb-0">
                        <label class="d-block text-left input-label mb-2 font-weight-bold">Email Address</label>
                        <v-text-field placeholder="example@email.com" single-line outlined type="email" v-model="email"
                          @keyup="emailCheck()" @keydown="emailCheck()"></v-text-field>
                        <span class="d-block  text-left mt-n4 email-error-text" v-if="emailError">{{ emailError }}</span>
                      </v-col>

                      <v-col cols="12" sm="12" text="left" class="pb-8">
                        <label class="d-block text-left input-label mb-2 font-weight-bold">Direct Phone Number</label>

                        <VuePhoneNumberInput :border-radius="0" size="md" v-model="buyer.phoneNumber"
                          :translations="translations" :error="!getPhoneInfo.valid && getCounter > 1"
                          error-color="#B8B8B8" valid-color="#B8B8B8" class="mb-2" :required="true" @update="onUpdate" />
                        <div class="phone-class" v-if="!getPhoneInfo.valid && getCounter > 1">
                          {{ getPhoneInfo.message }}</div>
                      </v-col>
                    </v-row>

                    <v-row justify="center" class="mt-10">
                      <v-col cols="12" md="3">
                        <v-btn color="#0D9647" large dense width="100%" height="56"
                          class="font-weight-bold white--text text-capitalize" type="submit" :loading="loading"
                          :disabled="!buyerValid">Next <v-icon class="pl-2"
                            color="#fff">mdi-arrow-right-circle</v-icon></v-btn>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-form>
              </v-tab-item>

              <!-- SUPPLIER SECTION -->
              <v-tab-item>
                <v-form @submit.prevent="registerRequest" ref="form" v-model="supplierValid">
                  <v-container>
                    <v-row class="mt-8 bg-light">
                      <v-col cols="12" sm="12" text="left" class="pa-6 pb-3">
                        <label class="d-block text-left input-label mb-2 font-weight-bold">Company Name</label>
                        <v-text-field prepend-inner-icon="search" placeholder="Company name" single-line outlined
                          type="text" v-model="company" @keyup="getSupplierList" :rules="companyRule" clearable>
                        </v-text-field>
                        <input type="hidden" v-model="companyId">
                        <template v-if="hideList == true">
                          <v-list class="company-list" v-if="suppliers != ''">
                            <template v-for="(item) in suppliers">
                              <v-list-item :key="item.title">
                                <v-list-item-content>
                                  <v-list-item-title v-html="item.company"
                                    @click="companyList(item.company, item.objectID); hideList = !hideList"
                                    class="text-left"></v-list-item-title>
                                </v-list-item-content>
                              </v-list-item>
                            </template>
                          </v-list>
                        </template>
                      </v-col>
                    </v-row>
                    <v-row class="mt-12 bg-light pa-3" v-if="companyInfo">
                      <v-col cols="12" sm="12" text="left" class="pb-0">
                        <label class="d-block text-left input-label mb-2 font-weight-bold">Company HQ Address 1</label>
                        <v-text-field placeholder="Company HQ Address 1" single-line outlined type="text"
                          v-model="supplier.companyHq" color="#ffffff" :rules="supplier.companyHqRule"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" text="left" class="pb-0">
                        <label class="d-block text-left input-label mb-2 font-weight-bold">Company HQ Address 2</label>
                        <v-text-field placeholder="Company HQ Address 2" single-line outlined type="text"
                          v-model="supplier.companyHq2"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" text="left">
                        <label class="d-block text-left input-label mb-2 font-weight-bold">Company HQ Country</label>

                        <country-select v-model="country" :country="country" topCountry="US" className="countrySelect"
                          :disablePlaceholder="true" placeholder="Select Country" />
                      </v-col>
                      <v-col cols="12" sm="6" text="left">
                        <label class="d-block text-left input-label mb-2 font-weight-bold">Company HQ State</label>

                        <region-select v-model="region" :country="country" :region="region" :disablePlaceholder="true"
                          className="countrySelect" />
                      </v-col>
                      <v-col cols="12" sm="6" text="left" class="pb-0">
                        <label class="d-block text-left input-label mb-2 font-weight-bold">Company HQ City</label>
                        <v-text-field placeholder="Company HQ City" single-line outlined type="text"
                          v-model="supplier.companyHqCity" :rules="supplier.companyHqCityRule"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" text="left" class="pb-0">
                        <label class="d-block text-left input-label mb-2 font-weight-bold">Company HQ ZIP</label>
                        <v-text-field placeholder="ZIP Code" single-line outlined type="text"
                          v-model="supplier.companyHqZip" :rules="supplier.companyHqZipRule"></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row class="mt-12 bg-light pa-3">
                      <v-col cols="12" sm="12" text="left" class="pb-0">
                        <label class="d-block text-left input-label mb-2 font-weight-bold">First Name</label>
                        <v-text-field placeholder="First Name" single-line outlined type="text" color="#ffffff"
                          v-model="supplier.firstName" :rules="supplier.firstNameRule"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" text="left" class="pb-0">
                        <label class="d-block text-left input-label mb-2 font-weight-bold">Last Name</label>
                        <v-text-field placeholder="Last Name" single-line outlined type="text" v-model="supplier.lastName"
                          :rules="supplier.lastNameRule"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" text="left" class="pb-0">
                        <label class="d-block text-left input-label mb-2 font-weight-bold">Email Address</label>
                        <v-text-field placeholder="example@email.com" single-line outlined type="email" v-model="email"
                          @keyup="emailCheck()"></v-text-field>
                        <span class="d-block red--text text-left mt-n4" v-if="emailError" v-html="emailError"></span>
                      </v-col>
                      <v-col cols="12" sm="12" text="left" class="pb-0">
                        <label class="d-block text-left input-label mb-2 font-weight-bold">Title</label>
                        <v-text-field placeholder="Title" single-line outlined type="text" v-model="supplier.title"
                          :rules="supplier.titleRule"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" text="left">
                        <label class="d-block text-left input-label mb-2 font-weight-bold">Direct Phone Number</label>

                        <VuePhoneNumberInput :border-radius="8" size="lg" v-model="supplier.phoneNumber"
                          :translations="translations" :loader="hasLoaderActive"
                          :error="!getPhoneInfo.valid && getCounter > 1" error-color="#9E9E9E" valid-color="#9E9E9E"
                          class="mb-2" :required="true" @update="onUpdate2" />
                        <div class="phone-class" v-if="!getPhoneInfo.valid && getCounter > 1">
                          {{ getPhoneInfo.message }}</div>
                      </v-col>
                    </v-row>
                    <v-row class="mt-12 bg-light pa-3">
                      <v-col cols="12" sm="12" text="left" class="pb-0">
                        <label class="d-block text-left input-label mb-2 font-weight-bold">Password</label>
                        <v-text-field placeholder="Password" single-line outlined type="password" color="#ffffff"
                          v-model="password" :rules="[required, min6]">
                          <template v-slot:append>
                            <v-icon v-if="successPass" color="green">{{ passRule }}</v-icon>
                            <v-icon v-if="!successPass" color="red">{{ passRule }}</v-icon>
                          </template>
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" text="left" class="pb-0">
                        <label class="d-block text-left input-label mb-2 font-weight-bold">Confirm Password</label>
                        <v-text-field placeholder="Confirm Password" single-line outlined type="password"
                          v-model="confirmPassword" :rules="[required, min6, matchingPasswords]">
                          <template v-slot:append>
                            <v-icon v-if="successPass1" color="green">{{ passRule1 }}</v-icon>
                            <v-icon v-if="!successPass1" color="red">{{ passRule1 }}</v-icon>
                          </template>
                        </v-text-field>
                      </v-col>
                    </v-row>
                    <v-row justify="center" class="mt-10">
                      <v-col cols="12" md="3">
                        <v-btn color="#0D9647" large dense width="100%" height="56"
                          class="font-weight-bold white--text text-capitalize" type="submit" :loading="loading"
                          :disabled="!supplierValid">Next <v-icon class="pl-2"
                            color="#fff">mdi-arrow-right-circle</v-icon></v-btn>
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
<script type="application/javascript" src="https://api.ipify.org?format=jsonp&callback=getIP"></script>
<script>
  import NavbarBeforeLogin from '../../components/Layout/NavbarBeforeLogin.vue'
  import Footer from '../../components/Layout/Footer.vue'
  import _ from 'lodash';
  import VuePhoneNumberInput from 'vue-phone-number-input';
  import 'vue-phone-number-input/dist/vue-phone-number-input.css';
  import { mapActions, mapGetters } from "vuex";

export default {
  name : "GetStarted",
  components: {
    NavbarBeforeLogin,
    Footer,
    VuePhoneNumberInput,
  },
  data() {
    return {
      loader: null,
      loading: false,
      btnDisable: false,
      buyerValid: true,
      supplierValid: true,
      currentItem: '',
      items: [
        'Buyer', 'Supplier',
      ],
      supplier: {
        searchCompany: '',
        companyHq: '',
        companyHqRule:[
          v => !!v || 'Company HQ is required',
        ],
        companyHq2: '',
        companyHqState: '',
        companyHqCity: '',
        companyHqCityRule: [
          v => !!v || 'Company HQ City is required',
        ],
        companyHqZip: '',
        companyHqZipRule: [
          v => !!v || 'Company HQ Zip is required',
        ],
        firstName: '',
        firstNameRule: [
          v => !!v || 'First Name is required',
        ],
        lastName: '',
        lastNameRule: [
          v => !!v || 'Last Name is required',
        ],
        phoneNumber: '',
        title: '',
        titleRule: [
          v => !!v || 'Title is required',
        ],
        region: "",
        country: ""
      },
      buyer: {
        companyName: '',
        companyNameRule: [
          v => !!v || 'Company is required',
        ],
        firstName: '',
        firstNameRule: [
          v => !!v || 'First Name is required',
        ],
        lastName: '',
        lastNameRule: [
          v => !!v || 'Last Name is required',
        ],
        phoneNumber: '',
      },
      email: '',
      // buyerEmailRule: [
      //   v => !!v || 'Email is required',
      //   v => /^\w+([.+_-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid',
      // ],
      // supplierEmailRule: [
      //   v => !!v || 'Email is required',
      //   v => /^\w+([.+_-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid',
      // ],
      company: '',
      companyRule: [
      v => !!v || 'Company Name is required',
      ],
      companyId: '',
      successPass: false,
      successPass1: false,
      password: '',
      confirmPassword: '',
      region: "TX",
      country: "US",
      hideList: false,
      list: false,
      companyInfo: true,
      emailExist: false,
      translations: {
        countrySelectorLabel: 'Country Code',
        countrySelectorError: 'Choose country',
        phoneNumberLabel: 'Phone Number',
        example: 'Example'
      },
      hasLoaderActive: false,
      hasErrorActive: false,
      results: {},
      results2: {},
      counter: 0,
      phoneInfo: {
        valid: true,
        message: '',
      },
    };
  },
  watch:{
    company: _.debounce(function(){
      if(this.company < 1){
        this.hideList = false;
        this.companyInfo = true;
      }else{
        this.hideList = true;
      }
    },500),
    loader () {
      const l = this.loader
      this[l] = !this[l]

      setTimeout(() => (this[l] = false), 5000)

      this.loader = null
    },
    // companyError(message){
    //   if(message){
    //     this.$toasted.show(message, {
    //       position: 'top-center',
    //       duration: 5000,
    //       className: 'error-toast',
    //       type: 'error',
    //     });
    //     this.password = '';
    //     this.confirmPassword = '';
    //   }
    // }
  },
  computed:{
   // ...mapGetters(['companyError']),
    activityPanel(){
        return this.$store.getters.g_activityPanel;
    },
    getPhoneInfo() {
      return this.phoneInfo;
    },
    getCounter() {
      return this.counter;
    },
    getHideList() {
      return this.hideList
    },
    passRule: function() {
      if (this.password === '') {
        this.successPass = false;
        return '';
      } else if (this.min6(this.password) === true) {
        this.successPass = true;
        this.btnDisable = false;
        return 'mdi-check';
      } else {
        this.successPass = false;
        this.btnDisable = true;
        return 'mdi-close';
      }
    },
    passRule1: function() {
      if (this.confirmPassword === '') {
        // field is empty
        this.successPass1 = false;
        return '';
      } else if (this.min6(this.confirmPassword) === true && this.matchingPasswords() === true) {
        this.successPass1 = true;
        this.btnDisable = false;
        return 'mdi-check';
      } else {
        // password wrong
        this.successPass1 = false;
        this.btnDisable = true;
        return 'mdi-close';
      }
    },
    suppliers(){
      this.hideList = true;
      return this.$store.getters.supplier;
    },
    emailMsg(){
      this.emailExist= true;
      return this.$store.getters.emailExists;
    },
    showErrorAlert(){
     return this.$store.getters.showErrorAlert;
    },
    // companyMsg(){
    //   return this.$store.getters.companyError;
    // },
    emailError() {
      if (!this.email) {
        this.buyerValid = false;
        this.supplierValid = false;
        return "Email is required";
      } else if (!this.email.match(/^\w+([.+_-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) {
        this.buyerValid = false;
        this.supplierValid = false;
        return "Email is not valid";
      } else if (this.emailMsg) {
        this.buyerValid = false;
        this.supplierValid = false;
        return `Email already exists! Please <a href="/login">login</a> to access your account.`;
      } else {
        this.buyerValid = true;
        this.supplierValid = true;
        return "";
      }
    }
  },
  methods: {
    ...mapActions(["supplierSignUpAction","searchSupplier","checkEmail","buyerSignUpAction","getIpAddress"]),
    onUpdate (payload) {
      this.counter++;
      this.phoneInfo.valid = payload.isValid;

      if (payload.phoneNumber && !payload.isValid) {
        this.phoneInfo.message = 'Invalid Phone number format';
      }

      if (!payload.phoneNumber && !payload.isValid) {
        this.phoneInfo.message = 'Phone number is required';
      }
      this.results = payload.formattedNumber
    },
    onUpdate2 (payload) {

      this.results2 = payload.formattedNumber
    },
    registerRequest() {
      if(this.$refs.form.validate() && this.emailError === ''){
        if(this.companyId){
          var supplierData = {
            id: this.companyId,
            companyName: this.company,
            firstName: this.supplier.firstName,
            lastName: this.supplier.lastName,
            email: this.email,
            phoneNumber: this.results2,
            title: this.supplier.title,
            password: this.password
          }
        }else{
          var supplierData = {
            company: this.company,
            companyHq: this.supplier.companyHq,
            companyHq2: this.supplier.companyHq2,
            companyHqCountry: this.country,
            companyHqState: this.region,
            companyHqCity: this.supplier.companyHqCity,
            companyHqZip: this.supplier.companyHqZip,
            firstName: this.supplier.firstName,
            lastName: this.supplier.lastName,
            email: this.email,
            phoneNumber: this.results2,
            title: this.supplier.title,
            password: this.password
          }
        }
        this.supplierSignUpAction(supplierData);
        this.loader = 'loading';
        this.supplierValid = false;
      }
    },
    buyerRequest() {
      console.log(this.results)
      if (this.results === '' || this.results === undefined) {
        this.counter += 2;
        this.phoneInfo = {
          valid: false,
          message: 'Phone number is required',
        };
      }

      if(this.$refs.buyerForm.validate() && this.emailError === '' && this.getPhoneInfo.valid){
        var buyerData = {
        company: this.buyer.companyName,
        firstName: this.buyer.firstName,
        lastName: this.buyer.lastName,
        email: this.email,
        phoneNumber: this.results,
      }

      this.buyerSignUpAction(buyerData);
      this.loader = 'loading';
      this.buyerValid = false;
      }
    },
    getSupplierList(){
      if(this.company.length > 2){
        this.searchSupplier(this.company);
      }
    },
    emailCheck(){
      const testemail = /^\w+([.+_-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.email);
      if(testemail === true){
        this.checkEmail(this.email);
      }else if(this.email.length < 2){
        this.$store.commit('setEmailExistSuccess', '');
      }
    },
    required: function(value) {
      if (value) {
        return true;
      } else {
        return 'This field is required.';
      }
    },
    min6: function(value) {
      if (value.length >= 6) {
        return true;
      } else {
        return 'Password must be at least 6 characters.';
      }
    },
    matchingPasswords: function() {
      if (this.password === this.confirmPassword) {
        return true;
      } else {
        return 'Passwords does not match.';
      }
    },
    companyList(title,id){
      this.company = title;
      this.companyId = id;
      setTimeout(() => this.hideList = false, 600);
      this.hideList = false;
      this.companyInfo = false;
    },
  },
  mounted() {
    document.title = "Get Started - BidOut"
  }
};
</script>
<style scoped lang="scss"></style>
