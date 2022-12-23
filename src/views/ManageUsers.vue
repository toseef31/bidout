<template>
  
   <v-col class="manage-users pa-0 pa-sm-3 pl-sm-0" :class="[ showSideBar ? 'col-md-9 col-12 col-sm-9' : 'mid-content-collapse', activityPanel ? 'd-sm-block' : 'd-md-block']" v-show="!activityPanel">
      <div class="mid-content">
        <div class="content-section">
          <v-row class="mx-0">
            <v-col cols="12" sm="12" md="12" class="d-sm-block">
              <div class="manage-sections pa-4">
                <v-alert type="success" v-show="showErrorAlert" v-if="message != null" class="text-left" dismissible>
                  {{ message }}
                </v-alert>
                <div class="top-section d-flex">
                  <h4>Manage Users</h4>
                  <div>
                   
                    <router-link to="/manage-users/disabled-users" class="pr-8 font-weight-bold">Show Disable Users</router-link>
                    <router-link to="/manage-users/add-users" class="text-decoration-none"><v-btn 
                    color="#0D9648" 
                    large 
                    dark 
                    min-width="200px"
                    class="text-capitalize">Add User</v-btn></router-link>
                  </div>
                </div>
                <div class="userlist-table mt-16">
                  <v-alert type="success" v-show="showErrorAlert" v-if="statusMessage !== null" class="text-left" dismissible>
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
                            User Permissions
                          </th>
                          <th class="text-left black--text font-weight-bold">
                            
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(user, i) in users"
                          :key="user.i" v-if="user.status != false"
                        >

                          <td class="text-left font-weight-medium">{{ user.firstName }} {{ user.lastName }}</td>
                          <td class="text-left font-weight-medium">{{ user.email }}</td>
                          <td class="text-left font-weight-medium"><span v-if="user.lastSeen">{{ user.lastSeen | moment("MM/DD/YYYY") }}</span><span v-else>no history</span></td>
                          <td class="text-left font-weight-medium text-capitalize">
                            <template v-if="user.role == 'admin'">Administrator</template>
                            <template v-if="user.role == 'user'">User</template>
                          </td>
                          <td class="text-left">
                            <v-btn depressed color="transparent" @click="editUser(user,'general')" class="text-capitalize edit-btn">
                              <v-icon>mdi-square-edit-outline</v-icon>
                            Edit Details</v-btn>
                           
                            <v-btn depressed color="transparent" class="text-capitalize" v-if="user.id != userInfo.id" @click="disable(user.id)">
                              <v-icon color="#F32349">mdi-window-close</v-icon>
                            Disable </v-btn>

                          </td>
                        </tr>
                        <tr v-if="users.length < 1">
                          <td colspan="5"> <h4>There is no user in this company</h4></td>
                        </tr>
                        <tr class="white">
                          <td colspan="5"><h2 class="my-4 text-left">Pending User Invitations</h2></td>
                        </tr>
                        <tr
                          v-for="(user, i) in invitedList"
                          :key="user.i"
                        >

                          <td class="text-left font-weight-medium">{{ user.firstName }} {{ user.lastName }}</td>
                          <td class="text-left font-weight-medium">{{ user.email }}</td>
                          <td class="text-left font-weight-medium"><span v-if="user.lastSeen">{{ user.lastSeen | moment("MM/DD/YYYY") }}</span><span v-else>no history</span></td>
                          <td class="text-left font-weight-medium text-capitalize">
                            <template v-if="user.role == 'admin'">Administrator</template>
                            <template v-else>User</template>
                          </td>
                          <td class="text-left">
                            <v-btn depressed color="transparent" @click="editUser(user,'invited')" class="text-capitalize edit-btn">
                              <v-icon>mdi-square-edit-outline</v-icon>
                            Edit Details</v-btn>
                           
                            <!-- <v-btn depressed color="transparent" class="text-capitalize" @click="disable(user.id)">
                              <v-icon color="#F32349">mdi-window-close</v-icon>
                            Disable </v-btn> -->

                          </td>
                        </tr>
                        <tr v-if="invitedList.length < 1 && pendingUsers.length < 1">
                          <td colspan="5"><h4>There is no invited user.</h4></td>
                        </tr>
                        <tr
                          v-for="(user, i) in pendingUsers"
                          :key="user.i"
                        >

                          <td class="text-left font-weight-medium">{{ user.firstName }} {{ user.lastName }}</td>
                          <td class="text-left font-weight-medium">{{ user.email }}</td>
                          <td class="text-left font-weight-medium">no history</td>
                          
                          <td class="text-left font-weight-medium">User</td>
                          <td class="text-left">
                            <v-btn depressed color="transparent" class="text-capitalize edit-btn" @click="accept(user)" >
                                <v-icon>mdi-check</v-icon>
                              Approve </v-btn>
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
      </div>
   </v-col>
</template>
<script>
  import Navbar from '../components/Layout/Navbar.vue'
  import LeftSidebar from '../components/Layout/Dashboard/LeftSidebar.vue'
  import RightSidebar from '../components/Layout/Dashboard/RightSidebar.vue'
  import { mapActions, mapState } from "vuex";
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
      userInfo : '',
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
    message () {
      return this.$store.getters.message
    },
    invitedList () {
      return this.$store.getters.invitedList
    },
    pendingUsers(){
      return this.$store.getters.pendingList;
    },
    showErrorAlert(){
      return this.$store.getters.showErrorAlert;
    }
  },
  methods: {
    ...mapActions(["manageUsers","disableUser","enableUser","editData","getInvitedList","getPendingUsers","acceptPendingUser"]),
    getUsers(company){
      this.manageUsers(company);
    },
    disable(id){
      this.disableUser(id);
    },
    enable(id){
      this.enableUser(id);
    },
    editUser(user,type){
      var data = {user,type};
      this.editData(data);
    },
    invitedUsers(company){
      this.getInvitedList(company);
    },
    pendingUser(company){
      this.getPendingUsers(company);
    },
    accept(user){
      this.acceptPendingUser({user, companyName: this.user.company.company});
    },
  },
  mounted() {
    document.title = "Manage Users - BidOut";
    this.user = this.$store.getters.userInfo;
    this.userInfo = this.$store.getters.userInfo;
    this.getUsers(this.user.company.company);
    this.invitedUsers(this.user.company.company);
    this.getPendingUsers(this.user.company.id);
  }
};
</script>
<style scoped lang="scss">

</style>