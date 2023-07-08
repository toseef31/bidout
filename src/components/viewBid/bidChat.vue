<template>
  <v-row fill-height align="center" class="loading-chat" v-if="isLoading">
    <v-col cols="12">
      <v-progress-circular :width="3" color="green" indeterminate></v-progress-circular>
    </v-col>
  </v-row>
  <v-row class="bid-chat-row mt-2" fill-height no-gutters v-else>

    <div v-if="conversationsList.length === 0 && getUserType === 'buyer'" class="text-center c-title-detail">There are
      currently no suppliers included on this bid, please <router-link to="#" class="text-decoration-underline">edit
        this bid </router-link> to add suppliers to begin chat conversations. </div>

    <div v-if="conversationsList.length === 0 && getUserType === 'supplier'" class="text-center c-title-detail">
      Only the buyer can initiate chat message, once initiated by the buyer,
      you will be able to see the message here.
    </div>

    <v-col v-if="conversationsList && conversationsList.length > 0" cols="12" sm="5" md="5" class="available-data">
      <v-list two-line class="pb-0">
        <v-list-item-group v-model="selectedUser" active-class="grey--text">
          <v-list-item v-for="(list, index) in conversationsList" @click="openChat(list)" :class="{
            'grey--text v-list-item--active':
              list._id === conversationId,
          }" :key="index">
            <template>
              <v-img v-if="list.company && list.company.image" max-height="26.67px" max-width="100px" width="100px"
                :src="list.company.image" />
              <div v-else class="icon-class">
                <v-icon size="40">mdi-domain</v-icon>
              </div>

              <v-list-item-content align-center>
                <v-list-item-title v-text="getName(list)"></v-list-item-title>
                <v-list-item-subtitle v-if="checkIfCompanyOfs(list.company) && getUserType === 'buyer'">
                  <router-link :to="list.company && list.company.slug ? '/company/' + list.company.slug : ''"
                    class="text-decoration-underline">View Profile</router-link></v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-list-item-action-text>{{
                  list.latestMessage ? isToday(list.latestMessage) :
                  isToday(list.createdAt)
                }}</v-list-item-action-text>
              </v-list-item-action>
            </template>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-col>

    <v-col cols="12" sm="7" md="7" v-if="conversationsList.length !== 0" class="d-sm-block">
      <div class="message-area">
        <div class="msg-header px-5 pb-5">
          <v-row align="center">
            <v-col cols="12" md="6">
              <div class="company-title text-left" v-if="chatData">
                <h4>{{ getConversationName(chatData.conversation) }}</h4>

                <p class="mb-0" v-if="checkIfCompanyOfs(chatData.conversation.company) && getUserType === 'buyer'">
                  <router-link
                    :to="(chatData.conversation.company && chatData.conversation.company.slug ? '/company/' + chatData.conversation.company.slug : '')"
                    class="text-decoration-underline">View Profile</router-link>
                </p>
              </div>
            </v-col>
            <v-col cols="12" md="6">
              <div class="msg-options d-flex mt-2 justify-end">
                <div class="search">
                  <v-text-field v-model="searchMessage" type="text" align-center outlined class="pt-0 mt-0"
                    placeholder="Search this conversation">
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
          <vue-dropzone ref="myVueDropzone" :class="{ dropzoneActive: uploadDrag }" @ondragleave="dragLeave(event)"
            id="dropzone" @vdropzone-success="afterComplete" v-on:vdropzone-sending="dragfileupload"
            :options="dropzoneOptions" @dragstart="startDrag($event, item)" acceptedFiles="image/*,application/pdf">
          </vue-dropzone>
          <v-list two-line class="own-user message-list" v-for="message in messagesList" :key="message._id">
            <v-list-item-group>
              <template>
                <v-list-item class="text-left px-5" active-class="white--text">
                  <template>
                    <v-list-item-content>
                      <v-list-item-title>{{
                        message.sender && `${message.sender.firstName} ${message.sender.lastName}`
                      }}</v-list-item-title>
                      <template v-if="message.attachment">
                        <a :href="message.attachment[0].url" class="text-decoration-none" target="_blank"
                          v-if="get_url_extension(message.attachment[0].url) === 'pdf'"><v-img
                            :src="require('@/assets/images/chat/pdf.jpg')" max-height="50px" max-width="50px"
                            class="mt-2 mb-2"></v-img>{{ getFileName(message.attachment[0].fileName) }}</a>
                        <a :href="message.attachment[0].url" class="text-decoration-none" target="_blank"
                          v-else-if="get_url_extension(message.attachment[0].url) === 'xlsx' || get_url_extension(message.attachment[0].url) === 'xls' || get_url_extension(message.attachment[0].url) === 'csv'"><v-img
                            :src="require('@/assets/images/chat/excel.png')" max-height="50px" max-width="50px"
                            class="mt-2 mb-2"></v-img>{{ getFileName(message.attachment[0].fileName) }}</a>
                        <a :href="message.attachment[0].url" class="text-decoration-none" target="_blank"
                          v-else-if="get_url_extension(message.attachment[0].url) === 'doc' || get_url_extension(message.attachment[0].url) === 'docx' || get_url_extension(message.attachment[0].url) === 'txt'"><v-img
                            :src="require('@/assets/images/chat/doc.png')" max-height="50px" max-width="50px"
                            class="mt-2 mb-2"></v-img>{{ getFileName(message.attachment[0].fileName) }}</a>
                        <a :href="message.attachment[0].url" class="text-decoration-none" target="_blank"
                          v-else-if="get_url_extension(message.attachment[0].url) === 'ppt' || get_url_extension(message.attachment[0].url) === 'pptx'"><v-img
                            :src="require('@/assets/images/chat/ppt.png')" max-height="50px" max-width="50px"
                            class="mt-2 mb-2"></v-img>{{ getFileName(message.attachment[0].fileName) }}</a>
                        <a :href="message.attachment[0].url" class="text-decoration-none" target="_blank"
                          v-else-if="get_url_extension(message.attachment[0].url) === 'zip' || get_url_extension(message.attachment[0].url) === 'rar' || get_url_extension(message.attachment[0].url) === 'tar' || get_url_extension(message.attachment[0].url) === '7z' || get_url_extension(message.attachment[0].url) === 'gz'"><v-img
                            :src="require('@/assets/images/chat/zip.png')" max-height="50px" max-width="50px"
                            class="mt-2 mb-2"></v-img>{{ getFileName(message.attachment[0].fileName) }}</a>
                        <video class="chat-video"
                          v-else-if="get_url_extension(message.attachment[0].url) == 'mp4' || get_url_extension(message.attachment[0].url) === 'webm' || get_url_extension(message.attachment[0].url) === 'mov' || get_url_extension(message.attachment[0].url) === 'avi'"
                          :src="message.attachment[0].url" :autoplay="false" :controls="true" :loop="true" height="300"
                          :style="{ width: '500px' }"></video>
                        <a :href="message.attachment[0].url" target="_blank" v-else>
                          <v-img :src="message.attachment[0].url" max-height="125px" max-width="245px" class="mt-2"></v-img>
                        </a>
                      </template>
                      <v-list-item-subtitle class="text--primary">{{
                        message.content
                      }}</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-list-item-action-text>{{ isToday(message.createdAt) }}</v-list-item-action-text>
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
                <v-textarea solo name="input-7-4" placeholder="Message here ..." rows="3" v-model="message"
                  @keyup.enter="messageSend"></v-textarea>
              </div>
            </v-col>
            <v-col cols="12" sm="2" md="2">
              <div class="msg-send-btn mb-2">
                <v-btn block tile height="43px" color="#0D9648" @click="messageSend">Send</v-btn>
                <label for="attach-file" class="mt-2 attach-btn d-flex justify-center align-center">
                  <input id="attach-file" type="file" class="d-none" truncate-length="8" ref="msgFile"
                    @change="fileUpload" />
                  <v-img :src="require('@/assets/images/chat/attach.png')" max-width="28px" height="32px"></v-img>
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
import vueDropzone from 'vue2-dropzone';
import moment from 'moment-timezone';
import _ from 'lodash';
import { mapActions } from 'vuex';

