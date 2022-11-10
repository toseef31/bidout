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
                      <template v-if="moduleData.length > 0">  
                          <div class="panels pb-4" v-for="modules in moduleData">
                            <div class="panel">
                              <div class="d-flex justify-space-between panel-header">
                                <h6 v-if="modules.contractType == 'rfx'">BidOut Procurement Platform</h6>
                                <h6 v-else>OFS Directory - Premium</h6>
                                <div class="btn-section">
                                  <a href="" class="text-decoration-none text-right toggle-btn" max-width="150px" v-if="modules.contractType == 'rfx'"><v-icon>mdi-bookmark-outline</v-icon>Upgrade to Enterpise</a>
                                  <a :href="modules.filePath" target="_blank" class="text-decoration-none text-right contract-btn" max-width="150px"><v-icon>mdi-file-outline</v-icon>View Contract</a>
                                </div>
                              </div>
                              <div class="panel-content">
                                <p class="mb-1 black--text">Renewal Date: {{new Date(modules.renewsOn._seconds * 1000).toLocaleDateString()}} </p>
                                <p class="black--text mb-0">Annual Fee: ${{modules.annualFee}}</p>
                              </div>
                            </div>
                          </div>
                      </template>
                      <template v-else>  
                          <div class="panels pb-4">
                              <h3 class="pt-3">You don't have any active moudle yet.</h3>
                          </div>
                      </template>
                      
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
  import Navbar from '../components/Layout/Navbar.vue'
  import LeftSidebar from '../components/Layout/Dashboard/LeftSidebar.vue'
  import RightSidebar from '../components/Layout/Dashboard/RightSidebar.vue'
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
    moduleData(){
      if(this.$store.getters.userInfo.company.contracts){
        return this.$store.getters.userInfo.company.contracts.filter((item)=>{
          return this.$store.getters.userInfo.id == item.signedBy
        })
      }
      
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
