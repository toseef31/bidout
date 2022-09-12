<template>
  <v-col class="chat-module pa-0 pa-sm-3 pl-sm-0 pb-sm-0" :class="[ showSideBar ? 'col-md-9 col-12 col-sm-9' : 'mid-content-collapse', activityPanel ? 'd-sm-block' : 'd-md-block']" v-show="!activityPanel">
    <div class="mid-content">
      <div class="content-section">
        <v-row>
          <v-col cols="12" sm="4" md="4" class="userCol  d-sm-block" v-if="userList">
            <div class="userlist-col">
              <div class="chat-search d-flex">
              <div class="search-box">
                <v-text-field
                  v-model="searchUsers"
                  clearable
                  type="text" align-center
                  class="pt-0 mt-0" height="44px"
                >
                  <template v-slot:prepend>
                    <v-icon>mdi-magnify</v-icon>
                  </template>
                </v-text-field>
              </div>
              <div class="add-people">
                <template>
                  <span class="icon-box" @click="isAddUser = !isAddUser"
                          :class="{ 'active-btn': isAddUser}">
                    <v-icon>mdi-plus</v-icon>
                  </span>
                </template>
                <div v-show="isAddUser">
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
                      <v-dialog
                        v-model="startChatDialog"
                        width="700"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            color="transparent"
                            v-bind="attrs"
                            v-on="on" class="text-capitalize text-left justify-start manage-btn font-weight-bold"
                            height="48px" width="100%" elevation="0"
                          >
                            <v-icon class="mr-2" color="#0D9648">mdi-chat-processing-outline</v-icon>Start a new chat
                          </v-btn>
                        </template>

                        <v-card>
                          <v-card-title class="text-h5 d-flex justify-space-between">
                            Start a new Chat
                            <v-icon @click="startChatDialog = false" small>mdi-close</v-icon>
                          </v-card-title>
                          <v-card-text class="py-8">
                            <v-text-field
                              v-model="addChat"
                              outlined
                              full-width
                              hide-details
                              prepend-inner-icon="mdi-magnify" @keyup="getSupplierUsers"
                            >
                            </v-text-field>
                            <v-list v-if="hideList == true" class="company-list">
                              <template v-for="(user, index) in suppliersUsers">
                                <v-list-item
                                  :key="user.objectID"
                                >
                                  <v-list-item-avatar>
                                    <v-avatar>
                                      <img :src="require('@/assets/images/chat/chatUser.png')">
                                    </v-avatar>
                                  </v-list-item-avatar>
                                  <v-list-item-content>
                                    <v-list-item-title @click="createChat(user); hideList = !hideList" class="text-left">{{user.firstName}} {{user.lastName}}</v-list-item-title>
                                    <v-list-item-subtitle
                                      class="text--primary text-left"
                                      v-text="user.company"
                                    ></v-list-item-subtitle>
                                  </v-list-item-content>
                                </v-list-item>
                              </template>
                            </v-list>
                          </v-card-text>
                        </v-card>
                      </v-dialog>
                      <v-dialog
                        v-model="groupChatDialog"
                        width="700"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            color="transparent"
                            v-bind="attrs"
                            v-on="on" class="text-capitalize text-left justify-start manage-btn font-weight-bold"
                            height="48px" width="100%" elevation="0"
                          >
                            <v-icon class="mr-2" color="#0D9648">mdi-account-group-outline</v-icon>Create a Group
                          </v-btn>
                        </template>

                        <v-card>
                          <v-card-title class="text-h5 d-flex justify-space-between">
                            Start a new group Chat
                            <v-icon @click="groupChatDialog = false" small>mdi-close</v-icon>
                          </v-card-title>
                          <v-card-text class="py-8">
                            <label class="d-block text-left input-label font-weight-bold black--text">Group Name</label>
                            <v-text-field
                              v-model="groupName"
                              hide-details
                              outlined
                            >
                            </v-text-field>
                            <label class="d-block text-left input-label font-weight-bold black--text mt-5">Add Users</label>
                            <v-text-field
                              v-model="addMember"
                              hide-details
                              outlined
                              prepend-inner-icon="mdi-magnify" @keyup="getSupplierMembers"
                            >
                            </v-text-field>
                            <label class="d-block text-left input-label font-weight-bold black--text mt-5">Add Users</label>
                            
                            <v-list class="company-list">
                              <template v-for="(user, index) in membersData">
                                <v-list-item
                                  :key="user.objectID"
                                >
                                  <v-list-item-avatar>
                                    <v-avatar>
                                      <img :src="require('@/assets/images/chat/chatUser.png')">
                                    </v-avatar>
                                  </v-list-item-avatar>
                                  <v-list-item-content>
                                    <v-list-item-title class="text-left">{{user.name}}</v-list-item-title>
                                    <v-list-item-subtitle
                                      class="text--primary text-left"
                                      v-text="user.company"
                                    ></v-list-item-subtitle>
                                  </v-list-item-content>
                                  <v-list-item-action @click="removeItem(user.index)">
                                    <v-icon>mdi-close</v-icon>
                                  </v-list-item-action>
                                </v-list-item>
                              </template>
                            </v-list>
                            <v-list v-if="hideMemberList == true" class="company-list">
                              <template v-for="(user, index) in suppliersUsers">
                                <v-list-item
                                  :key="user.objectID"
                                >
                                  <v-list-item-avatar>
                                    <v-avatar>
                                      <img :src="require('@/assets/images/chat/chatUser.png')">
                                    </v-avatar>
                                  </v-list-item-avatar>
                                  <v-list-item-content>
                                    <v-list-item-title @click="addPerson(user)" class="text-left">{{user.firstName}} {{user.lastName}}</v-list-item-title>
                                    <v-list-item-subtitle
                                      class="text--primary text-left"
                                      v-text="user.company"
                                    ></v-list-item-subtitle>
                                  </v-list-item-content>
                                </v-list-item>
                              </template>
                            </v-list>
                          </v-card-text>

                          <v-card-actions class="justify-center flex-column">
                            <v-spacer></v-spacer>
                            <v-btn
                              color="#0D9648"
                              large class="white--text px-6 font-weight-bold text-capitalize" @click="createGroup"
                            >
                             Create Group
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-list-item-group>
                  </v-list>
                </v-card>
              </div>
              </div>
            </div>
            <div class="users-lists">
              <v-list two-line  class="py-0">
                <v-list-item-group
                  v-model="selectedUser"
                  active-class="grey--text"
                  
                >
                  <template v-for="(conversation, index) in conversationsList">
                    <v-list-item @click="openChat(conversation,conversation.groupName)" :key="conversation._id" v-if="conversation.type == 'GROUP'">
                      <template>
                        <v-list-item-avatar>
                          <v-icon>mdi-account-group-outline</v-icon>
                        </v-list-item-avatar>
                        <v-list-item-content>
                          <v-list-item-title v-if="conversation.company == ''" v-text="conversation.company"></v-list-item-title>
                          <v-list-item-title v-else v-text="conversation.groupName"></v-list-item-title>

                          <v-list-item-subtitle
                            class="text--primary"
                            v-text="conversation.headline"
                          ></v-list-item-subtitle>

                          <v-list-item-subtitle v-text="conversation.subtitle"></v-list-item-subtitle>
                        </v-list-item-content>

                        <v-list-item-action class="mt-n5">
                          <v-list-item-action-text>{{conversation.latestMessage | moment("
                          h:mm a")}}</v-list-item-action-text>
                        </v-list-item-action>
                        <!-- <v-badge
                            color="#0D9648"
                            :value="msgCount"
                            :content="msgCount" overlap
                          ></v-badge> -->
                      </template>
                      
                    </v-list-item>
                    <v-list-item v-if="conversation.type == 'PRIVATE' && participant.id != user.id"  v-for="participant in conversation.participantDetails" @click="openChat(conversation,participant.name)">
                      <template >
                          <v-list-item-avatar>
                            <v-avatar>
                              <img v-if="participant.image != null" :src="participant.image">
                              <img v-if="participant.image == null" :src="require('@/assets/images/chat/chatUser.png')">
                            </v-avatar>
                          </v-list-item-avatar>
                          <v-list-item-content align-center>
                            <v-list-item-title v-text="participant.name"></v-list-item-title>
                          </v-list-item-content>

                        <v-list-item-action>
                          <v-list-item-action-text>{{conversation.latestMessage | moment("
                          h:mm a")}}</v-list-item-action-text>
                        </v-list-item-action>
                      </template>
                    </v-list-item>
                    <v-divider
                      v-if="index < conversation.length - 1"
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
                      <h4 class="mb-0 font-weight-bold">{{chatData.name}}</h4>
                      <template v-if="chatData.isBid == true">
                        <p class="sub-title mb-0 font-weight-regular">{{chatData.bidTitle}}</p>
                        <p class="sub-title mb-0 ">Bid #{{chatData.bidSerial}}</p>
                      </template>
                      
                    </div>
                  </v-col>
                  <v-col cols="6">
                    <div class="msg-options d-flex mt-2 justify-end">
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
                      
                      <div class="toggle-btn ml-5">
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
                                <v-dialog
                                  v-model="dialog"
                                  width="700"
                                >
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                      color="transparent"
                                      v-bind="attrs"
                                      v-on="on" class="text-capitalize text-left justify-start manage-btn font-weight-bold"
                                      height="48px" width="100%" @click="memberList()"
                                    >
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
                                      
                                      <v-autocomplete
                                        v-model="removeMember"
                                        :items="chatData.group.participantDetails"
                                        item-value="id" item-text="name"
                                        chips
                                        outlined
                                        full-width
                                        hide-details
                                        hide-no-data
                                        hide-selected
                                        single-line 
                                        deletable-chips
                                        search-input
                                        return-object
                                        class="text-left"
                                      >
                                      </v-autocomplete>
                                    </v-card-text>

                                    <v-divider></v-divider>

                                    <v-card-actions>
                                      <v-spacer></v-spacer>
                                      <v-btn
                                        color="#0D9648"
                                        text
                                        @click="dialog = false"
                                        class="text-capitalize"
                                      >
                                        Cancel
                                      </v-btn>
                                      <v-btn
                                        color="#0D9648"
                                        rounded
                                        class="text-capitalize white--text px-3"
                                        min-width="100px" @click="removeUser(chatData.group._id)"
                                      >
                                        Save
                                      </v-btn>
                                    </v-card-actions>
                                  </v-card>
                                </v-dialog>
                                <v-list-item
                                  v-for="(menu, i) in toggleMenu"
                                  :key="i" @click="chatActions(chatData.group._id)"
                                >
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
                  <v-list-item-group
                  >
                    <template>
                      <v-list-item class="text-left px-5" disabled>
                        <template>
                          <v-list-item-content>
                            <v-list-item-title>{{message.sender.name}}</v-list-item-title>
                              <v-img v-if="message.attachment" :src="message.attachment" max-height="125px" max-width="245px" class="mt-2"></v-img>
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
                        @keyup.enter="messageSend"
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
    </div>
  </v-col>
</template>
<script>
  import Navbar from './Layout/Navbar.vue'
  import LeftSidebar from './Layout/Dashboard/LeftSidebar.vue'
  import axios from 'axios'
  import _ from 'lodash';
  import vueDropzone from 'vue2-dropzone';
  import { mapActions } from "vuex";
export default {
  name : "Chat",
  components: {
    Navbar,
    LeftSidebar,
    vueDropzone,
  },
  
  data() {
    return {
      selectedUser: null,
      isActive: false,
      isHidden : false,
      isChatMenu : false,
      isAddUser : false,
      showMsgBlock : true,
      backArrow : false,
      userList : true,
      dialog: false,
      startChatDialog: false,
      groupChatDialog: false,
      searchMessage: '',
      message: '',
      conversationId : '',
      filename: '',
      searchUsers: '',
      chatData: {},
      selected: null,
      toggleMenu: [
        { text: 'Archive Chat', icon: 'mdi-archive-outline' },
      ],
      user: '',
      addChat: '',
      addMember: '',
      groupName: '',
      hideList: false,
      hideMemberList: false,
      membersData: [],
      participants: [],
      participantDetails: [],
      dropzoneOptions: {
        url: 'https://api-dev-v2-dot-bidout-dev.uc.r.appspot.com/api/chat/sendMessage',
        thumbnailWidth: 100,
        thumbnailHeight: 100,
        maxFiles: 10,
        maxFilesize: 420,
        chunking: true,
        headers: { "My-Awesome-Header": "header value" }
      },
      uploadDrag: false,
      userObject: '',
      removeMember: '',
      fileExt: '',
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
      // return _.orderBy(this.$store.getters.conversations, 'latestMessage', 'desc');
      
      if(this.searchUsers){
        return _.orderBy(this.$store.getters.conversations.filter((item)=>{
          return this.searchUsers.toLowerCase().split(' ').every(v => item.company.toLowerCase().includes(v))
        }), 'latestMessage', 'desc')
      }else{
        return _.orderBy(this.$store.getters.conversations, 'latestMessage', 'desc');
      }
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
    membersLists(){
      return this.$store.getters.membersList;
    },
    suppliersUsers(){
      return this.$store.getters.suppliersUsers;
    },
    // msgCount(){
    //   return this.$store.getters.unMessageCount;
    // },
  },
  watch:{
    addChat: _.debounce(function(){
      if(this.addChat < 1){
        this.hideList = false;
        // this.companyInfo = true;
      }else{
        this.hideList = true;
      }
    },500),
    addMember: _.debounce(function(){
      if(this.addMember < 1){
        this.hideMemberList = false;
        // this.companyInfo = true;
      }else{
        this.hideMemberList = true;
      }
    },500),
  },
  methods: {
    ...mapActions(["getAllConversations","getAllMessages","sendMessage","unreadMessagesCountCon","lastMessageRead","archiveChat","supplierList","supplierUserList","createConversation","removeConvUser"]),
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
      this.getAllMessages(this.conversationId);
      setTimeout(function(){
        container.scrollTop = container.scrollHeight;
      }, 400);
      var ids = {
        userId: this.user.id,
        conversationId: this.conversationId,
      }
      this.lastMessageRead(ids);
      var container = this.$refs.messagesSection;
      setTimeout(function(){
        container.scrollTop = container.scrollHeight;
      }, 100);
    },
    closeChat(){
      if(screen.width < 767){
        this.userList = true;
        this.showMsgBlock = false;
        this.backArrow = false;
      }
    },
    getConversations(id){
      console.log(id,'dsdasdas');
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
            'name': this.user.firstName+' '+this.user.lastName,
            'id': this.user.id,
            'company': this.chatData.group.company,
            'profilePicture': ""
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
    chatActions(data){
      var archive = {
        conversationId: data,
        userId: this.user.id,
      }
      this.archiveChat(archive);
      this.isChatMenu = false;
    },
    memberList(){
      this.supplierList();
    },
    getSupplierUsers(){
      if(this.addChat.length > 1){
        this.supplierUserList(this.addChat);
      }
    },
    getSupplierMembers(){
      this.supplierUserList(this.addMember);
    },
    addPerson(user){
      this.userObject = user;
      var userdata = {
        id: user.objectID,
        name: user.firstName+' '+user.lastName,
        lastMessageReadAt: null,
      }
      this.membersData.push(userdata);
      this.participants.push(user.objectID);
      
      this.hideMemberList = false;
    },
    createGroup(){
      var myData = {
        id: this.user.id,
        name: this.user.firstName+' '+this.user.lastName,
        lastMessageReadAt: null,
      }
      this.membersData.push(myData);
      this.participants.push(this.user.id);
      var data = {
        participants: this.participants,
        messages: [],
        participantDetails: this.membersData,
        type: 'GROUP',
        groupName: this.groupName
      }
      
      this.createConversation(data);
      this.groupChatDialog = false;
      this.isAddUser = false;
    },
    createChat(user){
      var data = {
        participants: [
           user.objectID, this.user.id,
        ],
        messages: [],
        participantDetails: [
          {
            id: user.objectID,
            name: user.firstName+' '+user.lastName,
            lastMessageReadAt: null,
          },
          {
            id: this.user.id,
            name: this.user.firstName+' '+this.user.lastName,
            lastMessageReadAt: null,
          }
        ],
        type: 'PRIVATE',
        groupName: '',
      }
      this.createConversation(data);
      this.startChatDialog = false;
      this.isAddUser = false;
    },
    // unreadCountMsg(conId){
    //   var Ids = {
    //     'userId': this.user.uid,
    //     'conversationId': conId,
    //   }
    //   // this.unreadMessagesCountCon(Ids);
    // },
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
      console.log(response.message);
      this.message = "";
      this.$refs.msgFile.value=null;
      this.$refs.myVueDropzone.removeFile(file);
      document.getElementById('dropzone').style.display = "none";
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
      // this.$store.commit('setMessagesList');
      this.sendMessage(data);
      var container = this.$refs.messagesSection;
      setTimeout(function(){
        container.scrollTop = container.scrollHeight;
      }, 500);
      this.message = '';
      this.filename = '';
      // })
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
    checkFile(name){
      this.fileExt =  name.split('.').pop();
    },
    check(ext){
      this.fileExt = ext;
    },
    removeItem(index){
      this.membersData.splice(index, 1);
      this.participants.slice(index)
      this.participants.filter((item)=>{
       console.log(item);
       if(this.user.id != item.id){
        return item;
       }
        // return this.searchUsers.toLowerCase().split(' ').every(v => item.company.toLowerCase().includes(v))
      })
    }
  },
  beforeMount() {
    this.user = this.$store.getters.userInfo;
    // this.$router.push("/messages?room_id="+this.user);
  },
  mounted() {
    this.user = this.$store.getters.userInfo;
    this.getConversations(this.user.id);
    var convo = this.$store.getters.conversations[0];
    
    if(convo.type == 'PRIVATE'){
      var membr = convo.participantDetails.filter((item)=>{
       
       if(this.user.id != item.id){
        return item;
       }
        // return this.searchUsers.toLowerCase().split(' ').every(v => item.company.toLowerCase().includes(v))
      })
      var grpName = membr[0].name;
    }else{
      var grpName = convo.groupName;
    }
    if(convo){
      this.openChat(convo,grpName);
    }
    document.title = "Messages - BidOut";
    if(screen.width < 767){
      this.userList = true;
      this.showMsgBlock = false;
      this.backArrow = false;
    }
    
    document.addEventListener('dragenter', function(e) {
      console.log(e.target.className);
     if (e.target.className == 'message-area' || e.target.className == 'messages-section' || e.target.className == 'v-list-item__content' || e.target.className == 'v-list-item__title' || e.target.className == 'own-user message-list' || e.target.className == 'message-send-area' || e.target.className == 'row' || e.target.className == 'col-sm-10 col-md-10' || e.target.className == 'msg-text-box' ) {
        document.getElementById('dropzone').style.display = "block";
      }
      else {
        document.getElementById('dropzone').style.display = "none";
      }
    });
  }
};
</script>
<style scoped lang="scss">

</style>