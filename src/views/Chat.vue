<template>
  <section class="section-container fill-height chat-module">
    <Navbar></Navbar>
     <v-row class="mx-0">
       <v-col :class="[ showSideBar ? 'col-12' : 'toggleLeft-sidebar']" class="left-sidebar pr-1">
          <LeftSidebar></LeftSidebar>
       </v-col>
       <v-col class="mid-content pa-0 pa-sm-3" :class="[ showSideBar ? 'col-md-9 col-12 col-sm-9' : 'mid-content-collapse', activityPanel ? 'd-sm-block' : 'd-md-block']" v-show="!activityPanel">
          <div class="content-section">
            <v-row>
              <v-col cols="12" sm="4" md="4" class="userCol  d-sm-block" v-if="userList">
                <div class="userlist-col">
                  <div class="chat-search">
                  <div>
                    <v-text-field
                      v-model="searchUsers"
                      clearable
                      type="text" align-center
                      class="pt-0 mt-0"
                    >
                      <template v-slot:prepend>
                        <v-icon>mdi-magnify</v-icon>
                      </template>
                      <template v-slot:append>
                        <v-fade-transition leave-absolute>
                          <span class="icon-box">
                            <v-icon>mdi-plus</v-icon>
                          </span>
                        </v-fade-transition>
                      </template>
                    </v-text-field>
                  </div>
                </div>
                <div class="users-lists">
                  <v-list two-line  class="py-0">
                    <v-list-item-group
                      v-model="selected"
                      active-class="grey--text"
                      multiple v-bind:class="{ active: isActive }"
                    >
                      <template v-for="(group, index) in conversationsList" v-if="group.type == 'GROUP'">
                        <v-list-item :key="group.company" @click="openChat(group)">
                          <template v-slot:default="{ active }">
                            <v-list-item-avatar>
                              <v-icon>mdi-account-group-outline</v-icon>
                            </v-list-item-avatar>
                            <v-list-item-content>
                              <v-list-item-title v-text="group.company"></v-list-item-title>

                              <v-list-item-subtitle
                                class="text--primary"
                                v-text="group.headline"
                              ></v-list-item-subtitle>

                              <v-list-item-subtitle v-text="group.subtitle"></v-list-item-subtitle>
                            </v-list-item-content>

                            <v-list-item-action class="mt-n5">
                              <v-list-item-action-text>{{group.latestMessage | moment("
                              h:mm a")}}</v-list-item-action-text>
                            </v-list-item-action>
                            <!-- <v-badge
                                color="#0D9648"
                                :value="msgCount"
                                :content="msgCount" overlap
                              ></v-badge> -->
                          </template>
                        </v-list-item>
                      </template>
                    </v-list-item-group>
                  </v-list>
                  <v-list class="py-0">
                    <v-list-item-group
                      active-class="grey--text"
                      multiple
                    >
                      <template v-for="(user, index) in users">
                        <v-list-item :key="user.title" @click="openChat">
                          <template v-slot:default="{ active }">
                            <v-list-item-avatar>
                              <v-avatar>
                                <v-img :src="require('@/assets/images/user.png')"></v-img>
                              </v-avatar>
                            </v-list-item-avatar>
                            <v-list-item-content align-center>
                              <v-list-item-title v-text="user.title"></v-list-item-title>
                            </v-list-item-content>

                            <v-list-item-action>
                              <v-list-item-action-text v-text="user.action"></v-list-item-action-text>
                            </v-list-item-action>
                          </template>
                        </v-list-item>

                        <v-divider
                          v-if="index < user.length - 1"
                          :key="index"
                        ></v-divider>
                      </template>
                    </v-list-item-group>
                  </v-list>
                </div>
                </div>
              </v-col>
              <v-col cols="12" sm="8" md="8" class="pl-0 pr-2 pt-0 d-sm-block" v-show="showMsgBlock">
                <div class="message-area">
                  <!-- Message Header -->
                  <div class="msg-header pa-5">
                    <v-icon class="back-arrow" v-if="backArrow" @click="closeChat">mdi-chevron-left</v-icon>
                    <v-row align="center">

                      <v-col cols="6">
                        <div class="title-section text-left">
                          <h4 class="mb-0 font-weight-bold">{{this.chatData.company}}</h4>
                          <!-- <p class="sub-title mb-0 font-weight-regular">Compressor Separator Bid</p> -->
                          <!-- <p class="sub-title mb-0 ">Bid #120320</p> -->
                        </div>
                      </v-col>
                      <v-col cols="6">
                        <div class="msg-options d-flex mt-2">
                          <div class="search"> 
                            <v-text-field
                              v-model="searchMessage"
                              type="text" align-center
                              outlined
                              class="pt-0 mt-0"
                              placeholder="Search this conversation"
                            >
                              
                              <template v-slot:prepend>
                                <v-icon>mdi-magnify</v-icon>
                              </template>
                            </v-text-field>
                          </div>
                          <div class="toggle-btn">
                            <v-btn
                              fab
                              small
                              color="#0d964814"
                              @click="isChatMenu = !isChatMenu"
                              :class="{ 'active-btn': isChatMenu}"
                            >
                              <v-icon dark>
                                mdi-dots-horizontal
                              </v-icon>
                            </v-btn>
                            <div v-show="isChatMenu">
                              <v-card
                                class="mx-auto chat-menu-card"
                                min-width="290"
                                tile
                                outlined
                              >
                                <v-list class="pa-0">
                                  <v-list-item-group
                                    color="success"
                                  >
                                    <v-list-item
                                      v-for="(menu, i) in toggleMenu"
                                      :key="i"
                                    >
                                      <v-list-item-icon class="mr-2 my-2">
                                        <v-icon color="#0D9648" v-text="menu.icon"></v-icon>
                                      </v-list-item-icon>
                                      <v-list-item-content align-start color="#0D9648" class="pa-0">
                                        <v-list-item-title v-text="menu.text" color="#0D9648"></v-list-item-title>
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
                    <v-list two-line class="own-user message-list" v-for="message in messagesList" :key="message._id">
                      <v-list-item-group
                        multiple
                      >
                        <template>
                          <v-list-item class="text-left px-5">
                            <template>
                              <v-list-item-content>
                                <v-list-item-title>{{message.sender.name}}</v-list-item-title>
                                <v-img v-if="message.attachment" :src="require('@/assets/images/chat/thumbnail.png')" max-height="125px" max-width="245px" class="mt-2"></v-img>
                                <v-list-item-subtitle
                                  class="text--primary"
                                >{{message.content}}</v-list-item-subtitle>
                              </v-list-item-content>


                              <v-list-item-action class="mt-n6">
                                <v-list-item-action-text>{{ message.updatedAt | moment("h:mm a") }}</v-list-item-action-text>
                              </v-list-item-action>
                            </template>
                          </v-list-item>
                        </template>
                      </v-list-item-group>
                    </v-list>
                    <!-- <p class="text-center mb-0 text--primary">Apr 23</p> -->
                  </div>
                  <!-- End Message Area -->
                  <!-- Message Send Area -->
                  <div class="message-send-area px-5 pt-5">
                    <span class="fileName" v-if="filename">{{filename}}</span>
                    <v-row>  
                      <v-col cols="12" sm="10" md="10">
                        <div class="msg-text-box">
                          <v-textarea
                            solo
                            name="input-7-4"
                            placeholder="Message here ..."
                            rows="3"
                            v-model="message"
                          ></v-textarea>
                        </div>
                      </v-col>
                      <v-col cols="12" sm="2" md="2">
                        <div class="msg-send-btn">
                          <v-btn block tile  height="43px"
                            color="#0D9648" @click="messageSend">Send</v-btn>
                          <label for="attach-file" class="mt-2 attach-btn d-flex justify-center align-center">
                            <input id="attach-file"
                               type="file" class="d-none" 
                              truncate-length="8" ref="msgFile" @change="fileUpload"
                            >
                            <v-img :src="require('@/assets/images/chat/attach.png')" max-width="28px" height="32px"></v-img>
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
       </v-col>
     </v-row>
   </section>
</template>
<script>
  import Navbar from './Layout/Navbar.vue'
  import LeftSidebar from './Layout/Dashboard/LeftSidebar.vue'
  import axios from 'axios'
  import { mapActions } from "vuex";
export default {
  name : "Chat",
  components: {
    Navbar,
    LeftSidebar,
  },
  
  data() {
    return {
      isActive: false,
      isHidden : false,
      isChatMenu : false,
      showMsgBlock : true,
      backArrow : false,
      userList : true,
      searchMessage: '',
      message: '',
      conversationId : '',
      filename: '',
      searchUsers: '',
      chatData: {},
      selected: [0],
        groups: [
          {
            action: '15 min ago',
            headline: 'Compressor Separator Bid',
            subtitle: 'Bid #120320',
            title: 'Huges Tool Company',
          },
          {
            action: '2 hr ago',
            headline: 'Compressor Separator Bid',
            subtitle: 'Bid #120320',
            title: 'Company Group',
          },
        ],
        users: [
          {
            action: '15 min ago',
            title: 'Aubrey  McClendon',
          },
          {
            action: '2 hr ago',
            title: 'McClendon',
          },
        ],
        toggleMenu: [
          { text: 'Manage Members', icon: 'mdi-account-star-outline' },
          { text: 'Archive Chat', icon: 'mdi-archive-outline' },
        ],
        user: '',
    };
  },
  computed:{
    showSideBar(){
        return this.$store.getters.g_sideBarOpen;
    },
    activityPanel(){
        return this.$store.getters.g_activityPanel;
    },
    conversationsList(){
      return this.$store.getters.conversations;
    },
    messagesList(){
      return this.$store.getters.messages;
    },
    // msgCount(){
    //   return this.$store.getters.unMessageCount;
    // },
  },
  methods: {
    ...mapActions(["getAllConversations","getAllMessages","sendMessage","unreadMessagesCountCon","lastMessageRead"]),
    openChat(group){
      if(screen.width < 767){
        this.userList = false;
        this.showMsgBlock = true;
        this.backArrow= true;
      }
      this.conversationId = group._id;
      this.chatData = group;
      this.getAllMessages(this.conversationId);
      var ids = {
        userId: this.user.uid,
        conversationId: this.conversationId,
      }
      this.lastMessageRead(ids);
      var container = this.$refs.messagesSection;
      container.scrollTop = 3 * container.scrollHeight;
    },
    closeChat(){
      if(screen.width < 767){
        this.userList = true;
        this.showMsgBlock = false;
        this.backArrow = false;
      }
    },
    getConversations(id){
      this.getAllConversations(id);
    },
    fileUpload(){
      this.filename = this.$refs.msgFile.files[0].name;
    },
    messageSend(){
       this.filename = "";
      var chat_file = this.$refs.msgFile.files;
      if (chat_file.length > 0) {
        this.filename = chat_file[0].name;
      }
      var data = {
        'conversationId': this.conversationId,
        'sender': {
            'name': this.user.firstName + this.user.LastName,
            'id': this.user.uid,
            'company': this.chatData.company,
            'profilePicture': ""
        },
        content: this.message,
        attachment: this.filename,
      }
      
      this.sendMessage(data);
      var container = this.$refs.messagesSection;
      container.scrollTop = 3 * container.scrollHeight;
      this.message = '';
      this.filename = '';
    },
    // unreadCountMsg(conId){
    //   var Ids = {
    //     'userId': this.user.uid,
    //     'conversationId': conId,
    //   }
    //   // this.unreadMessagesCountCon(Ids);
    // },
  },
  mounted() {
    document.title = "Messages - BidOut";
    if(screen.width < 767){
      this.userList = true;
      this.showMsgBlock = false;
      this.backArrow = false;
    }
    this.user = JSON.parse(localStorage.getItem("userData")).user;
    this.getConversations(this.user.uid);
    // this.unreadMessagesCount(this.user.uid);
  }
};
</script>
<style scoped lang="scss">

</style>