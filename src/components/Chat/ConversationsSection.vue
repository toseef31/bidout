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
              <template v-if="chatData">
                <v-list-item   @click="openChat(conversation,conversation.displayName)" :key="conversation._id"  :class="{ 'grey--text v-list-item--active' : conversation._id ===  conversationsIds }">
                <template>
                  <v-list-item-avatar>
                    <v-icon>mdi-domain</v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title> {{  getConversationName(conversation)  }} </v-list-item-title>

                    <v-list-item-subtitle v-if="conversation.isBid === true && conversation.bid != null"
                      class="text--primary"
                      v-text="conversation.bid.title"
                    ></v-list-item-subtitle>

                    <v-list-item-subtitle v-if="conversation.isBid === true  && conversation.bid != null">Bid #{{conversation.bid.serial}}</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action class="mt-n5">
                    <v-list-item-action-text v-if="!conversation.latestMessage || conversation.latestMessage == null">{{ istoday(conversation.createdAt) }}</v-list-item-action-text>

                      <v-list-item-action-text v-else>{{ istoday(conversation.latestMessage) }}</v-list-item-action-text>
                  </v-list-item-action>
                  <!-- <v-badge
                      color="#0D9648"
                      :value="msgCount"
                      :content="msgCount" overlap
                    ></v-badge> -->
                </template>
              </v-list-item>
              </template>
              <v-list-item v-if="conversation.type == 'PRIVATE' && participant._id != user._id"  v-for="participant in conversation.participantDetails" @click="openChat(conversation,participant.name)" :class="{ 'grey--text v-list-item--active' : conversation._id === conversationsIds }" :key="participant.id" class="d-none">
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
            <infinite-loading @infinite="loadMore">
              <div slot="no-more"></div>
            </infinite-loading>
          </v-list-item-group>
        </v-list>
      </v-tab-item>
      <v-tab-item>
      <v-list two-line  class="py-0" v-if="archiveList">
        <v-list-item-group
          v-model="selectedUser"
          active-class="grey--text">
          <template v-for="(conversation, index) in archiveList">
            <v-list-item :key="conversation._id">
              <template>
                <v-list-item-avatar>
                  <v-icon>mdi-domain</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <!-- <v-list-item-title v-if="conversation.displayName == ''" v-text="conversation.displayName"></v-list-item-title> -->
                  <v-list-item-title >{{  getConversationName(conversation)  }}</v-list-item-title>

                  <!-- <v-list-item-subtitle  v-if="conversation.isBid == true"
                    class="text--primary"
                    v-text="conversation.bidTitle"
                  ></v-list-item-subtitle> -->

                  <!-- <v-list-item-subtitle  v-if="conversation.isBid == true">Bid #{{conversation.bidSerial}}</v-list-item-subtitle> -->
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
import { mapActions, mapState, mapGetters } from 'vuex';
import InfiniteLoading from 'vue-infinite-loading';
import axios from 'axios';

export default {
  components: {
    InfiniteLoading,
  },
  props: ['searchUser','conversationsIds'],
  data() {
    return {
      selectedUser: null,
      convTab: null,
      chatTab: [
        'All', 'Archive',
      ],
      userList: true,
      selected: null,
      chatData: '',
      searchUsers: this.searchUser,
      user: '',
      conversationId: '',
      backArrow: false,
      loading: true,
      page: 1,
      list: [],
    };
  },
  computed: {
    ...mapGetters(['noConversation']),
    conversationsList() {
      if (this.$store.state.chat.searchConv != '') {
        return _.orderBy(this.$store.getters.allConversations.filter((item) => {
          const searchTerms = this.$store.state.chat.searchConv.toLowerCase().split(' ');
          const displayNameMatches = searchTerms.every((v) => item.displayName.toLowerCase().includes(v));
          const bidTitleMatches = searchTerms.every((v) => item.bid.title.toLowerCase().includes(v));
          return displayNameMatches || bidTitleMatches;
        }), 'latestMessage', 'desc');
      } else {
        if (this.$store.getters.conversations) {
          this.$store.commit('setPageLoader', false);
          return this.$store.getters.conversations;
        }else{
          this.$store.commit('setPageLoader', true);
        }
      }
      
    },
    archiveList() {
      return this.$store.getters.archiveList;
    },
    loaderPage() {
      return this.$store.getters.pageLoader;
    },
  },
  watch: {
    conversationsList: {
      immediate: true,
      handler(conversations) {
        if (conversations.length > 0) {
          const group = conversations[0];
          const name = conversations[0].groupName;
          const obj = {
            group,
            name,
          };
          this.conversationId = group._id;
          this.chatData = obj;
          this.openChat(group, name);
        }
      }
    },
  },
  methods: {
    ...mapActions(['getAllConversations', 'getAllConversationsLoadMore', 'getAllMessages', 'lastMessageRead', 'getArchiveChats', 'unArchiveConversation']),
    getConversations(id) {
      this.getAllConversations({id :id, page: this.page});
    },
    loadMore($state) {
      this.getAllConversationsLoadMore({id: this.user._id, page: this.page})
        .then(( data ) => {
          if (data.length) {
            this.page += 1;
            this.$store.commit('addConverstaionList', data);
            $state.loaded();
            // this.$store.commit('INCREMENT_PAGE');
          } else {
            $state.complete();
          }
        })
        .catch(() => {
          $state.complete();
        });
    },
    openChat(group, name) {
      this.$store.state.openChatFlag = false;
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
        this.$emit('membersData', this.chatData.group.participantDetails);
      }
      const ids = {
        userId: this.user._id,
        conversationId: this.conversationId,
      };
      this.$emit('ChatDatas', this.chatData);
      this.$emit('callTest', group, name);
    },
    archiveConversations(id) {
      this.getArchiveChats(id);
    },
    unarchive(id) {
      const conv = {
        conversationId: id,
        userId: this.user._id,
      };
      this.unArchiveConversation(conv);
    },
    istoday(date) {
      const zone = moment.tz.guess();
      return moment(date).tz(zone).calendar();
    },
    getConversationName(conversation) {
      return conversation.displayName;
    },
  },
  async created() {
    this.user = this.$store.getters.userInfo;
    this.archiveConversations(this.user._id);
    const chatArr = this.$store.getters.conversations;
    if (chatArr != null) {
      chatArr.forEach((msg, index) => {
        if (!msg.latestMessage) {
          msg.latestMessage = msg.createdAt; // add the new field
        }
      });
    }
    const convo = await _.orderBy(chatArr, 'latestMessage', 'desc')[0];
    if (convo) {
      if (convo.type == 'PRIVATE') {
        const membr = convo.participantDetails.filter((item) => {
          if (this.user._id != item._id) {
            return item;
          }
        });
        var grpName = membr[0].name;
      } else {
        var grpName = convo.displayName;
      }
      
      await this.openChat(convo, grpName);
    }
  },
  beforeMount() {
    this.$store.commit('setsearchConv', '');
  },
  updated() {
    
  },
  async mounted() {
    
  },
};
</script>
