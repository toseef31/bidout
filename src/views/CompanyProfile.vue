<template>
  <div class="companyProfile-module inner-Company fill-height d-flex justify-center align-center"  v-if="loading">
    <v-progress-circular :width="3" color="green" indeterminate ></v-progress-circular>
  </div>
   <v-row class="companyProfile-module inner-Company pa-0 ma-0" v-else>
     <v-col class="pa-0 pr-sm-3" :class="[ showSideBar ? 'col-md-12 col-12 col-sm-12' : 'mid-content-collapse', activityPanel ? 'd-sm-block' : 'd-md-block']" v-show="!activityPanel">
        <div class="mid-content">
          <div class="content-section" v-if="companyData && companyData.companyData">
            <v-row class="mx-0">
              <v-col cols="12" sm="12" md="12" class="d-sm-block px-0">
                <div class="manage-sections pa-4 px-0">
                  <v-container class="pa-sm-10 pa-4">
                    <div class="top-section d-flex pa-sm-10 pa-4 pl-sm-0 pr-sm-0">
                      <div> 
                        <h4>{{companyData.companyData.company}} Page</h4>
                      </div>
                      <template>
                        <div class="progress-section">
                          <div class="d-flex progress-heading">
                            <p class="mb-0">Page Progress: <strong>{{moduleWeight}}%</strong></p>
                            <small>{{modulesCounts}} out of 12 modules</small>
                          </div>
                          <v-progress-linear 
                          color="#0D9648"
                          rounded
                          :value="moduleWeight" max-width="100%"></v-progress-linear>
                        </div>
                      </template>
                    </div>
                  </v-container>
                  <div class="company-form mt-16">
                    <hr>
                    <company-logo></company-logo>
                    <hr>
                    <v-container class="pa-sm-10 pa-4">
                      <v-row>
                        <v-col cols="12" sm="12">
                        <label class="d-block text-left input-label">Company's Name</label>
                          <v-text-field placeholder="Company's Name" v-model="profileName" single-line outlined hide-details></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12">
                        <label class="d-block text-left input-label">Corporate Summary</label>
                          <v-textarea outlined name="input-7-4" v-model="profileSummary" hide-details></v-textarea>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" sm="12">
                          <v-btn color="#0D9648" large class="text-capitalize white--text" width="176px" height="54px" :loading="saveInfoLoading" @click="updateBasic">Save Info</v-btn>
                        </v-col>
                      </v-row>
                    </v-container>
                    <hr>
                    <v-container class="pa-sm-10 pa-4">
                        <label class="d-block text-left main-label">Services Portfolio</label>
                      <v-row class="mt-5">
                        <v-col cols="12" sm="6">

                          <label class="d-block text-center main-label mb-5">Available Services</label>
                          <div  class="service-cate">
                            <div class="px-5 mt-4">
                              <v-text-field placeholder="Search ..." single-line outlined hide-details min-height="40px" v-model="searchService"></v-text-field>
                            </div>
                              
                              <v-list class="px-2">
                                <template v-for="category in allcategories">
                                  <v-list-group>
                                    <template v-slot:activator>
                                      <v-list-item-content>
                                        <v-list-item-title v-text="category.name" class="text-left font-weight-bold"></v-list-item-title>
                                      </v-list-item-content>
                                    </template>
                                    <template>
                                      <v-list-item min-height="30px" prepend-inner-icon="mdi-close"
                                        v-for="subcategory in subCategoriesAlign(category.subCategories)"
                                        :key="subcategory.id"
                                      >
                                        <template>
                                          <v-list-item-content class="py-0 pl-4">
                                            
                                            <v-list-item-title class="text-left"><v-icon>mdi-circle-small</v-icon>{{subcategory.name}}<v-icon class="ml-5" small @click="addService(subcategory)">mdi-plus-circle-outline</v-icon></v-list-item-title>
                                          </v-list-item-content>
                                        </template> 
                                      </v-list-item>
                                    </template>
                                  </v-list-group>
                                </template>
                              </v-list>
                          </div>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <label class="d-block text-center main-label mb-5">Selected Services</label>
                          
                            <div class="subservice-cate service-cate">
                              <v-list class="px-5" :expand="true">
                                <v-list-group v-for="(category,i) in companyData.categories" v-if="category.subCategories.length > 0" :value="true">
                                  <template v-slot:activator>
                                    <v-list-item-content>
                                      <v-list-item-title v-text="category.name" class="text-left font-weight-bold black--text"></v-list-item-title>
                                    </v-list-item-content>
                                  </template>
                                  <v-list-item min-height="30px"
                                    v-for="(subcategory,index) in category.subCategories"
                                    :key="subcategory.subid"
                                  >
                                    <v-list-item-content class="py-0 pl-4">
                                      <v-list-item-title class="text-left"><v-icon>mdi-circle-small</v-icon> {{subcategory.subname}} <v-icon class="ml-5" small @click="deleteService(subcategory)">mdi-trash-can-outline</v-icon></v-list-item-title>
                                    </v-list-item-content>
                                  </v-list-item>
                                </v-list-group>
                              </v-list>
                            </div>
                        </v-col>
                      </v-row>
                    </v-container>
                    <hr>
                    <v-container class="pa-sm-10 pa-4">
                      <label class="d-block text-left main-label">Basins</label>
                        <v-row>
                          <v-col cols="4" sm="2" v-for="basin in region">
                              <v-checkbox
                              v-model="basins"
                              :label="basin"
                              color="#0d9648"
                              :value="basin"
                              @change="addBasin"
                              hide-details
                              :disabled="loadingBasin"
                              ></v-checkbox>
                              <label class="d-none">{{basinsDatass}}</label>
                          </v-col>
                        </v-row>
                    </v-container>
                    <hr>
                    <service-locations></service-locations>
                    <hr>
                    <company-videos></company-videos>
                    <hr>
                    <company-documents></company-documents>
                    <hr>
                    <corporate-news></corporate-news>
                    <hr>
                    <excutive-leadership></excutive-leadership>
                    <hr>
                    <ESGComponent />
                    <hr>
                    <key-facts></key-facts>
                  </div>
                </div>
              </v-col>
            </v-row>
          </div>
          <div class="content-section fill-height d-flex justify-center align-center"  v-else>
          <v-progress-circular :width="3" color="green" indeterminate ></v-progress-circular>
        </div>
        </div>
     </v-col>
   </v-row>
