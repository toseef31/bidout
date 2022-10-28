<template>
  <section class="fill-height catgeory-module white">
    <NavbarBeforeLogin></NavbarBeforeLogin>
    <v-container>
      <v-main class="mb-16">
        <v-row justify="center">
          <v-col cols="12" md="12">
            <div class="category-list">
              <h1 class="text-left service-title mb-8">{{ companyName }}</h1>
              <div class="d-flex align-center tabs-header">
                <v-tabs v-model="tab" hide-slider class="service-tabs mb-5">
                  <v-tab
                    v-for="item in items"
                    :key="item"
                    @click="getByBasin(item)"
                  >
                    <span class="text-capitalize">{{ item }}</span>
                  </v-tab>
                </v-tabs>
                <div class="category-list__searchBox">
                  <v-text-field
                    v-model="filterCompany"
                    prepend-inner-icon="search"
                    placeholder="Search here..."
                    single-line
                    outlined
                    height="56"
                    hide-details
                  ></v-text-field>
                </div>
              </div>
              <v-tabs-items v-model="tab">
                <v-tab-item v-for="item in items" :key="item">
                  <v-simple-table dense class="company-table mb-12">
                    <template v-slot:default>
                      <thead>
                        <tr class="py-4 px-8">
                          <th class="pl-8">Companies</th>
                          <th>HQ Location</th>
                          <th>Employees</th>
                          <th>Field Locations</th>
                          <th>Account Contacts</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="company in allcompanies" :key="company.id">
                          <td class="pl-8">
                            <span
                              @click="
                                viewPublicCompany(company.id, company.company)
                              "
                              class="text-decoration-none company-link"
                              >{{ company.company }}
                            </span>
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
                            <span v-if="!company.companyLocations">0</span
                            ><span v-else>{{
                              company.companyLocations.length
                            }}</span>
                          </td>
                          <td>
                            <span v-if="!company.accountContacts">0</span
                            ><span v-else>{{
                              company.accountContacts.length
                            }}</span>
                          </td>
                          <td>
                            <span
                              @click="
                                viewPublicCompany(company.id, company.company)
                              "
                              class="text-decoration-none company-link"
                              >View Details</span
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
      </v-main>
    </v-container>
    <Footer></Footer>
  </section>
</template>
<script>
import _ from "lodash";
import { mapActions } from "vuex";
import NavbarBeforeLogin from "../../components/Layout/NavbarBeforeLogin.vue";
import Footer from "../../components/Layout/Footer.vue";

export default {
  name: "ModuleSelection",
  components: {
    NavbarBeforeLogin,
    Footer,
  },

  data() {
    return {
      tab: null,
      filterCompany: "",
      page: 1,
      items: [
        "All",
        "Gulf Coast",
        "Northwest",
        "Rockies",
        "Mid-Con",
        "Permian",
        "Arklatex",
        "Offshore",
        "Other",
      ],
      headers: [
        {
          text: "Companies",
          align: "start",
          value: "companies",
        },
        { text: "HQ Location", value: "hQLocation" },
        { text: "Employees", value: "employees" },
        { text: "Field Locations", value: "fieldLocations" },
        { text: "Account Contacts", value: "accountContacts" },
        { text: "", value: "link" },
      ],
    };
  },
  computed: {
    allcompanies() {
      if (this.filterCompany) {
        return this.$store.getters.serviceCompanies.data.filter((companies) =>
          this.filterCompany
            .toLowerCase()
            .split(" ")
            .every((v) => companies.company.toLowerCase().includes(v))
        );
      }
      return this.$store.getters.serviceCompanies.data;
    },
    companyName() {
      return this.$store.getters.serviceCompanies.name;
    },
  },
  methods: {
    ...mapActions([
      "getPublicCompanyInfo",
      "searchCompany",
      "getCompanyByBasin",
    ]),
    viewPublicCompany(id, name) {
      this.getPublicCompanyInfo({ id, name });
    },
    companySearch() {
      this.searchCompany();
    },
    getByBasin(basin) {
      if (basin == "All") {
        return this.$store.getters.serviceCompanies.data;
      }
      const data = {
        basin,
        id: this.$store.getters.serviceCompanies.id,
      };
      this.getCompanyByBasin(data);
    },
  },
  mounted() {
    document.title = "Categories - BidOut";
  },
};
</script>
<style scoped lang="scss"></style>
