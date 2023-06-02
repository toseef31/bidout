<template>
  <div>
    <v-row class="supplier-row fill-height" no-gutters>
      <v-col sm="2" v-if="categories" class="category-col">
        <v-list class="pt-0">
          <v-list-group v-for="category in sortedCategories" :key="category.category._id" active-class="black--text">
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title v-text="category.category.name" class="text-left"></v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item class="ml-3" v-for="subcategry in subCategories(category.subCategories)" :key="subcategry.name"
              @click="getByCategory(subcategry.slug)">
              <v-list-item-content>
                <v-list-item-title v-text="subcategry.name" class="text-left"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </v-list>
      </v-col>
      <v-col cols="12" sm="6" class="available-data">
        <div class="d-flex justify-space-between align-center pl-4 supplier-head">
          <div>
            <h4 class="mb-0 black--text font-weight-bold">Available Suppliers</h4>
          </div>
          <div>
            <v-tabs class="supplier-tabs" hide-slider v-model="availableSuppl">
              <v-tab class="text-capitalize font-weight-bold" href="#companyName" @click="hideCategories('name')">Company
                Name</v-tab>
              <v-tab class="text-capitalize font-weight-bold" href="#salesRep" @click="hideCategories">Sales
                Rep</v-tab>
              <v-tab class="text-capitalize font-weight-bold" href="#serviceCategory"
                @click="hideCategories('name'); categories = !categories">Service Category</v-tab>
            </v-tabs>
          </div>
        </div>
        <v-tabs-items v-model="availableSuppl">
          <v-tab-item value="companyName">
            <div class="available-search d-flex justify-space-between align-center mt-5 px-4">
              <div>
                <input type="hidden" name="" :value="validateT">
                <v-text-field type="text" hide-details outlined placeholder="Search" prepend-inner-icon="mdi-magnify"
                  v-model="companySearch" @keyup="getCompanies">
                </v-text-field>
              </div>
              <div class="d-flex align-center">
                <label class="input-label black--text pr-2 font-weight-bold">Basin</label>
                <v-select rounded hide-details outlined class="available-select text-capitalize" :items="availableSearch"
                  width="150px" v-model="companyBasin" min-height="28px" @change="getCompanies"></v-select>
              </div>
            </div>
            <div class="companies-list" v-if="!getCompanyLoading">
              <div class="d-flex align-center justify-space-between list-company pa-4"
                v-for="(company, index) in companiesList" v-if="user.company._id !== company._id" :key="index">
                <div class="comapny-data d-flex align-center">
                  <div class="company-img">
                    <img v-if="company.image" class="image-class" :src="company.image" />
                    <div v-else class="icon-class">
                      <v-icon size="40">mdi-domain</v-icon>
                    </div>
                  </div>
                  <div class="company-title text-left pl-4">
                    <h4>{{ company.companyName }}
                      <span v-if="hasOfsPremium(company)">
                        <v-tooltip top>
                          <template v-slot:activator="{ on, attrs }">
                            <v-icon color="#0D9647" size="16px" v-bind="attrs" v-on="on">mdi-check-decagram</v-icon>
                          </template>
                          <span>Premium Service Provider</span>
                        </v-tooltip>
                      </span>
                    </h4>
                    <router-link :to="`/company/${company.slug}`" target="_blank" class="mb-0">View
                      Profile</router-link>
                  </div>
                </div>
                <div class="add-company">
                  <v-btn color="rgba(13, 150, 72, 0.1)" tile min-width="32px" height="32" class="pa-0" elevation="0"
                    @click="addCompany(company)"> <v-icon color="#0D9648">mdi-plus</v-icon></v-btn>
                </div>
              </div>
            </div>
            <div v-else class="mt-16" align="center" justify="center">
              <v-progress-circular :width="3" color="green" indeterminate></v-progress-circular>

            </div>
          </v-tab-item>
          <v-tab-item value="salesRep">
            <div class="available-search d-flex justify-space-between align-center mt-5 px-4">
              <div>
                <v-text-field type="text" hide-details outlined placeholder="Search" prepend-inner-icon="mdi-magnify"
                  v-model="searchCompany" @keyup="getSales">
                </v-text-field>
              </div>
              <div class="d-flex align-center">
                <label class="input-label black--text pr-2 font-weight-bold">Basin</label>
                <v-select rounded hide-details outlined class="available-select text-capitalize" :items="availableSearch"
                  width="150px" v-model="basinFilter" @change="getSales"></v-select>
              </div>
            </div>
            <div class="companies-list" v-if="!getSalesRepLoading">
              <div class="d-flex align-center justify-space-between list-company pa-4"
                v-for="(list, index) in salesRepsList" v-if="user._id !== list._id" :key="index">
                <div class="comapny-data d-flex align-center">

                  <div class="company-img">
                    <img v-if="list.image" :src="list.image" width="48px" height="48px">
                    <img v-else :src="require('@/assets/images/chat/chatUser.png')">

                  </div>
                  <div class="company-title text-left pl-4">
                    <h4>{{ list.firstName }} {{ list.lastName }}</h4>
                    <p class="mb-0">{{ list.company.companyName }}
                      <span v-if="hasOfsPremium(list.company)">
                        <v-tooltip top>
                          <template v-slot:activator="{ on, attrs }">
                            <v-icon color="#0D9647" size="14px" v-bind="attrs" v-on="on">mdi-check-decagram</v-icon>
                          </template>
                          <span>Premium Service Provider</span>
                        </v-tooltip>
                      </span>
                    </p>
                  </div>
                </div>
                <div class="add-company">
                  <v-btn color="rgba(13, 150, 72, 0.1)" tile min-width="32px" height="32" class="pa-0" elevation="0"
                    @click="addReps(list, index)"> <v-icon color="#0D9648">mdi-plus</v-icon></v-btn>
                </div>
              </div>
            </div>
            <div v-else class="mt-16" align="center" justify="center">
              <v-progress-circular :width="3" color="green" indeterminate></v-progress-circular>

            </div>
          </v-tab-item>
          <v-tab-item value="serviceCategory">
            <div class="available-search d-flex justify-space-between align-center mt-5 px-4">

            </div>
            <div class="companies-list">
              <div>
                <div class="d-flex align-center justify-space-between list-company pa-4"
                  v-for="(company, index) in companiesList" v-if="user.company._id !== company._id" :key="index">
                  <div class="comapny-data d-flex align-center">
                    <div class="company-img">
                      <img v-if="company.image" class="image-class" :src="company.image" />

                      <div v-else class="icon-class">
                        <v-icon size="40">mdi-domain</v-icon>
                      </div>
                    </div>
                    <div class="company-title text-left pl-4">
                      <h4>{{ company.companyName }}
                        <span v-if="hasOfsPremium(company)">
                          <v-tooltip top>
                            <template v-slot:activator="{ on, attrs }">
                              <v-icon color="#0D9647" size="16px" v-bind="attrs" v-on="on">mdi-check-decagram</v-icon>
                            </template>
                            <span>Premium Service Provider</span>
                          </v-tooltip>
                        </span>
                      </h4>
                      <router-link :to="`/company/${company.slug}`" target="_blank" class="mb-0">View
                        Profile</router-link>
                    </div>
                  </div>
                  <div class="add-company">
                    <v-btn color="rgba(13, 150, 72, 0.1)" tile min-width="32px" height="32" class="pa-0" elevation="0"
                      @click="addServiceCompany(company)"> <v-icon color="#0D9648">mdi-plus</v-icon></v-btn>
                  </div>
                </div>
              </div>
            </div>
          </v-tab-item>
        </v-tabs-items>
      </v-col>
      <v-col cols="12" class="invited-data available-data" :class="[categories ? 'col-sm-4' : 'col-sm-6']">
        <div class="d-flex justify-space-between align-center pl-4 py-3 invited-head">
          <div>
            <h4 class="mb-0 black--text font-weight-bold">Invited Services Suppliers</h4>
          </div>
        </div>
        <div>

          <div class="companies-list">

            <template v-for="(company, index) in repsInvited">
              <div class="d-flex align-center justify-space-between list-company pa-4" v-if="company.companyName">
                <div class="comapny-data d-flex align-center">
                  <div class="company-img">
                    <img v-if="company.image" class="image-class" :src="company.image" />

                    <div v-else class="icon-class">
                      <v-icon size="40">mdi-domain</v-icon>
                    </div>
                  </div>
                  <div class="company-title text-left pl-4">
                    <h4>{{ company.companyName }}
                      <span v-if="hasOfsPremium(company)">
                        <v-tooltip top>
                          <template v-slot:activator="{ on, attrs }">
                            <v-icon color="#0D9647" size="16px" v-bind="attrs" v-on="on">mdi-check-decagram</v-icon>
                          </template>
                          <span>Premium Service Provider</span>
                        </v-tooltip>
                      </span>
                    </h4>
                    <router-link :to="`/company/${company.slug}`" target="_blank" class="mb-0">View
                      Profile</router-link>
                  </div>
                </div>
                <div class="add-company" v-if="checkIntent(company._id) !== 'intended'">
                  <v-btn color="rgba(243, 35, 73, 0.1)" tile min-width="32px" height="32" class="pa-0" elevation="0"
                    @click="removeCompany(company, index)"> <v-icon color="#F32349">mdi-minus</v-icon></v-btn>
                </div>
              </div>
              <div class="d-flex align-center justify-space-between list-company pa-4" v-if="!company.companyName">
                <div class="comapny-data d-flex align-center">
                  <div class="company-img">
                    <div class="avatar-image" v-if="!company.image">
                      <img :src="require('@/assets/images/chat/chatUser.png')">
                    </div>
                    <div class="avatar-image" v-else>
                      <img :src="company.image" width="48px" height="48px">
                    </div>
                  </div>
                  <div class="company-title text-left pl-4">
                    <h4>{{ company.firstName }} {{ company.lastName }}</h4>
                    <p class="mb-0">{{ company.company.companyName }}
                      <span v-if="hasOfsPremium(company.company)">
                        <v-tooltip top>
                          <template v-slot:activator="{ on, attrs }">
                            <v-icon color="#0D9647" size="14px" v-bind="attrs" v-on="on">mdi-check-decagram</v-icon>
                          </template>
                          <span>Premium Service Provider</span>
                        </v-tooltip>
                      </span>
                    </p>
                  </div>
                </div>
                <div class="add-company" v-if="checkIntent(company.objectID) !== 'intended'">
                  <v-btn color="rgba(243, 35, 73, 0.1)" tile min-width="32px" height="32" class="pa-0" elevation="0"
                    @click="removeReps(company, index)"> <v-icon color="#F32349">mdi-minus</v-icon></v-btn>
                </div>
              </div>
            </template>
            <template v-for="(company, index) in newRepsInvited">
              <div class="d-flex align-center justify-space-between list-company pa-4">
                <div class="comapny-data d-flex align-center">
                  <div class="company-img">

                    <div class="icon-class">
                      <v-icon size="40">mdi-domain</v-icon>
                    </div>
                  </div>
                  <div class="company-title text-left pl-4">
                    <h4>{{ company.firstName }} {{ company.lastName }} </h4>
                    <p class="mb-0">{{ company.company }}</p>

                  </div>
                </div>
                <div class="add-company">
                  <v-btn color="rgba(243, 35, 73, 0.1)" tile min-width="32px" height="32" class="pa-0" elevation="0"
                    @click="removeNewSup(index)"> <v-icon color="#F32349">mdi-minus</v-icon></v-btn>
                </div>
              </div>
            </template>
          </div>
        </div>
      </v-col>
    </v-row>

    <v-row justify="center" align="center" no-gutters>
      <v-col cols="12" md="12" class="mb-n2">
        <v-dialog v-model="supplierDialog" width="800" v-if="!$route.path.includes('create-template')">
          <template v-slot:activator="{ on, attrs }">

            <v-btn color="rgba(13, 150, 72, 0.1)" elevation="0" height="56px" width="220px" large
              class="text-capitalize font-weight-bold mt-5 mb-5 invite-btn mr-5" v-bind="attrs" v-on="on">Invite New
              Supplier </v-btn>
          </template>

          <v-card class="inviteSupplier-dialog">
            <v-card-title class="text-h5 justify-end">
              <v-icon @click="supplierDialog = false" color="#0D1139"> mdi-close</v-icon>
            </v-card-title>

            <v-card-text>
              <h2 class="text-left mb-6 font-weight-bold">Invite New Supplier</h2>
              <v-form ref="form" v-model="valid" lazy-validation
                :class="{ 'phone-error-class': !getPhoneInfo.valid && getCounter > 1, 'phone-valid-class': getPhoneInfo.valid }">
                <label class="d-block text-left font-weight-bold mb-2">First Name<span
                    class="required-class">*</span></label>
                <v-text-field v-model="firstName" :rules="nameRules" placeholder="First Name" required
                  outlined></v-text-field>
                <label class="d-block text-left font-weight-bold mb-2">Last Name<span
                    class="required-class">*</span></label>
                <v-text-field v-model="lastName" :rules="nameRules" placeholder="Last Name" required
                  outlined></v-text-field>
                <label class="d-block text-left font-weight-bold mb-2">Company<span
                    class="required-class">*</span></label>
                <v-text-field v-model="company" :rules="companyRules" placeholder="Company Name" required
                  outlined></v-text-field>
                <label class="d-block text-left font-weight-bold mb-2">Phone Number<span
                    class="required-class">*</span></label>
                <vue-tel-input defaultCountry="US" @blur="onBlurS" :autoDefaultCountry="false" :autoFormat="false"
                  :dropdownOptions="{
                    showDialCodeInSelection: true,
                    showFlags: true,
                    width: ' max-content'
                  }" :inputOptions="{
  required: true,
  showDialCode: false,
  maxlength: 15,
  placeholder: 'Phone number',

}" model="national" :validCharactersOnly="true" :styleClasses="{ 'phone-main-class': true }" v-model="phoneNumber"
                  @validate="onUpdate"></vue-tel-input>
                <div class="phone-class" v-if="!getPhoneInfo.valid && getCounter > 1">
                  {{ getPhoneInfo.message }}</div>
                <label class="d-block text-left font-weight-bold mb-2 mt-6">Email<span
                    class="required-class">*</span></label>
                <v-text-field v-model="email" :class="{ 'error--text': emailError }" :rules="emailRules"
                  @input="checkEmailI" placeholder="example@email.com" required outlined>
                  <template v-slot:append>

                    <v-progress-circular v-if="getEmailLoading" indeterminate :size="20" :width="2"
                      color="
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      #0D1139"
                      :value="80"></v-progress-circular>
                  </template>
                </v-text-field>
                <div class=" email-error-text text-left" v-if="emailError && !getInvitedSupplierEmailExists">
                  Email already exists! Please try a different one.
                </div>
                <div class=" email-error-text text-left" v-if="getInvitedSupplierEmailExists">
                  Supplier is pending registration and cannot be invited at this time.
                </div>

                <v-btn :loading="loadingInvite"
                  :disabled="!valid || !getPhoneInfo.valid || getEmailLoading || emailError || loadingInvite"
                  color="#0D9648" class="mr-4 text-capitalize white--text font-weight-bold" @click="validate" large
                  height="50px" min-width="220px">
                  Send Invite
                </v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-dialog>
        <v-btn color="#0D9648" elevation="0" height="56px" width="220px" large
          class="white--text text-capitalize font-weight-bold mt-5 mb-5 save-btn" @click="changeTab">Save
          Changes</v-btn>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { VueTelInput } from 'vue-tel-input';
