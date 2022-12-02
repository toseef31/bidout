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
            {{ bidDetail.bidData.dueTime }}
          </div>
          <div><span>Region:</span> {{ bidDetail.bidData.regions }}</div>
          <div>
            <span>Q&A:</span>
            {{ bidDetail.bidData.qAndAEnabled ? "Yes" : "No" }}
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
            width="60px"
            height="auto"
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
            <span>View 0 Times</span>
            </v-tooltip>
             </v-col>
            <v-col class="mr-2">

            <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-icon v-bind="attrs"
          v-on="on">mdi-circle-outline</v-icon>
            </template>
            <span>No intent to bid</span>
            </v-tooltip>

            </v-col>
            <v-col>
            <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-icon v-bind="attrs"
          v-on="on">mdi-circle-outline</v-icon>
            </template>
            <span>Bid Submissions</span>
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
        v-if="
          bidDetail.bidData &&
          bidDetail.bidData.invitedTeamMembers &&
          bidDetail.bidData.invitedTeamMembers.length > 0
        "
      >
        <div
          v-for="(item, index) in bidDetail.bidData.invitedTeamMembers"
          :key="index"
          class="d-flex align-center flex-child"
        >
          <v-img
            v-if="item.image"
            width="48px"
            height="48px"
            :aspect-ratio="3/2"
            :src="item.image"
          ></v-img>
          <v-avatar v-else color="#0d96481a" size="62">
            <v-icon color="#0d9648" large>mdi-account-outline </v-icon>
          </v-avatar>
          <span class="text--black px-4 bid-creator"
            >{{ item && item.firstName }} {{ item && item.lastName }}</span
          >
          <span
            class="bid-creator-title"
            v-if="
              bidDetail.bidData.userId.firstName === item.firstName &&
              bidDetail.bidData.userId.lastName === item.lastName
            "
            >Bid Creator</span
          >
        </div>
      </div>

      <div v-else class="no-data">None</div>
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
                <th class="text-left">Comment</th>
                <th class="text-left">File Size</th>
                <th class="text-left">Uploaded By</th>
                <th class="text-left">Uploaded Date</th>
              </tr>
            </thead>
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
        v-if="bidDetail.bidData.questions && bidDetail.bidData.questions.length"
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
                <div class="second-child ml-auto"  >Required Question</div>

              </v-row>
            </div>
      </div>
       <div v-else class="no-data py-5">None</div>
    </div>
  </v-col>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      users: '',
    };
  },
  methods: {
    ...mapActions(['getBidBySerial']),
    size(size) {
      const sizeInMB = (size / (1024 * 1024)).toFixed(2);
      return `${sizeInMB}mb`;
    },
  },
  computed: {
    bidDetail() {
      return this.$store.getters.bidViewData;
    },
  },
  mounted() {},
};
</script>
