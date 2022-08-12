<template>
  <section class="section-container fill-height createBid-module">
    <navbar></navbar>
     <v-row class="mx-0">
       <v-col :class="[ showSideBar ? 'col-12' : 'toggleLeft-sidebar']" class="left-sidebar pr-1">
          <left-sidebar></left-sidebar>
       </v-col>
       <v-col class="mid-content pa-0 pa-sm-3" :class="[ showSideBar ? 'col-md-9 col-12 col-sm-7' : 'mid-content-collapse', activityPanel ? 'd-sm-block' : 'd-md-block']" v-show="!activityPanel">
          <div class="content-section fill-height pa-0">
            <v-row align="center" justify="space-between" no-gutters class="px-2 px-sm-6 my-4 not-completd-title">
              <v-col cols="12" md="6" class="text-left">
                <div class="d-flex align-center">
                  <h3 class="pl-1 mr-4">Annual Chemical Bid</h3>
                  <p class="preview-text mb-0 ml-3">
                    <a href="" class="text-decoration-none"><v-icon color="#0D9648" class="pr-2">mdi-open-in-new</v-icon>Preview Bid in Supplier View</a>
                  </p>
                </div>
              </v-col>
              <v-col cols="12" md="6" class="text-right">
                <div class="d-flex align-center justify-end">
                  <p class="mb-0 mr-4 auto-text"><strong>Autosaved Draft:</strong> 07/22/2022 12:51 pm</p>
                  <v-btn color="#B8B8B8" class="white--text text-capitalize publish-btn" width="250px" height="52px" large>
                    Publish Bid
                  </v-btn>
                </div>
              </v-col>
            </v-row>
            <div class="bidtabs-section">
              <v-tabs
                v-model="currentItem" class="bids-tabs"
                fixed-tabs
                hide-slider
              >
                <v-tab
                  v-for="(item, index) in tabs"
                  :key="item.value"
                  :href="'#tab-' + item.value" class="text-capitalize black--text font-weight-bold"
                >
                  {{ item.text }} {{item.index}}
                  <v-icon right small color="#F32349">
                    {{item.icon}}
                  </v-icon>
                </v-tab>
              </v-tabs>
              <v-tabs-items v-model="currentItem">
                <v-tab-item
                  value="tab-1"
                >
                  <v-row class="my-8" justify="center">
                    <v-col cols="12" sm="9">
                      <v-form @submit.prevent="bidForm" ref="form">
                        <v-container>
                          <v-row justify="center">
                            <v-col cols="12" sm="12" text="left">
                              <label class="d-block text-left input-label mb-2 font-weight-bold">Bid Title</label>
                              <v-text-field placeholder="Bid Title" single-line outlined type="text" hide-details>
                              </v-text-field>
                            </v-col>
                          </v-row>
                          <v-row justify="center">
                            <v-col cols="12" sm="6" text="left">
                              <label class="d-block text-left input-label mb-2 font-weight-bold">Bid Type <v-icon small>mdi-information-outline</v-icon></label>
                              <v-select outlined hide-details :items="bidType">
                                
                              </v-select>
                            </v-col>
                            <v-col cols="12" sm="6" text="left">
                              <label class="d-block text-left input-label mb-2 font-weight-bold">Due/Date Time</label>
                              <v-text-field placeholder="Bid Title" single-line outlined type="date" hide-details>
                              </v-text-field>
                            </v-col>
                          </v-row>
                          <v-row justify="center">
                            <v-col cols="12" sm="6" text="left">
                              <label class="d-block text-left input-label mb-2 font-weight-bold">Region </label>
                              <v-select outlined hide-details>
                                
                              </v-select>
                            </v-col>
                            <v-col cols="12" sm="6" text="left">
                              <label class="d-block text-left input-label mb-2 font-weight-bold">Q&A <v-icon small>mdi-information-outline</v-icon></label>
                              <v-radio-group
                                row
                                v-model="qa"
                              >
                                <v-radio
                                  label="Yes"
                                  value="yes" checked
                                ></v-radio>
                                <v-radio
                                  label="No"
                                  value="no"
                                ></v-radio>
                              </v-radio-group>
                            </v-col>
                          </v-row>
                          <v-row justify="center">
                            <v-col cols="12" sm="12" text="left">
                              <label class="d-block text-left input-label mb-2 font-weight-bold">Bid Description</label>
                              <v-textarea placeholder="Describe here..." single-line outlined type="text" hide-details>
                              </v-textarea>
                            </v-col>
                          </v-row>
                          <v-row justify="center">
                            <v-col cols="12" sm="12" text="left" v-show="showAdditional">
                              <label class="d-block text-left input-label mb-2 font-weight-bold">Additional Information <v-icon color="#F32349">mdi-trash-can-outline</v-icon></label> 
                              <v-text-field placeholder="Title" single-line outlined type="text">
                              </v-text-field>
                              <v-textarea placeholder="Desribe here" single-line outlined type="text" hide-details>
                              </v-textarea>
                            </v-col>
                            <v-col cols="12" sm="12" class="text-left">
                              <v-btn color="rgba(13, 150, 72, 0.1)" rounded class="text-capitalize adtn-btn font-weight-bold" @click="showAdditional = !showAdditional"><v-icon>mdi-plus</v-icon>Add Aditional Description</v-btn>
                            </v-col>
                          </v-row>
                          <v-row justify="center">
                            <v-col cols="12">
                              <v-btn color="#0D9648" height="56" class="text-capitalize white--text font-weight-bold save-btn px-9" large>Save Changes</v-btn>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-form>
                    </v-col>
                  </v-row>
                </v-tab-item>
                <v-tab-item
                  value="tab-2"
                >
                  <SupplierSection></SupplierSection>
                </v-tab-item>
                <v-tab-item
                  value="tab-3"
                >
                  <team-members></team-members>
                </v-tab-item>
                <v-tab-item
                  value="tab-4" class="bidline-tab"
                >
                  <bid-lines></bid-lines>
                </v-tab-item>
                <v-tab-item
                  value="tab-5" class="attachment-tab mt-5"
                >
                  <div class="attachment-list">
                    <v-simple-table
                        fixed-header
                        height="300px"
                      >
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th class="text-left">
                              
                            </th>
                            <th class="text-left">
                              File Name
                            </th>
                            <th class="text-left">
                              Comment
                            </th>
                            <th class="text-left">
                              File Size
                            </th>
                            <th class="text-left">
                              Uploaded By
                            </th>
                            <th class="text-left">
                              Uploaded Date
                            </th>
                            <th class="text-left">
                              
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td class="text-left"><img :src="require('@/assets/images/bids/FilePdf.png')"></td>
                            <td class="text-left">SafetyPlan.pdf</td>
                            <td class="text-left">Safety Plan</td>
                            <td class="text-left">16kb</td>
                            <td class="text-left">Tyler Cherry</td>
                            <td class="text-left">08/08/2022 1:29 pm</td>
                            <td>
                              <div class="d-flex">
                                <img :src="require('@/assets/images/bids/chatdots.png')" class="mr-3"><v-icon color="#F32349">mdi-trash-can-outline</v-icon>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td class="text-left"><img :src="require('@/assets/images/bids/FilePdf.png')"></td>
                            <td class="text-left">SafetyPlan.pdf</td>
                            <td class="text-left">Safety Plan</td>
                            <td class="text-left">16kb</td>
                            <td class="text-left">Tyler Cherry</td>
                            <td class="text-left">08/08/2022 1:29 pm</td>
                            <td>
                              <div class="d-flex">
                                <img :src="require('@/assets/images/bids/chatdots.png')" class="mr-3"><v-icon color="#F32349">mdi-trash-can-outline</v-icon>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </div>
                  <v-row no-gutters align="center" class="px-6 mt-16">
                    <v-col cols="12" sm="8" md="9">
                      <div class="upload-attach">
                        <label for="uploadFile" class="upload-file pa-8 d-block font-weight-medium">
                          <v-file-input
                              label="File input"
                              filled
                              color="#fff" id="uploadFile"
                            ></v-file-input> Upload or Drop Attachments Here
                        </label>
                      </div>
                    </v-col>
                    <v-col cols="12" sm="4" md="3" class="pl-0 pl-sm-6 mt-3 mt-sm-0">
                      <v-btn large elevation="0" color="#0D9648" height="56px" width="100%" class="white--text font-weight-bold text-capitalize py-4 px-9 attach-btn">Save Changes</v-btn>
                    </v-col>
                  </v-row>
                </v-tab-item>
                <v-tab-item
                  value="tab-6" class="question-tab mt-5"
                >
                  <v-row align="center" justify="space-between" no-gutters class="px-6 my-4">
                    <v-col cols="3">
                      <h4 class="text-left">Questions</h4>
                    </v-col>
                    <v-col cols="6" class="text-right">
                      <v-btn color="#0D9648" large class="text-capitalize py-4 px-11 font-weight-bold white--text add-question" height="56px">Add Question</v-btn>
                    </v-col>
                  </v-row>
                  <v-row justify="center" no-gutters class="mx-3">
                      <v-expansion-panels accordion>
                        <v-expansion-panel
                        >
                          <v-expansion-panel-header>
                            <div class="d-flex align-center justify-space-between question-header">
                              <div class="d-flex align-center question-title">
                                <img :src="require('@/assets/images/bids/DotsSix.png')" class="mr-4"> 
                                <h4>Operational Questions</h4>
                                <div class="ml-5">
                                  <v-icon color="#0D9648" class="mr-6">mdi-square-edit-outline</v-icon>
                                  <v-icon color="#F32349">mdi-trash-can-outline</v-icon>
                                </div>
                              </div>
                              <div class="d-flex align-center mr-9">
                                <v-switch
                                  v-model="switch1"
                                  inset class="mr-4 mt-0" hide-details
                                ></v-switch>
                                <span class="text-muted">Required Question </span>
                              </div>
                            </div>
                          </v-expansion-panel-header>
                          <v-expansion-panel-content class="ml-4 question-body">
                            <div class="d-flex ">
                              <img :src="require('@/assets/images/bids/DotsSix.png')" class="mr-4"> 
                              <p class="mb-0">I agree that this pricing is valid and Supplier Name can performe the work?</p>
                            </div>
                            <div class="d-flex align-center ml-10 mt-5 ">
                              <div class="option-box"> 
                                <v-checkbox
                                    v-model="ex4"
                                    label="Yes"
                                    color="#0D9648"
                                    value="yes"
                                    hide-details
                                  ></v-checkbox>
                              </div>
                              <div class="ml-8">
                                <a href="" class="mr-3 text-muted">Edit</a>
                                <a href="" class="text-muted">Delete</a>
                              </div>
                            </div>
                            <div class="text-left ml-10 mt-5 text-muted">
                              <a href="" class="text-muted">Add Option</a>
                            </div>
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                        <v-expansion-panel
                        >
                          <v-expansion-panel-header>
                            <div class="d-flex align-center justify-space-between question-header">
                              <div class="d-flex align-center">
                                <img :src="require('@/assets/images/bids/DotsSix.png')" class="mr-4"> 
                                <h4>Legal Questions</h4>
                                <div class="ml-5">
                                  <v-icon color="#0D9648" class="mr-6">mdi-square-edit-outline</v-icon>
                                  <v-icon color="#F32349">mdi-trash-can-outline</v-icon>
                                </div>
                              </div>
                              
                            </div>
                          </v-expansion-panel-header>
                          <v-expansion-panel-content class="ml-4 question-body">
                            <div class="d-flex align-center justify-space-between question-subbody">
                              <div class="d-flex">
                                <img :src="require('@/assets/images/bids/DotsSix.png')" class="mr-4"> 
                                <p class="mb-0">Do you curently have a MSA with buyer?</p>
                              </div>
                              <div class="d-flex align-center">
                                <v-switch
                                  v-model="switch1"
                                  inset class="mr-4 mt-0" hide-details
                                ></v-switch>
                                <span class="text-muted">Required Question </span>
                              </div>
                            </div>
                            <div class="d-flex align-center ml-10 mt-5 ">
                              <div class="option-box mr-8"> 
                                <v-checkbox
                                    v-model="ex4"
                                    label="Yes"
                                    color="#0D9648"
                                    value="yes"
                                    hide-details
                                  ></v-checkbox>
                              </div>
                              <div>
                                <a href="" class="mr-3 text-muted">Edit</a>
                              </div>
                            </div>
                            <div class="d-flex align-center ml-10 mt-5 ">
                              <div class="option-box mr-8"> 
                                <v-checkbox
                                    v-model="ex4"
                                    label="No"
                                    color="#0D9648"
                                    value="no"
                                    hide-details
                                  ></v-checkbox>
                              </div>
                                <div>
                                  <a href="" class="mr-3 text-muted">Edit</a>
                                  <a href="" class="text-muted">Delete</a>
                                </div>
                            </div>
                            <div class="text-left ml-10 mt-5 text-muted">
                              <a href="" class="text-muted">Add Option</a>
                            </div>
                            
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                      </v-expansion-panels>
                    </v-row>
                    <div class="text-left ml-4 ml-sm-10 mt-5 mr-4 mr-sm-6">
                      <div class="d-flex justify-space-between mb-2 question-header">
                        <div class="d-flex align-center mb-2">
                          <label class="d-block input-label black--text">Please explain your Previous safety incident </label>
                          <a href="" class="text-muted ml-5">Delete</a>
                        </div>
                        <div class="d-flex align-center mb-2">
                          <v-switch
                            v-model="switch1"
                            inset class="mr-4 mt-0" hide-details
                          ></v-switch>
                          <span class="text-muted">Required Question </span>
                        </div>
                      </div>
                      <v-text-field single-line outlined type="text" height="56px" hide-details class="mb-8">
                      </v-text-field>
                      <hr>
                      <div class="d-flex justify-space-between mb-2 mt-8 question-header">
                        <div class="d-flex align-center mb-2">
                          <label class="d-block input-label black--text">Upload your certificate of insurance </label>
                          <a href="" class="text-muted ml-5">Delete</a>
                        </div>
                        <div class="d-flex align-center mb-2">
                          <v-switch
                            v-model="switch1"
                            inset class="mr-4 mt-0" hide-details
                          ></v-switch>
                          <span class="text-muted">Required Question </span>
                        </div>
                      </div>
                      <div class="upload-attach mb-8">
                        <label for="uploadFile" class="upload-file pa-4 d-block font-weight-medium text-center">
                          <v-file-input
                              label="File input"
                              filled
                              color="#fff" id="uploadFile"
                            ></v-file-input> Upload or Drop Attachments Here
                        </label>
                      </div>
                      <hr>
                      <div class="d-flex justify-space-between mb-2 mt-8 question-header">
                        <div class="d-flex align-center mb-2">
                          <label class="d-block input-label black--text">Upload your certificate of insurance </label>
                          <a href="" class="text-muted ml-5">Delete</a>
                        </div>
                        <div class="d-flex align-center">
                          <v-switch
                            v-model="switch1"
                            inset class="mr-4 mt-0" hide-details
                          ></v-switch>
                          <span class="text-muted">Required Question </span>
                        </div>
                      </div>
                      <div class="upload-attach">
                        <label for="uploadFile" class="upload-file pa-4 d-block font-weight-medium text-center">
                          <v-file-input
                              label="File input"
                              filled
                              color="#fff" id="uploadFile"
                            ></v-file-input> Upload or Drop Attachments Here
                        </label>
                      </div>
                    </div>
                    <v-row justify="center" no-gutters class="mt-10"> 
                      <v-col cols="12">
                        <v-btn color="#0D9648" large height="56px" class="white--text text-capitalize font-weight-bold save-btn px-9">Save Changes</v-btn>
                      </v-col>
                    </v-row>
                </v-tab-item>
              </v-tabs-items>
            </div>
          </div>
       </v-col>
     </v-row>
   </section>
