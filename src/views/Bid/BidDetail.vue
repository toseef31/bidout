<template>
  <v-row fill-height align="center" class="bid-alert" v-if="getPageLoading || getViewBidError">
    <v-col cols="12">
      <v-progress-circular v-if="getPageLoading" :width="3" color="green" indeterminate></v-progress-circular>
      <div class="alert-section" v-if="getViewBidError && !getPageLoading">
        <div class="error-title mb-5">
          <h1 class="font-weight-bold">Opps!</h1>
          <h1 class="font-weight-medium">This page is not available.</h1>
        </div>

        <div class="btn-section mt-8 mb-16 pb-16">
          <a class="text-decoration-none" href="https://bidout.app"><v-btn large outlined color="#0D9647" height="52"
              class="mr-5 font-weight-bold text-capitalize">Access Homepage</v-btn></a>
          <router-link to="/dashboard" class="text-decoration-none"><v-btn large outlined color="#0D9647"
              class="font-weight-bold text-capitalize" height="52">Access Dashboard</v-btn></router-link>
        </div>
      </div>

    </v-col>
  </v-row>

  <v-col v-else class="pl-0 pr-3 pb-0 pt-0 bid-detail-module  ">
    <v-alert type="error" v-show="showErrorDeleteAlert" class="mx-5" v-if="getUserType === 'buyer'">
      Deleting this bid has failed. Please try again!
    </v-alert>

    <v-alert type="success" v-show="showSupplierAlert" class="mx-5 mt-5">
      New suppliers have been updated and email notifications have been sent.
    </v-alert>
    <v-alert type="success" v-show="getTeamMemberAddAlert" class="mx-5 mt-5">
      New team members have been added to the bid.
    </v-alert>

    <v-alert type="success" v-show="getDateAlert" class="mx-5">
      You've successfully updated the due date and time, and email notifications were sent to all invited suppliers.
    </v-alert>

    <v-card class=" bid-submitted-card" :elevation="0" v-if="isBidSubmitted && getUserType === 'supplier'">
      <div class="d-flex align-center">
        <img :src="require('@/assets/images/bids/awarded.png')" />

        <div class="ml-5 text-left">
          <div class="company-title">{{ users.company.company }}</div>
          <div class="company-submitted">Your bid submission has been received. </div>
        </div>
      </div>
    </v-card>

    <v-card class="fill-height main-card" :elevation="0">
      <v-alert type="success" v-show="showAlertEditBidSubmissionSuccess" class="mx-5 mt-5">
        This bid has been updated successfully!
      </v-alert>

      <v-alert type="success" v-show="showBidSubmissionAlert.award" class="mx-5 mt-5">
        You have been awarded a company successfully!
      </v-alert>

      <v-alert type="success" v-show="showBidSubmissionAlert.disqualify" class="mx-5 mt-5">
        You have been disqualified a company successfully!
      </v-alert>
      <v-alert type="success" v-show="showBidSubmissionAlert.unAward" class="mx-5 mt-5">
        You have been Un-awarded a company successfully!
      </v-alert>
      <v-alert type="success" v-show="showBidSubmissionAlert.unDisqualify" class="mx-5 mt-5">
        You have been Un-disqualified a company successfully!
      </v-alert>
      <v-alert type="error" v-show="getLoweringPriceAlert !== null" class="mx-5 mt-5">
        {{ getLoweringPriceAlert }}
      </v-alert>

      <v-alert type="error" v-show="getBidSubmissionValidationAlert !== null" class="mx-5 mt-5">
        {{ getBidSubmissionValidationAlert }}
      </v-alert>

      <v-row class="px-5 my-5 row-title" no-gutters v-if="getUserType === 'buyer'">
        <v-col>
          <div class="pa-1 text-left text--primary">
            <div class="font-weight-bold text--primary bid-title">
              {{ bidDetail.bidData.title }}
            </div>

            <div class="detail">
              <div>
                Bid: <span class="serial">#{{ bidDetail.bidData.serial }}</span>
              </div>
              <div>
                Due Date/Time: {{ formatDate(bidDetail.bidData.dueDate) }} @
                {{ bidDetail.bidData.dueTime }} CST
              </div>
              <div>
                Created by: <strong>{{ bidDetail.bidData.company }}</strong>, {{ bidDetail.bidData.userId.firstName }}
                {{ bidDetail.bidData.userId.lastName }}
              </div>
              <div>Bid Type: {{ bidDetail.bidData.type }}</div>
            </div>
          </div>
        </v-col>

        <v-col class="status-sec mx-auto">
          <v-sheet class="py-2 px-4 bid-status-card text-left" rounded="lg" height="119" width="300"
            v-if="bidDetail.receivingBids && !isBidOut">
            <div class="status">
              Status: Receiving Bids
            </div>
            <div class="time pt-2 align-center">
              <v-icon small color="#0D9648"> mdi-timer-outline</v-icon>
              {{ days }} days, {{ hours }} hours, {{ minutes }} min,
              {{ seconds }} sec remaining
            </div>

            <v-divider color="#0D9648"></v-divider>
            <div class="bid-number">
              {{ noOfBidSubmitted }} Bids Received
            </div>
          </v-sheet>

          <v-sheet class="py-2 px-4 bid-status-card text-left" rounded="lg" height="119" width="300"
            v-if="!bidDetail.receivingBids && isBidOut">

            <div class="status">
              Status: BidOut Phase
            </div>
            <div class="time pt-2 align-center">
              <v-icon small color="#0D9648"> mdi-timer-outline</v-icon>
              {{ days }} days, {{ hours }} hours, {{ minutes }} min,
              {{ seconds }} sec remaining
            </div>

            <v-divider color="#0D9648"></v-divider>
            <div class="bid-number">
              {{ noOfBidSubmitted }} Bids Received
            </div>
          </v-sheet>

          <v-sheet class="py-2 px-5 text-left award-status-card" rounded="lg" height="85" width="290"
            v-if="!bidDetail.receivingBids && !isBidOut">

            <div class="award-status"
              v-if="(bidDetail.bidData.rejectees && bidDetail.bidData.rejectees.length === 0 && bidDetail.bidData.awardees && bidDetail.bidData.awardees.length === 0) || !bidDetail.bidData.rejectees && !bidDetail.bidData.awardees">
              Status: Not Awarded</div>

            <div class="award-status"
              v-if="bidDetail.bidData.rejectees && bidDetail.bidData.rejectees.length || bidDetail.bidData.awardees && bidDetail.bidData.awardees.length">
              Status: Awarding Phase</div>
            <v-divider class="mt-3" color="#b489251c"></v-divider>
            <div class="award-bid-number">
              {{ noOfBidSubmitted }} Bids Received
            </div>
          </v-sheet>
        </v-col>

        <v-col cols="auto">
          <div class="toggle-setting" v-if="bidDetail.receivingBids && !isBidOut">
            <v-btn class="py-2 setting" plain color="#0d96481a" @click="isSetting = !isSetting"><v-icon color="#0D9648">
                mdi-cog-outline</v-icon></v-btn>
            <div v-show="isSetting">
              <v-card tile outlined class="mx-auto setting-card" min-width="312">
                <v-list class="pa-0">
                  <v-list-item-group color="success">
                    <v-list-item class="edit-item">
                      <router-link to="#" class="text-decoration-none" v-if="noOfBidSubmitted === 0">
                        <v-list-item-icon class="mr-2 my-2" @click="isSetting = !isSetting">
                          <v-icon size="24" color="#0D9648">mdi-note-edit-outline</v-icon>
                        </v-list-item-icon>
                      </router-link>

                      <v-list-item-icon v-if="noOfBidSubmitted > 0" class="mr-2 my-2" @click="isSetting = !isSetting">
                        <v-icon size="24" color="#959595">mdi-note-edit-outline</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content align-start color="#0D9648" class="pa-0">
                        <router-link :to="'/edit-bid/' + bidDetail.bidData.serial" class="text-decoration-none"
                          v-if="noOfBidSubmitted === 0">
                          <v-list-item-title color="#0D9648" @click="isSetting = !isSetting" class="py-3">Edit
                            Bid</v-list-item-title>
                        </router-link>
                        <v-tooltip top>
                          <template v-slot:activator="{ on, attrs }">
                            <v-list-item-title v-bind="attrs" v-on="on" v-if="noOfBidSubmitted > 0" color="#959595"
                              @click="isSetting = !isSetting" class="pt-2">
                              <p class="disabled-item">Edit Bid</p>
                            </v-list-item-title>
                          </template>
                          <span>Editing this bid is not allowed once entries are received</span>
                        </v-tooltip>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item class="delete-item">
                      <router-link to="#" class="text-decoration-none" v-if="noOfBidSubmitted === 0">
                        <v-list-item-icon class="mr-2 my-2" @click="isSetting = !isSetting">
                          <v-icon size="24" color="#F32349">mdi-trash-can-outline</v-icon>
                        </v-list-item-icon>
                      </router-link>

                      <v-list-item-icon v-if="noOfBidSubmitted > 0" class="mr-2 my-2" @click="isSetting = !isSetting">
                        <v-icon size="24" color="#959595">mdi-trash-can-outline</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content align-start color="#0D9648" class="pa-0">
                        <v-dialog class="dialog-class" v-model="dialog" width="300" v-if="noOfBidSubmitted === 0">

                          <template v-slot:activator="{ on, attrs }">
                            <v-btn color="#F32349" block plain :ripple="false" class="delete-button" v-bind="attrs"
                              @click="isSetting = !isSetting" v-on="on">
                              Delete Bid
                            </v-btn>
                          </template>

                          <v-card>
                            <v-card-title class="text-h5 justify-center grey lighten-2">
                              Delete Bid
                            </v-card-title>
                            <v-card-text class="pt-3 mb-n2">Are you sure you really want to delete this
                              bid?</v-card-text>
                            <v-divider></v-divider>
                            <v-card-actions>
                              <v-spacer></v-spacer>

                              <v-btn color="#0d9648" outlined @click="dialog = false">
                                Cancel
                              </v-btn>
                              <v-btn color="#F32349" outlined @click="dialog = false; deleteB()">
                                Agree
                              </v-btn>
                            </v-card-actions>
                          </v-card>

                        </v-dialog>

                        <v-tooltip top>
                          <template v-slot:activator="{ on, attrs }">
                            <v-list-item-title v-bind="attrs" v-on="on" v-if="noOfBidSubmitted > 0" color="#959595"
                              @click="isSetting = !isSetting" class="pt-2">
                              <p class="disabled-item">Delete Bid</p>
                            </v-list-item-title>
                          </template>
                          <span>Deleting this bid is not allowed once entries are received</span>
                        </v-tooltip>

                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-card>
            </div>
          </div>
          <v-btn v-if="!bidDetail.receivingBids && !isBidOut" color="#F03F20" depressed @click="ChangeT('tab-2')">
            <div class="supplier-class">Select Supplier</div>
          </v-btn>
        </v-col>
      </v-row>

      <v-row class="px-5 my-5 row-title align-center" no-gutters v-else>
        <v-col>
          <div class="pa-1 text-left text--primary">
            <div class="font-weight-bold text--primary bid-title">
              {{ bidDetail.bidData.title }}
            </div>

            <div class="detail">
              <div>
                Bid: <span class="serial">#{{ bidDetail.bidData.serial }}</span>
              </div>
              <div>
                Due Date/Time: {{ formatDate(bidDetail.bidData.dueDate) }} @
                {{ bidDetail.bidData.dueTime }} CST
              </div>
              <div>
                Created by: <strong>{{ bidDetail.bidData.company }}</strong>, {{ bidDetail.bidData.userId.firstName }}
                {{ bidDetail.bidData.userId.lastName }}
              </div>
              <div>Bid Type: {{ bidDetail.bidData.type }}</div>
            </div>
          </div>
        </v-col>

        <v-col class="status-sec mr-6 text-left mt-2" cols="auto" v-if="bidDetail.receivingBids && !isBidSubmitted">

          <label class="intent-title">Intent to bid? </label>
          <v-radio-group v-model="answer" @change="makeIntentBid" row>
            <v-radio label="Yes" value="true" color="#0d9648" checked></v-radio>
            <v-radio label="No" value="false" color="#F32349"></v-radio>
          </v-radio-group>
        </v-col>

        <v-col cols="auto">
          <v-sheet class="py-2 px-4 bid-status-card text-left" rounded="lg" height="119" width="300"
            v-if="bidDetail.receivingBids && !isBidOut">
            <div class="status">
              Status: Receiving Bids
            </div>
            <div class="time pt-2 align-center">
              <v-icon small color="#0D9648"> mdi-timer-outline</v-icon>
              {{ days }} days, {{ hours }} hours, {{ minutes }} min,
              {{ seconds }} sec remaining
            </div>

            <v-divider color="#0D9648"></v-divider>
            <div class="bid-number">
              {{ showIntent === null && !isBidSubmitted ? 'Please specify your intend to bid' : '' }}
              {{ showIntent === false || showIntent === 'false' ? 'Bid Submission is not allowed' : '' }}
              <div v-if="showIntent === true || showIntent === 'true' && !isBidSubmitted" @click="ChangeT('tab-2')">
                Submit Bid</div>
              <div @click="ChangeT('tab-2')" v-if="isBidSubmitted">Bid Submitted</div>
            </div>
          </v-sheet>

          <v-sheet class="py-2 px-4 bid-status-card text-left" rounded="lg" height="119" width="300"
            v-if="!bidDetail.receivingBids && isBidOut">
            <div class="status">
              Status: BidOut Phase
            </div>
            <div class="time pt-2 align-center">
              <v-icon small color="#0D9648"> mdi-timer-outline</v-icon>
              {{ days }} days, {{ hours }} hours, {{ minutes }} min,
              {{ seconds }} sec remaining
            </div>

            <v-divider color="#0D9648"></v-divider>
            <div class="bid-number">
              {{ showIntent === null && !isBidSubmitted && !isBidOut ? 'Please specify your intend to bid' : '' }}
              {{ showIntent === null && isBidOut ? 'Bid Submission is not allowed' : '' }}
              {{ showIntent === false || showIntent === 'false' ? 'Bid Submission is not allowed' : '' }}
              {{ showIntent === true || showIntent === 'true' && !isBidSubmitted && isBidOut ? 'Bid Submission is not
                            allowed' : ''}}
              <div v-if="showIntent === true || showIntent === 'true' && !isBidSubmitted && !isBidOut"
                @click="ChangeT('tab-2')">
                Submit Bid</div>
              <div @click="ChangeT('tab-2')" v-if="isBidSubmitted">Update your best price now!</div>
            </div>
          </v-sheet>

          <v-sheet class="py-2 px-5 text-left award-status-card" rounded="lg" height="85" width="290"
            v-if="!bidDetail.receivingBids && !isBidOut && bidDetail.user_status !== 'awarded'">

            <div class="award-status" v-if="bidDetail.user_status === 'waiting'">Status: Awarding Phase</div>

            <div class="award-status" v-if="bidDetail.user_status === 'rejected'">Status: Not Awarded</div>
            <v-divider class="mt-3" color="#b489251c"></v-divider>
            <div class="award-bid-number">
              <div @click="ChangeT('tab-2')">{{ isBidSubmitted ? 'Bid Submitted' : 'Bid is not Submitted' }} </div>
            </div>
          </v-sheet>
          <v-sheet class="py-2 px-5 text-left bid-status-card" rounded="lg" height="85" width="290"
            v-if="bidDetail.user_status === 'awarded' && isBidSubmitted && !bidDetail.receivingBids && !isBidOut">

            <div class="status">Status: Awarded, Congrats!</div>

            <v-divider class="mt-3" color="#0D9648"></v-divider>
            <div class="bid-number">
              <div @click="ChangeT('tab-2')">Bid Submitted</div>
            </div>
          </v-sheet>
        </v-col>
      </v-row>

      <div class="bidDetail-tabs-section mt-7" v-if="getUserType === 'buyer'">
        <v-tabs v-model="currentItem" class="bids-tabs" fixed-tabs hide-slider :mobile-breakpoint="767" @change="reload">
          <v-tab v-for="item in tabs" :key="item.value" :href="'#tab-' + item.value"
            class="text-capitalize black--text font-weight-bold">
            {{ item.text }}
            <v-badge v-if="item.value === 3 && showBidMessageC !== 0" color="#0D9648" :content="showBidMessageC" inline
              tile>

            </v-badge>
            <v-badge v-if="item.value === 5 && getUnansweredQuestionCount !== 0" color="#0D9648"
              :content="getUnansweredQuestionCount" inline tile>

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
          <v-tab-item value="tab-5">
            <BidQandA @changetab="ChangeT($event)"></BidQandA>
          </v-tab-item>
          <v-tab-item value="tab-6" class="mt-5">
            <BidAuditTrail @changetab="ChangeT($event)"></BidAuditTrail>
          </v-tab-item>
        </v-tabs-items>
      </div>
      <div v-else class="bidDetail-tabs-section mt-7">
        <v-tabs v-model="currentItem" class="bids-tabs" fixed-tabs hide-slider :mobile-breakpoint="767" @change="reload">
          <v-tab v-for="item in tabsSupplier" :key="item.value" :href="'#tab-' + item.value"
            class="text-capitalize black--text font-weight-bold">
            {{ item.text }}
            <v-badge v-if="item.value === 3 && showBidMessageC !== 0" color="#0D9648" :content="showBidMessageC" inline
              tile>

            </v-badge>
            <v-badge v-if="item.value === 4 && getAnsweredQuestionCount !== 0" color="#0D9648"
              :content="getAnsweredQuestionCount" inline tile>

            </v-badge>

          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="currentItem">
          <v-tab-item value="tab-1">
            <SupplierBidDetail @changetab="ChangeT($event)"></SupplierBidDetail>
          </v-tab-item>
          <v-tab-item value="tab-2">
            <SupplierBidSubmission @changetab="ChangeT($event)"></SupplierBidSubmission>
          </v-tab-item>
          <v-tab-item value="tab-3">
            <BidChat @changetab="ChangeT($event)"></BidChat>
          </v-tab-item>
          <v-tab-item value="tab-4">
            <BidQandA @changetab="ChangeT($event)"></BidQandA>
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
import SupplierBidDetail from '@/components/viewBid/supplierBidDetail.vue';
import SupplierBidSubmission from '@/components/viewBid/supplierBidSubmission.vue';
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
    SupplierBidDetail,
    SupplierBidSubmission,
  },
  data() {
    return {
      currentItem: 'tab-1',
      isSetting: false,
      users: '',
      actualTime: moment.tz('America/Chicago').format('X'),
      years: 0,
      months: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      dialog: false,
      alert: false,
      answer: null,
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
      tabsSupplier: [
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
          text: 'Q&A',
          value: 4,
        },
      ],
    };
  },
  methods: {
    ...mapActions(['getBidBySerial', 'deleteBid', 'bidMessageUnreadCount', 'makeIntent', 'getIntent', 'updateIntent', 'getQA', 'getAllIntent', 'getBidAllConversations', 'getBidActivityList']),
    async reload(event) {
      if (this.getUserType === 'buyer' && event !== 'tab-4') {
        await this.getBidBySerial({
          serial: this.$route.params.serial,
          id: this.users.id,
          reload: false,
          company: this.users.company.company,
        });

        await this.bidMessageUnreadCount({
          userId: this.users.id,
          bidId: this.bidDetail.bidData.id,
        });

        await this.getAllIntent({
          bidId: this.bidDetail.bidData.id,
          reload: false,
        });

        await this.getQA({
          bidId: this.bidDetail.bidData.id,
          userId: this.users.id,
          reload: false,
        });

        await this.getBidActivityList({
          bidId: this.bidDetail.bidData.id,
          userId: this.users.id,
          reload: false,
        });

        await this.getBidAllConversations({ bidId: this.bidDetail.bidData.id, userId: this.users.id });
      } else if (this.getUserType === 'supplier' && event !== 'tab-2') {
        await this.getBidBySerial({
          serial: this.$route.params.serial,
          id: this.users.id,
          reload: false,
          company: this.users.company.company,
        });

        await this.bidMessageUnreadCount({
          userId: this.users.id,
          bidId: this.bidDetail.bidData.id,
        });

        await this.getIntent({
          companyId: this.users.company.id,
          bidId: this.bidDetail.bidData.id,
          companyName: this.users.company.company,
          reload: false,
        });

        this.answer = this.$store.getters.bidIntent;

        await this.getQA({
          bidId: this.bidDetail.bidData.id,
          userId: this.users.id,
          reload: false,
        });

        await this.getBidAllConversations({ bidId: this.bidDetail.bidData.id, userId: this.users.id });
      }
    },
    ChangeT(tab) {
      this.currentItem = tab;
    },
    makeIntentBid() {
      if (this.getIntentId && this.$store.getters.bidIntent !== null) {
        this.updateIntent({
          answer: this.answer,
          intendId: this.getIntentId,
        });
      } else {
        this.makeIntent({
          bidId: this.bidDetail.bidData.id,
          owner: this.users.id,
          ownerCompany: this.users.company.company,
          companyId: this.users.company.id,
          answer: this.answer,
        });
      }
    },
    deleteB() {
      this.deleteBid({ bidId: this.bidDetail.bidData.id, userid: this.users.id });
    },
    addOneSecondToActualTimeEverySecond() {
      const component = this;
      component.actualTime = moment.tz('America/Chicago').format('X');
      setTimeout(() => {
        component.addOneSecondToActualTimeEverySecond();
      }, 1000);
    },
    getDiffInSeconds() {
      const bidDueDate = this.bidDetail.bidData.dueDate;
      const bidDueTime = this.bidDetail.bidData.dueTime;
      const momentTime = moment(bidDueTime, ['h:mm:ss A ']).format('HH:mm:ss');

      const stringDate = `${bidDueDate}T${momentTime}`;

      let momentDueDate = moment.tz(stringDate, 'America/Chicago');

      if (this.bidDetail.bidData.type === 'BidOut Process' && !this.bidDetail.bidout && this.bidDetail.receivingBids) {
        momentDueDate = momentDueDate.subtract(4, 'hours');
      }

      return moment.tz(momentDueDate, 'America/Chicago').format('X') - this.actualTime;
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
    formatDate(dueDate) {
      return dueDate !== '' && dueDate !== null ? moment.tz(dueDate, 'America/Chicago').format('MM/DD/YYYY') : '';
    },
    checkZero(item) {
      if (Number(item) === 0) {
        return true;
      } return false;
    },

  },
  computed: {
    changeTime() {
      return `${this.years}|${this.months}|${this.days}|${this.hours}|${this.minutes}|${this.seconds}`;
    },
    bidDetail() {
      return this.$store.getters.bidViewData;
    },
    getUserType() {
      return this.$store.getters.userType;
    },
    showErrorDeleteAlert() {
      return this.$store.getters.showErrorDeleteBid;
    },
    getIntentId() {
      return this.$store.getters.intentId;
    },
    isBidSubmitted() {
      return this.$store.getters.isBidSubmitted;
    },
    getUnansweredQuestionCount() {
      return this.$store.getters.unansweredQuestionCount;
    },
    getAnsweredQuestionCount() {
      return this.$store.getters.answeredQuestionCount;
    },
    noOfBidSubmitted() {
      return this.bidDetail.supplierSubmissions.length;
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
    showAlertEditBidSubmissionSuccess() {
      return this.$store.getters.alertEditBidSubmissionSuccess;
    },
    showIntent() {
      return this.$store.getters.bidIntent;
    },
    showBidSubmissionAlert() {
      return this.$store.getters.bidSubmissionAlert;
    },
    showSupplierAlert() {
      return this.$store.getters.supplierAddAlert;
    },
    isBidOut() {
      if (this.bidDetail.bidData.type === 'BidOut Process' && this.bidDetail.bidout) {
        return true;
      }
      return false;
    },
    getLoweringPriceAlert() {
      return this.$store.getters.loweringPriceAlert;
    },
    getDateAlert() {
      return this.$store.getters.dateAlert;
    },
    getTeamMemberAddAlert() {
      return this.$store.getters.teamMemberAddAlert;
    },
    getBidSubmissionValidationAlert() {
      return this.$store.getters.bidSubmissionValidationAlert;
    },
  },
  mounted() {
    document.title = 'View Bid - BidOut';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    moment.tz.setDefault('America/Chicago');
  },
  async created() {
    this.users = this.$store.getters.userInfo;

    if (this.users) {
      await this.getBidBySerial({
        serial: this.$route.params.serial,
        id: this.users.id,
        company: this.users.company.company,
      });
    } else {
      this.$router.push('/login');
    }

    this.compute();
    this.addOneSecondToActualTimeEverySecond();

    await this.bidMessageUnreadCount({
      userId: this.users.id,
      bidId: this.bidDetail.bidData.id,
    });

    if (this.$route.query.new && this.getUserType === 'buyer') {
      this.$toasted.show(`Success! Bid #${this.$route.params.serial} has been created and all invitations have been sent to the suppliers`, {
        class: 'success-toast',
        duration: 5000,
        position: 'top-center',
      });
    }

    if (this.getUserType === 'supplier') {
      await this.getIntent({
        companyId: this.users.company.id,
        bidId: this.bidDetail.bidData.id,
        companyName: this.users.company.company,
      });

      this.answer = this.$store.getters.bidIntent;
    } else {
      await this.getAllIntent({
        bidId: this.bidDetail.bidData.id,
      });

      await this.getBidActivityList({
        bidId: this.bidDetail.bidData.id,
        userId: this.users.id,
      });
    }

    await this.getQA({
      bidId: this.bidDetail.bidData.id,
      userId: this.users.id,
    });
  },
  watch: {
    actualTime() {
      this.compute();
    },
    changeTime(newVal) {
      const [years, months, days, hours, minutes, seconds] = newVal.split('|');

      if (this.checkZero(years) && this.checkZero(months) && this.checkZero(days) && this.checkZero(hours) && this.checkZero(minutes) && this.checkZero(seconds)) {
        this.$router.go(0);
      }
    },
  },
};
</script>

<style lang="scss"></style>
