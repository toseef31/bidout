<template>
  <v-row class="catgeory-module ofsSupplier-module white pa-0 ma-0">
    <v-col class="pa-0 pr-sm-3" :class="[
      showSideBar ? 'col-md-12 col-12 col-sm-12' : 'mid-content-collapse',
      activityPanel ? 'd-sm-block' : 'd-md-block',
    ]" v-show="!activityPanel">
    <div class="get-topHeader d-flex">
        <v-container fill-height>
          <v-row align="center" justify="center" no-gutters>
            <v-col class="text-left" cols="12">
              <h3 class="font-weight-bolder white--text pl-5 mt-n5 mb-2">
                <router-link to="/view-ofs-suppliers"><v-icon color="#fff" class="pr-2">mdi-arrow-left</v-icon></router-link>OFS Provider Directory
              </h3>
              <h1 class="text-left service-title white--text pl-6">
                {{ categoryName }}
              </h1>
            </v-col>
          </v-row>
        </v-container>
      </div>
      <div class="mid-content">
        <div class="content-section fill-height">
          <v-container class="px-sm-0 mt-n10">
            <v-row justify="center">
              <v-col cols="12" md="8" class="pl-sm-5 pr-sm-5">
                <v-form class="search-form">
                  <v-row>
                    <v-col cols="8" md="8">
                      <v-text-field label="Search for a service or company ..." single-line outlined type="text" min-height="40px" min-width="100%" placeholder="Search for a service or company"
                          v-model="searchCompany" prepend-inner-icon="mdi-magnify" background-color="#fff" >
                      </v-text-field>
                    </v-col>
                    <v-col cols="4" md="4">
                      <v-select
                        background-color="#fff"
                        v-model="searchKey"
                        :items="items"
                        outlined
                        @change="getByBasin"
                        class="text-capitalize"
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-form>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col cols="12" md="12">
                <div class="category-list px-10">
                  <!-- <div class="d-flex justify-space-between px-4">
                    <h1 class="text-left service-title mb-8">
                      {{ categoryName }}
                    </h1>
                    <div class="category-list__searchBox">
                      <v-text-field v-model="searchCompany" prepend-inner-icon="search" placeholder="Search here..."
                        single-line outlined min-height="40px" min-width="100%" hide-details></v-text-field>
                    </div>
                  </div>
                  <div class="d-flex align-center tabs-header mb-3 px-4">
                    <v-tabs v-model="tab" hide-slider class="service-tabs">
                      <v-tab v-for="item in items" :key="item" @click="getByBasin(item)">
                        <span class="text-capitalize">{{ item }}</span>
                      </v-tab>
                    </v-tabs>
                  </div> -->
                  <v-tabs-items v-model="tab">
                    <v-tab-item v-for="item in items" :key="item">
                      <v-simple-table dense v-if="!showLoading" class="company-table mb-12">
                        <template v-slot:default>
                          <thead>
                            <tr class="py-4 px-6">
                              <th class="pl-4">Companies</th>
                              <th>HQ Location</th>
                              <th>Employees</th>
                              <th>Field Locations</th>
                              <th>Account Contacts</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="company in allcompanies" :key="company._id">
                              <td class="pl-4 w-25">
                                <router-link class="text-decoration-none d-flex"
                                  :to="company.slug ? '/company/' + company.slug : ''">
                                  <div class="text-truncate pr-1">
                                    {{ company.companyName }}
                                  </div>

                                  <span v-if="hasOfsPremium(company)">
                                    <v-tooltip top>
                                      <template v-slot:activator="{ on, attrs }">
                                        <v-icon color="#0D9647" size="16px" v-bind="attrs"
                                          v-on="on">mdi-check-decagram</v-icon>
                                      </template>
                                      <span>Premium Service Provider</span>
                                    </v-tooltip>
                                  </span>
                                </router-link>
                              </td>
                              <td class="view-class">
                                <span v-if="!company.companyHq">No location</span><span v-else>{{ company.companyHqCity
                                }},
                                  {{ company.companyHqState }}
                                  {{ company.companyHqCountry }}</span>
                              </td>
                              <td class="view-class">
                                <span v-if="!company.employees">Not Added</span><span v-else>{{ company.employees
                                }}</span>
                              </td>
                              <td>
                                <span v-if="!company.companyLocations">0</span><span v-else>{{
                                  company.companyLocations.length }}</span>
                              </td>
                              <td>
                                <span v-if="!company.accountContacts">0</span><span v-else>{{
                                  company.accountContacts.length }}</span>
                              </td>
                              <td class="view-class">
                                <span class="text-decoration-none company-link"><router-link class="text-decoration-none"
                                    :to="company.slug ? '/company/' + company.slug : ''"><v-icon color="#0D9648">mdi-eye-outline</v-icon></router-link></span>
                              </td>
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                      <v-row fill-height align="center" class="fill-height mt-5" v-if="showLoading">
                        <v-col cols="12">
                          <v-progress-circular :width="3" color="green" indeterminate></v-progress-circular>
                        </v-col>
                      </v-row>
                    </v-tab-item>
                  </v-tabs-items>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </div>
    </v-col>
  </v-row>
