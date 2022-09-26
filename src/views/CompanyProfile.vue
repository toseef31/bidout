<template>
   <v-col class="companyProfile-module inner-Company pa-0 pa-sm-3 pl-sm-0" :class="[ showSideBar ? 'col-md-9 col-12 col-sm-9' : 'mid-content-collapse', activityPanel ? 'd-sm-block' : 'd-md-block']" v-show="!activityPanel">
      <div class="mid-content">
        <div class="content-section">
          <v-row class="mx-0">
            <v-col cols="12" sm="12" md="12" class="d-sm-block px-0">
              <div class="manage-sections pa-4 px-0">
                <div class="top-section d-flex pa-sm-10 pa-4">
                  <h4>Company's Page</h4>
                  <template>
                    <div class="progress-section">
                      <div class="d-flex progress-heading">
                        <p class="mb-0">Page Progress: <strong>80%</strong></p>
                        <small>10 out of 12 modules</small>
                      </div>
                      <v-progress-linear 
                      color="#0D9648"
                      rounded
                      value="80" max-width="100%"></v-progress-linear>
                    </div>
                  </template>
                </div>
                <div class="company-form mt-16">
                  <hr>
                  <v-container class="pa-sm-10 pa-4">
                    <v-row>
                      <v-col cols="8" sm="6" class="pt-10 text-left">
                        <label class="d-block text-left input-label">Company's Logo</label>
                        
                        <v-dialog
                          v-model="dialog"
                          width="700"
                        >
                          <v-card>
                            <v-card-title class="text-h5">
                              Crop Image
                            </v-card-title>
                            <v-card-text>
                              <vue-croppie ref="croppieRef" :showZoomer="false" :enableOrientation="true" :enableResize="false" :boundary="{ width: 600, height: 350}" :viewport="{ width:365, height:90, 'type':'square' }">
                              </vue-croppie>
                            </v-card-text>

                            <v-divider></v-divider>

                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn
                                color="#0D9648"
                                rounded
                                @click="crop"
                                class="px-7 white--text text-capitalize"
                              >
                                Crop
                              </v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                        <!-- the result -->
                        <img :src="companyData.image">
                      </v-col>
                      <v-col cols="4" sm="6" class="pt-10 mt-4 btn-col pl-0 d-flex align-center justify-end">
                        <label for="logo-input" class="text-capitalize mr-2 white--text add-logo d-flex align-center font-weight-bold">Add Image
                          <input type="file" accept="image/*" class="logo-input d-none" id="logo-input" @change="croppie($event)">
                        </label>
                        <v-btn color="rgb(243, 35, 73, 0.1)" class="text-capitalize del-btn" width="48%" height="56px" @click="deleteLogo">Delete</v-btn>
                      </v-col>
                    </v-row>
                  </v-container>
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
                        <v-btn color="#0D9648" large class="text-capitalize white--text" width="176px" height="54px" @click="updateBasic">Add Info</v-btn>
                      </v-col>
                    </v-row>
                  </v-container>
                  <hr>
                  <v-container class="pa-sm-10 pa-4">
                      <label class="d-block text-left main-label">Services Portfolio</label>
                    <v-row>
                      <v-col cols="10" sm="10">
                        <!-- <v-text-field placeholder="Add a service here ..." single-line outlined hide-details ></v-text-field> -->
                        <v-autocomplete
                          v-model="services"
                          :items="allcategories"
                          item-value="name" item-text="name"
                          chips
                          outlined
                          full-width
                          hide-details
                          hide-no-data
                          hide-selected
                          multiple
                          single-line
                          deletable-chips
                        ></v-autocomplete>
                      </v-col>
                      <v-col cols="2" sm="2" class="pl-0">
                      <v-btn color="#0D9648" class="text-capitalize mr-2 white--text" width="100%" height="54px" @click="addService">Add</v-btn>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" sm="10">
                        <div class="service-list text-left">
                          <label v-for="(drill,index) in drillingService"><v-icon>mdi-check</v-icon><span @click="deleteService(index)">{{drill}}</span></label>
                        </div>
                        <p class="text-left mt-5 alert-text">*Click in a service above to delete from list.</p>
                      </v-col>
                    </v-row>
                  </v-container>
                  <hr>
                  <v-container class="pa-sm-10 pa-4">
                      <label class="d-block text-left main-label">Services Location</label>
                    <v-row>
                      <v-col cols="10" sm="10">
                        <v-text-field placeholder="Add a location here ..." single-line outlined hide-details v-model="address"></v-text-field>
                      </v-col>
                      <v-col cols="2" sm="2" class="pl-0 pt-0 pb-0">
                        <v-btn color="#0D9648" class="text-capitalize mr-2 white--text" width="100%" height="54px">Add</v-btn>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" sm="12">
                        <div id="mapss"class="map" style="height:400px"></div>
                        <!-- <v-img
                          :src="require('@/assets/images/profile/location.png')"
                        ></v-img> -->
                      </v-col>
                    </v-row>
                  </v-container>
                  <hr>
                  <v-container class="pa-sm-10 pa-4 corporate-video">
                    <label class="text-left main-label d-block">Corporate Video</label>
                    <v-row>
                      <v-col cols="10" sm="10">
                        <v-text-field placeholder="Add youtube video url ..." v-model="videoLinks" single-line outlined hide-details></v-text-field>
                      </v-col>
                      <v-col cols="2" sm="2" class="pl-0">
                      <v-btn color="#0D9648" class="text-capitalize mr-2 white--text" width="100%" height="54px" @click="addVideos">Add Video</v-btn>
                      </v-col>
                    </v-row>
                    <!-- <v-row>
                      <v-col cols="12" sm="12" class="d-flex align-center justify-space-between">
                        <v-btn color="#0D9648" class="text-capitalize white--text mt-5" width="176px" height="54px" @click="uploadVideo">Add Video</v-btn>
                        <input ref="uploader" class="d-none" type="file"
                          accept="video/*"
                          @change="handleFileUpload($event)"
                        >
                      </v-col>
                    </v-row> -->
                    <v-row v-if="companyData.corporateVideos">
                      <v-col cols="6" sm="6" v-for="(video,key) in companyData.corporateVideos">
                        <div class="video-col">
                          <iframe  id="video-preview" :src="video" width="100%" height="350px"></iframe >
                          <v-btn absolute top left @click="deleteVideo(key)"><v-icon>mdi-trash-can-outline</v-icon> Delete Video</v-btn>
                        </div>
                      </v-col>
                    </v-row>
                  </v-container>
                  <hr>
                  <v-container class="pa-sm-10 pa-4 corporate-video">
                    <v-row>
                      <v-col cols="12" sm="12" class="d-flex align-center justify-space-between">
                      <label class="text-left main-label">Corporate Documents</label>
                        <v-btn color="#0D9648" class="text-capitalize white--text mt-5" width="176px" height="54px" @click="uploadDocument">Add Document</v-btn>
                        <input ref="documentUploader" class="d-none" type="file"
                          accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint, application/pdf"
                          @change="handleDocumentUpload($event)"
                        >
                      </v-col>
                    </v-row>
                    <v-row v-show="documents">
                      <v-col cols="3" sm="2" v-for="(doc,index) in documents">
                        <div class="doc-col">
                          <a :href="doc" target="_blank">
                            <v-img v-if="get_url_extension(doc) == 'pdf'" :src="require('@/assets/images/profile/pdf.png')" width="80px" class="mx-auto"></v-img>
                            <v-img v-else-if="get_url_extension(doc) == 'xlsx'" :src="require('@/assets/images/profile/excel.png')" width="80px" class="mx-auto"></v-img>
                            <v-img v-else :src="require('@/assets/images/profile/other.png')" width="80px" class="mx-auto"></v-img>
                          </a>
                          <v-btn small min-width="36px" min-height="36px" @click="deleteDoc(index)"><v-icon>mdi-trash-can-outline</v-icon></v-btn>
                        </div>
                      </v-col>
                    </v-row>
                  </v-container>
                  <hr>
                  <v-container class="pa-sm-10 pa-4">
                    <v-row>
                      <v-col cols="10" sm="10">
                        <label class="d-block text-left main-label mb-4">Corporate News & Press Releases</label>
                      </v-col>
                    </v-row>
                    <v-form>
                      <v-row>
                        <v-col cols="12" sm="6" text="left">
                          <label class="d-block text-left input-label mb-2">Title</label>
                          <v-text-field placeholder="Enter news title" v-model="newsTitle" single-line outlined hide-details></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" text="left">
                          <label class="d-block text-left input-label mb-2">Date</label>
                          <v-text-field type="date" placeholder="Role ..." v-model="newsDate" single-line outlined hide-details></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" sm="6" text="left">
                          <label class="d-block text-left input-label mb-2">Url</label>
                          <v-text-field placeholder="Enter news url" v-model="newsUrl" single-line outlined></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" sm="12" class="pb-0 pl-0 pt-0">
                          <v-btn color="#0D9648" class="text-capitalize mr-2 white--text" width="176px" height="54px" @click="addNews">Add</v-btn>
                        </v-col>
                      </v-row>
                    </v-form>
                    <v-row align="center" justify="space-between" class="news-list mt-10" v-for="(news,index) in corporateNews">
                      <v-col cols="12" sm="8" text="left">
                        <p class="text-left mb-0">{{news.date}} -  {{news.title}}</p>
                      </v-col>
                      <v-col cols="12" sm="4" class="text-right">
                        <!-- <v-btn default color="transparent" class="text-capitalize edit-btn"><v-icon>mdi-square-edit-outline</v-icon>Edit Details</v-btn> -->
                        <v-btn default color="transparent" class="text-capitalize dele-btn" @click="deleteNews(news.index)"><v-icon>mdi-close</v-icon>Delete</v-btn>
                      </v-col>
                    </v-row>
                  </v-container>
                  <hr>
                  <excutive-leadership></excutive-leadership>
                    <!-- <hr>
                    <v-container class="pa-sm-10 pa-4 corporate-video">
                      <label class="d-block text-left main-label mb-4">Subsidaries</label>
                      <v-row>
                        <v-col cols="10" sm="10">
                          <label for="subs-img">
                            <v-file-input
                              outlined class="logo-input text-center profile-input" 
                              placeholder="Add Image" id="subs-img"  color="#0D9648" hide-details
                            ></v-file-input>
                          </label>
                        </v-col>
                        <v-col
                          cols="2" sm="2" class="pb-0 pt-0 pl-0">
                        <v-btn color="#0D9648" class="text-capitalize mr-2 white--text" width="100%" height="54px">Add</v-btn>
                        </v-col>
                      </v-row>
                      <v-row align="center" justify="space-between" class="news-list white">
                        <v-col cols="6" sm="3" text="left" v-for="(subs, i) in subsidaries" :key="i">
                          <div class="subsid-list">
                            <v-btn absolute left top  color="#F32349" outlined small min-width="32px" height="32px" class="pa-0"><v-icon>mdi-trash-can-outline</v-icon></v-btn>
                            <v-img :src="require('@/assets/images/ofs/company/subs-1.png')"></v-img>
                          </div>
                        </v-col>
                      </v-row>
                    </v-container> -->
                      <hr>
                    <ESGComponent />
                  <hr>
                  <key-facts></key-facts>
                </div>
              </div>
            </v-col>
          </v-row>
        </div>
      </div>
   </v-col>
