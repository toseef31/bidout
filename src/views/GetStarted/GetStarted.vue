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
        <v-row justify="center"
          v-if="!getBuyerSignUpSuccess && !getSupplierExistingSignUpSuccess && !getGoToModuleSelection && !getGoToAgreement && !getSupplierSignUpSuccess">
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
                <ValidationObserver ref="buyer" v-slot="{ valid, handleSubmit }">
                  <v-form>
                    <v-container>
                      <v-alert type="error" class="mt-4" v-show="getShowErrorAlert">
                        {{ getCompanyErrorAlert }}
                      </v-alert>

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
                              v-model="buyer.email" @input="checkEmailBuyer" :error-messages="errors" :success="valid"
                              required>
                              <template v-slot:append>

                                <v-progress-circular v-if="getEmailLoading" indeterminate :size="20" :width="2"
                                  color="
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          #0D1139"
                                  :value="80"></v-progress-circular>
                              </template>
                            </v-text-field>
                          </ValidationProvider>
                          <div class=" email-error-text text-left" v-if="emailError && !getInvitedSupplierEmailExists">
                            Email already exists! Please <a href="/login" class="">Login </a>to
                            access your account.
                          </div>
                          <div class=" email-error-text text-left" v-if="getInvitedSupplierEmailExists">
                            Supplier is pending registration and cannot be invited at this time.
                          </div>

                        </v-col>

                        <v-col cols="12" sm="12" text="left" :class="{
                          'spacing-class': getPhoneInfo.valid && getCounter >= 1 || !getPhoneInfo.valid && getCounter === 0,

                        }">
                          <label class="d-block text-left input-label mb-2 font-weight-bold">Direct Phone Number</label>

                          <VuePhoneNumberInput @phone-number-blur="onBlurB" default-country-code="US" :required="true"
                            clearable :error="!getPhoneInfo.valid && getCounter >= 1" :border-radius="8" size="lg"
                            v-model="buyer.phoneNumber" error-color="#FF0000" valid-color="#9E9E9E"
                            :translations="translations" class="mb-2" @update="onUpdate" />

                          <div class="phone-class" v-show="!getPhoneInfo.valid && getCounter >= 1">
                            {{ getPhoneInfo.message }}</div>
                        </v-col>
                      </v-row>

                      <v-row justify="center" class="mt-10">
                        <v-col cols="12" md="3">
                          <v-btn color="#0D9647" large dense width="100%" height="56"
                            class="font-weight-bold white--text text-capitalize" @click="handleSubmit(buyerRequest)"
                            :loading="getSignUpLoading"
                            :disabled="!getPhoneInfo.valid || emailError || getInvitedSupplierEmailExists || getEmailLoading || !valid || getSignUpLoading">Next
                            <v-icon class="pl-2" color="#fff">mdi-arrow-right-circle</v-icon></v-btn>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-form>
                </ValidationObserver>
              </v-tab-item>

              <!-- SUPPLIER SECTION -->
              <v-tab-item>
                <ValidationObserver ref="supplier" v-slot="{ valid, handleSubmit }">

                  <v-form>
                    <v-container>

                      <v-alert type="error" class="mt-4" v-show="getShowErrorAlert">
                        {{ getCompanyErrorAlert }}
                      </v-alert>
                      <v-row class="mt-8 bg-light px-6 py-4 ">
                        <v-row v-if="isToken" class="px-3">
                          <v-col text="left" class=" " :cols="editCompanyName ? '12' : ''"
                            :sm="editCompanyName ? '6' : '12'">
                            <label class="d-block text-left input-label mb-2 font-weight-bold">Bid Invite
                              Code</label>
                            <ValidationProvider
                              name="Bid Invite
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              Code"
                              rules="required" v-slot="{ errors, valid }">
                              <v-text-field placeholder="Enter your bid invite code" single-line outlined type="text"
                                :error-messages="errors" :success="valid" required v-model="supplier.bidInvitedCode">
                                <template v-slot:append>
                                  <div class="d-flex align-center" v-if="!getTokenLoading && getTokenSupplier"> <span
                                      v-if="!editCompanyName" class="invited-company">{{ getTokenSupplier.company
                                      }}</span>
                                    <v-icon size="20" v-if="supplier.bidInvitedCode" color="#0D9648"
                                      class="ml-2">mdi-check-decagram-outline</v-icon>
                                  </div>

                                  <v-progress-circular v-if="getTokenLoading" indeterminate :size="20" :width="2"
                                    color="
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          #0D1139"
                                    :value="80"></v-progress-circular>

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

                        <v-row v-if="!isToken" class="px-3">
                          <v-col text="left" cols="12" sm="12">
                            <label class="d-block text-left input-label mb-2 font-weight-bold">Company Name</label>
                            <ValidationProvider name="Company name" rules="required" v-slot="{ errors, valid }">
                              <v-text-field v-click-outside="closeList" prepend-inner-icon="search"
                                placeholder="Company name" single-line outlined type="text" v-model="supplier.companyName"
                                @input="getSupplierList" @focus="hideList = true" :error-messages="errors"
                                :success="valid" required :loading="getSupplierLoading" color="#0D9648" loader-height="3">

                                <template v-slot:append>
                                  <v-icon size="25" @click="supplier.companyName = ''" class="clear-icon ml-2"
                                    v-if="supplier.companyName !== ''" color="#0D9648">mdi-close</v-icon>
                                </template>
                              </v-text-field>
                            </ValidationProvider>
                            <input type="hidden" v-model="companyId">
                            <template v-if="hideList == true && supplier.companyName && supplier.companyName.length >= 3">
                              <v-list class="company-list ">
                                <v-list-item class="first" @click="hideList = false">
                                  <v-list-item-content>
                                    <v-list-item-title class="text-left">
                                      Add "{{ supplier.companyName }}" as a Supplier</v-list-item-title>
                                  </v-list-item-content>
                                </v-list-item>
                                <template
                                  v-for="(item) in suppliers">
                                  <v-list-item :key="item._id" class="second"
                                    @click="companyList(item.companyName, item._id); hideList = false">
                                    <v-list-item-content>
                                      <v-list-item-title v-html=" item.companyName " class="text-left"></v-list-item-title>
                                    </v-list-item-content>
                                  </v-list-item>
                                </template>
                              </v-list>

                            </template>

                          </v-col>
                        </v-row>
                      </v-row>

                      <v-row class="px-5   bg-light  "><v-col
                          class="checkbox-class pb-3 d-flex justify-space-between align-center ">
                          <v-checkbox v-model="isToken" class="name-class" color="#0D9648" hide-details>
                            <template v-slot:label>
                              <div>
                                I have an invite token
                              </div>
                            </template>
                          </v-checkbox>

                          <div class="edit-company"
                            v-if="isToken && !getTokenSupplierError && !getTokenLoading && (getTokenSupplier && getTokenSupplier.company)"
                            @click=" editCompanyName = !editCompanyName">
                            <span class="text-decoration-underline">Edit company
                              name</span>
                            <v-icon color="#B8B8B8" size="20" class="ml-2">mdi-pencil-outline</v-icon>
                          </div>

                        </v-col>
                      </v-row>

                      <v-row class="mt-12"
                        v-if="!isToken && supplier.companyName !== '' && supplierExists && suppliers.length">
                        <div class="existing-company pa-6 text-left">
                          <h1><strong>{{ supplier.companyName }} </strong> is an existing company in
                            the BidOut platform,
                            filling out the
                            form will send a request to add you to <strong>{{ supplier.companyName }}</strong>.</h1>

                        </div>

                      </v-row>

                      <v-row class="mt-12" v-if="!getTokenLoading && getTokenSupplier && isToken">
                        <div class="existing-company pa-6 text-left">

                          <h1>We have successfully found your invite code and
                            upon completion
                            of the BidOut signup
                            process, you will be automatically linked back to the bid that you were invited to.</h1>
                        </div>

                      </v-row>

                      <v-row class="mt-12"
                        v-if="!getTokenLoading && !getTokenSupplier && getTokenSupplierError && isToken">
                        <div class="existing-company-error pa-6 text-left">

                          <h1>You have entered invalid token. Please check your email and try again.</h1>
                        </div>

                      </v-row>
                      <v-row class="mt-12 bg-light px-6 py-4" v-if="!supplierExists">
                        <v-col cols="12" sm="12" text="left" class="pb-0">
                          <label class="d-block text-left input-label mb-2 font-weight-bold">Company HQ Address 1</label>
                          <ValidationProvider name="Company HQ" rules="required" v-slot="{ errors, valid }">
                            <v-text-field placeholder="Company HQ Address 1" single-line outlined type="text"
                              v-model="supplier.companyHq1" color="#ffffff" :error-messages="errors" :success="valid"
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

                          <country-select v-model="supplier.country" :country="supplier.country" topCountry="US"
                            className="countrySelect" :disablePlaceholder="true" placeholder="Select Country" />
                        </v-col>
                        <v-col cols="12" sm="6" text="left">
                          <label class="d-block text-left input-label mb-2 font-weight-bold">Company HQ State</label>

                          <region-select v-model="supplier.region" :country="supplier.country" :region="supplier.region"
                            :disablePlaceholder="true" className="countrySelect" />
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
                          <ValidationProvider name="Email address" rules="required|email" v-slot="{ errors, valid }">
                            <v-text-field placeholder="example@email.com" single-line outlined type="email"
                              v-model="supplier.email" :error-messages="errors" @input="checkEmailSupplier"
                              :success="valid" required>
                              <template v-slot:append>

                                <v-progress-circular v-if="getEmailLoading" indeterminate :size="20" :width="2"
                                  color="
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          #0D1139"
                                  :value="80"></v-progress-circular>
                              </template>

                            </v-text-field>
                          </ValidationProvider>
                          <div class=" email-error-text text-left" v-if="emailError && !getInvitedSupplierEmailExists">
                            Email already exists! Please <a href="/login">Login</a> to
                            access your account.
                          </div>
                          <div class=" email-error-text text-left" v-if="getInvitedSupplierEmailExists">
                            Supplier is pending registration and cannot be invited at this time.
                          </div>

                        </v-col>
                        <v-col cols="12" sm="12" text="left" class="pb-0">
                          <label class="d-block text-left input-label mb-2 font-weight-bold">Title</label>
                          <ValidationProvider name="Title" rules="required" v-slot="{ errors, valid }">
                            <v-text-field placeholder="Title" single-line outlined type="text" v-model="supplier.title"
                              :error-messages="errors" :success="valid" required></v-text-field>
                          </ValidationProvider>
                        </v-col>
                        <v-col cols="12" sm="12" text="left" class="" :class="{
                          'spacing-class': getPhoneInfo.valid && getCounter >= 1 || !getPhoneInfo.valid && getCounter === 0 || getPhoneInfo.valid,

                        }
                          ">
                          <label class="d-block text-left input-label mb-2 font-weight-bold">Direct Phone Number</label>

                          <VuePhoneNumberInput @phone-number-blur="onBlurS" default-country-code="US" :required="true"
                            clearable :error="!getPhoneInfo.valid && getCounter >= 1" :border-radius="8" size="lg"
                            v-model="supplier.phoneNumber" error-color="#FF0000" valid-color="#9E9E9E"
                            :translations="translations" class="mb-2" @update="onUpdate2" />

                          <div class="phone-class" v-show="!getPhoneInfo.valid && getCounter >= 1">
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
                            class="font-weight-bold white--text text-capitalize" @click=" handleSubmit(supplierRequest)"
                            :loading="getSignUpLoading"
                            :disabled="!getPhoneInfo.valid || emailError || getInvitedSupplierEmailExists || getEmailLoading || !valid || getSignUpLoading">Next
                            <v-icon class="pl-2" color="#fff">mdi-arrow-right-circle</v-icon></v-btn>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-form>
                </ValidationObserver>
              </v-tab-item>
            </v-tabs-items>
          </v-col>
        </v-row>
        <ConfirmationBuyer v-if="getBuyerSignUpSuccess" />
        <ExistingConfirmation v-if="getSupplierExistingSignUpSuccess" />
        <ModuleSelection v-if="getGoToModuleSelection" />
        <Contract v-if="getGoToAgreement" />
        <ConfirmationSupplier v-if="getSupplierSignUpSuccess" />
        <v-row justify="center">
          <v-col cols="12" md="9">
            <div class="getStart-box pa-6 text-left">
              <h1 class="mb-3 font-weight-bold">Get Started Today for Free!</h1>
              <div class="d-flex align-start">
                <v-icon class="pr-4 mt-1" color="#0D9647">mdi-phone-outline</v-icon>
                <p>Contact a BidOut Team Member today by calling <br><strong>1-832-786-2400</strong></p>
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
  import { mapActions, mapGetters } from "vuex";
  import {
  ValidationObserver,
  ValidationProvider
} from "vee-validate";
import VuePhoneNumberInput from 'vue-phone-number-input';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';

