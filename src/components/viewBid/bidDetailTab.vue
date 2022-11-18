<template>
  <v-col class="my-7 bid-detail-tab pa-0" align="start">
    <div class="bid-row pb-5">
      <div class="px-5">
        <div class="title-detail">Bid Details</div>
        <br />

        <div class="title-desc">
          <p><span>Bid Title:</span> {{ bidDetail.bidData.title }}</p>
          <p><span>Bid Type:</span> {{ bidDetail.bidData.type }}</p>
          <p>
            <span>Due Date/Time:</span> {{ bidDetail.bidData.dueDate }} @
            {{ bidDetail.bidData.dueTime }}
          </p>
          <p><span>Region:</span> {{ bidDetail.bidData.regions }}</p>
          <p>
            <span>Q&A:</span>
            {{ bidDetail.bidData.qAndAEnabled ? "Yes" : "No" }}
          </p>
        </div>
        <br />

        <p class="bid-desc">
          <span>Description:</span>
          {{
            bidDetail.bidData.bidDescriptions &&
            Array.isArray(bidDetail.bidData.bidDescriptions)
              ? bidDetail.bidData.bidDescriptions[0].body
              : "None"
          }}
        </p>
        <br />

        <p
          class="bid-headline"
          v-if="bidDetail.bidData && bidDetail.bidData.bidDescriptions"
          v-for="(item, index) in bidDetail.bidData.bidDescriptions.slice(1)"
          :key="index"
        >
          <span>{{ item.name }}:</span> {{ item.body }}
          <br />
        </p>
      </div>
    </div>
    <div class="px-5 pt-8 bid-row-2">
      <div class="title-detail">Invited Suppliers</div>
      <div
        class="d-flex bid-section-2"
        v-if="
          bidDetail.bidData &&
          bidDetail.bidData.invitedSuppliers &&
          bidDetail.bidData.invitedSuppliers.length
        "
        v-for="item in bidDetail.bidData.invitedSuppliers"
      >
        <div class="d-flex align-center">
          <v-img
            v-if="item.image"
            width="88px"
            height="29px"
            :src="item.image"
          ></v-img>
          <v-icon v-else size="40">mdi-domain</v-icon>
          <div class="ml-5">
            <div class="font-weight-bold">{{ item.company }}</div>
            <a href="#" class="text-decoration-underline text-body-2"
              >View profile</a
            >
          </div>
        </div>
        <div class="ml-auto">
          <v-row>
            <v-col class="mr-2">
              <v-badge color="#0D9648" dot overlap>
                <v-icon>mdi-domain</v-icon>
              </v-badge>
            </v-col>
            <v-col class="mr-2"> <v-icon>mdi-eye-outline</v-icon></v-col>
            <v-col class="mr-2"> <v-icon>mdi-circle-outline</v-icon> </v-col>
            <v-col> <v-icon>mdi-circle-outline</v-icon> </v-col>
          </v-row>
        </div>
      </div>

      <div v-else class="attachment-none pt-3 pb-6">None</div>
    </div>

    <div class="px-5 pt-8 pb-14 bid-row-2">
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
          class="flex-child"
          v-for="(item, index) in bidDetail.bidData.invitedTeamMembers"
          :key="index"
        >
          <div v-if="item">
            <v-img
              v-if="item.image"
              width="48px"
              height="48px"
              :src="item.image"
            ></v-img>
            <v-avatar v-else color="#0d96481a" size="62">
              <v-icon color="#0d9648" large>mdi-account-outline </v-icon>
            </v-avatar>
            <span class="text--black px-4 bid-creator"
              >{{ item.firstName }} {{ item.lastName }}</span
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
          <div v-else class="attachment-none">None</div>
        </div>
      </div>

      <div v-else class="attachment-none">None</div>
    </div>

    <div class="pt-8 pb-14 bid-row-2">
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

      <div v-else class="attachment-none">None</div>
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
                <td class="text-left">{{ doc.fileName }}</td>
                <td class="text-left">
                  <span>{{ doc.comment }}</span>
                </td>
                <td class="text-left">{{ doc.fileSize }}</td>
                <td class="text-left">{{ doc.uploadedBy }}</td>
                <td class="text-left">
                  {{ doc.uploadedAt | moment("MM/DD/YYYY") }}
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </div>

      <div v-else class="attachment-none">None</div>
    </div>

    <div class="pt-8 bid-row-3">
      <div class="question-section-title">
        <span class="title-detail px-6">Big Questions</span>
      </div>
      <div
        class="question-sub-section"
        v-if="bidDetail.bidData.questions && bidDetail.bidData.questions.length"
      >
        <span class="sub-section-title px-6">Operational Questions</span>
        <v-row
          class="px-10 pt-6 operational-ques"
          justify="space-between"
          align="center"
          v-for="(item, index) in bidDetail.bidData.questions"
          :key="index"
        >
          <v-col md="6" offset-md="1" class="first-child">{{
            item.title
          }}</v-col>
          <div class="second-child" v-if="item.required">Required Question</div>
        </v-row>
      </div>
    </div>
  </v-col>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      users: "",
    };
  },
  methods: {
    ...mapActions(["getBidBySerial"]),
  },
  computed: {
    bidDetail() {
      return this.$store.getters.bidData;
    },
  },
  mounted() {},
};
</script>
