<template>
  <v-row fill-height align="center" class="loading-chat" v-if="loading">
    <v-col cols="12">
      <v-progress-circular
        :width="3"
        color="green"
        indeterminate
      ></v-progress-circular>
    </v-col>
  </v-row>
  <v-row class="bid-chat-row mt-4" fill-height no-gutters v-else>
    <v-col cols="12" sm="4" md="4" class="available-data pt-6">
      <Conversation @chatData="changeC($event)" @openC="openChat" />
    </v-col>
    <v-col cols="12" sm="8" md="8" v-show="showMsgBlock">
      <div class="message-area">
        <div class="msg-header px-5 pb-5">
          <v-row align="center">
            <v-col cols="12" md="6">
              <div class="company-title text-left" v-if="chatData">
                <h4>{{ chatData.conversation.company }}</h4>

                <p class="mb-0">
                  <a href="#" class="text-decoration-underline">View Profile</a>
                </p>
              </div>
            </v-col>
            <v-col cols="12" md="6">
              <div class="msg-options d-flex mt-2 justify-end">
                <div class="search">
                  <v-text-field
                    v-model="searchMessage"
                    type="text"
                    align-center
                    outlined
                    class="pt-0 mt-0"
                    placeholder="Search this conversation"
                  >
                    <template v-slot:prepend>
                      <v-icon>mdi-magnify</v-icon>
                    </template>
                  </v-text-field>
                </div>
                <div class="toggle-btn ml-5">
                  <v-btn fab small color="#0d964814" class="active-btn">
                    <v-icon dark> mdi-dots-horizontal </v-icon>
                  </v-btn>
                </div>
              </div>
            </v-col>
          </v-row>
        </div>
        <div class="messages-section" ref="messagesSection">
          <vue-dropzone
            ref="myVueDropzone"
            :class="{ dropzoneActive: uploadDrag }"
            @ondragleave="dragLeave(event)"
            id="dropzone"
            @vdropzone-success="afterComplete"
            v-on:vdropzone-sending="dragfileupload"
            :options="dropzoneOptions"
            @dragstart="startDrag($event, item)"
            acceptedFiles="image/*,application/pdf"
          >
          </vue-dropzone>
          <v-list
            two-line
            class="own-user message-list"
            v-for="message in messagesList"
            :key="message._id"
          >
            <v-list-item-group>
              <template>
                <v-list-item class="text-left px-5" active-class="white--text">
                  <template>
                    <v-list-item-content>
                      <v-list-item-title>{{
                        message.sender.name
                      }}</v-list-item-title>
                      <template v-if="message.attachment">
                        <a
                          :href="message.attachment"
                          target="_blank"
                          v-if="get_url_extension(message.attachment) == 'pdf'"
                          ><v-img
                            :src="require('@/assets/images/chat/pdf.jpg')"
                            max-height="50px"
                            max-width="50px"
                            class="mt-2"
                          ></v-img
                        ></a>
                        <v-img
                          v-else
                          :src="message.attachment"
                          max-height="125px"
                          max-width="245px"
                          class="mt-2"
                        ></v-img>
                      </template>
                      <v-list-item-subtitle class="text--primary">{{
                        message.content
                      }}</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action class="mt-n6">
                      <v-list-item-action-text>{{
                        istoday(message.updatedAt)
                      }}</v-list-item-action-text>
                    </v-list-item-action>
                  </template>
                </v-list-item>
              </template>
            </v-list-item-group>
          </v-list>
        </div>
        <div class="message-send-area px-5 pt-5">
          <span class="fileName" v-if="filename">{{ filename }}</span>
          <v-row>
            <v-col cols="12" sm="10" md="10">
              <div class="msg-text-box">
                <v-textarea
                  solo
                  name="input-7-4"
                  placeholder="Message here ..."
                  rows="3"
                  v-model="message"
                  @keyup.enter="messageSend"
                ></v-textarea>
              </div>
            </v-col>
            <v-col cols="12" sm="2" md="2">
              <div class="msg-send-btn mb-2">
                <v-btn
                  block
                  tile
                  height="43px"
                  color="#0D9648"
                  @click="messageSend"
                  >Send</v-btn
                >
                <label
                  for="attach-file"
                  class="mt-2 attach-btn d-flex justify-center align-center"
                >
                  <input
                    id="attach-file"
                    type="file"
                    class="d-none"
                    truncate-length="8"
                    ref="msgFile"
                    @change="fileUpload"
                  />
                  <v-img
                    :src="require('@/assets/images/chat/attach.png')"
                    max-width="28px"
                    height="32px"
                  ></v-img>
                </label>
              </div>
            </v-col>
          </v-row>
        </div>
      </div>
    </v-col>
  </v-row>
</template>
<script>
import vueDropzone from "vue2-dropzone";
import moment from "moment-timezone";
import { mapActions } from "vuex";
import Conversation from "@/components/viewBid/BidChat/Conversation.vue";

