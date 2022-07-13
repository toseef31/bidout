<template>
  <section class="section-container fill-height manage-module">
    <Navbar></Navbar>
     <v-row class="mx-0">
       <v-col :class="[ showSideBar ? 'col-12' : 'toggleLeft-sidebar']" class="left-sidebar pr-1">
          <LeftSidebar></LeftSidebar>
       </v-col>
       <v-col class="mid-content pa-0 pa-sm-3" :class="[ showSideBar ? 'col-md-9 col-12 col-sm-9' : 'mid-content-collapse', activityPanel ? 'd-sm-block' : 'd-md-block']" v-show="!activityPanel">
          <div class="content-section">
            <v-row class="mx-0">
              <v-col cols="12" sm="12" md="12" class="d-sm-block">
                <div class="manage-sections pa-4">
                  <div class="top-section d-flex">
                    <h4>Manage Modules</h4>
                    <div class="tabs-head">
                      <template>
                        <v-tabs
                          v-model="tab"
                          align-with-title
                        >
                          <v-tabs-slider color="yellow"></v-tabs-slider>

                          <v-tab
                            v-for="item in items"
                            :key="item"
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

                        <v-expansion-panels>
                          <v-expansion-panel>
                            <v-expansion-panel-header>
                              <template v-slot:actions>
                                <v-icon>
                                  $expand
                                </v-icon>
                              </template>
                              <h6>BidOut Procurement Platform</h6>
                              <div class="btn-section">
                                <a href="" class="text-decoration-none text-right toggle-btn" max-width="150px"><v-icon>mdi-bookmark-outline</v-icon>Upgrade to Enterpise</a>
                                <a href="" class="text-decoration-none text-right contract-btn" max-width="150px"><v-icon>mdi-file-outline</v-icon>View Contract</a>
                              </div>
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                              <p class="mb-1 black--text">Renewal Date: 07/12/2023</p>
                              <p class="black--text">Annual Fee: $900</p>
                            </v-expansion-panel-content>
                          </v-expansion-panel>
                        </v-expansion-panels>
                        <v-expansion-panels>
                          <v-expansion-panel>
                            <v-expansion-panel-header>
                              <template v-slot:actions>
                                <v-icon>
                                  $expand
                                </v-icon>
                              </template>
                              <h6>OFS Directory Profile</h6>
                              <div class="btn-section">
                                <a href="" class="text-decoration-none text-right toggle-btn" max-width="150px"><v-icon>mdi-bookmark-outline</v-icon>Upgrade to Enterpise</a>
                                <a href="" class="text-decoration-none text-right contract-btn" max-width="150px"><v-icon>mdi-file-outline</v-icon>View Contract</a>
                              </div>
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                              <p class="mb-1 black--text">Renewal Date: 07/12/2023</p>
                              <p class="black--text">Annual Fee: $900</p>
                            </v-expansion-panel-content>
                          </v-expansion-panel>
                        </v-expansion-panels>
                        <v-expansion-panels>
                          <v-expansion-panel>
                            <v-expansion-panel-header>
                              <template v-slot:actions>
                                <v-icon>
                                  $expand
                                </v-icon>
                              </template>
                              <h6>BidOut Procurement Platform</h6>
                              <div class="btn-section">
                                <a href="" class="text-decoration-none text-right toggle-btn" max-width="150px"><v-icon>mdi-bookmark-outline</v-icon>Upgrade to Enterpise</a>
                                <a href="" class="text-decoration-none text-right contract-btn" max-width="150px"><v-icon>mdi-file-outline</v-icon>View Contract</a>
                              </div>
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                              <p class="mb-1 black--text">Renewal Date: 07/12/2023</p>
                              <p class="black--text">Annual Fee: $900</p>
                            </v-expansion-panel-content>
                          </v-expansion-panel>
                        </v-expansion-panels>
                      </v-tab-item>
                    </v-tabs-items>
                  </div>
                </div>
              </v-col>
            </v-row>
          </div>
       </v-col>
     </v-row>
   </section>
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
      tab: null,
      items: [
        'Account Rep', 'Tyler Cherry', 'tcherry@bidout.app', '(281)782-5332'
      ],
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
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
    
  }
};
</script>
<style scoped lang="scss">

</style>
