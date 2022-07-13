<template>
  <section class="section-container fill-height">
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
                        <v-col cols="9" sm="9" class="pt-10">
                          <label class="d-block text-left input-label">Company's Logo</label>
                          <v-file-input outlined class="logo-input"></v-file-input>
                        </v-col>
                        <v-col cols="3" sm="3" class="pt-10 mt-4 btn-col pl-0">
                          <v-btn color="#0D9648" class="text-capitalize mr-2 white--text add-logo" width="48%" height="48px">Add Image</v-btn>
                          <v-btn color="rgb(243, 35, 73, 0.1)" class="text-capitalize del-btn" width="48%" height="48px">Delete</v-btn>
                        </v-col>
                      </v-row>
                    </v-container>
                    <hr>
                    <v-container class="pa-sm-10 pa-4">
                      <v-row>
                        <v-col cols="12" sm="12">
                        <label class="d-block text-left input-label">Company's Name</label>
                          <v-text-field label="Company's Name" single-line outlined></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12">
                        <label class="d-block text-left input-label">Corporate Summary</label>
                          <v-textarea outlined name="input-7-4"></v-textarea>
                        </v-col>
                      </v-row>
                    </v-container>
                    <hr>
                    <v-container class="pa-sm-10 pa-4">
                        <label class="d-block text-left main-label">Services Portfolio</label>
                      <v-row>
                        <v-col cols="10" sm="10">
                          <v-text-field label="Add a service here ..." single-line outlined></v-text-field>
                        </v-col>
                        <v-col cols="2" sm="2" class="pl-0">
                        <v-btn color="#0D9648" class="text-capitalize mr-2 white--text" width="100%" height="54px">Add</v-btn>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" sm="10">
                          <div class="service-list text-left">
                            <label v-for="drill in drillingService"><v-icon>mdi-check</v-icon>{{drill.title}}</label>
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
                          <v-text-field label="Add a location here ..." single-line outlined></v-text-field>
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
                          <v-text-field label="Add a corporate news here ..." single-line outlined v-model="corporateNews"></v-text-field>
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
                    <v-form>
                      <v-container class="pa-sm-10 pa-4">
                        <v-row>
                          <v-col cols="12" sm="12">
                          <label class="d-block text-left main-label mb-4">Executive Leadership</label>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" sm="6" text="left">
                            <label class="d-block text-left input-label mb-2">Executive's name</label>
                            <v-text-field label="Full name ..." single-line outlined></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" text="left">
                            <label class="d-block text-left input-label mb-2">Role</label>
                            <v-text-field label="Role ..." single-line outlined></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" sm="6" text="left">
                            <label class="d-block text-left input-label mb-2">LinkedIn Profile</label>
                            <v-text-field label="Paste link here ..." single-line outlined></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" text="left">
                            <label class="d-block text-left input-label mb-2">Profile</label>
                            <v-file-input outlined class="logo-input text-center profile-input" placeholder="Add Image" color="#0D9648"
                              ></v-file-input>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" sm="12">
                            <v-btn color="#0D9648" large class="text-capitalize white--text">Add Executive</v-btn>
                          </v-col>
                        </v-row>
                        <div class="service-list text-left mt-10">
                          <div class="profile-list" v-for="excutive in excutiveLeadership">
                            <v-icon color="#F32349">mdi-trash-can-outline</v-icon>
                            <v-img :src="require('@/assets/images/profile/demo.png')" width="100"></v-img>
                            <h6>{{excutive.name}}</h6>
                            <p>{{excutive.designation}}</p>
                            <v-icon color="#013D3A">mdi-linkedin</v-icon>
                          </div>
                        </div>
                      </v-container>
                    </v-form>
                      <hr>
                      <v-container class="pa-sm-10 pa-4 corporate-video">
                        <label class="d-block text-left main-label mb-4">Subsidaries</label>
                        <v-row>
                          <v-col cols="10" sm="10">
                            <v-file-input
                              outlined class="logo-input text-center profile-input" 
                              placeholder="Add Image"   color="#0D9648"
                            ></v-file-input>
                          </v-col>
                          <v-col
                            cols="2" sm="2" class="pb-0 pt-0 pl-0">
                          <v-btn color="#0D9648" class="text-capitalize mr-2 white--text" width="100%" height="54px">Add</v-btn>
                          </v-col>
                        </v-row>
                        <v-row align="center" justify="space-between" class="news-list">
                          <v-col cols="6" sm="4" text="left" v-for="subs in subsidaries">
                            <div class="subsid-list">
                              <v-btn absolute left top  color="#F32349" outlined small min-width="32px" height="32px" class="pa-0"><v-icon>mdi-trash-can-outline</v-icon></v-btn>
                              <v-img :src="require('@/assets/images/profile/demo1.png')"></v-img>
                            </div>
                          </v-col>
                        </v-row>
                      </v-container>
                        <hr>
                      <v-form>
                        <v-container class="pa-sm-10 pa-4">
                          <v-row>
                            <v-col cols="12" sm="12">
                            <label class="d-block text-left main-label mb-4">ESG Differentiators</label>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col cols="12" sm="6" text="left">
                              <label class="d-block text-left input-label mb-2">Title</label>
                              <v-text-field label="Full name ..." single-line outlined></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" text="left">
                              <label class="d-block text-left input-label mb-2">Document</label>
                              <v-file-input outlined class="logo-input text-center profile-input" placeholder="Add Document" color="#0D9648"></v-file-input>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col cols="12" sm="12" text="left">
                              <label class="d-block text-left input-label mb-2">Text</label>
                              <v-textarea outlined name="input-7-4"></v-textarea>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col cols="12" sm="12">
                            <v-btn color="#0D9648" large class="text-capitalize white--text" width="20%">Add</v-btn>
                            </v-col>
                          </v-row>
                          <v-row class="mt-5">
                            <v-col cols="12" sm="4" v-for="esg in esGList">
                              <div class="esg-list text-left">
                                <h4 class="text-left mb-5">{{esg.title}}</h4>
                                <p class="text-left">{{esg.description}}</p>
                                <a href="" download class="text-decoration-none" v-if="esg.file">{{esg.file}} <v-icon>mdi-tray-arrow-down</v-icon></a><br>
                                <v-btn color="#F32349" outlined small min-width="32px" height="32px" class="pa-0 mt-3"><v-icon>mdi-trash-can-outline</v-icon></v-btn>
                              </div>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-form>
                    <hr>
                    <v-form>
                        <hr>
                        <v-container class="pa-sm-10 pa-4">
                          <v-row>
                            <v-col cols="12" sm="12">
                            <label class="d-block text-left main-label mb-4">Key Facts</label>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col cols="12"sm="6" text="left">
                              <label class="d-block text-left input-label mb-2">Founded</label>
                              <v-text-field label="Enter year ..." single-line outlined type="text"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" text="left">
                              <label class="d-block text-left input-label mb-2">Employess</label>
                              <v-text-field label="Enter Employees ..." single-line outlined type="text"></v-text-field>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col cols="12" sm="6" text="left" >
                              <label class="d-block text-left input-label mb-2">HQ Location</label>
                              <v-text-field label="Enter year ..." single-line outlined type="text"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" text="left">
                              <label class="d-block text-left input-label mb-2">Stock Price</label>
                              <v-text-field label="Enter Employees ..." single-line outlined type="text"></v-text-field>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col cols="12" sm="6" text="left">
                              <label class="d-block text-left input-label mb-2">Website</label>
                              <v-text-field label="Enter year ..." single-line outlined type="text"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" text="left">
                              <label class="d-block text-left input-label mb-2">Company's LinkedIn</label>
                              <v-text-field label="Enter Employees ..." single-line outlined type="text"></v-text-field>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col cols="12" sm="6" text="left">
                              <label class="d-block text-left input-label mb-2">Careers Page</label>
                              <v-text-field label="Enter Employees ..." single-line outlined type="text"></v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                        <hr>
                        <v-container class="pa-sm-10 pa-4">
                          <v-row>
                            <v-col cols="12" sm="12">
                            <label class="d-block text-left main-label mb-4">Account Contacts</label>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col cols="12" sm="6" text="left">
                              <label class="d-block text-left input-label mb-2">Name</label>
                              <v-text-field label="Full name ..." single-line outlined type="text"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" text="left">
                              <label class="d-block text-left input-label mb-2">Role</label>
                              <v-text-field label="Role ..." single-line outlined type="text"></v-text-field>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col cols="12" sm="6" text="left">
                              <label class="d-block text-left input-label mb-2">Email</label>
                              <v-text-field label="Enter Email ..." single-line outlined type="email"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" text="left">
                              <label class="d-block text-left input-label mb-2">Phone Number</label>
                              <v-text-field label="Phone Number ..." single-line outlined type="text"></v-text-field>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col cols="12" sm="6" text="left">
                              <label class="d-block text-left input-label mb-2">LinkedIn Profile</label>
                              <v-text-field label="LinkedIn Profile ..." single-line outlined type="text"></v-text-field>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col  cols="12" sm="12">
                              <v-btn color="#0D9648" large class="text-capitalize white--text" width="20%">Add</v-btn>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-form>
                      <v-container class="pa-sm-10 pa-4">
                        <div class="contact-list text-left mt-5 align-center" v-for="contact in contactList">
                          <div class="profile-list">
                            <h6>{{contact.name}}</h6>
                          </div>
                          <div class="profile-list">
                            <h6>{{contact.name}}</h6>
                          </div>
                          <div class="profile-list">
                            <h6>{{contact.email}}</h6>
                          </div>
                          <div class="profile-list">
                            <h6>{{contact.phone}}</h6>
                          </div>
                          <div class="profile-list text-right">
                            <v-btn default color="transparent" class="text-capitalize dele-btn"><v-icon>mdi-close</v-icon>Delete</v-btn>
                          </div>
                        </div>
                      </v-container>
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
  import axios from 'axios'
