<template>
  <v-row fill-height align="center" v-if="loading">
    <v-col cols="12">
      <v-progress-circular :width="3" color="green" indeterminate></v-progress-circular>
    </v-col>
  </v-row>
  <v-row class="ofs-module ofsSupplier-module ofsSupplierHome-module white pa-0 ma-0" v-else>
    <v-col class="pa-0 pr-sm-3"
      :class="[showSideBar ? 'col-md-12 col-12 col-sm-12' : 'mid-content-collapse', activityPanel ? 'd-sm-block' : 'd-md-block']"
      v-show="!activityPanel">
      <div class="mid-content">
        <div class="content-section fill-height">
          <v-container class="px-sm-8">
            <v-row>
              <v-col cols="12" md="12">
                <VueSlickCarousel v-bind="settings" class="company-slider" v-if="premiumCompanies.length > 0">
                  <div class="slide-item" v-for="(premium, index) in premiumCompanies" :key="index">
                    <router-link :to="premium.slug ? '/company/' + premium.slug : ''" class="text-decoration-none">
                      <div class="slide-img d-flex align-center justify-center flex-column">
                        <img v-if="premium.image" :src="premium.image" class="mx-auto">
                        <img v-else :src="require('@/assets/images/ofs/no-image.jpg')">
                      </div>
                      <div class="slide-caption">
                        <h3 class="font-weight-bold">{{ premium.companyName }}</h3>
                      </div>
                    </router-link>
                  </div>
                </VueSlickCarousel>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col cols="12" md="12" class="pl-sm-5 pr-sm-5">
                <v-form class="search-form">
                  <v-text-field label="Search here ..." single-line outlined type="text" placeholder="Search here"
                  v-click-outside="closeList"
                    v-model="searchCompany" prepend-inner-icon="mdi-magnify" @input="getSupplierList"
                    @focus="hideList = true" :loading="getSupplierLoading"
                    color="#0D9648" loader-height="3">
                    <template v-slot:append>
                      <v-icon size="25" @click="clearCompany" class="clear-icon ml-2" v-if="searchCompany !== ''"
                        color="#0D9648">mdi-close</v-icon>
                    </template>
                  </v-text-field>
                  <div v-if="hideList === true && searchCompany && searchCompany.length >= 3">
                    <v-list class="company-list" v-if="companies.length">
                      <template v-for="(company) in companies">
                        <router-link :to="company.slug ? '/company/' + company.slug : ''" class="text-decoration-none">
                          <v-list-item class="py-1" :key="company._id">

                            <v-list-item-avatar max-height="31px" max-width="88px" width="88px" tile>
                              <v-img v-if="company.image" :src="company.image" height="auto"></v-img>
                              <v-img v-else :src="`/images/companies/no-image.jpg`" height="auto"></v-img>
                            </v-list-item-avatar>
                            <v-list-item-content>
                              <div class="text-left">{{ company.companyName }}
                                <span v-if="hasOfsPremium(company)">
                                  <v-tooltip top>
                                    <template v-slot:activator="{ on, attrs }">
                                      <v-icon color="#0D9647" size="16px" v-bind="attrs"
                                        v-on="on">mdi-check-decagram</v-icon>
                                    </template>
                                    <span>Premium Service Provider</span>
                                  </v-tooltip>
                                </span>
                              </div>
                            </v-list-item-content>
                            <v-list-item-action>
                              <v-list-item-action-text class="font-weight-bold"><router-link
                                  :to="company.slug ? '/company/' + company.slug : ''">View
                                  Profile</router-link></v-list-item-action-text>
                            </v-list-item-action>
                          </v-list-item>
                        </router-link>
                      </template>
                    </v-list>
                    <v-list class="company-list " v-if="!companies.length && !getSupplierLoading">
                      <v-list-item class="first">
                        <v-list-item-content>
                          <v-list-item-title class="text-center">
                            No company available!</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>

                    </v-list>
                  </div>
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
              <v-col cols="12" md="6" v-for="category in sortedCategories" :key="category.category._id" class="pl-sm-5 pr-sm-5">
                <div class="ofs-listing text-left">
                  <h1 class="font-weight-bold mb-3 text-break"><router-link :to="'/ofs-supplier/' + category.category.slug"
                      class="text-decoration-none">{{ category.category.name }}</router-link></h1>
                  <p>
                    <span v-for="(subcategry, index) in subCategories(category.subCategories)" :key="index"
                      class="sub-catLink">
                      <router-link :to="'/ofs-supplier/' + category.category.slug + '/' + subcategry.slug"
                        class="text-decoration-none">
                        <font class="font-weight-bold">{{ subcategry.name }} </font>
                        <font class="font-weight-medium">({{ subcategry.spCount }}) </font>
                      </router-link>
                    </span>
                  </p>
                </div>
              </v-col>
            </v-row>
            <v-row justify="center" class="mt-16">
              <v-col cols="12" md="12" class="pl-sm-5 pr-sm-5">
                <div class="ofs-bottom-section text-left pl-2">
                  <router-link to="/manage-module" class="text-decoration-none">
                    <div class="ofs-bottom-content d-flex justify-space-between">
                      <div class="ml-5 ml-sm-5 my-5 my-sm-12">
                        <h1 class="mb-4 font-weight-medium white--text">OFS DIRECTORY</h1>
                        <h1 class="white--text font-weight-bold mb-0 title">Get listed today<br>
                          For free</h1>
                      </div>
                      <div class="mt-5 mt-sm-5 mr-5 mr-sm-8">
                        <img :src="require('@/assets/images/green-black.png')" width="102px">
                      </div>
                    </div>
                  </router-link>
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
import Navbar from '../../components/Layout/Navbar.vue';
import LeftSidebar from '../../components/Layout/Dashboard/LeftSidebar.vue';
import VueSlickCarousel from 'vue-slick-carousel';
import 'vue-slick-carousel/dist/vue-slick-carousel.css';
// optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css';
import _ from 'lodash';
import { mapActions } from 'vuex';

