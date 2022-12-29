<template>
  <v-col class="my-7 bid-detail-tab pa-0" align="start">
    <div class="bid-row pb-5">
      <div class="px-5">
        <div class="title-detail">Bid Details</div>
        <br />

        <div class="title-desc">
          <div><span>Bid Title:</span> {{ bidDetail.bidData.title }}</div>
          <div><span>Bid Type:</span> {{ bidDetail.bidData.type }}</div>
          <div>
            <span>Due Date/Time:</span> {{ bidDetail.bidData.dueDate | moment('MM/DD/YYYY') }} @
            {{ bidDetail.bidData.dueTime }} CST
          </div>
          <div><span>Region:</span> {{ bidDetail.bidData.regions }}</div>
          <div>
            <span>Q&A:</span>
            {{ bidDetail.bidData.qAndAEnabled === 'true' ? "Yes" : "No" }}
          </div>
        </div>
        <br />

        <p class="bid-desc">
          <span>Description:</span>
          {{
            bidDetail.bidData.bidDescriptions &&
            Array.isArray(bidDetail.bidData.bidDescriptions)
              ? bidDetail.bidData.bidDescriptions[0].body
              : bidDetail.bidData.bidDescriptions
          }}
        </p>
        <br />

        <p
          class="bid-headline"
          v-if="bidDetail.bidData && bidDetail.bidData.bidDescriptions && Array.isArray(bidDetail.bidData.bidDescriptions)"
          v-for="(item, index) in bidDetail.bidData.bidDescriptions.slice(1)"
          :key="index"
        >
          <span>{{ item && item.name }}:</span> {{ item && item.body }}
          <br />
        </p>
      </div>
    </div>

    <div class="px-5 pt-8 bid-row-2">
      <div class="title-detail">Invited Suppliers</div>

 <div   v-if="
          bidDetail.bidData &&
          Array.isArray(bidDetail.bidData.invitedSuppliers) && bidDetail.bidData.invitedSuppliers.length
        ">
      <div
        class="d-flex bid-section-2"

        v-for="(item,i) in bidDetail.bidData.invitedSuppliers"
        :key="i"
      >
        <div class="d-flex align-center">
          <v-img
            v-if="item && item.image"
            width="60"
            height="auto"
            contain
            :aspect-ratio="16/9"
            :src="item && item.image"
          ></v-img>
          <v-icon size="42" v-else >mdi-domain</v-icon>
          <div class="ml-5">
            <div class="font-weight-bold">{{ item && item.company }}</div>
            <router-link :to="item.slug ? '/company/' + item.slug: ''" class="text-decoration-underline text-body-2"
              >View profile</router-link
            >
          </div>
        </div>

        <div class="invitedS-sec">
          <v-row>
            <v-col class="mr-2">
            <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-badge color="#0D9648" dot overlap  >
                <v-icon v-bind="attrs"
          v-on="on">mdi-domain</v-icon>
              </v-badge>
            </template>
            <span>Active</span>
            </v-tooltip>
            </v-col>
            <v-col class="mr-2">
              <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-icon v-bind="attrs"
          v-on="on">mdi-eye-outline</v-icon>
            </template>
            <span>Viewed {{ getBidViewNumber(item.id)}} Times</span>
            </v-tooltip>
             </v-col>
            <v-col class="mr-2">

            <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
                  <v-icon v-bind="attrs"
              v-on="on" v-if="getCompanyIntend(item.id) === 'not-intended'" color="#F32349">mdi-close-circle-outline</v-icon>
              <v-icon v-bind="attrs"
              v-on="on" v-if="getCompanyIntend(item.id) === 'intended'" color="#0D9648">mdi-check-circle-outline</v-icon>
              <v-icon v-bind="attrs"
              v-on="on" v-if="getCompanyIntend(item.id) === 'neither'">mdi-circle-outline</v-icon>
            </template>

                <span v-if="getCompanyIntend(item.id) === 'not-intended'">{{item && item.company}} does not intend to submit a bid</span>
                <span v-if="getCompanyIntend(item.id) === 'intended'">{{item && item.company}} does intend to submit a bid</span>
                <span v-if="getCompanyIntend(item.id) === 'neither'">{{item && item.company}} has not indicated if they intend to submit a bid</span>

            </v-tooltip>

            </v-col>
            <v-col>
            <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-icon v-bind="attrs"
          v-on="on" v-if="getSubmissionStatus(item.id) === 'not-sent' && getCompanyIntend(item.id) !== 'not-intended'">mdi-circle-outline</v-icon>
              <img :src="require('@/assets/images/bids/bidSubmitted.svg')" v-if="getSubmissionStatus(item.id) === 'sent' && getCompanyIntend(item.id) !== 'not-intended'" width="60" height="24" v-bind="attrs"
          v-on="on"/>
              <v-icon v-bind="attrs"
              v-on="on" v-if="getCompanyIntend(item.id) === 'not-intended'" color="#F32349">mdi-close-circle-outline</v-icon>
            </template>
            <span v-if="getSubmissionStatus(item.id) === 'sent' && getCompanyIntend(item.id) !== 'not-intended'">{{item && item.company}} has sent Bid Submissions</span>
            <span v-if="getSubmissionStatus(item.id) === 'not-sent' && getCompanyIntend(item.id) !== 'not-intended'">{{item && item.company}} has not sent Bid Submissions yet</span>
            <span v-if="getCompanyIntend(item.id) === 'not-intended'">{{item && item.company}} doesn't want to sent Bid Submissions</span>
            </v-tooltip>
             </v-col>
          </v-row>
        </div>
      </div>

    </div>
    <div v-else class="no-data pt-3 pb-6">None</div>
    </div>

    <div class="px-5 pt-8 pb-10 bid-row-2">
      <div class="title-detail">Team member</div>
      <div
        class="mt-10 d-flex flex-row flex-wrap team-member"

      >

      <div
          class="d-flex align-center flex-child"
        >
          <v-img
            v-if="bidDetail.bidData.userId.image"
            max-width="100"
            height="auto"
            contain
            :aspect-ratio="16/9"
            :src="bidDetail.bidData.userId.image"
          ></v-img>
          <v-avatar v-else color="#0d96481a" size="62">
            <v-icon color="#0d9648" large>mdi-account-outline </v-icon>
          </v-avatar>
          <span class="text--black px-4  bid-creator"
            >{{ bidDetail.bidData.userId.firstName }} {{ bidDetail.bidData.userId.lastName }}</span
          >
          <span
            class="bid-creator-title"
            >Bid Creator</span
          >
        </div>

        <div
        v-if="
          bidDetail.bidData &&
          bidDetail.bidData.invitedTeamMembers &&
          bidDetail.bidData.invitedTeamMembers.length > 0
        "
          v-for="(item, index) in bidDetail.bidData.invitedTeamMembers"
          :key="index"
          class="d-flex align-center flex-child"
        >
          <v-img
            v-if="item.image"
            max-width="100"
            height="auto"
            contain
            :aspect-ratio="16/9"
            :src="item.image"
          ></v-img>
          <v-avatar v-else color="#0d96481a" size="62">
            <v-icon color="#0d9648" large>mdi-account-outline </v-icon>
          </v-avatar>
          <span class="text--black px-4 bid-creator"
            >{{ item && item.firstName }} {{ item && item.lastName }}</span
          >
        </div>
      </div>
    </div>

    <div class="pt-8 pb-10 bid-row-2">
      <div class="title-detail px-6">Line items</div>

      <v-simple-table
        class="template-table-style mt-8"
        v-if="
          bidDetail.bidData &&
          bidDetail.bidData.lineItems &&
          bidDetail.bidData.lineItems.length > 0
        "
      >
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
            <tr
              v-for="(item, index) in bidDetail.bidData.lineItems"
              :key="index"
            >
              <td class="text-left">{{ item.description }}</td>
              <td class="text-left">{{ item.unit }}</td>
              <td class="text-left">{{ item.inputType }}</td>
              <td class="text-left">{{ item.quantity }}</td>
              <td class="text-left">
                {{ item.buyerComment }}
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>

      <div v-else class="no-data">None</div>
    </div>

    <div class="py-8 bid-row-2">
      <div class="title-detail px-6">Attachments</div>
      <div
        class="attachment-list-style"
        v-if="
          bidDetail.bidData &&
          bidDetail.bidData.attachments &&
          bidDetail.bidData.attachments.length
        "
      >
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
              <tr
                v-for="(doc, index) in bidDetail.bidData.attachments"
                :key="index"
              >
                <td class="text-left ">
                  <img :src="require('@/assets/images/bids/FilePdf.png')" />
                </td>
                <td class="text-left doc-class "><a :href="doc.url" target="_blank" class="text-decoration-none">{{ doc.fileName }}</a></td>
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

    <div class="pt-8 bid-row-3">
      <div class="question-section-title">
        <span class="title-detail px-6">Bid Questions</span>
      </div>
 <div
        class="question-sub-section"
        v-if=" bidDetail.bidData && Array.isArray(bidDetail.bidData.questions) && bidDetail.bidData.questions.length"
      >

            <div v-for="(item, index) in bidDetail.bidData.questions"
                :key="index">
                <v-divider color="#F1F1F1" v-if="item.type === 'category'"></v-divider>
                 <div class="sub-section-title px-6 " v-if="item.type === 'category'">{{item.title}}</div>

              <v-row
                class="mx-10 px-3 operational-ques py-1 my-2 "
                justify="space-between"
                align="center"
                v-if="item.type=== 'question'"
              >

                <v-col md="6"  class="first-child" v-if="item.type=== 'question'">{{
                  item.title
                }}</v-col>

                <div class="second-child ml-auto" v-if="item.required === 'true'"  >Required Question</div>

              </v-row>
            </div>
      </div>
       <div v-else class="no-data py-5">No questions are currently configured on this bid.</div>
    </div>
  </v-col>