</template>
<script async defer id="map-api-script" src="https://maps.googleapis.com/maps/api/js?key=%VITE_GOOGLE_MAP%&libraries=places&callback=Function.prototype"></script>
<script>
  import Navbar from '../components/Layout/Navbar.vue'
  import LeftSidebar from '../components/Layout/Dashboard/LeftSidebar.vue'
  import RightSidebar from '../components/Layout/Dashboard/RightSidebar.vue'
  import ESGComponent from '../components/CompanyProfile/ESGComponent.vue'
  import KeyFacts from '../components/CompanyProfile/KeyFacts.vue'
  import ExcutiveLeadership from '../components/CompanyProfile/ExcutiveLeadership.vue'
  import ServiceLocations from '../components/CompanyProfile/ServiceLocations.vue'
  import CorporateNews from '../components/CompanyProfile/CorporateNews.vue'
  import CompanyDocuments from '../components/CompanyProfile/CompanyDocuments.vue'
  import CompanyVideos from '../components/CompanyProfile/CompanyVideos.vue'
  import CompanyLogo from '../components/CompanyProfile/CompanyLogo.vue'
  import _ from 'lodash';
  import { mapActions,mapMutations,mapGetters } from "vuex"
export default {
  name : "CompanyProfile",
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
    CompanyLogo
  },
  
  data() {
    return {
      loader: true,
      region: ['Gulf Coast','Northeast','Rockies','Mid-Con','Permian','Arklatex','Offshore','Other'],
      basins: [],
      basinsData: [],
      profileName: '',
      profileSummary: '',
      services: '',
      companyService: '',
      companyService: [],
      subservices: '',
      searchService: '',
      servData: [],
      
      basinLoader: null,
    };
  },
  computed:{
    ...mapGetters(['saveInfoLoading','manageCompanyError']),
    showSideBar(){
        return this.$store.getters.g_sideBarOpen;
    },
    activityPanel(){
        return this.$store.getters.g_activityPanel;
    },
    allcategories(){
      if(this.$store.getters.categories){
        if(this.searchService){
          return _.orderBy(this.$store.getters.categories.filter((item)=>{
            return this.searchService.toLowerCase().split(' ').every(v => item.name.toLowerCase().includes(v))
          }))
        }else{
          return _.orderBy(this.$store.getters.categories, "orderNumber", "asc");
        }
      }else{
        return [];
      }
      
    },
    companyData(){
      if(this.$store.getters.companyData){
        this.profileName = this.$store.getters.companyData.companyData.company;
        this.profileSummary = this.$store.getters.companyData.companyData.overview;
       return this.$store.getters.companyData;
      }else{
       return [];
      }
    },
    basinsDatass(){
      if(!this.$store.getters.companyData.companyData.basins){
        this.basins = [];
        return this.basins;
      }else{
        if(this.$store.getters.companyData.companyData.basins.length > 0 || this.$store.getters.companyData.companyData.basins.length == 0){
          this.basins = this.$store.getters.companyData.companyData.basins;
          return this.basins;
        }else{
          this.basins = [];
          return this.basins;
        }
      }
      
    },
    serviceSubId(){
      if(this.$store.getters.companyData.companyData.services){
        let servc = this.$store.getters.companyData.companyData.services.filter((item3) =>{
           this.servData.push({'id': item3.id});
         })
         return this.servData;
      }
    },
    moduleWeight(){
   
      const sum = this.$store.getters.moduleWeight.reduce((accumulator, object) => {
        return accumulator + object.weight;
      }, 0);
      return sum;
    },
    modulesCounts(){
      return this.$store.getters.moduleWeight.length;
    },
    subCategories(){
      return this.$store.getters.subCategories;
    },
    loadingBasin(){
      return this.$store.getters.loadingBasin;
    },
    loading(){
      return this.$store.getters.pageLoader;
    },
    loadingBasic(){
      return this.$store.getters.loadingBasic;
    },
    
  },
  watch:{
    manageCompanyError(message){
      if(message){
        this.$toasted.show(message, {
          position: 'top-center',
          duration: 5000,
          className: 'error-toast',
          type: 'error',
        });
      }
    }
  },
  methods: {
    ...mapActions(["getCompany","getCategories","getSubCategories","updateBasicProfile","addCompanyService","addCompanyBasins"]),
    ...mapMutations(["setBasinLoading"]),
      async updateBasic(){
        var data = {
          companyId: this.$store.getters.userInfo.company.id,
          userId: this.$store.getters.userInfo.id,
          profileName: this.profileName,
          profileSummary: this.profileSummary,
        }
        await this.updateBasicProfile(data);
        if(this.$store.state.companyProfile.basicError){
          return this.$toasted.show(`Error! Something went wrong please try again`, {
            class: 'error-toast',
            type : 'error',
            duration: 5000,
            position: 'top-center',
          });
        }
      },
      getAllCategories(){
        this.getCategories();
      },
      subCategoriesAlign(subCats) {
        return _.orderBy(subCats, "orderNumber", "asc");
      },
      addService(subcate){
      if(this.$store.getters.companyData.companyData.services){
        this.companyService = this.$store.getters.companyData.companyData.services;
      }
        var servicedata = {
          name: subcate.name,
          id: subcate.id,
          slug: subcate.slug,
        }
         this.companyService.push(servicedata);
        
        var result = this.companyService.reduce((unique, o) => {
          if(!unique.some(obj => obj.id === o.id)) {
            unique.push(o);
          }
          return unique;
      },[]);
      
      this.addCompanyService({companyId: this.$store.getters.userInfo.company.id,subCategories: result});
      this.services = '';
      this.subservices = '';
    },
      deleteService(item){
        if(this.$store.getters.companyData.companyData.services){
          this.companyService = this.$store.getters.companyData.companyData.services;
        }
        for(var i=0; i<this.companyService.length; i++){
          if(this.companyService[i].id == item.subid){
            this.companyService.splice(i,1);
          }
        }
        this.addCompanyService({companyId: this.$store.getters.userInfo.company.id,subCategories: this.companyService});
      },
      addBasin(){
        if(this.$store.getters.companyData.basins){
          this.basinsData = this.$store.getters.companyData.companyData.basins;
          this.basins = this.$store.getters.companyData.companyData.basins;
        }
        this.basinsData.push(this.basins);
        if(!this.$store.getters.companyData.companyData.basins){
          var data = {
             companyId: this.$store.getters.userInfo.company.id,
             basins: this.basins,
           }
           this.addCompanyBasins(data);
           this.$store.commit('setBasinLoading', true);
           
        }else{
          if(this.$store.getters.companyData.companyData.basins.length == 0 || this.$store.getters.companyData.companyData.basins.length > 0){
            var data = {
              companyId: this.$store.getters.userInfo.company.id,
              basins: this.basins,
            }
            this.addCompanyBasins(data);
            this.$store.commit('setBasinLoading', true);
          }
        }
      },
      
      getSubCate(catId){
        this.getSubCategories(catId);
      },
  },
  async created(){
    let mapScpManage = "map-api-script";
    let mapAlreadyAttached = !!document.getElementById(mapScpManage);
    if(!mapAlreadyAttached){
      let mapScript = document.createElement('script');
      mapScript.setAttribute("defer", "defer");
      mapScript.id = mapScpManage;
      await mapScript.setAttribute('src', 'https://maps.googleapis.com/maps/api/js?key='+import.meta.env.VITE_GOOGLE_MAP+'&libraries=places&callback=Function.prototype')
      document.head.appendChild(mapScript);
    }
    await this.getCategories();
    
  },
  mounted() {
    document.title = "Company Profile - BidOut";
    this.getCompany(this.$store.getters.userInfo.company.id);
  }
};
</script>
<style scoped lang="scss">
</style>