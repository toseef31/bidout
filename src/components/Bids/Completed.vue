<template>
  <v-col class="completed-module pa-0 pa-sm-3 pl-sm-0 pb-sm-0" :class="[ showSideBar ? 'col-md-9 col-12 col-sm-7' : 'mid-content-collapse', activityPanel ? 'd-sm-block' : 'd-md-block']" v-show="!activityPanel">
    <div class="mid-content">
      <div class="content-section fill-height">
        <v-row align="center" justify="space-between" no-gutters class="pa-6 mb-10 mx-0">
          <v-col cols="12">
            <div class="completed-banner d-flex justify-center align-center">
              <img :src="require('@/assets/images/bids/tick.png')" width="88px" height="88px">
            </div>
            
          </v-col>
        </v-row>
        <v-row justify="center" align="center" class="mx-0">
          <v-col cols="12" md="6">
            <div class="completed-content">
              <h1 class="font-weight-bold mb-4">Annual Chemical Bid</h1>
              <h4 class="mb-4">RFP #103831</h4>
              <h4 class="mb-12">Due Date: 08/11/2022 1pm CST</h4>
              <v-btn color="rgba(13, 150, 72, 0.1)" rounded elevation="0" class="text-capitalize">Loading Bid Page in 3s</v-btn>
            </div>
          </v-col>
        </v-row>
      </div>
    </div>
  </v-col>
</template>
<script>
  import Navbar from '../Layout/Navbar.vue'
  import LeftSidebar from '../Layout/Dashboard/LeftSidebar.vue'
  import RightSidebar from '../Layout/Dashboard/RightSidebar.vue'
  import { mapActions } from "vuex";
export default {
  name : "Completed",
  components: {
    Navbar,
    LeftSidebar,
    RightSidebar,
  },
  
  data() {
    return {
      users: '',
      
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
