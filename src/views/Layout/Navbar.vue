<template>
  <div>
    <v-app-bar
        color="white"
        height="104"
        class="d-none d-sm-block"
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
        class="d-block d-sm-none"
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
            <v-btn>
              v-icon
            </v-btn>
            <div class="mobile-menu d-none">
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
                  >
                    <v-list-item-icon class="mr-6 mt-3">
                      <v-icon v-text="item.icon"></v-icon>
                    </v-list-item-icon>

                    <v-list-item-content class="text-left py-1">
                      <v-list-item-title class="font-weight-bold" v-text="item.text"></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </div>
          </template>
        </div>
        <div class="menu-bottom-bar">
          <v-select
            :items="items"
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
      isActive : false,
      items: [
        { text: 'Create a new Bid', icon: 'mdi-gavel' },
        { text: 'Create a new Shipment', icon: 'mdi-truck' },
      ],
      selectedItem: 0,
        itemss: [
          { text: 'Dashboard', icon: 'mdi-view-dashboard-outline' },
          { text: 'View Bids', icon: 'mdi-gavel' },
          { text: 'View Shipments', icon: 'mdi-truck' },
          { text: 'View OFS Suppliers', icon: 'mdi-tag-outline' },
          { text: 'Messages', icon: 'mdi-email-outline' },
          { text: "Browse Public RFx's", icon: 'mdi-compass-outline' },
          { text: 'Manage Invoices', icon: 'mdi-calendar-text-outline' },
          { text: 'Reporting', icon: 'mdi-note-multiple-outline' },
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
    };
  },
  methods: {
    openBox(){
      this.openmenu = true;
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
  
  .v-input {
    height: 55px;
    background: #0d9648;
    border: 1px solid #0d9648;
    color: #fff !important;
    caret-color:  #fff !important;
  }
  .v-select__selection--comma{
    color: #fff !important;
  }
}
</style>
