<template>
  <section class="fill-height ofs-module white">
    <NavbarBeforeLogin></NavbarBeforeLogin>
    <div class="get-topHeader d-flex">
      <v-container fill-height>
        <v-row align="center" justify="center" no-gutters>
          <v-col class="text-left" cols="12">
            <h1 class="font-weight-bolder white--text">
              OFS Provider Directory
            </h1>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <v-container>
      <v-main class="pt-0">
        <v-row fill-height align="center" v-if="pageLoader">
          <v-col cols="12">
            <v-progress-circular
              :width="3"
              color="green"
              indeterminate
            ></v-progress-circular>
          </v-col>
        </v-row>
        <v-row class="mt-n16" v-else>
          <v-col cols="12" md="12">
            <VueSlickCarousel
              v-bind="settings"
              class="company-slider"
              v-if="premiumCompanies && premiumCompanies.length > 0"
            >
              <div
                class="slide-item"
                v-for="premium in premiumCompanies"
              >
                <router-link :to="premium.slug ? '/company-profiles/'+premium.slug: '' " class="text-decoration-none">
                  <div
                    class="slide-img d-flex align-center justify-center flex-column"
                  >
                    <img
                      v-if="premium.image"
                      :src="premium.image"
                      class="mx-auto"
                    />
                    <img
                      v-else
                      :src="require('@/assets/images/ofs/no-image.jpg')"
                    />
                  </div>
                  <div class="slide-caption">
                    <h3 class="font-weight-bold">{{ premium.company }}</h3>
                  </div>
                </router-link>
              </div>
            </VueSlickCarousel>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="12" md="9">
            <v-form class="search-form">
              <v-row class="mt-8">
                <v-col cols="12" sm="12" text="left">
                  <v-text-field
                    label="Search here ..."
                    single-line
                    outlined
                    type="text"
                    placeholder="Search here"
                    v-model="searchCompany"
                    clearable
                    @keyup="getSupplierList"
                  >
                  </v-text-field>
                  <div v-if="hideList == true">
                    <v-list class="company-list">
                      <template v-for="(company, index) in companies">

                        <router-link :to="company.slug ? '/company-profiles/'+company.slug: '' " 
                          class="text-decoration-none"
                        >
                          <v-list-item
                            class="py-1"
                            :key="company.objectID"
                          >
                            <v-list-item-avatar
                              max-height="31px"
                              max-width="88px"
                              width="88px"
                              tile
                            >
                              <v-img
                                v-if="company.companyImage"
                                :src="company.companyImage"
                                height="auto"
                              ></v-img>
                              <v-img
                                v-else
                                :src="`/images/companies/no-image.jpg`"
                                height="auto"
                              ></v-img>
                            </v-list-item-avatar>
                            <v-list-item-content>
                              <v-list-item-title
                                
                                class="text-left"
                                >{{ company.company }}
                                <span v-if="hasOfsPremium(company)">
                                    <v-tooltip top>
                                      <template v-slot:activator="{ on, attrs }">
                                        <v-icon 
                                          color="#0D9647" 
                                          size="16px" 
                                          v-bind="attrs"
                                          v-on="on">mdi-check-decagram</v-icon>
                                      </template>
                                      <span>Premium Service Provider</span>
                                    </v-tooltip> 
                                  </span>
                              </v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-action>
                              <v-list-item-action-text
                                class="font-weight-bold"
                                
                                ><router-link :to="company.slug ? '/company-profiles/'+company.slug: '' "
                                  >View Profile</router-link
                                ></v-list-item-action-text
                              >
                            </v-list-item-action>
                          </v-list-item>
                        </router-link>
                      </template>
                    </v-list>
                  </div>
                </v-col>
              </v-row>
            </v-form>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="12" md="6" v-if="loading">
            <v-skeleton-loader type="heading, text"></v-skeleton-loader>
          </v-col>
          <v-col cols="12" md="6" v-if="loading">
            <v-skeleton-loader type="heading, text"></v-skeleton-loader>
          </v-col>
          <v-col cols="12" md="6" v-if="loading">
            <v-skeleton-loader type="heading, text"></v-skeleton-loader>
          </v-col>
          <v-col cols="12" md="6" v-if="loading">
            <v-skeleton-loader type="heading, text"></v-skeleton-loader>
          </v-col>
          <v-col
            cols="12"
            md="6"
            v-for="category in allcategories"
            :key="category.id"
          >
            <div class="ofs-listing text-left">
              <h1
                class="font-weight-bold mb-3 text-break"
                >
                <router-link :to="'/ofs-directory/'+category.slug" class="text-decoration-none">{{ category.name }}</router-link>
              </h1>
              <p>
                <span
                  v-for="subcategry in subCategories(category.subCategories)"
                  class="sub-catLink"
                >
                  <router-link :to="'/ofs-directory/'+category.slug+'/'+subcategry.slug" class="text-decoration-none"> 
                    <font class="font-weight-bold">{{ subcategry.name }} </font>
                    <font class="font-weight-medium"
                      >({{ subcategry.spCount }})
                    </font>
                  </router-link>
                </span>
              </p>
            </div>
          </v-col>
        </v-row>
        <v-row justify="center" class="mb-15 mt-16">
          <v-col cols="12" md="12">
            <div class="ofs-bottom-section text-left">
              <router-link to="/get-started" class="text-decoration-none">
                <div class="ofs-bottom-content d-flex justify-space-between">
                  <div class="ml-5 ml-sm-5 my-5 my-sm-12">
                    <h1 class="mb-4 font-weight-medium white--text">
                      OFS DIRECTORY
                    </h1>
                    <h1 class="white--text font-weight-bold mb-0 title">
                      Get listed today<br />
                      For free
                    </h1>
                  </div>
                  <div class="mt-5 mt-sm-5 mr-5 mr-sm-8">
                    <img
                      :src="require('@/assets/images/green-black.png')"
                      width="102px"
                    />
                  </div>
                </div>
              </router-link>
            </div>
          </v-col>
        </v-row>
      </v-main>
    </v-container>
    <Footer></Footer>
  </section>