export default {
  name : "CompanyProfile",
  components: {
    Navbar,
    LeftSidebar,
    RightSidebar
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
      contactList: [
        { name: 'Keith Chometsky', role: 'Sr. Account Rep', email: 'keith@bidout.app', phone: '(281) 782-5332',},
        { name: 'Randy Jones', role: 'Permian Basin Sales', email: 'randy@bidout.app', phone: '(281) 782-5332', },
        { name: 'Keith Chometsky', role: 'Sr. Account Rep', email: 'keith@bidout.app', phone: '(281) 782-5332',},
        { name: 'Rodney Giles', role: 'Inside Sales Cordina', email: 'rodney@bidout.app', phone: '(281) 782-5332',},
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
      excutiveLeadership: [
        { name: 'William A. (Andy) Hendricks, Jr.',designation: 'President and CEO',},
        { name: 'William A. (Andy) Hendricks, Jr.',designation: 'President and CEO',},
        { name: 'William A. (Andy) Hendricks, Jr.', designation: 'President and CEO',},
        { name: 'William A. (Andy) Hendricks, Jr.',designation: 'President and CEO',},
      ],
      subsidaries: [
        { image: '' },{ image: '' },{ image: '' },{ image: '' },
      ],
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
    };
  },
  computed:{
    showSideBar(){
        return this.$store.getters.g_sideBarOpen;
    },
    activityPanel(){
        return this.$store.getters.g_activityPanel;
    },
  },
  methods: {
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
  },
  mounted() {
  }
};
</script>
<style scoped lang="scss">
@import '@/assets/styles/profile/companyProfile.scss';
</style>