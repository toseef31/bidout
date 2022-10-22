<template>
  <div>
    <v-row align="center" justify="space-between" no-gutters class="px-6 my-4">
      <v-col cols="3">
        <h4 class="text-left">Questions</h4>
      </v-col>
      <v-col cols="6" class="text-right">
        <v-btn color="#0D9648" large class="text-capitalize py-4 px-11 font-weight-bold white--text add-question" height="56px">Add Question</v-btn>
      </v-col>
    </v-row>
    <v-row justify="center" no-gutters class="mx-3">
      <v-col md="12">
        <div class="operational-question pl-3">
          <div class="d-flex align-center justify-space-between question-header">
            <div class="d-flex align-center question-title mb-5">
              <img :src="require('@/assets/images/bids/DotsSix.png')" class="mr-4"> 
              <h4>Operational Questions</h4>
              <div class="ml-5">
                <v-icon color="#0D9648" class="mr-6">mdi-square-edit-outline</v-icon>
                <v-icon color="#F32349">mdi-trash-can-outline</v-icon>
              </div>
            </div>
          </div>
          <div class="ml-5 question-body">
            <div class="d-flex align-center justify-space-between">
              <div class="d-flex ">
                <img :src="require('@/assets/images/bids/DotsSix.png')" class="mr-4"> 
                <p class="mb-0 black--text subtitle">I agree that this pricing is valid and Supplier Name can performe the work?</p>
              </div>
              <div class="d-flex align-center mr-4 mr-sm-6">
                <v-switch
                  v-model="switch1"
                  inset class="mr-4 mt-0" hide-details
                ></v-switch>
                <span class="text-muted">Required Question </span>
              </div>
            </div>
            <div class="d-flex align-center ml-10 mt-5 ">
              <div class="option-box"> 
                <v-checkbox
                    v-model="ex4"
                    label="Yes"
                    color="#0D9648"
                    value="yes" class="mt-0"
                    hide-details
                  ></v-checkbox>
              </div>
              <div class="ml-8 mt-1">
                <a href="" class="mr-3 text-muted">Edit</a>
                <a href="" class="text-muted">Delete</a>
              </div>
            </div>
            <div class="text-left ml-10 mt-5 text-muted">
              <a href="" class="text-muted">Add Option</a>
            </div>
          </div>
        </div>
        <v-divider class="my-5"></v-divider>
        <!-- Legal Question -->
        <div class="legal-question">
          <div class="legal-mainQuestion pl-3">
            <div class="d-flex align-center justify-space-between question-header mb-5">
              <div class="d-flex align-center">
                <img :src="require('@/assets/images/bids/DotsSix.png')" class="mr-4"> 
                <h4>Legal Questions</h4>
                <div class="ml-5">
                  <v-icon color="#0D9648" class="mr-6">mdi-square-edit-outline</v-icon>
                  <v-icon color="#F32349">mdi-trash-can-outline</v-icon>
                </div>
              </div>
              
            </div>
            <div class="ml-5 question-body">
              <div class="d-flex align-center justify-space-between question-subbody mr-4 mr-sm-6">
                <div class="d-flex">
                  <img :src="require('@/assets/images/bids/DotsSix.png')" class="mr-4"> 
                  <p class="mb-0 black--text subtitle">Do you curently have a MSA with buyer?</p>
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
                      value="yes" class="mt-0"
                      hide-details
                    ></v-checkbox>
                </div>
                <div class="mt-1">
                  <a href="" class="mr-3 text-muted">Edit</a>
                </div>
              </div>
              <div class="d-flex align-center ml-10 mt-5 ">
                <div class="option-box mr-8"> 
                  <v-checkbox
                      v-model="ex4"
                      label="No"
                      color="#0D9648"
                      value="no" class="mt-0"
                      hide-details
                    ></v-checkbox>
                </div>
                  <div class="mt-1">
                    <a href="" class="mr-3 text-muted">Edit</a>
                    <a href="" class="text-muted">Delete</a>
                  </div>
              </div>
              <div class="text-left ml-10 mt-5 text-muted">
                <a href="" class="text-muted">Add Option</a>
              </div>
            </div>
          </div>
          <div class="sub-innerQuestions question-body">
            <div class="text-left ml-4 ml-sm-10 mt-5 mr-4 mr-sm-6">
              <div class="d-flex justify-space-between mb-2 question-header">
                <div class="d-flex align-center mb-2">
                  <label class="d-block input-label black--text subtitle">Please explain your Previous safety incident </label>
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
                  <label class="d-block input-label black--text subtitle">Upload your certificate of insurance </label>
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
                  <label class="d-block input-label black--text subtitle">Upload your certificate of insurance </label>
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
          </div>
        </div>
      </v-col>
      </v-row>
      
      <v-row justify="center" no-gutters class="mt-10 mb-8"> 
        <v-col cols="12">
          <v-btn color="#0D9648" large height="56px" class="white--text text-capitalize font-weight-bold save-btn px-9">Save Changes</v-btn>
        </v-col>
      </v-row>
  </div>
</template>
<script>
  import { mapActions } from "vuex";
export default {
  data() {
    return {
      ex4: '',
      questions: [

      ],
    };
  },
  computed:{
    
  },
  methods: {
  },
  mounted() {
    
  } 
};
</script>