</template>
<script>
import NavbarBeforeLogin from "../../components/Layout/NavbarBeforeLogin.vue";
import Footer from "../../components/Layout/Footer.vue";
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
import _ from "lodash";
import { mapActions } from "vuex";

export default {
  name: "ModuleSelection",
  components: {
    NavbarBeforeLogin,
    Footer,
    VueSlickCarousel,
  },

  data() {
    return {
      searchCompany: "",
      settings: {
        arrows: true,
        dots: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        touchThreshold: 5,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnDotsHover: true,
        pauseOnFocus: true,
        pauseOnHover: true,
        "prev-icon": "mdi-arrow-left",
        responsive: [
          {
            breakpoint: 950,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true,
              arrows: false,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2,
              arrows: false,
              dots: true,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows: false,
              dots: true,
            },
          },
        ],
      },
      loading: true,
      pageLoader: true,
      hideList: false,
    };
  },
  watch: {
    searchCompany: _.debounce(function () {
      if (this.searchCompany < 1) {
        this.hideList = false;
      }else{
        this.hideList = true;
      }
    }, 500),
  },
  computed: {
    allcategories() {
      setTimeout(() => (this.loading = false), 500);
      return _.orderBy(this.$store.getters.categories, "orderNumber", "asc");
    },
    companies() {
      this.hideList = true;
      if(this.$store.getters.supplier){
        return this.$store.getters.supplier.sort((a, b) => {
        let aHasOfsPremium = a.contracts.some(contract => contract.contractType === 'ofs-premium');
        let bHasOfsPremium = b.contracts.some(contract => contract.contractType === 'ofs-premium');
          if (aHasOfsPremium === bHasOfsPremium) {
            return 0;
          }
          return aHasOfsPremium ? -1 : 1;
        });
      }else{
        return [];
      }
      
    },
    premiumCompanies() {
      return this.$store.getters.premiumCompanies;
    },
  },
  methods: {
    ...mapActions([
      "getCategories",
      "getCompanyByservice",
      "getCompanyMainService",
      "searchSupplier",
      "getPublicCompanyInfo",
      "getPremiumCompanies",
    ]),
    getAllCategories() {
      this.getCategories();
    },
    subCategories(subCats) {
      return _.orderBy(subCats, "orderNumber", "asc");
    },
    searchSuppliersList(){
      if(this.searchCompany.length > 1){
        this.searchSupplier(this.searchCompany);
      }
    },
    getSupplierList: _.debounce(function() {
      this.searchSuppliersList();
    }, 1000),
    hasOfsPremium(supplier) {
      return supplier.contracts.some(contract => contract.contractType === 'ofs-premium');
    },
    loader() {
      setTimeout(() => {
        this.pageLoader = false;
      }, 100);
    },
  },
  beforeMount() {
    this.getPremiumCompanies();
  },
  mounted() {
    document.title = "OFS - BidOut";
    this.getCategories();
    this.getPremiumCompanies();
    this.loader();
  },
};
</script>
<style scoped lang="scss"></style>
