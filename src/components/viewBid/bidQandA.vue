<template>
  <v-col class="my-7 pa-0 qanda-section fill-height" align="start">
    <div v-if="bidDetail.bidData.qAndAEnabled === true">
      <div class="px-6" v-if="(getUserType === 'buyer' && getQAndA.length)">
        <span class="title-detail" v-if="getQAndForAnswer.length">Unanswered questions</span>

        <v-avatar rounded size="35" color="#0D9648" class="ml-4" v-if="getUnansweredQuestionCount > 0">
          <span class="white--text badge">{{ getUnansweredQuestionCount }}</span>
        </v-avatar>

        <v-expansion-panels accordion multiple v-model="getPanel" :readonly="true">
          <v-expansion-panel v-model="getPanel" v-for="(item, index) in getQAndForAnswer" :key="index">
            <v-expansion-panel-header>
              <template v-slot:actions>
                <v-col align="center"> <v-icon> </v-icon></v-col>
              </template>
              <template>
                <div class="header d-flex flex-column">
                  <span>Question:</span>

                  <span class=" mt-3">{{ item.question }}</span>

                  <span class="sub-title mt-4">By {{ (item.questionBy.firstName) }} ({{ item.questionByCompany.companyName
                  }})</span>
                  <span class="sub-title mt-2">{{ item.askedOn | moment('MM/DD/YYYY') }} - {{ item.askedOn |
                    moment('hh:mma') }}</span>
                </div>
              </template>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-textarea placeholder="Answer here..." single-line outlined type="text" v-model="answers[index].answer">
              </v-textarea>

              <div class="text-center">
                <v-btn color="#0D9648" height="32" class="text-capitalize white--text font-weight-bold save-button px-12"
                  @click="reply(item._id, index)" large :disabled="getLoading[index].loading">
                  <v-progress-circular v-if="getLoading[index].loading" indeterminate :width="2" size="20"
                    color="#0D9648"></v-progress-circular>

                  <div v-else>Reply</div>
                </v-btn>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>

        <div class="title-detail" v-if="!getQAndForAnswer.length">Answered questions</div>
        <div v-if="getQAndAAnswered.length && getQAndForAnswer.length" class="title-detail mt-6">Answered questions</div>

        <div v-for="(item, index) in getQAndAAnswered" :key="index">

          <div class="header d-flex flex-column pt-4">
            <span>Question:</span>

            <span class=" mt-1">{{ item.question }}</span>

            <span class="sub-title mt-4">By {{ (item.questionBy.firstName) }} {{ (item.questionBy.lastName) }}
              ({{ item.questionByCompany.companyName }})</span>
            <span class="sub-title mt-2">{{ item.askedOn | moment('MM/DD/YYYY') }} - {{ item.askedOn |
              moment('hh:mma') }}</span>
          </div>

          <div class="header d-flex flex-column pt-4">
            <span>Answer:</span>

            <div class=" mt-1">{{ item.answer }}
              <v-tooltip right>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn class="mx-2" icon v-bind="attrs" v-on="on" @click="editAction(index, item.answer)">
                    <v-icon color="#0D9648">
                      mdi-square-edit-outline
                    </v-icon>
                  </v-btn>
                </template>
                <span>Edit answer</span>
              </v-tooltip>
            </div>

            <div v-if="editable[index].isEdit" class="edit-section">
              <v-textarea single-line outlined type="text" v-model="editedAnswer" class="mt-4">
              </v-textarea>

              <div class="text-right">
                <v-btn color="#0D9648" height="40" class="text-capitalize font-weight-bold save-button px-8"
                  @click="editA(item._id, index)" large depressed :disabled="showLoading">
                  <v-progress-circular v-if="showLoading" indeterminate :width="3" size="25"
                    color="#0D9648"></v-progress-circular>
                  <div v-else>Edit</div>
                </v-btn>
              </div>
            </div>
            <span class="sub-title mt-4">By {{ item.answerBy.firstName + " " + item.answerBy.lastName }}
              ({{ item.answerBy.company.companyName }}) </span>
            <span class="sub-title mt-1">{{ item.answeredOn | moment('MM/DD/YYYY') }} - {{ item.answeredOn |
              moment('hh:mma') }}</span>
          </div>
          <v-divider class="mb-1 mt-4" color="#5C5C5C" />
        </div>
      </div>

      <div class="text-center q-title-detail " v-if="(getUserType === 'buyer' && getQAndA.length === 0)">There are
        currently not any questions, which have been asked by suppliers. Once suppliers ask a question this tab will be
        populated.</div>

      <div class="px-6 main-section" v-if="getUserType === 'supplier'">
        <span class="title-detail" v-if="bidDetail.receivingBids">Ask a question</span>

        <v-textarea placeholder="Question here..." single-line outlined type="text" v-model="question" class="mt-4"
          v-if="bidDetail.receivingBids">
        </v-textarea>

        <div class="text-right" v-if="bidDetail.receivingBids">
          <v-btn color="#0D9648" height="40" class="text-capitalize font-weight-bold save-button px-8"
            @click="sendQuestion" large depressed :disabled="showLoading">
            <v-progress-circular v-if="showLoading" indeterminate :width="3" size="25"
              color="#0D9648"></v-progress-circular>
            <div v-else>Add</div>
          </v-btn>
        </div>

        <div v-if="getQAndAAnswered.length" class="title-detail mt-6">Answered questions</div>

        <div v-if="getQAndAAnswered.length">
          <div v-for="(item, index) in getQAndAAnswered" :key="index">
            <div class="header d-flex flex-column pt-4">
              <span>Question:</span>

              <span class=" mt-1">{{ item.question }}</span>
              <span class="sub-title mt-4" v-if="user._id === item.questionBy._id">By {{ (user.firstName + " " +
                user.lastName) }} ({{ user.company.companyName }})</span>
              <span class="sub-title mt-4" v-else-if="item.questionBy && user.company._id === item.questionBy.company">By
                {{ (item.questionBy.firstName + " " + item.questionBy.lastName) }}
                ({{ item.questionByCompany.companyName }})</span>

              <span class="sub-title mt-4" v-else>By Supplier</span>
              <span class="sub-title mt-1">{{ item.askedOn | moment('MM/DD/YYYY') }} - {{ item.askedOn |
                moment('hh:mma') }}</span>
            </div>

            <div class="header d-flex flex-column pt-4">
              <span>Answer:</span>

              <span class=" mt-1">{{ item.answer }}</span>

              <span class="sub-title mt-4">By {{ item.answerBy.firstName }} {{ item.answerBy.lastName }}
                ({{ item.answerBy.company.companyName }}) </span>
              <span class="sub-title mt-1">{{ item.answeredOn | moment('MM/DD/YYYY') }} - {{ item.answeredOn |
                moment('hh:mma') }}</span>

            </div>

            <v-divider class="mb-1 mt-4" color="#5C5C5C" />
          </div>
        </div>

        <div v-if="getQAndAUnAnswered.length" class="title-detail mt-6">Un-answered questions</div>

        <div v-if="getQAndAUnAnswered.length">
          <div v-for="(item, index) in getQAndAUnAnswered" :key="index">
            <div class="header d-flex flex-column pt-4">
              <span>Question:</span>

              <span class=" mt-1">{{ item.question }}</span>
              <span class="sub-title mt-4" v-if="user._id === item.questionBy._id">By {{ (user.firstName + " " +
                user.lastName) }} ({{ user.company.companyName }})</span>

              <span class="sub-title mt-4" v-else-if="item.questionBy && user.company._id === item.questionBy.company">By
                {{ (item.questionBy.firstName + " " + item.questionBy.lastName) }}
                ({{ item.questionByCompany.companyName }})</span>

              <span class="sub-title mt-4" v-else>By Supplier</span>
              <span class="sub-title mt-1">{{ item.askedOn | moment('MM/DD/YYYY') }} - {{ item.askedOn |
                moment('hh:mma') }}</span>
            </div>

            <v-divider class="mb-1 mt-4" color="#5C5C5C" />
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center q-title-detail ">
      Buyer has configured this bid to not allow any Q&A.
    </div>
  </v-col>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      question: '',
      user: '',
      loading: false,
      answers: [],
      editedAnswer: '',
      isEdit: false,
      editable: [],
    };
  },
  computed: {
    getUserType() {
      return this.$store.getters.userType;
    },
    getQAndA() {
      if (this.getUserType === 'buyer') {
        for (let i = 0; i < this.$store.getters.qAndA.length; i++) {
          this.editable.push({
            isEdit: false,
          });
        }
      }
      return this.$store.getters.qAndA;
    },
    getQAndAAnswered() {
      return this.$store.getters.qAndA.filter((el) => el.answer);
    },
    getQAndAUnAnswered() {
      return this.$store.getters.qAndA.filter((el) => !el.answer && this.user._id === el.questionBy._id);
    },
    getQAndForAnswer() {
      return this.getQAndA.filter((el) => {
        this.answers.push({
          loading: false,
          answer: '',
        });
        return !el.answer;
      });
    },
    bidDetail() {
      return this.$store.getters.bidViewData;
    },
    showLoading() {
      return this.loading;
    },
    getLoading() {
      return this.answers;
    },
    getUnansweredQuestionCount() {
      return this.$store.getters.unansweredQuestionCount;
    },
    getPanel() {
      const panel = [];
      this.getQAndForAnswer.forEach((el, index) => panel.push(index));
      return panel;
    },
  },
  methods: {
    ...mapActions(['askQuestion', 'answerQuestion', 'editAnswer']),
    async sendQuestion() {
      this.loading = true;

      await this.askQuestion({
        question: this.question,
        userId: this.user._id,
        bidId: this.bidDetail.bidData._id,
        companyId: this.user.company._id,
      });

      this.loading = false;
      this.question = '';
    },
    async reply(questionId, index) {
      this.answers[index].loading = true;

      await this.answerQuestion({
        answer: this.answers[index].answer,
        userId: this.user._id,
        bidId: this.bidDetail.bidData._id,
        questionId,
      });

      this.answers[index].loading = false;
      this.answers[index].answer = '';
    },
    editAction(index, answer) {
      this.editable[index].isEdit = !this.editable[index].isEdit;
      this.editedAnswer = answer;
    },
    async editA(questionId, index) {
      this.loading = true;

      await this.editAnswer({
        answer: this.editedAnswer,
        userId: this.user._id,
        bidId: this.bidDetail.bidData._id,
        questionId,

      });

      this.loading = false;
      this.editable[index].isEdit = false;
      this.editedAnswer = '';
    },
  },
  mounted() {
    this.user = this.$store.getters.userInfo;
  },
};
</script>
