<template>
  <v-col
    class="catgeory-module ofsSupplier-module white pa-0 pa-sm-3 pl-sm-0 pb-sm-0"
    :class="[
      showSideBar ? 'col-md-9 col-12 col-sm-7' : 'mid-content-collapse',
      activityPanel ? 'd-sm-block' : 'd-md-block',
    ]"
    v-show="!activityPanel"
  >
    <div class="mid-content">
      <div class="content-section fill-height">
        <v-container class="px-sm-0">
          <v-row justify="center">
            <v-col cols="12" md="12">
              <div class="category-list">
                <div class="d-flex justify-space-between px-4">
                  <h1 class="text-left service-title mb-8">
                    {{ allcompanies.category.name }}
                  </h1>
                  <div class="category-list__searchBox">
                    <v-text-field
                      v-model="searchCompany"
                      prepend-inner-icon="search"
                      placeholder="Search here..."
                      single-line
                      outlined
                      min-height="40px"
                      min-width="100%"
                      hide-details
                    ></v-text-field>
                  </div>
                </div>
                <div class="d-flex align-center tabs-header mb-3 px-4">
                  <v-tabs v-model="tab" hide-slider class="service-tabs">
                    <v-tab
                      v-for="item in items"
                      :key="item"
                      @click="getByBasin(item)"
                    >
                      <span class="text-capitalize">{{ item }}</span>
                    </v-tab>
                  </v-tabs>
                </div>
                <v-tabs-items v-model="tab">
                  <v-tab-item v-for="item in items" :key="item">
                    <v-simple-table dense class="company-table mb-12">
                      <template v-slot:default>
                        <thead>
                          <tr class="py-4 px-6">
                            <th class="pl-6">Companies</th>
                            <th>HQ Location</th>
                            <th>Employees</th>
                            <th>Field Locations</th>
                            <th>Account Contacts</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="company in allcompanies.companies" :key="company.id">
                            <td class="pl-6">
                              <span class="text-decoration-none company-link"
                                ><router-link class="text-decoration-none" :to="company.slug ? '/company/'+company.slug: '' ">{{ company.company }}</router-link></span
                              >
                            </td>
                            <td>
                              <span v-if="!company.companyHq">No location</span
                              ><span v-else>{{ company.companyHq }}</span>
                            </td>
                            <td>
                              <span v-if="!company.employees">Not Added</span
                              ><span v-else>{{ company.employees }}</span>
                            </td>
                            <td>
                              <span v-if="!company.companyLocations"
                                >0</span
                              ><span v-else
                                >{{
                              company.companyLocations.length
                            }}</span
                              >
                            </td>
                            <td>
                              <span v-if="!company.accountContacts"
                                >0</span
                              ><span v-else>{{
                                company.accountContacts.length
                              }}</span>
                            </td>
                            <td>
                              <span
                                class="text-decoration-none company-link"
                                ><router-link class="text-decoration-none" :to="company.slug ? '/company/'+company.slug: '' ">View Details</router-link></span
                              >
                            </td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </v-tab-item>
                </v-tabs-items>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </div>
  </v-col>
</template>
<script>
import _ from "lodash";
import { mapActions } from "vuex";
import Navbar from "../../components/Layout/Navbar.vue";
import LeftSidebar from "../../components/Layout/Dashboard/LeftSidebar.vue";

export default {
  name: "SupplierListing",
  components: {
    Navbar,
    LeftSidebar,
  },

  data() {
    return {
      tab: null,
      searchCompany: "",
      page: 1,
      items: [
        "all",
        "Gulf Coast",
        "Northeast",
        "Rockies",
        "Mid-Con",
        "Permian",
        "Arklatex",
        "Offshore",
        "Other",
      ],
      cateSlug: '',
    };
  },
  computed: {
    showSideBar() {
      return this.$store.getters.g_sideBarOpen;
    },
    activityPanel() {
      return this.$store.getters.g_activityPanel;
    },
    allcompanies() {
      if (this.searchCompany) {
        return this.$store.getters.serviceCompanies.data.filter((companies) =>
          this.searchCompany
            .toLowerCase()
            .split(" ")
            .every((v) => companies.company.toLowerCase().includes(v))
        );
      }
      return this.$store.getters.serviceCompanies.data;
    },
  },
  watch: {
    searchCompany: _.debounce(function () {
      return this.$store.getters.serviceCompanies.data.filter((companies) =>
        this.searchCompany
          .toLowerCase()
          .split(" ")
          .every((v) => companies.company.toLowerCase().includes(v))
      );
    }, 500),
  },
  methods: {
    ...mapActions([
      "getCompanyInfo",
      "getCompanyByBasin",
      "getSupplierMainService",
      "getSupplierCompanyByservice",
    ]),
    viewCompany(id, name) {
      this.getCompanyInfo({ id, name });
    },
    getByBasin(basin) {
      this.getCompanyByBasin({ basin, slug: this.$route.fullPath.split('/').pop() });
    },
  },
  mounted() {
    document.title = "Categories - BidOut";
    this.getCompanyByBasin({ basin: 'all', slug: this.$route.fullPath.split('/').pop() });
  },
};
</script>
