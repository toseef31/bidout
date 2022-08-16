<template>
  <section class="section-container fill-height manage-users">
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
                    <h4>Manage Users</h4>
                    <router-link to="/add-users" class="text-decoration-none"><v-btn 
                    color="#0D9648" 
                    large 
                    dark 
                    min-width="200px"
                    class="text-capitalize">Add User</v-btn></router-link>
                  </div>
                  <div class="userlist-table mt-16">
                    <v-alert type="success" v-if="statusMessage !== null">
                      {{ statusMessage }}
                    </v-alert>
                    <v-simple-table>
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th class="text-left black--text font-weight-bold">
                              Name
                            </th>
                            <th class="text-left black--text font-weight-bold">
                              Email
                            </th>
                            <th class="text-left black--text font-weight-bold">
                              Last Login
                            </th>
                            <th class="text-left black--text font-weight-bold">
                              
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="(user, i) in users"
                            :key="user.i"
                          >

                            <td class="text-left font-weight-medium">{{ user.firstName }} {{ user.lastName }}</td>
                            <td class="text-left font-weight-medium">{{ user.email }}</td>
                            <td class="text-left font-weight-medium"></td>
                            <td class="text-left">
                              <router-link :to="'/edit-user/'+ user.id" class="text-decoration-none"><v-btn depressed color="transparent" class="text-capitalize edit-btn">
                                <v-icon>mdi-square-edit-outline</v-icon>
                              Edit Details</v-btn></router-link>
                             
                              <template v-if="user.status == true">
                                <v-btn depressed color="transparent" class="text-capitalize" @click="disable(user.id)" v-if="user.id == responseId && userStatus == true">
                                  <v-icon color="#F32349">mdi-window-close</v-icon>
                                Disable </v-btn>
                                <v-btn depressed color="transparent" class="text-capitalize" @click="enable(user.id)" v-else-if="user.id == responseId && userStatus == false">
                                  <v-icon color="#F32349">mdi-check</v-icon>
                                Enable </v-btn>
                                <v-btn depressed color="transparent" class="text-capitalize" @click="disable(user.id)" v-else>
                                  <v-icon color="#F32349">mdi-window-close</v-icon>
                                Disable </v-btn>
                              </template>
                              <template v-else>
                                <v-btn depressed color="transparent" class="text-capitalize" @click="enable(user.id)" v-if="responseId == user.id && userStatus == false">
                                  <v-icon>mdi-check</v-icon>
                                Enable </v-btn>
                                <v-btn depressed color="transparent" class="text-capitalize" @click="disable(user.id)" v-else-if="responseId == user.id && userStatus == true">
                                  <v-icon>mdi-window-close</v-icon>
                                Disable </v-btn>
                                <v-btn depressed color="transparent" class="text-capitalize" @click="enable(user.id)" v-else>
                                  <v-icon>mdi-check</v-icon>
                                Enable </v-btn>
                              </template>

                            </td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
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
  import { mapActions } from "vuex";
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
    };
  },
  computed:{
    showSideBar(){
        return this.$store.getters.g_sideBarOpen;
    },
    activityPanel(){
        return this.$store.getters.g_activityPanel;
    },
    users(){
      return this.$store.getters.userList;
    },
    userStatus () {
      return this.$store.getters.userStatus
    },
    statusMessage () {
      return this.$store.getters.statusMessage
    },
    responseId () {
      return this.$store.getters.responseId
    },
  },
  methods: {
    ...mapActions(["manageUsers","disableUser","enableUser"]),
    getUsers(company){
      this.manageUsers(company);
    },
    disable(id){
      this.disableUser(id);
    },
    enable(id){
      this.enableUser(id);
    }
  },
  mounted() {
    document.title = "Manage Users - BidOut";
    this.user = this.$store.getters.userInfo;

    this.getUsers(this.user.company);
  }
};
</script>
<style scoped lang="scss">

</style>