<template>
  <v-col class="my-7 pa-0 qanda-section fill-height" align="start">
    <div class="px-6" v-if="(getUserType === 'buyer' && getQAndA.length)">
      <span class="title-detail" v-if="getQAndForAnswer.length">Unanswered questions</span >

      <v-avatar rounded size="35" color="#0D9648" class="ml-4" v-if="getUnansweredQuestionCount > 0">
        <span class="white--text badge">{{getUnansweredQuestionCount}}</span>
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

                <span class=" mt-3"
                  >{{item.question}}</span
                >

                <span class="sub-title mt-4"
                  >By {{(item.questionedUserName)}} ({{item.questionedUserCompany
                }})</span
                >
                <span class="sub-title mt-2">{{ item.askedOn._seconds | moment('MM/DD/YYYY')}} - {{ item.askedOn._seconds | moment('hh:mma')}}</span>
              </div>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-textarea
              placeholder="Answer here..."
              single-line
              outlined
              type="text"
              v-model="answer"
            >
            </v-textarea>

            <div class="text-center">
              <v-btn
                color="#0D9648"
                height="32"
                class="text-capitalize white--text font-weight-bold save-button px-12"
                @click="replay(item.id)"
                large
                :disabled="showLoading"
                >
                <v-progress-circular
                    v-if="showLoading"
                    indeterminate
                    :width="2"
                    size="20"
                    color="#0D9648"
                    ></v-progress-circular>

                <div v-else>Replay</div>
                </v-btn

              >
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

      <div class="title-detail" v-if="!getQAndForAnswer.length">Answered questions</div>
      <div v-else class="title-detail mt-6">Answer questions</div>

   <div v-for="(item,index) in getQAndA" :key="index">

      <div class="header d-flex flex-column pt-4">
        <span>Question:</span>

        <span class=" mt-1"
          >{{item.question}}</span
        >

        <span class="sub-title mt-4">By {{(item.questionedUserName)}} ({{item.questionedUserCompany
}})</span>
        <span class="sub-title mt-2">{{ item.askedOn._seconds | moment('MM/DD/YYYY')}} - {{ item.askedOn._seconds | moment('hh:mma')}}</span>
      </div>

      <div class="header d-flex flex-column pt-4" >
        <span>Answer:</span>

        <span class=" mt-1" v-if="item.answer"
          >{{item.answer}}</span
        >

        <span class="sub-title mt-4" v-if="item.answer">By {{user.firstName + " " + user.lastName}} (Patterson-UTI) </span>
        <span class="sub-title mt-1" v-if="item.answer">{{ item.answeredOn._seconds | moment('MM/DD/YYYY')}} - {{ item.answeredOn._seconds | moment('hh:mma')}}</span>
        <span class="mt-2 sub-title" v-if="!item.answer">Not answered yet</span>
      </div>
      <v-divider class="mb-1 mt-4" color="#5C5C5C"/>
    </div>
  </div>

    <div class="text-center q-title-detail " v-if="(getUserType === 'buyer' && getQAndA.length === 0)">There are currently not any questions, which have been asked by suppliers. Once suppliers as a question this tab will be populated.</div>

    <div class="px-6 main-section" v-if="getUserType === 'supplier'">
        <span class="title-detail">Ask a question</span>

            <v-textarea
              placeholder="Question here..."
              single-line
              outlined
              type="text"
              v-model="question"
              class="mt-4"
            >
            </v-textarea>

            <div class="text-right">
              <v-btn
                color="#0D9648"
                height="40"
                class="text-capitalize font-weight-bold save-button px-8"
                @click="sendQuestion"
                large
                depressed
                :disabled="showLoading"
                >
                    <v-progress-circular
                    v-if="showLoading"
                    indeterminate
                    :width="3"
                    size="25"
                    color="#0D9648"
                    ></v-progress-circular>
                    <div v-else>Add</div>
              </v-btn>
            </div>

      <div v-if="getQAndA.length" class="title-detail mt-6">Answered questions</div>

    <div v-if="getQAndA.length">
        <div v-for="(item,index) in getQAndA" :key="index">
          <div class="header d-flex flex-column pt-4">
            <span>Question:</span>

            <span class=" mt-1"
              >{{item.question}}</span
            >

            <span class="sub-title mt-4">By {{(user.firstName + " " + user.lastName)}} ({{user.company.company}})</span>
            <span class="sub-title mt-1">{{ item.askedOn._seconds | moment('MM/DD/YYYY')}} - {{ item.askedOn._seconds | moment('hh:mma')}}</span>
          </div>

           <div class="header d-flex flex-column pt-4">
              <span>Answer:</span>

              <span class=" mt-1" v-if="item.answer"
                >{{item.answer}}</span
              >

              <span class="sub-title mt-4" v-if="item.answer">By {{item.answeredUserName
}} ({{item.answeredUserCompany}}) </span>
              <span class="sub-title mt-1" v-if="item.answer">{{item.answeredOn._seconds | moment('MM/DD/YYYY')}} - {{ item.answeredOn._seconds | moment('hh:mma')}}</span>
              <span class="mt-2 sub-title" v-if="!item.answer">Not answered yet</span>
           </div>

           <v-divider class="mb-1 mt-4" color="#5C5C5C"/>
        </div>
      </div>
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
      answer: '',
    };
  },
  computed: {
    getUserType() {
      return this.$store.getters.userType;
    },
    getQAndA() {
      return this.$store.getters.qAndA;
    },
    getQAndForAnswer() {
      return this.getQAndA.filter((el) => !el.answer);
    },
    bidDetail() {
      return this.$store.getters.bidViewData;
    },
    showLoading() {
      return this.loading;
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
    ...mapActions(['askQuestion', 'answerQuestion']),
    async sendQuestion() {
      this.loading = true;

      await this.askQuestion({
        question: this.question,
        userId: this.user.id,
        bidId: this.bidDetail.bidData.id,
        companyId: this.user.company.id,
      });

      this.loading = false;
      this.question = '';
    },
    async replay(questionId) {
      this.loading = true;

      await this.answerQuestion({
        answer: this.answer,
        userId: this.user.id,
        bidId: this.bidDetail.bidData.id,
        questionId,
      });

      this.loading = false;
      this.answer = '';
    },
  },
  mounted() {
    this.user = this.$store.getters.userInfo;
  },
};
</script>
