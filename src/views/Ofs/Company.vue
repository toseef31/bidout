<template>
  <!-- <section class="fill-height company-module white"> -->
    
  <v-col class="company-module companySupplier-module white pa-0 pa-sm-3" :class="[ showSideBar ? 'col-md-9 col-12 col-sm-7' : 'mid-content-collapse', activityPanel ? 'd-sm-block' : 'd-md-block']" v-show="!activityPanel">
    <div class="mid-content">
      <div class="content-section fill-height">
        <div class="get-Header d-flex py-5">
          <v-container fill-height class="pl-0">
            <v-row
              align="center"
              no-gutters
            >
              <v-col
                class="text-left"
                cols="3"
              >
                <v-img :src="companyData.image"></v-img>
              </v-col>
            </v-row>
          </v-container>
        </div>
          <v-container>
            <v-main class="mb-16 pt-0">
              <v-row justify="center">
                <v-col cols="12" md="3" class="pl-0">
                  <aside class="company-leftSidebar">
                    <div>
                      <v-btn color="#0D9647" large tile dense width="100%" height="56" class="font-weight-bold text-capitalize mb-4" type="submit" outlined>Place Order <v-icon class="pl-2">mdi-arrow-right-circle</v-icon></v-btn>
                      <v-btn color="#0D9647" large tile dense width="100%" height="56" class="font-weight-bold text-capitalize" type="submit" outlined>Create RFP <v-icon class="pl-2">mdi-arrow-right-circle</v-icon></v-btn>
                    </div>
                    <div class="facts-data pa-6 text-left">
                      <h3 class="mb-4"><font color="#013D3A">Key Facts</font></h3>
                      <p><font class="font-weight-bold">Founded:</font> {{companyData.founded}}</p>
                      <p><font class="font-weight-bold">Employees:</font> {{companyData.employees}}</p>
                      <p><font class="font-weight-bold">HQ Location:</font> {{companyData.hqlocation}}</p>
                      <p><font class="font-weight-bold">Stock Price:</font> {{companyData.stockPrice}} </p>
                        <div class="company-links mt-6">
                          <p><a :href="companyData.website" target="_blank">Website</a><v-icon class="pl-2" color="#013D3A">mdi-arrow-top-right-bold-box-outline</v-icon></p>
                          <p><a :href="companyData.linkedin">LinkedIn</a><v-icon class="pl-2" color="#013D3A">mdi-arrow-top-right-bold-box-outline</v-icon></p>
                          <p><a :href="companyData.careers">Careers</a><v-icon class="pl-2" color="#013D3A">mdi-arrow-top-right-bold-box-outline</v-icon></p>
                        </div>
                    </div>
                    <div class="facts-data pa-6 text-left">
                      <h3 class="mb-4"><font color="#013D3A">Account Contacts</font></h3>
                      <div class="contact-list mb-4" v-for="contacts in companyData.accountContacts">
                        <h4 class="mb-0 font-weight-bold">{{contacts.name}}</h4>
                        <h4>{{contacts.position}}</h4>
                      </div>
                      <!-- <router-link to="/login" class="text-decoration-none"><v-btn color="#0D9647" large tile dense width="100%" height="56" class="font-weight-bold white--text text-capitalize" type="submit">Login to View Contact Details <v-icon class="pl-2" color="#fff">mdi-arrow-right-circle</v-icon></v-btn></router-link> -->
                    </div>
                    <div class="facts-data pa-6 text-left similar-companies">
                      <h3 class="mb-4"><font color="#013D3A">Similar Companies</font></h3>
                      <p><router-link to="">Nabors Industries</router-link></p>
                      <p><router-link to="">Helmerich & Payne</router-link></p>
                      <p><router-link to="">Precision Drilling</router-link></p>
                      <p><router-link to="">Transocean</router-link></p>
                      <p><router-link to="">Ensign Energy Services</router-link></p>
                      <p><router-link to="">Independents Contract Drilling</router-link></p>
                      <p><router-link to="">Cactus Drilling</router-link></p>
                    </div>
                    <div class="tag-box pa-3 d-flex align-center">
                      <h4 class="font-weight-bold mb-0"><v-icon color="#0D9647">mdi-check-decagram-outline</v-icon> Update to a Premium Profile Today</h4>
                    </div>
                  </aside>
                </v-col>
                <v-col cols="12" md="9">
                  <div class="company-content text-left">
                    <div class="company-title mb-12">
                      <h1>{{companyData.company}} &nbsp; &nbsp; <span><v-icon color="#0D9647">mdi-check-decagram</v-icon>Premium Service Provider</span></h1>
                    </div>
                    <div class="company-desc">
                      <h1 class="mb-4 font-weight-bold">Corporate Summary</h1>
                      <p>{{companyData.overview}}</p>
                    </div>
                    <div class="company-service mb-12">
                      <h1 class="mb-4 font-weight-bold">Services Portfolio</h1>
                      <div class="service-list text-left mt-4">
                        <label v-for="drill in companyData.services"><v-icon>mdi-check</v-icon>{{drill}}</label>
                      </div>
                      <p class="text-right">View all services</p>
                    </div>
                    <div class="company-location mb-12">
                      <h1 class="mb-4 font-weight-bold">Service Locations</h1>
                      <v-img :src="require('@/assets/images/ofs/company/lcoation.png')"></v-img>
                    </div>
                    <div class="company-location mb-12">
                      <h1 class="mb-4 font-weight-bold">Corporate Videos</h1>
                      <v-row>
                        <v-col cols="12" md="6" v-for="video in companyData.corporateVideos">
                          <div class="video-col">
                            <!-- <video id="video-preview" width="100%" src="https://www.youtube.com/embed/WNeLUngb-Xg" /> -->
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
                      </v-row>
                    </div>
                    <div class="company-documents mb-12">
                      <h1 class="mb-4 font-weight-bold">Corporate Documents</h1>
                      <v-row>
                        <v-col cols="3" sm="2" v-for="docs in companyData.corporateDocuments">
                          <div class="doc-col text-center">
                            <v-img :src="require('@/assets/images/profile/pdf.png')" width="80px" class="mx-auto"></v-img>
                            <p>Company Profile.pdf</p>
                          </div>
                        </v-col>
                        <v-col cols="3" sm="2">
                          <div class="doc-col text-center">
                            <v-img  :src="require('@/assets/images/profile/excel.png')" width="80px" class="mx-auto"></v-img>
                            <p>Price Sheet.xlsx</p>
                          </div>
                        </v-col>
                        <v-col cols="3" sm="2">
                          <div class="doc-col text-center">
                            <v-img :src="require('@/assets/images/profile/other.png')" width="80px" class="mx-auto"></v-img>
                            <p>Q4 Investor Presentation</p>
                          </div>
                        </v-col>
                        <v-col cols="3" sm="2">
                          <div class="doc-col text-center">
                            <v-img :src="require('@/assets/images/profile/pdf.png')" width="80px" class="mx-auto"></v-img>
                            <p>ESG_Inititves.pdf</p>
                          </div>
                        </v-col>
                      </v-row>
                    </div>
                    <div class="company-news mb-12">
                      <h1 class="mb-4 font-weight-bold">Corporate News & Press Releases</h1>
                      <div class="news-list" v-for="news in companyData.corporateNews">
                        <p>{{news.date}} -  {{news.title}}</p>
                      </div>
                    </div>
                    <div class="company-leadership mb-12">
                      <h1 class="mb-4 font-weight-bold">Executive Leadership</h1>
                      <div class="leader-list text-left mt-10">
                        <div class="profile-list" v-for="excutive in companyData.executiveLeadership">
                          <v-img :src="excutive.profilePicture"></v-img>
                          <h6>{{excutive.name}}</h6>
                          <p>{{excutive.role}}</p>
                          <a v-if="excutive.linkedin" class="text-decoration-none" target="_blank" :href="excutive.linkedin">
                            <v-icon color="#013D3A">mdi-linkedin</v-icon>
                          </a>
                        </div>
                        <div class="profile-list">
                          <v-img :src="require('@/assets/images/ofs/company/leader-2.png')"></v-img>
                          <h6>C. Andrews Smith</h6>
                          <p>EVP and CFO</p>
                          <v-icon color="#013D3A">mdi-linkedin</v-icon>
                        </div>
                        <div class="profile-list">
                          <v-img :src="require('@/assets/images/ofs/company/leader-3.png')"></v-img>
                          <h6>Kenneth N. Berns</h6>
                          <p>EVP and CCO</p>
                          <v-icon color="#013D3A">mdi-linkedin</v-icon>
                        </div>
                        <div class="profile-list">
                          <v-img :src="require('@/assets/images/ofs/company/leader-4.png')"></v-img>
                          <h6>Seth D. Weiser</h6>
                          <p>SVP and General Counsel</p>
                          <v-icon color="#013D3A">mdi-linkedin</v-icon>
                        </div>
                      </div>
                    </div>
                    <!-- <div class="company-subsi mb-12">
                      <h1 class="mb-4 font-weight-bold">Subsidaries</h1>
                      <div class="subsidary-list text-left mt-10">
                        <div class="profile-list">
                          <router-link to="/subcompany-profile"><v-img :src="require('@/assets/images/ofs/company/subs-1.png')"></v-img></router-link>
                        </div>
                        <div class="profile-list">
                          <router-link to="/subcompany-profile"><v-img :src="require('@/assets/images/ofs/company/subs-2.png')"></v-img></router-link>
                        </div>
                        <div class="profile-list">
                          <router-link to="/subcompany-profile"><v-img :src="require('@/assets/images/ofs/company/subs-3.png')"></v-img></router-link>
                        </div>
                        <div class="profile-list">
                          <router-link to="/subcompany-profile"><v-img :src="require('@/assets/images/ofs/company/subs-4.png')"></v-img></router-link>
                        </div>
                      </div>
                    </div> -->
                    <div class="company-esg mb-16">
                      <h1 class="mb-4 font-weight-bold">ESG Inititives</h1>
                      <v-row class="mt-5">
                        <v-col cols="12" sm="4" v-for="esg in companyData.esgInitiatives">
                          <div class="esg-list text-left">
                            <h4 class="text-left mb-5">{{esg.title}}</h4>
                            <p class="text-left">{{esg.description}}</p>
                            <a :href="esg.attachment" download class="text-decoration-none px-5" v-if="esg.attachment">Download <v-icon>mdi-tray-arrow-down</v-icon></a>
                          </div>
                        </v-col>
                      </v-row>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-main>
          </v-container>
        </div>
      </div>
    </v-col>
