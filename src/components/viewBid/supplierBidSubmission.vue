<template>
  <v-col class="my-7 pa-0 bid-submission-tab" align="start">
    <div class="text-right">
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">

          <v-btn v-bind="attrs" class="mr-7 text-capitalize text-decoration-none export-excel" v-on="on" icon
            @click="downloadTemplate" color="#0D9648">
            <v-icon size="24" color="#0d9648">mdi-information-outline
            </v-icon>
          </v-btn>
        </template>
        <span>Click here to download the <strong> Price excel template</strong></span>
      </v-tooltip>
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <label class="import-excel btn" for="import" v-bind="attrs" v-on="on">
            Import <v-icon size="30" color="#0d9648">mdi-microsoft-excel</v-icon>
            <input type="file" id="import" class="d-none" accept=".xlsx, .xls, .csv" @change="importPrice" />
          </label>
        </template>
        <span>Import the <strong>Excel Template</strong> to upload line items price</span>
      </v-tooltip>
    </div>

    <v-form @submit.prevent="submit" ref="form" v-model="valid" lazy-validation>
      <div class="title-line" v-if="bidDetail.bidData &&
        bidDetail.bidData.lineItems &&
        bidDetail.bidData.lineItems.length > 0
        ">Line Items</div>
      <v-simple-table class="template-table-style mt-1 pb-8" v-if="bidDetail.bidData &&
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
                    <v-text-field v-model="lineItems[index]['price']" single-line class="mt-7" outlined
                      :disabled="checkTimeForLineItems" dense prefix="$" type="text" :key="index"
                      :rules="item.required === true ? lineItemsRule : []" @input="validatePrice($event, index)"
                      @keypress="NumbersOnly($event, index)" @blur="formatNumber(index)" v-if="lineItems[index]['bid']"
                      :class="{ 'error--text': getPriceError[index].message !== '' }"
                      :hideDetails="getPriceError[index].message !== ''">
                    </v-text-field>

                    <div v-else class="no-bid d-flex align-center">No bids
                    </div>

                    <div class="price-error" v-if="!getPriceError[index].status">{{ getPriceError[index].message }}
                    </div>
                  </div>

                  <div v-if="item.required === false && !checkTimeForLineItems">
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
                {{ item.required === true ? 'Yes' : 'No' }}
              </td>
              <td class="text-left">
                {{ item.buyerComment === 'undefined' || item.buyerComment === '' ? '' : item.buyerComment }}
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
              }} <sup class="sub-title">{{ item.required === true ? '(Required)' : '' }}</sup></v-col>
              <v-col class="second-child text-right">

                <v-checkbox v-if="(item.questionType === 'checkbox' && !item.options)"
                  :rules="item.required === true ? answerRule : []" :disabled="checkForQ"
                  v-model="answers[index]['answer']"></v-checkbox>

                <v-radio-group v-model="answers[index]['answer']" row :disabled="checkForQ"
                  :rules="item.required === true ? answerRule : []"
                  v-if="(item.questionType === 'checkbox' && item.options)">
                  <v-radio :label="item.options[selectIndex].label" :value="item.options[selectIndex].label"
                    color="#0d9648" checked v-for="(select, selectIndex) in item.options" :key="select._id"></v-radio>
                </v-radio-group>

                <v-text-field v-if="item.questionType === 'textfield'" :rules="item.required === true ? answerRule : []"
                  outlined :disabled="checkForQ" v-model="answers[index]['answer']"></v-text-field>

                <v-textarea v-if="item.questionType === 'textarea'" outlined auto-grow :disabled="checkForQ" rows="3"
                  row-height="25" :rules="item.required === true ? answerRule : []"
                  v-model="answers[index]['answer']"></v-textarea>

                <div class="upload-attach" v-if="item.questionType === 'uploadFile'">
                  <div class="d-flex justify-space-between align-center"
                    v-if="((answers[index].answer && answers[index].answer.name || answers[index].fileName))">
                    <div class="doc-list">{{ (answers[index].answer.name || answers[index].fileName) }}</div>

                    <v-dialog class="dialog-class" v-model="dialog" width="340" v-if="!checkForQ">

                      <template v-slot:activator="{ on, attrs }">

                        <v-btn v-on="on" v-bind="attrs" icon @click="answerI = index">
                          <v-icon size="20" color="#F03F20">mdi-close
                          </v-icon>
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

                          <v-btn color="#0d9648" outlined @click="dialog = false">
                            Cancel
                          </v-btn>
                          <v-btn color="#F32349" outlined @click="dialog = false; removeQuesDoc()">
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
                      :disabled="checkForQ" :rules="item.required === true ? fileRule : []" />

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

        <v-row no-gutters align="center" class="px-4 mt-7" v-if="checkForUpload">
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

        <div class="attachment-list-style pt-6" v-if="supplierDocList && supplierDocList.length
          ">
          <v-simple-table fixed-header>
            <template v-slot:default>

              <tbody>
                <tr v-for="(doc, index) in supplierDocList" :key="index">
                  <td class="text-left">
                    <img :src="require('@/assets/images/bids/FilePdf.png')" height="24px"
                      v-if="checkFileType(doc.fileName) === 'pdf'" />
                    <img :src="require('@/assets/images/bids/FileDoc.png')" height="24px"
                      v-else-if="checkFileType(doc.fileName) === 'docx' || checkFileType(doc.fileName) === 'doc'" />
                    <v-icon color="#0D1139"
                      v-else-if="checkFileType(doc.fileName) === 'xlsx' || checkFileType(doc.fileName) === 'xls'">mdi-microsoft-excel</v-icon>
                    <v-icon color="#0D1139" v-else>mdi-file-document</v-icon>
                  </td>
                  <td class="text-left">{{ doc.fileName }}</td>
                  <td class="text-left">{{ size(doc.fileSize) }} </td>

                  <td class="text-left">
                    {{
                      formatDate(doc.uploadedAt)
                    }}
                  </td>
                  <td class="text-left delete-class text-decoration-underline" v-if="checkForUpload">

                    <v-dialog class="dialog-class" v-model="getDialogT[index].open" width="330">

                      <template v-slot:activator="{ on, attrs }">

                        <v-btn v-on="on" v-bind="attrs" text v-if="checkForUpload" @click="deletedFileI = index"
                          :ripple="false">
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

                          <v-btn color="#0d9648" outlined @click="dialogT[deletedFileI].open = false;">
                            Cancel
                          </v-btn>
                          <v-btn color="#F32349" outlined @click="dialogT[deletedFileI].open = false; deleteAttach()">
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
            outlined auto-grow rows="6" row-height="25" :disabled="!checkForUpload"></v-textarea></div>

      </div>

      <div class="text-center mt-3"
        v-if="(getIntent !== null && (getIntent === 'true' || getIntent === true) && bidDetail.receivingBids && !isBidSubmitted)">
        <v-btn color="#0D9648" height="56" width="220"
          class="text-capitalize white--text font-weight-bold save-button px-9" @click="submit('submit')"
          :disabled="showLoading" large>
          <v-progress-circular v-if="showLoading" indeterminate color="#0D9648"></v-progress-circular>
          <div v-else>Submit bid</div>
        </v-btn>
      </div>
      <div class="text-center mt-3"
        v-if="(getIntent !== null && (getIntent === 'true' || getIntent === true) && !checkTimeForLineItems && isBidSubmitted)">
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
import * as XLSX from 'xlsx';
import moment from 'moment-timezone';

