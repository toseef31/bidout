<template>
  <v-col class="px-5 py-8">
    <v-card
      class="fill-height main-card"
      :elevation="0"
      style="border: 1px solid #b8b8b8"
    >
      <v-row class="px-5 my-5 row-title" no-gutters justify="space-between">
        <v-col>
          <div class="pa-1 text-left text--primary">
            <div
              class="font-weight-bold text--primary"
              style="font-family: 'Mulish', sans-serif; font-size: 20px"
            >
              Annual Chemical Bid
            </div>

            <div class="detail">
              <div>Bid: #10523</div>
              <div>Due Date/Time: 08/29/2022 @ 12:00pm CST</div>
              <div>Created by: Tyler Cherry</div>
              <div>Bid Type: RFP</div>
            </div>
          </div>
        </v-col>

        <v-col>
          <v-sheet
            class="py-2 px-4"
            rounded="lg"
            height="101"
            width="244"
            style="background-color: rgba(13, 150, 72, 0.1)"
          >
            <div class="status">Status: Receiving Bids</div>

            <div class="time pt-2">
              <v-icon small> mdi-timer-outline</v-icon> 3 days, 2 hours, 54 min,
              18 sec remaining
            </div>

            <v-divider color="#0D9648"></v-divider>
            <div class="bid-number">3 Bids Received</div>
          </v-sheet>
        </v-col>

        <v-col cols="auto">
          <v-sheet
            class="pa-2 setting"
            style="background-color: rgba(13, 150, 72, 0.1)"
          >
            <v-icon color="#0D9648"> mdi-cog-outline</v-icon>
          </v-sheet>
        </v-col>
      </v-row>
      <div class="bidDetailtabs-section mt-7">
        <v-tabs
          v-model="currentItem"
          class="bids-tabs"
          fixed-tabs
          hide-slider
          :mobile-breakpoint="767"
        >
          <v-tab
            v-for="item in tabs"
            :key="item.value"
            :href="'#tab-' + item.value"
            class="text-capitalize black--text font-weight-bold"
          >
            <v-badge
              v-if="item.value === 3 || item.value === 5"
              color="#0D9648"
              content="6"
              inline
              tile
            >
              {{ item.text }}
            </v-badge>
            <div v-else>{{ item.text }}</div>
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="currentItem">
          <v-tab-item value="tab-1">
            <BidDetailTab @changetab="ChangeT($event)"></BidDetailTab>
          </v-tab-item>
          <v-tab-item value="tab-2">
            <BidSubmission @changetab="ChangeT($event)"></BidSubmission>
          </v-tab-item>
          <v-tab-item value="tab-3">
            <BidChat @changetab="ChangeT($event)"></BidChat>
          </v-tab-item>
          <v-tab-item value="tab-4">
            <BidBroadcast @changetab="ChangeT($event)"></BidBroadcast>
          </v-tab-item>
          <v-tab-item value="tab-5" class="mt-5">
            <BidQandA @changetab="ChangeT($event)"></BidQandA>
          </v-tab-item>
          <v-tab-item value="tab-6" class="mt-5"
            ><BidAuditTrail @changetab="ChangeT($event)"></BidAuditTrail>
          </v-tab-item>
        </v-tabs-items>
      </div>
    </v-card>
  </v-col>
</template>

<script>
import BidDetailTab from "@/components/viewBid/bidDetailTab.vue";
import BidBroadcast from "@/components/viewBid/bidBroadcast.vue";
import TeamMembers from "@/components/BidTabs/TeamMembers.vue";
import BidQandA from "@/components/viewBid/bidQandA.vue";
import BidChat from "@/components/viewBid/bidChat.vue";
import BidSubmission from "@/components/viewBid/bidDetailTab.vue";
import BidAuditTrail from "@/components/viewBid/bidAuditTrail.vue";

export default {
  name: "BidDetail",
  components: {
    BidDetailTab,
    BidBroadcast,
    TeamMembers,
    BidQandA,
    BidChat,
    BidSubmission,
    BidAuditTrail,
  },
  data() {
    return {
      currentItem: "tab-1",
      validate: "",
      value: "",
      tabs: [
        {
          text: "Bid Detail",
          value: 1,
        },
        {
          text: "Bid Submissions",
          value: 2,
        },
        {
          text: "Bid Chat",
          value: 3,
        },
        {
          text: "Bid Broadcast",
          value: 4,
        },
        {
          text: "Q&A",
          value: 5,
        },
        {
          text: "Audit Trail",
          value: 6,
        },
      ],
    };
  },
  methods: {
    ChangeT(tab) {
      this.currentItem = tab;
    },
  },

  mounted() {
    document.title = "Bid Detail - BidOut";
    this.users = JSON.parse(localStorage.getItem("userData")).user;
  },
};
</script>

<style lang="scss"></style>