</template>
<script>
  import Navbar from './Layout/Navbar.vue'
  import LeftSidebar from './Layout/Dashboard/LeftSidebar.vue'
  import RightSidebar from './Layout/Dashboard/RightSidebar.vue'
  import ESGComponent from './CompanyProfile/ESGComponent.vue'
  import KeyFacts from './CompanyProfile/KeyFacts.vue'
  import ExcutiveLeadership from './CompanyProfile/ExcutiveLeadership.vue'
  import _ from 'lodash';
  import { mapActions } from "vuex"
export default {
  name : "CompanyProfile",
  components: {
    Navbar,
    LeftSidebar,
    RightSidebar,
    ESGComponent,
    KeyFacts,
    ExcutiveLeadership,
  },
  
  data() {
    return {
      isHidden : false,
      file: false,
      fileName: '',
      fileExt: '',
      profileName: this.$store.getters.companyData.company,
      profileSummary: this.$store.getters.companyData.overview,
      corporateNews:'',
      services: '',
      subsidaries: [
        { image: 'subs-1' },{ image: 'subs-2' },{ image: 'subs-3' },{ image: 'subs-4' },
      ],
      drillingService: this.$store.getters.companyData.services,
      videoLinks: '',
      videos: this.$store.getters.companyData.corporateVideos,
      croppieImage: '',
      imageSrc: this.$store.getters.companyData.image,
      base64data: '',
      dialog: false,
      imageUrl: '',
      logoName: '',
      newsTitle: '',
      newsDate: '',
      newsUrl: '',
      corporateNews: this.$store.getters.companyData.corporateNews,
      address: "",
      mapOptions: {},
      markerOptions: {},
      map: '',
      documents: this.$store.getters.companyData.corporateDocuments,
    };
  },
  computed:{
    showSideBar(){
        return this.$store.getters.g_sideBarOpen;
    },
    activityPanel(){
        return this.$store.getters.g_activityPanel;
    },
    allcategories(){
      return this.$store.getters.categories;
    },
    companyData(){
      return this.$store.getters.companyData;
    }
  },
  watch:{
    address: _.debounce(function(){
      const autocomplete = new google.maps.places.autocomplete(this.address);
    },500),
  },
  methods: {
     ...mapActions(["getCompany","getCategories","companyProfileImg","updateBasicProfile","addCompanyService","addCompanyVideos","addCompanyNews","addCompanyDocument"]),
     uploadDocument() {
      this.isSelecting = true
      window.addEventListener('focus', () => {
        this.isSelecting = false
      }, { once: true })

      this.$refs.documentUploader.click()
    },
    previewDoc(){
      let video = document.getElementById('doc-preview');
      let reader = new FileReader();
      reader.readAsDataURL( this.file );
      reader.addEventListener('load', function(){
        video.src = reader.result;
      });
    },
    
    handleDocumentUpload( event ){
      this.file = event.target.files[0];
      this.fileName = this.file.name;
      this.fileExt =  this.fileName.split('.').pop();
      // this.previewDoc();
      this.documents = this.$store.getters.companyData.corporateDocuments;
      this.documents.push(this.file.name);
      var data = {
        companyId: this.$store.getters.userInfo.company.id,
        files: this.documents,
      }
      this.addCompanyDocument(data);
    },
    croppie (e) {
      var files = e.target.files || e.dataTransfer.files;
      // alert(files);
      if (!files.length) return;
      this.logoName = files[0].name;
      this.dialog = true;
      var reader = new FileReader();
      reader.onload = e => {
        this.imageUrl = e.target.result
        setTimeout(() => {
            this.bind()
        }, 200)
        
      };

    reader.readAsDataURL(files[0]);
    },
    bind() {
      this.$refs.croppieRef.bind({
        url: this.imageUrl,
      });
    },
    crop() {
      let options = {
        type: 'blob',
        size: { width: 370, height: 90 },
        format: 'png',
        name: this.logoName
      };
      this.$refs.croppieRef.result(options, output => {
        var reader = new FileReader();
        this.base64data = reader.readAsDataURL(output); 
        reader.onloadend = function() {
          this.base64data = reader.result;                
          this.imageSrc = this.base64data;
        }
        this.image_name = this.croppieImage = output;
          this.dialog = false;
          var data = {
            companyId: this.$store.getters.userInfo.company.id,
            files: this.image_name,
          }
          this.companyProfileImg(data);
        });
      },
      updateBasic(){
        var data = {
          companyId: this.$store.getters.userInfo.company.id,
          profileName: this.profileName,
          profileSummary: this.profileSummary,
        }
        this.updateBasicProfile(data);
      },
      getAllCategories(){
        this.getCategories();
        
      },
      deleteLogo(){
        var data = {
          companyId: this.$store.getters.userInfo.company.id,
          files: '',
        }
        this.companyProfileImg(data);
      },
      addService(){
        const array3 = [...this.drillingService, ...this.services]
        this.drillingService = array3;
        this.addCompanyService({companyId: this.$store.getters.userInfo.company.id,services: this.drillingService});
        this.services = '';
      },
      deleteService(index){
        this.drillingService.splice(index,1);
        this.addCompanyService({companyId: this.$store.getters.userInfo.company.id,services: this.drillingService});
      },
      addVideos(){
        this.videos = this.$store.getters.companyData.corporateVideos;
        this.videos.push(this.videoLinks);
        var data = {
          companyId: this.$store.getters.userInfo.company.id,
          videoLinks: this.videos,
        }
        this.addCompanyVideos(data);
        this.videoLinks = '';
      },
      deleteVideo(index){
        if(index >= 0){
          this.videos.splice(index,1);
          var data = {
            companyId: this.$store.getters.userInfo.company.id,
            videoLinks: this.videos,
          }
          this.addCompanyVideos(data);
        }else{
          alert("error");
        }
        
      },
      addDocument(){
        this.documents = this.$store.getters.companyData.corporateDocuments;
        this.documents.push(this.videoLinks);
        var data = {
          companyId: this.$store.getters.userInfo.company.id,
          files: this.documents,
        }
        this.addCompanyDocument(data);
      },
      deleteDoc(index){
        if(index >= 0){
          this.documents.splice(index,1);
          var data = {
            companyId: this.$store.getters.userInfo.company.id,
            videoLinks: this.videos,
          }
          this.addCompanyDocument(data);
        }else{
          alert("error");
        }
        
      },
      addNews(){
        var data = {
          title: this.newsTitle,
          date: this.newsDate,
          url: this.newsUrl,
        }
        this.corporateNews.push(data);
        this.addCompanyNews({companyId: this.$store.getters.userInfo.company.id,corporateNews: this.corporateNews});
        this.newsUrl = '';
        this.newsTitle = '';
        this.newsDate = '';
      },
      deleteNews(index){
        this.corporateNews.splice(index,1);
        this.addCompanyNews({companyId: this.$store.getters.userInfo.company.id,corporateNews: this.corporateNews});
      },
      locationMap(){
        this.mapOptions = {
          center: new google.maps.LatLng(29.721085, -95.342049),
          zoom: 19,
          mapTypeId: 'terrain',
          mapTypeControl: false,
          scaleControl: false,
          streetViewControl: false,
          rotateControl: false,
          fullscreenControl: true,
          disableDefaultUi: false,
          zoomControl: true,
          scrollwheel: false,
        },
        this.markerOptions = {
          url: '/assets/images/dashboard/mapMobile.png',
          size: {width: 60, height: 90, f: 'px', b: 'px',},
          scaledSize: {width: 30, height: 45, f: 'px', b: 'px',},
        },
        console.log(this.mapOptions,'maps');
        this.map = new google.maps.Map(document.getElementById("mapss"), this.mapOptions);
        const autocomplete = new google.maps.places.Autocomplete(this.$refs.address);
      },
      get_url_extension( url ) {
        return url.split(/[#?]/)[0].split('.').pop().trim();
      },
  },
  mounted() {
    document.title = "Company Profile - BidOut";
    this.getCategories();
    this.getCompany(this.$store.getters.userInfo.company.id);
    
    this.locationMap();
  }
};
</script>
<style scoped lang="scss">

</style>