<template>
  <div
    class="companyProfile-module inner-Company fill-height d-flex justify-center align-center"
    v-if="loading"
  >
    <v-progress-circular :width="3" color="green" indeterminate></v-progress-circular>
  </div>
  <v-row class="companyProfile-module inner-Company pa-0 ma-0" v-else>
    <v-col
      class=""
      :class="[
        showSideBar ? 'col-md-12 col-12 col-sm-12' : 'mid-content-collapse',
        activityPanel ? 'd-sm-block' : 'd-md-block',
      ]"
      v-show="!activityPanel"
    >
      <div class="mid-content">
        <v-container class="pa-sm-10 pa-4">
          <div class="top-section d-flex justify-space-between pa-sm-2 pa-4 pl-sm-0 pr-sm-0">
            <div>
              <h4>{{ companyData.companyData.companyName }} Page</h4>
            </div>
            <template>
              <div class="progress-section">
                <div class="d-flex progress-heading">
                  <p class="mb-0">
                    Page Progress: <strong>{{ moduleWeight }}%</strong>
                  </p>
                  <small>{{ modulesCounts }}/12 modules</small>
                </div>
                <v-progress-linear
                  color="#0D9648"
                  rounded
                  :value="moduleWeight"
                  max-width="100%"
                ></v-progress-linear>
              </div>
            </template>
          </div>
        </v-container>
        <div class="content-section" v-if="companyData && companyData.companyData">
          <v-row class="mx-0">
            <v-col cols="12" sm="12" md="12" class="d-sm-block px-0 py-sm-10">
              <div class="manage-sections">
                <div class="company-form">
                  <company-logo></company-logo>
                  <v-list class="d-flex main-menu-list pb-0 ma-sm-10 mt-sm-0">
                    <v-list-item-group
                      v-model="selectedItem"
                      color="#0D1139"
                      class="d-flex"
                      active-class="active"
                    >
                    <v-list-item class="inline-list-item" v-for="(item, index) in sections" :key="index" @click="scrollToSection(index)">
                      <v-list-item-title active-class="active">{{ item }}</v-list-item-title>
                    </v-list-item>
                    </v-list-item-group>
                  </v-list>
                  <v-container class="pa-sm-10 pt-sm-0 pa-4 pb-sm-0" id="About Company">
                    <label class="d-block text-left main-label my-10">About Company</label>
                    <v-row>
                      <v-col cols="12" sm="6">
                        <v-row>
                          <v-col cols="12">
                            <label class="d-block text-left input-label"
                          >Company's Name</label>
                            <v-text-field
                              placeholder="Company's Name"
                              v-model="profileName"
                              single-line
                              outlined
                              hide-details
                            ></v-text-field>
                          </v-col>
                        </v-row>
                        <label class="d-block text-left main-label my-6">Additional Company Names or Aliases</label>
                        <v-row>
                          <v-col cols="12" md="9">
                            <label class="d-block text-left input-label"
                          >Main Company Name</label>
                            <v-text-field
                              placeholder="Company's Name"
                              v-model="additionalName"
                              single-line
                              outlined
                              hide-details
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" md="3" class="mt-6 d-none d-md-block">
                            <v-btn
                              color="#0D9648"
                              large
                              class="text-capitalize white--text"
                              width="115px"
                              height="56px"
                              :loading="saveInfoLoading"
                              @click="updateBasic"
                              >Add</v-btn
                            >
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" md="12">
                            <div class="d-flex justify-space-between align-center grey lighten-5 pa-4 rounded-lg">
                              <div class="title">
                                <h5 class="sub-heading-h5">PATE</h5>
                              </div>
                              <div class="action">
                                <v-icon color="#0D9648" size="20">mdi-pencil-outline</v-icon>
                                <v-icon color="#F32349" size="20">mdi-trash-can-outline</v-icon>
                              </div>
                            </div>
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <label class="d-block text-left input-label"
                          >Main Corporate Summary</label
                        >
                        <v-textarea
                          outlined
                          name="input-7-4"
                          v-model="profileSummary"
                          hide-details
                          cols="8"
                          rows="10"
                        ></v-textarea>
                      </v-col>
                    </v-row>
                    <v-row class="d-flex d-md-none">
                      <v-col cols="12" sm="12">
                        <v-btn
                          color="#0D9648"
                          large
                          class="text-capitalize white--text"
                          width="176px"
                          height="54px"
                          :loading="saveInfoLoading"
                          @click="updateBasic"
                          >Save Info</v-btn
                        >
                      </v-col>
                    </v-row>
                  </v-container>
                  <v-divider class="my-10"></v-divider>
                  <key-facts id="Key Facts"></key-facts>
                  <v-divider class="my-10"></v-divider>
                  <v-container class="pa-sm-10 py-sm-0 pa-4" id="Services">
                    <v-row class="services-title-row">
                      <v-col cols="12" md="6">
                        <div class="text-left">
                          <label class="d-block text-left main-label">Services Portfolio</label>
                          <span><font color="#F91E1E">4/5 services available</font> <font color="#000">on your plan</font></span>
                        </div>
                      </v-col>
                      <v-col cols="12" md="6" class="rounded-lg">
                        <div class="d-flex justify-space-between align-center">
                          <div class="d-flex align-center pr-7 text-left">
                            <v-icon color="#0D9648" size="20">mdi-check-decagram</v-icon>
                            <span class="pl-2">Upgrade to a add unlimited services & receive bid leads!</span>
                          </div>
                          <v-btn color="#0D9648" height="48px" width="160px" class="white--text text-capitalize">Upgrade Now</v-btn>
                        </div>
                      </v-col>
                    </v-row>
                    <v-row class="mt-5 mt-md-10">
                      <v-col cols="12" sm="6">
                        <div class="grey lighten-5 rounded-lg pa-4">
                          <label class="d-block text-left main-label mb-5"
                            >Available Services</label
                          >
                          <div class="service-cate">
                            <div class="px-5 mt-4">
                              <v-text-field
                                placeholder="Search ..."
                                single-line
                                outlined
                                hide-details
                                min-height="40px"
                                prepend-inner-icon="mdi-magnify"
                                v-model="searchService"
                              ></v-text-field>
                            </div>

                            <v-list class="px-2">
                              <template v-for="category in allcategories">
                                <v-list-group>
                                  <template v-slot:activator>
                                    <v-list-item-content>
                                      <v-list-item-title
                                        v-text="category.category.name"
                                        class="text-left font-weight-bold"
                                      ></v-list-item-title>
                                    </v-list-item-content>
                                  </template>
                                  <template>
                                    <v-list-item
                                      min-height="30px"
                                      prepend-inner-icon="mdi-close"
                                      v-for="subcategory in subCategoriesAlign(
                                        category.subCategories
                                      )"
                                      :key="subcategory._id"
                                    >
                                      <template>
                                        <v-list-item-content class="py-0 pl-4">
                                          <v-list-item-title class="text-left"
                                            >{{ subcategory.name
                                            }}<v-icon
                                              class="ml-5"
                                              small
                                              @click="addService(subcategory)"
                                              >mdi-plus-circle-outline</v-icon
                                            ></v-list-item-title
                                          >
                                        </v-list-item-content>
                                      </template>
                                    </v-list-item>
                                  </template>
                                </v-list-group>
                              </template>
                            </v-list>
                          </div>
                        </div>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <div class="grey lighten-5 rounded-lg pa-4">
                          <label class="d-block text-left main-label mb-5"
                            >Selected Services ({{ companyData.companyData.services ? companyData.companyData.services.length : '0'  }})</label
                          >
                          <div class="subservice-cate service-cate">
                            <div class="px-5 mt-4">
                              <v-text-field
                                placeholder="Search for a service"
                                single-line
                                outlined
                                hide-details
                                min-height="40px"
                                prepend-inner-icon="mdi-magnify"
                                v-model="searchSelectedService"
                              ></v-text-field>
                            </div>
                            <v-list class="px-5" :expand="true">
                              
                              <v-list-group
                                v-for="(category, i) in groupingServices(companyData.companyData.services)"
                                v-if="
                                  category.subcategories &&
                                  category.subcategories.length > 0
                                "
                                :value="true"
                                :key="i"
                              >
                                <template v-slot:activator>
                                  <v-list-item-content>
                                    <v-list-item-title
                                      v-text="category.parentCategory.name"
                                      class="text-left font-weight-bold black--text"
                                    ></v-list-item-title>
                                  </v-list-item-content>
                                </template>
                                <v-list-item
                                  min-height="30px"
                                  v-for="(subcategory, index) in category.subcategories"
                                  :key="subcategory.subid"
                                >
                                  <v-list-item-content class="py-0 pl-4">
                                    <v-list-item-title class="text-left"
                                      >
                                      {{ subcategory.name }}
                                      <v-icon
                                      color="#F32349"
                                        class="ml-5"
                                        small
                                        @click="deleteService(subcategory)"
                                        >mdi-trash-can-outline</v-icon
                                      ></v-list-item-title
                                    >
                                  </v-list-item-content>
                                </v-list-item>
                              </v-list-group>
                            </v-list>
                          </div>
                        </div>
                      </v-col>
                    </v-row>
                  </v-container>
                  <v-divider class="my-10"></v-divider>
                  <v-container class="pa-sm-10 py-sm-0 pa-4" id="Basins">
                    <label class="d-block text-left main-label">Basins</label>
                    <v-row>
                      <v-col
                        cols="4"
                        sm="2"
                        v-for="(basin, index) in region"
                        :key="index"
                      >
                        <v-checkbox
                          v-model="basins"
                          :label="basin"
                          color="#0d9648"
                          :value="basin"
                          @change="addBasin"
                          hide-details
                          :disabled="loadingBasin"
                        ></v-checkbox>
                        <label class="d-none">{{ basinsDatass }}</label>
                      </v-col>
                    </v-row>
                  </v-container>
                  <v-divider class="my-10"></v-divider>
                  <service-locations id="Locations"></service-locations>
                  <v-divider class="my-10"></v-divider>
                  <company-videos id="Videos"></company-videos>
                  <v-divider class="my-10"></v-divider>
                  <company-documents id="Documents"></company-documents>
                  <v-divider class="my-10"></v-divider>
                  <corporate-news></corporate-news>
                  <v-divider class="my-10"></v-divider>
                  <excutive-leadership id="Leadership"></excutive-leadership>
                  <v-divider class="my-10"></v-divider>
                  <ESGComponent id="ESG" />
                  <v-divider class="my-10"></v-divider>
                  <account-contacts id="Key Facts"></account-contacts>
                </div>
              </div>
            </v-col>
          </v-row>
        </div>
        <div
          class="content-section fill-height d-flex justify-center align-center"
          v-else
        >
          <v-progress-circular
            :width="3"
            color="green"
            indeterminate
          ></v-progress-circular>
        </div>
      </div>
    </v-col>
  </v-row>
