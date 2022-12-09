<template>
  <v-col class="my-7 pa-0 qanda-section fill-height" align="start">
    <div class="px-6" v-if="(getUserType === 'buyer' && getQAndA.length)">
      <span class="title-detail">Unanswered questions</span>

      <v-avatar rounded size="35" color="#0D9648" class="ml-4">
        <span class="white--text badge">2</span>
      </v-avatar>

      <v-expansion-panels accordion multiple v-model="panel" :readonly="true">
        <v-expansion-panel v-model="panel" v-for="(item, i) in 2" :key="i">
          <v-expansion-panel-header>
            <template v-slot:actions>
              <v-col align="center"> <v-icon> </v-icon></v-col>
            </template>
            <template v-slot:default="{ open }">
              <div class="header d-flex flex-column">
                <span>Question:</span>

                <span class="sub-title mt-1"
                  >Is this bid suppouse to include shipping code?</span
                >

                <span class="sub-title mt-4"
                  >By Randall Smith (Baker Hughes)</span
                >
                <span class="sub-title mt-1">08/22/2022 - 1:19pm</span>
              </div>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-textarea
              placeholder="Answer here..."
              single-line
              outlined
              type="text"

            >
            </v-textarea>

            <div class="text-center">
              <v-btn
                color="#0D9648"
                height="32"
                class="text-capitalize white--text font-weight-bold save-button px-12"
                @click="changeTab"
                large
                >Replay</v-btn
              >
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

      <div class="title-detail mt-6">Answer questions</div>

      <div class="header d-flex flex-column pt-4">
        <span>Question:</span>

        <span class="sub-title mt-1"
          >Is this bid suppouse to include shipping code?</span
        >

        <span class="sub-title mt-4">By Randall Smith (Baker Hughes)</span>
        <span class="sub-title mt-1">08/22/2022 - 1:19pm</span>
      </div>

      <div class="header d-flex flex-column pt-4">
        <span>Answer:</span>

        <span class="sub-title mt-1"
          >Yes, this would be all-inclusive on the bid.</span
        >

        <span class="sub-title mt-4">By Rodney Giles (Patterson-UTI) </span>
        <span class="sub-title mt-1">08/22/2022 - 2:09pm</span>
      </div>
    </div>

    {{getQAndA}}
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
                    color="#0D9648"
                    ></v-progress-circular>
                    <div v-else>Add</div>
              </v-btn>
            </div>

      <div class="title-detail mt-6">Answered questions</div>

    <div v-if="getQAndA.length">
        <div v-for="(item,index) in getQAndA" :key="index">
          <div class="header d-flex flex-column pt-4">
            <span>Question:</span>

            <span class=" mt-1"
              >{{item.question}}</span
            >

            <span class="sub-title mt-4">By {{(this.user.firstName)}} (Baker Hughes)</span>
            <span class="sub-title mt-1">08/22/2022 - 1:19pm</span>
          </div>

           <div class="header d-flex flex-column pt-4">
              <span>Answer:</span>

              <span class=" mt-1"
                >Yes, this would be all-inclusive on the bid.</span
              >

              <span class="sub-title mt-4">By Rodney Giles (Patterson-UTI) </span>
              <span class="sub-title mt-1">08/22/2022 - 2:09pm</span>
           </div>
        </div>
      </div>
     <div v-else class="text-center mt-5">None</div>
  </div>

  </v-col>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      panel: [0, 1],
      question: '',
      user: '',
      loading: false,
    };
  },
  computed: {
    getUserType() {
      return this.$store.getters.userType;
    },
    getQAndA() {
      return this.$store.getters.qAndA;
    },
    bidDetail() {
      return this.$store.getters.bidViewData;
    },
    showLoading() {
      return this.loading;
    },
  },
  methods: {
    ...mapActions(['askQuestion']),
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
  },
  mounted() {
    this.user = this.$store.getters.userInfo;
  },
};
</script>
