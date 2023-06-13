<template>
  <v-row fill-height align="center" v-if="loaderPage">
    <v-col cols="12">
      <v-progress-circular
        :width="3"
        color="green"
        indeterminate
      ></v-progress-circular>
    </v-col>
  </v-row>
  <v-row class="chat-module pa-0 ma-0" v-else>
    <v-col  class="pa-0 pr-sm-3"
      :class="[
        showSideBar ? 'col-md-12 col-12 col-sm-12' : 'mid-content-collapse',
        activityPanel ? 'd-sm-block' : 'd-md-block',
      ]"
      v-show="!activityPanel"
    >
      <div class="mid-content">
        <div class="content-section">
          <v-snackbar
            v-model="snackbar"
            :timeout="timeout"
            color="#0D9648"
            absolute
            top
          >
            {{ createMsg }}
            <template v-slot:action="{ attrs }">
              <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
                Close
              </v-btn>
            </template>
          </v-snackbar>
          <v-row>
            <v-col
              cols="12"
              sm="4"
              md="4"
              class="userCol d-sm-block"
              v-if="userList"
            >
              <div class="userlist-col">
                <chat-leftsidebar></chat-leftsidebar>
                <conversations-section
                  @ChatDatas="ChangeT($event)"
                  @callTest="openChat"
                  @membersData="memberT($event)"
                  :conversationsIds="conversationId"
                ></conversations-section>
              </div>
            </v-col>
            <v-col
              cols="12"
              sm="8"
              md="8"
              class="pl-0 pr-2 pt-0 d-sm-block"
              v-show="showMsgBlock"
            >
              <div class="message-area">
                <!-- Message Header -->
                <div class="msg-header pa-5">
                  <v-icon class="back-arrow" v-if="backArrow" @click="closeChat"
                    >mdi-chevron-left</v-icon
                  >
                  <v-row align="center">
                    <v-col cols="12" md="6">
                      <div class="title-section text-left">
                        <h4 v-if="chatData.group" class="mb-0 font-weight-bold">{{ getConversationName(chatData.group) }}</h4>
                        <template v-if="chatData.group">
                          <template v-if="chatData.group.isBid == true && chatData.group.bid !== null">
                            <p class="sub-title mb-0 font-weight-regular">
                              {{ chatData.group.bid.title }}
                            </p>
                            <p class="sub-title mb-0">
                              Bid #{{ chatData.group.bid.serial }}
                            </p>
                          </template>
                        </template>
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
                          <v-btn
                            fab
                            small
                            color="#0d964814"
                            @click="isChatMenu = !isChatMenu"
                            :class="{ 'active-btn': isChatMenu }"
                          >
                            <v-icon dark> mdi-dots-horizontal </v-icon>
                          </v-btn>
                          <div v-show="isChatMenu">
                            <v-card
                              class="mx-auto chat-menu-card"
                              min-width="290"
                              tile
                              outlined
                            >
                              <v-list class="pa-0">
                                <v-list-item-group color="success">
                                  <v-list-item
                                    v-for="(menu, i) in toggleMenu"
                                    :key="i"
                                    @click="chatActions(chatData.group._id)"
                                  >
                                    <v-list-item-icon class="mr-2 my-3">
                                      <v-icon
                                        color="#0D9648"
                                        v-text="menu.icon"
                                      ></v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content
                                      align-start
                                      color="#0D9648"
                                      class="pa-0 text-left"
                                    >
                                      <v-list-item-title
                                        v-text="menu.text"
                                      ></v-list-item-title>
                                    </v-list-item-content>
                                  </v-list-item>
                                </v-list-item-group>
                              </v-list>
                            </v-card>
                          </div>
                        </div>
                      </div>
                    </v-col>
                  </v-row>
                </div>
                <!-- Message Area -->
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
                        <v-list-item
                          class="text-left px-5"
                          active-class="white--text"
                        >
                          <template>
                            <v-list-item-content>
                              <v-list-item-title>{{
                                `${message.sender.firstName} ${message.sender.lastName}`
                              }}</v-list-item-title>
                              <template v-if="message.attachment !== null">
                                <a
                                  :href="message.attachment[0].url"
                                  target="_blank"
                                  v-if="
                                    get_url_extension(message.attachment[0].url) == 'pdf'
                                  "
                                  ><v-img
                                    :src="require('@/assets/images/chat/pdf.jpg')"
                                    max-height="50px"
                                    max-width="50px"
                                    class="mt-2"
                                  ></v-img
                                ></a>
                                <a
                                  :href="message.attachment[0].url"
                                  target="_blank"
                                  v-else-if="get_url_extension(message.attachment[0].url) == 'xlsx' || get_url_extension(message.attachment[0].url) == 'xls' || get_url_extension(message.attachment[0].url) == 'csv'">
                                  <v-img
                                  :src="require('@/assets/images/chat/excel.png')"
                                  max-height="50px"
                                  max-width="50px"
                                  class="mt-2"></v-img>
                                </a>
                                <a
                                  :href="message.attachment[0].url"
                                  target="_blank"
                                  v-else-if="get_url_extension(message.attachment[0].url) == 'doc' || get_url_extension(message.attachment[0].url) == 'docx' || get_url_extension(message.attachment[0].url) == 'txt'">
                                  <v-img
                                  :src="require('@/assets/images/chat/doc.png')"
                                  max-height="50px"
                                  max-width="50px"
                                  class="mt-2"></v-img>
                                </a>
                                <a
                                  :href="message.attachment[0].url"
                                  target="_blank"
                                  v-else-if="get_url_extension(message.attachment[0].url) == 'ppt' || get_url_extension(message.attachment[0].url) == 'pptx'">
                                  <v-img
                                  :src="require('@/assets/images/chat/ppt.png')"
                                  max-height="50px"
                                  max-width="50px"
                                  class="mt-2"></v-img>
                                </a>
                                <a :href="message.attachment[0].url"
                                  target="_blank"
                                  v-else-if="get_url_extension(message.attachment[0].url) == 'zip' || get_url_extension(message.attachment[0].url) == 'rar' || get_url_extension(message.attachment[0].url) == 'tar' || get_url_extension(message.attachment[0].url) == '7z' || get_url_extension(message.attachment[0].url) == 'gz'"><v-img
                                  :src="require('@/assets/images/chat/zip.png')"
                                  max-height="50px"
                                  max-width="50px"
                                  class="mt-2"></v-img>
                                </a>
                                <video class="chat-video"
                                  v-else-if="get_url_extension(message.attachment[0].url) == 'mp4' || get_url_extension(message.attachment[0].url) == 'webm' || get_url_extension(message.attachment[0].url) == 'mov' || get_url_extension(message.attachment[0].url) == 'avi'"
                                  :src="message.attachment[0].url"
                                  :autoplay="false"
                                  :controls="true"
                                  :loop="true"
                                  height="300"
                                  :style="{ width: '500px' }"
                                ></video>
                                <a
                                  :href="message.attachment[0].url"
                                  target="_blank" v-else>
                                  <v-img
                                    :src="message.attachment[0].url"
                                    max-height="125px"
                                    max-width="245px"
                                    class="mt-2"
                                  ></v-img>
                                </a>
                              </template>
                              <v-list-item-subtitle class="text--primary">{{
                                message.content
                              }}</v-list-item-subtitle>
                            </v-list-item-content>
                            <v-list-item-action>
                              <v-list-item-action-text>{{
                                istoday(message.createdAt)
                              }}</v-list-item-action-text>
                            </v-list-item-action>
                          </template>
                        </v-list-item>
                      </template>
                    </v-list-item-group>
                  </v-list>
                </div>
                <!-- Message Send Area -->
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
                      <div class="msg-send-btn">
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
                <!-- End Message Send Area -->
              </div>
            </v-col>
          </v-row>
        </div>
      </div>
    </v-col>
  </v-row>
