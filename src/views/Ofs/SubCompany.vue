<template>
  <section class="fill-height company-module white">
    <NavbarBeforeLogin></NavbarBeforeLogin>
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
            <v-img :src="require('@/assets/images/ofs/company/subs-3.png')"></v-img>
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
                  <v-btn color="#0D9647" large tile dense width="100%" height="56" class="font-weight-bold text-capitalize mb-4" type="submit" outlined>Order Services <v-icon class="pl-2">mdi-arrow-right-circle</v-icon></v-btn>
                  <v-btn color="#0D9647" large tile dense width="100%" height="56" class="font-weight-bold text-capitalize" type="submit" outlined>Create RFP <v-icon class="pl-2">mdi-arrow-right-circle</v-icon></v-btn>
                </div>
                <div class="facts-data pa-6 text-left">
                  <h3 class="mb-4"><font color="#013D3A">Key Facts</font></h3>
                  <p><font class="font-weight-bold">Founded:</font> 1978</p>
                  <p><font class="font-weight-bold">Employees:</font> 2100</p>
                  <p><font class="font-weight-bold">HQ Location:</font> Houston, TX</p>
                  <p><font class="font-weight-bold">Stock Price:</font> PTEN (NASDAQ)
                    $19.29 <span class="pink--text">-0.52 (-2.65%)</span></p>
                    <div class="company-links mt-6">
                      <p><a href="" >Website</a><v-icon class="pl-2" color="#013D3A">mdi-arrow-top-right-bold-box-outline</v-icon></p>
                      <p><a href="">Website</a><v-icon class="pl-2" color="#013D3A">mdi-arrow-top-right-bold-box-outline</v-icon></p>
                      <p><a href="">Careers</a><v-icon class="pl-2" color="#013D3A">mdi-arrow-top-right-bold-box-outline</v-icon></p>
                    </div>
                </div>
                <div class="facts-data pa-6 text-left">
                  <h3 class="mb-4"><font color="#013D3A">Account Contacts</font></h3>
                  <div class="contact-list mb-4">
                    <h4 class="mb-0 font-weight-bold">Keith Chometsky</h4>
                    <h4>Sr. Account Rep</h4>
                  </div>
                  <div class="contact-list mb-4">
                    <h4 class="mb-0 font-weight-bold">Randy Jones</h4>
                    <h4>Permian Basin Sales</h4>
                  </div>
                  <div class="contact-list mb-4">
                    <h4 class="mb-0 font-weight-bold">Wilson Smith</h4>
                    <h4>Eagle Ford Sales</h4>
                  </div>
                  <div class="contact-list mb-4">
                    <h4 class="mb-0 font-weight-bold">Tyler Cherry</h4>
                    <h4>Sales Assistant</h4>
                  </div>
                  <div class="contact-list mb-6">
                    <h4 class="mb-0 font-weight-bold">Rodney Giles</h4>
                    <h4>Inside Sales Cordinado r</h4>
                  </div>
                  <router-link to="/login" class="text-decoration-none"><v-btn color="#0D9647" large tile dense width="100%" height="56" class="font-weight-bold white--text text-capitalize" type="submit">Login to View Contact Details <v-icon class="pl-2" color="#fff">mdi-arrow-right-circle</v-icon></v-btn></router-link>
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
                  <h1>MS Directional &nbsp; &nbsp; <span><v-icon color="#0D9647">mdi-check-decagram</v-icon>Premium Service Provider</span></h1>
                </div>
                <div class="company-desc">
                  <h1 class="mb-4 font-weight-bold">Corporate Summary</h1>
                  <p>Donec vulputate dolor ac tempus fringilla. Vestibulum et consectetur dui, nec condimentum risus. Vivamus vel mauris lacus. Sed vel sagittis augue, sed aliquet velit. Curabitur nunc enim, dignissim eu tellus a, molestie aliquam risus. Mauris ornare eros eget eros semper, ut cursus sapien viverra. Cras vehicula, est non pulvinar tempor, velit orci bibendum metus, efficitur facilisis felis quam sit amet sem. Curabitur et augue eget urna vehicula tempus id eu elit. Pellentesque suscipit euismod ante, posuere rhoncus lectus congue non. Nunc sed sapien feugiat, aliquam turpis vel, porta lectus. Nam pellentesque molestie lacus, non placerat purus tempor nec. Nulla porttitor mollis mauris, a vehicula sem posuere vel. Nunc id mi mauris. Nam est purus, ultrices nec neque et, sagittis ornare risus. Curabitur et consequat odio. Nulla vitae ante sodales, sollicitudin ligula non, ultricies quam.</p>
                </div>
                <div class="company-service mb-12">
                  <h1 class="mb-4 font-weight-bold">Services Portfolio</h1>
                  <div class="service-list text-left mt-4">
                    <label v-for="drill in drillingService"><v-icon>mdi-check</v-icon>{{drill.title}}</label>
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
                    <v-col cols="12" md="6">
                      <div class="video-col">
                        <!-- <video id="video-preview" width="100%" src="https://www.youtube.com/embed/WNeLUngb-Xg" /> -->
                        <iframe
                          width="430"
                          height="240"
                          src="https://www.youtube.com/embed/WNeLUngb-Xg"
                          frameborder="0"
                          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                          allowfullscreen
                        ></iframe>
                      </div>
                    </v-col>
                    <v-col cols="12" md="6">
                      <div class="video-col">
                        <!-- <video id="video-preview" width="100%" /> -->
                        <iframe
                          width="430"
                          height="240"
                          src="https://www.youtube.com/embed/WNeLUngb-Xg"
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
                    <v-col cols="3" sm="2">
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
                  <div class="news-list">
                    <p>May 04, 2022 -  Petterson-UTI Reports Drilling Activity for April 2022</p>
                  </div>
                </div>
                <div class="company-leadership mb-12">
                  <h1 class="mb-4 font-weight-bold">Executive Leadership</h1>
                  <div class="leader-list text-left mt-10">
                    <div class="profile-list">
                      <v-img :src="require('@/assets/images/ofs/company/leader-1.png')"></v-img>
                      <h6>William A. (Andy) Hendricks, Jr.</h6>
                      <p>President and CEO</p>
                      <v-icon color="#013D3A">mdi-linkedin</v-icon>
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
                <div class="company-subsi mb-12">
                  <h1 class="mb-4 font-weight-bold">Subsidaries</h1>
                  <div class="subsidary-list text-left mt-10">
                    <div class="profile-list">
                      <v-img :src="require('@/assets/images/ofs/company/subs-1.png')"></v-img>
                    </div>
                    <div class="profile-list">
                      <v-img :src="require('@/assets/images/ofs/company/subs-2.png')"></v-img>
                    </div>
                    <div class="profile-list">
                      <v-img :src="require('@/assets/images/ofs/company/subs-3.png')"></v-img>
                    </div>
                    <div class="profile-list">
                      <v-img :src="require('@/assets/images/ofs/company/subs-4.png')"></v-img>
                    </div>
                  </div>
                </div>
                <div class="company-esg mb-16">
                  <h1 class="mb-4 font-weight-bold">ESG Initiatives</h1>
                  <v-row class="mt-5">
                    <v-col cols="12" sm="4" v-for="esg in esGList">
                      <div class="esg-list text-left">
                        <h4 class="text-left mb-5">{{esg.title}}</h4>
                        <p class="text-left">{{esg.description}}</p>
                        <a href="" download class="text-decoration-none" v-if="esg.file">{{esg.file}} <v-icon>mdi-tray-arrow-down</v-icon></a>
                      </div>
                    </v-col>
                  </v-row>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-main>
      </v-container>
      <Footer></Footer>
   </section>
</template>
<script>
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
   
  },
  methods: {
    
  },
  mounted() {
    document.title = "Subsidaries - BidOut";
  }
};
</script>
<style scoped lang="scss">

</style>
