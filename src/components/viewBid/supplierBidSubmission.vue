<template>
  <v-col class="my-7 pa-0 bid-submission-tab" align="start">
    <v-form @submit.prevent="submit" ref="form" v-model="valid" lazy-validation>
      <div class="title-line" v-if="
        bidDetail.bidData &&
        bidDetail.bidData.lineItems &&
        bidDetail.bidData.lineItems.length > 0
      ">Line Items</div>
      <v-simple-table class="template-table-style mt-1 pb-8" v-if="
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
            <tr v-for="(item, index) in bidDetail.bidData.lineItems" :key="index">
              <td class="text-left">{{ item.description }}</td>
              <td class="text-left">
                <div class="d-flex align-center unit-class">
                  <div class=" unit">{{ item.unit }}</div>
                  <div class="mr-2">

                    <v-text-field single-line class="mt-7" :rules="item.required === 'true' ? lineItemsRule : []"
                      outlined :disabled="checkTimeForLineItems" dense min="0" prefix="$" type="number"
                      @input="validatePrice($event, index)" :key="index" v-if="lineItems[index]['bid']"
                      v-model="lineItems[index]['price']" :hideDetails="getPriceError[index].message !== ''"
                      :class="{ 'error--text': getPriceError[index].message !== '' }"></v-text-field>

                    <div v-else class="no-bid d-flex align-center">No bids
                    </div>

                    <div class="price-error" v-if="!getPriceError[index].status">{{ getPriceError[index].message }}
                    </div>
                  </div>

                  <div v-if="item.required === 'false' && bidDetail.receivingBids">
                    <v-btn @click="noBidUpdate(index)" icon v-if="lineItems[index]['bid']">
                      <v-icon size="20" color="#F03F20">mdi-close</v-icon>
                    </v-btn>
                    <v-btn v-else icon @click="yesBidUpdate(index)">
                      <v-icon size="20" color="#201B1B">mdi-reply-outline</v-icon></v-btn>
                  </div>
                </div>

              </td>
              <td class="text-left ">
                {{ item.inputType }}
              </td>
              <td class="text-left ">
                {{ item.quantity }}
              </td>
              <td class="text-left ">
                {{ item.required === 'true' ? 'Yes' : 'No' }}
              </td>
              <td class="text-left">
                {{ item.buyerComment }}
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>

      <div class=" bid-row-3 pb-2" v-if="bidDetail.bidData.questions && bidDetail.bidData.questions.length">
        <div class="question-section-title" v-if="bidDetail.bidData.lineItems &&
        bidDetail.bidData.lineItems.length > 0">
          <span class="title-detail px-4">Buyer Questions</span>
        </div>
        <div v-else>
          <span class="title-detail px-4">Buyer Questions</span>
        </div>
        <div class="question-sub-section" v-if="bidDetail.bidData.questions && bidDetail.bidData.questions.length">

          <div v-for="(item, index) in bidDetail.bidData.questions" :key="index">
            <v-divider color="#F1F1F1" v-if="item.type === 'category'"></v-divider>
            <div class="sub-section-title px-4 " v-if="item.type === 'category'">{{ item.title }} </div>

            <v-row class="ml-10 mr-6 px-3 operational-ques py-1 my-2 " justify="space-between" align="center"
              v-if="item.type === 'question'">

              <v-col md="8" class="first-child" v-if="item.type === 'question'">{{
                item.title
              }} <sup class="sub-title">{{ item.required === 'true' ? '(Required)' : '' }}</sup></v-col>
              <v-col class="second-child text-right">

                <v-checkbox v-if="(item.questionType === 'checkbox' && !item.options)"
                  :rules="item.required === 'true' ? answerRule : []" :disabled="!bidDetail.receivingBids"
                  v-model="answers[index]['answer']"></v-checkbox>

                <v-radio-group v-model="answers[index]['answer']" row :disabled="!bidDetail.receivingBids"
                  :rules="item.required === 'true' ? answerRule : []"
                  v-if="(item.questionType === 'checkbox' && item.options)">
                  <v-radio :label="item.options[selectIndex].label" :value="item.options[selectIndex].label"
                    color="#0d9648" checked v-for="(select, selectIndex) in item.options" :key="select.id"></v-radio>
                </v-radio-group>

                <v-text-field v-if="item.questionType === 'textfield'"
                  :rules="item.required === 'true' ? answerRule : []" outlined :disabled="!bidDetail.receivingBids"
                  v-model="answers[index]['answer']"></v-text-field>

                <v-textarea v-if="item.questionType === 'textarea'" outlined auto-grow
                  :disabled="!bidDetail.receivingBids" rows="3" row-height="25"
                  :rules="item.required === 'true' ? answerRule : []" v-model="answers[index]['answer']"></v-textarea>

                <div class="upload-attach" v-if="item.questionType === 'uploadFile'">
                  <div class="d-flex justify-space-between align-center"
                    v-if="((answers[index].answer && answers[index].answer.name || answers[index].fileName))">
                    <div class="doc-list">{{(answers[index].answer.name || answers[index].fileName)}}</div>

                    <v-dialog class="dialog-class" v-model="dialog" width="320">

                      <template v-slot:activator="{ on, attrs }">

                        <v-btn v-on="on" v-bind="attrs" icon v-if="bidDetail.receivingBids">
                          <v-icon size="20" color="#F03F20">mdi-close
                          </v-icon>
                        </v-btn>
                      </template>

                      <v-card>
                        <v-card-title class="text-h5 justify-center grey lighten-2">
                          Remove Attachment file
                        </v-card-title>
                        <v-card-text class="pt-3 mb-n2">Are you sure you really want to remove this attachment
                          file?</v-card-text>
                        <v-divider></v-divider>
                        <v-card-actions>
                          <v-spacer></v-spacer>

                          <v-btn color="#0d9648" outlined @click="dialog = false">
                            Cancel
                          </v-btn>
                          <v-btn color="#F32349" outlined @click="dialog = false; removeQuesDoc(index)">
                            Agree
                          </v-btn>
                        </v-card-actions>
                      </v-card>

                    </v-dialog>

                  </div>

                  <label :for="`uploadFileQ${index}`" v-else class="
                        upload-file
                       pa-4
                        d-block
                        font-weight-medium
                        text-center
                      ">
                    <v-file-input :id="`uploadFileQ${index}`" @change="handleDocumentForAnswer($event, index)"
                      :rules="fileRule" :disabled="!bidDetail.receivingBids" />

                    <div class="mt-1">
                      <v-icon class="mr-4">mdi-cloud-upload-outline</v-icon>Upload here
                    </div>
                  </label>
                </div>
              </v-col>

            </v-row>
          </div>
        </div>
      </div>
      <div class="bid-row-3 pt-8 pb-11" v-if="checkTime">
        <div class="title-detail px-4">Supplier Attachments</div>

        <v-row no-gutters align="center" class="px-4 mt-7" v-if="bidDetail.receivingBids">
          <v-col cols="12" sm="12" md="12">
            <div class="upload-attach text-center">
              <label for="uploadFile" class="upload-file pa-6 d-block font-weight-medium text-center">
                <input type="file" ref="documentUploader" class="d-none" id="uploadFile"
                  @change="handleDocument($event)" />

                <span class="text-decoration-underline">Upload Attachments Here</span>
              </label>
            </div>
          </v-col>
        </v-row>

        <div class="attachment-list-style pt-6" v-if="
          supplierDocList && supplierDocList.length
        ">
          <v-simple-table fixed-header>
            <template v-slot:default>

              <tbody>
                <tr v-for="(doc, index) in supplierDocList" :key="index">
                  <td class="text-left">
                    <img :src="require('@/assets/images/bids/FilePdf.png')" />
                  </td>
                  <td class="text-left">{{ doc.fileName }}</td>
                  <td class="text-left">{{ size(doc.fileSize) }} </td>

                  <td class="text-left">
                    {{
                      doc.uploadedAt
                        | moment("MM/DD/YYYY")
                    }}
                  </td>
                  <td class="text-left delete-class text-decoration-underline" v-if="bidDetail.receivingBids"
                    @click="deleteAttach(index)">

                    <v-dialog class="dialog-class" v-model="dialogT" width="320">

                      <template v-slot:activator="{ on, attrs }">

                        <v-btn v-on="on" v-bind="attrs" text v-if="bidDetail.receivingBids" :ripple="false">
                          Delete
                        </v-btn>
                      </template>

                      <v-card>
                        <v-card-title class="text-h5 justify-center grey lighten-2">
                          Remove File Attachment?
                        </v-card-title>
                        <v-card-text class="pt-3 mb-n2">Are you sure you really want to remove this attachment
                          file?</v-card-text>
                        <v-divider></v-divider>
                        <v-card-actions>
                          <v-spacer></v-spacer>

                          <v-btn color="#0d9648" outlined @click="dialogT = false">
                            Cancel
                          </v-btn>
                          <v-btn color="#F32349" outlined @click="dialogT = false; deleteAttach(index)">
                            Agree
                          </v-btn>
                        </v-card-actions>
                      </v-card>

                    </v-dialog>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </div>
      </div>

      <div class=" pt-10 pb-8 supplier-note-add">
        <div class="title-detail px-4">Supplier Notes</div>

        <div class="px-4 pt-6"><v-textarea v-model="supplierNote" value="Please submit your notes here" hideDetails
            outlined auto-grow rows="6" row-height="25" :disabled="!bidDetail.receivingBids"></v-textarea></div>

      </div>

      <div class="text-center mt-3"
        v-if="(getIntent !== null && getIntent === 'true' && bidDetail.receivingBids && !isBidSubmitted)">
        <v-btn color="#0D9648" height="56" width="220"
          class="text-capitalize white--text font-weight-bold save-button px-9" @click="submit('submit')"
          :disabled="showLoading" large>
          <v-progress-circular v-if="showLoading" indeterminate color="#0D9648"></v-progress-circular>
          <div v-else>Submit bid</div>
        </v-btn>
      </div>
      <div class="text-center mt-3"
        v-if="(getIntent !== null && getIntent === 'true' && !checkTimeForLineItems && isBidSubmitted)">
        <v-btn color="#0D9648" height="56" width="220"
          class="text-capitalize white--text font-weight-bold save-button px-9" @click="submit('edit')"
          :disabled="showLoading" large>
          <v-progress-circular v-if="showLoading" indeterminate color="#0D9648"></v-progress-circular>
          <div v-else>Update bid</div>
        </v-btn>
      </div>
    </v-form>

  </v-col>

