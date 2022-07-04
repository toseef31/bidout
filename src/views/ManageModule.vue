<template>
  <section class="section-container fill-height">
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
                    <div>
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
                  <div class="userlist-table mt-16">
                    <v-tabs-items v-model="tab">
                      <v-tab-item
                        v-for="item in items"
                        :key="item"
                      >
                        <v-card flat>
                          <v-card-text v-text="text"></v-card-text>
                        </v-card>
                      </v-tab-item>
                    </v-tabs-items>
                  </div>
                </div>
              </v-col>
            </v-row>
          </div>
       </v-col>
       <!-- <v-col cols="12" class="pl-0 right-col" :class="[ activityPanel ? '' : 'mobile-right-col']" >
        <div class="right-sidebar"> 
          <RightSidebar></RightSidebar>
        </div>
       </v-col> -->
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
@import '@/assets/styles/profile/profile.scss';
</style>
