<template>
    <v-row fill-height align="center" class="bid-alert" v-if="getPageLoading || getViewBidError">
    <v-col cols="12">
      <v-progress-circular v-if="getPageLoading" :width="3" color="green" indeterminate ></v-progress-circular>
      <div class="alert-section" v-if="getViewBidError && !getPageLoading" >
             <div class="error-title mb-5">
              <h1 class="font-weight-bold">Opps!</h1>
              <h1 class="font-weight-medium">This page is not available.</h1>
             </div>

             <div class="btn-section mt-8 mb-16 pb-16">
              <a class="text-decoration-none" href="https://bidout.app"><v-btn
              large
              outlined
              color="#0D9647"
              height="52"
              class="mr-5 font-weight-bold text-capitalize"
              >Access Homepage</v-btn></a>
              <router-link to="/dashboard" class="text-decoration-none"><v-btn
              large
              outlined
              color="#0D9647"
              class="font-weight-bold text-capitalize"
              height="52"
              >Access Dashboard</v-btn></router-link>
             </div>
           </div>

    </v-col>
  </v-row>

  <v-col v-else  class="pl-0 pr-3 pb-0 pt-3 bid-detail-module  ">
    <v-alert type="error"  v-show="showErrorDeleteAlert" class="mx-5">
      Deleting this bid was failed. Please Try again!
    </v-alert>

    <v-card
      class="fill-height main-card"
      :elevation="0"
    >

      <v-row class="px-5 my-5 row-title" no-gutters>
        <v-col>
          <div class="pa-1 text-left text--primary">
            <div
              class="font-weight-bold text--primary bid-title"

            >
              {{ bidDetail.bidData.title }}
            </div>

            <div class="detail">
              <div>
                Bid: <span class="serial">#{{ bidDetail.bidData.serial }}</span>
              </div>
              <div>
                Due Date/Time: {{ bidDetail.bidData.dueDate | moment('MM/DD/YYYY') }} @
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
            class="py-2 px-4 bid-status-card text-left"
            rounded="lg"
            height="119"
            width="300"
            v-if="!isAfterDueDate"
          >
            <div class="status" v-if="bidDetail.receivingBids">
              Status: Receiving Bids
            </div>
            <div class="status" v-if="bidDetail.bidout">
              Status: BidOut Phase
            </div>
            <div class="status">Status: Receiving Bids</div>
            <div
              class="time pt-2 align-center"
            >
              <v-icon small color="#0D9648"> mdi-timer-outline</v-icon>
              {{ days }} days, {{ hours }} hours, {{ minutes }} min,
              {{ seconds }} sec remaining
            </div>

            <v-divider color="#0D9648"></v-divider>
            <div
              class="bid-number"
            >
              {{noOfBidSubmitted}} Bids Received
            </div>
          </v-sheet>
          <v-sheet  class="py-2 px-5 text-left award-status-card"
            rounded="lg"
            height="85"
            width="290"
            v-else>

              <div  class="award-status" v-if="bidDetail.user_status === 'waiting'">Status: Not Awarded</div>

              <div class="award-status" v-if="bidDetail.user_status === 'awarded' ||bidDetail.user_status === 'rejected'">Status: Awarded</div>
              <v-divider

              class="mt-3"
              color="#b489251c"
            ></v-divider>
            <div
             class="award-bid-number"
            >
              {{noOfBidSubmitted}} Bids Received
            </div>
          </v-sheet>
        </v-col>

        <v-col cols="auto">
          <div class="toggle-setting" v-if="!isAfterDueDate">
            <v-btn
              class="py-2 setting"
              plain
              color="#0d96481a"
              @click="isSetting = !isSetting"
              ><v-icon color="#0D9648"> mdi-cog-outline</v-icon></v-btn
            >
            <div v-show="isSetting">
              <v-card
              tile
              outlined
              class="mx-auto setting-card"
              min-width="312"
              >
              <v-list class="pa-0">
                <v-list-item-group color="success">
                  <v-list-item class="edit-item">
                    <router-link to="#" class="text-decoration-none">
                      <v-list-item-icon
                      class="mr-2 my-2"
                      @click="isSetting = !isSetting"
                      >
                      <v-icon size="24" color="#0D9648"
                      >mdi-note-edit-outline</v-icon
                      >
                    </v-list-item-icon>
                  </router-link>
                  <v-list-item-content
                  align-start
                  color="#0D9648"
                  class="pa-0"
                  >
                    <router-link to="#" class="text-decoration-none">
                      <v-list-item-title
                      color="#0D9648"
                      @click="isSetting = !isSetting"
                      class="py-3"
                      >Edit Bid</v-list-item-title
                      >
                    </router-link>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item class="delete-item">
                  <router-link to="#" class="text-decoration-none">
                    <v-list-item-icon
                    class="mr-2 my-2"
                    @click="isSetting = !isSetting"
                    >
                    <v-icon size="24" color="#F32349"
                    >mdi-trash-can-outline</v-icon
                    >
                  </v-list-item-icon>
                </router-link>
                <v-list-item-content
                  align-start
                  color="#0D9648"
                  class="pa-0"
                  >
                  <v-dialog
                  class="dialog-class"
                  v-model="dialog"
                  width="300"
                  >

                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                      color="#F32349"
                      block
                      plain
                      :ripple="false"
                      class="delete-button"
                      v-bind="attrs"
                      @click="isSetting = !isSetting"
                      v-on="on"
                      >
                      Delete Bid
                      </v-btn>
                    </template>

                    <v-card >
                      <v-card-title  class="text-h5 justify-center grey lighten-2">
                        Delete Bid
                      </v-card-title>
                      <v-card-text class="pt-3 mb-n2">Are you sure you really want to delete this bid?</v-card-text>
                      <v-divider></v-divider>
                      <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn
                        color="#0d9648"
                        outlined
                        @click="dialog = false"
                        >
                        Cancel
                        </v-btn>
                        <v-btn
                        color="#F32349"
                        outlined
                        @click="dialog = false;deleteB()"
                        >
                        Agree
                        </v-btn>
                      </v-card-actions>
                    </v-card>

                  </v-dialog>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
            </v-list>
          </v-card>
            </div>
          </div>
          <v-btn v-else  color="#F03F20" depressed @click="ChangeT('tab-2')">
            <div class="supplier-class">Select Supplier</div>
          </v-btn>
        </v-col>
      </v-row>
      <div class="bidDetail-tabs-section mt-7">
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
          {{ item.text }}
            <v-badge
              v-if="item.value === 3 && showBidMessageC !== 0"
              color="#0D9648"
              :content="showBidMessageC"
              inline
              tile
            >

            </v-badge>
            <v-badge
              v-if=" item.value === 5"
              color="#0D9648"
              :content="6"
              inline
              tile
            >

            </v-badge>

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
import BidDetailTab from '@/components/viewBid/bidDetailTab.vue';
import BidBroadcast from '@/components/viewBid/bidBroadcast.vue';
import BidQandA from '@/components/viewBid/bidQandA.vue';
import BidChat from '@/components/viewBid/bidChat.vue';
import BidSubmission from '@/components/viewBid/bidSubmission.vue';
import BidAuditTrail from '@/components/viewBid/bidAuditTrail.vue';
import moment from 'moment-timezone';
import { mapActions } from 'vuex';

