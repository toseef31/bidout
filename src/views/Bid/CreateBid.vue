<template>
  
   <v-col class="createBid-module pa-0 pa-sm-3 pl-sm-0 pb-sm-0" :class="[ showSideBar ? 'col-md-9 col-12 col-sm-7' : 'mid-content-collapse', activityPanel ? 'd-sm-block' : 'd-md-block']" v-show="!activityPanel">
      <div class="mid-content">
        <div class="content-section fill-height d-flex align-center">
          <v-row align="center" justify="center" class="fill-height mx-0">
            <v-col cols="12" md="4">
              <h1 class="text-left mb-7">Create Bid</h1>
              <router-link to="/create-bid" class="text-decoration-none">
                <div class="bid-box">
                  <div class="icon-box pa-8">
                    <img :src="require('@/assets/images/bids/FileX.png')">
                  </div>
                  <div class="title-box pa-8 text-left">
                    <h4 class="font-weight-bold">Create a new Bid</h4>
                    <small>RFx: RFP or RFI</small>
                  </div>
                </div>
              </router-link>
            </v-col>
            <v-col cols="12" md="4" class="mt-16">
              <router-link to="/templates" class="text-decoration-none">
                <div class="bid-box">
                  <div class="icon-box pa-8">
                    <img :src="require('@/assets/images/bids/FileArrowDown.png')">
                  </div>
                  <div class="title-box pa-8 text-left">
                    <h4 class="font-weight-bold">Create Bid from Template</h4>
                    <small>RFx: RFP or RFI</small>
                  </div>
                </div>
              </router-link>  
            </v-col>
          </v-row>
        </div>
      </div>
   </v-col>
</template>
<script>
  import Navbar from '../../components/Layout/Navbar.vue'
  import LeftSidebar from '../../components/Layout/Dashboard/LeftSidebar.vue'
  import RightSidebar from '../../components/Layout/Dashboard/RightSidebar.vue'
  import { mapActions } from "vuex";
export default {
  name : "Create Bid",
  components: {
    Navbar,
    LeftSidebar,
    RightSidebar,
  },
  
  data() {
    return {
      isHidden : false,
      users: ''
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
