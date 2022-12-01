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
              :disabled="enableTabs"
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
              <bid-details-edit
                @changetab="ChangeT($event)"
                @validation="validateValue($event)"
              ></bid-details-edit>
            </v-tab-item>
            <v-tab-item value="tab-2">
              <SupplierSectionEdit
                @changetab="ChangeT($event)"
                @validation="validateSupplier($event)"
              ></SupplierSectionEdit>
            </v-tab-item>
            <v-tab-item value="tab-3">
              <team-members-edit
                @changetab="ChangeT($event)"
                @validation="validateTeam($event)"
              ></team-members-edit>
            </v-tab-item>
            <v-tab-item

              value="tab-4"
              class="bidline-tab"
            >
              <bid-lines-edit
                @changetab="ChangeT($event)"
                @validation="validateItems($event)"
              ></bid-lines-edit>
            </v-tab-item>
            <v-tab-item

              value="tab-5"
              class="attachment-tab mt-5"
            >
              <attachment-edit
                @changetab="ChangeT($event)"
                @validation="validateAttachment($event)"
              ></attachment-edit>
            </v-tab-item>
            <v-tab-item

              value="tab-6"
              class="question-tab mt-5"
            >
              <question-section2-edit></question-section2-edit>
            </v-tab-item>
          </v-tabs-items>
        </div>
      </div>
    </div>
  </v-col>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import SupplierSectionEdit from '../../components/EditBid/EditBidSupplierSection.vue';
import TeamMembersEdit from '../../components/EditBid/EditBidTeamMembers.vue';
import BidLinesEdit from '../../components/EditBid/EditsBidLines.vue';
import AttachmentEdit from '../../components/EditBid/EditBidAttachment.vue';
import BidDetailsEdit from '../../components/EditBid/EditsBidDetails.vue';
import QuestionSection2Edit from '../../components/EditBid/EditBidQuestionSection2.vue';

export default {
  name: 'EditBid',
  components: {
    SupplierSectionEdit,
    TeamMembersEdit,
    BidLinesEdit,
    AttachmentEdit,
    BidDetailsEdit,
    QuestionSection2Edit,
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
    ...mapActions(["getDraftBySerial"]),
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
        this.$router.push(`/view-bids/${serial}`);
        this.$store.commit('setDraftBidsList', null);
      } catch (error) {
        console.log(error);
      }
    }, 
  },
  async created(){
    await this.getDraftBySerial(this.$route.params.serial);
  },
  mounted() {
    document.title = 'Create Bid - BidOut';
    this.users = JSON.parse(localStorage.getItem('userData')).user;
    
  },
};
</script>
<style scoped lang="scss">
</style>
