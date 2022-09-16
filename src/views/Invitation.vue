<template>
  <v-row>
    <v-col class="col-12 pa-0 pa-sm-3 pl-sm-0 pb-sm-0 inviation-module">
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
                <h1 class="font-weight-bold mb-10">Your have accepted the inviation</h1>
                <v-btn color="rgba(13, 150, 72)" elevation="0" height="54px" width="220px" large class="text-capitalize white--text"><router-link to="/login" class="text-decoration-none white--text">Click here to login</router-link></v-btn>
              </div>
            </v-col>
          </v-row>
        </div>
      </div>
    </v-col>
  </v-row>
</template>
<script>
 
  import { mapActions } from "vuex";
export default {
  name : "Completed",
  components: {
    
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
