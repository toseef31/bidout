<template>
  <section class="fill-height ofs-module white">
    <NavbarBeforeLogin></NavbarBeforeLogin>
      <div class="get-topHeader d-flex">
        <v-container fill-height>
          <v-row
            align="center"
            justify="center"
            no-gutters
          >
            <v-col
              class="text-left"
              cols="12"
            >
              <h1 class="font-weight-bolder white--text">
                OFS Provider Directory
              </h1>
            </v-col>
          </v-row>
        </v-container>
      </div>
      <v-container>
        <v-main class="pt-0">
          <v-row class="mt-n16">
            <v-col cols="12" md="12">
              <VueSlickCarousel v-bind="settings" class="company-slider">
                <div class="slide-item " v-for="premium in premiumCompanies" @click="viewPublicCompany(premium.id,premium.company)">
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
                <!-- <div class="slide-item ">
                  <div class="slide-img d-flex align-center justify-center flex-column">
                    <img
                      :src="require('@/assets/images/ofs/tetra.png')" class="mx-auto" height="120"
                    >
                  </div>
                  <div class="slide-caption">
                    <h3 class="font-weight-bold">Premium Service Provider</h3>
                  </div>
                </div>
                <div class="slide-item ">
                  <div class="slide-img d-flex align-center justify-center flex-column">
                    <img
                      :src="require('@/assets/images/ofs/champion.png')" class="mx-auto"
                    >
                  </div>
                  <div class="slide-caption">
                    <h3 class="font-weight-bold">Premium Service Provider</h3>
                  </div>
                </div>
                <div class="slide-item">
                  <div class="slide-img d-flex align-center justify-center flex-column">
                    <img
                      :src="require('@/assets/images/ofs/patterson.png')" class="mx-auto"
                    >
                  </div>
                  <div class="slide-caption">
                    <h3 class="font-weight-bold">Premium Service Provider</h3>
                  </div>
                </div> -->
              </VueSlickCarousel>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" md="9">
              <v-form class="search-form">
                <v-row class="mt-8">
                  <v-col cols="12" sm="12" text="left">
                    <v-text-field label="Search here ..." single-line outlined type="text" placeholder="Search here" v-model="searchCompany" clearable @keyup="getSupplierList">
                    </v-text-field>
                    <div v-if="hideList == true">
                      <v-list  class="company-list">
                        <template v-for="(company, index) in companies">
                          <v-list-item class="py-1"
                            :key="company.objectID" @click="viewPublicCompany(company.objectID,company.company)"
                          >
                            <v-list-item-avatar max-height="31px" max-width="88px" width="88px" tile>
                              <v-img v-if="company.companyImage" :src="company.companyImage" height="auto"></v-img>
                              <v-img v-else :src="`/images/companies/no-image.jpg`" height="auto"></v-img>
                            </v-list-item-avatar>
                            <v-list-item-content>
                              <v-list-item-title @click="addPerson(user); hideMemberList = !hideMemberList" class="text-left">{{company.company}}</v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-action>
                              <v-list-item-action-text class="font-weight-bold" @click="viewPublicCompany(company.objectID,company.company)"><router-link to="">View Profile</router-link></v-list-item-action-text>
                            </v-list-item-action>
                          </v-list-item>
                        </template>
                        <!-- <v-btn color="rgba(13, 150, 72, 0.1)" rounded class="all-btn text-capitalize my-4">View all results</v-btn> -->
                      </v-list>
                    </div>
                  </v-col>
                  <!-- <v-col cols="2" sm="1" text="left" class="pl-0">
                    <v-btn color="#0D9647" class="white--text" height="56" min-width="50"><v-icon>search</v-icon></v-btn>
                  </v-col> -->
                </v-row>
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
            <v-col cols="12" md="6" v-for="category in allcategories" :key="category.id">
              
              <div class="ofs-listing text-left">
                <h1 class="font-weight-bold mb-3 text-break" @click="getMainCompany(category.slug,category.name)">{{category.name}}</h1>
                <p>
                  <span v-for="subcategry in subCategories(category.subCategories)" class="sub-catLink">
                    <span @click="getCompanies(category.slug,subcategry.name)">  
                      <font class="font-weight-bold">{{subcategry.name}} </font> 
                      <font class="font-weight-medium">({{subcategry.spCount}}) </font> 
                    </span>
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
        </v-main>
      </v-container>
      <Footer></Footer>
   </section>
</template>
<script>
  import NavbarBeforeLogin from '../Layout/NavbarBeforeLogin.vue'
  import Footer from '../Layout/Footer.vue'
  import VueSlickCarousel from 'vue-slick-carousel'
  import 'vue-slick-carousel/dist/vue-slick-carousel.css'
    // optional style for arrows & dots
  import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
  import _ from 'lodash';
  import { mapActions } from "vuex"
export default {
  name : "ModuleSelection",
  components: {
    NavbarBeforeLogin,
    Footer,
    VueSlickCarousel
  },
  
  data() {
    return {
      searchCompany: '',
      settings: {
        "arrows": true,
        "dots": false,
        "infinite": false,
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
                "arrows": false
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
    allcategories(){
      // if(this.searchCategory){
      //   return _.orderBy(this.$store.getters.categories.filter((category)=>{
      //     return this.searchCategory.toLowerCase().split(' ').every(v => category.name.toLowerCase().includes(v))
      //   }), 'orderNumber', 'asc')
      // }else{
        setTimeout(() => this.loading = false, 500);
        return _.orderBy(this.$store.getters.categories, 'orderNumber', 'asc');
      // }
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
    ...mapActions(["getCategories","getCompanyByservice","getCompanyMainService","searchSupplier","getPublicCompanyInfo","getPremiumCompanies"]),
    getAllCategories(){
      this.getCategories();
      
    },
    subCategories(subCats){
     return _.orderBy(subCats, 'orderNumber', 'asc');
    },
    getCompanies(slug,subName){
      this.getCompanyByservice({slug:slug, service:subName});
    },
    getMainCompany(slug,name){
      this.getCompanyMainService({slug:slug, name:name});
    },
    getSupplierList(){
      if(this.searchCompany.length > 1){
        this.searchSupplier(this.searchCompany);
      }
    },
    viewPublicCompany(id,name){
      this.getPublicCompanyInfo({'id':id,'name':name});
    },
    
  },
  beforeMount() {
    this.getPremiumCompanies();
  },
  mounted() {
  document.title = "OFS - BidOut"
    this.getCategories();
    this.getPremiumCompanies();
  }
};
</script>
<style scoped lang="scss">

</style>
