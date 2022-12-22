<template>
  <div class="navbar-module">
    <v-app-bar
        color="white"
        height="104"
        class="desktop-navbar" fixed dense app
      >
      <template>
        <v-app-bar-nav-icon @click="toggleSideBar"></v-app-bar-nav-icon>
        </template>
        <template>
          <router-link to="/dashboard" class="logo_main"><img
            :src="require('@/assets/images/green-black.png')"
            class="ml-sm-3"
          ></router-link>
        </template>
        <template>
          <div class="toggle-btn">
            <v-btn
              fab
              dark
              small
              color="#0D9648"
              @click="isCreateBid = !isCreateBid"
              :class="{ 'active-btn': isCreateBid}"
            >
              <v-icon dark>
                {{isCreateBid ? 'mdi-close' : 'mdi-plus'}}
              </v-icon>
            </v-btn>
            <div v-show="isCreateBid">
              <v-card
                  class="mx-auto menu-card"
                  min-width="290"
                  tile
                  outlined
                >
                  <v-list class="pa-0">
                    <v-list-item-group
                      color="success"
                    >
                      <v-list-item
                        v-for="(item, i) in items"
                        :key="i" class="pr-0"
                      >
                        <router-link :to="item.link" class="text-decoration-none" >
                          <v-list-item-icon class="mr-2 my-2" @click="isCreateBid = !isCreateBid">
                            <!-- <v-icon color="#0D9648" v-text="item.icon"></v-icon> -->
                            <v-img :src="`/images/${item.icon}`" width="24px" height="24px"></v-img>
                          </v-list-item-icon>
                        </router-link>
                        <v-list-item-content align-start color="#0D9648" class="pa-0">
                          <router-link :to="item.link" class="text-decoration-none">
                            <v-list-item-title v-text="item.text" color="#0D9648" @click="isCreateBid = !isCreateBid" class="py-3"></v-list-item-title>
                          </router-link>
                        </v-list-item-content>
                        
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </v-card>
            </div>
          </div>
        </template>
        <v-spacer></v-spacer>

        <v-list v-if="userDatas">
          <v-list-item class="pr-0">
            <router-link to="/edit-profile" class="d-flex text-decoration-none">
              <v-list-item-title class="mr-3">{{userDatas.firstName}} {{userDatas.lastName}}</v-list-item-title>
              <v-avatar>
                <v-img v-if="userDatas.image == null" :src="require('@/assets/images/user/demo.png')"></v-img>
                <v-img v-else :src="userDatas.image"></v-img>
              </v-avatar>
            </router-link>
          </v-list-item>
        </v-list>
      </v-app-bar>
    <div
        color="white"
        height="104"
        class="mobile-navbar"
      >
        <div class="logo-top-bar">
          <template>
            <router-link to="/dashboard" class="logo_main"><img
              :src="require('@/assets/images/green-black.png')"
              class="ml-3"
            ></router-link>
          </template>
          <template>
            <v-btn class="menu-btn" @click="isMenu = !isMenu">
              <v-icon>{{iconText}}</v-icon>
               {{menuText}}<v-icon :class="{ 'active-icon': isMenu}">mdi-chevron-down</v-icon>
            </v-btn>
            <div class="mobile-menu" v-show="isMenu">
              <v-list
                nav
                dense
                class="pa-0"
              >
                <v-list-item-group
                  color="primary"
                >
                  <v-list-item
                    v-for="(item, i) in itemss"
                    :key="i"
                    class="mb-0" 
                  >
                    <v-list-item-icon class="mr-6 mt-3 d-none">
                      <v-icon v-text="item.icon"></v-icon>
                    </v-list-item-icon>

                    <v-list-item-content class="text-left py-1">
                      <router-link :to="item.link" class="text-decoration-none"><v-list-item-title v-text="item.title" @click="getData(item)"></v-list-item-title></router-link>
                      <span class="msg-badge" v-if="i == 4">(2)</span>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
              <v-divider></v-divider>
              <v-list>
                <v-list-item-title class="sub-menu-title">Edit Corporate Profile</v-list-item-title>
              </v-list>
              <v-list
                nav
                dense
                class="pa-0"
              >
                <v-list-item-group
                  color="primary"
                >
                  <v-list-item
                    class="mb-0"
                  >
                    <v-list-item-icon class="mr-6 mt-3 d-none">
                      <v-icon></v-icon>
                    </v-list-item-icon>
                    <v-list-item-content class="text-left py-1">
                      <router-link to="/manage-users" class="text-decoration-none"><v-list-item-title @click="getData(manageUser)">Manage Users</v-list-item-title></router-link>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
              <v-list
                nav
                dense
                class="pa-0"
              >
                <v-list-item-group
                  color="primary"
                >
                  <v-list-item
                    class="mb-0"
                  >
                    <v-list-item-icon class="mr-6 mt-3 d-none">
                      <v-icon></v-icon>
                    </v-list-item-icon>
                    <v-list-item-content class="text-left py-1">
                      <router-link to="/manage-module" class="text-decoration-none"><v-list-item-title @click="getData(manageModule)">Manage Modules</v-list-item-title></router-link>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
              <v-divider></v-divider>
              <v-list class="px-4 activity-menu" >
                <v-list-item-title @click="getData(profileMenu)" class="text-left" v-text="profileMenu.title"></v-list-item-title>
              </v-list>
              <v-divider></v-divider>
              <v-list class="px-4 activity-menu">
                <v-list-item-title @click="getData(activityMenu); toggleActivityPanel();" class="text-left" v-text="activityMenu.title"></v-list-item-title>
              </v-list>
              <v-list class="px-4">
                <v-list-item-title  @click="signout" class="text-left" >Logout</v-list-item-title>
              </v-list>
            </div>
          </template>
        </div>
        <div class="menu-bottom-bar" :class="[ activityPanel ? 'd-none' : '']">
          <router-link to="/create-bid" class="text-decoration-none">
            <v-select
              :items="items"
              v-model="select"
              success
              outlined 
              class="mb-0"
            ></v-select>
          </router-link>
        </div>
      </div>
  </div>
