<template>
  <v-col class="mt-7 bid-detail-supplier pa-0 mb-5" align="start">
    <div class="bid-row pb-5">
      <div class="px-5">
        <div class="title-detail">Bid Details</div>
        <br />

        <v-row class="mt-1">
          <v-col md="2" class="text-right mr-1 title-desc">Bid Title:</v-col>
          <v-col class="title-brief">{{ bidDetail.bidData.title }}</v-col>
        </v-row>

        <v-row>
          <v-col md="2" class="text-right mr-1 title-desc">Bid Type:</v-col>
          <v-col class="title-brief">{{ bidDetail.bidData.type }}</v-col>
        </v-row>

        <v-row>
          <v-col md="2" class="text-right mr-1 title-desc">Due Date/Time:</v-col>
          <v-col class="title-brief">
            <template v-if="bidDetail.bidData.type === 'BidOut Process'">
              <template v-if="bidDetail.bidout">
                {{ formatDate(bidDetail.bidData.dueDate) }} @
                {{ bidDetail.bidData.dueTime }} CST
              </template>
              <template v-else>
                {{ formatBidOutStartDate(bidDetail.bidData.dueDate, bidDetail.bidData.dueTime) }} CST
              </template>
            </template>
            <template v-else>
              {{ formatDate(bidDetail.bidData.dueDate) }} @
                {{ bidDetail.bidData.dueTime }} CST
            </template>
            </v-col>

        </v-row>

        <v-row>
          <v-col md="2" class="text-right mr-1 title-desc">Region:</v-col>
          <v-col class="title-brief">{{ bidDetail.bidData.regions }}</v-col>
        </v-row>

        <v-row>
          <v-col md="2" class="text-right mr-1 title-desc">Q&A:</v-col>
          <v-col class="title-brief">{{ bidDetail.bidData.qAndAEnabled === 'true' ? "Yes" : "No" }}</v-col>
        </v-row>
        <br />
        <v-row>
          <v-col md="2" class="text-right mr-1 title-desc">Description:</v-col>
          <v-col class="title-brief bid-desc supplier-desc"> 
            <div class="ql-editor pa-0" v-html="bidDetail.bidData.bidDescriptions &&
            Array.isArray(bidDetail.bidData.bidDescriptions)
            ? bidDetail.bidData.bidDescriptions[0].body
            : bidDetail.bidData.bidDescriptions"></div>
          </v-col>
        </v-row>
        <br />
        <v-row
          v-if="bidDetail.bidData && bidDetail.bidData.bidDescriptions && Array.isArray(bidDetail.bidData.bidDescriptions)"
          v-for="(item, index) in bidDetail.bidData.bidDescriptions.slice(1)" :key="index">
          <v-col md="2" class="text-right mr-1 title-desc">{{ item && item.name }}:</v-col>
          <v-col class="title-brief bid-desc supplier-desc"> 
            <div class="ql-editor pa-0" v-html="item && item.body"></div>
          </v-col>
        </v-row>

      </div>
    </div>

    <div class="px-5 pt-8 pb-10 bid-row-2">
      <div class="title-detail">Buyer Team member</div>
      <div class="mt-10 d-flex flex-row flex-wrap team-member">
        <div class="d-flex align-center flex-child">
          <v-img v-if="bidDetail.bidData.userId.image" max-width="100" height="auto" contain :aspect-ratio="16 / 9"
            :src="bidDetail.bidData.userId.image"></v-img>
          <v-avatar v-else color="#0d96481a" size="62">
            <v-icon color="#0d9648" large>mdi-account-outline </v-icon>
          </v-avatar>

          <div class="d-flex flex-column">
            <div>
              <span class="text--black pl-6  bid-creator">{{ bidDetail.bidData.userId.firstName }} {{
                bidDetail.bidData.userId.lastName
              }}</span>
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon size="20" v-bind="attrs" v-on="on" class="ml-2">mdi-help-circle-outline
                  </v-icon>
                </template>
                <span>Please use the Q&A tab for
                  any question.</span>
              </v-tooltip>
            </div>
            <span class="bid-creator-title mt-1 pl-6">Bid Creator</span>
          </div>
        </div>

        <div v-if="
          bidDetail.bidData &&
          bidDetail.bidData.invitedTeamMembers &&
          bidDetail.bidData.invitedTeamMembers.length > 0
        " v-for="(item, index) in bidDetail.bidData.invitedTeamMembers" :key="index"
          class="d-flex align-center flex-child">
          <v-img v-if="item.image" max-width="100" height="auto" contain :aspect-ratio="16 / 9" :src="item.image"></v-img>
          <v-avatar v-else color="#0d96481a" size="62">
            <v-icon color="#0d9648" large>mdi-account-outline </v-icon>
          </v-avatar>

          <div class="d-flex flex-column">
            <div>
              <span class="text--black pl-4 bid-creator">{{ item && item.firstName }} {{ item && item.lastName }}</span>
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon size="20" v-bind="attrs" v-on="on" class="ml-2">mdi-help-circle-outline
                  </v-icon>
                </template>
                <span>Please use the Q&A tab for
                  any question.</span>
              </v-tooltip>
            </div>
          </div>

        </div>
      </div>

    </div>

    <div class="pt-8 pb-10 bid-row-2">
      <div class="title-detail px-6">Line items</div>

      <v-simple-table class="template-table-style mt-8" v-if="
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
              <th class="text-left">Buyer Comment</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in bidDetail.bidData.lineItems" :key="index">
              <td class="text-left">{{ item.description }}</td>
              <td class="text-left">{{ item.unit }}</td>
              <td class="text-left">{{ item.inputType }}</td>
              <td class="text-left">{{ item.quantity }}</td>
              <td class="text-left">
                {{ item.buyerComment === 'undefined' || item.buyerComment === '' ? '' : item.buyerComment }}
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>

      <div v-else class="no-data">None</div>
    </div>

    <div class="py-8 bid-row-2">
      <div class="title-detail px-6">Attachments</div>
      <div class="attachment-list-style" v-if="
        bidDetail.bidData &&
        bidDetail.bidData.attachments &&
        bidDetail.bidData.attachments.length
      ">
        <v-simple-table fixed-header>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left"></th>
                <th class="text-left">File Name</th>
                <th class="text-left" width="250">Comment</th>
                <th class="text-left" width="110">File Size</th>
                <th class="text-left" width="150">Uploaded By</th>
                <th class="text-left" width="150">Uploaded Date</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(doc, index) in bidDetail.bidData.attachments" :key="index">
                <td class="text-left">
                  <img :src="require('@/assets/images/bids/FilePdf.png')" v-if="checkFileType(doc.fileName) === 'pdf'" />
                  <img :src="require('@/assets/images/bids/FileDoc.png')"
                    v-else-if="checkFileType(doc.fileName) === 'docx'" />
                  <v-icon color="#0D1139" v-else>mdi-file-document</v-icon>
                </td>
                <td class="text-left doc-class"><a :href="doc.url" target="_blank" class="text-decoration-none">{{
                  doc.fileName
                }}</a></td>
                <td class="text-left text-truncate comment-class">
                  <span>{{ doc.comment !== 'undefined' ? doc.comment : '' }}</span>
                </td>
                <td class="text-left">{{ size(doc.fileSize) }}</td>
                <td class="text-left">{{ doc.uploadedBy }}</td>
                <td class="text-left">
                  {{ doc.uploadedAt | moment("MM/DD/YYYY") }}
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </div>

      <div v-else class="no-data">None</div>
    </div>

    <div class="pt-8 bid-row-3 pb-2">
      <div class="question-section-title">
        <span class="title-detail px-6">Buyer Questions</span>
      </div>
      <div class="question-sub-section" v-if="bidDetail.bidData.questions && bidDetail.bidData.questions.length">

        <div v-for="(item, index) in bidDetail.bidData.questions" :key="index">
          <v-divider color="#F1F1F1" v-if="item.type === 'category'"></v-divider>
          <div class="sub-section-title px-6 " v-if="item.type === 'category'">{{ item.title }}</div>

          <v-row class="mx-10 px-3 operational-ques py-1 my-2 " justify="space-between" align="center"
            v-if="item.type === 'question'">

            <v-col md="6" class="first-child" v-if="item.type === 'question'">{{
              item.title
            }}</v-col>
            <div class="second-child ml-auto" v-if="item.required === 'true'">Required Question</div>

          </v-row>
        </div>
      </div>
      <div v-else class="no-data py-4">No questions are currently configured on this bid.</div>
    </div>

  </v-col>
</template>

<script>
import moment from 'moment-timezone';

export default {
  methods: {
    size(size) {
      const sizeInMB = (size / (1024 * 1024)).toFixed(2);
      return `${sizeInMB}mb`;
    },
    formatDate(dueDate) {
      return dueDate !== '' && dueDate !== null ? moment.tz(dueDate, 'America/Chicago').format('MM/DD/YYYY') : '';
    },
    checkFileType(file) {
      return file.substring(file.lastIndexOf('.') + 1);
    },
    formatBidOutStartDate(item, item2) {
      const momentTime = moment(item2, ['h:mm:ss A ']).format('HH:mm:ss');

      const stringDate = `${item}T${momentTime}`;

      let momentDueDate = moment.tz(stringDate, 'America/Chicago');

      momentDueDate = momentDueDate.subtract(4, 'hours');

      return moment.tz(momentDueDate, 'America/Chicago').format('MM/DD/YYYY @ ha');
    },
  },
  computed: {
    bidDetail() {
      return this.$store.getters.bidViewData;
    },
  },
  mounted() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },
};
</script>