</template>

<script>

export default {
  data() {
    return {
      users: '',
    };
  },
  methods: {
    size(size) {
      const sizeInMB = (size / (1024 * 1024)).toFixed(2);
      return `${sizeInMB}mb`;
    },
    getBidViewNumber(id) {
      const { supplierViews } = this.bidDetail.bidData;
      let number = 0;

      if (supplierViews && id) {
        supplierViews.forEach((el) => {
          if (el.id === id) {
            number = el.views;
          }
        });
      }
      return number;
    },
    getCompanyIntend(id) {
      let result = 'neither';
      const intent = this.getBidAllIntend;

      if (intent && id) {
        intent.forEach((el) => {
          if (el.companyId === id && el.answer === 'true') {
            result = 'intended';
          }
          if (el.companyId === id && el.answer === 'false') {
            result = 'not-intended';
          }
        });
      }
      return result;
    },
    getSubmissionStatus(id) {
      let result = 'not-sent';

      const { supplierSubmissions } = this.bidDetail;

      if (supplierSubmissions.length) {
        supplierSubmissions.forEach((el) => {
          if (el.companyId === id) {
            result = 'sent';
          }
        });
      }

      return result;
    },
  },
  computed: {
    bidDetail() {
      return this.$store.getters.bidViewData;
    },
    getBidAllIntend() {
      return this.$store.getters.bidAllIntend;
    },
  },
};
</script>
