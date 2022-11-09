<template>
  <v-col class="company-module companySupplier-module white pa-0 pa-sm-3" :class="[ showSideBar ? 'col-md-9 col-12 col-sm-7' : 'mid-content-collapse', activityPanel ? 'd-sm-block' : 'd-md-block']" v-show="!activityPanel">
    <div class="mid-content">
      <div class="content-section fill-height d-flex justify-center align-center"  v-if="loading">
        <v-progress-circular :width="3" color="green" indeterminate ></v-progress-circular>
      </div>
      <div class="content-section fill-height" v-else>
        <div class="get-Header d-flex pt-5">
          <v-container fill-height class="pl-0">
            <v-row
              align="center"
              no-gutters
            >
              <v-col
                class="text-left"
                cols="12" sm="4"
              >
                <v-img :src="companyData.image"></v-img>
                <h4 class="pl-3 mt-2"><span v-if="companyData.isPremium"><span v-if="companyData.isPremium == 'true'"></span><v-icon color="#0D9647">mdi-check-decagram</v-icon>Premium Service Provider</span></h4>
              </v-col>
              <v-col
                class="text-left"
                cols="12" sm="8"
              >
                <div class="company-title">
                  <h1>{{companyData.company}}</h1>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </div>
          <v-container>
            <v-main class="mb-16 pt-0">
              <v-row justify="center">
                <v-col cols="12" md="9">
                  <div class="company-content text-left">
                    <div class="company-title mb-12">
                      <h1>{{companyData.company}} &nbsp; &nbsp; 
                        <span v-if="companyData.isPremium"><span v-if="companyData.isPremium == 'true'"></span><v-icon color="#0D9647">mdi-check-decagram</v-icon>Premium Service Provider</span>
                      </h1>
                    </div>
                    
                    <div class="company-desc">
                      <h1 class="mb-4 font-weight-bold">Corporate Summary</h1>
                      <p>{{companyData.overview}}</p>
                      <h3 class="text-center" v-if="!companyData.overview">No summary added yet</h3>
                    </div>
                    <div class="company-service mb-12">
                      <h1 class="mb-4 font-weight-bold">Services Portfolio</h1>
                      <div class="service-list text-left mt-4">
                        <label v-for="drill in companyData.services"><v-icon>mdi-check</v-icon>{{drill.name}}</label>
                      </div>
                        <h3 v-if="!companyData.services" class="text-center">No services added yet</h3>
                      <!-- <p class="text-right">View all services</p> -->
                    </div>
                    <div class="company-location mb-12">
                      <h1 class="mb-4 font-weight-bold">Service Locations</h1>
                      <div id="map"class="map" style="height:350px" v-if="companyData.companyLocations"></div>
                      <h3 class="text-center" v-if="!companyData.companyLocations">Location not added</h3>
                    </div>
                    <template v-if="companyData.isPremium || companyData.isPremium == 'true'">
                      <div class="company-location mb-12">
                        <h1 class="mb-4 font-weight-bold">Corporate Videos</h1>
                        <v-row>
                          <v-col cols="12" md="6" v-for="video in companyData.corporateVideos">
                            <div class="video-col">
                              
                              <iframe
                                width="100%"
                                height="350px"
                                :src="video"
                                frameborder="0"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowfullscreen
                              ></iframe>
                            </div>
                          </v-col>
                          <v-col cols="12" md="12" v-if="!companyData.corporateVideos">
                            <h3 class="text-center">No videos to show</h3>
                          </v-col>
                        </v-row>
                      </div>
                      <div class="company-documents mb-12">
                        <h1 class="mb-4 font-weight-bold">Corporate Documents</h1>
                        <v-row>
                          <v-col cols="3" sm="2" v-for="docs in companyData.corporateDocuments">
                            <div class="doc-col text-center">
                              <a :href="docs.attachment" target="_blank" class="text-decoration-none">
                                <v-img v-if="get_url_extension(docs.attachment) == 'pdf'" :src="require('@/assets/images/profile/pdf.png')" width="80px" class="mx-auto"></v-img>
                                <v-img v-else-if="get_url_extension(docs.attachment) == 'xlsx' || get_url_extension(docs.attachment) == 'xls'" :src="require('@/assets/images/profile/excel.png')" width="80px" class="mx-auto"></v-img>
                                <v-img v-else :src="require('@/assets/images/profile/other.png')" width="80px" class="mx-auto"></v-img>
                              </a>
                              <a :href="docs.attachment" target="_blank" class="text-decoration-none"><p>{{docs.name}}</p></a>
                            </div>
                          </v-col>
                          <v-col cols="12" sm="12" v-if="!companyData.corporateDocuments">
                            <h3 class="text-center">No documents to show</h3>
                          </v-col>
                        </v-row>
                      </div>
                      <div class="company-news mb-12">
                        <h1 class="mb-4 font-weight-bold">Corporate News & Press Releases</h1>
                        <div class="news-list" v-for="news in companyData.corporateNews">
                          <p>{{news.date | moment('MM/DD/YYYY')}} -  <a :href="news.url" target="_blank" class="text-decoration-none">{{news.title}}</a></p>
                        </div>
                        <div class="news-list" v-if="!companyData.corporateNews">
                          <h3 class="text-center">No news to show</h3>
                        </div>
                      </div>
                      <div class="company-leadership mb-12">
                        <h1 class="mb-4 font-weight-bold">Executive Leadership</h1>
                        <div class="leader-list text-left mt-10">
                          <div class="profile-list" v-for="excutive in companyData.executiveLeadership">
                            <v-img  width="175px" height="175px" :src="excutive.profilePicture"></v-img>
                            <h6>{{excutive.name}}</h6>
                            <p>{{excutive.role}}</p>
                            <a v-if="excutive.linkedin" class="text-decoration-none" target="_blank" :href="excutive.linkedin">
                              <v-icon color="#013D3A">mdi-linkedin</v-icon>
                            </a>
                          </div>
                        </div>
                        <h3 v-if="!companyData.executiveLeadership" class="text-center">No data to show</h3>
                      </div>
                      
                      <div class="company-esg mb-16">
                        <h1 class="mb-4 font-weight-bold">ESG Inititives</h1>
                        <v-row class="mt-5">
                          <v-col cols="12" sm="4" v-for="esg in esgCompanyData">
                            <div class="esg-list text-left">
                              <h4 class="text-left mb-5">{{esg.name}}</h4>
                              <p class="text-left">{{esg.description}}</p>
                              <a :href="esg.attachment" download class="text-decoration-none px-5" v-if="esg.attachment">Download <v-icon>mdi-tray-arrow-down</v-icon></a>
                            </div>
                          </v-col>
                        </v-row>
                      </div>
                    </template>
                </div>
              </v-col>
              <v-col cols="12" md="3" class="pl-0">
                <aside class="company-leftSidebar">
                  <div>
                    <v-btn color="#0D9647" large tile dense width="100%" height="56" class="font-weight-bold text-capitalize mb-4" type="submit" outlined>Place Order <v-icon class="pl-2">mdi-arrow-right-circle</v-icon></v-btn>
                    <router-link to="/create-bid" class="text-decoration-none"><v-btn color="#0D9647" large tile dense width="100%" height="56" class="font-weight-bold text-capitalize" type="submit" outlined>Create RFP <v-icon class="pl-2">mdi-arrow-right-circle</v-icon></v-btn></router-link>
                  </div>
                  <div class="facts-data pa-6 text-left" v-if="companyData.founded != null || companyData.employees != null  || companyData.hqlocation != null || companyData.website != null || companyData.linkedin != null || companyData.careers != null">
                    <h3 class="mb-4"><font color="#013D3A">Key Facts</font></h3>
                    <p><font class="font-weight-bold">Founded:</font> {{companyData.founded}}</p>
                    <p><font class="font-weight-bold">Employees:</font> {{companyData.employees}}</p>
                    <p><font class="font-weight-bold">HQ Location:</font> {{companyData.hqlocation}}</p>
                    <!-- <p><font class="font-weight-bold">Stock Price:</font> {{companyData.stockPrice}} </p> -->
                      <div class="company-links mt-6">
                        <p><a :href="companyData.website" target="_blank">Website</a><v-icon class="pl-2" color="#013D3A">mdi-arrow-top-right-bold-box-outline</v-icon></p>
                        <p><a :href="companyData.linkedin" target="_blank">LinkedIn</a><v-icon class="pl-2" color="#013D3A">mdi-arrow-top-right-bold-box-outline</v-icon></p>
                        <p><a :href="companyData.careers" target="_blank">Careers</a><v-icon class="pl-2" color="#013D3A">mdi-arrow-top-right-bold-box-outline</v-icon></p>
                      </div>
                  </div>
                  <div class="facts-data pa-5 text-left">
                    <h3 class="mb-4"><font color="#013D3A">Account Contacts</font></h3>
                    <div class="contact-list mb-4" v-for="contacts in companyData.accountContacts">
                      <h4 class="mb-0 font-weight-bold">{{contacts.name}}</h4>
                      <h4 class="font-weight-medium">{{contacts.position}}</h4>
                      <h4 class="font-weight-medium"><span class="font-weight-bold">Email:</span> <a :href="'mailto:'+contacts.email" class="text-decoration-none"><font color="#013D3A">{{contacts.email}}</font></a></h4>
                      <h4 class="font-weight-medium"><span class="font-weight-bold">Phone:</span> {{contacts.phoneNo}}</h4>
                    </div>
                    <h4 v-if="!companyData.accountContacts" class="text-center"> No contacts</h4>
                  </div>
                  <div class="tag-box pa-3 d-flex align-center" v-if="!companyData.isPremium">
                    <h4 class="font-weight-bold mb-0"><a href="mailto:hello@bidout.app" class="text-decoration-none green-color"><v-icon color="#0D9647">mdi-check-decagram-outline</v-icon> Upgrade to a Premium Profile Today</a></h4>
                  </div>
                </aside>
              </v-col>
            </v-row>
          </v-main>
        </v-container> 
      </div>
    </div>
  </v-col>
