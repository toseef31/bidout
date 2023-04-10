<template>
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
  <div class="add-people d-none">
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

                <v-autocomplete
                  v-model="addChat"
                  :items="membersLists"
                  item-value="id" item-text="firstName"
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
                  class="text-left" @keydown="getSupplierUsers"
                ></v-autocomplete>
              </v-card-text>
              <v-card-actions class="justify-end flex-column text-right">
                <v-spacer></v-spacer>
                <v-btn
                  color="#0D9648"
                  large class="white--text px-6 font-weight-bold text-capitalize" @click="createChat"
                >
                 Create Chat
                </v-btn>
              </v-card-actions>
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
                  outlined class="addChat-box"
                >
                </v-text-field>
                <label class="d-block text-left input-label font-weight-bold black--text mt-5">Add Users</label>
                <v-text-field
                  v-model="addMember"
                  hide-details
                  outlined class="addChat-box"
                  prepend-inner-icon="mdi-magnify" @keyup="getSupplierMembers"
                >
                </v-text-field>
                <label class="d-block text-left input-label font-weight-bold black--text mt-5">Add Users</label>
                
                <v-list class="company-list member-lists">
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
</template>
<script>
  import _ from 'lodash';
  import { mapActions } from "vuex";
export default {
  
  data() {
    return {
      isAddUser : false,
      searchUsers: '',
      startChatDialog: false,
      groupChatDialog: false,
      addChat: '',
      addMember: '',
      groupName: '',
      hideMemberList: false,
      membersData: [],
      participants: [],
      participantDetails: [],
      user:'',
      hideList: false,
      userObject: '',
    };
  },
  computed:{
    membersLists(){
      return this.$store.getters.membersList;
    },
    suppliersUsers(){
      return this.$store.getters.suppliersUsers;
    },
    archiveList(){
      return this.$store.getters.archiveList;
    },
  },
  watch:{
    addChat: _.debounce(function(){
      if(this.addChat < 1){
        this.hideList = false;
        
      }else{
        this.hideList = true;
      }
    },500),
    addMember: _.debounce(function(){
      if(this.addMember < 1){
        this.hideMemberList = false;
        
      }else{
        this.hideMemberList = true;
      }
    },500),
    searchUsers(){
      this.$store.commit('setsearchConv', this.searchUsers);
    }
  },
  methods: {
    ...mapActions(["supplierList","supplierUserList","createConversation","getArchiveChats","unArchiveConversation"]),
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
      this.addMember = '';
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
    createChat(){
      var data = {
        participants: [
           this.addChat.id, this.user.id,
        ],
        messages: [],
        participantDetails: [
          {
            id: this.addChat.id,
            name: this.addChat.firstName+' '+this.addChat.lastName,
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
    removeItem(index){
      this.membersData.splice(index, 1);
      this.participants.slice(index)
      this.participants.filter((item)=>{
       if(this.user.id != item.id){
        return item;
       }
      })
    },
    archiveConversations(id){
      this.getArchiveChats(id);
    },
    unarchive(id){
      var conv = {
        conversationId: id,
        userId: this.user.id,
      }
      this.unArchiveConversation(conv);
    },
  },
  beforeMount() {
    this.user = this.$store.getters.userInfo;
  },
  mounted() {
    this.getSupplierUsers();
    this.memberList();
  } 
};
</script>