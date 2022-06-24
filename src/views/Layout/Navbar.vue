<template>
  <div>
    <v-app-bar
        color="white"
        height="104"
        class="desktop-navbar"
      >
      <template>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        </template>
        <template>
          <v-img
          max-height="150"
          max-width="150"
            :src="require('@/assets/images/logo.png')"
            class="ml-3"
          ></v-img>
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
          <v-list-item>
            <v-list-item-title class="mr-3">Aubrey  McClendon</v-list-item-title>
            <v-avatar>
              <v-img :src="require('@/assets/images/user.png')"></v-img>
            </v-avatar>
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
                  v-model="selectedItem"
                  color="primary"
                >
                  <v-list-item
                    v-for="(item, i) in itemss"
                    :key="i"
                    class="mb-0" @click="getData(item)"
                  >
                    <v-list-item-icon class="mr-6 mt-3 d-none">
                      <v-icon v-text="item.icon"></v-icon>
                    </v-list-item-icon>

                    <v-list-item-content class="text-left py-1">
                      <v-list-item-title v-text="item.title"></v-list-item-title>
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
                      <v-list-item-title>Manage Users</v-list-item-title>
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
              <v-list class="px-4" >
                <v-list-item-title @click="getData(profileMenu)" class="text-left" v-text="profileMenu.title"></v-list-item-title>
              </v-list>
              <v-divider></v-divider>
              <v-list class="px-4">
                <v-list-item-title @click="getData(activityMenu)" class="text-left" v-text="activityMenu.title"></v-list-item-title>
              </v-list>
              <v-list class="px-4">
                <v-list-item-title  @click="signout" class="text-left" >Logout</v-list-item-title>
              </v-list>
            </div>
          </template>
        </div>
        <div class="menu-bottom-bar">
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
        { text: 'Create a new Shipment', icon: 'mdi-truck' },
      ],
      selectedItem: 0,
        itemss: [
          { title: 'Dashboard', icon: 'mdi-view-dashboard-outline' },
          { title: 'View Bids', icon: 'mdi-gavel' },
          { title: 'View Shipments', icon: 'mdi-truck' },
          { title: 'View OFS Suppliers', icon: 'mdi-tag-outline' },
          { title: 'Messages', icon: 'mdi-email-outline' },
          { title: "Browse Public RFx's", icon: 'mdi-compass-outline' },
          { title: 'Manage Invoices', icon: 'mdi-calendar-text-outline' },
          { title: 'Reporting', icon: 'mdi-note-multiple-outline' },
        ],
        subitems: [
          {
            action: 'mdi-clipboard-account-outline',
            active: true,
            items: [
              { title: 'Manage Users' },
              { title: 'Manage Module' },
            ],
            title: 'Edit Corporate Profile',
          },
        ],
        profileMenu: { title: 'Profile', icon: 'mdi-account-outline' },
        activityMenu: { title: 'Activity', icon: 'mdi-bell-outline' },
    };
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
    }
  },
};
</script>
<style scoped lang="scss">
.v-sheet.v-app-bar{
  box-shadow: none !important;
  .toggle-btn{
    position: relative;
    width: 24%;
    .active-btn{
      border-bottom-right-radius: 0;
      border-top-right-radius: 0;
    }
    .menu-card{
      position: absolute;
      left: 55%;
      top: 0;
      border: 2px solid #B8B8B8;
      border-radius: 0 8px 8px 8px !important;
      .menu-card .v-list{
        padding: 0;
      }
      .v-list-item__icon{
        margin-right: 10px;
      }
      .v-list-item__content{
        text-align: left;
      }
    }
  }
}
.logo-top-bar{
  display: flex;
  justify-content: space-between;
  padding: 28px 16px;
}
.menu-bottom-bar{
  padding: 28px 16px;
  border: 1px solid #F2F2F2;
  border-right: 0;
  border-left: 0;
  
  ::v-deep .v-input {
    height: 55px;
    background: #0d9648;
    border: 0;
    color: #fff !important;
    caret-color:  #fff !important;
  }
  ::v-deep .v-select__selection--comma{
    color: #fff !important;
  }
  ::v-deep .material-icons{
    color: #fff !important;
  }
  ::v-deep .v-text-field__details{
    display: none;
  }
  ::v-deep .v-select > .v-input__control > .v-input__slot{
    margin-bottom: 0;
  }
}
.mobile-navbar{
  display: none;
}
@media (max-width: 768px) {
  .desktop-navbar{
    display: none;
  }
  .mobile-navbar{
    display: block;
  }
  .logo-top-bar{
    position: relative;
    .menu-btn{
      background: rgba(13, 150, 72, 0.1);
      border-radius: 44px;
      padding: 8px;
      font-weight: 700;
      font-size: 16px;
      line-height: 20px;
      color: #0D9648;
      text-transform: capitalize;
      box-shadow: none;
      height: 44px;
    }
    .active-icon{
      transform: rotate(180deg);
    }
  }
  .mobile-menu{
    position: absolute;
    z-index: 9;
    top: 66%;
    right: 3%;
    width: 250px;
    background: rgb(237 237 237 / 80%);
    filter: drop-shadow(0px 8px 64px rgba(0, 0, 0, 0.1));
    backdrop-filter: blur(80px);
    .v-sheet.v-list{
      border-radius: 12px;
      background: rgb(237 237 237 / 80%);
      border-bottom: 1px solid #ddd;
    }
    .v-list--nav .v-list-item {
      padding: 0 16px;
      border-bottom: 1px solid #ddd;
      min-height: 43px;
    }
    .msg-badge{
      position: absolute;
      left: 40%;
    }
    .v-list-item__title{
      color: #000000;
      font-size: 15px;
      font-weight: 700;
    }
    .theme--light.v-divider{
      border: 0;
      height: 8px;
      max-height: 8px;
      border-color: rgba(0, 0, 0, 0.12);
      background: linear-gradient(0deg, rgba(20, 20, 20, 0.15), rgba(20, 20, 20, 0.15)), rgba(255, 255, 255, 0.7);
    }
    .sub-menu-title{
      color: rgba(60, 60, 67, 0.6);
      font-size: 12px;
    }
  }
}
</style>
