<template>
  <v-row fill-height align="center" class="fill-height" v-if="loading">
    <v-col cols="12">
      <v-progress-circular :width="3" color="green" indeterminate ></v-progress-circular>
    </v-col>
  </v-row>
  <section class="fill-height company-module white" v-else>
    <NavbarBeforeLogin></NavbarBeforeLogin>
      <v-container>
        <v-main class="mb-16 pt-10">
          <v-row justify="center">
            <v-col cols="12" md="3" class="pl-0">
              <aside class="company-leftSidebar">
                <div class="company-logo pb-10">
                  <v-img :src="companyInfo.image"></v-img>
                </div>
                <div>
                  <router-link to="/login" class="text-decoration-none">
                    <v-btn color="#0D9647" large tile dense width="100%" height="56" class="font-weight-bold text-capitalize mb-4" type="submit" outlined>Place Order <v-icon class="pl-2">mdi-arrow-right-circle</v-icon></v-btn>
                  </router-link>
                  <router-link to="/login" class="text-decoration-none">
                    <v-btn color="#0D9647" large tile dense width="100%" height="56" class="font-weight-bold text-capitalize" type="submit" outlined>Create RFP <v-icon class="pl-2">mdi-arrow-right-circle</v-icon></v-btn>
                  </router-link>
                </div>
                <div class="facts-data pa-6 text-left">
                  <h3 class="mb-4"><font color="#013D3A">Key Facts</font></h3>
                  <p><font class="font-weight-bold">Founded:</font> {{companyInfo.founded}}</p>
                  <p><font class="font-weight-bold">Employees:</font> {{companyInfo.employees}}</p>
                  <p><font class="font-weight-bold">HQ Location:</font> {{companyInfo.hqlocation}}</p>
                  <!-- <p><font class="font-weight-bold">Stock Price:</font> {{companyInfo.stockPrice}} </p> -->
                    <div class="company-links mt-6">
                      <p><a :href="companyInfo.website" target="_blank">Website</a><v-icon class="pl-2" color="#013D3A">mdi-arrow-top-right-bold-box-outline</v-icon></p>
                      <p><a :href="companyInfo.linkedin" target="_blank">LinkedIn</a><v-icon class="pl-2" color="#013D3A">mdi-arrow-top-right-bold-box-outline</v-icon></p>
                      <p><a :href="companyInfo.careers" target="_blank">Careers</a><v-icon class="pl-2" color="#013D3A">mdi-arrow-top-right-bold-box-outline</v-icon></p>
                    </div>
                </div>
                <div class="facts-data pa-6 text-left">
                  <h3 class="mb-4"><font color="#013D3A">Account Contacts</font></h3>
                  <div class="contact-list mb-4" v-for="contacts in companyInfo.accountContacts">
                    <h4 class="mb-0 font-weight-bold">{{contacts.name}}</h4>
                    <h4>{{contacts.position}}</h4>
                  </div>
                  <router-link to="/login" class="text-decoration-none"><v-btn color="#0D9647" large tile dense width="100%" height="56" class="font-weight-bold white--text text-capitalize" type="submit">Login to View Contact Details <v-icon class="pl-2" color="#fff">mdi-arrow-right-circle</v-icon></v-btn></router-link>
                </div>
                <div class="tag-box pa-3 d-flex align-center" v-if="!companyInfo.isPremium || companyInfo.isPremium == 'false'">
                  <h4 class="font-weight-bold mb-0"><a href="mailto:hello@bidout.app" class="text-decoration-none green-color"><v-icon color="#0D9647">mdi-check-decagram-outline</v-icon> Upgrade to a Premium Profile Today</a></h4>
                </div>
              </aside>
            </v-col>
            <v-col cols="12" md="9">
              <div class="company-content text-left">
                <div class="company-title mb-12">
                  <h1>{{companyInfo.company}} &nbsp; &nbsp; <span v-if="companyInfo.isPremium || companyInfo.isPremium == 'true'"><v-icon color="#0D9647">mdi-check-decagram</v-icon>Premium Service Provider</span></h1>
                </div>
                <div class="company-desc">
                  <h1 class="mb-4 font-weight-bold">Corporate Summary</h1>
                  <p>{{companyInfo.overview}}</p>
                  <h3 class="text-center" v-if="!companyInfo.overview">No summary added yet</h3>
                </div>
                <div class="company-service mb-12">
                  <h1 class="mb-4 font-weight-bold">Services Portfolio</h1>
                  <div class="service-list text-left mt-4">
                    <label v-for="services in companyCategories"  v-if="services.subCategories.length > 0">
                      <v-icon>mdi-check</v-icon>{{services.name}}:
                      <span v-for="(sub,index) in services.subCategories">{{sub.subname}} <span v-if="index < services.subCategories.length - 1">,</span> </span>
                    </label>
                  </div>
                    <h3 v-if="!companyInfo.services" class="text-center">No services added yet</h3>
                </div>
                <div class="company-location mb-12">
                  <h1 class="mb-4 font-weight-bold">Service Locations</h1>
                  <div id="map"class="map" style="height:350px" v-if="companyInfo.companyLocations"></div>
                  <h3 class="text-center" v-if="!companyInfo.companyLocations">Location not added</h3>
                </div>
                <template v-if="companyInfo.isPremium || companyInfo.isPremium == 'true'">
                  <div class="company-location mb-12">
                    <h1 class="mb-4 font-weight-bold">Corporate Videos</h1>
                    <v-row>
                      <v-col cols="12" md="6" v-for="video in companyInfo.corporateVideos">
                        <div class="video-col">
                          <iframe
                            width="430"
                            height="240"
                            :src="video"
                            frameborder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen
                          ></iframe>
                        </div>
                      </v-col>
                      <v-col cols="12" md="12" v-if="!companyInfo.corporateVideos">
                        <h3 class="text-center">No videos to show</h3>
                      </v-col>
                    </v-row>
                  </div>
                  <div class="company-documents mb-12">
                    <h1 class="mb-4 font-weight-bold">Corporate Documents</h1>
                    <v-row>
                      <v-col cols="3" sm="2" v-for="docs in companyInfo.corporateDocuments">
                        <div class="doc-col text-center">
                          <a :href="docs.attachment" target="_blank" class="text-decoration-none">
                            <v-img v-if="get_url_extension(docs.attachment) == 'pdf'" :src="require('@/assets/images/profile/pdf.png')" width="80px" class="mx-auto"></v-img>
                            <v-img v-else-if="get_url_extension(docs.attachment) == 'xlsx' || get_url_extension(docs.attachment) == 'xls'" :src="require('@/assets/images/profile/excel.png')" width="80px" class="mx-auto"></v-img>
                            <v-img v-else :src="require('@/assets/images/profile/other.png')" width="80px" class="mx-auto"></v-img>
                          </a>
                          <a :href="docs.attachment" target="_blank" class="text-decoration-none"><p>{{get_url_name(docs.attachment)}}</p></a>
                        </div>
                      </v-col>
                      <v-col cols="12" sm="12" v-if="!companyInfo.corporateDocuments">
                        <h3 class="text-center">No documents to show</h3>
                      </v-col>
                    </v-row>
                  </div>
                  <div class="company-news mb-12">
                    <h1 class="mb-4 font-weight-bold">Corporate News & Press Releases</h1>
                    <div class="news-list" v-for="news in companyInfo.corporateNews">
                       <p>{{news.date | moment('MM/DD/YYYY')}} -  <a :href="news.url" target="_blank" class="text-decoration-none">{{news.title}}</a></p>
                    </div>
                    <div class="news-list" v-if="!companyInfo.corporateNews">
                      <h3 class="text-center">No news to show</h3>
                    </div>
                  </div>
                  <div class="company-leadership mb-12">
                    <h1 class="mb-4 font-weight-bold">Executive Leadership</h1>
                    <div class="leader-list text-left mt-10">
                      <div class="profile-list" v-for="excutive in companyInfo.executiveLeadership">
                        <v-img  width="175px" height="175px" :src="excutive.profilePicture"></v-img>
                        <h6>{{excutive.name}}</h6>
                        <p>{{excutive.role}}</p>
                        <a v-if="excutive.linkedin" class="text-decoration-none" target="_blank" :href="excutive.linkedin">
                          <v-icon color="#013D3A">mdi-linkedin</v-icon>
                        </a>
                      </div>
                    </div>
                    <h3 v-if="!companyInfo.executiveLeadership" class="text-center">No data to show</h3>
                  
                  </div>
                  <div class="company-esg mb-16">
                    <h1 class="mb-4 font-weight-bold">ESG Inititives</h1>
                    <v-row class="mt-5">
                      <v-col cols="12" sm="4" v-for="(esg,index) in esgcompanyInfo" :key="index">
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
          </v-row>
        </v-main>
      </v-container>
      <Footer></Footer>
   </section>
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
  computed:{
   companyInfo(){
     return this.$store.getters.publicCompany.companyData;
   },
   companyCategories(){
     return this.$store.getters.publicCompany.categories;
   },
   esgCompanyData(){
     var target = this.esgData;
     var source = this.$store.getters.publicCompany.companyData.esgInitiatives;
     Array.prototype.push.apply(target, source);
     let uniqueObjArray = [
       ...new Map(target.map((item) => [item["type"], item])).values(),
     ];
     return uniqueObjArray;
   }
  },
  methods: {
    ...mapActions(["getPublicCompanyInfo"]),
    getLocation(){
      setTimeout(() => {
        var LocationsForMap = this.$store.getters.publicCompany.companyData.companyLocations;
             
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
      },4000)
      
    },
    get_url_extension( url ) {
      return url.split(/[#?]/)[0].split('.').pop().trim();
    },
    get_url_name( url ) {
      return url.split('/').pop();
    },
    viewPublicCompany() {
      this.getPublicCompanyInfo({ slug : this.$route.fullPath.split('/').pop() });
    },
    msgShow() {
      setTimeout(() => {
        this.loading = false
      }, 3000)
    },
  },
  
  mounted() {
    document.title = "Company Profile - BidOut" 
    this.msgShow();
    this.viewPublicCompany();
    this.getLocation();
  }
};
</script>
<style scoped lang="scss">

</style>
