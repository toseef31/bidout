<template>
  <v-col class="my-7 pa-0 bid-submission-tab" align="start">
{{getDDDD}}

<v-form @submit.prevent="submissionForm" ref="form" v-model="valid" @input="fieldUpdate">
    <div class="title-line" v-if="
            bidDetail.bidData &&
            bidDetail.bidData.lineItems &&
            bidDetail.bidData.lineItems.length > 0
          ">Line Items</div>
    <v-simple-table class="template-table-style mt-1" v-if="
            bidDetail.bidData &&
            bidDetail.bidData.lineItems &&
            bidDetail.bidData.lineItems.length > 0
          ">
      <template v-slot:default>
        <thead>
          <tr>

            <th class="text-left">Line Item Description</th>
            <th class="text-left">Unit/Measure</th>
            <th class="text-left">Input Type</th>
            <th class="text-left">QTY</th>
            <th class="text-left">Required</th>
            <th class="text-left">Buyer Comments</th>

          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in bidDetail.bidData.lineItems" :key="index">
            <td class="text-left">{{ item.description}}</td>
            <td class="text-left">
            <div class="d-flex align-center unit-class">
             <div class="mr-1 unit">{{ item.unit}}</div>
             <div class="mr-2">
                <v-text-field
                    single-line
                    outlined
                    dense
                    prefix="$"
                    type="number"
                    v-if="lineItems[index]['bid']"
                    v-model="lineItems[index]['price']"

                ></v-text-field>
                <div v-else  class="no-bid d-flex align-center">No bids
                </div>
             </div>

          <div v-if="item.required === 'false'">
              <v-btn @click="noBidUpdate(index)" icon v-if="lineItems[index]['bid']">
              <v-icon size="20" color="#F03F20" >mdi-close</v-icon>
              </v-btn>
              <v-btn v-else icon @click="yesBidUpdate(index)">
              <v-icon size="20"  color="#201B1B">mdi-reply-outline</v-icon></v-btn>
          </div>
        </div>

            </td>
            <td class="text-left ">
            {{ item.inputType}}
            </td>
            <td class="text-left ">
             {{ item.quantity}}
            </td>
            <td class="text-left ">
             {{ item.required === 'true' ? 'Yes': 'No'}}
            </td>
            <td class="text-left">
                {{ item.buyerComment }}
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

  <div class="pt-8 bid-row-3 pb-2"  v-if="bidDetail.bidData.questions && bidDetail.bidData.questions.length">
        <div class="question-section-title">
          <span class="title-detail px-4">Buyer Questions</span>
        </div>
        <div
          class="question-sub-section"
          v-if="bidDetail.bidData.questions && bidDetail.bidData.questions.length"
        >

              <div v-for="(item, index) in bidDetail.bidData.questions"
                  :key="index">
                  <v-divider color="#F1F1F1" v-if="item.type === 'category'"></v-divider>
                   <div class="sub-section-title px-4 " v-if="item.type === 'category'">{{item.title}}</div>

                <v-row
                  class="ml-10 mr-6 px-3 operational-ques py-1 my-2 "
                  justify="space-between"
                  align="center"
                  v-if="item.type=== 'question'"
                >

                  <v-col md="8"  class="first-child" v-if="item.type=== 'question'">{{
                    item.title
                  }}</v-col>
                  <v-col class="second-child text-right"  >

                    <v-checkbox
                       v-if="(item.questionType === 'checkbox'  && !item.options)"
                       v-model="answers[index]['answer']"
                        hideDetails
                    ></v-checkbox>

                    <v-radio-group
                    v-model="answers[index]['answer']"
                       row
                       v-if="(item.questionType === 'checkbox' && item.options)"
                       >
                        <v-radio
                            :label="item.options[0].label"
                            value="true"
                            color="#0d9648"
                            checked
                        ></v-radio>
                        <v-radio
                            :label="item.options[1].label"
                            value="false"
                            color="#F32349"
                        ></v-radio>
                    </v-radio-group>

                    <v-text-field
                        v-if="item.questionType === 'textfield'"
                        hideDetails
                        outlined
                        v-model="answers[index]['answer']"
                    ></v-text-field>

                    <v-textarea
                        v-if="item.questionType === 'textarea'"
                        hideDetails
                        outlined
                        auto-grow
                        rows="3"
                        row-height="25"
                        v-model="answers[index]['answer']"
                    ></v-textarea>

                <div class="upload-attach" v-if="item.questionType === 'uploadFile'">
                    <div class="d-flex justify-space-between align-center" v-if="((answers[index].answer && answers[index].answer.name || answers[index].name) )">
                <div class="doc-list">{{(answers[index].answer.name || answers[index].name)}}</div>
                    <v-btn @click="removeQuesDoc(index)" icon>
                        <v-icon size="20" color="#F03F20" >mdi-close
                        </v-icon>
                   </v-btn>

                </div>

                    <label
                      :for="`uploadFileQ${index}`"
                      v-else
                      class="
                        upload-file
                       pa-4
                        d-block
                        font-weight-medium
                        text-center
                      "
                    >
                      <input
                        class="d-none"
                        type="file"
                        :id="`uploadFileQ${index}`"
                        @change="handleDocument($event,'questionUpload',index,item.id)"
                      />

                    <div>
                      <v-icon class="mr-4">mdi-cloud-upload-outline</v-icon>Upload here
                    </div>
                    </label>
                  </div>
                </v-col>

                </v-row>
              </div>
           </div>
       </div>
       <div class="bid-row-3 pt-8 pb-11">
          <div class="title-detail px-4">Supplier Attachments</div>

          <v-row no-gutters align="center" class="px-4 mt-7">
                <v-col cols="12" sm="12" md="12">
                    <div class="upload-attach text-center">
                    <label
                        for="uploadFile"
                        class="upload-file pa-6 d-block font-weight-medium text-center"
                    >
                        <input
                        type="file"
                        ref="documentUploader"
                        class="d-none"
                        id="uploadFile"
                        @change="handleDocument($event)"
                        />

                        <span class="text-decoration-underline">Upload Attachments Here</span>
                    </label>
                    </div>
                </v-col>
           </v-row>

           <div
          class="attachment-list-style pt-6"
          v-if="
          supplierDocList && supplierDocList.length
          "
        >
          <v-simple-table fixed-header>
            <template v-slot:default>

              <tbody>
                <tr
                  v-for="(doc, index) in supplierDocList"
                  :key="index"
                >
                  <td class="text-left">
                    <img :src="require('@/assets/images/bids/FilePdf.png')" />
                  </td>
                  <td class="text-left">{{ doc.fileName }}</td>
                  <td class="text-left">{{ size(doc.fileSize) }} </td>

                  <td class="text-left">
                    {{ doc.uploadedAt
 | moment("MM/DD/YYYY") }}
                  </td>
                  <td class="text-left delete-class text-decoration-underline" @click="deleteAttach(index)">
                    <div>Delete</div>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </div>
      </div>

      <div class=" pt-10 pb-8 supplier-note-add">
          <div class="title-detail px-4">Supplier Notes</div>

                    <div class="px-4 pt-6"><v-textarea
                    v-model="supplierNote"
                    value="Please submit your notes here"
                    hideDetails
                    outlined
                    auto-grow
                    rows="6"
                    row-height="25"
                    ></v-textarea></div>

      </div>

      <div class="text-center mt-3" v-if="(getIntent !== null && getIntent === 'true' && !isAfterDueDate && !isBidSubmitted)">
        <v-btn
          color="#0D9648"
          height="56"
          width="220"
          class="text-capitalize white--text font-weight-bold save-button px-9"
          @click="submit"
          :disabled="showLoading"
          large

          >
          <v-progress-circular
          v-if="showLoading"
      indeterminate
      color="#0D9648"
           ></v-progress-circular>
          <div v-else>Submit bid</div></v-btn
        >
      </div>
      <div class="text-center mt-3" v-if="(getIntent !== null && getIntent === 'true' && !isAfterDueDate && isBidSubmitted)">
        <v-btn
          color="#0D9648"
          height="56"
          width="220"
          class="text-capitalize white--text font-weight-bold save-button px-9"
          @click="editSubmit"
          :disabled="showLoading"
          large

          >
          <v-progress-circular
          v-if="showLoading"
      indeterminate
      color="#0D9648"
           ></v-progress-circular>
          <div v-else>Edit bid</div></v-btn
        >
      </div>
    </v-form>
  </v-col>

