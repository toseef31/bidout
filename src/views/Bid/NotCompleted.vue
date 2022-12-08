<template>
  <v-col
    class="createBid-module pa-0 pa-sm-3 pl-sm-0"
    :class="[
      showSideBar ? 'col-md-9 col-12 col-sm-7' : 'mid-content-collapse',
      activityPanel ? 'd-sm-block' : 'd-md-block',
    ]"
    v-show="!activityPanel"
  >
    <div class="mid-content">
      <div class="content-section fill-height pa-0">
        <v-row
          align="center"
          justify="space-between"
          no-gutters
          class="px-2 px-sm-6 my-4 not-completd-title"
        >
          <v-col cols="12" md="5" class="text-left">
            <div class="d-flex align-center">
              <h3 class="pl-1 mr-4">{{ bidTitle }}</h3>
              <!-- <p class="preview-text mb-0 ml-3">
                  <a href="" class="text-decoration-none"><v-icon color="#0D9648" class="pr-2">mdi-open-in-new</v-icon>Preview Bid in Supplier View</a>
                </p> -->
            </div>
          </v-col>
          <v-col cols="12" md="7" class="text-right">
            <div class="d-flex align-center justify-end">
              <p class="mb-0 mr-4 auto-text" v-if="draftTime">
                <strong>Autosaved Draft:</strong> {{ draftTime }}
              </p>
              <v-btn
                color="#0D9648"
                :disabled="!bidDetailsComplete || !lineItemsComplete ? true : false"
                class="white--text text-capitalize publish-btn"
                width="250px"
                height="52px"
                large
                @click="publishBid"
              >
                Publish Bid
              </v-btn>
            </div>
          </v-col>
        </v-row>
        <div class="bidtabs-section">
          <v-tabs
            v-model="currentItem"
            class="bids-tabs"
            fixed-tabs
            hide-slider
            mobile-breakpoint="767px"
          >
            <v-tab
              v-for="(item, index) in tabs"
              :key="item.value"
              :href="'#tab-' + item.value"
              class="text-capitalize black--text font-weight-bold"
              :disabled="enableTabs" @click="updateDraft"
            >
              {{ item.text }} {{ item.index }}

              <template v-if="index === 0">
                <v-icon
                  small
                  right
                  v-if="validate == true && value == item.value"
                  color="#0D9648"
                  >mdi-check-circle-outline</v-icon
                >
                <v-icon right small color="#F32349" v-else>
                  {{ item.icon }}
                </v-icon>
              </template>

              <template v-if="index === 3">
                <v-icon
                  small
                  right
                  v-if="itemsValid == true && itemsValue == item.value"
                  color="#0D9648"
                  >mdi-check-circle-outline</v-icon
                >
                <v-icon right small color="#F32349" v-else>
                  {{ item.icon }}
                </v-icon>
              </template>
            </v-tab>
          </v-tabs>
          <v-tabs-items v-model="currentItem">
            <v-tab-item value="tab-1">
              <bid-details
                @changetab="ChangeT($event)"
                @validation="validateValue($event)"
              ></bid-details>
            </v-tab-item>
            <v-tab-item value="tab-2">
              <SupplierSection
                @changetab="ChangeT($event)"
                @validation="validateSupplier($event)"
              ></SupplierSection>
            </v-tab-item>
            <v-tab-item value="tab-3">
              <team-members
                @changetab="ChangeT($event)"
                @validation="validateTeam($event)"
              ></team-members>
            </v-tab-item>
            <v-tab-item

              value="tab-4"
              class="bidline-tab"
            >
              <bid-lines
                @changetab="ChangeT($event)"
                @validation="validateItems($event)"
              ></bid-lines>
            </v-tab-item>
            <v-tab-item

              value="tab-5"
              class="attachment-tab mt-5"
            >
              <attachment
                @changetab="ChangeT($event)"
                @validation="validateAttachment($event)"
              ></attachment>
            </v-tab-item>
            <v-tab-item

              value="tab-6"
              class="question-tab mt-5"
            >
              <question-section2></question-section2>
            </v-tab-item>
          </v-tabs-items>
        </div>
      </div>
    </div>
  </v-col>
