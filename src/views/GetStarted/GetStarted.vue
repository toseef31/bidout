<template>
  <section class="fill-height getstarted-module">
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
              <div class="tabs-head pa-6">
                
                <h4 class="text-left mb-4 font-weight-bold">Choose an option</h4>
                <template>
                  <v-tabs optional
                    v-model="currentItem"
                    centered
                    hide-slider grow  height="56"
                  >
                    <v-tab class="mr-4 text-capitalize" v-for="tab in tabitems"
                      :key="tab">
                      {{tab}}
                    </v-tab>
                  </v-tabs>
                </template>
              </div>
              <v-tabs-items v-model="currentItem">
                <v-tab-item>
                  <v-form @submit.prevent="buyerRequest" ref="form">
                    <v-container>
                      <v-row class="mt-8 bg-light">
                        <v-col cols="12" sm="12" text="left" class="pa-6">
                          <label class="d-block text-left input-label mb-2 font-weight-bold">Company Name</label>
                          <v-text-field placeholder="Company name" single-line outlined type="text" v-model="buyer.companyName">
                            <span class="d-block red--text text-left">{{companyMsg}}</span>
                          </v-text-field>
                        </v-col>
                      </v-row>
                      <v-row class="mt-12 bg-light pa-3">
                        <v-col cols="12" sm="12" text="left">
                          <label class="d-block text-left input-label mb-2 font-weight-bold">Company HQ Address 1</label>
                          <v-text-field placeholder="Company HQ Address 1" single-line outlined type="text" v-model="buyer.companyHq" color="#ffffff"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12" text="left">
                          <label class="d-block text-left input-label mb-2 font-weight-bold">Company HQ Address 2</label>
                          <v-text-field placeholder="Company HQ Address 2" single-line outlined type="text" v-model="buyer.companyHq2"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" text="left">
                          <label class="d-block text-left input-label mb-2 font-weight-bold">Company HQ Country</label>
                          <!-- <v-select :items="countries" outlined v-model="companyHqCountry" placeholder="Select"></v-select> -->
                          <country-select v-model="country" :country="country" topCountry="US" className="countrySelect" placeholder="Select Country" />
                            
                        </v-col>
                        
                        <v-col cols="12" sm="6" text="left">
                          <label class="d-block text-left input-label mb-2 font-weight-bold">Company HQ State</label>
                          <!-- <v-select outlined placeholder="Select" v-model="companyHqState"></v-select> -->
                          <region-select v-model="region" :country="country" :region="region" className="countrySelect" />
                        </v-col>
                        <v-col cols="12" sm="6" text="left">
                          <label class="d-block text-left input-label mb-2 font-weight-bold">Company HQ City</label>
                          <v-text-field placeholder="Company HQ City" single-line outlined type="text" v-model="buyer.companyHqCity"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" text="left">
                          <label class="d-block text-left input-label mb-2 font-weight-bold">Company HQ ZIP</label>
                          <v-text-field placeholder="ZIP Code" single-line outlined type="text" v-model="buyer.companyHqZip"></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row class="mt-12 bg-light pa-3">
                        <v-col cols="12" sm="12" text="left">
                          <label class="d-block text-left input-label mb-2 font-weight-bold">First Name</label>
                          <v-text-field placeholder="First Name" single-line outlined type="text" color="#ffffff" v-model="buyer.firstName"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12" text="left">
                          <label class="d-block text-left input-label mb-2 font-weight-bold">Last Name</label>
                          <v-text-field placeholder="Last Name" single-line outlined type="text" v-model="buyer.lastName"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12" text="left">
                          <label class="d-block text-left input-label mb-2 font-weight-bold">Email Address</label>
                          <v-text-field placeholder="example@email.com" single-line outlined type="email" v-model="email" @keyup="emailCheck()"></v-text-field>
                          <span class="d-block red--text text-left">{{emailMsg}}</span>
                        </v-col>
                        <v-col cols="12" sm="12" text="left">
                          <label class="d-block text-left input-label mb-2 font-weight-bold">Title</label>
                          <v-text-field placeholder="Title" single-line outlined type="text" v-model="buyer.title"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12" text="left">
                          <label class="d-block text-left input-label mb-2 font-weight-bold">Direct Phone Number</label>
                          <!-- <v-text-field placeholder="(832) 786-2400" single-line outlined type="text" v-model="buyer.phoneNumber"></v-text-field> -->
                          <VuePhoneNumberInput :border-radius="0" size="lg" v-model="buyer.phoneNumber"
                          :translations="translations"
                          :loader="hasLoaderActive"
                          :error="hasErrorActive"
                          class="mb-2"
                          @update="onUpdate"
                          />
                        </v-col>
                      </v-row>
                      <v-row class="mt-12 bg-light pa-3">
                        <v-col cols="12" sm="12" text="left">
                          <label class="d-block text-left input-label mb-2 font-weight-bold">Password</label>
                          <v-text-field placeholder="Password" single-line outlined type="password" color="#ffffff" v-model="password" :rules="[required, min6]">
                            <template v-slot:append>
                              <v-icon
                                 v-if="successPass"
                                 color="green"
                                 >{{ passRule }}</v-icon
                                >
                              <v-icon
                                 v-if="!successPass"
                                 color="red"
                                 >{{ passRule }}</v-icon
                                >
                            </template>
                          </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12" text="left">
                          <label class="d-block text-left input-label mb-2 font-weight-bold">Confirm Password</label>
                          <v-text-field placeholder="Confirm Password" single-line outlined type="password" v-model="confirmPassword":rules="[required, min6, matchingPasswords ]">
                            <template v-slot:append>
                              <v-icon
                                v-if="successPass1"
                                color="green"
                                >{{ passRule1 }}</v-icon
                              >
                              <v-icon
                                 v-if="!successPass1"
                                 color="red"
                                 >{{ passRule1 }}</v-icon
                              >
                            </template>
                          </v-text-field>
                        </v-col>
                      </v-row>
                      <v-row justify="center" class="mt-10">
                        <v-col cols="12" md="3">
                          <v-btn color="#0D9647" large dense width="100%" height="56" class="font-weight-bold white--text text-capitalize" type="submit">Next <v-icon class="pl-2" color="#fff">mdi-arrow-right-circle</v-icon></v-btn>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-form>
                </v-tab-item>
                <v-tab-item>
                  <v-form @submit.prevent="registerRequest" ref="form">
                    <v-container>
                      <v-row class="mt-8 bg-light">
                        <v-col cols="12" sm="12" text="left" class="pa-6">
                          <label class="d-block text-left input-label mb-2 font-weight-bold">Company Name</label>
                          <v-combobox
                            v-model="companyData"
                            :filter="filter"
                            :hide-no-data="!search"
                            :items="items"
                            :search-input.sync="search"
                            hide-selected
                            label="Search for an option"
                            small-chips item-value="id" item-text="company" @focus="getSupplierList"
                            solo height="56px"
                            hide-details flat @click="companyList(company,id)"
                          > 
                            <template v-slot:no-data>
                              <v-list-item>
                                <span class="subheading">Create</span>
                                <v-chip
                                  :color="`${colors[nonce - 1]} lighten-3`"
                                  label
                                  small
                                >
                                  {{ search }}
                                </v-chip>
                              </v-list-item>
                            </template>
                            <template v-slot:selection="{ attrs, item, parent, selected }">
                              <v-chip
                                v-if="item === Object(item)"
                                v-bind="attrs"
                                :input-value="selected"
                                label
                                small
                              >
                                <span class="pr-2">
                                  {{ item.company }}
                                </span>
                                <v-icon
                                  small
                                  @click="parent.selectItem(item)"
                                >
                                  $delete
                                </v-icon>
                              </v-chip>
                            </template>
                            <template v-slot:item="{ index, item }">
                              <v-text-field
                                v-if="editing === item"
                                v-model="editing.company"
                                autofocus
                                flat
                                background-color="transparent"
                                hide-details
                                solo
                                @keyup.enter="edit(index, item)"
                              ></v-text-field>
                              <v-chip
                                v-else
                                dark
                                label
                                small
                              >
                                {{ item.company }}
                              </v-chip>
                              <v-spacer></v-spacer>
                              <v-list-item-action @click.stop>
                                <v-btn
                                  icon
                                  @click.stop.prevent="edit(index, item)"
                                >
                                  <v-icon>{{ editing !== item ? 'mdi-pencil' : 'mdi-check' }}</v-icon>
                                </v-btn>
                              </v-list-item-action>
                            </template>
                          </v-combobox>

                          <input type="hidden" v-model="companyId">

                          <!-- <v-list v-if="hideList == true" class="company-list">
                            <template v-for="(item, index) in suppliers">
                              <v-list-item
                                :key="item.title"
                              >
                                <v-list-item-content>
                                  <v-list-item-title v-html="item.company" @click="companyList(item.company,item.objectID); hideList = !hideList" class="text-left"></v-list-item-title>
                                </v-list-item-content>
                              </v-list-item>
                            </template>
                          </v-list> -->
                        </v-col>
                      </v-row>
                      <v-row class="mt-12 bg-light pa-3" v-if="companyInfo">
                        <v-col cols="12" sm="12" text="left">
                          <label class="d-block text-left input-label mb-2 font-weight-bold">Company HQ Address 1</label>
                          <v-text-field placeholder="Company HQ Address 1" single-line outlined type="text" v-model="supplier.companyHq" color="#ffffff"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12" text="left">
                          <label class="d-block text-left input-label mb-2 font-weight-bold">Company HQ Address 2</label>
                          <v-text-field placeholder="Company HQ Address 2" single-line outlined type="text" v-model="supplier.companyHq2"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" text="left">
                          <label class="d-block text-left input-label mb-2 font-weight-bold">Company HQ Country</label>
                          <!-- <v-select :items="countries" outlined v-model="companyHqCountry" placeholder="Select"></v-select> -->
                          <country-select v-model="country" :country="country" topCountry="US" className="countrySelect" placeholder="Select Country" />
                        </v-col>
                        <v-col cols="12" sm="6" text="left">
                          <label class="d-block text-left input-label mb-2 font-weight-bold">Company HQ State</label>
                          <!-- <v-select outlined placeholder="Select" v-model="companyHqState"></v-select> -->
                          <region-select v-model="region" :country="country" :region="region" className="countrySelect" />
                        </v-col>
                        <v-col cols="12" sm="6" text="left">
                          <label class="d-block text-left input-label mb-2 font-weight-bold">Company HQ City</label>
                          <v-text-field placeholder="Company HQ City" single-line outlined type="text" v-model="supplier.companyHqCity"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" text="left">
                          <label class="d-block text-left input-label mb-2 font-weight-bold">Company HQ ZIP</label>
                          <v-text-field placeholder="ZIP Code" single-line outlined type="text" v-model="supplier.companyHqZip"></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row class="mt-12 bg-light pa-3">
                        <v-col cols="12" sm="12" text="left">
                          <label class="d-block text-left input-label mb-2 font-weight-bold">First Name</label>
                          <v-text-field placeholder="First Name" single-line outlined type="text" color="#ffffff" v-model="supplier.firstName"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12" text="left">
                          <label class="d-block text-left input-label mb-2 font-weight-bold">Last Name</label>
                          <v-text-field placeholder="Last Name" single-line outlined type="text" v-model="supplier.lastName"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12" text="left">
                          <label class="d-block text-left input-label mb-2 font-weight-bold">Email Address</label>
                          <v-text-field placeholder="example@email.com" single-line outlined type="email" v-model="email" @keyup="emailCheck()"></v-text-field>
                          <span class="d-block red--text text-left">{{emailMsg}}</span>
                        </v-col>
                        <v-col cols="12" sm="12" text="left">
                          <label class="d-block text-left input-label mb-2 font-weight-bold">Title</label>
                          <v-text-field placeholder="Title" single-line outlined type="text" v-model="supplier.title"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12" text="left">
                          <label class="d-block text-left input-label mb-2 font-weight-bold">Direct Phone Number</label>
                          <!-- <v-text-field placeholder="(832) 786-2400" single-line outlined type="text" v-model="supplier.phoneNumber"></v-text-field> -->
                          <VuePhoneNumberInput :border-radius="0" size="lg" v-model="supplier.phoneNumber"
                          :translations="translations"
                          :loader="hasLoaderActive"
                          :error="hasErrorActive"
                          class="mb-2"
                          @update="onUpdate2"
                          />
                        </v-col>
                      </v-row>
                      <v-row class="mt-12 bg-light pa-3">
                        <v-col cols="12" sm="12" text="left">
                          <label class="d-block text-left input-label mb-2 font-weight-bold">Password</label>
                          <v-text-field placeholder="Password" single-line outlined type="password" color="#ffffff" v-model="password" :rules="[required, min6]">
                            <template v-slot:append>
                              <v-icon
                                 v-if="successPass"
                                 color="green"
                                 >{{ passRule }}</v-icon
                                >
                              <v-icon
                                 v-if="!successPass"
                                 color="red"
                                 >{{ passRule }}</v-icon
                                >
                            </template>
                          </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12" text="left">
                          <label class="d-block text-left input-label mb-2 font-weight-bold">Confirm Password</label>
                          <v-text-field placeholder="Confirm Password" single-line outlined type="password" v-model="confirmPassword":rules="[required, min6, matchingPasswords ]">
                            <template v-slot:append>
                              <v-icon
                                v-if="successPass1"
                                color="green"
                                >{{ passRule1 }}</v-icon
                              >
                              <v-icon
                                 v-if="!successPass1"
                                 color="red"
                                 >{{ passRule1 }}</v-icon
                              >
                            </template>
                          </v-text-field>
                        </v-col>
                      </v-row>
                      <v-row justify="center" class="mt-10">
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
  import _ from 'lodash';
  import VuePhoneNumberInput from 'vue-phone-number-input';
  import 'vue-phone-number-input/dist/vue-phone-number-input.css';
  import { mapActions } from "vuex";
