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
            <div class="tabs-head mt-4 px-9 py-8">
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
                <ValidationObserver ref="buyer" v-slot="{ invalid, validated, handleSubmit }">
                  <v-form
                    :class="{ 'phone-error-class': !getPhoneInfo.valid && getCounter > 1, 'phone-valid-class': getPhoneInfo.valid }">
                    <v-container>

                      <v-row class="mt-8 bg-light pa-6">
                        <v-col cols="12" sm="12" text="left" class="pb-0">
                          <label class="d-block text-left input-label mb-2 font-weight-bold">First Name</label>
                          <ValidationProvider name="First name" rules="required" v-slot="{ errors, valid }">
                            <v-text-field placeholder="First Name" single-line outlined :error-messages="errors"
                              :success="valid" type="text" color="#ffffff" v-model="buyer.firstName"
                              required></v-text-field>
                          </ValidationProvider>
                        </v-col>
                        <v-col cols="12" sm="12" text="left" class="pb-0">
                          <label class="d-block text-left input-label mb-2 font-weight-bold">Last Name</label>
                          <ValidationProvider name="Last name" rules="required" v-slot="{ errors, valid }">
                            <v-text-field placeholder="Last Name" single-line outlined :error-messages="errors"
                              :success="valid" type="text" v-model="buyer.lastName" required></v-text-field>
                          </ValidationProvider>
                        </v-col>

                        <v-col cols="12" sm="12" text="left" class="pb-0">
                          <label class="d-block text-left input-label mb-2 font-weight-bold">Company Name</label>
                          <ValidationProvider name="Company name" rules="required" v-slot="{ errors, valid }">
                            <v-text-field placeholder="Company name" single-line outlined type="text"
                              v-model="buyer.companyName" :error-messages="errors" :success="valid" required>
                            </v-text-field>
                          </ValidationProvider>
                        </v-col>

                        <v-col cols="12" sm="12" text="left" class="pb-0">
                          <label class="d-block text-left input-label mb-2 font-weight-bold">Email Address</label>
                          <ValidationProvider name="Email address" rules="required|email" v-slot="{ errors, valid }">
                            <v-text-field placeholder="example@email.com" single-line outlined type="email"
                              v-model="email" :error-messages="errors" :success="valid" required></v-text-field>
                          </ValidationProvider>

                        </v-col>
                        <v-col cols="12" sm="12" text="left" :class="{
                          'spacing-class': getPhoneInfo.valid && getCounter > 1 || !getPhoneInfo.valid && getCounter === 1,
                        }">
                          <label class="d-block text-left input-label mb-2 font-weight-bold">Direct Phone Number</label>

                          <vue-tel-input @focus="onUpdate" defaultCountry="US" :autoDefaultCountry="false"
                            :autoFormat="false" :dropdownOptions="{
                              showDialCodeInSelection: true,
                              showFlags: true,
                              width: ' max-content'
                            }" :inputOptions="{
  required: true,
  showDialCode: false,
  maxlength: 15,
  placeholder: 'Phone number',

}" model="national" :validCharactersOnly="true" :styleClasses="{ 'phone-main-class': true }"
                            v-model="buyer.phoneNumber" @validate="onUpdate"></vue-tel-input>

                          <div class="phone-class" v-show="!getPhoneInfo.valid && getCounter > 1">
                            {{ getPhoneInfo.message }}</div>
                        </v-col>
                      </v-row>

                      <v-row justify="center" class="mt-10">
                        <v-col cols="12" md="3">
                          <v-btn color="#0D9647" large dense width="100%" height="56"
                            class="font-weight-bold white--text text-capitalize" @click="handleSubmit(buyerRequest)"
                            :loading="loading" :disabled="!getPhoneInfo.valid || (invalid || !validated)">Next <v-icon
                              class="pl-2" color="#fff">mdi-arrow-right-circle</v-icon></v-btn>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-form>
                </ValidationObserver>
              </v-tab-item>

              <!-- SUPPLIER SECTION -->
              <v-tab-item>
                <ValidationObserver ref="buyer" v-slot="{ invalid, validated, handleSubmit }">

                  <v-form
                    :class="{ 'phone-error-class': !getPhoneInfo.valid && getCounter > 1, 'phone-valid-class': getPhoneInfo.valid }">
                    <v-container>
                      <v-row class="mt-8 bg-light px-6 py-4 ">
                        <v-row v-if="isToken">
                          <v-col text="left" class=" " :cols="editCompanyName ? '12' : ''"
                            :sm="editCompanyName ? '6' : '12'">
                            <label class="d-block text-left input-label mb-2 font-weight-bold">Bid Invite
                              Code</label>
                            <ValidationProvider name="Bid Invite
                                                                          Code" rules="required"
                              v-slot="{ errors, valid }">
                              <v-text-field placeholder="Enter your bid invite code" single-line outlined type="text"
                                :error-messages="errors" :success="valid" required v-model="supplier.bidInvitedCode">
                                <template v-slot:append>
                                  <div class="d-flex align-center" v-if="false"> <span class="invited-company">Patterson
                                      UI</span>
                                    <v-icon size="20" color="#0D9648" class="ml-2">mdi-check-decagram-outline</v-icon>
                                  </div>

                                  <v-progress-circular indeterminate :size="20" :width="2"
                                    color="
                                                                                                                      #0D1139" :value="80" v-else></v-progress-circular>

                                </template>
                              </v-text-field>
                            </ValidationProvider>
                          </v-col>

                          <v-col v-if="editCompanyName">
                            <label class="d-block text-left input-label mb-2 font-weight-bold">Company Name</label>
                            <ValidationProvider name="Company name" rules="required" v-slot="{ errors, valid }">
                              <v-text-field placeholder="Company name" single-line outlined :error-messages="errors"
                                :success="valid" type="text" v-model="supplier.editCompany" required>
                              </v-text-field>
                            </ValidationProvider>
                          </v-col>
                        </v-row>

                        <v-row v-if="!isToken">
                          <v-col text="left" cols="12" sm="12">
                            <label class="d-block text-left input-label mb-2 font-weight-bold">Company Name</label>
                            <ValidationProvider name="Company name" rules="required" v-slot="{ errors, valid }">
                              <v-text-field prepend-inner-icon="search" placeholder="Company name" single-line outlined
                                type="text" v-model="supplier.companyName" @keyup="getSupplierList"
                                :error-messages="errors" :success="valid" required clearable>
                              </v-text-field>
                            </ValidationProvider>
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
                      </v-row>

                      <v-row class="px-2   bg-light  "><v-col
                          class="checkbox-class pb-3 d-flex justify-space-between align-center ">
                          <v-checkbox v-model="isToken" class="name-class" color="#0D9648" hide-details>
                            <template v-slot:label>
                              <div>
                                I have an invite token
                              </div>
                            </template>
                          </v-checkbox>

                          <div class="edit-company" v-if="isToken && !editCompanyName" @click="editCompanyName = true">
                            <span class="text-decoration-underline">Edit company
                              name</span>
                            <v-icon color="#B8B8B8" size="20" class="ml-2">mdi-pencil-outline</v-icon>
                          </div>

                          <div v-if="editCompanyName && isToken" class="edit-company" @click="editCompanyName = false">
                            <span class="text-decoration-underline">Save</span>
                            <v-icon color="#B8B8B8" size="20" class="ml-2">mdi-content-save</v-icon>
                          </div>
                        </v-col>
                      </v-row>

                      <v-row class="mt-12">
                        <div class="existing-company pa-6 text-left">
                          <h1>This is an existing company, filling out the form will send a
                            request to add you to the existing company.</h1>

                        </div>

                      </v-row>
                      <v-row class="mt-12 bg-light px-6 py-4" v-if="companyInfo">
                        <v-col cols="12" sm="12" text="left" class="pb-0">
                          <label class="d-block text-left input-label mb-2 font-weight-bold">Company HQ Address 1</label>
                          <ValidationProvider name="Company HQ" rules="required" v-slot="{ errors, valid }">
                            <v-text-field placeholder="Company HQ Address 1" single-line outlined type="text"
                              v-model="supplier.companyHq" color="#ffffff" :error-messages="errors" :success="valid"
                              required></v-text-field>
                          </ValidationProvider>
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
                          <ValidationProvider name="Company HQ City" rules="required" v-slot="{ errors, valid }">
                            <v-text-field placeholder="Company HQ City" single-line outlined type="text"
                              v-model="supplier.companyHqCity" :error-messages="errors" :success="valid"
                              required></v-text-field>
                          </ValidationProvider>
                        </v-col>
                        <v-col cols="12" sm="6" text="left" class="pb-0">
                          <label class="d-block text-left input-label mb-2 font-weight-bold">Company HQ ZIP</label>
                          <ValidationProvider name="Company HQ ZIP" rules="required" v-slot="{ errors, valid }">
                            <v-text-field placeholder="ZIP Code" single-line outlined type="text"
                              v-model="supplier.companyHqZip" :error-messages="errors" :success="valid"
                              required></v-text-field>
                          </ValidationProvider>
                        </v-col>
                      </v-row>
                      <v-row class="mt-12 bg-light px-6 py-4">
                        <v-col cols="12" sm="12" text="left" class="pb-0">
                          <label class="d-block text-left input-label mb-2 font-weight-bold">First Name</label>
                          <ValidationProvider name="First Name" rules="required" v-slot="{ errors, valid }">
                            <v-text-field placeholder="First Name" single-line outlined type="text" color="#ffffff"
                              v-model="supplier.firstName" :error-messages="errors" :success="valid"
                              required></v-text-field>
                          </ValidationProvider>
                        </v-col>
                        <v-col cols="12" sm="12" text="left" class="pb-0">
                          <label class="d-block text-left input-label mb-2 font-weight-bold">Last Name</label>
                          <ValidationProvider name="Last Name" rules="required" v-slot="{ errors, valid }">
                            <v-text-field placeholder="Last Name" single-line outlined type="text"
                              v-model="supplier.lastName" :error-messages="errors" :success="valid"
                              required></v-text-field>
                          </ValidationProvider>
                        </v-col>
                        <v-col cols="12" sm="12" text="left" class="pb-0">
                          <label class="d-block text-left input-label mb-2 font-weight-bold">Email Address</label>
                          <v-text-field placeholder="example@email.com" single-line outlined type="email" v-model="email"
                            @keyup="emailCheck()"></v-text-field>
                          <span class="d-block email-error-text text-left mt-n4" v-if="emailError">{{ emailError }}</span>
                        </v-col>
                        <v-col cols="12" sm="12" text="left" class="pb-0">
                          <label class="d-block text-left input-label mb-2 font-weight-bold">Title</label>
                          <ValidationProvider name="Title" rules="required" v-slot="{ errors, valid }">
                            <v-text-field placeholder="Title" single-line outlined type="text" v-model="supplier.title"
                              :error-messages="errors" :success="valid" required></v-text-field>
                          </ValidationProvider>
                        </v-col>
                        <v-col cols="12" sm="12" text="left" class="" :class="{
                          'spacing-class': getPhoneInfo.valid && getCounter > 1 || !getPhoneInfo.valid && getCounter === 1,

                        }">
                          <label class="d-block text-left input-label mb-2 font-weight-bold">Direct Phone Number</label>

                          <vue-tel-input @focus="onUpdate2" defaultCountry="US" :autoDefaultCountry="false"
                            :autoFormat="false" :dropdownOptions="{
                              showDialCodeInSelection: true,
                              showFlags: true,
                              width: ' max-content'
                            }" :inputOptions="{
  required: true,
  showDialCode: false,
  maxlength: 15,
  placeholder: 'Phone number',

}" model="national" :validCharactersOnly="true" :styleClasses="{ 'phone-main-class': true }"
                            v-model="supplier.phoneNumber" @validate="onUpdate2"></vue-tel-input>

                          <div class="phone-class" v-show="!getPhoneInfo.valid && getCounter > 1">
                            {{ getPhoneInfo.message }}</div>
                        </v-col>
                      </v-row>
                      <v-row class="mt-12 bg-light px-6 py-4">
                        <v-col cols="12" sm="12" text="left" class="pb-0">
                          <label class="d-block text-left input-label mb-2 font-weight-bold">Password</label>
                          <ValidationProvider name="Password" rules="required|min:6" vid="password"
                            v-slot="{ errors, valid }">
                            <v-text-field placeholder="Password" single-line outlined type="password" color="#ffffff"
                              v-model="password" :error-messages="errors" :success="valid" required>
                              <template v-slot:append>
                                <v-icon v-if="successPass" color="green">{{ passRule }}</v-icon>
                                <v-icon v-if="!successPass" color="red">{{ passRule }}</v-icon>
                              </template>
                            </v-text-field>
                          </ValidationProvider>
                        </v-col>
                        <v-col cols="12" sm="12" text="left" class="pb-0">
                          <label class="d-block text-left input-label mb-2 font-weight-bold">Confirm Password</label>
                          <ValidationProvider name="Password confirmation" rules="confirmed:password|required"
                            v-slot="{ errors, valid }">
                            <v-text-field placeholder="Confirm Password" single-line outlined type="password"
                              v-model="confirmPassword" :error-messages="errors" :success="valid" required>
                              <template v-slot:append>
                                <v-icon v-if="successPass1" color="green">{{ passRule1 }}</v-icon>
                                <v-icon v-if="!successPass1" color="red">{{ passRule1 }}</v-icon>
                              </template>
                            </v-text-field>
                          </ValidationProvider>
                        </v-col>
                      </v-row>
                      <v-row justify="center" class="mt-10">
                        <v-col cols="12" md="3">
                          <v-btn color="#0D9647" large dense width="100%" height="56"
                            class="font-weight-bold white--text text-capitalize" @click="handleSubmit(supplierRequest)"
                            :loading="loading" :disabled="!getPhoneInfo.valid || (invalid || !validated)">Next <v-icon
                              class="pl-2" color="#fff">mdi-arrow-right-circle</v-icon></v-btn>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-form>
                </ValidationObserver>
              </v-tab-item>
            </v-tabs-items>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="12" md="9">
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
  import ConfirmationBuyer from '@/components/SignUp/confirmation-buyer.vue'
  import ExistingConfirmation from '@/components/SignUp/confirmation-existing.vue'
  import ConfirmationSupplier from '@/components/SignUp/confirmation-supplier.vue'
  import ModuleSelection from '@/components/SignUp/module-selection.vue'
  import Contract from '@/components/SignUp/contract.vue'
  import _ from 'lodash';
  import { VueTelInput } from 'vue-tel-input';
  import { mapActions, mapGetters } from "vuex";
  import {
  ValidationObserver,
  ValidationProvider
} from "vee-validate";

