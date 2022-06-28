<template>

  <div class="desktop-view">
   
    <v-list
      nav
      dense
      class="pa-0 main-menu"
    >
      <v-list-item-group
        v-model="selectedItem"
        color="primary"
      >
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
        >
          <v-list-item-icon class="mr-6 mt-3">
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>

          <v-list-item-content class="text-left py-1">
            <v-list-item-title class="font-weight-bold" v-text="item.text" v-show="showSideBar"> 

            </v-list-item-title>
            <span class="badge" :class="[ showSideBar ? 'msg-badge' : 'mobile-badge']" v-if="i == 3"
              >{{unreadMsgCount}}</span>
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
              <v-list-item-title class="font-weight-bold" v-text="child.title"></v-list-item-title>
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
</template>

<script>
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import axios from 'axios';
export default {
  name : "LeftSidebar",
  data() {
    return {
      selectedItem: 0,
      showSide : true,
        items: [
          { id: 0, text: 'Dashboard', icon: 'mdi-view-dashboard-outline' },
          { id: 1, text: 'View Bids', icon: 'mdi-gavel' },
          // { id: 2, text: 'View Shipments', icon: 'mdi-truck' },
          { id: 3, text: 'View OFS Suppliers', icon: 'mdi-tag-outline' },
          { id: 4, text: 'Messages', icon: 'mdi-email-outline' },
          // { id: 5, text: "Browse Public RFx's", icon: 'mdi-compass-outline' },
          // { id: 6, text: 'Manage Invoices', icon: 'mdi-calendar-text-outline' },
          // { id: 7, text: 'Reporting', icon: 'mdi-note-multiple-outline' },
        ],
        subitems: [
          {
            action: 'mdi-clipboard-account-outline',
            active: false,
            items: [
              { icon: 'mdi-account-multiple',title: 'Manage Users' },
              { icon: 'mdi-cog-outline' ,title: 'Manage Module' },
            ],
            title: 'Edit Corporate Profile',
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
    }
  },
  methods: {
    signout() {
      // alert("gdfgdf");
      firebase
        .auth()
        .signOut()
        .then((result) => {
          // console.log(result);
          localStorage.removeItem("userData");
          this.$router.replace({
            name: "Login"
          });
        });
    },
    getUnreadMessages() {
      axios.post('/chat/countUnreadMessages',{'userId':this.userId})
       .then(responce => {
        this.unreadMsgCount = responce.data.totalUnreadMessages;
      })
    }
  },
  mounted() {
    this.userId = localStorage.getItem('userId');
    this.getUnreadMessages();
  },
};
</script>
<style scoped lang="scss">
.v-list-item{
  min-height: 48px;
  margin-bottom: 0 !important;
  position: relative;
  .msg-badge{
    position: absolute;
    width: 32px;
    height: 28px;
    background: #0D9648;
    color: white;
    text-align: center;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    font-weight: 700;
    right: 12%;
  }
  .mobile-badge{
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    top: 5%;
    right: 12%;
    background: #0D9648;
    color: white;
    display: flex;
    text-align: center;
    font-size: 12px;
    justify-content: center;
    align-items: center;
    font-weight: 600;
  }
}
.v-list-item-group .v-list-item--active::after{
  background: #FBFBFB;
  border-right: 4px solid #0d9648;
  opacity: 1;
}
.main-menu{
  margin-bottom: 22px;
}
.v-list-item__title{
  font-size: 16px !important;
  line-height: 20px;
  color: #959595;
  line-height: 2.5rem !important;
}
.v-list .v-list-item--active .v-icon{
  color: #0d9648;
}
.v-list-item--active .v-list-item__title{
    color: #0d9648 !important;
}
.v-list-item--link:before {
  background-color: transparent;
}
.sidebar-bottomMenu{
  position: absolute;
  bottom: 5%;
}
.sub-menu-item{
  padding-top: 20px;
  .v-list-item{
    padding: 0 10px
  }
  ::v-deep .v-list-item{
    padding:  0 8px;
  }
  ::v-deep .v-list-item--active .v-icon {
      color: #0d9648;
  }
  .v-list-group__items > .v-list-item{
    padding-left: 56px;
  }
  .v-list .v-list-item--active {
      color: #0d9648;
  }
  .v-list-item--link:before{
    background-color: transparent;
  }
  .v-list-group .v-list-group__header .v-list-item__icon.v-list-group__header__append-icon .material-icons{
    caret-color: red;
  }

}
.toggleLeft-sidebar{
  .sub-menu-item {
    .v-list-group__items > .v-list-item{
      padding-left: 9px;
    }
  }

}
@media(max-width:  768px){
  .desktop-view{
    display: none;
  }
}
</style>
