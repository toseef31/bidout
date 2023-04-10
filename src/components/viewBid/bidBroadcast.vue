<template>

  <v-col class="my-7 pa-0 broadcast-tab" align="start">
    <v-alert type="success"  v-show="showBroadCastAlert" class="mx-5">
      You are successfully broadcast a message!
    </v-alert>
    <v-alert type="error"  v-show="showErrorBroadCast" class="mx-5">
      Broadcasting a message was failed. Please Try again!
    </v-alert>

    <v-alert type="error"  v-show="showSupplierBroadcastError" class="mx-5">
      There are currently no suppliers to broadcast a message to.
    </v-alert>
    <div class="px-5">
      <div class="title-detail mb-2">Bid Broadcast</div>
      <div class="broadcast-desc">
        This Bid Broadcast sends a notice to all invited service providers
        (regardless of their bid status) to both their emails and via internal
        BidOut chat system.
      </div>

      <v-textarea
        placeholder="Type here..."
        single-line
        outlined
        type="text"
        v-model="messageContent"
      >
      </v-textarea>

      <div class="text-center">
        <v-btn
          color="#0D9648"
          height="56"
          width="220"
          class="text-capitalize white--text font-weight-bold save-button px-9"
          @click="broadcastMessage"
          :disabled="showLoading"
          large

          >
          <v-progress-circular
          v-if="showLoading"
      indeterminate
      color="#0D9648"
    ></v-progress-circular>
          <div v-else>Send Broadcast</div></v-btn
        >
      </div>
    </div>
  </v-col>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      messageContent: '',
      loading: false,
    };
  },
  computed: {
    bidId() {
      return this.$store.getters.bidViewData.bidData.id;
    },
    showBroadCastAlert() {
      return this.$store.getters.showSuccessBroadcast;
    },
    showErrorBroadCast() {
      return this.$store.getters.showErrorBroadcast;
    },
    showSupplierBroadcastError() {
      return this.$store.getters.showSupplierBroadcastError;
    },
    showLoading() {
      return this.loading;
    },
    loggedInUser() {
      return this.$store.getters.userInfo;
    },
  },
  methods: {
    ...mapActions(['sendBroadcast']),
    async broadcastMessage() {
      this.loading = true;
      await this.sendBroadcast({
        messageContent: this.messageContent,
        bidId: this.bidId,
        buyerUserId: this.loggedInUser.id,
      });
      this.loading = false;
      this.messageContent = '';
    },
  },
};
</script>
