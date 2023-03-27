<template>
  <div class="">
    <v-row class="supplier-row fill-height" no-gutters>
      <v-col sm="3" v-if="categories" class="category-col">
        <v-list class="pt-0">
          <v-list-group v-for="(category, index) in allCategories" :key="index" active-class="black--text">
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title v-text="category.name" class="text-left"></v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item class="ml-3" v-for="(subcategory, index) in subCategories(category.subCategories)" :key="index"
              @click="getByCategory(subcategory.slug)">
              <v-list-item-content>

                <v-list-item-title class="text-left">{{ subcategory.name }}

                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </v-list>
      </v-col>
      <v-col cols="12" sm="6" class="available-data">
        <div class="d-flex justify-space-between align-center pl-4 supplier-head py-1">
          <div>
            <h4 class="mb-0 black--text font-weight-bold available-suppliers-text">Available Suppliers</h4>
          </div>
          <div>
            <v-tabs class="supplier-tabs" hide-slider v-model="availableSuppl">
              <v-tab class="text-capitalize font-weight-bold" href="#companyName" @click="hideCategories">Company
                Name</v-tab>
              <v-tab class="text-capitalize font-weight-bold" href="#salesRep" @click="hideCategories">Sales
                Rep</v-tab>
              <v-tab class="text-capitalize font-weight-bold" href="#serviceCategory"
                @click="companySearch = ''; categories = !categories; ">Service Category</v-tab>
            </v-tabs>
          </div>
        </div>
        <v-tabs-items v-model="availableSuppl">
          <v-tab-item value="companyName">
            <div class="available-search d-flex justify-space-between align-center mt-5 px-4">
              <div>

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
            <div class="companies-list">
              <div class="d-flex align-center justify-space-between list-company pa-4"
                v-for="(company, index) in companiesList" v-if="user.company.id != company.objectID" :key="index">
                <div class="comapny-data d-flex align-center">
                  <div class="company-img">
                    <img v-if="company.image" class="image-class" :src="company.image" />
                    <div v-else class="icon-class text-center">
                      <v-icon size="40">mdi-domain</v-icon>
                    </div>
                  </div>
                  <div class="company-title text-left pl-4">
                    <h4>{{ company.company }}
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
                    @click="addCompany(company, index)"> <v-icon color="#0D9648">mdi-plus</v-icon></v-btn>
                </div>
              </div>
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
            <div class="companies-list">
              <div class="d-flex align-center justify-space-between list-company pa-4"
                v-for="(list, index) in salesRepsList" v-if="user.id != list.objectID" :key="index">
                <div class="comapny-data d-flex align-center">
                  <div class="company-img">
                    <img v-if="!list.image" :src="require('@/assets/images/chat/chatUser.png')">
                    <img v-else :src="list.image" width="48px" height="48px">
                  </div>
                  <div class="company-title text-left pl-4">
                    <h4>{{ list.firstName }} {{ list.lastName }}</h4>
                    <p class="mb-0">{{ list.company }}
                      <span v-if="hasOfsPremiumReps(list)">
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
          </v-tab-item>
          <v-tab-item value="serviceCategory">
            <div class="available-search d-flex justify-space-between align-center mt-5 px-4">

            </div>

            <div class="companies-list">
              <div>
                <div class="d-flex align-center justify-space-between list-company pa-4"
                  v-for="(company, index) in companiesList" v-if="user.company.id != company.id" :key="index">
                  <div class="comapny-data d-flex align-center">
                    <div class="company-img">
                      <img v-if="company.image" class="image-class" :src="company.image" />

                      <div v-else class="icon-class text-center">
                        <v-icon size="40">mdi-domain</v-icon>
                      </div>
                    </div>
                    <div class="company-title text-left pl-4">
                      <h4>{{ company.company }}
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
                      @click="addServiceCompany(company, index)"> <v-icon color="#0D9648">mdi-plus</v-icon></v-btn>
                  </div>
                </div>
              </div>
              <div class="text-center no-data-supplier" v-if="companiesList.length === 0">Supplier Company not
                found!</div>
            </div>
          </v-tab-item>
        </v-tabs-items>
      </v-col>

      <v-col cols="12" class="invited-data available-data" :class="[categories ? 'col-sm-3' : 'col-sm-6']">
        <div class="d-flex justify-space-between align-center pl-4 py-4 invited-head">
          <div>
            <h4 class="mb-0 black--text font-weight-bold">Invited Suppliers</h4>
          </div>
        </div>
        <div>

          <div class="companies-list">

            <template v-for="(company, index) in repsInvited">
              <div class="d-flex align-center justify-space-between list-company pa-4" v-if="!company.companyId"
                :key="index">
                <div class="comapny-data d-flex align-center">
                  <div class="company-img">
                    <img v-if="company.image" class="image-class" :src="company.image" />

                    <div v-else class="icon-class text-center">
                      <v-icon size="40">mdi-domain</v-icon>
                    </div>
                  </div>
                  <div class="company-title text-left pl-4">
                    <h4>{{ company.company }}
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
                <div class="add-company" v-if="checkIntent(company.objectID) !== 'intended'">
                  <v-btn color="rgba(243, 35, 73, 0.1)" tile min-width="32px" height="32" class="pa-0" elevation="0"
                    @click="removeCompany(company, index)"> <v-icon color="#F32349">mdi-minus</v-icon></v-btn>
                </div>
              </div>
              <div class="d-flex align-center justify-space-between list-company pa-4" v-if="company.companyId"
                :key="index">
                <div class="comapny-data d-flex align-center">
                  <div class="company-img">
                    <div class="avatar-image text-center" v-if="!company.image">
                      <img :src="require('@/assets/images/chat/chatUser.png')">
                    </div>
                    <div class="avatar-image text-center" v-else>
                      <img :src="company.image" width="48px" height="48px">
                    </div>
                  </div>
                  <div class="company-title text-left pl-4">
                    <h4>{{ company.firstName }} {{ company.lastName }}</h4>
                    <p class="mb-0">{{ company.company }}
                      <span v-if="hasOfsPremiumReps(company)">
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
                    <img v-if="company.image" class="image-class" :src="company.image" />

                    <div v-else class="icon-class text-center">
                      <v-icon size="40">mdi-domain</v-icon>
                    </div>
                  </div>
                  <div class="company-title text-left pl-4">
                    <h4>{{ company.firstName }} {{ company.lastName }} </h4>
                    <p class="mb-0">{{ company.company }}</p>

                  </div>
                </div>
                <div class="add-company" v-if="checkIntent(company.objectID) !== 'intended'">
                  <v-btn color="rgba(243, 35, 73, 0.1)" tile min-width="32px" height="32" class="pa-0" elevation="0"
                    @click="removeNewSup(company, index)"> <v-icon color="#F32349">mdi-minus</v-icon></v-btn>
                </div>
              </div>
            </template>
          </div>
        </div>
      </v-col>
    </v-row>

    <v-row justify="center" align="center" no-gutters class="mt-5">
      <div class="align-center justify-center">
        <v-dialog v-model="supplierDialog" width="800">
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
              <v-form ref="form" v-model="valid" lazy-validation>
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
                <VuePhoneNumberInput :border-radius="8" size="lg" error-color="#F32349" valid-color="#9E9E9E"
                  v-model="phoneNumber" :translations="translations" :required="true" :loader="hasLoaderActive"
                  :error="!getPhoneInfo.valid && getCounter > 1" @update="onUpdate" />
                <div class="phone-class" v-if="!getPhoneInfo.valid && getCounter > 1">
                  {{ getPhoneInfo.message }}</div>
                <label class="d-block text-left font-weight-bold mb-2 mt-6">Email<span
                    class="required-class">*</span></label>
                <v-text-field v-model="email" :rules="emailRules" placeholder="example@email.com" required
                  outlined></v-text-field>

                <v-btn :loading="loadingInvite" :disabled="!valid || !getPhoneInfo.valid" color="#0D9648"
                  class="mr-4 text-capitalize white--text font-weight-bold" @click="validate" large height="50px"
                  min-width="220px">
                  Send Invite
                </v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-dialog>
        <v-btn color="#0D9648" elevation="0" :loading="getSupplierLoading" :disabled="getSupplierLoading" height="56px"
          width="220px" large class="white--text text-capitalize font-weight-bold mt-5 mb-5 save-btn"
          @click="saveSuppliers">Save
          Changes</v-btn>
      </div>
    </v-row>
  </div>