export default {
  name : "GetStarted",
  components: {
    NavbarBeforeLogin,
    Footer,
    VueTelInput,
    ConfirmationBuyer,
    ExistingConfirmation,
    ConfirmationSupplier,
    ModuleSelection,
    Contract,
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      loader: null,
      loading: false,
      btnDisable: false,
      currentItem: '',
      editCompanyName: false,
      items: [
        'Buyer', 'Supplier',
      ],
      supplier: {
        searchCompany: '',
        companyName: '',
        bidInvitedCode: '',
        editCompany: '',
        companyHq: '',
        companyHq2: '',
        companyHqState: '',
        companyHqCity: '',
        companyHqZip: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        title: '',
        region: "",
        country: ""
      },
      buyer: {
        companyName: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
      },
      email: '',
      company: '',
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
      results: {},
      results2: {},
      counter: 0,
      phoneInfo: {
        valid: true,
        message: '',
      },
      isToken:false
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
    currentItem () {
      this.phoneInfo = {
        valid: true,
        message: '',
      }
      this.counter = 0
    }
  },
  computed:{
    getPhoneInfo() {
      return this.phoneInfo;
    },
    getCounter() {
      return this.counter;
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
        this.matchingPasswords()
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
    emailError() {
      if (!this.email) {
        return "Email is required";
      } else if (!this.email.match(/^\w+([.+_-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) {
        return "Email is not valid";
      } else if (this.emailMsg) {
        return `Email already exists! Please <a href="/login">login</a> to access your account.`;
      } else {
        return "";
      }
    }
  },
  methods: {
    ...mapActions(["supplierSignUpAction","searchSupplier","checkEmail","buyerSignUpAction","getIpAddress"]),
    onUpdate (payload) {
      this.counter++;
      this.phoneInfo.valid = payload === undefined ? false : payload.valid;

      if (!payload) {
        this.phoneInfo.message = 'Phone number is required';
      } else {
        this.phoneInfo.valid =  payload.valid === undefined ? false : payload.valid;

        if (payload.number && !payload.valid) {
        this.phoneInfo.message = 'Invalid Phone number format';
      }

      if (!payload.number && !payload.valid) {
        this.phoneInfo.message = 'Phone number is required';
      }
      if (payload.number && payload.valid) {
        this.buyer.phoneNumber = payload.nationalNumber;
        this.results = payload.number;
      }
      }

    },
    onUpdate2 (payload) {
      this.counter++;
      this.phoneInfo.valid = payload === undefined ? false : payload.valid;

      if (!payload) {
        this.phoneInfo.message = 'Phone number is required';
      } else {
        this.phoneInfo.valid = payload.valid === undefined ? false : payload.valid;
        if (payload.number && !payload.valid) {
        this.phoneInfo.message = 'Invalid Phone number format';
      }

      if (!payload.number && !payload.valid) {
        this.phoneInfo.message = 'Phone number is required';
      }
      if (payload.number && payload.valid) {
        this.supplier.phoneNumber = payload.nationalNumber;
        this.results2 = payload.number;
      }
      }

    },

    supplierRequest() {
      if (this.results === '' || this.results === undefined) {
        this.counter += 2;
        this.phoneInfo = {
          valid: false,
          message: 'Phone number is required',
        };
      }

      if(this.getPhoneInfo.valid && this.emailError === ''){
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
      }
    },
    buyerRequest() {
      if (this.results === '' || this.results === undefined) {
        this.counter += 2;
        this.phoneInfo = {
          valid: false,
          message: 'Phone number is required',
        };
      }

      if(this.getPhoneInfo.valid){
        var buyerData = {
        company: this.buyer.companyName,
        firstName: this.buyer.firstName,
        lastName: this.buyer.lastName,
        email: this.email,
        phoneNumber: this.results,
      }

      this.buyerSignUpAction(buyerData);
      this.loader = 'loading';
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

<style src="vue-tel-input/dist/vue-tel-input.css"></style>