</template>
<script>
import _ from 'lodash';
import vueDropzone from 'vue2-dropzone';
import VueMoment from 'vue-moment';
import moment from 'moment-timezone';
import { mapActions } from 'vuex';
import ConversationsSection from '../components/Chat/ConversationsSection.vue';
import ChatLeftsidebar from '../components/Chat/ChatLeftSideBar.vue';

export default {
  name: 'Chat',
  components: {
    vueDropzone,
    ChatLeftsidebar,
    ConversationsSection,
  },
  data() {
    return {
      isActive: false,
      isHidden: false,
      isChatMenu: false,
      isAddUser: false,
      showMsgBlock: true,
      backArrow: false,
      userList: true,
      dialog: false,
      searchMessage: '',
      message: '',
      filename: '',
      chatData: '',
      toggleMenu: [{ text: 'Archive Chat', icon: 'mdi-archive-outline' }],
      user: '',
      dropzoneOptions: {
        url: `${import.meta.env.VITE_API_BASE_URL}/v2/chat/sendMessage`,
        thumbnailWidth: 100,
        thumbnailHeight: 100,
        maxFiles: 10,
        maxFilesize: 420,
        chunking: true,
        headers: { 'My-Awesome-Header': 'header value' },
      },
      uploadDrag: false,
      removeMember: '',
      fileExt: '',
      loading: true,
      allMembers: [],
      snackbar: false,
      timeout: 2000,
      convDec: '',
      searching: '',
    };
  },
  computed: {
    showSideBar() {
      return this.$store.getters.g_sideBarOpen;
    },
    activityPanel() {
      return this.$store.getters.g_activityPanel;
    },
    messagesList() {
      if (this.searchMessage) {
        return this.$store.getters.messages.filter((item) => this.searchMessage
          .toLowerCase()
          .split(' ')
          .every((v) => item.content.toLowerCase().includes(v)));
      }
      return this.$store.getters.messages;
    },
    archiveList() {
      return this.$store.getters.archiveList;
    },
    loaderPage() {
      return this.$store.getters.pageLoader;
    },
    createMsg() {
      if (this.$store.getters.createMsg != null) {
        this.snackbar = true;
      }
      return this.$store.getters.createMsg;
      setTimeout(function () {
        this.$store.state.createMsg = null;
      }, 4000);
    },
  },
  methods: {
    ...mapActions([
      'getAllMessages',
      'sendMessage',
      'unreadMessagesCountCon',
      'lastMessageRead',
      'archiveChat',
      'removeConvUser',
      'getAllConversations',
      'getAllConversationsSearch',
    ]),
    openChat(group, name, id) {
      if (screen.width < 767) {
        this.userList = false;
        this.showMsgBlock = true;
        this.backArrow = true;
      }
      const obj = {
        group,
        name,
      };
      this.conversationId = group._id;
      this.chatData = obj;
      if (this.chatData) {
        this.allMembers = this.chatData.group.participantDetails;
      }
      const ids = {
        userId: this.user._id,
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
      this.isChatMenu = false;
    },
    ChangeT(data) {
      this.chatData = data;
    },
    memberT(data) {
      this.allMembers = data;
    },
    closeChat() {
      if (screen.width < 767) {
        this.userList = true;
        this.showMsgBlock = false;
        this.backArrow = false;
      }
    },
    fileUpload() {
      this.filename = this.$refs.msgFile.files[0].name;
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
          company: this.chatData.group.company,
          profilePicture: '',
        },
        content: this.message,
        attachment: chat_file[0],
      };
      if (data.content || data.attachment) {
        this.sendMessage(data);
      }
      const container = this.$refs.messagesSection;
      setTimeout(() => {
        container.scrollTop = container.scrollHeight;
      }, 500);
      this.message = '';
      this.filename = '';
    },
    chatActions(data) {
      const archivess = {
        conversationId: data,
        userId: this.user.id,
      };
      this.archiveChat(archivess);
      this.$store.commit('setSpliceToConversation',data);
      this.isChatMenu = false;
      this.chatData.group = '';
      if (this.$store.getters.conversations) {
        let chatArr = this.$store.getters.conversations;
        chatArr.forEach((msg, index) => {
          if (!msg.latestMessage) {
            msg.latestMessage = msg.createdAt; // add the new field
          }
        });
        const convo = _.orderBy(chatArr, 'latestMessage', 'desc')[0];
      }
      if (convo) {
        if (convo.type === 'PRIVATE') {
          const membr = convo.participantDetails.filter((item) => {
            if (this.user.id != item.id) {
              return item;
            }
          });
          var grpName = membr[0].name;
        } else {
          var grpName = convo.company.companyName;
        }
        const obj = {
          group: convo,
          name: grpName,
        };
        this.conversationId = obj.group._id;
        this.chatData = obj;
        this.openChat(convo, grpName);
      }
    },
    getText: (item) => `${item.firstName} ${item.lastName}`,
    dragfileupload(file, xhr, formData) {
      formData.append('conversationId', this.conversationId);
      formData.append('sender[id]', this.user._id);
      formData.append(
        'sender[name]',
        `${this.user.firstName} ${this.user.lastName}`,
      );
      formData.append('sender[company]', this.chatData.group.company._id);
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
      };
      this.getAllMessages(ids);
    },
    uploadfile(event) {
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
          company: this.chatData.group.company,
          profilePicture: this.user.image,
        },
        content: this.message,
        attachment: chat_file[0],
      };
      this.sendMessage(data);
      const container = this.$refs.messagesSection;
      setTimeout(() => {
        container.scrollTop = container.scrollHeight;
      }, 500);
      this.message = '';
      this.filename = '';
    },
    removeUser(id) {
      const user = {
        userIds: [this.removeMember.id],
        conversationId: id,
      };
      this.removeConvUser(user);
      this.dialog = false;
      this.isChatMenu = false;
    },
    get_url_extension(url) {
      if(url != undefined){
        return url.split(/[#?]/)[0].split('.').pop().trim();
      }
    },
    istoday(date) {
      return moment(date).calendar();
    },
    getConversationName(conversation) {
      if (conversation.type === 'GROUP') {
        return conversation.name.split('|||').find((el) => el.trim() !== this.user.company.company);
      }
      return conversation.company.companyName;
    },
  },
  async created() {
    this.user = this.$store.getters.userInfo;
    await this.getAllConversationsSearch(this.user._id);
    // await this.getAllConversations({id: this.user.id, page: 1, limit: 10});
  },
  beforeMount() {},
  async mounted() {
    document.title = 'Messages - BidOut';
    if (screen.width < 767) {
      this.userList = true;
      this.showMsgBlock = false;
      this.backArrow = false;
    }
    document.addEventListener('dragenter', (e) => {
      if (
        e.target.className === 'message-area'
        || e.target.className === 'messages-section'
        || e.target.className === 'v-list-item__content'
        || e.target.className === 'v-list-item__title'
        || e.target.className
          === 'v-list own-user message-list v-sheet theme--light v-list--two-line'
        || e.target.className === 'v-item-group theme--light v-list-item-group'
        || e.target.className === 'message-send-area'
        || e.target.className === 'row'
        || e.target.className === 'col-sm-10 col-md-10 col-12'
        || e.target.className === 'msg-text-box'
      ) {
        document.getElementById('dropzone').style.display = 'block';
      } else {
        document.getElementById('dropzone').style.display = 'none';
      }
    });
  },
};
</script>