</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      lineItems: [],
      intent: 'true',
      loading: false,
      dialog: false,
      dialogT: false,
      valid: true,
      supplierNote: '',
      file: '',
      answers: [],
      user: '',
      value: [],
      lineItemsRule: [
        (value) => !!value || 'Line item is required!',
      ],
      answerRule: [
        (value) => !!value || 'Answer is required!',
      ],
      fileRule: [
        (value) => !!value || 'File attachment is required!',
      ],
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
    getSupplierBid() {
      return this.$store.getters.supplierBid;
    },
    showLoading() {
      return this.loading;
    },
    isBidSubmitted() {
      return this.$store.getters.isBidSubmitted;
    },
    isBidOut() {
      if (this.bidDetail.bidData.type === 'BidOut Process' && this.bidDetail.bidout) {
        return true;
      }
      return false;
    },
    checkTime() {
      if (this.isBidOut && this.supplierDocList && this.supplierDocList.length) return true;
      if (!this.isBidOut && this.bidDetail.receivingBids) return true;
      if (!this.isBidOut && !this.bidDetail.receivingBids && this.supplierDocList && this.supplierDocList.length) return true;

      return false;
    },

    checkTimeForLineItems() {
      if (this.isBidOut && this.getIntent !== null && this.isBidSubmitted) {
        return false;
      }

      if (this.isBidOut && this.getIntent === null) {
        return true;
      }

      if (this.isBidOut && !this.isBidSubmitted) {
        return true;
      }

      if (this.bidDetail.receivingBids) return false;
      return true;
    },
    getPriceError() {
      return this.value;
    },

    isValid() {
      return this.value && this.value.length && this.value.reduce((acc, curr) => acc && curr.status, true);
    },
  },
  methods: {
    ...mapActions(['submitBid', 'editSubmitBid']),
    size(size) {
      const sizeInMB = (size / (1024 * 1024)).toFixed(2);
      return `${sizeInMB}mb`;
    },
    validatePrice(event, index) {
      if (this.isBidSubmitted && this.isBidOut) {
        if (Number(this.getSupplierBid.lineItems[index].price) < Number(event)) {
          this.value[index].message = 'Suppliers can only lower the prices during the BidOut Phase!';
          this.value[index].status = false;
        } else {
          this.value[index].message = '';
          this.value[index].status = true;
        }
      }
    },
    async submit(action) {
      if (!this.isValid && action === 'edit' && this.isBidOut) {
        this.$store.commit('setLoweringPriceAlert');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      if (action === 'submit' && this.$refs.form.validate()) {
        this.loading = true;

        const lineItemsA = this.lineItems;
        const answersA = this.answers;

        lineItemsA.forEach((el) => delete el.bid);

        answersA.forEach((el) => delete el.category);

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

        this.$store.commit('removeSupplierAttachment');
      } else if (action === 'edit' && this.$refs.form.validate() && this.isValid) {
        this.loading = true;

        const lineItemsA = this.lineItems;
        const supplierAttachmentA = this.supplierDocList.map((el) => el.attachment);

        lineItemsA.forEach((el) => delete el.bid);

        await this.editSubmitBid({
          userId: this.user.id,
          companyId: this.user.company.id,
          bidId: this.bidDetail.bidData.id,
          supplierNote: this.supplierNote,
          supplierAttachments: supplierAttachmentA,
          lineItems: lineItemsA,
          answers: this.answers,
          submitBidId: this.getSupplierBid.id,
          serial: this.$route.params.serial,
        });

        this.loading = false;
      }
    },
    handleDocumentForAnswer(event, index) {
      this.answers[index].answer = event;
    },
    handleDocument(event) {
      this.file = event.target.files[0];

      this.$store.commit('setSupplierAttachment', {
        fileName: this.file.name,
        fileSize: this.file.size,
        attachment: this.file,
        uploadedAt: Date.now(),
      });
    },

    deleteAttach(index) {
      this.$store.state.bid.supplierAttachment.splice(index, 1);
    },
    removeQuesDoc(index) {
      this.answers[index].answer = null;
      this.answers.forEach((el, i) => {
        if (index === i && el.fileName) {
          delete el.fileName;
          delete el.fileSize;
        }
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
          price: null,
          bid: true,
          id: bidData.lineItems[i].id,
          quantity: bidData.lineItems[i].quantity,
          required: bidData.lineItems[i].required,
        });

        this.value.push({
          message: '',
          status: true,
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
          bid: this.getSupplierBid.lineItems[i].price !== 'NO_BID',
          id: this.getSupplierBid.lineItems[i].id,
          quantity: this.getSupplierBid.lineItems[i].Qty,
          required: this.getSupplierBid.lineItems[i].required,
        });

        this.value.push({
          message: '',
          status: true,
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

      this.supplierNote = this.getSupplierBid.supplierNote;

      for (let i = 0; i < bidData.questions.length; i++) {
        if (this.getSupplierBid.answers[i].questionId === bidData.questions[i].id) {
          if (bidData.questions[i].questionType === 'uploadFile') {
            this.answers.push({
              questionId: this.getSupplierBid.answers[i].questionId,
              answer: this.getSupplierBid.answers[i].answer,
              fileName: this.getSupplierBid.answers[i].fileName,
              fileSize: this.getSupplierBid.answers[i].fileSize,
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
    },
  },
  mounted() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },
  created() {
    if (this.isBidSubmitted) {
      this.initializeForEdit();
    } else { this.initializeForNew(); }

    this.user = this.$store.getters.userInfo;
  },
};
</script>
