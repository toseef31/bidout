<template>
  <div class="users-lists">
    <v-tabs
      v-model="convTab"
      align-with-title grow hide-slider
    >
      <v-tab
        v-for="item in chatTab"
        :key="item" active-class="activeChat-tab" class="ml-0 font-weight-bold"
      >
        {{ item }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="convTab">
      <v-tab-item> 
        <v-list two-line  class="py-0">
          <v-list-item-group
            v-model="selectedUser"
            active-class="grey--text">
            <template v-for="(conversation, index) in conversationsList">
              <v-list-item   @click="openChat(conversation,conversation.groupName)" :key="conversation._id"  :class="{ 'grey--text v-list-item--active' : conversation._id === chatData.group._id }" v-if="conversation.type == 'GROUP'">
                <template>
                  <v-list-item-avatar>
                    <v-icon>mdi-account-group-outline</v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title v-if="conversation.company == ''" v-text="conversation.company"></v-list-item-title>
                    <v-list-item-title v-else v-text="conversation.groupName"></v-list-item-title>

                    <v-list-item-subtitle v-if="conversation.isBid == true"
                      class="text--primary"
                      v-text="conversation.bidTitle"
                    ></v-list-item-subtitle>

                    <v-list-item-subtitle v-if="conversation.isBid == true">Bid #{{conversation.bidSerial}}</v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-action class="mt-n5">
                    <v-list-item-action-text v-if="!conversation.latestMessage || conversation.latestMessage == null">{{ istoday(conversation.updatedAt) }}</v-list-item-action-text>
                      <v-list-item-action-text v-else>{{ istoday(conversation.latestMessage) }}</v-list-item-action-text>
                  </v-list-item-action>
                  <!-- <v-badge
                      color="#0D9648"
                      :value="msgCount"
                      :content="msgCount" overlap
                    ></v-badge> -->
                </template>
              </v-list-item>
              <v-list-item v-if="conversation.type == 'PRIVATE' && participant.id != user.id"  v-for="participant in conversation.participantDetails" @click="openChat(conversation,participant.name)" :class="{ 'grey--text v-list-item--active' : conversation._id === chatData.group._id }" :key="participant.id">
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
                    <v-list-item-action-text v-if="!conversation.latestMessage || conversation.latestMessage == null">{{ istoday(conversation.updatedAt) }}</v-list-item-action-text>
                    <v-list-item-action-text v-else>{{ istoday(conversation.latestMessage) }}</v-list-item-action-text>
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
      </v-tab-item>
      <v-tab-item>
      <v-list two-line  class="py-0" v-if="archiveList">
        <v-list-item-group
          v-model="selectedUser"
          active-class="grey--text">
          <template v-for="(conversation, index) in archiveList">
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

                <v-list-item-action>
                  <v-btn color="rgba(13, 150, 72, 0.1)" elevation="0" class="text-capitalize archive-btn" @click="unarchive(conversation._id)">
                    Unarchive
                  </v-btn>
                </v-list-item-action>
                <!-- <v-badge
                    color="#0D9648"
                    :value="msgCount"
                    :content="msgCount" overlap
                  ></v-badge> -->
              </template>
              
            </v-list-item>
            <v-list-item v-if="conversation.type == 'PRIVATE' && participant.id != user.id"  v-for="participant in conversation.participantDetails" @click="openChat(conversation,participant.name)" :key="participant.id">
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
                  <v-btn color="rgba(13, 150, 72, 0.1)" elevation="0" class="text-capitalize archive-btn" @click="unarchive(conversation._id)">
                    Unarchive
                  </v-btn>
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
        <v-card
          flat v-else
        >
          <v-card-text><h3>There is no archive chat</h3></v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>
<script>
  import _ from 'lodash';
  import VueMoment from 'vue-moment';
  import moment from 'moment-timezone';
  import { mapActions } from "vuex";
export default {
  props: ["searchUser"],
  data() {
    return {
      selectedUser: null,
      convTab: null,
      chatTab: [
        'All', 'Archive',
      ],
      userList : true,
      selected: null,
      chatData: '',
      searchUsers: this.searchUser,
      user:'',
      conversationId : '',
      backArrow : false,
      loading: true,
    };
  },
  computed:{
    conversationsList(){
      if(this.$store.state.chat.searchConv != null){
        return _.orderBy(this.$store.getters.conversations.filter((item)=>{
          return this.$store.state.chat.searchConv.toLowerCase().split(' ').every(v => item.company.toLowerCase().includes(v))
        }), 'updatedAt', 'desc')
      }else{
        return _.orderBy(this.$store.getters.conversations, 'updatedAt', 'desc');
      }
    },
    archiveList(){
      return this.$store.getters.archiveList;
    },
  },
  methods: {
    ...mapActions(["getAllConversations","getAllMessages","lastMessageRead","getArchiveChats","unArchiveConversation"]),
    getConversations(id){
      this.getAllConversations(id);
    },
    openChat(group,name){
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
        this.$emit('membersData',this.chatData.group.participantDetails);
      }
      var ids = {
        userId: this.user.id,
        conversationId: this.conversationId,
      }
      this.$emit('ChatDatas',this.chatData);
      this.$emit('callTest', group,name)
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
    istoday (date) {
      return moment(date).calendar();
    },
  },
  beforeMount() {
    this.user = this.$store.getters.userInfo;
  },
  updated(){
    console.log('dddds',this.searchUser);
  },
  mounted: async function() { 
    
    this.archiveConversations(this.user.id);
    var convo = await _.orderBy(this.$store.getters.conversations, 'latestMessage', 'desc')[0];
    console.log(convo,'dada');
    if(convo.type == 'PRIVATE'){
      var membr = convo.participantDetails.filter((item)=>{
       if(this.user.id != item.id){
        return item;
       }
      })
      var grpName = membr[0].name;
    }else{
      var grpName = convo.groupName;
    }
    if(convo){ 
      await this.openChat(convo,grpName);
    }
    console.log('ddsda',this.$store.state.chat.searchConv);
  } 
};
</script>