import _ from 'lodash';
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    VueTelInput,
  },
  data() {
    return {
      availableSearch: ['All', 'Gulf Coast', 'Northeast', 'Rockies', 'Mid-Con', 'Permian', 'Arklatex', 'Offshore', 'Other'],
      availableSuppl: null,
      supplierDialog: false,
      valid: false,
      firstName: '',
      lastName: '',
      nameRules: [
        (v) => !!v || 'Name is required',
      ],
      company: '',
      companyRules: [
        (v) => !!v || 'Company name is required',
      ],
      email: '',
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /^[\w-\.+]+@([\w-]+\.)+[\w-]{1,63}$/.test(v) || 'E-mail must be valid',
      ],
      phoneNumber: '',
      results: {},
      categories: false,
      searchCompany: '',
      basinFilter: 'All',
      repsInvited: [],
      companySearch: '',
      companyBasin: 'All',
      interval: '',
      user: '',
      parsedSelectedBasin: 'all',
      parsedSelectedCompanyBasin: 'all',
      oldCount: '',
      newCount: '',
      newRepsInvited: [],
      inviteCount: 1,
      counter: 0,
      phoneInfo: {
        valid: true,
        message: '',
      },
      supplierLoading: false,
      emailLoading: false,
      companyLoading: false,
      salesRepLoading: false,
    };
  },
  computed: {
    ...mapGetters(['newSupplier', 'userInfo', 'loadingInvite', 'isEditBidChanges']),
    sortedCategories() {
      const categories = [...this.$store.getters.categories];
      categories.sort((a, b) => a.category.orderNumber - b.category.orderNumber);
      return categories;
    },
    getPhoneInfo() {
      return this.phoneInfo;
    },
    salesRepsList() {
      const unique = this.$store.getters.salesRepsList ? this.$store.getters.salesRepsList.filter((el) => !this.repsInvited.find((item) => el._id === item._id) && el._id !== this.userInfo.company._id) : [];

      return [...new Map(unique.map((item) => [item._id, item])).values()];
    },

    companiesList() {
      let unique;

      if (this.$store.getters.companiesList && this.$store.getters.companiesList.length) {
        if (this.repsInvited.length) {
          unique = this.$store.getters.companiesList ? this.$store.getters.companiesList.filter((el) => !this.repsInvited.find((item) => el._id === item._id) && el._id !== this.userInfo.company._id) : [];

          return [...new Map(unique.map((item) => [item._id, item])).values()];
        }

        return [...new Map(this.$store.getters.companiesList.map((item) => [item._id, item])).values()];
      }

      return [];
    },
    serviceCompanies() {
      return this.$store.getters.serviceCompaniesList.sort((a, b) => {
        const aHasOfsPremium = this.hasOfsPremium(a);
        if (aHasOfsPremium) {
          return -1;
        }
        return 1;
      });
    },
    // eslint-disable-next-line vue/no-side-effects-in-computed-properties, vue/return-in-computed-property,
    filteredEntries() {
      if (this.$store.getters.bidData.invitedSuppliers && this.$store.getters.bidData.invitedSuppliers.length) {
        this.repsInvited = this.$store.getters.bidData.invitedSuppliers.sort((a, b) => {
          let aHasOfsPremium;
          if (a.contracts) {
            aHasOfsPremium = this.hasOfsPremium(a);
          }

          if (a.company && a.company.contracts) {
            aHasOfsPremium = this.hasOfsPremium(a.company);
          }

          if (aHasOfsPremium) {
            return -1;
          }
          return 1;
        });
      }
    },
    // eslint-disable-next-line vue/no-side-effects-in-computed-properties, vue/return-in-computed-property,
    newSupplierFiltered() {
      if (this.$store.getters.bidData.invitedNewSuppliers && this.$store.getters.bidData.invitedNewSuppliers.length) {
        this.newRepsInvited = this.$store.state.bid.invitedNewSuppliers;
      }
    },
    getCounter() {
      return this.counter;
    },
    getBidAllIntend() {
      return this.$store.getters.bidAllIntend;
    },
    validateT() {
      if (this.repsInvited.length > 0) {
        this.$emit('validation', { valid: true, supplier: '2' });
        return this.valid;
      }
      this.$emit('validation', { valid: false, supplier: '2' });
      return this.valid;
    },
    getEmailLoading() {
      return this.emailLoading;
    },
    emailMessage() {
      return this.$store.getters.emailExists;
    },
    emailError() {
      if (this.emailMessage) {
        return true;
      }
      return false;
    },
    getInvitedSupplierEmailExists() {
      return this.$store.getters.invitedSupplierEmailExists;
    },
    getCompanyLoading() {
      return this.companyLoading;
    },
    getSalesRepLoading() {
      return this.salesRepLoading;
    },
  },
  methods: {
    ...mapActions(['getCategories', 'getSalesReps', 'getCompanyInfo', 'searchByCompany', 'getCompanyByServices', 'saveDraftBid', 'inviteNewSupplier', 'updateDraftBid', 'updateTemplate', 'updateBid', 'checkEmail']),
    changeTab() {
      if (this.$route.name == 'EditBid') {
        if (this.isEditBidChanges == true) {
          this.updateBid({ invitedSuppliers: this.repsInvited });
        }
      } else if (this.$route.name == 'EditTemplate') {
        this.updateTemplate({ invitedSuppliers: this.repsInvited });
      } else {
        this.updateDraftBid({ invitedSuppliers: this.repsInvited });
      }
      this.$emit('changetab', 'tab-3');
    },
    onUpdate(payload) {
      this.counter++;
      this.phoneInfo.valid = payload.valid;

      if (payload.number && !payload.valid) {
        this.phoneInfo.message = 'Invalid Phone number format';
      }

      if (!payload.number && !payload.valid) {
        this.phoneInfo.message = 'Phone number is required';
      }

      if (payload.number && payload.valid) {
        this.phoneNumber = payload.nationalNumber;
        this.results = payload.number;
      }
    },
    async validate() {
      if (this.results === '' && this.results === undefined) {
        this.counter += 2;
        this.phoneInfo = {
          valid: false,
          message: 'Phone number is required',
        };
      }

      const supplier = {
        firstName: this.firstName,
        lastName: this.lastName,
        company: this.company,
        phone: this.results,
        email: this.email,
        bidTitle: this.$store.getters.bidData.title,
        bidType: this.$store.getters.bidData.type,
        bidDueDate: this.$store.getters.bidData.dueDate,
        bidDueTime: this.$store.getters.bidData.dueTime,
        serial: this.$store.getters.bidData.serial,
      };

      if (this.$refs.form.validate() && this.getPhoneInfo.valid && !this.emailError && !this.getInvitedSupplierEmailExists) {
        const user = await this.inviteNewSupplier(supplier);

        if (user && user._id) {
          this.oldCount = this.newRepsInvited.length;

          this.newRepsInvited.push(user);
          this.newCount = this.newRepsInvited.length;
          this.$store.commit('setInvitedNewSuppliers', this.newRepsInvited);
          this.supplierDialog = false;

          this.$refs.form.reset();
          this.phoneNumber = '';
          this.phoneInfo = {
            valid: true,
            message: '',
          };
          this.counter = 0;
          this.valid = false;
          this.results = '';
        } else if (user !== '' && typeof user === 'string') {
          this.$toasted.show(
            user,
            {
              class: 'error-toast',
              type: 'error',
              duration: 5000,
              position: 'top-center',
            },
          );
        } else {
          this.$toasted.show(
            'Error! Something went wrong. Please try again',
            {
              class: 'error-toast',
              type: 'error',
              duration: 5000,
              position: 'top-center',
            },
          );
        }
      }
    },
    async checkEmailI() {
      const testEmail = /^[\w-\.+]+@([\w-]+\.)+[\w-]{1,63}$/.test(this.email);

      if (this.email === '' || !testEmail) {
        this.$store.commit('setEmailExistSuccess', false);
        this.$store.commit('setInvitedSupplierEmailExists', false);
      }

      if (testEmail) {
        this.emailLoading = true;
        await this.checkEmail(this.email);
        this.emailLoading = false;
      }
    },
    onBlurS() {
      if (this.phoneNumber === '') {
        this.phoneInfo.message = 'Phone number is required';
        this.phoneInfo.valid = false;
        this.counter++;
      } else if (this.phoneNumber.length === 1) {
        this.phoneInfo.message = 'Invalid Phone number format';
        this.phoneInfo.valid = false;
        this.counter++;
      }
    },
    hideCategories(name) {
      this.categories = false;
      this.companyBasin = 'All';

      if (name) {
        this.companySearch = '';
        this.getCompanies();
      }
    },
    subCategories(subCats) {
      return _.orderBy(subCats, 'orderNumber', 'asc');
    },
    getSales: _.debounce(async function () {
      this.salesRepLoading = true;
      if (this.basinFilter === 'All') {
        this.parsedSelectedBasin = 'all';
      } else {
        this.parsedSelectedBasin = this.basinFilter;
      }
      await this.getSalesReps({ query: this.searchCompany, basin: this.parsedSelectedBasin });

      this.salesRepLoading = false;
    }, 500),
    viewCompany(id, name) {
      this.getCompanyInfo({ id, name });
    },
    addReps(list, index) {
      this.oldCount = this.repsInvited.length;
      this.repsInvited.push(list);
      this.inviteCount = 2;
      this.newCount = this.repsInvited.length;
      this.$store.commit('spliceSalesRepsList', index);
      this.$store.commit('setIsEditBidChanges', true);
      const unique = [...new Map(this.repsInvited.map((m) => [m._id, m])).values()];

      this.$store.commit('setInvitedSuppliersData', unique);
    },
    removeReps(list, index) {
      this.$store.commit('pushSalesRepsList', list);
      this.oldCount = this.repsInvited.length;
      this.repsInvited.splice(index, 1);
      this.inviteCount = 2;
      this.newCount = this.repsInvited.length;
      this.$store.commit('setIsEditBidChanges', true);
      this.$store.commit('setInvitedSuppliersData', this.repsInvited);
    },
    getCompanies: _.debounce(async function () {
      this.companyLoading = true;
      if (this.companyBasin === 'All') {
        this.parsedSelectedCompanyBasin = 'all';
      } else {
        this.parsedSelectedCompanyBasin = this.companyBasin;
      }
      await this.searchByCompany({ query: this.companySearch, basin: this.parsedSelectedCompanyBasin });

      this.companyLoading = false;
    }, 500),
    getByCategory(category) {
      this.getCompanyByServices(category);
    },
    addCompany(company) {
      this.oldCount = this.repsInvited.length;
      this.repsInvited.push(company);
      this.inviteCount = 2;
      this.newCount = this.repsInvited.length;
      this.$store.commit('spliceCompanies', company);
      this.$store.commit('setIsEditBidChanges', true);
      const unique = [...new Map(this.repsInvited.map((m) => [m._id, m])).values()];
      this.$store.commit('setInvitedSuppliersData', unique);
    },
    addServiceCompany(company) {
      this.oldCount = this.repsInvited.length;
      this.repsInvited.push(company);
      this.inviteCount = 2;
      this.newCount = this.repsInvited.length;
      this.$store.commit('spliceCompanies', company);
      this.$store.commit('setIsEditBidChanges', true);
      const unique = [...new Map(this.repsInvited.map((m) => [m._id, m])).values()];
      this.$store.commit('setInvitedSuppliersData', unique);
    },
    removeCompany(company, index) {
      this.oldCount = this.repsInvited.length;
      this.repsInvited.splice(index, 1);
      this.inviteCount = 2;
      this.newCount = this.repsInvited.length;
      this.$store.commit('pushCompanies', company);
      this.$store.commit('setIsEditBidChanges', true);
      this.$store.commit('setInvitedSuppliersData', this.repsInvited);
    },
    removeNewSup(index) {
      this.oldCount = this.newRepsInvited.length;
      this.newRepsInvited.splice(index, 1);
      this.inviteCount = 2;
      this.newCount = this.newRepsInvited.length;
      this.$store.commit('setIsEditBidChanges', true);
      this.$store.commit('setInvitedNewSuppliers', this.newRepsInvited);
    },
    savedraftOnInterval() {
      const timer = setInterval(() => {
        if (this.oldCount !== this.newCount) {
          if (this.$route.name === 'EditBid') {
            if (this.isEditBidChanges == true) {
              this.updateBid({ invitedSuppliers: this.repsInvited });
            }
          } else if (this.$route.name === 'EditTemplate') {
            this.updateTemplate({ invitedSuppliers: this.repsInvited });
          } else {
            this.updateDraftBid({ invitedSuppliers: this.repsInvited });
          }
          this.oldCount = this.newCount;
        }
      }, 60000);

      this.$once('hook:beforeDestroy', () => {
        clearInterval(timer);
      });
    },
    hasOfsPremium(supplier) {
      return supplier.contracts.some((contract) => contract.contractType === 'ofs-premium');
    },
    checkIntent(id) {
      let result = 'neither';
      const intent = this.getBidAllIntend;

      if (intent && id) {
        intent.forEach((el) => {
          if (el.company === id && el.answer === 'true') {
            result = 'intended';
          }
          if (el.company === id && el.answer === 'false') {
            result = 'not-intended';
          }
        });
      }
      return result;
    },
  },
  beforeMount() {
    this.user = this.$store.getters.userInfo;
    this.getCategories();
    this.getSales();
    this.getCompanies();
  },
  mounted() {
    this.savedraftOnInterval();
    this.filteredEntries;
    this.newSupplierFiltered;

    this.$store.commit('setEmailExistSuccess', false);
    this.$store.commit('setInvitedSupplierEmailExists', false);
  },
};
</script>

<style src="vue-tel-input/dist/vue-tel-input.css"></style>
