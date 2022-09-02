<template>
  <section class="section-container fill-height companyProfile-module">
    <Navbar></Navbar>
     <v-row class="mx-0">
       <v-col :class="[ showSideBar ? 'col-12' : 'toggleLeft-sidebar']" class="left-sidebar pr-1">
          <LeftSidebar></LeftSidebar>
       </v-col>
       <v-col class="mid-content pa-0 pa-sm-3" :class="[ showSideBar ? 'col-md-9 col-12 col-sm-9' : 'mid-content-collapse', activityPanel ? 'd-sm-block' : 'd-md-block']" v-show="!activityPanel">
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
                                <vue-croppie ref="croppieRef" :showZoomer="false" :enableOrientation="true" :enableResize="false" :boundary="{ width: 500, height: 350}" :viewport="{ width:365, height:90, 'type':'square' }">
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
                          <img :src="cropped">
                        </v-col>
                        <v-col cols="4" sm="6" class="pt-10 mt-4 btn-col pl-0 d-flex align-center">
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
                          <v-text-field label="Company's Name" single-line outlined hide-details></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12">
                        <label class="d-block text-left input-label">Corporate Summary</label>
                          <v-textarea outlined name="input-7-4" hide-details></v-textarea>
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
                            item-value="id" item-text="name"
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
                            <label v-for="drill in drillingService"><v-icon>mdi-check</v-icon>{{drill}}</label>
                          </div>
                          <p class="text-left mt-5 alert-text">*Click in a service above to delete from list.</p>
                        </v-col>
                      </v-row>
                    </v-container>
                    <hr>
                    <v-container class="pa-sm-10 pa-4">
                      <v-row>
                        <label class="d-block text-left main-label pl-3">Services Location</label>
                        <v-col cols="10" sm="10">
                          <v-text-field placeholder="Add a location here ..." single-line outlined hide-details></v-text-field>
                        </v-col>
                        <v-col cols="2" sm="2" class="pl-0 pt-0 pb-0">
                          <v-btn color="#0D9648" class="text-capitalize mr-2 white--text" width="100%" height="54px">Add</v-btn>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" sm="12">
                          <v-img
                            :src="require('@/assets/images/profile/location.png')"
                          ></v-img>
                        </v-col>
                      </v-row>
                    </v-container>
                    <hr>
                    <v-container class="pa-sm-10 pa-4 corporate-video">
                      <v-row>
                        <v-col cols="12" sm="12" class="d-flex align-center justify-space-between">
                        <label class="text-left main-label">Corporate Video</label>
                          <v-btn color="#0D9648" class="text-capitalize white--text mt-5" width="140px" height="54px" @click="uploadVideo">Add Video</v-btn>
                          <input ref="uploader" class="d-none" type="file"
                            accept="video/*"
                            @change="handleFileUpload($event)"
                          >
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="6" sm="6">
                          <div class="video-col" v-show="videos">
                            <video id="video-preview" width="100%" />
                            <v-btn absolute top left><v-icon>mdi-trash-can-outline</v-icon> Delete Video</v-btn>
                            <p>{{videoName}}</p>
                          </div>
                        </v-col>
                      </v-row>
                    </v-container>
                    <hr>
                    <v-container class="pa-sm-10 pa-4 corporate-video">
                      <v-row>
                        <v-col cols="12" sm="12" class="d-flex align-center justify-space-between">
                        <label class="text-left main-label">Corporate Documents</label>
                          <v-btn color="#0D9648" class="text-capitalize white--text mt-5"height="54px" @click="uploadDocument">Add Document</v-btn>
                          <input ref="documentUploader" class="d-none" type="file"
                            accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint, application/pdf"
                            @change="handleDocumentUpload($event)"
                          >
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="3" sm="2">
                          <div class="doc-col" v-show="file">
                            <div id="doc-preview"></div>
                            <v-img v-if="fileExt == 'pdf'" :src="require('@/assets/images/profile/pdf.png')" width="80px" class="mx-auto"></v-img>
                            <v-img v-else-if="fileExt == 'xlsx'" :src="require('@/assets/images/profile/excel.png')" width="80px" class="mx-auto"></v-img>
                            <v-img v-else :src="require('@/assets/images/profile/other.png')" width="80px" class="mx-auto"></v-img>
                            <p>{{fileName}}</p>
                            <v-btn small min-width="36px" min-height="36px"><v-icon>mdi-trash-can-outline</v-icon></v-btn>
                          </div>
                        </v-col>
                      </v-row>
                    </v-container>
                    <hr>
                    <v-container class="pa-sm-10 pa-4 corporate-video">
                      <v-row>
                        <label class="d-block text-left main-label mb-4 pl-3">Corporate News & Press Releases</label>
                        <v-col cols="10" sm="10">
                          <v-text-field placeholder="Add a corporate news here ..." single-line outlined v-model="corporateNews" hide-details></v-text-field>
                        </v-col>
                        <v-col cols="2" sm="2" class="pb-0 pl-0 pt-0">
                        <v-btn color="#0D9648" class="text-capitalize mr-2 white--text" width="100%" height="54px">Add</v-btn>
                        </v-col>
                      </v-row>
                      <v-row align="center" justify="space-between" class="news-list">
                        <v-col cols="12" sm="8" text="left">
                          <p class="text-left mb-0">May 04, 2022 -  Petterson-UTI Reports Drilling Activity for April 2022</p>
                        </v-col>
                        <v-col cols="12" sm="4" class="text-right">
                          <v-btn default color="transparent" class="text-capitalize edit-btn"><v-icon>mdi-square-edit-outline</v-icon>Edit Details</v-btn>
                          <v-btn default color="transparent" class="text-capitalize dele-btn"><v-icon>mdi-close</v-icon>Delete</v-btn>
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
       </v-col>
     </v-row>
   </section>
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
      videos: false,
      videoName: '',
      fileName: '',
      fileExt: '',
      corporateNews:'',
      services: '',
      subsidaries: [
        { image: 'subs-1' },{ image: 'subs-2' },{ image: 'subs-3' },{ image: 'subs-4' },
      ],
      drillingService: [],
      croppieImage: '',
      cropped: null,
      dialog: false,
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
      // if(this.searchCategory){
      //   return _.orderBy(this.$store.getters.categories.filter((category)=>{
      //     return this.searchCategory.toLowerCase().split(' ').every(v => category.name.toLowerCase().includes(v))
      //   }), 'orderNumber', 'asc')
      // }else{
        // setTimeout(() => this.loading = false, 500);
        // return _.orderBy(this.$store.getters.categories, 'orderNumber', 'asc');
      // }
    },
  },
  methods: {
     ...mapActions(["getCategories"]),
    uploadVideo() {
      this.isSelecting = true
      window.addEventListener('focus', () => {
        this.isSelecting = false
      }, { once: true })

      this.$refs.uploader.click()
    },
    previewVideo(){
        let video = document.getElementById('video-preview');
        let reader = new FileReader();
        console.log(reader);
        reader.readAsDataURL( this.videos );
        reader.addEventListener('load', function(){
            video.src = reader.result;
        });
    },
    
    handleFileUpload( event ){
        this.videos = event.target.files[0];
        console.log(this.videos);
        this.videoName = this.videos.name;
        this.previewVideo();
    },
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
        console.log(reader);
        reader.readAsDataURL( this.file );
        reader.addEventListener('load', function(){
            video.src = reader.result;
        });
    },
    
    handleDocumentUpload( event ){
        this.file = event.target.files[0];
        console.log(this.file);
        this.fileName = this.file.name;
        this.fileExt =  this.fileName.split('.').pop();
        console.log(this.fileExt);
        this.previewDoc();
    },

    croppie (e) {
      console.log(e);
      var files = e.target.files || e.dataTransfer.files;
      // alert(files);
      if (!files.length) return;
      this.dialog = true;
      var reader = new FileReader();
      reader.onload = e => {
        this.$refs.croppieRef.bind({
          url: e.target.result

        });
      };

    reader.readAsDataURL(files[0]);
    },
    crop() {
      // Options can be updated.
      // Current option will return a base64 version of the uploaded image with a size of 600px X 450px.
      let options = {
        type: 'base64',
        size: { width: 370, height: 90 },
        format: 'jpeg'
      };
      this.$refs.croppieRef.result(options, output => {
        this.cropped = this.croppieImage = output;
          console.log(this.croppieImage);
          this.dialog = false;
        });
      },

      getAllCategories(){
        this.getCategories();
        
      },
      deleteLogo(){
        this.cropped == null;
      },
      addService(){
        console.log(this.services.name); 
        // this.drillingService.push(this.services);
      }
  },
  mounted() {
    document.title = "Company Profile - BidOut";
    this.getCategories();
  }
};
</script>
<style scoped lang="scss">

</style>