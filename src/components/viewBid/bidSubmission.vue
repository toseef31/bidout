<template>
  <v-col class="my-7 pa-0 bid-submission-tab" align="start">

    <v-simple-table class="template-table-style-sub mt-2">
      <template v-slot:default>
        <thead>
          <tr  >
            <th class="text-left">Line Items</th>
            <th class="text-left" v-for="(item,index) in bidDetail.supplierSubmissions" :key="index">{{ item.company}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in bidDetail.bidData.lineItems" :key="index">
            <td>{{item.description}}</td>
            <template v-for="(submission) in bidDetail.supplierSubmissions">
              <td v-if="submission.lineItems[index].price === 'NO_BID'">
                <v-icon color="#F32349">mdi-close</v-icon> No Bid
              </td>
              <td v-else>
                $ {{submission.lineItems[index].price}} {{bidDetail.bidData.lineItems[index].unit}}
              </td>
            </template>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

<div class="submission-section">
    <v-simple-table class="submission-table-style">
      <template v-slot:default>
        <tbody>
          <tr v-for="(item,index) in bidDetail.bidData.lineItems" :key="index">
            <td class="text-left" v-if="item.required"> {{item.description}}</td>
            <template v-if="item.required" v-for="(submission) in bidDetail.supplierSubmissions">
              <td v-if="submission.lineItems[index].price === 'NO_BID'">
                <v-icon color="#F32349">mdi-close</v-icon> No Bid
              </td>
              <td v-else>
                $ {{submission.lineItems[index].price}} {{bidDetail.bidData.lineItems[index].unit}}
              </td>
            </template>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>

  <div class=" submission-section">
    <v-simple-table class="submission-table-style">
      <template v-slot:default>
        <tbody>
          <tr>
            <td class="text-left">Supplier Note</td>
            <template v-for="(item) in bidDetail.supplierSubmissions">
              <td class="text-left" v-if="item.supplierNote && item.supplierNote !== ''">
              {{item.supplierNote}}
            </td>

            <td class="text-left " v-else>
              <span class="none-class">None provided.</span>
            </td>
            </template>

          </tr>
          <tr>
            <td class="text-left">Supplier Attachments</td>
            <template v-for="(item,index) in bidDetail.supplierSubmissions">
              <td class="text-left d-flex flex-column" v-if="item.supplierAttachments && item.supplierAttachments.length">
              <div class="pb-4 d-inline-flex" v-for="(doc,attIndex) in bidDetail.supplierSubmissions[index].supplierAttachments" :key="attIndex">
            <img
              :src="require('@/assets/images/bids/FilePdf.png')"
              class="pr-2"
            />

            <div>{{doc.fileName}}</div>
          </div>
            </td>
            <td class="text-left " v-else>
              <span class="none-class">None provided.</span>
            </td>
            </template>

          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>

    <div class="submission-section">
      <div class="title-detail-supplier mt-10">Supplier Answers</div>
      <v-simple-table class="supplier-answer-table-style mt-3">
      <template v-slot:default>
        <tbody>
          <tr v-for="(item,index) in question" :key="index">
            <td class="text-left"> {{item.title}}</td>
            <template v-for="(ans) in answers">
              <td class="text-left" v-if="ans.answers[index].answer !== 'null' && item.questionType === 'checkbox'">
               {{ans.answers[index].answer === 'true' ? "Yes" : 'No' }}
            </td>
            <td class="text-left" v-if="ans.answers[index].answer !== 'null' && item.questionType === 'textfield' ||item.questionType === 'textarea'">
              {{ans.answers[index].answer}}
            </td>
            <td class="text-left" v-if="ans.answers[index].answer !== 'null' && item.questionType === 'uploadFile'">
              <div class="pb-4 d-inline-flex">
            <v-img
              :src="require('@/assets/images/bids/FilePdf.png')"
              contain
              width="32"
              height="24"

            />

            <div class="pl-2">{{ans.answers[index].fileName}}</div>
              </div>
            </td>
            <td class="text-left " v-if="ans.answers[index].answer === 'null'">
              None
            </td>
            </template>

          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>

    <v-simple-table class="button-table-style mt-8" v-if="isAfterDueDate && bidDetail.user_status === 'waiting'">
      <template v-slot:default>
        <tbody>
          <tr>
            <td class="text-left"></td>
            <td class="text-left">
              <v-btn   color="#0d9648" depressed >
            Award Bid
          </v-btn>
          <v-btn   color="#F03F20" depressed  class="mt-2">
            Disqualify Bid
          </v-btn>
            </td>
            <td class="text-left ">
              <v-btn   color="#0d9648" depressed >
            Award Bid
          </v-btn>
          <v-btn   color="#F03F20" depressed class="mt-2" >
            Disqualify Bid
          </v-btn>
            </td>
            <td class="text-left ">
              <v-btn   color="#0d9648" depressed >
            Award Bid
          </v-btn>
          <v-btn   color="#F03F20" depressed class="mt-2" >
            Disqualify Bid
          </v-btn>
            </td>
            <td class="text-left ">
              <v-btn   color="#0d9648" depressed >
            Award Bid
          </v-btn>
          <v-btn   color="#F03F20" depressed class="mt-2" >
            Disqualify Bid
          </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
 <!--
    <v-simple-table class="award-table-style mt-8" v-if="isAfterDueDate && bidDetail.user_status !== 'waiting'">
      <template v-slot:default>
        <tbody>
          <tr>
            <td class="text-left"></td>
            <td class="text-left">
              <div
              class=" action d-flex align-center"
              color="white"
              height="56"
              rounded
              width="190"
            >  <img  :src="require('@/assets/images/bids/disqualified.png')"/> Disqualified Bid</div>
            <div
              class=" action d-flex align-center"
              color="white"
              height="56"
              rounded
              width="190"
            >  <img  :src="require('@/assets/images/bids/awarded.png')"/> Awarded Bid</div>
                      </div>

            </td>
            <td class="text-left ">
              <div
            class=" action d-flex align-center"
          color="white"
          height="56"
          rounded
          width="190"
        >  <img  :src="require('@/assets/images/bids/disqualified.png')"/> Disqualified Bid</div>
            <div
              class=" action d-flex align-center"
              color="white"
              height="56"
              rounded
              width="190"
            >  <img  :src="require('@/assets/images/bids/awarded.png')"/> Awarded Bid</div>
          </div>
            </td>
            <td class="text-left ">
                          <div
              class=" action d-flex align-center"
              color="white"
              height="56"
              rounded
              width="190"
            >  <img  :src="require('@/assets/images/bids/disqualified.png')"/> Disqualified Bid</div>
            <div
              class=" action d-flex align-center"
              color="white"
              height="56"
              rounded
              width="190"
            >  <img  :src="require('@/assets/images/bids/awarded.png')"/> Awarded Bid</div>
          </div>
            </td>
            <td class="text-left ">
            <div
                class=" action d-flex align-center"
            color="white"
            height="56"
            rounded
            width="190"
          >  <img  :src="require('@/assets/images/bids/disqualified.png')"/> Disqualified Bid</div>
          <div
                        class=" action d-flex align-center"
            color="white"
            height="56"
            rounded
            width="190"
          >  <img  :src="require('@/assets/images/bids/awarded.png')"/> Awarded Bid</div>
          </div>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table> -->
    <div class="text-center b-title-detail " v-if="bidDetail.supplierSubmissions.length === 0">There are currently no bid submissions by service providers. </div>
  </v-col>
</template>

<script>
import moment from 'moment-timezone';
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      answers: [],
    };
  },
  computed: {
    bidDetail() {
      return this.$store.getters.bidViewData;
    },
    question() {
      const ques = this.bidDetail.bidData.questions;
      this.answers = this.bidDetail.supplierSubmissions;
      const keys = [];

      ques.forEach((el, index) => {
        if (el.type === 'category') {
          keys.push(index);
        }
      });

      keys.forEach((el) => ques.splice(el, 1));

      this.answers.forEach((el, index, self) => {
        keys.forEach((item) => self[index].answers.splice(item, 1));
      });

      return ques;
    },
    isAfterDueDate() {
      const bidDueDate = this.bidDetail.bidData.dueDate;
      const bidDueTime = this.bidDetail.bidData.dueTime;
      const currentDate = moment();
      const Time = moment(bidDueTime, ['h:mm:ss A']).format('HH:mm:ss');
      const stringDate = `${bidDueDate}T${Time}`;
      const momentDueDate = moment(stringDate);

      return moment(currentDate).isAfter(momentDueDate);
    },
  },
  methods: {
    ...mapActions(['awardCompany', 'rejectCompany']),
  },
};
</script>
