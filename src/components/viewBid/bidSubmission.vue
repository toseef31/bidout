<template>
  <v-col class="my-7 pa-0 bid-submission-tab" align="start">

    <v-simple-table class="template-table-style-sub mt-2" v-if="bidDetail.supplierSubmissions.length">
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

<div class="submission-section" v-if="bidDetail.supplierSubmissions.length && bidDetail.bidout">
    <v-simple-table class="submission-table-style">
      <template v-slot:default>
        <tbody>
          <tr v-for="(item,index) in bidDetail.bidData.lineItems.filter((el) => el.required === 'true')" :key="index">
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

  <div class=" submission-section" v-if="bidDetail.supplierSubmissions.length">
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
              <td class="text-left " v-if="item.supplierAttachments && item.supplierAttachments.length">
              <div class="pb-4  d-inline-flex pr-10" v-for="(doc,attIndex) in bidDetail.supplierSubmissions[index].supplierAttachments" :key="attIndex">
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
            <td class="text-left " v-else>
              <span class="none-class">None provided.</span>
            </td>
            </template>

          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>

    <div class="submission-section" v-if="question.length && bidDetail.supplierSubmissions.length">
      <div class="title-detail-supplier mt-10">Supplier Answers</div>
      <v-simple-table class="supplier-answer-table-style mt-3">
      <template v-slot:default>
        <tbody>
          <tr v-for="(item,index) in question" :key="index">
            <td class="text-left" v-if="item.type !== 'category'"> {{item.title}}</td>

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
            <a target="_blank"
            class="text-decoration-none pl-2" :href="ans.answers[index].answer
          ">{{ans.answers[index].fileName}}</a>

              </div>
            </td>
            <td class="text-left " v-if="ans.answers[index].answer === 'null' && item.type !== 'category'">
              None
            </td>
            </template>

          </tr>

        </tbody>
      </template>
    </v-simple-table>

  </div>

        <v-simple-table class="button-table-style mt-8" v-if="checkTime && bidDetail.supplierSubmissions.length">
      <template v-slot:default>
        <tbody>
          <tr>
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
        </tbody>
      </template>
    </v-simple-table>

  <div v-if="checkTime && bidDetail.supplierSubmissions.length">
    <v-simple-table class="award-table-style mt-8" v-if="bidDetail.bidData.awardees.length || bidDetail.bidData.rejectees.length">
      <template v-slot:default>
        <tbody>
          <tr>
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
    checkTime() {
      if (this.bidDetail.bidData.type !== 'bidout') {
        if (this.bidDetail.receivingBids) return false;
      } else if (this.bidDetail.bidout) {
        return false;
      }
      return true;
    },
  },
  methods: {
    ...mapActions(['awardCompany', 'rejectCompany', 'UnAwardCompany', 'UnDisqualifyCompany']),
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
