<template>
  <v-col class="pl-0 pr-3 pb-0 pt-3">
    <v-card
      class="fill-height main-card"
      :elevation="0"
      style="border: 1px solid #b8b8b8"
    >
      <v-row class="px-5 my-5 row-title" no-gutters>
        <v-col>
          <div class="pa-1 text-left text--primary">
            <div
              class="font-weight-bold text--primary"
              style="font-family: 'Mulish', sans-serif; font-size: 20px"
            >
              {{ bidDetail.bidData.title }}
            </div>

            <div class="detail">
              <div>
                Bid: <span class="serial">#{{ bidDetail.bidData.serial }}</span>
              </div>
              <div>
                Due Date/Time: {{ bidDetail.bidData.dueDate }} @
                {{ bidDetail.bidData.dueTime }}
              </div>
              <div>
                Created by: {{ bidDetail.bidData.userId.firstName }}
                {{ bidDetail.bidData.userId.lastName }}
              </div>
              <div>Bid Type: {{ bidDetail.bidData.type }}</div>
            </div>
          </div>
        </v-col>

        <v-col class="status-sec mx-auto">
          <v-sheet
            class="py-2 px-4"
            rounded="lg"
            height="101"
            width="244"
            :style="[
              !bidDetail.receivingBids && !bidDetail.bidout
                ? { 'background-color': '#FFF4DB' }
                : { 'background-color': 'rgba(13, 150, 72, 0.1)' },
            ]"
          >
            <div class="status" v-if="bidDetail.receivingBids">
              Status: Receiving Bids
            </div>
            <div class="status" v-else-if="bidDetail.bidout">
              Status: BidOut Phase
            </div>
            <div v-else class="award-status">Status: Award Phase</div>
            <div
              class="time pt-2"
              v-if="bidDetail.receivingBids || bidDetail.bidout"
            >
              <v-icon small> mdi-timer-outline</v-icon>
              {{ days }} days, {{ hours }} hours, {{ minutes }} min,
              {{ seconds }} sec remaining
            </div>

            <v-divider
              v-if="!bidDetail.receivingBids && !bidDetail.bidout"
              class="mt-3"
              color="#b489251c"
            ></v-divider>
            <v-divider v-else color="#0D9648"></v-divider>

            <div
              :class="[
                !bidDetail.receivingBids && !bidDetail.bidout
                  ? 'award-bid-number'
                  : 'bid-number',
              ]"
            >
              3 Bids Received
            </div>
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
import moment from "moment-timezone";
import { mapActions } from "vuex";

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
      users: "",
      actualTime: moment().format("X"),
      years: 0,
      months: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
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
    ...mapActions(["getBidBySerial"]),
    ChangeT(tab) {
      this.currentItem = tab;
    },
    addOneSecondToActualTimeEverySecond() {
      const component = this;
      component.actualTime = moment().format("X");
      setTimeout(() => {
        component.addOneSecondToActualTimeEverySecond();
      }, 1000);
    },
    getDiffInSeconds() {
      const bidDueDate = this.bidDetail.bidData.dueDate;
      const bidDueTime = this.bidDetail.bidData.dueTime;
      const momentTime = moment(bidDueTime, ["h:mm:ss A"]).format("HH:mm:ss");

      const stringDate = `${bidDueDate}T${momentTime}`;
      const momentDueDate = moment(stringDate);
      return moment(momentDueDate).format("X") - this.actualTime;
    },
    compute() {
      const duration = moment.duration(this.getDiffInSeconds(), "seconds");
      this.years = duration.years() > 0 ? duration.years() : 0;
      this.months = duration.months() > 0 ? duration.months() : 0;
      this.days = duration.days() > 0 ? duration.days() : 0;
      this.hours = duration.hours() > 0 ? duration.hours() : 0;
      this.minutes = duration.minutes() > 0 ? duration.minutes() : 0;
      this.seconds = duration.seconds() > 0 ? duration.seconds() : 0;
    },
  },
  computed: {
    bidDetail() {
      return this.$store.getters.bidData;
    },
  },
  mounted() {
    document.title = "Bid Detail - BidOut";
    this.users = this.$store.getters.userInfo;
    this.getBidBySerial({
      serial: this.$route.fullPath.split("/").pop(),
      id: this.users.id,
    });

    this.remainingTime;
  },
  created() {
    this.compute();
    this.addOneSecondToActualTimeEverySecond();
  },
  watch: {
    actualTime(val, oldVal) {
      this.compute();
    },
  },
};
</script>

<style lang="scss"></style>
