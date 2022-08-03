<template>
  <section class="section-container fill-height createBid-module">
    <Navbar></Navbar>
     <v-row class="mx-0">
       <v-col :class="[ showSideBar ? 'col-12' : 'toggleLeft-sidebar']" class="left-sidebar pr-1">
          <LeftSidebar></LeftSidebar>
       </v-col>
       <v-col class="mid-content pa-0 pa-sm-3" :class="[ showSideBar ? 'col-md-9 col-12 col-sm-7' : 'mid-content-collapse', activityPanel ? 'd-sm-block' : 'd-md-block']" v-show="!activityPanel">
          <div class="content-section fill-height pa-0">
            <v-row align="center" justify="space-between" no-gutters class="px-6 py-4 not-completd-title">
              <v-col cols="6" class="text-left">
                <div class="d-flex align-center">
                  <h3 class="pl-1 mr-4">Annual Chemical Bid</h3>
                  <p class="preview-text mb-0 ml-3">
                    <a href="" class="text-decoration-none"><v-icon color="#0D9648" class="pr-2">mdi-open-in-new</v-icon>Preview Bid in Supplier View</a>
                  </p>
                </div>
              </v-col>
              <v-col cols="6" class="text-right">
                <div class="d-flex align-center justify-end">
                  <p class="mb-0 mr-4 auto-text"><strong>Autosaved Draft:</strong> 07/22/2022 12:51 pm</p>
                  <v-btn color="#B8B8B8" class="white--text text-capitalize publish-btn" width="250px" height="52px" large>
                    Publish Bid
                  </v-btn>
                </div>
              </v-col>
            </v-row>
            <div class="bidtabs-section">
              <v-tabs
                v-model="currentItem"
                fixed-tabs
                hide-slider
              >
                <v-tab
                  v-for="item in tabs"
                  :key="item"
                  :href="'#tab-' + item" class="text-capitalize"
                >
                  {{ item }}
                </v-tab>
              </v-tabs>
              <v-tabs-items v-model="currentItem">
                <v-tab-item
                  v-for="item in tabs"
                  :key="item"
                  :value="'tab-' + item"
                >
                  <v-card flat>
                    <v-card-text>
                      <h2>{{ item }}</h2>
                      {{ text }}
                    </v-card-text>
                  </v-card>
                </v-tab-item>
              </v-tabs-items>
            </div>
          </div>
       </v-col>
     </v-row>
   </section>
</template>
<script>
  import Navbar from '../Layout/Navbar.vue'
  import LeftSidebar from '../Layout/Dashboard/LeftSidebar.vue'
  import RightSidebar from '../Layout/Dashboard/RightSidebar.vue'
  import { mapActions } from "vuex";
export default {
  name : "Dashboard",
  components: {
    Navbar,
    LeftSidebar,
    RightSidebar,
  },
  
  data() {
    return {
      users: '',
      templates: [
        {
          name: 'Water Transfer Bid - Egle Ford',
          type: 'RFI',
          createdDate: '06/01/2022',
          creator: 'Jennifer Hazelton',
          notes: 'This is Lewis’ primary water template used in the Eagle Ford, please only update mileage and date requested.',
        },
        {
          name: 'Wireline Services - Annual',
          type: 'RFP',
          createdDate: '03/10/2022',
          creator: 'John Jones',
          notes: '-',
        },
      ],
      currentItem: 'tab-Web',
      tabs: [
        'Bid Detail', 'Supplier Invitation', 'Team Members', 'Line Items', 'Attachment', 'Questions',
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
    userDatas(){
        return this.$store.getters.userInfo;
    },
  },
  methods: {
    
  },
  mounted() {
    document.title = "Create Bid - BidOut";
    this.users = JSON.parse(localStorage.getItem("userData")).user;
}
};
</script>
<style scoped lang="scss">

</style>
