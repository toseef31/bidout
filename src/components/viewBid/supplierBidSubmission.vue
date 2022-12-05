<template>
  <v-col class="my-7 pa-0 bid-submission-tab" align="start">
{{getLineItems}}
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
                hideDetails
                type="number"
                v-if="lineItems[index]['bid']"
                v-model="lineItems[index]['price']"

          ></v-text-field>
          <div v-else  class="no-bid d-flex align-center">No bids</div>
          </div>
          <div>
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
                        v-model="checkbox"
                        hideDetails
                    ></v-checkbox>

                    <v-radio-group
                       v-model="intent"
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
                    ></v-text-field>
                    <v-textarea
                        v-if="item.questionType === 'textarea'"
                        hideDetails
                        outlined
                        auto-grow
                        rows="3"
                        row-height="25"
                    ></v-textarea>

                    <div class="upload-attach" v-if="item.questionType === 'uploadFile'">
                    <label
                      for="uploadFile"
                      class="
                        upload-file
                       pa-4
                        d-block
                        font-weight-medium
                        text-center
                      "
                    >
                      <v-file-input
                        label="File input"
                        filled
                        color="#fff"
                        id="uploadFile"
                      ></v-file-input>
                      <v-icon class="mr-4">mdi-cloud-upload-outline</v-icon>Upload here
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
                    <div class="upload-attach">
                    <v-progress-circular
                        v-if="isAttachingDoc"
                        :width="3"
                        color="green"
                        indeterminate
                    ></v-progress-circular>
                    <label
                        v-else
                        for="uploadFile"
                        class="upload-file pa-6 d-block font-weight-medium text-center"
                    >
                        <input
                        type="file"
                        ref="documentUploader"
                        class="d-none"
                        id="uploadFile"
                        @change="handleDocumentUpload($event)"
                        />

                        <span class="text-decoration-underline">Upload Attachments Here</span>
                    </label>
                    </div>
                </v-col>
           </v-row>

           <div
          class="attachment-list-style pt-6"
          v-if="
            bidDetail.bidData &&
            bidDetail.bidData.attachments &&
            bidDetail.bidData.attachments.length
          "
        >
          <v-simple-table fixed-header>
            <template v-slot:default>

              <tbody>
                <tr
                  v-for="(doc, index) in bidDetail.bidData.attachments"
                  :key="index"
                >
                  <td class="text-left">
                    <img :src="require('@/assets/images/bids/FilePdf.png')" />
                  </td>
                  <td class="text-left"><a :href="doc.url" target="_blank" class="text-decoration-none">{{ doc.fileName }}</a></td>
                  <td class="text-left">
                    <span>{{ doc.comment }}</span>
                  </td>
                  <td class="text-left">{{ size(doc.fileSize) }} </td>
                  <td class="text-left">{{ doc.uploadedBy }}</td>
                  <td class="text-left">
                    {{ doc.uploadedAt | moment("MM/DD/YYYY") }}
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

      <div class="text-center mt-3">
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
  </v-col>
</template>

<script>
import moment from 'moment-timezone';
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      lineItems: [],
      checkbox: false,
      bid: true,
      intent: 'true',
      isAttaching: false,
      loading: false,
      supplierNote: '',
      file: '',
      fileName: '',
      fileExt: '',
      fileSize: '',
      supplierAttachment: [],
    };
  },
  computed: {
    bidDetail() {
      return this.$store.getters.bidViewData;
    },
    getLineItems() {
      console.log(this.lineItems);
      return this.lineItems;
    },
    isAttachingDoc() {
      return this.isAttaching;
    },
    // bidsSubmitted() {
    //   const sBid = this.$store.getters.submittedBid;
    //   console.log(sBid);

    //   for (let i = 0; i < sBid.length; i++) {
    //     this.listItem[i] = {
    //       ...JSON.parse(sBid[i].lineItems),
    //       name: sBid[i].company.company,
    //       companyId: sBid[i].companyId,
    //     };
    //     this.header[i + 1] = sBid[i].company.company;
    //   }

    //   console.log(this.header);

    //   return this.$store.getters.submittedBid;
    // },
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
  },
  methods: {
    ...mapActions(['submitBid', 'uploadBidSupplier']),
    size(size) {
      const sizeInMB = (size / (1024 * 1024)).toFixed(2);
      return `${sizeInMB}mb`;
    },
    priceUpdate($event, index) {
      console.log(index);
      console.log($event);
      this.$set(this.lineItem, this.lineItem[index].price, $event);
      // this.lineItem[index] = {
      //     price: $event,
      //   };
    },
    async submit() {

    },
    async handleDocumentUpload(event) {
      this.isAttaching = true;
      this.file = event.target.files[0];
      this.fileName = this.file.name;
      this.fileExt = this.fileName.split('.').pop();
      this.fileSize = (this.file.size / (1024 * 1024)).toFixed(2);

      this.supplierAttachment.push(this.file);

      const data = {
        uploadedBy: `${this.$store.getters.userInfo.firstName} ${this.$store.getters.userInfo.lastName}`,
        attachment: this.supplierAttachment,
      };

      await this.uploadBidSupplier(data);
      this.isAttaching = false;
    },
    deleteAttach(index) {
      console.log(index);
      this.supplierAttachment.splice(index, 1);
      this.$store.getters.supplierAttachment.splice(index, 1);
    },
    noBidUpdate(index) {
      this.lineItems[index].price = 'NO_BID';
      this.lineItems[index].bid = false;
    },
    yesBidUpdate(index) {
      this.lineItems[index].price = '';
      this.lineItems[index].bid = true;
    },
    initializeD() {
      for (let i = 0; i < this.bidDetail.bidData.lineItems.length; i++) {
        this.lineItems.push({
          price: 0,
          bid: true,
        });
      }
    },
  },
  mounted() {
    if (this.$store.getters.supplierAttachment) {
      this.supplierAttachment = this.$store.getters.supplierAttachment;
    }
  },
  created() {
    this.initializeD();
  },
};
</script>