</template>

<script>
import moment from 'moment-timezone';
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      lineItems: [],
      intent: 'true',
      loading: false,
      supplierNote: '',
      file: '',
      answers: [],
      user: '',
      rules: {
        required: (value) => !!value || 'Required.',
      },
    };
  },
  computed: {
    bidDetail() {
      return this.$store.getters.bidViewData;
    },
    supplierDocList() {
      return this.$store.getters.supplierAttachment;
    },
    getIntent() {
      return this.$store.getters.bidIntent;
    },
    getDDDD() {
      return this.answers;
    },
    getSupplierBid() {
      return this.$store.getters.supplierBid;
    },
    showLoading() {
      return this.loading;
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
    isBidSubmitted() {
      return this.$store.getters.isBidSubmitted;
    },
  },
  methods: {
    ...mapActions(['submitBid', 'editSubmitBid']),
    size(size) {
      const sizeInMB = (size / (1024 * 1024)).toFixed(2);
      return `${sizeInMB}mb`;
    },
    async submit() {
      this.loading = true;

      const lineItemsA = this.lineItems;
      const answersA = this.answers;

      lineItemsA.forEach((el) => delete el.bid);

      // answersA = answersA.filter((el) => el.category !== 'category');

      answersA.forEach((el) => delete el.category);

      // console.log('Answers - ', answersA);
      // console.log('LineItems - ', lineItemsA);
      // console.log('supplierAttachment', this.supplierDocList);

      await this.submitBid({
        userId: this.user.id,
        companyId: this.user.company.id,
        bidId: this.bidDetail.bidData.id,
        supplierNote: this.supplierNote,
        supplierAttachments: this.supplierDocList,
        lineItems: lineItemsA,
        answers: answersA,
        serial: this.$route.params.serial,
      });

      this.loading = false;

      this.$store.getters.supplierAttachment = [];
    },
    async editSubmit() {
      this.loading = true;

      const lineItemsA = this.lineItems;
      const supplierAttachmentA = this.supplierDocList.map((el) => el.attachment);
      const answersA = this.answers;

      lineItemsA.forEach((el) => delete el.bid);
      // answersA = answersA.filter((el) => el.category !== 'category');

      await this.editSubmitBid({
        userId: this.user.id,
        companyId: this.user.company.id,
        bidId: this.bidDetail.bidData.id,
        supplierNote: this.supplierNote,
        supplierAttachments: supplierAttachmentA,
        lineItems: lineItemsA,
        answers: answersA,
        submitBidId: this.getSupplierBid.id,
        serial: this.$route.params.serial,
      });

      this.loading = false;
    },
    handleDocument(event, slug, index, questionId) {
      this.file = event.target.files[0];

      if (slug) {
        this.answers[index].answer = this.file;
      } else {
        this.$store.commit('setSupplierAttachment', {
          fileName: this.file.name,
          fileSize: this.file.size,
          attachment: this.file,
          uploadedAt: Date.now(),
        });
      }
    },

    deleteAttach(index) {
      this.$store.getters.supplierAttachment.splice(index, 1);
    },
    removeQuesDoc(index) {
      this.answers[index].answer = null;
      this.answers.forEach((el, i) => {
        if (index === i && el.name) delete el.name;
      });
    },
    noBidUpdate(index) {
      this.lineItems[index].price = 'NO_BID';
      this.lineItems[index].bid = false;
    },
    yesBidUpdate(index) {
      this.lineItems[index].price = '';
      this.lineItems[index].bid = true;
    },
    initializeForNew() {
      const { bidData } = this.bidDetail;
      for (let i = 0; i < bidData.lineItems.length; i++) {
        this.lineItems.push({
          price: 0,
          bid: true,
          id: bidData.lineItems[i].id,
        });
      }

      for (let i = 0; i < bidData.questions.length; i++) {
        this.answers.push({
          questionId: bidData.questions[i].id,
          answer: null,
          category: bidData.questions[i].type,
        });
      }
    },
    initializeForEdit() {
      const { bidData } = this.bidDetail;

      for (let i = 0; i < bidData.lineItems.length; i++) {
        this.lineItems.push({
          price: this.getSupplierBid.lineItems[i].price,
          bid: true,
          id: this.getSupplierBid.lineItems[i].id,
        });
      }

      for (let i = 0; i < this.getSupplierBid.supplierAttachments.length; i++) {
        this.$store.commit('setSupplierAttachment', {
          fileName: this.getSupplierBid.supplierAttachments[i].fileName,
          fileSize: this.getSupplierBid.supplierAttachments[i].fileSize,
          attachment: this.getSupplierBid.supplierAttachments[i].attachment,
          uploadedAt: this.getSupplierBid.supplierAttachments[i].uploadedAt._seconds,
        });
      }

      console.log(this.getSupplierBid.answers);
      this.supplierNote = this.getSupplierBid.supplierNote;

      for (let i = 0; i < bidData.questions.length; i++) {
        if (this.getSupplierBid.answers[i].questionId === bidData.questions[i].id) {
          if (bidData.questions[i].questionType === 'uploadFile') {
            this.answers.push({
              questionId: this.getSupplierBid.answers[i].questionId,
              answer: this.getSupplierBid.answers[i].answer,
              name: this.getSupplierBid.answers[i].fileName,
            });
          } else {
            this.answers.push({
              questionId: this.getSupplierBid.answers[i].questionId,
              answer: this.getSupplierBid.answers[i].answer,
            });
          }
        } else {
          this.answers.push({
            questionId: bidData.questions[i].id,
            answer: null,
            category: bidData.questions[i].type,
          });
        }
      }

      console.log('Answers - ', this.answers);
    },
  },
  created() {
    if (this.isBidSubmitted) {
      this.initializeForEdit();
    } else { this.initializeForNew(); }

    this.user = this.$store.getters.userInfo;
  },
};
</script>
