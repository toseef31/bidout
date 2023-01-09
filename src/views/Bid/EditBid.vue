<template>
  <v-row class="createBid-module pa-0 ma-0">
    <v-col  class="pa-0 pr-sm-3"
      :class="[
        showSideBar ? 'col-md-12 col-12 col-sm-12' : 'mid-content-collapse',
        activityPanel ? 'd-sm-block' : 'd-md-block',
      ]"
      v-show="!activityPanel"
    >
      <div class="mid-content">
        <div class="content-section fill-height pa-0 d-flex align-center justify-center" v-if="loading">
          <v-progress-circular :width="3" color="green" indeterminate ></v-progress-circular>
        </div>
        <div class="content-section fill-height pa-0" v-else>
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
                <!-- <p class="mb-0 mr-4 auto-text" v-if="draftTime">
                  <strong>Autosaved Draft:</strong> {{ draftTime }}
                </p> -->
                <v-btn
                  color="#0D9648"
                  :disabled="!bidDetailsComplete || !lineItemsComplete ? true : false"
                  class="white--text text-capitalize publish-btn"
                  width="250px"
                  height="52px"
                  large
                  @click="publishBid"
                >
                  Save Bid
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
             
            >
              <v-tab
                v-for="(item, index) in tabs"
                :key="item.value"
                :href="'#tab-' + item.value"
                class="text-capitalize black--text font-weight-bold"
                @click="updateDraft"
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
                <edit-bid-details
                  @changetab="ChangeT($event)"
                  @validation="validateValue($event)"
                ></edit-bid-details>
              </v-tab-item>
              <v-tab-item value="tab-2">
                <EditSupplierSection
                  @changetab="ChangeT($event)"
                  @validation="validateSupplier($event)"
                ></EditSupplierSection>
              </v-tab-item>
              <v-tab-item value="tab-3">
                <edit-team-members
                  @changetab="ChangeT($event)"
                  @validation="validateTeam($event)"
                ></edit-team-members>
              </v-tab-item>
              <v-tab-item

                value="tab-4"
                class="bidline-tab"
              >
                <edit-bid-lines
                  @changetab="ChangeT($event)"
                  @validation="validateItems($event)"
                ></edit-bid-lines>
              </v-tab-item>
              <v-tab-item

                value="tab-5"
                class="attachment-tab mt-5"
              >
                <edit-attachment
                  @changetab="ChangeT($event)"
                  @validation="validateAttachment($event)"
                ></edit-attachment>
              </v-tab-item>
              <v-tab-item

                value="tab-6"
                class="question-tab mt-5"
              >
                <edit-question-section2></edit-question-section2>
              </v-tab-item>
            </v-tabs-items>
          </div>
        </div>
      </div>
    </v-col>
  </v-row>
</template>
<script>
import { mapGetters, mapActions,mapState } from 'vuex';
import EditSupplierSection from '../../components/BidTabs/SupplierSection.vue';
import EditTeamMembers from '../../components/BidTabs/TeamMembers.vue';
import EditBidLines from '../../components/BidTabs/BidLines.vue';
import EditAttachment from '../../components/BidTabs/Attachment.vue';
import EditBidDetails from '../../components/BidTabs/BidDetails.vue';
import EditQuestionSection2 from '../../components/BidTabs/QuestionSection2.vue';

export default {
  name: 'NotCompleted',
  components: {
    EditSupplierSection,
    EditTeamMembers,
    EditBidLines,
    EditAttachment,
    EditBidDetails,
    EditQuestionSection2,
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
    loading(){
     return this.$store.getters.pageLoader;
    }, 
  },
  methods: {
    ...mapActions(["updateBid","getUpdateBid","publishUpdateBid"]),
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
     
      this.attachValid = event.valid;
      this.attachValue = event.attach;
    },
    async publishBid() {
      try {
        await this.publishUpdateBid({serial:this.$route.params.serial});
        this.$router.push(`/view-bids/${this.$route.params.serial}`);
        this.$store.commit('setDraftBidsList', null);
        // this.$store.commit('setBidData', null);
      } catch (error) {
        console.log(error);
      }
    },
    async updateDraft(){
      await this.updateBid({'supplier': this.$store.state.bid.invitedSuppliers});
    }
  },
  async created(){
    await this.getUpdateBid({id: this.$store.getters.userInfo.id, serial:this.$route.params.serial, company: this.$store.getters.userInfo.company.company})
  },
  mounted() {
    document.title = 'Create Bid - BidOut';
    this.users = this.userDatas;
    
  },
};
</script>
<style scoped lang="scss">
</style>
