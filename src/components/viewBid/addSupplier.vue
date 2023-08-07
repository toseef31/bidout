<template>
  <div class="">
    <v-row class="supplier-row fill-height" no-gutters v-if="!getFetchSupplierLoading">
      <v-col sm="3" v-if="categories" class="category-col">
        <v-list class="pt-0">
          <v-list-group v-for="(category, index) in sortedCategories" :key="index" active-class="black--text">
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title v-text="category.category.name" class="text-left"></v-list-item-title>
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
              <v-tab class="text-capitalize font-weight-bold" href="#companyName" @click="hideCategories('name')">Company
                Name</v-tab>
              <v-tab class="text-capitalize font-weight-bold" href="#salesRep" @click="hideCategories">Sales
                Rep</v-tab>
              <v-tab class="text-capitalize font-weight-bold" href="#serviceCategory"
                @click="companySearch = ''; categories = !categories;">Service Category</v-tab>
            </v-tabs>
          </div>
        </div>
        <v-tabs-items v-model="availableSuppl">
          <v-tab-item value="companyName">
            <div class="available-search d-flex justify-space-between align-center mt-5 px-4">
              <div>

                <v-text-field type="text" hide-details outlined placeholder="Search" prepend-inner-icon="mdi-magnify"
                  v-model="companySearch" @keyup=" getCompanies(false)">
                </v-text-field>
              </div>
              <div class="d-flex align-center">
                <label class="input-label black--text pr-2 font-weight-bold">Basin</label>
                <v-select rounded hide-details outlined class="available-select text-capitalize" :items="availableSearch"
                  width="150px" v-model="companyBasin" min-height="28px" @change=" getCompanies(false)"></v-select>
              </div>
            </div>
            <div class="companies-list" v-if="!getCompanyLoading">
              <div class="d-flex align-center justify-space-between list-company pa-4"
                v-for="(               company, index               ) in                companiesList               "
                v-if="user.company._id !== company._id" :key="index">
                <div class="comapny-data d-flex align-center">
                  <div class="company-img">
                    <img v-if="company.image" class="image-class" :src="company.image" />
                    <div v-else class="icon-class text-center">
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
                    @click=" addCompany(company)"> <v-icon color="#0D9648">mdi-plus</v-icon></v-btn>
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
                v-for="(               list, index               ) in                salesRepsList               "
                v-if="user._id !== list._id" :key="index">
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
                    @click=" addReps(list, index)"> <v-icon color="#0D9648">mdi-plus</v-icon></v-btn>
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
                  v-for="(               company, index               ) in                companiesList               "
                  v-if="user.company._id !== company._id" :key="index">
                  <div class="comapny-data d-flex align-center">
                    <div class="company-img">
                      <img v-if="company.image" class="image-class" :src="company.image" />

                      <div v-else class="icon-class text-center">
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
                      @click=" addServiceCompany(company)"> <v-icon color="#0D9648">mdi-plus</v-icon></v-btn>
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

            <template v-for="(               company, index               ) in                repsInvited               ">
              <div class="d-flex align-center justify-space-between list-company pa-4" v-if="company.companyName"
                :key="index">
                <div class="comapny-data d-flex align-center">
                  <div class="company-img">
                    <img v-if="company.image" class="image-class" :src="company.image" />

                    <div v-else class="icon-class text-center">
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
                    @click=" removeCompany(company, index)"> <v-icon color="#F32349">mdi-minus</v-icon></v-btn>
                </div>
              </div>
              <div class="d-flex align-center justify-space-between list-company pa-4" v-if="!company.companyName"
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

                <div class="add-company" v-if="checkIntent(company._id) !== 'intended'">
                  <v-btn color="rgba(243, 35, 73, 0.1)" tile min-width="32px" height="32" class="pa-0" elevation="0"
                    @click=" removeReps(company, index)"> <v-icon color="#F32349">mdi-minus</v-icon></v-btn>
                </div>
              </div>
            </template>
            <template
              v-for="(               company               ) in                newSupplierFiltered               ">
              <div class="d-flex align-center justify-space-between list-company pa-4">
                <div class="comapny-data d-flex align-center">
                  <div class="company-img">
                    <div class="icon-class text-center">
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
                    @click=" removeNewSup(company)"> <v-icon color="#F32349">mdi-minus</v-icon></v-btn>
                </div>
              </div>
            </template>
          </div>
        </div>
      </v-col>
    </v-row>

    <div fill-height align="center" justify="center" v-if="getFetchSupplierLoading">
      <v-col cols="12">
        <v-progress-circular v-if="getFetchSupplierLoading" :width="3" color="green" indeterminate></v-progress-circular>
      </v-col>
    </div>

    <v-row justify="center" align="center" no-gutters class="mt-5" v-if="!getFetchSupplierLoading">
      <div class="align-center justify-center">

        <v-btn color="rgba(13, 150, 72, 0.1)" elevation="0" height="56px" width="220px" large
          class="text-capitalize font-weight-bold mt-5 mb-5 invite-btn mr-5" @click="$emit('toggle-dialog', true)">Invite
          New
          Supplier </v-btn>
        <v-btn color="#0D9648" elevation="0" :loading="getSupplierLoading" :disabled="getSupplierLoading" height="56px"
          width="220px" large class="white--text text-capitalize font-weight-bold mt-5 mb-5 save-btn"
          @click="saveSuppliers">Save
          Changes</v-btn>
      </div>
    </v-row>
  </div>