export default {
  name : "GetStarted",
  components: {
    NavbarBeforeLogin,
    Footer,
    VuePhoneNumberInput,
  },
  
  data() {
    return {
      isActivity : false,
      currentItem: '',
      tabitems: [
        'Buyer', 'Supplier',
      ],
      supplier: {
        searchCompany: '',
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
      defaultCountry: 'US',
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
      companyData: '',
      activator: null,
      attach: null,
      colors: ['green', 'purple', 'indigo', 'cyan', 'teal', 'orange'],
      editing: null,
      editingIndex: -1,
      items: this.$store.getters.supplier,
      nonce: 1,
      menu: false,
      model: '',
      x: 0,
      search: null,
      y: 0,
    };
  },
  watch:{
    // company: _.debounce(function(){
    //   if(this.company < 1){
    //     this.hideList = false;
    //     this.companyInfo = true;
    //   }else{
    //     this.hideList = true;
    //   }
    // },500),

    companyData: _.debounce(function(val, prev) {
      // if (val.length === prev.length) return
        if(this.companyData == ''){
          this.companyData = true;
        }
      this.companyData = val.map(v => {
        if (typeof v === 'string') {
          v = {
            company: v,
            color: this.colors[this.nonce - 1],
          }
          this.items.push(v)
          this.nonce++
        }

        return v
      })
    }, 500),
  },
  computed:{
    activityPanel(){
        return this.$store.getters.g_activityPanel;
    },
    passRule: function() {
      if (this.password === '') {
        this.successPass = false;
        return '';
      } else if (this.min6(this.password) === true) {
        this.successPass = true;
        return 'mdi-check';
      } else {
        this.successPass = false;
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
        return 'mdi-check';
      } else {
        // password wrong
        this.successPass1 = false;
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
    companyMsg(){
      return this.$store.getters.companyError;
    },
  },
  methods: {
    ...mapActions(["supplierSignUpAction","searchSupplier","checkEmail","buyerSignUpAction"]),
    onUpdate (payload) {
      this.results = payload.formattedNumber
    },
    onUpdate2 (payload) {
      this.results2 = payload.formattedNumber
    },
    registerRequest() {
      this.companyId = this.model.id;
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
          company: this.buyer.company,
          companyHq: this.buyer.companyHq,
          companyHq2: this.buyer.companyHq2,
          companyHqCountry: this.country,
          companyHqState: this.region,
          companyHqCity: this.buyer.companyHqCity,
          companyHqZip: this.buyer.companyHqZip,
          firstName: this.supplier.firstName,
          lastName: this.supplier.lastName,
          email: this.email,
          phoneNumber: this.results2,
          title: this.supplier.title,
          password: this.password
        }
      }
      this.supplierSignUpAction(supplierData);
    },
    buyerRequest() {
      var buyerData = {
        company: this.buyer.companyName,
        companyHq: this.buyer.companyHq,
        companyHq2: this.buyer.companyHq2,
        companyHqCountry: this.country,
        companyHqState: this.region,
        companyHqCity: this.buyer.companyHqCity,
        companyHqZip: this.buyer.companyHqZip,
        firstName: this.buyer.firstName,
        lastName: this.buyer.lastName,
        email: this.email,
        phoneNumber: this.results,
        title: this.buyer.title,
        password: this.password
      }
      this.buyerSignUpAction(buyerData);
    },
    getSupplierList(){
      this.searchSupplier();
    },
    emailCheck(){
      this.checkEmail(this.email);
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
        return 'Password should have more than 6 characters.';
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
      console.log(id);
      this.company = title;
      this.companyId = id;
      // this.hideList = true;
      setTimeout(() => this.hideList = false, 1000);
      this.hideList = false;
      this.companyInfo = false;
    },
    edit (index, item) {
      if (!this.editing) {
        this.editing = item
        this.editingIndex = index
      } else {
        this.editing = null
        this.editingIndex = -1
      }
    },
    filter (item, queryCompany, itemCompany) {
      console.log(queryCompany,'qesdd',itemCompany);
      // if (item.header) return false

      const hasValue = val => val != null ? val : ''
      const text = hasValue(itemCompany)
      const query = hasValue(queryCompany)

      console.log(query,'sa',item,'text',text);
      return text.toString()
        .toLowerCase()
        .indexOf(query.toString().toLowerCase()) > -1
    },
    
  },
  mounted() {
    document.title = "Get Started - BidOut";
    console.log(this.model);
  }
};
</script>
<style scoped lang="scss">

</style>
