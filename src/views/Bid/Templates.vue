<template>
   <v-col class="createBid-module pa-0 pa-sm-3 pl-sm-0 pb-sm-0" :class="[ showSideBar ? 'col-md-9 col-12 col-sm-7' : 'mid-content-collapse', activityPanel ? 'd-sm-block' : 'd-md-block']" v-show="!activityPanel">
      <div class="mid-content">
        <div class="content-section fill-height">
          <v-row align="center" justify="space-between" class="px-6 mb-4 mt-2 mx-0">
            <v-col cols="6" class="text-left pl-0">
              <h4>Templates</h4>
            </v-col>
            <v-col cols="6" class="text-right pr-0">
              <p class="mb-0"><router-link to="/manage-templates">View all</router-link></p>
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
                  <th class="text-left pr-6">
                    
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(template, index) in templates" class="py-4 px-6">
                  <td class="text-left pl-6">{{template.name}}</td>
                  <td class="text-left">{{template.type}}</td>
                  <td class="text-left">{{template.createdDate}}</td>
                  <td class="text-left">{{template.creator}}</td>
                  <td class="text-left">{{template.notes}}</td>
                  <td class="text-left pr-6"><v-btn color="#0D9648" elevation="0" class="white--text text-capitalize">Use Template</v-btn></td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
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
  name : "Template",
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
