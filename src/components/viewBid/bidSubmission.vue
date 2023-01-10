<template>
  <v-col class="my-7 pa-0 bid-submission-tab" align="start">

<div class="table-class" v-if="bidDetail.supplierSubmissions.length">
    <div class="d-flex justify-end mr-5" v-if="!isBidOut && !bidDetail.receivingBids">
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
         <v-btn v-bind="attrs"
          v-on="on"  icon color="#0D9648" @click="exportF">
           <v-icon size="30" >mdi-microsoft-excel
           </v-icon>
        </v-btn>
        </template>
        <span>Export Awards</span>
    </v-tooltip>
    </div>
    <v-simple-table class="template-table-style-sub mt-2" >
      <template v-slot:default>
        <thead>
          <tr>
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

          <tr   v-if="bidDetail.supplierSubmissions.length  && !bidDetail.receivingBids">
             <td class="bid-example-title">Bid Example Pre-BidOut Period</td>
            <template v-for="(submission) in bidDetail.supplierSubmissions">
              <td v-if="!submission.bidoutPricepre">
                Not submitted
              </td>
              <td v-else-if="submission.bidoutPricepre === null">
                Not submitted
              </td>
              <td v-else>
                $ {{submission.bidoutPricepre}}
              </td>
            </template>
          </tr>

          <tr  v-if="bidDetail.supplierSubmissions.length  && !bidDetail.receivingBids">
             <td class="bid-example-title">Bid Example Post-BidOut Period</td>
            <template v-for="(submission) in bidDetail.supplierSubmissions">
              <td v-if="!submission.postBidoutPrice">
               Not submitted
              </td>
              <td v-else-if="submission.postBidoutPrice
               === null">
               Not submitted
              </td>
              <td v-else>
                <v-icon color="#0D9648">mdi-arrow-down-thin-circle-outline</v-icon>
          <span class="ml-1">$ {{submission.postBidoutPrice
              }}</span>
          <div class="subscript">Saving {{ Math.round(((submission.postBidoutPrice/submission.bidoutPricepre) + Number.EPSILON ) * 100)}}%</div>

          Math.round((num + Number.EPSILON) * 100) / 100
              </td>
            </template>
          </tr>

          <tr>
            <td class="text-left bid-example-title">Supplier Note</td>
            <template v-for="(item) in bidDetail.supplierSubmissions">
              <td class="text-left bid-note" v-if="item.supplierNote && item.supplierNote !== ''">
              {{item.supplierNote}}
            </td>

            <td class="text-left bid-note" v-else>
              <span class="none-class">None provided.</span>
            </td>
            </template>
          </tr>

          <tr>
            <td class="text-left bid-example-title">Supplier Attachments</td>
            <template v-for="(item,aIndex) in bidDetail.supplierSubmissions">
              <td class="text-left bid-note" v-if="item.supplierAttachments && item.supplierAttachments.length">
              <div class="pb-4  d-inline-flex pr-10" v-for="(doc,attIndex) in bidDetail.supplierSubmissions[aIndex].supplierAttachments" :key="attIndex">
            <img
              :src="require('@/assets/images/bids/FilePdf.png')"
              width="32"
              height="24"
              class="pr-2"
            />

            <a target="_blank" class="text-decoration-none" :href="doc.attachment
          ">{{doc.fileName}}</a>
          </div>
            </td>
            <td class="text-left bid-note" v-else>
              <span class="none-class">None provided.</span>
            </td>
            </template>
          </tr>

          <tr v-if="question.length && bidDetail.supplierSubmissions.length"><div class="title-detail-supplier mt-10 mb-5">Supplier Answers</div></tr>

          <tr v-for="(item,qIndex) in question" :key="qIndex + item.questionId" v-if="question.length && bidDetail.supplierSubmissions.length">
            <td class="text-left" v-if="item.type !== 'category'"> {{item.title}}</td>

            <template v-for="(ans) in answers">
              <td class="text-left" v-if="ans.answers[qIndex].answer !== 'null' && item.questionType === 'checkbox'">
               {{ans.answers[qIndex].answer === 'true' ? "Yes" : 'No' }}
            </td>
            <td class="text-left" v-if="ans.answers[qIndex].answer !== 'null' && item.questionType === 'textfield' ||item.questionType === 'textarea'">
              {{ans.answers[qIndex].answer}}
            </td>
            <td class="text-left" v-if="ans.answers[qIndex].answer !== 'null' && item.questionType === 'uploadFile'">
              <div class="pb-4 d-inline-flex">
            <v-img
              :src="require('@/assets/images/bids/FilePdf.png')"
              contain
              width="32"
              height="24"

            />
            <a target="_blank"
            class="text-decoration-none pl-2" :href="ans.answers[qIndex].answer
          ">{{ans.answers[qIndex].fileName}}</a>

              </div>
            </td>
            <td class="text-left " v-if="ans.answers[qIndex].answer === 'null' && item.type !== 'category'">
              None
            </td>
            </template>
          </tr>

          <tr v-if="!isBidOut && !bidDetail.receivingBids && bidDetail.supplierSubmissions.length" class="action-button-class">
            <td class="text-left"></td>
            <template v-for="(item,index) in bidDetail.supplierSubmissions">
              <td class="text-left">
              <div class="d-flex flex-column" v-if="!checkAwardee(item.companyId) && !checkRejectee(item.companyId)">
                <v-btn
                  @click="award(item.companyId,index,'award')"
                  color="#0d9648" depressed :disabled="showLoading[index].load && showLoading[index].action === 'award'" >
                  <v-progress-circular
                    v-if="showLoading[index].load && showLoading[index].action === 'award'"
                    indeterminate
                    :width="3"
                    size="25"
                    color="#0D9648"
                    ></v-progress-circular>
                    <div v-else>Award Bid</div>

                </v-btn>
                <v-btn
                  @click="disqualify(item.companyId,index,'disqualify')"   color="#F03F20" depressed  class="mt-2" :disabled="showLoading[index].load && showLoading[index].action === 'disqualify'"

                >

                 <v-progress-circular
                    v-if="showLoading[index].load && showLoading[index].action === 'disqualify'"
                    indeterminate
                    :width="3"
                    size="25"
                    color="#F03F20"
                    ></v-progress-circular>
                    <div v-else> Disqualify Bid</div>
                </v-btn>
              </div>
              <div v-else class="d-flex flex-column">
                <v-btn
                  @click="unAward(item.companyId,index,'award')"
                  color="#0d9648" depressed :disabled="showLoading[index].load && showLoading[index].action === 'award'"
                  v-if="checkAwardee(item.companyId) && !checkRejectee(item.companyId)">
                  <v-progress-circular
                    v-if="showLoading[index].load && showLoading[index].action === 'award'"
                    indeterminate
                    :width="3"
                    size="25"
                    color="#0D9648"
                    ></v-progress-circular>
                    <div v-else>Un-Award</div>

                </v-btn>
                <v-btn
                  @click="unDisqualify(item.companyId,index,'disqualify')"   color="#F03F20" depressed   :disabled="showLoading[index].load && showLoading[index].action === 'disqualify'"
                  v-if="!checkAwardee(item.companyId) && checkRejectee(item.companyId)"
                >

                 <v-progress-circular
                    v-if="showLoading[index].load && showLoading[index].action === 'disqualify'"
                    indeterminate
                    :width="3"
                    size="25"
                    color="#F03F20"
                    ></v-progress-circular>
                    <div v-else>Un-Disqualify</div>
                </v-btn>

              </div>

            </td>
            </template>
          </tr>

          <tr class="action-button-class" v-if="!isBidOut && !bidDetail.receivingBids && bidDetail.supplierSubmissions.length && bidDetail.bidData.awardees && (bidDetail.bidData.awardees.length || bidDetail.bidData.rejectees &&bidDetail.bidData.rejectees.length)">
            <td class="text-left"></td>
            <template v-for="(item,index) in bidDetail.supplierSubmissions">
            <td class="text-left">
              <div
              class=" action d-flex align-center"
              color="white"
              height="56"
              rounded
              width="190"
              v-if="checkRejectee(item.companyId)"
              >
                <img  :src="require('@/assets/images/bids/disqualified.png')"/>
                Disqualified Bid
              </div>

              <div
              class=" action d-flex align-center"
              color="white"
              height="56"
              rounded
              width="190"
              v-if="checkAwardee(item.companyId)"
              >
                <img  :src="require('@/assets/images/bids/awarded.png')"/>
                Awarded Bid
              </div>

            </td>
          </template>
          </tr>

        </tbody>
      </template>
    </v-simple-table>
  </div>

    <div class="text-center b-title-detail " v-if="bidDetail.supplierSubmissions.length === 0">There are currently no bid submissions by service providers. </div>
  </v-col>
