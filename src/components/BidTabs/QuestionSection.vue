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
        <draggable
          :list="questions"
          :disabled="!enabled"
          class="list-group"
          ghost-class="ghost"
          :move="checkMove"
          @start="dragging = true"
          @end="dragging = false"
        >
          <div class="ml-5 question-body" v-for="(question,i) in questions" v-if="question.catIndex == -1">
            <template v-if="question.questionType == 'checkbox'">
              <div class="d-flex align-center justify-space-between">
                <div class="d-flex align-center">
                  
                  <img :src="require('@/assets/images/bids/DotsSix.png')" class="mr-4"> 
                  <template v-if="editQues === i && isQues[i]"><v-text-field outlined height="30px" min-height="32px" width="150px" hide-details v-model="questions[i]['questionTitle']"></v-text-field></template>
                  <template v-else><p class="mb-0 black--text subtitle">{{question.questionTitle}}</p></template>

                  <a @click="editQusTitle(i)" class="text-muted ml-5" v-if="!isQues[i]">Edit</a>
                  <a v-if="isQues[i]" @click="editSaveTitle(i)" class="text-muted ml-5">Save</a>
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
              <div class="d-flex align-center ml-10 mt-5 " v-for="(option ,index) in multiOptions" v-if="option.quesIndex == i">
                
                <div class="option-box"> 
                  <v-checkbox
                      v-model="multiOptions[index]['choice']"
                      color="#0D9648"
                      class="mt-0"
                      hide-details
                    >
                      <template v-slot:label>
                        <v-text-field  v-if="editLbl === index && isLbl[index]" v-model="multiOptions[index]['label']"></v-text-field>
                        <div v-else>
                          {{option.label}}
                        </div>
                      </template>
                    </v-checkbox>
                </div>
                <div class="ml-8 mt-1">
                  <a @click="editLabel(index)" v-if="!isLbl[index]" class="mr-3 text-muted">Edit</a>
                  <a @click="saveLabel(index)" v-if="isLbl[index]" class="mr-3 text-muted">Save</a>
                  <a @click="deleteOption(index)" class="text-muted">Delete</a>
                </div>
              </div>
              <div class="text-left ml-10 mt-5 text-muted">
                <a class="text-muted text-decoration-underline" @click="addOptions(i)">Add Option</a>
              </div>
            </template>
          <!-- </div> -->
          <!-- <div class="sub-innerQuestions question-body"> -->
            <div class="text-left mt-5 mr-4 mr-sm-6">
              <template v-if="question.questionType == 'textfield'">
                <div class="d-flex justify-space-between mb-2 question-header">
                  <div class="d-flex align-center mb-2">
                    <img :src="require('@/assets/images/bids/DotsSix.png')" class="mr-4">
                    <template v-if="editQues === i && isQues[i]"><v-text-field outlined height="30px" min-height="32px" width="150px" hide-details v-model="questions[i]['questionTitle']"></v-text-field></template>
                    <template v-else><label class="mb-0 black--text subtitle">{{question.questionTitle}}</label></template>
                    <a @click="editQusTitle(i)" class="text-muted ml-5" v-if="!isQues[i]">Edit</a>
                    <a v-if="isQues[i]" @click="editSaveTitle(i)" class="text-muted ml-5">Save</a>
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
                    <template v-if="editQues === i && isQues[i]"><v-text-field outlined height="30px" min-height="32px" width="150px" hide-details v-model="questions[i]['questionTitle']"></v-text-field></template>
                    <template v-else><label class="mb-0 black--text subtitle">{{question.questionTitle}}</label></template>

                    <a @click="editQusTitle(i)" class="text-muted ml-5" v-if="!isQues[i]">Edit</a>
                    <a v-if="isQues[i]" @click="editSaveTitle(i)" class="text-muted ml-5">Save</a>
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
                        solo
                        color="#fff" id="uploadFile"
                      ></v-file-input> Upload or Drop Attachments Here
                  </label>
                </div>
              
              </template>
              <template v-if="question.questionType == 'textarea'">
                <div class="d-flex justify-space-between mb-2 mt-8 question-header">
                  <div class="d-flex align-center mb-2">
                    <img :src="require('@/assets/images/bids/DotsSix.png')" class="mr-4">
                    <template v-if="editQues === i && isQues[i]">
                      <v-text-field outlined solo height="30px" min-height="32px" width="150px" hide-details v-model="questions[i]['questionTitle']"></v-text-field>
                    </template>
                    <template v-else>
                      <label class="mb-0 black--text subtitle">{{question.questionTitle}}</label>
                    </template>

                    <a @click="editQusTitle(i)" class="text-muted ml-5" v-if="!isQues[i]">Edit</a>
                    <a v-if="isQues[i]" @click="editSaveTitle(i)" class="text-muted ml-5">Save</a>
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
                     outlined
                    color="#fff"
                  ></v-textarea>
                </div>
              </template>
            </div>
          </div>
        </draggable>
        <draggable
          :list="questionCategories"
          :disabled="!enabled"
          class="list-group"
          ghost-class="ghost"
          @start="draggingCate = true"
          @end="moveCategory($event, questionCategories)"
        >
        <div class="operational-question pl-3 mt-15" v-for="(cat,index) in questionCategories">
          <div class="d-flex align-center justify-space-between question-header">
            <div class="d-flex align-center question-title mb-5">
              <!-- <img :src="require('@/assets/images/bids/DotsSix.png')" class="mr-4">  -->
              <h4>
                <template v-if="editCat === index && isCate[index]"><v-text-field outlined height="30px" width="150px" min-height="40px" hide-details v-model="questionCategories[index]['title']"></v-text-field></template>
                <template v-else>{{cat.title}}</template>
              </h4>
              <div class="ml-5">
                <v-icon color="#0D9648" class="mr-6" v-if="!isCate[index]" @click="editCatTitle(index)">mdi-square-edit-outline</v-icon>
                <v-icon color="#0D9648" class="mr-6" v-if="isCate[index]" @click="saveTitle(index)">mdi-content-save</v-icon>
                <v-icon color="#F32349" @click="deleteCat(index)">mdi-trash-can-outline</v-icon>
              </div>
            </div>
          </div>
          <draggable
            :list="cat.question"
            :disabled="!enabled"
            class="list-group"
            ghost-class="ghost"
            @start="dragging = true"
            @end="moveQuestion($event, cat.id, cat.question)"
          >

            <div class="ml-5 question-body" v-for="(question,i) in cat.question">
              <template v-if="question.questionType == 'checkbox'">
                <div class="d-flex align-center justify-space-between">
                  <div class="d-flex align-center">
                    
                    <img :src="require('@/assets/images/bids/DotsSix.png')" class="mr-4"> 
                    <template v-if="editQues === i && isQues[i]"><v-text-field outlined height="30px" min-height="32px" width="150px" hide-details v-model="cat.question[i]['questionTitle']"></v-text-field></template>
                    <template v-else><p class="mb-0 black--text subtitle">{{question.questionTitle}}</p></template>

                    <a @click="editQusTitle(i)" class="text-muted ml-5" v-if="!isQues[i]">Edit</a>
                    <a v-if="isQues[i]" @click="editSaveTitle(i)" class="text-muted ml-5">Save</a>
                    <a @click="deleteQuestion(i)" class="text-muted ml-5">Delete</a>
                  </div>
                  <div class="d-flex align-center mr-4 mr-sm-6">
                    <v-switch
                      v-model="cat.question[i]['required']"
                      inset class="mr-4 mt-0" hide-details
                    ></v-switch>
                    <span class="text-muted">Required Question </span>
                  </div>
                </div>
                <div class="d-flex align-center ml-10 mt-5 " v-for="(option ,index) in multiOptions" v-if="option.quesIndex == i">
                  
                  <div class="option-box"> 
                    <v-checkbox
                        v-model="multiOptions[index]['choice']"
                        color="#0D9648"
                        class="mt-0"
                        hide-details
                      >
                        <template v-slot:label>
                          <v-text-field  v-if="editLbl === index && isLbl[index]" v-model="multiOptions[index]['label']"></v-text-field>
                          <div v-else>
                            {{option.label}}
                          </div>
                        </template>
                      </v-checkbox>
                  </div>
                  <div class="ml-8 mt-1">
                    <a @click="editLabel(index)" v-if="!isLbl[index]" class="mr-3 text-muted">Edit</a>
                    <a @click="saveLabel(index)" v-if="isLbl[index]" class="mr-3 text-muted">Save</a>
                    <a @click="deleteOption(index)" class="text-muted">Delete</a>
                  </div>
                </div>
                <div class="text-left ml-10 mt-5 text-muted">
                  <a class="text-muted text-decoration-underline" @click="addOptions(i)">Add Option</a>
                </div>
              </template>
            <!-- </div> -->
            <!-- <div class="sub-innerQuestions question-body"> -->
              <div class="text-left mt-5 mr-4 mr-sm-6">
                <template v-if="question.questionType == 'textfield'">
                  <div class="d-flex justify-space-between mb-2 question-header">
                    <div class="d-flex align-center mb-2">
                      <img :src="require('@/assets/images/bids/DotsSix.png')" class="mr-4">
                      <template v-if="editQues === i && isQues[i]"><v-text-field outlined height="30px" min-height="32px" width="150px" hide-details v-model="cat.question[i]['questionTitle']"></v-text-field></template>
                      <template v-else><label class="mb-0 black--text subtitle">{{question.questionTitle}}</label></template>
                      <a @click="editQusTitle(i)" class="text-muted ml-5" v-if="!isQues[i]">Edit</a>
                      <a v-if="isQues[i]" @click="editSaveTitle(i)" class="text-muted ml-5">Save</a>
                      <a @click="deleteQuestion(i)" class="text-muted ml-5">Delete</a>
                    </div>
                    <div class="d-flex align-center mb-2">
                      <v-switch
                        v-model="cat.question[i]['required']"
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
                      <template v-if="editQues === i && isQues[i]"><v-text-field outlined height="30px" min-height="32px" width="150px" hide-details v-model="cat.question[i]['questionTitle']"></v-text-field></template>
                      <template v-else><label class="mb-0 black--text subtitle">{{question.questionTitle}}</label></template>

                      <a @click="editQusTitle(i)" class="text-muted ml-5" v-if="!isQues[i]">Edit</a>
                      <a v-if="isQues[i]" @click="editSaveTitle(i)" class="text-muted ml-5">Save</a>
                      <a @click="deleteQuestion(i)" class="text-muted ml-5">Delete</a>
                    </div>
                    <div class="d-flex align-center mb-2">
                      <v-switch
                        v-model="cat.question[i]['required']"
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
                      <template v-if="editQues === i && isQues[i]">
                        <v-text-field outlined solo height="30px" min-height="32px" width="150px" hide-details v-model="cat.question[i]['questionTitle']"></v-text-field>
                      </template>
                      <template v-else>
                        <label class="mb-0 black--text subtitle">{{question.questionTitle}}</label>
                      </template>

                      <a @click="editQusTitle(i)" class="text-muted ml-5" v-if="!isQues[i]">Edit</a>
                      <a v-if="isQues[i]" @click="editSaveTitle(i)" class="text-muted ml-5">Save</a>
                      <a @click="deleteQuestion(i)" class="text-muted ml-5">Delete</a>
                    </div>
                    <div class="d-flex align-center">
                      <v-switch
                        v-model="cat.question[i]['required']"
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
      </draggable>
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
  import _ from 'lodash'
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
      isCate: [false],
      offset: true,
      categories:[],
      questions: [],
      switch1: false,
      editQues: '',
      editLbl: '',
      isQues: [false],
      isLbl: [false],
      catCount: null,
      enabled: true,
      dragging: false,
      draggingCate: false,
      multiOptions:[ {label: 'yes',choice: ''}],
      catIds: '',
    };
  },
  computed:{
    draggingInfo() {
      return this.dragging ? "under drag" : "";
    },
    questionCategories(){
      return _.orderBy(this.categories, "orderNumber");
    }
  },
  methods: {
    ...mapActions(["updateDraftBid"]),
    createCategory(){
      const head = Date.now().toString();
      const tail = Math.random().toString().substr(2);
      var title = "add your category title here";
      const order = this.categories.length;
      var data = {
        title: title,
        id: head + tail,
        question: [],
        orderNumber: order + 1,
      }
      this.categories.push(data);
    },
    createQuestion(type){
      if(this.categories.length > 0){
        this.catCount = this.categories.length - 1;
      }else{
        this.catCount = -1;
      }
      if(this.catCount != -1){

        JSON.parse(JSON.stringify(this.categories.map((item, index) => {
          if(index == this.catCount){
            // console.log(item.id);
          this.catIds = item.id;
          }
        })))
      }else{
        this.catIds = null;
      }

      const head = Date.now().toString();
      const tail = Math.random().toString().substr(2);
      var qusData = {
        questionTitle: "add question title here",
        questionType: type,
        catIndex: this.catCount,
        id: head + tail,
        catId: this.catIds,
      }
      this.questions.push(qusData);
      var data = {
        question: this.questions,
      }
      this.categories[this.catCount].question.push(qusData);
      console.log(this.categories,'categoriess');
    },
    editCatTitle(index){
      this.editCat = index;
      this.isCate[index] = true;
    },
    saveTitle(index){
      this.editCat = -1;
      this.isCate[index] = false;
    },
    editQusTitle(index){
      this.editQues = index;
      this.isQues[index] = true;
    },
    editSaveTitle(index){
      this.editQues = -1;
      this.isQues[index] = false;
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
    deleteCat(index){
      this.categories.splice(index,1);
     
    },
    addOptions(index){
      this.multiOptions.push({  
        choice: "",
        label: "add label here",
        quesIndex:index
      })
    },
    deleteOption(index){
      this.multiOptions.splice(index,1);
    },
    editLabel(index){
      this.editLbl = index;
      this.isLbl[index] = true;
    },
    saveLabel(index){
      this.editLbl = -1;
      this.isLbl[index] = false;
    },
    moveQuestion(e, id, items) {
      // console.log(e,"dasdas");
      this.categories.filter((service) => service.id === id)[0].question.forEach((subQuestion, index) => {
        // console.log(subQuestion.catId,'items',items);
        const subQuestionIndex = items.findIndex((item) => item.catId === subQuestion.catId);
        // const subQuestionValue = items.find((item) => item.catId === subQuestion.catId);
      console.log(id,'itemss',subQuestionValue,'new index',subQuestionIndex)

        this.categories.filter((service) => service.id === id)[0].question[index].catIndex = subQuestionIndex;
        // this.categories.filter((service) => service.id === id)[0].question.push(subQuestionValue);
        console.log(this.categories);
      });
      
    },
    moveCategory(e,category) {
      console.log("Future index: ",category);
    },
    moveCategory(e, category) {
      this.categories.forEach((subService, index) => {
        const subServiceIndex = category.findIndex((item) => item.id === subService.id);
        this.categories[index].orderNumber = subServiceIndex;
      });
     
    },
    checkMove: function(e) {
      console.log("Future index: " + e.draggedContext.futureIndex);
    },
  },
  created(){
     // const timer = setInterval(() => {
     //    this.updateQuestion();
     //  }, 60000);

     //  this.$once("hook:beforeDestroy", () => {
     //    clearInterval(timer);
     //  });
  },
  mounted() {
    
  } 
};
</script>