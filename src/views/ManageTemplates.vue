<template>
  <v-col class="createBid-module manage-template  pa-0 pa-sm-3 pl-sm-0" :class="[ showSideBar ? 'col-md-9 col-12 col-sm-7' : 'mid-content-collapse', activityPanel ? 'd-sm-block' : 'd-md-block']" v-show="!activityPanel">
    <div class="mid-content fill-height">
      <div class="content-section fill-height">
        <v-row align="center" justify="space-between" class="px-6 mb-4 mt-2 mx-0">
          <v-col cols="6" class="text-left pl-0">
            <h4>Bid Templates </h4>
          </v-col>
          <v-col cols="6" class="text-right pr-0">
            <v-btn large elevation="0" color="#0D9648" height="56px" class="text-capitalize white--text font-weight-bold py-6">Create New Template</v-btn>
          </v-col>
        </v-row>
        <v-simple-table class="template-table">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left pl-6">
                  Template Name
                </th>
                <th class="text-left">
                  Type
                </th>
                <th class="text-left">
                  Created Data
                </th>
                <th class="text-left">
                  Creator
                </th>
                <th class="text-left">
                  Notes
                </th>
                <th class="text-left pr-6 white--text">
                  action Text
                </th>
              </tr>
            </thead>
            
            <tbody>
              <tr v-for="(template, index) in bidTemplates" class="py-4 px-6">
                <td class="text-left pl-6">{{template.bidTitle}}</td>
                <td class="text-left">{{template.type}}</td>
                <td class="text-left">{{template.createdDate}}</td>
                <td class="text-left">{{template.creator}}</td>
                <td class="text-left">{{template.bidDescription}}</td>
                <td class="text-left pr-6">
                  <v-icon color="#0D9648" class="mr-4">mdi-pencil-outline</v-icon>
                  <v-icon color="#F32349" @click="deleteTemplate(template.id)">mdi-trash-can-outline</v-icon>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </div>  
    </div>
  </v-col>
</template>
<script>
  import Navbar from '../components/Layout/Navbar.vue'
  import LeftSidebar from '../components/Layout/Dashboard/LeftSidebar.vue'
  import RightSidebar from '../components/Layout/Dashboard/RightSidebar.vue'
  import { mapActions } from "vuex";
export default {
  name : "ManageTemplate",
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
    bidTemplates(){
      return this.$store.getters.bidTemplates;
    },
  },
  methods: {
    ...mapActions(["getBidTemplates","deleteTemplate"]),
    delete(id){
      this.deleteTemplate(id);
    }
  },
  async created(){
    await this.getBidTemplates();
  },
  mounted() {
    document.title = "Manage Templates - BidOut";
    this.users = this.$store.getters.userInfo;
  }
};
</script>
<style scoped lang="scss">

</style>
