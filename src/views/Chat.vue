<template>
  <v-row fill-height align="center" v-if="loading">
    <v-col cols="12">
      <v-progress-circular :width="3" color="green" indeterminate ></v-progress-circular>
    </v-col>
  </v-row>
  <v-col class="chat-module pa-0 pa-sm-3 pl-sm-0 pb-sm-0" :class="[ showSideBar ? 'col-md-9 col-12 col-sm-9' : 'mid-content-collapse', activityPanel ? 'd-sm-block' : 'd-md-block']" v-show="!activityPanel" v-else>
    <div class="mid-content">
      <div class="content-section">
        <v-snackbar  v-model="snackbar" :timeout="timeout" color="#0D9648" absolute top >
          {{createMsg}}
          <template v-slot:action="{ attrs }">
            <v-btn color="white" text v-bind="attrs"  @click="snackbar = false">
              Close
            </v-btn>
          </template>
        </v-snackbar>
        <v-row>
          <v-col cols="12" sm="4" md="4" class="userCol  d-sm-block" v-if="userList">
            <div class="userlist-col">
              <chat-leftsidebar></chat-leftsidebar>
              <conversations-section @ChatDatas="ChangeT($event)" @callTest="openChat" @membersData="memberT($event)"></conversations-section>
            </div>
          </v-col>
          <v-col cols="12" sm="8" md="8" class="pl-0 pr-2 pt-0 d-sm-block" v-show="showMsgBlock">
            <div class="message-area">
              <!-- Message Header -->
              <div class="msg-header pa-5">
                <v-icon class="back-arrow" v-if="backArrow" @click="closeChat">mdi-chevron-left</v-icon>
                <v-row align="center">
                  <v-col cols="12" md="6">
                    <div class="title-section text-left">
                      <h4 class="mb-0 font-weight-bold">{{chatData.name}}</h4>
                      <template v-if="chatData.isBid == true">
                        <p class="sub-title mb-0 font-weight-regular">{{chatData.bidTitle}}</p>
                        <p class="sub-title mb-0 ">Bid #{{chatData.bidSerial}}</p>
                      </template>
                    </div>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div class="msg-options d-flex mt-2 justify-end">
                      <div class="search"> 
                        <v-text-field v-model="searchMessage" type="text" align-center
                          outlined class="pt-0 mt-0" placeholder="Search this conversation" >
                          <template v-slot:prepend>
                            <v-icon>mdi-magnify</v-icon>
                          </template>
                        </v-text-field>
                      </div>
                      <div class="toggle-btn ml-5">
                        <v-btn fab small color="#0d964814"
                          @click="isChatMenu = !isChatMenu"
                          :class="{ 'active-btn': isChatMenu}" >
                          <v-icon dark> mdi-dots-horizontal </v-icon>
                        </v-btn>
                        <div v-show="isChatMenu">
                          <v-card class="mx-auto chat-menu-card" min-width="290" tile outlined>
                            <v-list class="pa-0">
                              <v-list-item-group
                                color="success">
                                <v-dialog v-model="dialog"  width="700">
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-btn color="transparent" v-bind="attrs"
                                      v-on="on" class="text-capitalize text-left justify-start manage-btn font-weight-bold" height="48px" width="100%">
                                      <v-icon class="mr-2" color="#0D9648">mdi-account-star-outline</v-icon>Manage Members
                                    </v-btn>
                                  </template>
                                  <v-card>
                                    <v-card-title class="text-h6 lighten-2 justify-space-between">
                                      Manage Members
                                      <v-icon @click="dialog = false" color="#0D9648"> mdi-close</v-icon>
                                    </v-card-title>
                                    <v-divider></v-divider>
                                    <v-card-text class="my-8" v-if="chatData">
                                      <label class="d-block text-left input-label font-weight-bold black--text">Manage Members</label>
                                      <v-autocomplete v-model="removeMember" :items="allMembers" item-value="id" item-text="name" chips outlined auto-select-first full-width hide-details hide-no-data hide-selected single-line deletable-chips search-input return-object  class="text-left addChat-box">
                                      </v-autocomplete>
                                    </v-card-text>
                                    <v-divider></v-divider>
                                    <v-card-actions>
                                      <v-spacer></v-spacer>
                                      <v-btn
                                        color="#0D9648"
                                        text @click="dialog = false" class="text-capitalize">
                                        Cancel
                                      </v-btn>
                                      <v-btn
                                        color="#0D9648" rounded class="text-capitalize white--text px-3"
                                        min-width="100px" @click="removeUser(chatData.group._id)">
                                        Save
                                      </v-btn>
                                    </v-card-actions>
                                  </v-card>
                                </v-dialog>
                                <v-list-item
                                  v-for="(menu, i) in toggleMenu"
                                  :key="i" @click="chatActions(chatData.group._id)">
                                  <v-list-item-icon class="mr-2 my-3">
                                    <v-icon color="#0D9648" v-text="menu.icon"></v-icon>
                                  </v-list-item-icon>
                                  <v-list-item-content align-start color="#0D9648" class="pa-0 text-left">
                                    <v-list-item-title v-text="menu.text"></v-list-item-title>
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
                <vue-dropzone ref="myVueDropzone" :class="{dropzoneActive : uploadDrag }" @ondragleave="dragLeave(event)" id="dropzone" @vdropzone-success="afterComplete" v-on:vdropzone-sending="dragfileupload" :options="dropzoneOptions" @dragstart="startDrag($event, item)" acceptedFiles="image/*,application/pdf"> </vue-dropzone>
                <v-list two-line class="own-user message-list" v-for="message in messagesList" :key="message._id">
                  <v-list-item-group>
                    <template>
                      <v-list-item class="text-left px-5" active-class="white--text">
                        <template>
                          <v-list-item-content>
                            <v-list-item-title>{{message.sender.name}}</v-list-item-title>
                              <template v-if="message.attachment">
                                <a :href="message.attachment" target="_blank" v-if="get_url_extension(message.attachment) == 'pdf'"><v-img  :src="require('@/assets/images/chat/pdf.jpg')" max-height="50px" max-width="50px" class="mt-2"></v-img></a>
                              <v-img v-else :src="message.attachment" max-height="125px" max-width="245px" class="mt-2"></v-img>
                              </template>
                            <v-list-item-subtitle
                              class="text--primary"
                            >{{message.content}}</v-list-item-subtitle>
                          </v-list-item-content>
                          <v-list-item-action class="mt-n6">
                            <v-list-item-action-text>{{ istoday(message.updatedAt) }}</v-list-item-action-text>
                          </v-list-item-action>
                        </template>
                      </v-list-item>
                    </template>
                  </v-list-item-group>
                </v-list>
              </div>
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
                        @keyup.enter="messageSend"
                      ></v-textarea>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="2" md="2">
                    <div class="msg-send-btn">
                      <v-btn block tile  height="43px"
                        color="#0D9648" @click="messageSend">Send</v-btn>
                      <label for="attach-file" class="mt-2 attach-btn d-flex justify-center align-center">
                        <input id="attach-file" type="file" class="d-none" 
                          truncate-length="8" ref="msgFile" @change="fileUpload">
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
    </div>
  </v-col>
