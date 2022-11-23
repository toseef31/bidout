<template>

  <v-col class="my-7 pa-0 broadcast-tab" align="start">
    <v-alert type="success"  v-show="showBroadCastAlert" class="mx-5">
      You are successfully broadcast a message!
    </v-alert>
    <v-alert type="error"  v-show="showErrorBroadCast" class="mx-5">
      Broadcasting a message was failed!
    </v-alert>
    <div class="px-5">
      <div class="title-detail mb-2">Bid Broadcast</div>
      <div class="broadcast-desc">
        This Bid Broadcast sends a notice to all invited service providers
        (regardless of their bid status) to both their emails and via internal
        Bidout chat system.
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
          class="text-capitalize white--text font-weight-bold save-button px-9"
          @click="broadcastMessage"
          large
          >Send Broadcast</v-btn
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
    };
  },
  computed: {
    bidId() {
      return this.$store.getters.bidData.bidData.id;
    },
    showBroadCastAlert() {
      return this.$store.getters.showSuccessBroadcast;
    },
    showErrorBroadCast() {
      return this.$store.getters.showErrorBroadcast;
    },
  },
  methods: {
    ...mapActions(['sendBroadcast']),
    broadcastMessage() {
      this.sendBroadcast({
        messageContent: this.messageContent,
        bidId: this.bidId,
      });

      this.messageContent = '';
    },
  },
};
</script>