</template>
<script>
import _ from 'lodash';
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      availableSearch: ['All', 'Gulf Coast', 'Northeast', 'Rockies', 'Mid-Con', 'Permian', 'Arklatex', 'Offshore', 'Other'],
      availableSuppl: null,
      supplierDialog: false,
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
      supplierLoading: false,
      fetchSupplierLoading: false,
      companyLoading: false,
      salesRepLoading: false,
    };
  },
  props: ['data'],
  watch: {
    data(el) {
      this.newRepsInvited.push(el);
    },
  },
  computed: {
    ...mapGetters(['userInfo']),
    sortedCategories() {
      const categories = [...this.$store.getters.categories];
      categories.sort((a, b) => a.category.orderNumber - b.category.orderNumber);
      return categories;
    },
    getSupplierLoading() {
      return this.supplierLoading;
    },
    bidDetail() {
      return this.$store.getters.bidViewData;
    },
    getFetchSupplierLoading() {
      return this.fetchSupplierLoading;
    },
    salesRepsList() {
      const unique = this.$store.getters.salesRepsList ? this.$store.getters.salesRepsList.filter((el) => !this.repsInvited.find((item) =>  el._id === item._id
      ) && el.company._id !== this.userInfo.company._id) : [];

      return [...new Map(unique.map((item) => [item._id, item])).values()];
    },
    companiesList() {
      let unique;

      if (this.$store.getters.companiesList && this.$store.getters.companiesList.length) {
        if (this.repsInvited.length) {
          unique = this.$store.getters.companiesList ? this.$store.getters.companiesList.filter((el) => !this.repsInvited.find((item) =>  el._id === item._id) && el._id !== this.user.company._id) : [];

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
    // eslint-disable-next-line vue/return-in-computed-property
    filteredEntries() {
      if (this.bidDetail.bidData.invitedSuppliers && this.bidDetail.bidData.invitedSuppliers.length) {
        let inviteData = [];

        inviteData = [...this.bidDetail.bidData.invitedSuppliers];

        this.repsInvited = inviteData;
      }
    },
    newSupplierFiltered() {
      if (this.newRepsInvited.length) {
        this.newRepsInvited = [...new Map(this.newRepsInvited.map((item) => [item._id, item])).values()];
        return this.newRepsInvited;
      }
      return [];
    },
    getBidAllIntend() {
      return this.$store.getters.bidAllIntend;
    },
    getCompanyLoading() {
      return this.companyLoading;
    },
    getSalesRepLoading() {
      return this.salesRepLoading;
    },
  },
  methods: {
    ...mapActions(['getCategories', 'getSalesReps', 'getCompanyInfo', 'searchByCompany', 'getCompanyByServices', 'inviteSupplierToBid']),
    async saveSuppliers() {
      let invitedSuppliers = [];
      const invitedNewSuppliers = [];
      this.supplierLoading = true;

      this.repsInvited.forEach((el) => {
        if (el.company) {
          invitedSuppliers.push(el.company._id);
        } else {
          invitedSuppliers.push(el._id);
        }
      });

      invitedSuppliers = [...new Set(invitedSuppliers)];

      this.newRepsInvited.forEach((el) => invitedNewSuppliers.push(el._id));

      await this.inviteSupplierToBid({
        userId: this.user._id,
        bidId: this.bidDetail.bidData._id,
        invitedSuppliers,
        invitedNewSuppliers,
        serial: this.bidDetail.bidData.serial,
        company: this.user.company,
      });

      this.supplierLoading = false;
    },
    hideCategories(name) {
      this.categories = false;
      this.companyBasin = 'All';
      if (name) {
        this.companySearch = '';
        this.getCompanies(false);
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
      this.repsInvited.push(list);
      this.$store.commit('spliceSalesRepsList', index);
      const unique = [...new Map(this.repsInvited.map((m) => [m._id, m])).values()];

      this.$store.commit('setInvitedSuppliersData', unique);
    },
    removeReps(list, index) {
      this.$store.commit('pushSalesRepsList', list);
      this.repsInvited.splice(index, 1);
      this.$store.commit('setInvitedSuppliersData', this.repsInvited);
    },
    async getCompanies(isLoading) {
      this.companyLoading = true;
      !isLoading ? '' : this.fetchSupplierLoading = true;
      if (this.companyBasin === 'All') {
        this.parsedSelectedCompanyBasin = 'all';
      } else {
        this.parsedSelectedCompanyBasin = this.companyBasin;
      }
      await this.searchByCompany({ query: this.companySearch, basin: this.parsedSelectedCompanyBasin });
      this.fetchSupplierLoading = false;
      this.companyLoading = false;
    },
    getByCategory(category) {
      this.getCompanyByServices(category);
    },
    addCompany(company) {
      this.repsInvited.push(company);
      this.$store.commit('spliceCompanies', company);
      const unique = [...new Map(this.repsInvited.map((m) => [m._id, m])).values()];
      this.$store.commit('setInvitedSuppliersData', unique);
    },
    addServiceCompany(company) {
      this.repsInvited.push(company);
      this.$store.commit('spliceCompanies', company);
      const unique = [...new Map(this.repsInvited.map((m) => [m._id, m])).values()];
      this.$store.commit('setInvitedSuppliersData', unique);
    },
    removeCompany(company, index) {
      this.repsInvited.splice(index, 1);
      this.$store.commit('pushCompanies', company);
      this.$store.commit('setInvitedSuppliersData', this.repsInvited);
    },
    removeNewSup(company) {
      const index = this.newRepsInvited.findIndex((el) => el._id === company._id);
      if (index !== -1) {
        this.newRepsInvited.splice(index, 1);
      }
    },
    hasOfsPremium(supplier) {
      return supplier.contracts.some((contract) => contract.contractType === 'ofs-premium');
    },
    checkIntent(id) {
      let result = 'neither';
      const intent = this.getBidAllIntend;
      if (intent && id) {
        intent.forEach((el) => {
          if (el.company === id && (el.answer === 'true' || el.answer === true)) {
            result = 'intended';
          }
          if (el.company === id && (el.answer === 'false' || el.answer === false)) {
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
  async mounted() {
    this.companySearch = '';
    await this.getCompanies(true);
    await this.getCategories();
    await this.getSales();

    const invitedData = this.$store.getters.invitedNewSuppliers;
    if (invitedData && invitedData.length) {
      this.newRepsInvited = this.newRepsInvited.concat(invitedData);
    }

    this.filteredEntries;
    this.$store.commit('setEmailExistSuccess', false);
    this.$store.commit('setInvitedSupplierEmailExists', false);
  },
};
</script>