export default {
  components: {
    vueDropzone,
    Conversation,
  },
  data() {
    return {
      user: "",
      conversationId: "",
      message: "",
      filename: "",
      uploadDrag: false,
      fileExt: "",
      chatData: "",
      searchMessage: "",
      loading: true,
      showMsgBlock: false,
      dropzoneOptions: {
        url: `${import.meta.env.VITE_API_BASE_URL}/chat/sendMessage`,
        thumbnailWidth: 100,
        thumbnailHeight: 100,
        maxFiles: 10,
        maxFilesize: 420,
        chunking: true,
        headers: { "My-Awesome-Header": "header value" },
      },
    };
  },

  computed: {
    messagesList() {
      if (this.searchMessage) {
        return this.$store.getters.messages.filter((item) =>
          this.searchMessage
            .toLowerCase()
            .split(" ")
            .every((v) => item.content.toLowerCase().includes(v))
        );
      }
      return this.$store.getters.messages;
    },
  },
  methods: {
    ...mapActions(["getAllMessages", "lastMessageRead", "sendMessage"]),

    openChat(conversation) {
      this.chatData = {
        conversation,
      };

      this.conversationId = conversation._id;
      const ids = {
        userId: this.user.id,
        conversationId: this.conversationId,
      };
      this.getAllMessages(ids);

      var container = this.$refs.messagesSection;
      setTimeout(() => {
        container.scrollTop = container.scrollHeight;
      }, 4000);
      this.lastMessageRead(ids);
      var container = this.$refs.messagesSection;
      setTimeout(() => {
        container.scrollTop = container.scrollHeight;
      }, 1000);
    },
    changeC(data) {
      this.chatData = data;
      this.showMsgBlock = true;
    },
    fileUpload() {
      this.filename = this.$refs.msgFile.files[0].name;
    },
    dragfileupload(file, xhr, formData) {
      formData.append("conversationId", this.conversationId);
      formData.append("sender[id]", this.user.id);
      formData.append(
        "sender[name]",
        `${this.user.firstName} ${this.user.lastName}`
      );
      formData.append("sender[company]", this.chatData.conversation.company);
      formData.append("sender[profilePicture]", this.user.image);
      formData.append("content", this.message);
    },
    afterComplete(file, response) {
      this.message = "";
      this.$refs.msgFile.value = null;
      this.$refs.myVueDropzone.removeFile(file);
      document.getElementById("dropzone").style.display = "none";
      const ids = {
        userId: this.user.id,
        conversationId: response.message.conversationId,
      };
      this.getAllMessages(ids);
    },
    messageSend() {
      this.filename = "";

      const chat_file = this.$refs.msgFile.files;
      if (chat_file.length > 0) {
        this.filename = chat_file[0].name;
      }

      const data = {
        conversationId: this.conversationId,
        sender: {
          name: `${this.user.firstName} ${this.user.lastName}`,
          id: this.user.id,
          company: this.chatData.conversation.company,
          profilePicture: this.user.image,
        },
        content: this.message,
        attachment: chat_file.length > 0 ? chat_file[0] : null,
      };

      if (data.content || data.attachment) {
        this.sendMessage(data);
      }
      const container = this.$refs.messagesSection;
      setTimeout(() => {
        container.scrollTop = container.scrollHeight;
      }, 500);
      this.message = "";
      this.filename = "";
    },
    uploadfile(event) {
      this.filename = "";
      const chat_file = this.$refs.msgFile.files;
      if (chat_file.length > 0) {
        this.filename = chat_file[0].name;
      }
      const data = {
        conversationId: this.conversationId,
        sender: {
          name: `${this.user.firstName} ${this.user.lastName}`,
          id: this.user.id,
          company: this.chatData.conversation.company,
          profilePicture: this.user.image,
        },
        content: this.message,
        attachment: chat_file.length > 0 ? chat_file[0] : null,
      };
      this.sendMessage(data);
      const container = this.$refs.messagesSection;
      setTimeout(() => {
        container.scrollTop = container.scrollHeight;
      }, 500);
      this.message = "";
      this.filename = "";
    },
    istoday(date) {
      return moment(date).calendar();
    },
    get_url_extension(url) {
      return url.split(/[#?]/)[0].split(".").pop().trim();
    },
    msgShow() {
      setTimeout(() => {
        this.loading = false;
      }, 2000);
    },
  },
  beforeMount() {
    this.user = this.$store.getters.userInfo;
  },
  mounted() {
    this.msgShow();

    document.addEventListener("dragenter", (e) => {
      if (
        e.target.className == "message-area" ||
        e.target.className == "messages-section" ||
        e.target.className == "v-list-item__content" ||
        e.target.className == "v-list-item__title" ||
        e.target.className ==
          "v-list own-user message-list v-sheet theme--light v-list--two-line" ||
        e.target.className == "v-item-group theme--light v-list-item-group" ||
        e.target.className == "message-send-area" ||
        e.target.className == "row" ||
        e.target.className == "col-sm-10 col-md-10 col-12" ||
        e.target.className == "msg-text-box"
      ) {
        document.getElementById("dropzone").style.display = "block";
      } else {
        document.getElementById("dropzone").style.display = "none";
      }
    });
  },
};
</script>