</template>
<script>
import _ from 'lodash';
import { mapActions } from 'vuex';
import Navbar from '../../components/Layout/Navbar.vue';
import LeftSidebar from '../../components/Layout/Dashboard/LeftSidebar.vue';

export default {
  name: 'SupplierListing',
  components: {
    Navbar,
    LeftSidebar,
  },

  data() {
    return {
      tab: 1,
      searchCompany: '',
      page: 1,
      items: [
        'all',
        'Gulf Coast',
        'Northeast',
        'Rockies',
        'Mid-Con',
        'Permian',
        'Arklatex',
        'Offshore',
        'Other',
      ],
      cateSlug: '',
      searchKey: 'all',
    };
  },
  computed: {
    showSideBar() {
      return this.$store.getters.g_sideBarOpen;
    },
    activityPanel() {
      return this.$store.getters.g_activityPanel;
    },
    categoryName() {
      const categories = [...this.$store.getters.categories];

      let name;

      if (this.$route.params.name) {
        categories.forEach((el) => {
          el.subCategories.forEach((item) => {
            if (this.$route.params.name === item.slug) name = item.name;
          });
        });
      } else {
        categories.forEach((el) => {
          if (el.category.slug === this.$route.params.slug) name = el.category.name;
        });
      }

      return name;
    },
    allcompanies() {
      if (this.searchCompany) {
        return this.$store.getters.serviceCompanies.filter((comp) => this.searchCompany
          .toLowerCase()
          .split(' ')
          .every((v) => comp.companyName.toLowerCase().includes(v)));
      }
      return this.$store.getters.serviceCompanies;
    },
    showLoading() {
      return this.$store.getters.ofsLoader;
    },
  },
  watch: {
    searchCompany: _.debounce(function () {
      return this.$store.getters.serviceCompanies.filter((comp) => this.searchCompany
        .toLowerCase()
        .split(' ')
        .every((v) => comp.companyName.toLowerCase().includes(v)));
    }, 500),
  },
  methods: {
    ...mapActions([
      'getCompanyByBasin',
      'getSupplierMainService',
      'getSupplierCompanyByservice',
      'getCategories',
    ]),
    getByBasin(basin) {
      // console.log('basin', this.searchKey);
      if (this.$route.params.name) {
      this.cateSlug = this.$route.params.name;
    } else {
      this.cateSlug = this.$route.params.slug;
    }
      this.getCompanyByBasin({ basin: this.searchKey, slug: this.cateSlug });
    },
    hasOfsPremium(supplier) {
      return supplier.contracts.some((contract) => contract.contractType === 'ofs-premium');
    },
  },
  async created() {
    await this.getCategories();
    if (this.$route.params.name) {
      this.cateSlug = this.$route.params.name;
    } else {
      this.cateSlug = this.$route.params.slug;
    }
    await this.getCompanyByBasin({ basin: 'all', slug: this.cateSlug });
  },
  mounted() {
    document.title = 'Categories - BidOut';
  },
};
</script>