</template>

<script>
import { mapActions } from 'vuex';
import * as XLSX from 'xlsx';

export default {
  data() {
    return {
      answers: [],
      user: '',
      loadings: [],
    };
  },
  computed: {
    bidDetail() {
      for (let i = 0; i < this.$store.getters.bidViewData.supplierSubmissions.length; i++) {
        this.loadings.push({
          load: false,
          action: 'neither',
        });
      }
      return this.$store.getters.bidViewData;
    },
    question() {
      const ques = Array.isArray(this.bidDetail.bidData.questions) ? this.bidDetail.bidData.questions : [];
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
    showLoading() {
      return this.loadings;
    },
    isBidOut() {
      if (this.bidDetail.bidData.type === 'BidOut Process' && this.bidDetail.bidout) {
        return true;
      }
      return false;
    },
  },
  methods: {
    ...mapActions(['awardCompany', 'rejectCompany', 'UnAwardCompany', 'UnDisqualifyCompany']),
    exportF() {
      const header = this.bidDetail.supplierSubmissions.map((el) => el.company);

      header.unshift('Line Items');

      const dataD = [];
      let index;

      this.bidDetail.bidData.lineItems.forEach((el, lIndex) => {
        dataD.push([el.description]);
        this.bidDetail.supplierSubmissions.forEach((list) => {
          dataD[lIndex].push(`${list.lineItems[lIndex].price} ${el.unit}`);
        });
      });

      dataD.push(['Supplier Note']);

      index = this.indexOfArray(['Supplier Note'], dataD);

      this.bidDetail.supplierSubmissions.forEach((list) => {
        if (list.supplierNote && list.supplierNote !== '') {
          dataD[index].push(`${list.supplierNote}`);
        }
      });

      dataD.push(['Supplier Attachment']);

      index = this.indexOfArray(['Supplier Attachment'], dataD);

      this.bidDetail.supplierSubmissions.forEach((list) => {
        if (list.supplierAttachments && list.supplierAttachments.length) {
          let doc = '';
          list.supplierAttachments.forEach((el) => {
            doc += `${el.fileName}\r\n`;
          });
          dataD[index].push(`${doc}`);
        }
      });

      if (this.question.length) {
        this.question.forEach((el, qInd) => {
          dataD.push([el.title]);
          const fI = this.indexOfArray([el.title], dataD);
          this.answers.forEach((list) => {
            if (el.questionType === 'checkbox') {
              dataD[fI].push(`${list.answers[qInd].answer === 'true' ? 'Yes' : 'No'}`);
            } else if (el.questionType === 'uploadFile') {
              dataD[fI].push(`${list.answers[qInd].fileName}`);
            } else {
              dataD[fI].push(`${list.answers[qInd].answer}`);
            }
          });
        });
      }

      dataD.unshift(header);
      const data = XLSX.utils.aoa_to_sheet(dataD);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, data, 'data');
      XLSX.writeFile(wb, `${this.bidDetail.bidData.title}.xlsx`);
    },
    indexOfArray(val, array) {
      const hash = {};
      for (let i = 0; i < array.length; i++) {
        hash[array[i]] = i;
      }

      return (hash.hasOwnProperty(val)) ? hash[val] : -1;
    },
    checkAwardee(id) {
      const { awardees } = this.bidDetail.bidData;

      let result = false;
      if (awardees && awardees.length) {
        awardees.forEach((el) => {
          if (el === id) {
            result = true;
          }
        });
      }
      return result;
    },
    checkRejectee(id) {
      const { rejectees } = this.bidDetail.bidData;

      let result = false;
      if (rejectees && rejectees.length) {
        rejectees.forEach((el) => {
          if (el === id) {
            result = true;
          }
        });
      }
      return result;
    },
    async award(id, index, action) {
      this.loadings[index].action = action;
      this.loadings[index].load = true;

      await this.awardCompany({
        companyId: id,
        userId: this.user.id,
        bidId: this.bidDetail.bidData.id,
        serial: this.$route.params.serial,
      });

      this.loadings[index].load = false;
      this.loadings[index].action = 'neither';
    },
    async disqualify(id, index, action) {
      this.loadings[index].action = action;
      this.loadings[index].load = true;

      await this.rejectCompany({
        companyId: id,
        userId: this.user.id,
        bidId: this.bidDetail.bidData.id,
        serial: this.$route.params.serial,
      });

      this.loadings[index].load = false;
      this.loadings[index].action = 'neither';
    },
    async unAward(id, index, action) {
      this.loadings[index].action = action;
      this.loadings[index].load = true;

      await this.UnAwardCompany({
        companyId: id,
        userId: this.user.id,
        bidId: this.bidDetail.bidData.id,
        serial: this.$route.params.serial,
      });

      this.loadings[index].load = false;
      this.loadings[index].action = 'neither';
    },
    async unDisqualify(id, index, action) {
      this.loadings[index].action = action;
      this.loadings[index].load = true;

      await this.UnDisqualifyCompany({
        companyId: id,
        userId: this.user.id,
        bidId: this.bidDetail.bidData.id,
        serial: this.$route.params.serial,
      });

      this.loadings[index].load = false;
      this.loadings[index].action = 'neither';
    },
  },
  mounted() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.user = this.$store.getters.userInfo;
  },
};
</script>
