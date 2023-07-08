<template>
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
                  height="48px" width="100%"
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
                    :items="allMembers"
                    item-value="id" item-text="name"
                    chips
                    outlined
                    auto-select-first
                    full-width
                    hide-details
                    hide-no-data
                    hide-selected
                    single-line 
                    deletable-chips
                    search-input
                    return-object
                    class="text-left addChat-box"
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
</template>
<script>
  import _ from 'lodash';
  import { mapActions } from "vuex";
export default {
  data() {
    return {
      isChatMenu : false,
      dialog: false,
      removeMember: '',
      chatData: '',
      conversationId: '',
      allMembers: [],
      toggleMenu: [
        { text: 'Archive Chat', icon: 'mdi-archive-outline' },
      ],
      loading: true,
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
  methods: {
    ...mapActions(["getAllConversations","removeConvUser","archiveChat","getAllMessages","getArchiveChats","lastMessageRead"]),
    getConversations(id){
      this.getAllConversations(id, page: 1, limit: 10);
    },
    openChat(group,name){
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
        userId: this.user._id,
        conversationId: this.conversationId,
      }
      this.getAllMessages(ids);
      
      
      this.lastMessageRead(ids);
      
      this.isChatMenu  = false;
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
    chatActions(data){
      var archivess = {
        conversationId: data,
        userId: this.user.id,
      }
      this.archiveChat(archivess);
      this.isChatMenu = false;
      this.chatData.name = '';
    },
  },
  beforeMount() {
    this.user = this.$store.getters.userInfo;
  },
  mounted: async function(){
    
  } 
};
</script>