</template>
<script>
  import { mapActions } from "vuex";
  import NavbarBeforeLogin from '../../components/Layout/NavbarBeforeLogin.vue'
  import Footer from '../../components/Layout/Footer.vue'
export default {
  name : "ModuleSelection",
  components: {
    NavbarBeforeLogin,
    Footer,
  },
  
  data() {
    return {
      loading: true,
      mapOptions: '',
      markerOptions: '',
      overView: this.$store.getters.supplierCompany.companyData.overview,
      esgData:  [
        {
          name: 'Environmental',
          description: 'No data to show',
          attachment: '',
          type: 'environmetal',
          id: '1665493735995301876774201398'
        },
        {
          name: 'Social',
          description: 'No data to show',
          attachment: '',
          type: 'social',
          id: '166549373599530187677420139',
        },
        {
          name: 'Governance',
          description: 'No data to show',
          attachment: '',
          type: 'governance',
          id: '1665493735995301876774201'
        },
      ],
    };
  },
  metaInfo:{
      title: ' ',
      titleTemplate: '%s - BidOut Profile',
      htmlAttrs: {
        lang: 'en',
        amp: true
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'title', content: this.overView },
      ]
  },
  computed:{
   showSideBar(){
       return this.$store.getters.g_sideBarOpen;
   },
   activityPanel(){
       return this.$store.getters.g_activityPanel;
   },
   companyData(){
     return this.$store.getters.supplierCompany.companyData;
   },
   companyCategories(){
     return this.$store.getters.supplierCompany.categories;
   },
   esgCompanyData(){
     var target = this.esgData;
     var source = this.$store.getters.supplierCompany.companyData.esgInitiatives;
     Array.prototype.push.apply(target, source);
     let uniqueObjArray = [
       ...new Map(target.map((item) => [item["type"], item])).values(),
     ];
     return uniqueObjArray;
   }
  },
  methods: {
    ...mapActions(["getCompanyInfo"]),
    getLocation(){
    
    setTimeout(() => {
      var LocationsForMap = this.$store.getters.supplierCompany.companyData.companyLocations;
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 2,
        center: new google.maps.LatLng(LocationsForMap[0].lattitude, LocationsForMap[0].longitude),
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });

      var infowindow = new google.maps.InfoWindow();

      var marker, i;

      for (i = 0; i < LocationsForMap.length; i++) {  
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(LocationsForMap[i].lattitude, LocationsForMap[i].longitude),
          map: map,
          title: 'Marker',
          anchorPoint: new google.maps.Point(0, -29),
        });
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
          return function() {
            infowindow.setContent(LocationsForMap[i].location);
            infowindow.open(map, marker);
          }
        })(marker, i));
      }
    },6000)
        
    },
    get_url_extension( url ) {
      return url.split(/[#?]/)[0].split('.').pop().trim();
    },
    get_url_name( url ) {
      return url.split('/').pop();
    },
    viewPublicCompany() {
      this.getCompanyInfo({ slug : this.$route.fullPath.split('/').pop()});
    },
    msgShow() {
      setTimeout(() => {
        this.loading = false;
        // document.title = ''+this.companyData.company + "-" + this.companyData.companyHq +' - BidOut Profile' ;
      }, 3000)
    },
  },
  created(){
    this.viewPublicCompany();
    this.metaInfo.title = ''+this.companyData.company + " - " + this.companyData.companyHq +' - BidOut Profile' ;
    // const descEl = document.querySelector('head meta[name="description"]');
    // const titleEl = document.querySelector('head meta[name="title"]');
    // descEl.setAttribute('content', this.$store.getters.publicCompany.companyData.overview);
    // titleEl.setAttribute('content', ''+this.companyInfo.company + " - " + this.companyInfo.companyHq +' - BidOut Profile' );
  },
  mounted() {
    this.msgShow();
    this.getLocation();
  }
};
</script>
<style scoped lang="scss">

</style>
