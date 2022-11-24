<template>
  <div>
    <v-list two-line class="pb-0">
      <v-list-item-group v-model="selectedUser" active-class="grey--text">
        <v-list-item
          v-for="(list, index) in conversationsList"
          @click="openChat(list)"
          :class="{
            'grey--text v-list-item--active':
              list._id === chatData.conversation._id,
          }"
          :key="index"
        >
          <template>
            <img
              v-if="list.image != null"
              width="88"
              height="auto"
              class="img-class"
              :src="list.image"
            />
            <v-list-item-icon v-else align-center>
              <v-icon size="40">mdi-domain</v-icon>
            </v-list-item-icon>
            <v-list-item-content align-center>
              <v-list-item-title v-text="list.company"></v-list-item-title>
              <v-list-item-subtitle>
                <a href="#" class="text-decoration-underline"
                  >View Profile</a
                ></v-list-item-subtitle
              >
            </v-list-item-content>
          </template>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import _ from "lodash";

export default {
  data() {
    return {
      bidId: "",
      chatData: "",
      selectedUser: null,
      conversationId: "",
    };
  },
  computed: {
    conversationsList() {
      return _.orderBy(
        this.$store.getters.bidConversations,
        "latestMessage",
        "desc"
      );
    },
  },
  methods: {
    ...mapActions(["getBidAllConversations"]),

    openChat(conversation) {
      this.chatData = {
        conversation,
      };

      this.conversationId = conversation._id;

      this.$emit("chatData", this.chatData);
      this.$emit("openC", conversation);
    },
  },
  beforeMount() {
    this.bidId = this.$store.getters.bidData.bidData.id;
  },
  async mounted() {
    await this.getBidAllConversations(this.bidId);

    const convo = await _.orderBy(
      this.$store.getters.bidConversations,
      "latestMessage",
      "desc"
    )[0];

    if (convo) {
      await this.openChat(convo);
    }
  },
};
</script>
