<template>
  <v-col class="my-7 pa-0 bid-submission-tab" align="start">

    <div class="table-class" v-if="bidDetail.supplierSubmissions.length">
      <div class="d-flex justify-end mr-5" v-if="!isBidOut && !bidDetail.receivingBids">

        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" icon color="#0D9648" @click="exportF">
              <v-icon size="30">mdi-microsoft-excel
              </v-icon>
            </v-btn>
          </template>
          <span>Export Awards</span>
        </v-tooltip>
      </div>
      <v-simple-table class="template-table-style-sub mt-2">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Line Items</th>
              <th class="text-left" v-for="(item, index) in bidDetail.supplierSubmissions" :key="index">{{
                item.company.companyName
              }}
              </th>
            </tr>
          </thead>
          <tbody>

            <tr v-for="(item, index) in bidDetail.bidData.lineItems" :key="index">
              <td class="no-wrap">{{ item.description }}</td>
              <template v-for="(submission) in bidDetail.supplierSubmissions">
                <td
                  v-if="submission.lineItems[index].price === 'NO_BID' || submission.lineItems[index].price === '' || submission.lineItems[index].price === null">
                  <v-icon color="#F32349">mdi-close</v-icon> No Bid
                </td>

                <td v-else>
                  $ {{ formatPrice(submission.lineItems[index].price) }} {{ bidDetail.bidData.lineItems[index].unit }}
                </td>
              </template>
            </tr>

            <tr
              v-if="bidDetail.supplierSubmissions && ((!bidDetail.receivingBids && isBidOut) || (bidDetail.bidData.type === 'BidOut Process' && !bidDetail.bidout))">
              <td class="bid-example-title">Bid Example Pre-BidOut Period</td>
              <template v-for="(submission) in bidDetail.supplierSubmissions">
                <td v-if="!submission.bidOutPricePre">
                  Not submitted
                </td>
                <td v-else-if="submission.bidOutPricePre === null">
                  Not submitted
                </td>
                <td v-else>
                  $ {{ formatPrice(submission.bidOutPricePre) }}
                </td>
              </template>
            </tr>

            <tr v-if="bidDetail.supplierSubmissions && bidDetail.bidData.type !== 'BidOut Process'">
              <td class="bid-example-title">Total Price</td>
              <template v-for="(submission) in bidDetail.supplierSubmissions">
                <td v-if="!submission.bidOutPricePre">
                  Not submitted
                </td>
                <td v-else-if="submission.bidOutPricePre === null">
                  Not submitted
                </td>
                <td v-else>
                  $ {{ formatPrice(submission.bidOutPricePre) }}
                </td>
              </template>
            </tr>

            <tr
              v-if="bidDetail.supplierSubmissions && ((!bidDetail.receivingBids && isBidOut) || (bidDetail.bidData.type === 'BidOut Process' && !bidDetail.bidout))">
              <td class="bid-example-title">Bid Example Post-BidOut Period</td>
              <template v-for="(submission) in bidDetail.supplierSubmissions">
                <td v-if="!submission.postBidOutPrice">
                  Not submitted
                </td>
                <td v-else-if="submission.postBidOutPrice
                  === null">
                  Not submitted
                </td>
                <td v-else>
                  <v-icon color="#0D9648">mdi-arrow-down-thin-circle-outline</v-icon>
                  <span class="ml-1">$ {{
                    formatPrice(submission.postBidOutPrice)
                  }}</span>
                  <div class="subscript">Saving {{
                    100 - Math.round(((submission.postBidOutPrice / submission.bidOutPricePre) +
                      Number.EPSILON) * 100)
                  }}%</div>
                </td>
              </template>
            </tr>

            <tr>
              <td class="text-left bid-example-title">Supplier Note</td>
              <template v-for="(item) in bidDetail.supplierSubmissions">
                <td class="text-left bid-note" v-if="item.supplierNote && item.supplierNote !== ''">
                  {{ item.supplierNote }}
                </td>

                <td class="text-left bid-note" v-else>
                  <span class="none-class">None provided.</span>
                </td>
              </template>
            </tr>

            <tr>
              <td class="text-left bid-example-title">Supplier Attachments</td>
              <template v-for="(item, aIndex) in bidDetail.supplierSubmissions">
                <td class="text-left bid-note" v-if="item.supplierAttachments && item.supplierAttachments.length">
                  <div class="pb-4  d-inline-flex pr-10"
                    v-for="(doc, attIndex) in bidDetail.supplierSubmissions[aIndex].supplierAttachments" :key="attIndex">

                    <img :src="require('@/assets/images/bids/FilePdf.png')" height="24px"
                      v-if="checkFileType(doc.fileName) === 'pdf'" class="pr-2" />
                    <img :src="require('@/assets/images/bids/FileDoc.png')" height="24px"
                      v-else-if="checkFileType(doc.fileName) === 'docx' || checkFileType(doc.fileName) === 'doc'"
                      class="pr-2" />
                    <v-icon class="pr-2" color="#0D1139"
                      v-else-if="checkFileType(doc.fileName) === 'xlsx' || checkFileType(doc.fileName) === 'xls'">mdi-microsoft-excel</v-icon>
                    <v-icon color="#0D1139" v-else class="pr-2">mdi-file-document</v-icon>

                    <a target="_blank" class="text-decoration-none" :href="doc.attachment
                      ">{{ doc.fileName }}</a>
                  </div>
                </td>
                <td class="text-left bid-note" v-else>
                  <span class="none-class">None provided.</span>
                </td>
              </template>
            </tr>

            <tr class="supplier-row" v-if="bidDetail.bidData.questions.length && bidDetail.supplierSubmissions">
              <div class="title-detail-supplier mt-8 mb-7">Supplier Answers</div>
            </tr>

            <tr v-for="(item, qIndex) in bidDetail.bidData.questions" :key="qIndex + item._id"
              v-if="bidDetail.bidData.questions.length && bidDetail.supplierSubmissions">
              <td class="text-left" v-if="item.type !== 'category'"> {{ item.title }}</td>
              <template v-for="(ans) in answers">

                <td class="text-left"
                  v-if="ans.answers[qIndex].answer !== null && ans.answers[qIndex].answer !== 'null' && item.questionType === 'checkbox'">
                  {{ ans.answers[qIndex].answer }}
                </td>
                <td class="text-left"
                  v-if="ans.answers[qIndex].answer !== null && ans.answers[qIndex].answer !== 'null' && item.questionType === 'textfield' || item.questionType === 'textarea'">
                  {{ ans.answers[qIndex].answer }}
                </td>
                <td class="text-left"
                  v-if="ans.answers[qIndex].answer !== null && ans.answers[qIndex].answer !== 'null' && item.questionType === 'uploadFile'">
                  <div class="pb-4 d-inline-flex">
                    <img :src="require('@/assets/images/bids/FilePdf.png')" height="24px"
                      v-if="checkFileType(ans.answers[qIndex].fileName) === 'pdf'" />
                    <img :src="require('@/assets/images/bids/FileDoc.png')" height="24px"
                      v-else-if="checkFileType(ans.answers[qIndex].fileName) === 'docx'" />
                    <v-icon color="#0D1139" v-else>mdi-file-document</v-icon>

                    <a target="_blank" class="text-decoration-none pl-2" :href="ans.answers[qIndex].answer
                      ">{{ ans.answers[qIndex].fileName }}</a>

                  </div>
                </td>
                <td class="text-left "
                  v-if="(ans.answers[qIndex].answer === null || ans.answers[qIndex].answer === 'null') && item.type !== 'category'">
                  None
                </td>
              </template>
            </tr>

            <tr v-if="!isBidOut && !bidDetail.receivingBids && bidDetail.supplierSubmissions" class="action-button-class">
              <td class="text-left"></td>
              <template v-for="(item, index) in bidDetail.supplierSubmissions">
                <td class="text-left">
                  <div class="d-flex flex-column"
                    v-if="!checkAwardee(item.company._id) && !checkRejectee(item.company._id)">
                    <v-btn @click="award(item.company._id, index, 'award')" color="#0d9648" depressed
                      :disabled="showLoading[index].load && showLoading[index].action === 'award'">
                      <v-progress-circular v-if="showLoading[index].load && showLoading[index].action === 'award'"
                        indeterminate :width="3" size="25" color="#0D9648"></v-progress-circular>
                      <div v-else>Award Bid</div>

                    </v-btn>
                    <v-btn @click="disqualify(item.company._id, index, 'disqualify')" color="#F03F20" depressed
                      class="mt-2" :disabled="showLoading[index].load && showLoading[index].action === 'disqualify'">

                      <v-progress-circular v-if="showLoading[index].load && showLoading[index].action === 'disqualify'"
                        indeterminate :width="3" size="25" color="#F03F20"></v-progress-circular>
                      <div v-else> Disqualify Bid</div>
                    </v-btn>
                  </div>
                  <div v-else class="d-flex flex-column">
                    <v-btn @click="unAward(item.company._id, index, 'award')" color="#0d9648" depressed
                      :disabled="showLoading[index].load && showLoading[index].action === 'award'"
                      v-if="checkAwardee(item.company._id) && !checkRejectee(item.company._id)">
                      <v-progress-circular v-if="showLoading[index].load && showLoading[index].action === 'award'"
                        indeterminate :width="3" size="25" color="#0D9648"></v-progress-circular>
                      <div v-else>Un-Award</div>

                    </v-btn>
                    <v-btn @click="unDisqualify(item.company._id, index, 'disqualify')" color="#F03F20" depressed
                      :disabled="showLoading[index].load && showLoading[index].action === 'disqualify'"
                      v-if="!checkAwardee(item.company._id) && checkRejectee(item.company._id)">

                      <v-progress-circular v-if="showLoading[index].load && showLoading[index].action === 'disqualify'"
                        indeterminate :width="3" size="25" color="#F03F20"></v-progress-circular>
                      <div v-else>Un-Disqualify</div>
                    </v-btn>

                  </div>

                </td>
              </template>
            </tr>

            <tr class="action-button-class"
              v-if="!isBidOut && !bidDetail.receivingBids && bidDetail.supplierSubmissions && bidDetail.bidData.awardees && (bidDetail.bidData.awardees.length || bidDetail.bidData.rejectees && bidDetail.bidData.rejectees.length)">
              <td class="text-left"></td>
              <template v-for="(item) in bidDetail.supplierSubmissions">
                <td class="text-left">
                  <div class=" action d-flex align-center" color="white" height="56" rounded width="190"
                    v-if="checkRejectee(item.company._id)">
                    <img :src="require('@/assets/images/bids/disqualified.png')" />
                    Disqualified Bid
                  </div>

                  <div class=" action d-flex align-center" color="white" height="56" rounded width="190"
                    v-if="checkAwardee(item.company._id)">
                    <img :src="require('@/assets/images/bids/awarded.png')" />
                    Awarded Bid
                  </div>

                </td>
              </template>
            </tr>

          </tbody>
        </template>
      </v-simple-table>
    </div>

    <div class="text-center b-title-detail " v-if="!bidDetail.supplierSubmissions.length">There are currently no
      bid submissions by service providers. </div>
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
      this.$store.getters.bidViewData.supplierSubmissions.forEach((el) => {
        this.loadings.push({
          load: false,
          action: 'neither',
        });
      });
      if (this.$store.getters.bidViewData.bidData.questions && this.$store.getters.bidViewData.bidData.questions.length) {
        this.answers = this.$store.getters.bidViewData.supplierSubmissions;
      }
      return this.$store.getters.bidViewData;
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
    checkFileType(file) {
      return file && file.substring(file.lastIndexOf('.') + 1);
    },
    exportF() {
      const header = this.bidDetail.supplierSubmissions.map((el) => el.company.companyName);

      header.unshift('UOM');
      header.unshift('QTY');
      header.unshift('Line Items');

      let dataD = [];
      let index;

      this.bidDetail.bidData.lineItems.forEach((el, lIndex) => {
        dataD.push([el.description]);
        dataD[lIndex].push(el.quantity);
        dataD[lIndex].push(el.unit);
        this.bidDetail.supplierSubmissions.forEach((list) => {
          if (list.lineItems[lIndex].price === 'NO_BID') {
            dataD[lIndex].push('NO-BID');
          } else if (list.lineItems[lIndex].price === 0 || list.lineItems[lIndex].price === '0') {
            dataD[lIndex].push(`$${Number(`${Math.round(parseFloat(`${list.lineItems[lIndex].price}e${2}`))}e-${2}`).toFixed(2)}`);
          } else {
            dataD[lIndex].push(`$${Number(`${Math.round(parseFloat(`${list.lineItems[lIndex].price}e${2}`))}e-${2}`).toFixed(2)}`);
          }
        });
      });

      if (this.bidDetail.bidData.type === 'BidOut Process') {
        dataD.push(['Bid Example Pre-BidOut Period']);

        index = this.indexOfArray(['Bid Example Pre-BidOut Period'], dataD);

        this.bidDetail.supplierSubmissions.forEach((list) => {
          if (list.bidOutPricePre) {
            dataD[index].push(`$${list.bidOutPricePre}`);
          } else {
            dataD[index].push('Not submitted');
          }
        });

        dataD = this.spacer(dataD, index);

        dataD.push(['Bid Example Post-BidOut Period']);

        index = this.indexOfArray(['Bid Example Post-BidOut Period'], dataD);

        this.bidDetail.supplierSubmissions.forEach((list) => {
          if (list.postBidOutPrice) {
            dataD[index].push(`$${list.postBidOutPrice} (Saving-${100 - Math.round(((list.postBidOutPrice / list.bidOutPricePre)
              + Number.EPSILON) * 100)}%)`);
          } else {
            dataD[index].push('Not submitted');
          }
        });
      } else {
        dataD.push(['Total Price']);

        index = this.indexOfArray(['Total Price'], dataD);

        this.bidDetail.supplierSubmissions.forEach((list) => {
          if (list.bidOutPricePre) {
            dataD[index].push(`$${list.bidOutPricePre}`);
          } else {
            dataD[index].push('Not submitted');
          }
        });
      }

      dataD = this.spacer(dataD, index);

      dataD.push(['Supplier Note']);

      index = this.indexOfArray(['Supplier Note'], dataD);

      this.bidDetail.supplierSubmissions.forEach((list) => {
        if (list.supplierNote && list.supplierNote !== '') {
          dataD[index].push(`${list.supplierNote}`);
        } else {
          dataD[index].push('None');
        }
      });

      dataD = this.spacer(dataD, index);

      dataD.push(['Supplier Attachment']);

      index = this.indexOfArray(['Supplier Attachment'], dataD);

      this.bidDetail.supplierSubmissions.forEach((list) => {
        if (list.supplierAttachments && list.supplierAttachments.length) {
          let doc = '';
          list.supplierAttachments.forEach((el) => {
            doc += `${el.fileName}\r\n`;
          });
          dataD[index].push(`${doc}`);
        } else {
          dataD[index].push('None');
        }
      });

      dataD = this.spacer(dataD, index);

      if (this.bidDetail.bidData.questions.length) {
        this.bidDetail.bidData.questions.forEach((el, qInd) => {
          if (el.type !== 'category') {
            dataD.push([el.title]);
            const fI = this.indexOfArray([el.title], dataD);
            this.answers.forEach((list) => {
              if (el.questionType === 'checkbox') {
                if (list.answers[qInd].answer === 'null') dataD[fI].push('None');
                else dataD[fI].push(list.answers[qInd].answer);
              } else if (el.questionType === 'uploadFile') {
                dataD[fI].push(`${list.answers[qInd].fileName}`);
              } else if (list.answers[qInd].answer === 'null') {
                dataD[fI].push('None');
              } else {
                dataD[fI].push(`${list.answers[qInd].answer}`);
              }
            });
            dataD = this.spacer(dataD, fI);
          }
        });
      }

      dataD.unshift(header);

      const data = XLSX.utils.aoa_to_sheet(dataD);

      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, data, 'data');

      XLSX.writeFile(wb, `${this.bidDetail.bidData.title}.xlsx`);
    },
    spacer(data, index) {
      data[index].splice(1, 0, '');
      data[index].splice(2, 0, '');

      return data;
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
        userId: this.user._id,
        bidId: this.bidDetail.bidData._id,
        serial: this.$route.params.serial,
        company: this.user.company,
      });

      this.loadings[index].load = false;
      this.loadings[index].action = 'neither';
    },
    async disqualify(id, index, action) {
      this.loadings[index].action = action;
      this.loadings[index].load = true;

      await this.rejectCompany({
        companyId: id,
        userId: this.user._id,
        bidId: this.bidDetail.bidData._id,
        serial: this.$route.params.serial,
        company: this.user.company,
      });

      this.loadings[index].load = false;
      this.loadings[index].action = 'neither';
    },
    async unAward(id, index, action) {
      this.loadings[index].action = action;
      this.loadings[index].load = true;

      await this.UnAwardCompany({
        companyId: id,
        userId: this.user._id,
        bidId: this.bidDetail.bidData._id,
        serial: this.$route.params.serial,
        company: this.user.company,
      });

      this.loadings[index].load = false;
      this.loadings[index].action = 'neither';
    },
    async unDisqualify(id, index, action) {
      this.loadings[index].action = action;
      this.loadings[index].load = true;

      await this.UnDisqualifyCompany({
        companyId: id,
        userId: this.user._id,
        bidId: this.bidDetail.bidData._id,
        serial: this.$route.params.serial,
        company: this.user.company,
      });

      this.loadings[index].load = false;
      this.loadings[index].action = 'neither';
    },
    formatPrice(value) {
      const val = (value / 1).toFixed(2).replace(',', '.');
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
  },
  mounted() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.user = this.$store.getters.userInfo;
  },
};
</script>