</template>
<script>
import { mapGetters, mapActions,mapState } from 'vuex';
import SupplierSection from '../../components/BidTabs/SupplierSection.vue';
import TeamMembers from '../../components/BidTabs/TeamMembers.vue';
import BidLines from '../../components/BidTabs/BidLines.vue';
import Attachment from '../../components/BidTabs/Attachment.vue';
import BidDetails from '../../components/BidTabs/BidDetails.vue';
import QuestionSection2 from '../../components/BidTabs/QuestionSection2.vue';

export default {
  name: 'NotCompleted',
  components: {
    SupplierSection,
    TeamMembers,
    BidLines,
    Attachment,
    BidDetails,
    QuestionSection2,
  },

  data() {
    return {
      users: '',
      currentItem: 'tab-1',
      tabs: [
        { text: 'Bid Detail', icon: 'mdi-information-outline', value: 1 },
        {
          text: 'Supplier Invitation',
          icon: 'mdi-information-outline',
          value: 2,
        },
        { text: 'Team Members', icon: 'mdi-information-outline', value: 3 },
        { text: 'Line Items', icon: 'mdi-information-outline', value: 4 },
        { text: 'Attachment', icon: 'mdi-information-outline', value: 5 },
        { text: 'Questions', icon: 'mdi-information-outline', value: 6 },
      ],

      availableSearch: ['All', 'Company'],
      availableSuppl: null,
      inviteTeam: null,
      subCompany: false,
      switch1: true,
      ex4: '',
      validate: '',
      value: '',
      bidTitle: '',
      supplierValid: '',
      supplierValue: '',
      teamValid: '',
      teamValue: '',
      itemsValid: '',
      itemsValue: '',
      attachValid: '',
      attachValue: '',
      questionValid: '',
      questionValue: '',
    };
  },
  computed: {
    ...mapGetters(['lineItemsComplete', 'bidDetailsComplete']),
    showSideBar() {
      return this.$store.getters.g_sideBarOpen;
    },
    activityPanel() {
      return this.$store.getters.g_activityPanel;
    },
    userDatas() {
      return this.$store.getters.userInfo;
    },
    passRule1() {
      return this.$store.getters.validate;
    },
    draftTime() {
      return this.$store.getters.draftTime;
    },
    enableTabs() {
      if (!this.$store.getters.draftBidsList) {
        return true;
      }
      return false;
    },
  },
  methods: {
    ...mapActions(["updateDraftBid"]),
    ...mapState(["invitedSuppliers"]),
    ChangeT(tab) {
      this.currentItem = tab;
    },
    validateValue(event) {
      this.validate = event.valid;
      this.value = event.value;
      this.bidTitle = event.bidTitle;
    },
    validateSupplier(event) {
      console.log(event);
      this.supplierValid = event.valid;
      this.supplierValue = event.supplier;
    },
    validateTeam(event) {
      this.teamValid = event.valid;
      this.teamValue = event.team;
    },
    validateItems(event) {
      this.itemsValid = event.valid;
      this.itemsValue = event.items;
    },
    validateAttachment(event) {
      console.log(event);
      this.attachValid = event.valid;
      this.attachValue = event.attach;
    },
    async publishBid() {
      try {
        const serial = await this.$store.dispatch('publishBid');
        console.log(serial);
        this.$router.push(`/view-bids/${serial}?new=true`);
        this.$store.commit('setDraftBidsList', null);
      } catch (error) {
        console.log(error);
      }
    },
    async updateDraft(){
      await this.updateDraftBid({'supplier': this.$store.state.bid.invitedSuppliers});
    }
  },
  mounted() {
    document.title = 'Create Template - BidOut';
    this.users = JSON.parse(localStorage.getItem('userData')).user;
  },
};
</script>
<style scoped lang="scss">
</style>