</template>
<script
  async
  defer
  id="map-api-script"
  src="https://maps.googleapis.com/maps/api/js?key=%VITE_GOOGLE_MAP%&libraries=places&callback=Function.prototype"
></script>
<script>
import Navbar from "../components/Layout/Navbar.vue";
import LeftSidebar from "../components/Layout/Dashboard/LeftSidebar.vue";
import RightSidebar from "../components/Layout/Dashboard/RightSidebar.vue";
import ESGComponent from "../components/CompanyProfile/ESGComponent.vue";
import KeyFacts from "../components/CompanyProfile/KeyFacts.vue";
import ExcutiveLeadership from "../components/CompanyProfile/ExcutiveLeadership.vue";
import ServiceLocations from "../components/CompanyProfile/ServiceLocations.vue";
import CorporateNews from "../components/CompanyProfile/CorporateNews.vue";
import CompanyDocuments from "../components/CompanyProfile/CompanyDocuments.vue";
import CompanyVideos from "../components/CompanyProfile/CompanyVideos.vue";
import CompanyLogo from "../components/CompanyProfile/CompanyLogo.vue";
import AccountContacts from "../components/CompanyProfile/AccountContacts.vue";
import _ from "lodash";
import { mapActions, mapMutations, mapGetters } from "vuex";
export default {
  name: "CompanyProfile",
  components: {
    Navbar,
    LeftSidebar,
    RightSidebar,
    ESGComponent,
    KeyFacts,
    ExcutiveLeadership,
    ServiceLocations,
    CorporateNews,
    CompanyDocuments,
    CompanyVideos,
    CompanyLogo,
    AccountContacts,
  },

  data() {
    return {
      loader: true,
      region: [
        "Gulf Coast",
        "Northeast",
        "Rockies",
        "Mid-Con",
        "Permian",
        "Arklatex",
        "Offshore",
        "Other",
      ],
      basins: [],
      basinsData: [],
      profileName: "",
      profileSummary: "",
      services: "",
      companyService: "",
      companyService: [],
      subservices: "",
      searchService: "",
      searchSelectedService: "",
      servData: [],
      additionalName: "",
      basinLoader: null,
      sections: ["About Company", "Key Facts", "Services", "Basins", "Locations","Contacts", "Videos", "Documents", "Leadership", "ESG"],
    };
  },
  computed: {
    ...mapGetters(["saveInfoLoading", "manageCompanyError"]),
    showSideBar() {
      return this.$store.getters.g_sideBarOpen;
    },
    activityPanel() {
      return this.$store.getters.g_activityPanel;
    },
    allcategories() {
      if (this.$store.getters.categories) {
        if (this.searchService) {
          return _.orderBy(
            this.$store.getters.categories.filter((item) => {
              const searchTerm = this.searchService.toLowerCase();
              const categoryMatch = item.category.name.toLowerCase().includes(searchTerm);
              const subcategoryMatch = item.subCategories.some((subcategory) =>
                subcategory.name.toLowerCase().includes(searchTerm)
              );
              return categoryMatch || subcategoryMatch;
            })
          );
        } else {
          const categories = [...this.$store.getters.categories];
          categories.sort((a, b) => a.category.orderNumber - b.category.orderNumber);
          return categories;
          // return _.orderBy(this.$store.getters.categories, "orderNumber", "asc");
        }
      } else {
        return [];
      }
    },
    companyData() {
      if (this.$store.getters.companyData) {
        this.profileName = this.$store.getters.companyData.companyData.companyName;
        this.profileSummary = this.$store.getters.companyData.companyData.overview;
        return this.$store.getters.companyData;
      } else {
        return [];
      }
    },
    basinsDatass() {
      if (!this.$store.getters.companyData.companyData.basins) {
        this.basins = [];
        return this.basins;
      } else {
        if (
          this.$store.getters.companyData.companyData.basins.length > 0 ||
          this.$store.getters.companyData.companyData.basins.length == 0
        ) {
          this.basins = this.$store.getters.companyData.companyData.basins;
          return this.basins;
        } else {
          this.basins = [];
          return this.basins;
        }
      }
    },
    serviceSubId() {
      if (this.$store.getters.companyData.companyData.services) {
        let servc = this.$store.getters.companyData.companyData.services.filter(
          (item3) => {
            this.servData.push({ id: item3.id });
          }
        );
        return this.servData;
      }
    },
    moduleWeight() {
      const sum = this.$store.getters.moduleWeight.reduce((accumulator, object) => {
        return accumulator + object.weight;
      }, 0);
      return sum;
    },
    modulesCounts() {
      return this.$store.getters.moduleWeight.length;
    },
    subCategories() {
      return this.$store.getters.subCategories;
    },
    loadingBasin() {
      return this.$store.getters.loadingBasin;
    },
    loading() {
      return this.$store.getters.pageLoader;
    },
    loadingBasic() {
      return this.$store.getters.loadingBasic;
    },
  },
  watch: {
    manageCompanyError(message) {
      if (message) {
        this.$toasted.show(message, {
          position: "top-center",
          duration: 5000,
          className: "error-toast",
          type: "error",
        });
      }
    },
  },
  methods: {
    ...mapActions([
      "getCompany",
      "getCategories",
      "getSubCategories",
      "updateBasicProfile",
      "addCompanyService",
      "addCompanyBasins",
    ]),
    ...mapMutations(["setBasinLoading"]),
    async updateBasic() {
      if (this.profileName) {
        var data = {
          companyId: this.$store.getters.userInfo.company._id,
          userId: this.$store.getters.userInfo.id,
          profileName: this.profileName,
          profileSummary: this.profileSummary,
        };
        await this.updateBasicProfile(data);
      } else {
        return this.$toasted.show(`Please fill out the company name.`, {
          class: "error-toast",
          type: "error",
          duration: 5000,
          position: "top-center",
        });
      }
    },
    getAllCategories() {
      this.getCategories();
    },
    subCategoriesAlign(subCats) {
      return _.orderBy(subCats, "orderNumber", "asc");
    },
    addService(subcate) {
      if (this.$store.getters.companyData.companyData.services) {
        this.companyService = this.$store.getters.companyData.companyData.services;
      }
      this.companyService.push(subcate);
      // let result = this.companyService.map((companyServ) => companyServ);
        var result = this.companyService.reduce((unique, o) => {
          if(!unique.some(obj => obj._id === o._id)) {
            unique.push(o);
          }
          return unique;
      },[]);
      this.addCompanyService({
        companyId: this.$store.getters.userInfo.company._id,
        subCategories: result,
      });
      this.services = "";
      this.subservices = "";
    },
    deleteService(item) {
      if (this.$store.getters.companyData.companyData.services) {
        this.companyService = this.$store.getters.companyData.companyData.services;
      }
      for (var i = 0; i < this.companyService.length; i++) {
        if (this.companyService[i]._id == item._id) {
          this.companyService.splice(i, 1);
        }
      }
      this.addCompanyService({
        companyId: this.$store.getters.userInfo.company._id,
        subCategories: this.companyService,
      });
    },
    addBasin() {
      if (this.$store.getters.companyData.basins) {
        this.basinsData = this.$store.getters.companyData.companyData.basins;
        this.basins = this.$store.getters.companyData.companyData.basins;
      }
      this.basinsData.push(this.basins);
      if (!this.$store.getters.companyData.companyData.basins) {
        var data = {
          companyId: this.$store.getters.userInfo.company._id,
          basins: this.basins,
        };
        this.addCompanyBasins(data);
        this.$store.commit("setBasinLoading", true);
      } else {
        if (
          this.$store.getters.companyData.companyData.basins.length == 0 ||
          this.$store.getters.companyData.companyData.basins.length > 0
        ) {
          var data = {
            companyId: this.$store.getters.userInfo.company._id,
            basins: this.basins,
          };
          this.addCompanyBasins(data);
          this.$store.commit("setBasinLoading", true);
        }
      }
    },
    groupingServices(response){
      const groupedCategories = {};

      response.forEach((subcategory) => {
        const parentId = subcategory.serviceCategory._id;
        
        if (!groupedCategories[parentId]) {
          groupedCategories[parentId] = {
            parentCategory: subcategory.serviceCategory,
            subcategories: []
          };
        }
        groupedCategories[parentId].subcategories.push(subcategory);
      });
      const groupedResult = Object.values(groupedCategories);
      if (this.searchSelectedService){
        return groupedResult.filter((item) => {
          const searchTerm = this.searchSelectedService.toLowerCase();
          const categoryMatch = item.parentCategory.name.toLowerCase().includes(searchTerm);
          const subcategoryMatch = item.subcategories.some((subcategory) =>
            subcategory.name.toLowerCase().includes(searchTerm)
          );
          return categoryMatch || subcategoryMatch;
        })
      } else {
        return groupedResult;

      }
    },
    getSubCate(catId) {
      this.getSubCategories(catId);
    },
    scrollToSection(index) {
      const element = document.getElementById(this.sections[index]);
      this.activeIndex = index;
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        this.drawer = false; // Close the drawer after clicking a section link
      }
    },
  },
  async created() {
    let mapScpManage = "map-api-script";
    let mapAlreadyAttached = !!document.getElementById(mapScpManage);
    if (!mapAlreadyAttached) {
      let mapScript = document.createElement("script");
      mapScript.setAttribute("defer", "defer");
      mapScript.id = mapScpManage;
      await mapScript.setAttribute(
        "src",
        "https://maps.googleapis.com/maps/api/js?key=" +
          import.meta.env.VITE_GOOGLE_MAP +
          "&libraries=places&callback=Function.prototype"
      );
      document.head.appendChild(mapScript);
    }
    await this.getCategories();
  },
  mounted() {
    document.title = "Company Profile - BidOut";
    this.getCompany(this.$store.getters.userInfo.company._id);
  },
};
</script>
<style scoped lang="scss"></style>
