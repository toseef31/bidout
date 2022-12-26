<template>
  <v-row class="manage-users pa-0 pa-sm-3 pl-sm-0">
   <v-col :class="[ showSideBar ? 'col-md-12 col-12 col-sm-12' : 'mid-content-collapse', activityPanel ? 'd-sm-block' : 'd-md-block']" v-show="!activityPanel">
      <div class="mid-content">
        <div class="content-section">
          <v-row class="mx-0">
            <v-col cols="12" sm="12" md="12" class="d-sm-block">
              <div class="manage-sections pa-4">
                <v-alert type="success" v-show="showErrorAlert" v-if="statusMessage !== null" class="text-left" dismissible>
                  {{ statusMessage }}
                </v-alert>
                <div class="top-section d-flex">
                  <h4>Pending Users</h4>
                  <div>
                    <router-link to="/manage-users" class="pr-8 font-weight-bold">Manage Users</router-link>
                    
                  </div>
                </div>
                <div class="userlist-table mt-16">
                  <v-simple-table>
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-left black--text font-weight-bold">
                            Name
                          </th>
                          <th class="text-left black--text font-weight-bold">
                            Title
                          </th>
                          <th class="text-left black--text font-weight-bold">
                            Email
                          </th>
                          <th class="text-left black--text font-weight-bold">
                            Phone Number
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
                          <td class="text-left font-weight-medium text-capitalize">{{user.title}}</td>
                          <td class="text-left font-weight-medium">{{ user.email }}</td>
                          
                          <td class="text-left font-weight-medium"><span v-if="user.phoneNumber">{{ user.phoneNumber }}</span><span v-else>no phone</span></td>
                          <td class="text-center">
                            <v-btn depressed color="transparent" class="text-capitalize" @click="accept(user)" >
                                <v-icon>mdi-check</v-icon>
                              Accept </v-btn>
                          </td>
                        </tr>
                        <tr v-if="users.length < 1">
                          <td colspan="4"><h4>There is no pending user.</h4></td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </div>
              </div>
            </v-col>
          </v-row>
        </div>
      </div>
   </v-col>
 </v-row>
</template>
<script>
  import Navbar from '../components/Layout/Navbar.vue'
  import LeftSidebar from '../components/Layout/Dashboard/LeftSidebar.vue'
  import RightSidebar from '../components/Layout/Dashboard/RightSidebar.vue'
  import { mapActions, mapState } from "vuex";
export default {
  name : "PendingUsers",
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
    statusMessage () {
      return this.$store.getters.statusMessage
    },
    users(){
      return this.$store.getters.pendingList;
    },
    showErrorAlert(){
      return this.$store.getters.showErrorAlert;
    }
  },
  methods: {
    ...mapActions(["getPendingUsers","acceptPendingUser"]),
    pendingUsers(company){
      console.log(company);
      this.getPendingUsers(company);
    },
    accept(user){
      this.acceptPendingUser(user);
    },
  },
  mounted() {
    document.title = "Pending Users - BidOut";
    this.user = this.$store.getters.userInfo;
    // console.log(this.user)
    this.getPendingUsers(this.user.company.id);
  }
};
</script>
<style scoped lang="scss">

</style>