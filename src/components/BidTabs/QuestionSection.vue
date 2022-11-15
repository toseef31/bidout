<template>
  <div>
    <v-row align="center" justify="space-between" no-gutters class="px-6 my-4">
      <v-col cols="3">
        <h4 class="text-left">Questions</h4>
      </v-col>
      <v-col cols="6" class="text-right">
        <!-- <v-btn color="#0D9648" large class="text-capitalize py-4 px-11 font-weight-bold white--text add-question" height="56px">Add Question</v-btn> -->
        <v-menu
          bottom
          :offset-y="offset" content-class="question-menu"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="#0D9648" large class="text-capitalize py-4 px-11 font-weight-bold white--text add-question" height="56px"
              v-bind="attrs"
              v-on="on"
            >
              Add Question
            </v-btn>
          </template>
          <v-list >
            <v-list-item @click="createCategory">
              <v-list-item-title >Category Header</v-list-item-title>
            </v-list-item>
            <v-list-item
              v-for="(item, index) in items"
              :key="index" @click="createQuestion(item.type)"
            >
              <v-list-item-title >{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>
    <v-row justify="center" no-gutters class="mx-3">
      <v-col md="12">
        <div class="operational-question pl-3" v-for="(cat,index) in categories">
          
          <div class="d-flex align-center justify-space-between question-header">
            <div class="d-flex align-center question-title mb-5">
              <!-- <img :src="require('@/assets/images/bids/DotsSix.png')" class="mr-4">  -->
              <h4>
                <template v-if="editCat === index && isCate"><v-text-field outlined height="30px" width="150px" hide-details v-model="categories[index]['title']"></v-text-field></template>
                <template v-else>{{cat.title}}</template>
              </h4>
              <div class="ml-5">
                <v-icon color="#0D9648" class="mr-6" v-if="!isCate" @click="editCatTitle(index)">mdi-square-edit-outline</v-icon>
                <v-icon color="#0D9648" class="mr-6" v-if="isCate" @click="isCate = !isCate">mdi-content-save</v-icon>
                <v-icon color="#F32349" @click="deleteCat">mdi-trash-can-outline</v-icon>
              </div>
            </div>
          </div>
          <draggable
            :list="questions"
            :disabled="!enabled"
            class="list-group"
            ghost-class="ghost"
            :move="checkMove"
            @start="dragging = true"
            @end="dragging = false"
          >
            <div class="ml-5 question-body" v-for="(question,i) in questions">
              <template v-if="question.questionType == 'checkbox'">
                <div class="d-flex align-center justify-space-between">
                  <div class="d-flex align-center">
                    
                    <img :src="require('@/assets/images/bids/DotsSix.png')" class="mr-4"> 
                    <template v-if="editQues === i && isQues"><v-text-field outlined height="30px" min-height="32px" width="150px" hide-details v-model="questions[i]['questionTitle']"></v-text-field></template>
                    <template v-else><p class="mb-0 black--text subtitle">{{question.questionTitle}}</p></template>

                    <a @click="editQusTitle(i)" class="text-muted ml-5" v-if="!isQues">Edit</a>
                    <a v-if="editQues === i && isQues" @click="isQues = !isQues" class="text-muted ml-5">Save</a>
                    <a @click="deleteQuestion(i)" class="text-muted ml-5">Delete</a>
                  </div>
                  <div class="d-flex align-center mr-4 mr-sm-6">
                    <v-switch
                      v-model="questions[i]['required']"
                      inset class="mr-4 mt-0" hide-details
                    ></v-switch>
                    <span class="text-muted">Required Question </span>
                  </div>
                </div>
                <div class="d-flex align-center ml-10 mt-5 ">
                  <div class="option-box"> 
                    <v-checkbox
                        v-model="questions[i]['options']"
                        label="Yes"
                        color="#0D9648"
                        class="mt-0"
                        hide-details
                      ></v-checkbox>
                  </div>
                  <div class="ml-8 mt-1">
                    <a href="" class="mr-3 text-muted">Edit</a>
                    <a href="" class="text-muted">Delete</a>
                  </div>
                </div>
                <!-- <div class="text-left ml-10 mt-5 text-muted">
                  <a href="" class="text-muted">Add Option</a>
                </div> -->
              </template>
            <!-- </div> -->
            <!-- <div class="sub-innerQuestions question-body"> -->
              <div class="text-left mt-5 mr-4 mr-sm-6">
                <template v-if="question.questionType == 'textfield'">
                  <div class="d-flex justify-space-between mb-2 question-header">
                    <div class="d-flex align-center mb-2">
                      <img :src="require('@/assets/images/bids/DotsSix.png')" class="mr-4">
                      <template v-if="editQues === i && isQues"><v-text-field outlined height="30px" min-height="32px" width="150px" hide-details v-model="questions[i]['questionTitle']"></v-text-field></template>
                      <template v-else><label class="mb-0 black--text subtitle">{{question.questionTitle}}</label></template>
                      <a @click="editQusTitle(i)" class="text-muted ml-5" v-if="!isQues">Edit</a>
                      <a v-if="editQues === i && isQues" @click="isQues = !isQues" class="text-muted ml-5">Save</a>
                      <a @click="deleteQuestion(i)" class="text-muted ml-5">Delete</a>
                    </div>
                    <div class="d-flex align-center mb-2">
                      <v-switch
                        v-model="questions[i]['required']"
                        inset class="mr-4 mt-0" hide-details
                      ></v-switch>
                      <span class="text-muted">Required Question </span>
                    </div>
                  </div>
                  <div class="ml-10">
                    <v-text-field single-line outlined type="text" height="56px" hide-details class="mb-8">
                    </v-text-field>
                  </div>
                
                </template>
                <template v-if="question.questionType == 'uploadFile'">
                  <div class="d-flex justify-space-between mb-2 mt-8 question-header">
                    <div class="d-flex align-center mb-2">
                      <img :src="require('@/assets/images/bids/DotsSix.png')" class="mr-4">
                      <template v-if="editQues === i && isQues"><v-text-field outlined height="30px" min-height="32px" width="150px" hide-details v-model="questions[i]['questionTitle']"></v-text-field></template>
                      <template v-else><label class="mb-0 black--text subtitle">{{question.questionTitle}}</label></template>

                      <a @click="editQusTitle(i)" class="text-muted ml-5" v-if="!isQues">Edit</a>
                      <a v-if="editQues === i && isQues" @click="isQues = !isQues" class="text-muted ml-5">Save</a>
                      <a @click="deleteQuestion(i)" class="text-muted ml-5">Delete</a>
                    </div>
                    <div class="d-flex align-center mb-2">
                      <v-switch
                        v-model="questions[i]['required']"
                        inset class="mr-4 mt-0" hide-details
                      ></v-switch>
                      <span class="text-muted">Required Question </span>
                    </div>
                  </div>
                  <div class="upload-attach mb-8 ml-10">
                    <label for="uploadFile" class="upload-file pa-4 d-block font-weight-medium text-center">
                      <v-file-input
                          label="File input"
                          filled
                          color="#fff" id="uploadFile"
                        ></v-file-input> Upload or Drop Attachments Here
                    </label>
                  </div>
                
                </template>
                <template v-if="question.questionType == 'textarea'">
                  <div class="d-flex justify-space-between mb-2 mt-8 question-header">
                    <div class="d-flex align-center mb-2">
                      <img :src="require('@/assets/images/bids/DotsSix.png')" class="mr-4">
                      <template v-if="editQues === i && isQues">
                        <v-text-field outlined solo height="30px" min-height="32px" width="150px" hide-details v-model="questions[i]['questionTitle']"></v-text-field>
                      </template>
                      <template v-else>
                        <label class="mb-0 black--text subtitle">{{question.questionTitle}}</label>
                      </template>

                      <a @click="editQusTitle(i)" class="text-muted ml-5" v-if="!isQues">Edit</a>
                      <a v-if="editQues === i && isQues" @click="isQues = !isQues" class="text-muted ml-5">Save</a>
                      <a @click="deleteQuestion(i)" class="text-muted ml-5">Delete</a>
                    </div>
                    <div class="d-flex align-center">
                      <v-switch
                        v-model="questions[i]['required']"
                        inset class="mr-4 mt-0" hide-details
                      ></v-switch>
                      <span class="text-muted">Required Question </span>
                    </div>
                  </div>
                  <div class="upload-attach ml-10">
                    <v-textarea
                      label="File input"
                       outlined
                      color="#fff" id="uploadFile"
                    ></v-textarea>
                  </div>
                </template>
              </div>
            </div>
          </draggable>
        </div>
        <v-divider class="my-5"></v-divider>
        <!-- Legal Question -->
        
      </v-col>
      </v-row>
      
      <v-row justify="center" no-gutters class="mt-10 mb-8"> 
        <v-col cols="12">
          <v-btn color="#0D9648" large height="56px" class="white--text text-capitalize font-weight-bold save-btn px-9" @click="updateQuestion">Save Changes</v-btn>
        </v-col>
      </v-row>
  </div>
</template>
<script>
  import draggable from 'vuedraggable'
  import { mapActions } from "vuex";
export default {
  components: {
    draggable,
  },
  data() {
    return {
      ex4: '',
      items: [
        {title:'Checkboxes', type: 'checkbox'},
        {title:'Text Field', type: 'textfield'},
        {title:'Textarea', type: 'textarea'},
        {title:'Upload Field', type: 'uploadFile'},
      ],
      editCat: '',
      isCate: false,
      offset: true,
      categories:[],
      questions: [],
      switch1: false,
      editQues: '',
      isQues: false,
      enabled: true,
      dragging: false
    };
  },
  computed:{
    draggingInfo() {
      return this.dragging ? "under drag" : "";
    },
  },
  methods: {
    ...mapActions(["updateDraftBid"]),
    createCategory(){
      var title = "add your category title here";
      var data = {
        title: title,
        question: this.questions,
      }
      this.categories.push(data);
    },
    createQuestion(type){
      var qusData = {
        questionTitle: "add question title here",
        questionType: type,
      }
      this.questions.push(qusData);
      var data = {
        question: this.questions,
      }
      
      // this.categories.push(data);
   
    },
    editCatTitle(index){
      this.editCat = index;
      this.isCate = true;
    },
    editQusTitle(index){
      this.editQues = index;
      console.log(index,'index',this.editQues);
      this.isQues = true;
    },
    updateQuestion(){
      this.updateDraftBid(this.categories);
    },
    deleteQuestion(index){
      this.questions.splice(index,1);
      // var data = {
      //   question: this.questions,
      // }
      // this.categories.push(data);
    },
    deleteCat(){
      this.categories = [];
      this.questions = [];
    },
    checkMove: function(e) {
      console.log("Future index: " + e.draggedContext.futureIndex);
    },
  },
  created(){
     const timer = setInterval(() => {
        this.updateQuestion();
      }, 60000);

      this.$once("hook:beforeDestroy", () => {
        clearInterval(timer);
      });
  }
  mounted() {
    
  } 
};
</script>