</template>
<script>
  import NavbarBeforeLogin from '../Layout/NavbarBeforeLogin.vue'
  import Footer from '../Layout/Footer.vue'
export default {
  name : "ModuleSelection",
  components: {
    NavbarBeforeLogin,
    Footer,
  },
  
  data() {
    return {
      drillingService: [
        {title: 'Drilling Services'},
        {title: 'Contract Drilling Services'},
        {title: 'Hydralic Fracturing'},
        {title: 'Measurement-while-drilling'},
        {title: 'Measurement-while-drilling'},
        {title: 'Directional Drilling'},
        {title: 'Pressure Pumping Service'},
        {title: 'Cementing Services'},
        {title: 'Downhole Performance Motors'},
        {title: 'Horizontal Drilling'},
      ],
      esGList: [
        {
          title: 'Environmetal',
          description: 'Donec vulputate dolor ac tempus fringilla. Vestibulum et consectetur dui, nec condimentum risus. Vivamus vel mauris lacus. Sed vel sagittis augue, sed aliquet velit. Curabitur nunc enim, dignissim eu tellus a, molestie aliquam risus. Mauris ornare eros eget eros semper, ut cursus sapien viverra.',
          file: '2021_ESG_Report.pdf',
        },
        {
          title: 'Social',
          description: 'Donec vulputate dolor ac tempus fringilla. Vestibulum et consectetur dui, nec condimentum risus. Vivamus vel mauris lacus. Sed vel sagittis augue, sed aliquet velit. Curabitur nunc enim, dignissim eu tellus a, molestie aliquam risus. Mauris ornare eros eget eros semper, ut cursus sapien viverra.',
          file: '',
        },
        {
          title: 'Governance',
          description: 'Donec vulputate dolor ac tempus fringilla. Vestibulum et consectetur dui, nec condimentum risus. Vivamus vel mauris lacus. Sed vel sagittis augue, sed aliquet velit. Curabitur nunc enim, dignissim eu tellus a, molestie aliquam risus. Mauris ornare eros eget eros semper, ut cursus sapien viverra.',
          file: '2021_ESG_Report.pdf',
        },
      ],
    };
  },
  computed:{
   showSideBar(){
       return this.$store.getters.g_sideBarOpen;
   },
   activityPanel(){
       return this.$store.getters.g_activityPanel;
   },
   companyData(){
     return this.$store.getters.companyData;
   }
  },
  methods: {
    
  },
  mounted() {
    document.title = "Company Profile - BidOut" 
  }
};
</script>
<style scoped lang="scss">

</style>
