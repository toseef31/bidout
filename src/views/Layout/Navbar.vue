<template>
  <div>
    <v-app-bar
        color="white"
        height="104"
        class="desktop-navbar"
      >
      <template>
        <v-app-bar-nav-icon @click="toggleSideBar"></v-app-bar-nav-icon>
        </template>
        <template>
          <router-link to="/dashboard"><v-img
          max-height="150"
          max-width="150"
            :src="require('@/assets/images/logo.png')"
            class="ml-3"
          ></v-img></router-link>
        </template>
        <template>
          <div class="toggle-btn">
            <v-btn
              fab
              dark
              small
              color="#0D9648"
              @click="isHidden = !isHidden"
              :class="{ 'active-btn': isHidden}"
            >
              <v-icon dark>
                {{isHidden ? 'mdi-close' : 'mdi-plus'}}
              </v-icon>
            </v-btn>
            <div v-show="isHidden">
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
                        :key="i"
                      >
                        <v-list-item-icon class="mr-2 my-2">
                          <v-icon color="#0D9648" v-text="item.icon"></v-icon>
                        </v-list-item-icon>
                        <v-list-item-content align-start color="#0D9648" class="pa-0">
                          <v-list-item-title v-text="item.text" color="#0D9648"></v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </v-card>
            </div>
          </div>
        </template>
        <v-spacer></v-spacer>

        <v-list>
          <v-list-item class="pr-0">
            <a href="" class="d-flex text-decoration-none">
              <v-list-item-title class="mr-3">Aubrey  McClendon</v-list-item-title>
              <v-avatar>
                <v-img :src="require('@/assets/images/user.png')"></v-img>
              </v-avatar>
            </a>
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
            <v-img
            max-height="150"
            max-width="150"
              :src="require('@/assets/images/logo.png')"
            ></v-img>
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
                    class="mb-0" @click="getData(item); openDashboard(i)"
                  >
                    <v-list-item-icon class="mr-6 mt-3 d-none">
                      <v-icon v-text="item.icon"></v-icon>
                    </v-list-item-icon>

                    <v-list-item-content class="text-left py-1">
                      <router-link :to="item.link" class="text-decoration-none"><v-list-item-title v-text="item.title"></v-list-item-title></router-link>
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
                      <v-list-item-title>Manage Modules</v-list-item-title>
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
          <v-select
            :items="items"
            v-model="select"
            success
            outlined 
            class="mb-0"
          ></v-select>
        </div>
      </div>
  </div>
</template>

<script>

export default {
  name : "Navbar",
  data() {
    return {
      isHidden : false,
      isMenu : false,
      isActive : false,
      isActivity : false,
      iconText: 'mdi-view-dashboard-outline',
      menuText: 'Dashboard',
      select: {text: 'Create a new Bid', icon: 'mdi-gavel'},
      items: [
        { text: 'Create a new Bid', icon: 'mdi-gavel' },
        // { text: 'Create a new Shipment', icon: 'mdi-truck' },
      ],
        itemss: [
          { title: 'Dashboard', icon: 'mdi-view-dashboard-outline', link: 'dashboard' },
          { title: 'View Bids', icon: 'mdi-gavel', link: 'view-bids' },
          // { title: 'View Shipments', icon: 'mdi-truck' },
          { title: 'View OFS Suppliers', icon: 'mdi-tag-outline', link:'view-ofs-suppliers' },
          { title: 'Messages', icon: 'mdi-email-outline', link: 'chat' },
          // { title: "Browse Public RFx's", icon: 'mdi-compass-outline' },
          // { title: 'Manage Invoices', icon: 'mdi-calendar-text-outline' },
          // { title: 'Reporting', icon: 'mdi-note-multiple-outline' },
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
    }
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
@import '@/assets/styles/navbar.scss';
</style>
