<template>
  <v-row fill-height align="center" v-if="loading">
    <v-col cols="12">
      <v-progress-circular :width="3" color="green" indeterminate ></v-progress-circular>
    </v-col>
  </v-row>
  <v-col class="ofs-module ofsSupplier-module white pa-0 pa-sm-3" :class="[ showSideBar ? 'col-md-9 col-12 col-sm-7' : 'mid-content-collapse', activityPanel ? 'd-sm-block' : 'd-md-block']" v-show="!activityPanel" v-else>
    <div class="mid-content">
      <div class="content-section fill-height">
        <v-container class="px-sm-8">
            <v-row>
              <v-col cols="12" md="12">
                <VueSlickCarousel v-bind="settings" class="company-slider" v-if="premiumCompanies.length > 0">
                  
                  <div class="slide-item" v-for="premium in premiumCompanies" @click="viewCompany(premium.id,premium.company)">
                    <div class="slide-img d-flex align-center justify-center flex-column">
                      <img v-if="premium.image"
                        :src="premium.image" class="mx-auto"
                      >
                      <img v-else :src="require('@/assets/images/ofs/no-image.jpg')">
                    </div>
                    <div class="slide-caption">
                      <h3 class="font-weight-bold">{{premium.company}}</h3>
                    </div>
                  </div>
                </VueSlickCarousel>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col cols="12" md="12" class="pl-sm-5 pr-sm-5">
                <v-form class="search-form">
                  <v-text-field label="Search here ..." single-line outlined type="text" placeholder="Search here" v-model="searchCompany" prepend-inner-icon="mdi-magnify" @keyup="getSupplierList">
                  </v-text-field>
                  <div v-if="hideList == true">
                    <v-list  class="company-list">
                      <template v-for="(company, index) in companies">
                        <router-link :to="'company/'+company.slug" class="text-decoration-none">
                          <v-list-item class="py-1"
                            :key="company.objectID"
                          >
                            <v-list-item-avatar max-height="31px" max-width="88px" width="88px" tile>
                              <v-img v-if="company.companyImage" :src="company.companyImage" height="auto"></v-img>
                              <v-img v-else :src="`/images/companies/no-image.jpg`" height="auto"></v-img>
                            </v-list-item-avatar>
                            <v-list-item-content>
                              <v-list-item-title class="text-left">{{company.company}}</v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-action>
                              <v-list-item-action-text class="font-weight-bold" ><router-link :to="'company/'+company.slug">View Profile</router-link></v-list-item-action-text>
                            </v-list-item-action>
                          </v-list-item>
                        </router-link>
                      </template>
                      <!-- <v-btn color="rgba(13, 150, 72, 0.1)" rounded class="all-btn text-capitalize my-4">View all results</v-btn> -->
                    </v-list>
                  </div>
                </v-form>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col cols="12" md="6" v-if="loading">
                <v-skeleton-loader
                  type="heading, text"
                ></v-skeleton-loader>
              </v-col>
              <v-col cols="12" md="6" v-if="loading">
                <v-skeleton-loader
                  type="heading, text"
                ></v-skeleton-loader>
              </v-col>
              <v-col cols="12" md="6" v-if="loading">
                <v-skeleton-loader
                  type="heading, text"
                ></v-skeleton-loader>
              </v-col>
              <v-col cols="12" md="6" v-if="loading">
                <v-skeleton-loader
                  type="heading, text"
                ></v-skeleton-loader>
              </v-col>
              <v-col cols="12" md="6" v-for="category in allcategories" :key="category.id" class="pl-sm-5 pr-sm-5">
                
                <div class="ofs-listing text-left">
                  <h1 class="font-weight-bold mb-3 text-break"><router-link :to="'/ofs-supplier/'+category.slug" class="text-decoration-none">{{category.name}}</router-link></h1>
                  <p>
                    <span v-for="subcategry in subCategories(category.subCategories)" class="sub-catLink">
                      <router-link :to="'/ofs-supplier/'+category.slug+'/'+subcategry.slug" class="text-decoration-none">  
                        <font class="font-weight-bold">{{subcategry.name}} </font> 
                        <font class="font-weight-medium">({{subcategry.spCount}}) </font> 
                      </router-link>
                    </span>
                  </p>
                </div>
              </v-col>
            </v-row>
            <v-row justify="center" class="mt-16">
              <v-col cols="12" md="12" class="pl-sm-5 pr-sm-5">
                <div class="ofs-bottom-section text-left pl-2">
                  <router-link to="/get-started" class="text-decoration-none">
                    <div class="ofs-bottom-content d-flex justify-space-between">
                      <div class="ml-5 ml-sm-5 my-5 my-sm-12">
                        <h1 class="mb-4 font-weight-medium white--text">OFS DIRECTORY</h1>
                        <h1 class="white--text font-weight-bold mb-0 title">Get listed today<br>
                        For free</h1>
                      </div>
                      <div class="mt-5 mt-sm-5 mr-5 mr-sm-8">
                        <img
                          :src="require('@/assets/images/green-black.png')"
                           width="102px"
                        >
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
</template>
<script>
  import Navbar from '../../components/Layout/Navbar.vue'
  import LeftSidebar from '../../components/Layout/Dashboard/LeftSidebar.vue'
  import VueSlickCarousel from 'vue-slick-carousel'
  import 'vue-slick-carousel/dist/vue-slick-carousel.css'
    // optional style for arrows & dots
  import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
  import _ from 'lodash';
  import { mapActions } from "vuex"
