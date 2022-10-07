<template>
  
       <v-col class="manage-users pa-0 pa-sm-3 pl-sm-0" :class="[ showSideBar ? 'col-md-9 col-12 col-sm-9' : 'mid-content-collapse', activityPanel ? 'd-sm-block' : 'd-md-block']" v-show="!activityPanel">
          <div class="mid-content">
            <div class="content-section">
              <v-row class="mx-0">
                <v-col cols="12" sm="12" md="12" class="d-sm-block">
                  <div class="manage-sections pa-4">
                    <v-alert type="success" v-show="showErrorAlert" v-if="statusMessage !== null" class="text-left" dismissible>
                      {{ statusMessage }}
                    </v-alert>
                    <div class="top-section d-flex">
                      <h4>Disabled Users</h4>
                      <div>
                        <router-link to="/manage-users" class="pr-8 font-weight-bold">Manage Users</router-link>
                        <!-- <router-link to="/add-users" class="text-decoration-none"><v-btn 
                        color="#0D9648" 
                        large 
                        dark 
                        min-width="200px"
                        class="text-capitalize">Add User</v-btn></router-link> -->
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
                                Email
                              </th>
                              <th class="text-left black--text font-weight-bold">
                                Last Login
                              </th>
                              <th class="text-left black--text font-weight-bold">
                                User Permissions
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
                              <td class="text-left font-weight-medium"><span v-if="user.lastSeen">{{ user.lastSeen | moment("MM/D/YYYY") }}</span><span v-else>no history</span></td>
                              <td class="text-left font-weight-medium text-capitalize">{{user.role}}</td>
                              <td class="text-center">
                                <v-btn depressed color="transparent" class="text-capitalize" @click="enable(user.id)" >
                                    <v-icon>mdi-check</v-icon>
                                  Enable </v-btn>
                              </td>
                            </tr>
                            <tr v-if="users.length < 1">
                              <td colspan="4"><h4>There is no disable user.</h4></td>
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
</template>
<script>
  import Navbar from './Layout/Navbar.vue'
  import LeftSidebar from './Layout/Dashboard/LeftSidebar.vue'
  import RightSidebar from './Layout/Dashboard/RightSidebar.vue'
  import { mapActions, mapState } from "vuex";
export default {
  name : "DisabledUsers",
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
      return this.$store.getters.disableList;
    },
    showErrorAlert(){
      return this.$store.getters.showErrorAlert;
    }
  },
  methods: {
    ...mapActions(["getDisabledUsers","enableUser"]),
    getDisableUsers(company){
      this.getDisabledUsers(company);
    },
    enable(id){
      this.enableUser(id);
    },
  },
  mounted() {
    document.title = "Disabled Users - BidOut";
    this.user = this.$store.getters.userInfo;

    this.getDisableUsers(this.user.company.company);
  }
};
</script>
<style scoped lang="scss">

</style>