export default {
  name : "GetStarted",
  components: {
    NavbarBeforeLogin,
    Footer,
    VuePhoneNumberInput,
    ConfirmationBuyer,
    ExistingConfirmation,
    ConfirmationSupplier,
    ModuleSelection,
    Contract,
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      currentItem: '',
      editCompanyName: false,
      tokenLoading: false,
      supplierExists: false,
      items: [
        'Buyer', 'Supplier',
      ],
      supplier: {
        companyName: '',
        bidInvitedCode: '',
        editCompany: '',
        companyHq1: '',
        companyHq2: '',
        companyHqState: '',
        companyHqCity: '',
        companyHqZip: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        title: '',
        region: "TX",
        country: "US",
        email: ''
      },
      buyer: {
        companyName: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: ''
      },
      email: '',
      company: '',
      companyId: '',
      successPass: false,
      successPass1: false,
      password: '',
      confirmPassword: '',
      hideList: false,
      results: '',
      results2: '',
      counter: 0,
      phoneInfo: {
        valid: false,
        message: '',
      },
      isToken:false,
      emailLoading: false,
      signUpLoading: false,
      searchSupplierLoading: false,
      countryCode: '',
      supplierLoading: false,
      translations: {
        countrySelectorLabel: 'Country Code',
        countrySelectorError: 'Choose country',
        phoneNumberLabel: 'Phone Number',
        example: 'Example',
      },
    };
  },
  directives: {
      'click-outside': {
        bind: function (el, binding, vnode) {
          el.clickOutsideEvent = function (event) {
            if (!(el == event.target || el.contains(event.target))) {
              vnode.context[binding.expression](event);
            }
          };
          document.body.addEventListener('click', el.clickOutsideEvent)
        },
        unbind: function (el) {
          document.body.removeEventListener('click', el.clickOutsideEvent)
        },
      }
  },
  watch:{
    'supplier.bidInvitedCode': _.debounce(async function() {
      if (this.supplier.bidInvitedCode !== '') {
      this.$store.commit('setTokenInvitedSupplier',null)
      this.$store.commit('setEmailExistSuccess',false)
      this.$store.commit('setInvitedSupplierEmailExists',false)
      this.tokenLoading = true

      await this.getInvitedSupplierByToken(this.supplier.bidInvitedCode)

     this.tokenLoading = false
      }
    },500),
    currentItem (newI,old) {
      this.phoneInfo.valid = false
      this.phoneInfo.message = ''

      if(this.$route.query.token) {
        this.supplier.bidInvitedCode = this.$route.query.token
      }

      this.counter = 0
      this.$store.commit('setEmailExistSuccess',false)
      this.$store.commit('setInvitedSupplierEmailExists',false)
      if (old === 1 && newI === 0) {
        this.checkEmailBuyer()
      } else if (old === 0 && newI === 1) {
        this.checkEmailSupplier()
      }

    },
    isToken(newI,old) {
      if (!newI) {
        this.phoneInfo.valid = false
        this.phoneInfo.message = ''

        this.supplier.companyName = this.supplier.bidInvitedCode = this.supplier.editCompany = this.supplier.companyHq1 = this.supplier.companyHq2 = this.supplier.companyHqState = this.supplier.companyHqCity = this.supplier.companyHqZip = this.supplier.firstName = this.supplier.lastName = this.supplier.phoneNumber =this.supplier.title = this.supplier.email = this.password = this.confirmPassword = ''

        this.supplier.region = 'TX'
        this.supplier.country = 'US'

        this.counter = 0
      }
    },
  },
  computed:{
    getTokenLoading() {
      return this.tokenLoading
    },
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
        return 'mdi-check';
      } else {
        this.successPass = false;
        return 'mdi-close';
      }
    },
    passRule1: function() {
      if (this.confirmPassword === '') {
        this.successPass1 = false;
        return '';
      } else if (this.min6(this.confirmPassword) === true && this.matchingPasswords() === true) {
        this.successPass1 = true;
        this.matchingPasswords()
        return 'mdi-check';
      } else {
        this.successPass1 = false;
        return 'mdi-close';
      }
    },
    suppliers(){
      if (this.$store.getters.supplier) {
       this.supplierExists = this.$store.getters.supplier.some( (item) => item.companyName === this.supplier.companyName);
      }

      return this.$store.getters.supplier;
    },
    emailMessage(){
      return this.$store.getters.emailExists;
    },
    emailError() {
      if (this.emailMessage) {
        return true;
      } else {
        return false;
      }
    },
    getTokenSupplier() {
      if (this.$store.getters.tokenInvitedSupplier) {
        this.supplier.editCompany = this.$store.getters.tokenInvitedSupplier.company
        this.supplier.firstName = this.$store.getters.tokenInvitedSupplier.firstName
        this.supplier.lastName = this.$store.getters.tokenInvitedSupplier.lastName
        this.supplier.email = this.$store.getters.tokenInvitedSupplier.email
        this.supplier.email = this.$store.getters.tokenInvitedSupplier.email
        this.supplier.phoneNumber = this.$store.getters.tokenInvitedSupplier.phoneNumber
      } else {
        this.supplier.editCompany = this.supplier.firstName = this.supplier.lastName =  this.supplier.email =  this.supplier.phoneNumber = ''

        this.phoneInfo.valid = true
        this.phoneInfo.message = ''
        this.counter = 0
      }

      return this.$store.getters.tokenInvitedSupplier
    },
    getTokenSupplierError() {
      return this.$store.getters.tokenInvitedSupplierError
    },
    getEmailLoading() {
      return this.emailLoading
    },
    getSignUpLoading() {
      return this.signUpLoading
    },
    getShowErrorAlert() {
      return this.$store.getters.authShowErrorAlert
    },
    getCompanyErrorAlert() {
      return this.$store.getters.companyError
    },
    getBuyerSignUpSuccess() {
      return this.$store.getters.buyerSignUpSuccess
    },
    getSupplierExistingSignUpSuccess () {
      return this.$store.getters.supplierExistingSignUpSuccess
    },
    getGoToModuleSelection() {
      return this.$store.getters.goToModuleSelection
    },
    getGoToAgreement () {
      return this.$store.getters.goToAgreement
    },
    getSupplierSignUpSuccess() {
      return this.$store.getters.supplierSignUpSuccess
    },
    getInvitedSupplierEmailExists () {
      return this.$store.getters.invitedSupplierEmailExists
    },
    getSupplierLoading() {
      return this.supplierLoading
    }
  },
  methods: {
    ...mapActions(["supplierSignUpAction","searchSupplier","checkEmail","buyerSignUpAction","getIpAddress",'getInvitedSupplierByToken','queueSupplierUser']),
    closeList() {
      this.hideList = false;
    },
    onUpdate (payload) {
      this.counter++;
      this.phoneInfo.valid = payload.isValid;

      if (!payload) {
        this.phoneInfo.message = 'Phone number is required';
      }
      else if (payload.phoneNumber && payload.phoneNumber !== '' && payload.phoneNumber.length >= 1) {
        this.phoneInfo.valid = payload.isValid;

        if (!payload.isValid) {
           this.phoneInfo.message = 'Invalid Phone number format';
        }

        if (payload.formattedNumber && payload.isValid) {
        this.buyer.phoneNumber = payload.formattedNumber;
        this.results = payload.formattedNumber;
        }
      } else {
        this.phoneInfo.message = 'Phone number is required';
      }
    },
    async checkEmailBuyer() {
      // let testEmail = /^[\w-\.+]+@([\w-]+\.)+[\w-]{1,63}$/.test(this.buyer.email)
      let testEmail = /^[\w.+-]+@(?!.*_{1})[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{1,63}$/.test(this.buyer.email);
      if (this.buyer.email === '' || !testEmail) {
        this.$store.commit('setEmailExistSuccess',false)
        this.$store.commit('setInvitedSupplierEmailExists',false)
      }

      if (testEmail) {
        this.emailLoading = true
        await this.checkEmail(this.buyer.email);
        this.emailLoading = false
      }
    },

    async checkEmailSupplier() {
      // let testEmail = /^[\w-\.+]+@([\w-]+\.)+[\w-]{1,63}$/.test(this.supplier.email)
      let testEmail = /^[\w.+-]+@(?!.*_{1})[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{1,63}$/.test(this.supplier.email);
      
      if (this.supplier.email === '' || !testEmail) {
        this.$store.commit('setEmailExistSuccess',false)
        this.$store.commit('setInvitedSupplierEmailExists',false)
      }

      if (testEmail) {
        this.emailLoading = true
        await this.checkEmail(this.supplier.email);
        this.emailLoading = false
      }
    },
    onUpdate2 (payload) {
      this.counter++;
      this.phoneInfo.valid = payload.isValid;

      if (!payload) {
        this.phoneInfo.message = 'Phone number is required';
      } else if (payload.phoneNumber && payload.phoneNumber !== '' && payload.phoneNumber.length >= 1) {
        this.phoneInfo.valid = payload.isValid;

        if (!payload.isValid) {
           this.phoneInfo.message = 'Invalid Phone number format';
        }

        if (payload.formattedNumber && payload.isValid) {
        this.supplier.phoneNumber = payload.formattedNumber;
        this.results2 = payload.formattedNumber;
        }
      } else {
        this.phoneInfo.message = 'Phone number is required';
      }
    },
    async supplierRequest() {
      this.signUpLoading = true

      if (this.results2 === '' || this.results2 === undefined) {
        this.counter += 2;
        this.phoneInfo = {
          valid: false,
          message: 'Phone number is required',
        };

        return
      }

      if(this.getPhoneInfo.valid && !this.emailError && !this.getInvitedSupplierEmailExists){
        if(this.companyId !== '' && this.supplierExists){
          let supplierData = {
            id: this.companyId,
            companyName: this.supplier.companyName,
            firstName: this.supplier.firstName,
            lastName: this.supplier.lastName,
            email: this.supplier.email,
            phoneNumber: this.results2,
            title: this.supplier.title,
            password: this.password
          }

        await this.queueSupplierUser(supplierData)
        }
        else {
          let supplierData = {
            companyHq1: this.supplier.companyHq1,
            companyHq2: this.supplier.companyHq2,
            companyHqCountry: this.supplier.country,
            companyHqState: this.supplier.region,
            companyHqCity: this.supplier.companyHqCity,
            companyHqZip: this.supplier.companyHqZip,
            firstName: this.supplier.firstName,
            lastName: this.supplier.lastName,
            email: this.supplier.email,
            phoneNumber: this.results2,
            title: this.supplier.title,
            password: this.password
          }
          if (this.isToken && this.supplier.bidInvitedCode !== '') {
             supplierData.company =  this.supplier.editCompany
             supplierData.token = this.supplier.bidInvitedCode
             supplierData.companyName = this.supplier.editCompany
          } else {
             supplierData.company =  this.supplier.companyName
          }

          await this.supplierSignUpAction(supplierData);
        }

        this.signUpLoading = false

        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    onBlurB() {
      if (this.buyer.phoneNumber === '') {
        this.phoneInfo.message = 'Phone number is required';
        this.phoneInfo.valid = false
        this.counter++
      } else if (this.buyer.phoneNumber !== null && this.buyer.phoneNumber.length === 1) {
        this.phoneInfo.message = 'Invalid Phone number format';
        this.phoneInfo.valid = false
        this.counter++
      }
    },
    onBlurS() {
      if (this.supplier.phoneNumber === '') {
        this.phoneInfo.message = 'Phone number is required';
        this.phoneInfo.valid = false
        this.counter++
      } else if (this.supplier.phoneNumber !== null && this.supplier.phoneNumber.length === 1) {
        this.phoneInfo.message = 'Invalid Phone number format';
        this.phoneInfo.valid = false
        this.counter++
      }
    },
    async buyerRequest() {
     this.signUpLoading = true

      if (this.results === '' || this.results === undefined) {
        this.counter += 2;
        this.phoneInfo = {
          valid: false,
          message: 'Phone number is required',
        };
        return
      }

      if(this.getPhoneInfo.valid && !this.emailError && !this.getInvitedSupplierEmailExists ){
        var buyerData = {
        company: this.buyer.companyName,
        firstName: this.buyer.firstName,
        lastName: this.buyer.lastName,
        email: this.buyer.email,
        phoneNumber: this.results,
      }

      await this.buyerSignUpAction(buyerData);
      this.signUpLoading = false

      window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    getSupplierList:  _.debounce (async function () {
      this.supplierLoading = true
      this.companyId = ''
      if(this.supplier.companyName && this.supplier.companyName !== '' && this.supplier.companyName.length < 3){
        this.hideList = false;
      }
      else if(this.supplier.companyName && this.supplier.companyName !== '' && this.supplier.companyName.length >= 3){
         this.hideList = true
         await this.searchSupplier(this.supplier.companyName);
      }
      this.supplierLoading = false
      },500),
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
      this.supplierExists = this.suppliers.some( (item) => item.companyName === title);
      this.supplier.companyName = title;
      this.companyId = id;
      this.hideList = false;
    },
  },
  async mounted() {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    this.$store.commit('setTokenInvitedSupplier',null)
    this.$store.commit('setTokenInvitedSupplierError',false)
    this.$store.commit('setEmailExistSuccess',false)
    this.$store.commit('setInvitedSupplierEmailExists',false)
    this.$store.commit('setBuyerSignUpSuccess',null)
    this.$store.commit('setSupplierExistingSignUpSuccess',null)
    this.$store.commit('setGoToModuleSelection',null)
    this.$store.commit('setGoToAgreement',null)
    this.$store.commit('setSupplierSignUpSuccess',null)
    this.$store.commit('setCompanyName','')
    this.$store.commit('setContractData','')
    this.$store.commit('setPlan',null)
    this.$store.commit('setSameAsData',null)
    this.$store.commit('setAdmins',[])

    document.title = "Get Started - BidOut"

    if (this.$route.query.token) {
     this.currentItem = 1
     this.supplier.bidInvitedCode = this.$route.query.token
     this.isToken = true
     this.tokenLoading = true
     await this.getInvitedSupplierByToken(this.supplier.bidInvitedCode)

     this.tokenLoading = false
  }
  },
};
</script>
<style scoped lang="scss"></style>