</template>
<script>
import VuePhoneNumberInput from 'vue-phone-number-input';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';
import _ from 'lodash';
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    VuePhoneNumberInput,
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
        (v) => /^\w+([.+_-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid',
      ],
      phoneNumber: '',
      translations: {
        countrySelectorLabel: 'Country Code',
        countrySelectorError: 'Choose country',
        phoneNumberLabel: 'Phone Number',
        example: 'Example',
      },
      hasLoaderActive: false,
      results: {},
      categories: false,
      searchCompany: '',
      basinFilter: 'All',
      repsInvited: [],
      companySearch: '',
      companyBasin: 'All',
      user: '',
      parsedSelectedBasin: 'all',
      parsedSelectedCompanyBasin: 'all',
      newRepsInvited: [],
      inviteCount: 1,
      counter: 0,
      phoneInfo: {
        valid: true,
        message: '',
      },
      supplierLoading: false,
    };
  },
  computed: {
    ...mapGetters(['newSupplier', 'userInfo', 'loadingInvite']),
    allCategories() {
      setTimeout(() => this.loading = false, 500);
      return _.orderBy(this.$store.getters.categories, 'orderNumber', 'asc');
    },
    getPhoneInfo() {
      return this.phoneInfo;
    },
    getSupplierLoading() {
      return this.supplierLoading;
    },
    bidDetail() {
      return this.$store.getters.bidViewData;
    },
    salesRepsList() {
      const unique = this.$store.getters.salesRepsList ? this.$store.getters.salesRepsList.filter((el) => !this.repsInvited.find((item) => {
        if (item.id) return el.companyId === item.id;
        if (item.companyId) return el.companyId === item.companyId;
        return el.companyId === item.objectID;
      }) && el.company !== this.user.company.company) : [];

      return [...new Map(unique.map((item) => [item.companyId, item])).values()];
    },
    companiesList() {
      let idType = '';
      let unique;
      if (this.$store.getters.companiesList && this.$store.getters.companiesList.length) {
        if (this.repsInvited.length) {
          unique = this.$store.getters.companiesList ? this.$store.getters.companiesList.filter((el) => !this.repsInvited.find((item) => {
            if (el.objectID) {
              idType = 'objectID';
              if (item.id) return el.objectID === item.id;
              if (item.companyId) return el.objectID === item.companyId;
              return el.objectID === item.objectID;
            } if (el.id) {
              idType = 'id';
              if (item.id) return el.id === item.id;
              if (item.companyId) return el.id === item.companyId;
              return el.id === item.objectID;
            }
          }) && el.company !== this.userInfo.company.company) : [];

          return idType === 'id' ? [...new Map(unique.map((item) => [item.id, item])).values()] : [...new Map(unique.map((item) => [item.objectID, item])).values()];
        }
        this.$store.getters.companiesList.forEach((el) => {
          if (el.objectID) {
            idType = 'objectID';
          } if (el.id) {
            idType = 'id';
          }
        });

        return idType === 'id' ? [...new Map(this.$store.getters.companiesList.map((item) => [item.id, item])).values()] : [...new Map(this.$store.getters.companiesList.map((item) => [item.objectID, item])).values()];
      }

      return [];
    },
    serviceCompanies() {
      return this.$store.getters.serviceCompaniesList.sort((a, b) => {
        const aHasOfsPremium = a.contracts.some((contract) => contract.contractType === 'ofs-premium');
        if (aHasOfsPremium) {
          return -1;
        }
        return 1;
      });
    },
    filteredEntries() {
      if (this.bidDetail.bidData.invitedSuppliers !== '' && this.bidDetail.bidData.invitedSuppliers !== null && this.bidDetail.bidData.invitedSuppliers !== undefined) {
        if (this.inviteCount === 1 && this.$store.getters.companiesList) {
          const inviteData = this.$store.getters.companiesList ? this.$store.getters.companiesList.filter((el) => this.bidDetail.bidData.invitedSuppliers.find((supplier) => supplier.id === el.objectID)) : [];
          this.repsInvited = inviteData.sort((a, b) => {
            const aHasOfsPremium = a.contracts.some((contract) => contract.contractType === 'ofs-premium');
            if (aHasOfsPremium) {
              return -1;
            }
            return 1;
          });
        }
      }
    },
    newSupplierFiltered() {
      if (this.bidDetail.bidData.invitedNewSuppliers) {
        if (this.inviteCount == 1) {
          this.newRepsInvited = this.bidDetail.bidData.invitedNewSuppliers;
        }
      }
    },
    getCounter() {
      return this.counter;
    },
    getBidAllIntend() {
      return this.$store.getters.bidAllIntend;
    },
  },
  methods: {
    ...mapActions(['getCategories', 'getSalesReps', 'getCompanyInfo', 'searchByCompany', 'getCompanyByServices', 'inviteNewSupplier', 'inviteSupplierToBid']),
    async saveSuppliers() {
      const invitedSuppliers = [];
      const invitedNewSuppliers = [];
      this.supplierLoading = true;

      this.repsInvited.forEach((el) => {
        if (el.id) {
          invitedSuppliers.push(el.id);
        } else if (el.companyId) {
          invitedSuppliers.push(el.companyId);
        } else {
          invitedSuppliers.push(el.objectID);
        }
      });

      this.newRepsInvited.forEach((el) => invitedNewSuppliers.push(el.id));

      await this.inviteSupplierToBid({
        userId: this.user.id,
        bidId: this.bidDetail.bidData.id,
        invitedSuppliers,
        invitedNewSuppliers,
        serial: this.bidDetail.bidData.serial,
        company: this.user.company.company,
      });

      this.supplierLoading = false;

      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    onUpdate(payload) {
      this.counter++;
      this.phoneInfo.valid = payload.isValid;

      if (payload.phoneNumber && !payload.isValid) {
        this.phoneInfo.message = 'Invalid Phone number format';
      }

      if (!payload.phoneNumber && !payload.isValid) {
        this.phoneInfo.message = 'Phone number is required';
      }

      this.results = payload.formattedNumber;
    },
    async validate() {
      if (this.results === '') {
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
      };

      if (this.$refs.form.validate() && this.getPhoneInfo.valid) {
        try {
          const user = await this.inviteNewSupplier(supplier);
          this.supplierDialog = false;
          this.newRepsInvited.push(user);
          this.$store.commit('setInvitedNewSuppliers', this.newRepsInvited);
          this.$refs.form.reset();
          this.loadingInvite = false;
          this.phoneNumber = '';
          this.phoneInfo = {
            valid: true,
            message: '',
          };
          this.counter = 0;
          this.valid = false;
          this.results = '';
        } catch (error) {
          console.log(error);
        }
      }
    },
    hideCategories() {
      this.categories = false;
    },
    subCategories(subCats) {
      return _.orderBy(subCats, 'orderNumber', 'asc');
    },
    getSales() {
      if (this.basinFilter === 'All') {
        this.parsedSelectedBasin = 'all';
      } else {
        this.parsedSelectedBasin = this.basinFilter;
      }
      this.getSalesReps({ query: this.searchCompany, basin: this.parsedSelectedBasin });
    },
    viewCompany(id, name) {
      this.getCompanyInfo({ id, name });
    },
    addReps(list, index) {
      this.repsInvited.push(list);
      this.inviteCount = 2;
      this.$store.commit('spliceSalesRepsList', index);
      const unique = [...new Map(this.repsInvited.map((m) => [m.company, m])).values()];

      this.$store.commit('setInvitedSuppliersData', unique);
    },
    removeReps(list, index) {
      this.$store.commit('pushSalesRepsList', list);
      this.repsInvited.splice(index, 1);
      this.inviteCount = 2;
      this.$store.commit('setInvitedSuppliersData', this.repsInvited);
    },
    getCompanies() {
      if (this.companyBasin === 'All') {
        this.parsedSelectedCompanyBasin = 'all';
      } else {
        this.parsedSelectedCompanyBasin = this.companyBasin;
      }
      this.searchByCompany({ query: this.companySearch, basin: this.parsedSelectedCompanyBasin });
    },
    getByCategory(category) {
      this.getCompanyByServices(category);
    },
    addCompany(company, index) {
      this.repsInvited.push(company);
      this.inviteCount = 2;
      this.$store.commit('spliceCompanies', index);
      const unique = [...new Map(this.repsInvited.map((m) => [m.company, m])).values()];
      this.$store.commit('setInvitedSuppliersData', unique);
    },
    addServiceCompany(company, index) {
      this.repsInvited.push(company);
      this.inviteCount = 2;
      this.$store.commit('spliceCompanies', index);
      const unique = [...new Map(this.repsInvited.map((m) => [m.company, m])).values()];
      this.$store.commit('setInvitedSuppliersData', unique);
    },
    removeCompany(company, index) {
      this.repsInvited.splice(index, 1);
      this.inviteCount = 2;
      this.$store.commit('pushCompanies', company);
      this.$store.commit('setInvitedSuppliersData', this.repsInvited);
    },
    removeNewSup(company, index) {
      this.newRepsInvited.splice(index, 1);
      this.inviteCount = 2;
      this.$store.commit('setInvitedNewSuppliers', this.newRepsInvited);
    },
    hasOfsPremium(supplier) {
      return supplier.contracts.some((contract) => contract.contractType === 'ofs-premium');
    },
    hasOfsPremiumReps(supplier) {
      return supplier.contracts.some((contract) => contract === 'ofs-premium');
    },
    checkIntent(id) {
      let result = 'neither';
      const intent = this.getBidAllIntend;
      if (intent && id) {
        intent.forEach((el) => {
          if (el.companyId === id && el.answer === 'true') {
            result = 'intended';
          }
          if (el.companyId === id && el.answer === 'false') {
            result = 'not-intended';
          }
        });
      }
      return result;
    },
  },
  beforeMount() {
    this.user = this.$store.getters.userInfo;
  },
  mounted() {
    this.filteredEntries;
    this.newSupplierFiltered;
  },
};
</script>