export default {
  name: 'BidDetail',
  components: {
    BidDetailTab,
    BidBroadcast,
    BidQandA,
    BidChat,
    BidSubmission,
    BidAuditTrail,
  },
  data() {
    return {
      currentItem: 'tab-1',
      validate: '',
      isSetting: false,
      value: '',
      users: '',
      actualTime: moment().format('X'),
      years: 0,
      months: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      dialog: false,
      alert: false,
      tabs: [
        {
          text: 'Bid Detail',
          value: 1,
        },
        {
          text: 'Bid Submissions',
          value: 2,
        },
        {
          text: 'Bid Chat',
          value: 3,
        },
        {
          text: 'Bid Broadcast',
          value: 4,
        },
        {
          text: 'Q&A',
          value: 5,
        },
        {
          text: 'Audit Trail',
          value: 6,
        },
      ],
    };
  },
  methods: {
    ...mapActions(['getBidBySerial', 'deleteBid', 'getSubmittedBid', 'bidMessageUnreadCount']),
    ChangeT(tab) {
      this.currentItem = tab;
    },
    deleteB() {
      this.deleteBid({ bidId: this.bidDetail.bidData.id, userid: this.users.id });
    },
    addOneSecondToActualTimeEverySecond() {
      const component = this;
      component.actualTime = moment().format('X');
      setTimeout(() => {
        component.addOneSecondToActualTimeEverySecond();
      }, 1000);
    },
    getDiffInSeconds() {
      const bidDueDate = this.bidDetail.bidData.dueDate;
      const bidDueTime = this.bidDetail.bidData.dueTime;
      const momentTime = moment(bidDueTime, ['h:mm:ss A']).format('HH:mm:ss');

      const stringDate = `${bidDueDate}T${momentTime}`;
      const momentDueDate = moment(stringDate);
      return moment(momentDueDate).format('X') - this.actualTime;
    },
    compute() {
      const duration = moment.duration(this.getDiffInSeconds(), 'seconds');
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
      return this.$store.getters.bidViewData;
    },
    showErrorDeleteAlert() {
      return this.$store.getters.showErrorDeleteBid;
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
    noOfBidSubmitted() {
      return this.$store.getters.submittedBid.length;
    },
    getPageLoading() {
      return this.$store.getters.pageLoader;
    },
    getViewBidError() {
      return this.$store.getters.showViewBidError;
    },
    showBidMessageC() {
      return this.$store.getters.bidMessageUnreadCount;
    },
  },
  beforeMount() {

  },
  mounted() {
    document.title = 'Bid Detail - BidOut';
    // console.log(this.users);
    // this.getSubmittedBid({
    //   userId: this.users.id,
    //   bidId: this.bidDetail.bidData.id,
    // });
    // await this.getSubmittedBid({
    //   userId: 'nSJ4rgmgUTBbiyeJoHIE',
    //   bidId: 'N3x4CzqfrYqpsLWYrX0k',
    // });
  },
  async created() {
    this.users = this.$store.getters.userInfo;

    await this.getBidBySerial({
      serial: this.$route.params.serial,
      id: this.users.id,
    });

    await this.getSubmittedBid({
      userId: this.users.id,
      bidId: this.bidDetail.bidData.id,
    });

    await this.bidMessageUnreadCount({
      userId: this.users.id,
      bidId: this.bidDetail.bidData.id,
    });
    if (this.$route.query.new) {
      this.$toasted.show(`Success! Bid #${this.$route.params.serial} has been created and all invitations have been sent to the suppliers`, {
        class: 'success-toast',
        duration: 5000,
        position: 'top-center',
      });
    }

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