export default {
  name : "ModuleSelection",
  components: {
    Navbar,
    LeftSidebar,
    VueSlickCarousel
  },
  
  data() {
    return {
      searchCompany: '',
      loading: true,
      companiess: [
        {name: 'Tetra Technologies', link: '/company-profile', image: 'tetra.png'},
        {name: 'Patterson-UTI', link: '/company-profile', image: 'patterson.png'},
        {name: 'ChampionX', link: '/company-profile', image: 'champion.png'},
        {name: 'KLX Energy Services', link: '/company-profile', image: 'klx.png'},
      ],
      settings: {
        "arrows": true,
        "dots": false,
        "infinite": true,
        "slidesToShow": 3,
        "slidesToScroll": 3,
        "touchThreshold": 5,
        "autoplay": true,
        "autoplaySpeed": 5000,
        "pauseOnDotsHover": true,
        "pauseOnFocus": true,
        "pauseOnHover": true,
        "prev-icon": 'mdi-arrow-left',
        "responsive": [
            {
              "breakpoint": 950,
              "settings": {
                "slidesToShow": 3,
                "slidesToScroll": 3,
                "infinite": true,
                "dots": true,
                "arrows": true
              }
            },
            {
              "breakpoint": 600,
              "settings": {
                "slidesToShow": 2,
                "slidesToScroll": 2,
                "initialSlide": 2,
                "arrows": false,
                "dots" : true
              }
            },
            {
              "breakpoint": 480,
              "settings": {
                "slidesToShow": 1,
                "slidesToScroll": 1,
                "arrows": false,
                "dots" : true
              }
            }
          ]
      },
      loading: true,
      hideList: false,
    };
  },
  watch:{
    searchCompany: _.debounce(function(){
      if(this.searchCompany < 1){
        this.hideList = false;
      }else{
        this.hideList = true;
      }
    },500),
  },
  computed:{
    showSideBar(){
        return this.$store.getters.g_sideBarOpen;
    },
    activityPanel(){
        return this.$store.getters.g_activityPanel;
    },
    allcategories(){
      setTimeout(() => this.loading = false, 500);
      return _.orderBy(this.$store.getters.categories, 'orderNumber', 'asc');
    },
    companies(){
      this.hideList = true;
      return this.$store.getters.supplier;
    },
    premiumCompanies(){
      return this.$store.getters.premiumCompanies;
    }
  },
  methods: {
    ...mapActions(["getCategories","getCompanyByservice","getSupplierCompanyByservice","getSupplierMainService","searchSupplier","getCompanyInfo","getPremiumCompanies"]),
    getAllCategories(){
      this.getCategories();
      
    },
    subCategories(subCats){
     return _.orderBy(subCats, 'orderNumber', 'asc');
    },
    getSupplierList(){
      if(this.searchCompany.length > 1){
        this.searchSupplier(this.searchCompany);
      }
    },
    viewCompany(id,name){
      this.getCompanyInfo({'id':id,'name':name});
    },
    loader(){
      setTimeout(()=>{
        this.loading = false;
      },100)
    }
  },
  mounted() {
  document.title = "View OFS Supplier - BidOut"
    this.getCategories();
    this.getPremiumCompanies();
    this.loader();
  }
};
</script>
<style scoped lang="scss">

</style>
