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
              <router-link :to="'/'+item.link" class="text-decoration-none">
                <v-img :src="`/images/${item.icon}`" width="24px" height="24px"></v-img>
              </router-link>
            </v-list-item-icon>

              
            <v-list-item-content class="text-left py-1">
              <router-link :to="'/'+item.link" class="text-decoration-none"><v-list-item-title class="font-weight-bold" v-text="item.text" v-show="showSideBar"> 
                
              </v-list-item-title></router-link>
              <span class="badge" :class="[ showSideBar ? 'msg-badge' : 'mobile-badge']" v-if="i == 3 && showMsgCount > 0"
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
                <v-img :src="`images/${item.action}`" width="24px" height="24px"></v-img>
              </v-list-item-icon>
              <v-list-item-content  class="text-left py-1" v-show="showSideBar">
                <v-list-item-title class="font-weight-bold" v-text="item.title"></v-list-item-title>
              </v-list-item-content>
            </template>
            
            <template v-for="(child,index) in item.items"
              > 
                <v-list-item
                   v-if="userDatas.role == 'admin' && (index === 0 || index === 3)"
                >
                  <v-list-item-icon class="mr-6 mt-3" v-show="!showSideBar">
                    <router-link :to="'/'+child.link" class="text-decoration-none"><v-icon v-text="child.icon"></v-icon></router-link>
                  </v-list-item-icon>
                  <v-list-item-content class="text-left py-1" v-show="showSideBar">
                    <router-link :to="'/'+child.link"  @click="isHidden = !isHidden" :class="{ 'active-btn': isHidden}" class="text-decoration-none">
                      <v-list-item-title class="font-weight-bold" v-text="child.title"></v-list-item-title>
                    </router-link>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item
                   v-if="index === 1 || index === 2"
                >
                  <v-list-item-icon class="mr-6 mt-3" v-show="!showSideBar">
                    <router-link :to="'/'+child.link" class="text-decoration-none"><v-icon v-text="child.icon"></v-icon></router-link>
                  </v-list-item-icon>
                  <v-list-item-content class="text-left py-1" v-show="showSideBar">
                    <router-link :to="'/'+child.link"  @click="isHidden = !isHidden" :class="{ 'active-btn': isHidden}" class="text-decoration-none">
                      <v-list-item-title class="font-weight-bold" v-text="child.title"></v-list-item-title>
                    </router-link>
                  </v-list-item-content>
                </v-list-item>
            </template>
              
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
                <v-icon color="#959595">mdi-logout {{showSideBar}}</v-icon>
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
      isHidden : false,
      isCreateBid : this.$store.state.isCreateBid,
        items: [
          { id: 0, text: 'Dashboard', icon: 'dashboard.png', link: 'dashboard' },
          { id: 1, text: 'View Bids', icon: 'bids.png' , link: 'view-bids' },
          // { id: 2, text: 'View Shipments', icon: 'mdi-truck' },
          { id: 3, text: 'View OFS Suppliers', icon: 'tag.png' , link: 'view-ofs-suppliers'},
          { id: 4, text: 'Messages', icon: 'message.png', link: 'messages' },
          // { id: 5, text: "Browse Public RFx's", icon: 'mdi-compass-outline' },
          // { id: 6, text: 'Manage Invoices', icon: 'mdi-calendar-text-outline' },
          // { id: 7, text: 'Reporting', icon: 'mdi-note-multiple-outline' },
        ],
        subitems: [
          {
            action: 'setting.png',
            active: false,
            items: [
              { icon: 'mdi-account-multiple',title: 'Manage Users', link: 'manage-users' },
              { icon: 'mdi-cog-outline' ,title: 'Manage Modules', link: 'manage-module' },
              { icon: 'mdi-account-multiple',title: 'Manage Templates', link: 'manage-templates' },
              { icon: 'mdi-cog-outline' ,title: 'Manage Company Profile', link: 'company-profile' },
            ],
            title: 'Company Settings'
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
    },
    userDatas(){
        return this.$store.getters.userInfo;
    },
  },
  methods: {
    ...mapActions(["signOutAction","unreadMessagesCount","getToken"]),
    signout() {
      this.signOutAction();
    },
    getUnreadMessages() {
      this.unreadMessagesCount({'userId':this.userId});
    },
    getImgUrl(pic) {
        return require('@/assets/images/'+pic)
    },
    token(){
      this.getToken();
    },
  },
  mounted() {
    this.userId = JSON.parse(localStorage.getItem("userData")).id;
    this.getUnreadMessages();
    this.token();
  },
};
</script>
<style scoped lang="scss">

</style>