export default {
  components: {
    vueDropzone,
  },
  data() {
    return {
      user: '',
      bidId: '',
      conversationId: '',
      message: '',
      filename: '',
      uploadDrag: false,
      fileExt: '',
      chatData: '',
      searchMessage: '',
      loading: true,
      showMsgBlock: false,
      selectedUser: null,
      pageLoading: true,
      dropzoneOptions: {
        url: `${import.meta.env.VITE_API_BASE_URL}/v2/chat/sendMessage`,
        thumbnailWidth: 100,
        thumbnailHeight: 100,
        maxFiles: 10,
        maxFilesize: 420,
        chunking: true,
        headers: { 'My-Awesome-Header': 'header value' },
      },
    };
  },

  computed: {
    messagesList() {
      if (this.searchMessage) {
        return this.$store.getters.messages.filter((item) => this.searchMessage
          .toLowerCase()
          .split(' ')
          .every((v) => item.content.toLowerCase().includes(v)));
      }
      return this.$store.getters.messages;
    },
    isLoading() {
      return this.pageLoading;
    },
    conversationsList() {
      if (this.$store.getters.bidConversations) {
        return _.orderBy(
          this.$store.getters.bidConversations,
          'latestMessage',
          'desc',
        );
      } return [];
    },
    getUserType() {
      return this.$store.getters.userType;
    },
  },
  methods: {
    ...mapActions(['getAllMessages', 'lastMessageRead', 'sendMessage', 'getBidAllConversations']),
    getName(conversation) {
      return conversation.displayName;
    },
    openChat(conversation) {
      this.chatData = {
        conversation,
      };
      this.conversationId = conversation._id;

      const ids = {
        userId: this.user._id,
        conversationId: this.conversationId,
        bidId: this.bidId,
      };
      this.getAllMessages(ids);
      var container = this.$refs.messagesSection;
      setTimeout(() => {
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      }, 4000);
      this.lastMessageRead(ids);
      var container = this.$refs.messagesSection;
      setTimeout(() => {
        if (container) container.scrollTop = container.scrollHeight;
      }, 1000);
    },
    fileUpload() {
      this.filename = this.$refs.msgFile.files[0].name;
    },
    dragfileupload(file, xhr, formData) {
      formData.append('conversationId', this.conversationId);
      formData.append('sender[id]', this.user._id);
      formData.append(
        'sender[name]',
        `${this.user.firstName} ${this.user.lastName}`,
      );
      formData.append('sender[company]', this.chatData.conversation.company.companyName);
      formData.append('sender[profilePicture]', this.user.image);
      if (this.message && this.message !== '') {
        formData.append('content', this.message);
      } else {
        formData.append("content", ' ');
      }
    },
    afterComplete(file, response) {
      this.message = '';
      this.$refs.msgFile.value = null;
      this.$refs.myVueDropzone.removeFile(file);
      if (document.getElementById('dropzone')) {
        document.getElementById('dropzone').style.display = 'none';
      }
      const ids = {
        userId: this.user._id,
        conversationId: response.message.conversation,
        bidId: this.bidId,
      };
      this.getAllMessages(ids);
    },
    messageSend() {
      this.filename = '';

      const chat_file = this.$refs.msgFile.files;
      if (chat_file.length > 0) {
        this.filename = chat_file[0].name;
      }

      const data = {
        conversationId: this.conversationId,
        sender: {
          name: `${this.user.firstName} ${this.user.lastName}`,
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          id: this.user._id,
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
      this.message = '';
      this.$refs.msgFile.value = null;
      this.filename = '';
    },
    isToday(date) {
      const zone = moment.tz.guess();
      return moment(date).tz(zone).calendar();
    },
    get_url_extension(url) {
      if (url !== undefined) {
        const lastDotIndex = url.lastIndexOf('.');
        // Extract the file extension
        const fileExtension = url.slice(lastDotIndex + 1);
        return fileExtension;
      }
    },
    getFileName(name) {
      const filename = decodeURIComponent(name);
      return filename;
    },
    getConversationName(conversation) {
      return conversation.displayName;
    },
    checkIfCompanyOfs(company) {
      if (company && company.contracts) {
        return company.contracts.find((contract) => contract.contractType === 'ofs' || contract.contractType === 'ofs-premium');
      }
      return false;
    },
  },
  async created() {
    this.user = this.$store.getters.userInfo;
    this.bidId = this.$store.getters.bidViewData.bidData._id;
    await this.getBidAllConversations({ bidId: this.bidId, userId: this.user._id });

    this.pageLoading = false;
    const convo = await _.orderBy(
      this.$store.getters.bidConversations,
      'latestMessage',
      'desc',
    )[0];

    if (convo) {
      await this.openChat(convo);
    }
  },
};
</script>