</template>
<script>
  import Navbar from '../Layout/Navbar.vue'
  import LeftSidebar from '../Layout/Dashboard/LeftSidebar.vue'
  import RightSidebar from '../Layout/Dashboard/RightSidebar.vue'
  import SupplierSection from './SupplierSection.vue'
  import TeamMembers from './TeamMembers.vue'
  import BidLines from './BidLines.vue'
  import { mapActions } from "vuex";
export default {
  name : "NotCompleted",
  components: {
    Navbar,
    LeftSidebar,
    RightSidebar,
    SupplierSection,
    TeamMembers,
    BidLines
  },
  
  data() {
    return {
      users: '',
      currentItem: 'tab-Web',
      tabs: [
        { text: 'Bid Detail', icon: 'mdi-information-outline', value: 1 },
        { text: 'Supplier Invitation', icon: 'mdi-information-outline', value: 2}, 
        { text: 'Team Members', icon: 'mdi-information-outline', value: 3}, 
        { text: 'Line Items', icon: 'mdi-information-outline', value: 4}, 
        { text: 'Attachment', icon: 'mdi-information-outline', value: 5}, 
        { text: 'Questions', icon: 'mdi-information-outline', value: 6},
      ],
      qa: 'yes',
      showAdditional: false,
      bidType: ['RFP','RFI'],
      availableSearch: ['All','Company'],
      availableSuppl: null,
      inviteTeam: null,
      subCompany: false,
      switch1: true,
      inputType: ['USD','EUR'],
      units: ['Gallon','Liter'],
      ex4: '',
    };
  },
  computed:{
    showSideBar(){
        return this.$store.getters.g_sideBarOpen;
    },
    activityPanel(){
        return this.$store.getters.g_activityPanel;
    },
    userDatas(){
        return this.$store.getters.userInfo;
    },
  },
  methods: {
    
  },
  mounted() {
    document.title = "Create Bid - BidOut";
    this.users = JSON.parse(localStorage.getItem("userData")).user;
  }
};
</script>
<style scoped lang="scss">

</style>