</template>
<script>
  import Navbar from '../components/Layout/Navbar.vue'
  import LeftSidebar from '../components/Layout/Dashboard/LeftSidebar.vue'
  import ChatLeftsidebar from '../components/Chat/ChatLeftSideBar.vue'
  import ConversationsSection from '../components/Chat/ConversationsSection.vue'
  import axios from 'axios'
  import _ from 'lodash';
  import vueDropzone from 'vue2-dropzone';
  import VueMoment from 'vue-moment';
  import moment from 'moment-timezone';
  import { mapActions } from "vuex";
export default {
  name : "Chat",
  components: {
    Navbar,
    LeftSidebar,
    vueDropzone,
    ChatLeftsidebar,
    ConversationsSection
  },
  data() {
    return {
      isActive: false,
      isHidden : false,
      isChatMenu : false,
      isAddUser : false,
      showMsgBlock : true,
      backArrow : false,
      userList : true,
      dialog: false,
      searchMessage: '',
      message: '',
      filename: '',
      chatData: '',
      toggleMenu: [
        { text: 'Archive Chat', icon: 'mdi-archive-outline' },
      ],
      user: '',
      dropzoneOptions: {
        url: import.meta.env.VITE_API_BASE_URL+'/chat/sendMessage',
        thumbnailWidth: 100,
        thumbnailHeight: 100,
        maxFiles: 10,
        maxFilesize: 420,
        chunking: true,
        headers: { "My-Awesome-Header": "header value" }
      },
      uploadDrag: false,
      removeMember: '',
      fileExt: '',
      loading: true,
      allMembers: [],
      snackbar: false,
      timeout: 2000,
      convDec: '',
    };
  },
  computed:{
    showSideBar(){
        return this.$store.getters.g_sideBarOpen;
    },
    activityPanel(){
      return this.$store.getters.g_activityPanel;
    },
    messagesList(){
      if(this.searchMessage){
        return this.$store.getters.messages.filter((item)=>{
          return this.searchMessage.toLowerCase().split(' ').every(v => item.content.toLowerCase().includes(v))
        })
      }else{
        return this.$store.getters.messages;
      }
    },
    archiveList(){
      return this.$store.getters.archiveList;
    },
    loader(){
      return this.$store.getters.pageLoader;
    },
    createMsg(){
      if(this.$store.getters.createMsg != null){
        this.snackbar = true;
      }
      return this.$store.getters.createMsg;
      setTimeout(function(){
        this.$store.state.createMsg = null;
      }, 4000);
    },
  },
  methods: {
    ...mapActions(["getAllMessages","sendMessage","unreadMessagesCountCon","lastMessageRead","archiveChat","removeConvUser"]),
    openChat(group,name,id){
      if(screen.width < 767){
        this.userList = false;
        this.showMsgBlock = true;
        this.backArrow= true;
      }
      var obj = {
        'group': group,
        'name': name,
      }
      this.conversationId = group._id;
      this.chatData = obj;
      if(this.chatData){
        this.allMembers = this.chatData.group.participantDetails;
      }
      var ids = {
        userId: this.user.id,
        conversationId: this.conversationId,
      }
      this.getAllMessages(ids);
      var container = this.$refs.messagesSection;
      setTimeout(function(){
        container.scrollTop = container.scrollHeight;
      }, 4000);
      this.lastMessageRead(ids);
      var container = this.$refs.messagesSection;
      setTimeout(function(){
        container.scrollTop = container.scrollHeight;
      }, 1000);
      this.isChatMenu  = false;
    },
    ChangeT(data){
      this.chatData=data;
    },
    memberT(data){
      this.allMembers = data;
    },
    closeChat(){
      if(screen.width < 767){
        this.userList = true;
        this.showMsgBlock = false;
        this.backArrow = false;
      }
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
            'name': this.user.firstName+' '+this.user.lastName,
            'id': this.user.id,
            'company': this.chatData.group.company,
            'profilePicture': ""
        },
        content: this.message,
        attachment: chat_file[0],
      }
      if(data.content || data.attachment){
        this.sendMessage(data);
      }
      var container = this.$refs.messagesSection;
      setTimeout(function(){
        container.scrollTop = container.scrollHeight;
      }, 500);
      this.message = '';
      this.filename = '';
      
    },
    chatActions(data){
      var archivess = {
        conversationId: data,
        userId: this.user.id,
      }
      this.archiveChat(archivess);
      this.isChatMenu = false;
      this.chatData.name = '';
    },
    getText: (item) => `${item.firstName} ${item.lastName}`,
    dragfileupload(file, xhr, formData) {
      formData.append('conversationId', this.conversationId)
      formData.append('sender[id]', this.user.id)
      formData.append('sender[name]', this.user.firstName+' '+this.user.lastName)
      formData.append('sender[company]', this.chatData.group.groupName)
      formData.append('sender[profilePicture]', this.user.image)
      formData.append('content', this.message)
    },
    afterComplete(file, response) {
      this.message = "";
      this.$refs.msgFile.value=null;
      this.$refs.myVueDropzone.removeFile(file);
      document.getElementById('dropzone').style.display = "none";
      var ids = {
        userId: this.user.id,
        conversationId: response.message.conversationId,
      }
      this.getAllMessages(ids);
    },
    uploadfile(event) {
      this.filename = "";
      var chat_file = this.$refs.msgFile.files;
      if (chat_file.length > 0) {
        this.filename = chat_file[0].name;
      }
      var data = {
        'conversationId': this.conversationId,
        'sender': {
            'name': this.user.firstName+' '+this.user.lastName,
            'id': this.user.id,
            'company': this.chatData.group.company,
            'profilePicture': this.user.image,
        },
        content: this.message,
        attachment: chat_file[0],
      }
      this.sendMessage(data);
      var container = this.$refs.messagesSection;
      setTimeout(function(){
        container.scrollTop = container.scrollHeight;
      }, 500);
      this.message = '';
      this.filename = '';
    },
    removeUser(id){
      var user = {
        userIds: [
           this.removeMember.id,
        ],
        conversationId: id,
      }
      this.removeConvUser(user);
      this.dialog = false;
      this.isChatMenu = false;
    },
    get_url_extension( url ) {
        return url.split(/[#?]/)[0].split('.').pop().trim();
    },
    istoday (date) {
      return moment(date).calendar();
    },
    msgShow() {
      setTimeout(() => {
        this.loading = false
      }, 2000)
    },
  },
  beforeMount() {
    this.user = this.$store.getters.userInfo;
  },
  mounted() {
    this.msgShow(); 
    document.title = "Messages - BidOut";
    if(screen.width < 767){
      this.userList = true;
      this.showMsgBlock = false;
      this.backArrow = false;
    } 
    document.addEventListener('dragenter', function(e) {
     if (e.target.className == 'message-area' || e.target.className == 'messages-section' || e.target.className == 'v-list-item__content' || e.target.className == 'v-list-item__title' || e.target.className == 'v-list own-user message-list v-sheet theme--light v-list--two-line' || e.target.className == 'v-item-group theme--light v-list-item-group' || e.target.className == 'message-send-area' || e.target.className == 'row' || e.target.className == 'col-sm-10 col-md-10 col-12' || e.target.className == 'msg-text-box' ) {
        document.getElementById('dropzone').style.display = "block";
      }
      else {
        document.getElementById('dropzone').style.display = "none";
      }
    });
  }
};
</script>