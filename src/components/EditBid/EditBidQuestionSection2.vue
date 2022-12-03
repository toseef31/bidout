<template>
  <div class="">
    <v-row align="center" justify="space-between" no-gutters class="px-6 my-4">
      <v-col cols="3">
        <h4 class="text-left">Questions</h4>
      </v-col>
      <v-col cols="6" class="text-right">
        <!-- <v-btn color="#0D9648" large class="text-capitalize py-4 px-11 font-weight-bold white--text add-question" height="56px">Add Question</v-btn> -->
        <v-menu bottom :offset-y="true" content-class="question-menu">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="#0D9648"
              large
              class="
                text-capitalize
                py-4
                px-11
                font-weight-bold
                white--text
                add-question
              "
              height="56px"
              v-bind="attrs"
              v-on="on"
            >
              Add Question
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="createCategory">
              <v-list-item-title>Category Header</v-list-item-title>
            </v-list-item>
            <v-list-item
              v-for="(item, index) in questionTypes"
              :key="index"
              @click="createQuestion(item.type)"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>
    <v-row justify="center" no-gutters class="mx-3">
      <v-col md="12">
        <draggable
          :list="categories"
          ghost-class="ghost"
          :group="{ name: 'g1' }"
        >
          <div
            class="operational-question pl-3"
            v-for="(cat, index) in categories"
            :key="`main-${index}`"
          >
            <div
              v-if="cat.type == 'category'"
              class="d-flex align-center justify-space-between question-header"
            >
              <div class="d-flex align-center question-title mb-5">
                <h4>
                  <template v-if="editCat === index && isCate[index]"
                    ><v-text-field
                      outlined
                      height="30px"
                      width="150px"
                      min-height="40px"
                      hide-details
                      v-model="categories[index]['title']"
                    ></v-text-field
                  ></template>
                  <template v-else>{{ cat.title }}</template>
                </h4>
                <div class="ml-5">
                  <v-icon
                    color="#0D9648"
                    class="mr-6"
                    v-if="!isCate[index]"
                    @click="editCatTitle(index)"
                    >mdi-square-edit-outline</v-icon
                  >
                  <v-icon
                    color="#0D9648"
                    class="mr-6"
                    v-if="isCate[index]"
                    @click="saveTitle(index)"
                    >mdi-content-save</v-icon
                  >
                  <v-icon color="#F32349" @click="deleteCat(index)"
                    >mdi-trash-can-outline</v-icon
                  >
                </div>
              </div>
            </div>
            <div v-if="cat.type == 'question'">
              <template v-if="cat.questionType == 'checkbox'">
                <div class="d-flex align-center justify-space-between">
                  <div class="d-flex align-center">
                    <img
                      :src="require('@/assets/images/bids/DotsSix.png')"
                      class="mr-4"
                    />
                    <template v-if="editQues === index && isQues[index]"
                      ><v-text-field
                        outlined
                        height="30px"
                        min-height="32px"
                        width="150px"
                        hide-details
                        v-model="cat['title']"
                      ></v-text-field
                    ></template>
                    <template v-else
                      ><p class="mb-0 black--text subtitle">
                        {{ cat.title }}
                      </p></template
                    >

                    <a
                      @click="editQusTitle(index)"
                      class="text-muted ml-5"
                      v-if="!isQues[index]"
                      >Edit</a
                    >
                    <a
                      v-if="isQues[index]"
                      @click="editSaveTitle(index)"
                      class="text-muted ml-5"
                      >Save</a
                    >
                    <a @click="deleteQuestion(index)" class="text-muted ml-5"
                      >Delete</a
                    >
                  </div>
                  <div class="d-flex align-center mr-4 mr-sm-6">
                    <v-switch
                      v-model="cat['required']"
                      inset
                      class="mr-4 mt-0"
                      hide-details
                    ></v-switch>
                    <span class="text-muted">Required Question </span>
                  </div>
                </div>
                <div
                  v-for="(option, optIndex) in cat.options"
                  :key="`opt-${optIndex}`"
                >
                  <div class="d-flex align-center ml-10 mt-5">
                    <div class="option-box">
                      <v-checkbox
                        v-model="option['choice']"
                        color="#0D9648"
                        class="mt-0"
                        hide-details
                      >
                        <template v-slot:label>
                          <v-text-field
                            v-if="editLbl === optIndex && isLbl[optIndex]"
                            v-model="option['label']"
                          ></v-text-field>
                          <div v-else>
                            {{ option.label }}
                          </div>
                        </template>
                      </v-checkbox>
                    </div>
                    <div class="ml-8 mt-1">
                      <a
                        @click="editLabel(optIndex)"
                        v-if="!isLbl[optIndex]"
                        class="mr-3 text-muted"
                        >Edit</a
                      >
                      <a
                        @click="saveLabel(optIndex)"
                        v-if="isLbl[optIndex]"
                        class="mr-3 text-muted"
                        >Save</a
                      >
                      <a @click="deleteOption(index, optIndex)" class="text-muted"
                        >Delete</a
                      >
                    </div>
                  </div>
                </div>
                <div class="text-left ml-10 mt-5 text-muted">
                  <a
                    class="text-muted text-decoration-underline"
                    @click="addOptions(index)"
                    >Add Option</a
                  >
                </div>
              </template>
              <div class="text-left mt-5 mr-4 mr-sm-6">
                <template v-if="cat.questionType == 'textfield'">
                  <div
                    class="d-flex justify-space-between mb-2 question-header"
                  >
                    <div class="d-flex align-center mb-2">
                      <img
                        :src="require('@/assets/images/bids/DotsSix.png')"
                        class="mr-4"
                      />
                      <template v-if="editQues === index && isQues[index]"
                        ><v-text-field
                          outlined
                          height="30px"
                          min-height="32px"
                          width="150px"
                          hide-details
                          v-model="cat['title']"
                        ></v-text-field
                      ></template>
                      <template v-else
                        ><label class="mb-0 black--text subtitle">{{
                          cat.title
                        }}</label></template
                      >
                      <a
                        @click="editQusTitle(index)"
                        class="text-muted ml-5"
                        v-if="!isQues[index]"
                        >Edit</a
                      >
                      <a
                        v-if="isQues[index]"
                        @click="editSaveTitle(index)"
                        class="text-muted ml-5"
                        >Save</a
                      >
                      <a @click="deleteQuestion(index)" class="text-muted ml-5"
                        >Delete</a
                      >
                    </div>
                    <div class="d-flex align-center mb-2">
                      <v-switch
                        v-model="cat['required']"
                        inset
                        class="mr-4 mt-0"
                        hide-details
                      ></v-switch>
                      <span class="text-muted">Required Question </span>
                    </div>
                  </div>
                  <div class="ml-10">
                    <v-text-field
                      single-line
                      outlined
                      type="text"
                      height="56px"
                      hide-details
                      class="mb-8"
                    >
                    </v-text-field>
                  </div>
                </template>
                <template v-if="cat.questionType == 'uploadFile'">
                  <div
                    class="
                      d-flex
                      justify-space-between
                      mb-2
                      mt-8
                      question-header
                    "
                  >
                    <div class="d-flex align-center mb-2">
                      <img
                        :src="require('@/assets/images/bids/DotsSix.png')"
                        class="mr-4"
                      />
                      <template v-if="editQues === index && isQues[index]"
                        ><v-text-field
                          outlined
                          height="30px"
                          min-height="32px"
                          width="150px"
                          hide-details
                          v-model="cat['title']"
                        ></v-text-field
                      ></template>
                      <template v-else
                        ><label class="mb-0 black--text subtitle">{{
                          cat.title
                        }}</label></template
                      >

                      <a
                        @click="editQusTitle(index)"
                        class="text-muted ml-5"
                        v-if="!isQues[index]"
                        >Edit</a
                      >
                      <a
                        v-if="isQues[index]"
                        @click="editSaveTitle(index)"
                        class="text-muted ml-5"
                        >Save</a
                      >
                      <a @click="deleteQuestion(index)" class="text-muted ml-5"
                        >Delete</a
                      >
                    </div>
                    <div class="d-flex align-center mb-2">
                      <v-switch
                        v-model="cat['required']"
                        inset
                        class="mr-4 mt-0"
                        hide-details
                      ></v-switch>
                      <span class="text-muted">Required Question </span>
                    </div>
                  </div>
                  <div class="upload-attach mb-8 ml-10">
                    <label
                      for="uploadFile"
                      class="
                        upload-file
                        pa-4
                        d-block
                        font-weight-medium
                        text-center
                      "
                    >
                      <v-file-input
                        label="File input"
                        filled
                        color="#fff"
                        id="uploadFile"
                      ></v-file-input>
                      Upload or Drop Attachments Here
                    </label>
                  </div>
                </template>
                <template v-if="cat.questionType == 'textarea'">
                  <div
                    class="
                      d-flex
                      justify-space-between
                      mb-2
                      mt-8
                      question-header
                    "
                  >
                    <div class="d-flex align-center mb-2">
                      <img
                        :src="require('@/assets/images/bids/DotsSix.png')"
                        class="mr-4"
                      />
                      <template v-if="editQues === index && isQues[index]">
                        <v-text-field
                          outlined
                          solo
                          height="30px"
                          min-height="32px"
                          width="150px"
                          hide-details
                          v-model="cat['title']"
                        ></v-text-field>
                      </template>
                      <template v-else>
                        <label class="mb-0 black--text subtitle">{{
                          cat.title
                        }}</label>
                      </template>

                      <a
                        @click="editQusTitle(index)"
                        class="text-muted ml-5"
                        v-if="!isQues[index]"
                        >Edit</a
                      >
                      <a
                        v-if="isQues[index]"
                        @click="editSaveTitle(index)"
                        class="text-muted ml-5"
                        >Save</a
                      >
                      <a @click="deleteQuestion(index)" class="text-muted ml-5"
                        >Delete</a
                      >
                    </div>
                    <div class="d-flex align-center">
                      <v-switch
                        v-model="cat['required']"
                        inset
                        class="mr-4 mt-0"
                        hide-details
                      ></v-switch>
                      <span class="text-muted">Required Question </span>
                    </div>
                  </div>
                  <div class="upload-attach ml-10">
                    <v-textarea
                      label="File input"
                      outlined
                      color="#fff"
                      id="uploadFile"
                    ></v-textarea>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </draggable>
        <v-divider class="my-5"></v-divider>
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
import draggable from 'vuedraggable';
import { v4 as uuidv4 } from 'uuid';
import { mapActions } from 'vuex';