</template>

<script>

export default {
  name : "Navbar",
  data() {
    return {
      isCreateBid : this.$store.state.isCreateBid,
      isMenu : false,
      isActive : false,
      isActivity : false,
      iconText: 'mdi-view-dashboard-outline',
      menuText: 'Dashboard',
      select: {text: 'Create a new Bid',link: '/create' , icon: 'bids.png'},
      items: [
        { text: 'Create a new Bid', link: '/create' , icon: 'bids.png' },
       
      ],
        itemss: [
          { title: 'Dashboard', icon: 'mdi-view-dashboard-outline', link: '/dashboard' },
          { title: 'View Bids', icon: 'mdi-gavel', link: '/view-bids' },
         
          { title: 'View OFS Suppliers', icon: 'mdi-tag-outline', link:'/view-ofs-suppliers' },
          { title: 'Messages', icon: 'mdi-email-outline', link: '/messages' },
        ],
        subitems: [
          {
            action: 'mdi-clipboard-account-outline',
            active: true,
            items: [
              { title: 'Manage Users', link: 'manage-users' },
              { title: 'Manage Module', link: 'manage-module' },
            ],
            title: 'Edit Corporate Profile',
          },
        ],
        manageUser: { title: 'Manage Users', icon: 'mdi-account-outline' },
        manageModule: { title: 'Manage Module', icon: 'mdi-cog-outline' },
        profileMenu: { title: 'Profile', icon: 'mdi-account-outline' },
        activityMenu: { title: 'Activity', icon: 'mdi-bell-outline' },
    };
  },
  computed: {
    activityPanel(){
        return this.$store.getters.g_activityPanel;
    },
    userDatas(){
        return this.$store.getters.userInfo;
    },
  },
  methods: {
    openBox(){
      this.openmenu = true;
    },
    getData(data){
      this.iconText = data.icon;
      this.menuText = data.title;
    },
    signout() {
      this.$store.dispatch('signOutAction')
    },
    toggleSideBar(){
      this.$store.dispatch('toggleSideMenu');
    },
    toggleActivityPanel(){
      this.$store.dispatch('activityPanel');
      this.isMenu = false;
    },
    openDashboard(index){
      this.$store.dispatch('activityPanel');
      this.isMenu = false;
    }
  },
};
</script>
<style scoped lang="scss">

</style>