export default {
  name: 'ModuleSelection',
  components: {
    Navbar,
    LeftSidebar,
    VueSlickCarousel,
  },

  data() {
    return {
      searchCompany: '',
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
        'prev-icon': 'mdi-arrow-left',
        responsive: [
          {
            breakpoint: 1280,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true,
            },
          },
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              infinite: true,
              dots: true,
              arrows: true,
            },
          },
          {
            breakpoint: 950,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              infinite: true,
              dots: true,
              arrows: true,
            },
          },
          {
            breakpoint: 850,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: true,
              dots: true,
              arrows: true,
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
      hideList: false,
      supplierLoading: false
    };
  },
  directives: {
    'click-outside': {
      bind(el, binding, vnode) {
        el.clickOutsideEvent = function (event) {
          if (!(el == event.target || el.contains(event.target))) {
            vnode.context[binding.expression](event);
          }
        };
        document.body.addEventListener('click', el.clickOutsideEvent);
      },
      unbind(el) {
        document.body.removeEventListener('click', el.clickOutsideEvent);
      },
    },
  },
  computed: {
    showSideBar() {
      return this.$store.getters.g_sideBarOpen;
    },
    activityPanel() {
      return this.$store.getters.g_activityPanel;
    },
    allcategories() {
      setTimeout(() => this.loading = false, 500);
      return _.orderBy(this.$store.getters.categories, 'orderNumber', 'asc');
    },
    sortedCategories() {
      setTimeout(() => this.loading = false, 500);
      const categories = [...this.$store.getters.categories];
      categories.sort((a, b) => a.category.orderNumber - b.category.orderNumber);
      return categories;
    },
    companies() {
      this.hideList = true;
      return this.$store.getters.supplier.sort((a, b) => {
        const aHasOfsPremium = a.contracts.some((contract) => contract.contractType === 'ofs-premium');
        const bHasOfsPremium = b.contracts.some((contract) => contract.contractType === 'ofs-premium');
        if (aHasOfsPremium === bHasOfsPremium) {
          return 0;
        }
        return aHasOfsPremium ? -1 : 1;
      });
    },
    premiumCompanies() {
      if (this.$store.getters.premiumCompanies) {
        return this.$store.getters.premiumCompanies;
      }
      return [];
    },
    getSupplierLoading() {
      return this.supplierLoading
    }
  },
  methods: {
    ...mapActions(['getCategories', 'getCompanyByservice', 'getSupplierCompanyByservice', 'getSupplierMainService', 'searchSupplier', 'getCompanyInfo', 'getPremiumCompanies']),
    getAllCategories() {
      this.getCategories();
    },
    subCategories(subCats) {
      return _.orderBy(subCats, 'orderNumber', 'asc');
    },
    searchSuppliersList() {
      if (this.searchCompany.length > 1) {
        this.searchSupplier(this.searchCompany);
      }
    },
    getSupplierList: _.debounce(async function () {
      this.supplierLoading = true
      if (this.searchCompany && this.searchCompany !== '' && this.searchCompany.length < 3) {
        this.hideList = false;
      }
      else if (this.searchCompany && this.searchCompany !== '' && this.searchCompany.length >= 3) {
        this.hideList = true
        await this.searchSupplier(this.searchCompany);
      }
      this.supplierLoading = false
    }, 500),
    viewCompany(slug, name) {
      this.getCompanyInfo({ slug, name });
    },
    hasOfsPremium(supplier) {
      return supplier.contracts.some((contract) => contract.contractType === 'ofs-premium');
    },
    loader() {
      setTimeout(() => {
        this.loading = false;
      }, 100);
    },
    closeList() {
      this.hideList = false;
    },
    clearCompany() {
      this.searchCompany = ''
    }
  },
  mounted() {
    document.title = 'View OFS Supplier - BidOut';
    this.getCategories();
    this.getPremiumCompanies();
    this.loader();
  },
};
</script>
<style scoped lang="scss"></style>