export default {
  name: 'QuestionSection2',
  components: {
    draggable,
  },
  data() {
    return {
      questionTypes: [
        { title: 'Checkboxes', type: 'checkbox' },
        { title: 'Text Field', type: 'textfield' },
        { title: 'Textarea', type: 'textarea' },
        { title: 'Upload Field', type: 'uploadFile' },
      ],
      categories: [],
      editCat: '',
      isCate: [false],
      editQues: '',
      editLbl: '',
      isQues: [false],
      isLbl: [false],
      multiOptions: [],
    };
  },
  watch: {
    categories: {
      handler() {
        // update order with index
        this.categories.forEach((cat, index) => {
          this.categories[index].order = index;
        });
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions(['updateDraftBid']),
    createCategory() {
      const title = 'add your category title here';
      const data = {
        title,
        id: uuidv4(),
        order: this.categories.length,
        type: 'category',
        options: [],
      };
      this.categories.push(data);
    },
    createQuestion(type) {
      const qusData = {
        title: 'add question title here',
        questionType: type,
        id: uuidv4(),
        order: this.categories ? this.categories.length : 0,
        categoryId: this.categories.id,
        type: 'question',
        options: [],
      };
      this.categories.push(qusData);
    },
    editCatTitle(index) {
      this.editCat = index;
      this.isCate[index] = true;
    },
    editQusTitle(index) {
      this.editQues = index;
      this.isQues[index] = true;
    },
    editSaveTitle(index) {
      this.editQues = -1;
      this.isQues[index] = false;
    },
    questionMoved(event, categoryId, questions) {
      this.categories
        .find((cat) => cat.id === categoryId)
        .questions.forEach((quest, index) => {
          const questionIndex = questions.findIndex((q) => q.id === quest.id);
          this.categories.find((cat) => cat.id === categoryId).questions[
            index
          ].order = questionIndex;
        });
    },
    saveTitle(index) {
      this.editCat = -1;
      this.isCate[index] = false;
    },
    addOptions(index) {
      this.categories[index].options.push({
        id: uuidv4(),
        choice: '',
        label: 'add label here',
        quesIndex: index,
      });
    },
    editLabel(index) {
      this.editLbl = index;
      this.isLbl[index] = true;
    },
    saveLabel(index) {
      this.editLbl = -1;
      this.isLbl[index] = false;
    },
    updateQuestion() {
      this.updateDraftBid({ questions: this.categories });
    },
    deleteQuestion(index) {
      this.categories.splice(index, 1);
    },
    deleteOption(index, optIndex) {
      this.categories[index].options.splice(optIndex, 1);
    },
    deleteCat(index) {
      this.categories.splice(index, 1);
    },
  },
  mounted(){
    if(this.$store.getters.draftBidData.questions || this.$store.getters.draftBidData.questions.length > 0)
    {
      this.categories = this.$store.getters.draftBidData.questions;
    }
  }
};
</script>

<style>
</style>
