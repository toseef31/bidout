<template>
  <v-row class="createBid-module pa-0 ma-0">
    <v-col class="pa-0 pr-sm-3" :class="[ showSideBar ? 'col-md-12 col-12 col-sm-12' : 'mid-content-collapse', activityPanel ? 'd-sm-block' : 'd-md-block']" v-show="!activityPanel">
      <div class="mid-content">
        <div class="content-section fill-height d-flex align-center">
          <v-row align="center" justify="center" class="fill-height mx-0">
            <v-col cols="12" md="4">
              <h1 class="text-left mb-7">Create Bid</h1>
              <a to="" @click="createBid" class="text-decoration-none">
                <div class="bid-box">
                  <div class="icon-box pa-8">
                    <img :src="require('@/assets/images/bids/FileX.png')">
                  </div>
                  <div class="title-box pa-8 text-left">
                    <h4 class="font-weight-bold">Create a new Bid</h4>
                    <small>RFx: RFP or RFI</small>
                  </div>
                </div>
              </a>
            </v-col>
            <v-col cols="12" md="4" class="mt-16">
              <router-link to="/templates" class="text-decoration-none">
                <div class="bid-box">
                  <div class="icon-box pa-8">
                    <img :src="require('@/assets/images/bids/FileArrowDown.png')">
                  </div>
                  <div class="title-box pa-8 text-left">
                    <h4 class="font-weight-bold">Create Bid from Template</h4>
                    <small>RFx: RFP or RFI</small>
                  </div>
                </div>
              </router-link>
            </v-col>
          </v-row>
        </div>
      </div>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: 'CreateBidTemplate',
  components: {
  },

  data() {
    return {
      isHidden: false,
      users: '',
    };
  },
  computed: {
    showSideBar() {
      return this.$store.getters.g_sideBarOpen;
    },
    activityPanel() {
      return this.$store.getters.g_activityPanel;
    },
    userDatas() {
      return this.$store.getters.userInfo;
    },
  },
  methods: {
    createBid() {
      this.$store.state.bid.bidData.serial = '';
      this.$store.state.bid.bidData.id = '';
      this.$store.state.bid.bidData.status = '';
      this.$store.state.bid.bidData.statusType = '';
      this.$store.state.bid.bidData.attachments = '';
      this.$store.state.bid.bidData.attachment = '';
      this.$store.state.bid.bidData.invitedSuppliers = '';
      this.$store.state.bid.bidData.invitedNewSuppliers = '';
      this.$store.state.bid.bidData.invitedTeamMembers = '';
      this.$store.state.bid.bidData.lineItems = '';
      this.$store.state.bid.bidData.questions = '';
      this.$store.state.bid.bidData.userId = '';
      this.$store.commit('setBidTitle', '');
      this.$store.commit('setBidType', '');
      this.$store.commit('setBidDueDate', '');
      this.$store.commit('setBidDueTime', '');
      this.$store.commit('setBidRegions', '');
      this.$store.commit('setBidEnabled', '');
      this.$store.commit('setBidDescription', [{ body: '' }]);
      this.$store.commit('setInvitedTeamMembers', null);
      this.$store.commit('setInvitedSuppliersData', null);
      this.$store.commit('setInvitedNewSuppliers', null);
      this.$store.commit('setBidlines', null);
      this.$store.commit('setAttachement', null);
      this.$store.commit('setAttachData', null);
      this.$store.commit('setQuestions', null);
      this.$store.commit('setDraftBidsList', null);
      this.$store.commit('setDraftTime', null);
     
      this.$router.push('/create-bid');
    },
  },
  mounted() {
    document.title = 'Create Bid - BidOut';
    this.users = this.$store.getters.userInfo;
  },
};
</script>
<style scoped lang="scss">

</style>