export default {
  data() {
    return {
      lineItems: [],
      loading: false,
      dialog: false,
      dialogT: [],
      valid: true,
      deletedFileI: null,
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
      answerI: null
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
    checkForUpload() {
      if (this.isBidOut) return true;
      if (this.bidDetail.receivingBids) return true;

      return false;
    },
    isBidOut() {
      if (this.bidDetail.bidData.type === 'BidOut Process' && this.bidDetail.bidout) {
        return true;
      }
      return false;
    },
    checkTime() {
      if (this.isBidOut) return true;
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
    checkForQ() {
      if (this.bidDetail.receivingBids) return false;
      if (this.bidDetail.bidout) return false;
      return true;
    },
    getPriceError() {
      return this.value;
    },

    isValid() {
      return this.value && this.value.length && this.value.reduce((acc, curr) => acc && curr.status, true);
    },
    formattedPrice() {
      const formattedPrices = {};
      this.lineItems.forEach((item, index) => {
        formattedPrices[index] = parseFloat(item.price).toFixed(2);
      });
      return formattedPrices;
    },
    getDialogT() {
      return this.dialogT;
    },
  },
  methods: {
    ...mapActions(['submitBid', 'editSubmitBid']),
    size(size) {
      const sizeInMB = (size / (1024 * 1024)).toFixed(2);
      return `${sizeInMB}mb`;
    },
    formatDate(item) {
      if (item._seconds && item._nanoseconds) {
        const date = moment(item._seconds * 1000 + item._nanoseconds / 1000000).tz('America/Chicago').format('MM/DD/YYYY');

        return date;
      }
      const date = moment(item).tz('America/Chicago').format('MM/DD/YYYY');
      return date;
    },
    checkFileType(file) {
      return file.substring(file.lastIndexOf('.') + 1);
    },
    allValid() {
      for (let i = 0; i < this.value.length; i++) {
        if (Number(this.lineItems[i].price.replace(/,/g, '')) > Number(this.getSupplierBid.lineItems[i].price)) {
          this.value[i].message = 'Suppliers can only lower the prices during the BidOut Phase!';
          this.value[i].status = false;
        }
      }
    },
    NumbersOnly(evt) {
      evt = (evt) || window.event;
      const charCode = (evt.which) ? evt.which : evt.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    addCommas(num) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d)\.?)/g, '');
    },
    removeNonNumeric(num) {
      if (num !== '') {
        num = num.toString().replace(/[^\d.]/g, '');
      }
      return num;
    },
    validatePrice(event, index) {
      if (!isNaN(event) && this.lineItems[index].bid) {
        this.lineItems[index].price = this.addCommas(this.removeNonNumeric(event));
      }
      if (this.isBidSubmitted && this.isBidOut) {
        const itemPrice = event.replace(/,/g, '');
        if (Number(this.getSupplierBid.lineItems[index].price) < Number(this.removeNonNumeric(itemPrice))) {
          this.value[index].message = 'Suppliers can only lower the prices during the BidOut Phase!';
          this.value[index].status = false;
        } else {
          this.value[index].message = '';
          this.value[index].status = true;
        }
      }
    },
    formatNumber(index) {
      if (this.lineItems[index].price || this.lineItems[index].price === 0) {
        const formatValue = `${Number(`${Math.round(`${this.removeNonNumeric(this.lineItems[index].price)}e${2}`)}e-${2}`).toFixed(2)}`;

        const afterFormat = formatValue.replace(/\d(?=(\d{3})+\.)/g, '$&,');
        this.lineItems[index].price = afterFormat === 'NaN' ? '' : afterFormat;
      } else {
        this.lineItems[index].price = '';
      }
    },
    isValidForTheSame() {
      let counter = 0;
      for (let i = 0; i < this.value.length; i++) {
        if (Number(this.lineItems[i].price.replace(/,/g, '')) === Number(this.getSupplierBid.lineItems[i].price)) {
          counter++;
        }
      }

      if (counter === this.value.length) {
        return false;
      }
      return true;
    },
    async submit(action) {
      if (action === 'edit' && this.isBidOut) {
        this.allValid();
        if (!this.isValid) {
          this.$store.commit('setLoweringPriceAlert', '   Suppliers can only lower the prices during the BidOut Phase!');
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }

        if (!this.isValidForTheSame()) {
          this.$store.commit('setLoweringPriceAlert', 'Suppliers need to decrease at least one line item!');
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
      }

      if (action === 'submit' && this.$refs.form.validate()) {
        this.loading = true;
        this.lineItems.map((item) => {
          if (item.price !== null) {
            item.price = item.price.replace(/,/g, '');
          } else {
            item.price = '';
          }
          return item;
        });
        const lineItemsA = this.lineItems;
        const answersA = this.answers;

        await this.submitBid({
          userId: this.user._id,
          companyId: this.user.company._id,
          bidId: this.bidDetail.bidData._id,
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
        this.lineItems.map((item) => {
          if (item.price !== null) {
            item.price = item.price.replace(/,/g, '');
          } else {
            item.price = '';
          }
          return item;
        });
        const lineItemsA = this.lineItems;

        await this.editSubmitBid({
          userId: this.user._id,
          companyId: this.user.company._id,
          bidId: this.bidDetail.bidData._id,
          supplierNote: this.supplierNote,
          supplierAttachments: this.supplierDocList,
          lineItems: lineItemsA,
          answers: this.answers,
          submitBidId: this.getSupplierBid._id,
          serial: this.$route.params.serial,
        });

        this.loading = false;
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
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
        uploadedAt: new Date(),
        newAttach: true,
      });
      this.dialogT.push({
        open: false,
      });
    },

    deleteAttach() {
      this.$store.state.bid.supplierAttachment.splice(this.deletedFileI, 1);
      this.dialogT.splice(this.deletedFileI, 1);
    },
    removeQuesDoc() {
      this.answers[this.answerI].answer = null;
      this.answers.forEach((el, i) => {
        if (this.answerI === i && el.fileName) {
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
          id: bidData.lineItems[i]._id,
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
          questionId: bidData.questions[i]._id,
          answer: null,
          category: bidData.questions[i].type,
        });
      }
    },
    initializeForEdit() {
      const { bidData } = this.bidDetail;

      let updatePrice;
      for (let i = 0; i < bidData.lineItems.length; i++) {
        if (this.getSupplierBid.lineItems[i].price === 'NO_BID') {
          updatePrice = this.getSupplierBid.lineItems[i].price;
        } else {
          updatePrice = this.getSupplierBid.lineItems[i].price || this.getSupplierBid.lineItems[i].price === 0 ? parseFloat(this.removeNonNumeric(this.getSupplierBid.lineItems[i].price.toString())).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '';
        }
        this.lineItems.push({
          price: updatePrice,
          bid: this.getSupplierBid.lineItems[i].price !== 'NO_BID',
          id: this.getSupplierBid.lineItems[i]._id,
          quantity: this.getSupplierBid.lineItems[i].quantity,
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
          uploadedAt: this.getSupplierBid.supplierAttachments[i].uploadedAt,
        });

        this.dialogT.push({
          open: false,
        });
      }

      this.supplierNote = this.getSupplierBid.supplierNote;

      for (let i = 0; i < bidData.questions.length; i++) {
        const selectId = bidData.questions[i].oldId ? bidData.questions[i].oldId : bidData.questions[i]._id;
        if (this.getSupplierBid.answers[i].questionId === bidData.questions[i]._id || this.getSupplierBid.answers[i].questionId === selectId) {
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
            questionId: selectId,
            answer: null,
            category: bidData.questions[i].type,
          });
        }
      }
    },
    downloadTemplate() {
      const header = ['Line Item Description', 'Unit of measure', 'Price', 'Input type', 'QTY', 'Required', 'Buyer Comments'];

      const dataD = [];

      this.bidDetail.bidData.lineItems.forEach((el, index) => {
        dataD.push([el.description]);
        dataD[index].push([el.unit]);
        dataD[index].push([]);

        dataD[index].push([el.inputType]);
        dataD[index].push([el.quantity]);
        dataD[index].push([el.required === true ? 'Yes' : 'No']);
        dataD[index].push([el.buyerComment]);
      });

      dataD.unshift(header);

      const data = XLSX.utils.aoa_to_sheet(dataD);

      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, data, 'data');

      XLSX.writeFile(wb, `${this.bidDetail.bidData.title}'s Price template.xlsx`);
    },
    importPrice(event) {
      const file = event.target.files ? event.target.files[0] : null;

      if (file) {
        const reader = new FileReader();

        reader.onload = (e) => {
          const bstr = e.target.result;
          const wb = XLSX.read(bstr, { type: 'binary' });
          const wsName = wb.SheetNames[0];
          const ws = wb.Sheets[wsName];
          const data = XLSX.utils.sheet_to_json(ws, { header: 0, skipHeader: true });

          if (data.length === this.bidDetail.bidData.lineItems.length) {
            this.lineItems = [];
            this.value = [];

            for (let i = 0; i < data.length; i++) {
              this.lineItems.push({
                price: data[i].Price || data[i].Price === 0 ? parseFloat(this.removeNonNumeric(data[i].Price.toString())).toLocaleString(undefined, {
                  minimumFractionDigits: 2, maximumFractionDigits: 2,
                }) === 'NaN' ? '' : parseFloat(this.removeNonNumeric(data[i].Price.toString())).toLocaleString(undefined, {
                  minimumFractionDigits: 2, maximumFractionDigits: 2,
                }) : '',
                bid: data[i].Price !== 'NO_BID',
                id: this.bidDetail.bidData.lineItems[i]._id,
                quantity: this.bidDetail.bidData.lineItems[i].quantity,
                required: this.bidDetail.bidData.lineItems[i].required,
              });

              this.value.push({
                message: '',
                status: true,
              });
            }

            if (this.isBidOut) {
              this.allValid();
              this.isValidForTheSame();
            }
          } else {
            this.$toasted.show('The format of the Excel import must remain the same except for the price inputs!', {
              class: 'error-toast',
              type: 'error',
              duration: 7000,
              position: 'top-center',
            });
          }
        };

        reader.readAsBinaryString(file);
      }

      event.target.value = '';
    },

  },
  mounted() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },
  created() {
    if (this.isBidSubmitted) {
      this.initializeForEdit();
    } else {
      this.initializeForNew();
    }

    this.user = this.$store.getters.userInfo;
  },
};
</script>
