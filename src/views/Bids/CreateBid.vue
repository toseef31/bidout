<template>
  <section class="section-container fill-height createBid-module">
    <Navbar></Navbar>
     <v-row class="mx-0">
       <v-col :class="[ showSideBar ? 'col-12' : 'toggleLeft-sidebar']" class="left-sidebar pr-1">
          <LeftSidebar></LeftSidebar>
       </v-col>
       <v-col class="mid-content pa-0 pa-sm-3" :class="[ showSideBar ? 'col-md-9 col-12 col-sm-7' : 'mid-content-collapse', activityPanel ? 'd-sm-block' : 'd-md-block']" v-show="!activityPanel">
          <div class="content-section fill-height">
            <v-row align="center" justify="center" class="fill-height mx-0">
            	<v-col cols="12" md="4">
            		<h1 class="text-left mb-7">Create Bid</h1>
                <router-link to="/not-completed" class="text-decoration-none">
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
  name : "Create Bid",
  components: {
    Navbar,
    LeftSidebar,
    RightSidebar,
  },
  
  data() {
    return {
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
