<template>
  <v-col class="my-7 pa-0 broadcast-tab" align="start">
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
import { mapActions } from "vuex";

export default {
  data() {
    return {
      messageContent: "",
    };
  },
  computed: {
    bidId() {
      return this.$store.getters.bidData.bidData.id;
    },
  },
  methods: {
    ...mapActions(["sendBroadcast"]),
    broadcastMessage() {
      this.sendBroadcast({
        messageContent: this.messageContent,
        bidId: this.bidId,
      });
    },
  },
};
</script>
