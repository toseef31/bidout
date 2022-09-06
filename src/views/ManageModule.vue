<template>
   <v-col class="manage-module pa-0 pa-sm-3 pl-sm-0" :class="[ showSideBar ? 'col-md-9 col-12 col-sm-9' : 'mid-content-collapse', activityPanel ? 'd-sm-block' : 'd-md-block']" v-show="!activityPanel">
      <div class="mid-content">
        <div class="content-section">
          <v-row class="mx-0">
            <v-col cols="12" sm="12" md="12" class="d-sm-block">
              <div class="manage-sections pa-4">
                <div class="top-section d-flex">
                  <h4>Manage Modules</h4>
                  <div class="tabs-head">
                    <template>
                      <v-tabs
                        align-with-title
                      > <v-tab
                          v-for="item in items" disabled
                        >
                          {{ item }}
                        </v-tab>
                      </v-tabs>
                    </template>
                  </div>
                </div>
                <div class="module-content mt-16">
                  <v-tabs-items v-model="tab">
                    <v-tab-item>

                      <div class="panels">
                        <div class="panel">
                          <div class="d-flex justify-space-between panel-header">
                            <h6>BidOut Procurement Platform</h6>
                            <div class="btn-section">
                              <a href="" class="text-decoration-none text-right toggle-btn" max-width="150px"><v-icon>mdi-bookmark-outline</v-icon>Upgrade to Enterpise</a>
                              <a href="" class="text-decoration-none text-right contract-btn" max-width="150px"><v-icon>mdi-file-outline</v-icon>View Contract</a>
                            </div>
                          </div>
                          <div class="panel-content">
                            <p class="mb-1 black--text">Renewal Date: 07/12/2023</p>
                            <p class="black--text">Annual Fee: $900</p>
                          </div>
                        </div>
                      </div>
                      <div class="panels">
                        <div class="panel">
                          <div class="d-flex justify-space-between panel-header">
                            <h6>OFS Directory Profile</h6>
                            <div class="btn-section">
                              <a href="" class="text-decoration-none text-right toggle-btn" max-width="150px"><v-icon>mdi-bookmark-outline</v-icon>Upgrade to Enterpise</a>
                              <a href="" class="text-decoration-none text-right contract-btn" max-width="150px"><v-icon>mdi-file-outline</v-icon>View Contract</a>
                            </div>
                          </div>
                          <div class="panel-content">
                            <p class="mb-1 black--text">Renewal Date: 07/12/2023</p>
                            <p class="black--text">Annual Fee: $900</p>
                          </div>
                        </div>
                      </div>
                      <div class="panels">
                        <div class="panel">
                          <div class="d-flex justify-space-between panel-header">
                            <h6>BidOut Procurement Platform</h6>
                            <div class="btn-section">
                              <a href="" class="text-decoration-none text-right toggle-btn" max-width="150px"><v-icon>mdi-bookmark-outline</v-icon>Upgrade to Enterpise</a>
                              <a href="" class="text-decoration-none text-right contract-btn" max-width="150px"><v-icon>mdi-file-outline</v-icon>View Contract</a>
                            </div>
                          </div>
                          <div class="panel-content">
                            <p class="mb-1 black--text">Renewal Date: 07/12/2023</p>
                            <p class="black--text">Annual Fee: $900</p>
                          </div>
                        </div>
                      </div>
                    </v-tab-item>
                  </v-tabs-items>
                </div>
              </div>
            </v-col>
          </v-row>
        </div>
      </div>
   </v-col>
</template>
<script>
  import Navbar from './Layout/Navbar.vue'
  import LeftSidebar from './Layout/Dashboard/LeftSidebar.vue'
  import RightSidebar from './Layout/Dashboard/RightSidebar.vue'
  import axios from 'axios'
export default {
  name : "ManageUsers",
  components: {
    Navbar,
    LeftSidebar,
    RightSidebar
  },
  
  data() {
    return {
      isHidden : false,
      tab: 0,
      items: [
        'Account Rep', 'Tyler Cherry', 'tcherry@bidout.app', '(281) 435-6344'
      ],
    };
  },
  computed:{
    showSideBar(){
        return this.$store.getters.g_sideBarOpen;
    },
    activityPanel(){
        return this.$store.getters.g_activityPanel;
    },
  },
  methods: {
    
  },
  mounted() {
    document.title = "Manage Modules - BidOut";
  }
};
</script>
<style scoped lang="scss">

</style>
