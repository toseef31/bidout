<template>

  <div class="leftSide-module">
    <div class="desktop-view">
     
      <v-list
        nav
        dense
        class="pa-0 main-menu" href=""
      >
        <v-list-item-group 
          color="primary"
        >
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
          >
            <v-list-item-icon class="mr-6 mt-3">
              <router-link :to="item.link" class="text-decoration-none"><v-icon v-text="item.icon"></v-icon></router-link>
            </v-list-item-icon>

              
            <v-list-item-content class="text-left py-1">
              <router-link :to="item.link" class="text-decoration-none"><v-list-item-title class="font-weight-bold" v-text="item.text" v-show="showSideBar"> 
                
              </v-list-item-title></router-link>
              <span class="badge" :class="[ showSideBar ? 'msg-badge' : 'mobile-badge']" v-if="i == 3"
                >{{showMsgCount}}</span>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <v-divider></v-divider>
      <div class="sidebar-bottomMenu">
        <v-list class="pa-0">
          <v-list-group 
            v-for="item in subitems"
            :key="item.title"
            v-model="item.active"
            no-action
            class="px-0 sub-menu-item"
          >
            <template v-slot:activator>
              <v-list-item-icon class="mr-6 mt-3">
                <v-icon v-text="item.action"></v-icon>
              </v-list-item-icon>
              <v-list-item-content  class="text-left py-1" v-show="showSideBar">
                <v-list-item-title class="font-weight-bold" v-text="item.title"></v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item
              v-for="child in item.items"
              :key="child.title"
            >
              <v-list-item-icon class="mr-6 mt-3" v-show="!showSideBar">
                <v-icon v-text="child.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content class="text-left py-1" v-show="showSideBar">
                <router-link :to="child.link" class="text-decoration-none">
                  <v-list-item-title class="font-weight-bold" v-text="child.title"></v-list-item-title>
                </router-link>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </v-list>
        <v-list
          nav
          dense 
          class="pa-0"
        >
          <v-list-item-group
            color="primary"
            class="px-0"
          >
            <v-list-item>
              <v-list-item-icon class="mr-6 mt-3">
                <v-icon>mdi-logout {{showSideBar}}</v-icon>
              </v-list-item-icon>

              <v-list-item-content class="text-left py-1" v-show="showSideBar">
                <v-list-item-title class="font-weight-bold"  @click="signout">Logout</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name : "LeftSidebar",
  data() {
    return {
      selectedItem: 0,
      showSide : true,
        items: [
          { id: 0, text: 'Dashboard', icon: 'mdi-view-dashboard-outline', link: 'dashboard' },
          { id: 1, text: 'View Bids', icon: 'mdi-gavel' , link: 'view-bids' },
          // { id: 2, text: 'View Shipments', icon: 'mdi-truck' },
          { id: 3, text: 'View OFS Suppliers', icon: 'mdi-tag-outline' , link: 'view-ofs-suppliers'},
          { id: 4, text: 'Messages', icon: 'mdi-email-outline', link: 'messages' },
          // { id: 5, text: "Browse Public RFx's", icon: 'mdi-compass-outline' },
          // { id: 6, text: 'Manage Invoices', icon: 'mdi-calendar-text-outline' },
          // { id: 7, text: 'Reporting', icon: 'mdi-note-multiple-outline' },
        ],
        subitems: [
          {
            action: 'mdi-clipboard-account-outline',
            active: false,
            items: [
              { icon: 'mdi-account-multiple',title: 'Manage Users', link: 'manage-users' },
              { icon: 'mdi-cog-outline' ,title: 'Manage Module', link: 'manage-module' },
            ],
            title: 'Edit Corporate Profile'
          },
        ],
        userData: '',
        userId: '',
        unreadMsgCount : ''
    };
  },
  computed:{
    showSideBar(){
        return this.$store.getters.g_sideBarOpen;
    },
    showMsgCount(){
        return this.$store.getters.unreadCount;
    }
  },
  methods: {
    ...mapActions(["signOutAction","unreadMessagesCount"]),
    signout() {
      this.signOutAction();
    },
    getUnreadMessages() {
      this.unreadMessagesCount({'userId':this.userId});
    }
  },
  mounted() {
    this.userId = JSON.parse(localStorage.getItem("userData")).id;
    this.getUnreadMessages();
  },
};
</script>
<style scoped lang="scss">

</style>
