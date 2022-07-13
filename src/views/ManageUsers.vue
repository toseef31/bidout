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
                            <td class="text-left font-weight-medium">{{ user.name }}</td>
                            <td class="text-left font-weight-medium">{{ user.email }}</td>
                            <td class="text-left font-weight-medium">{{ user.lastLogin }}</td>
                            <td class="text-left">
                              <v-btn depressed color="transparent" class="text-capitalize">
                                <v-icon>mdi-square-edit-outline</v-icon>
                              Edit Details</v-btn>
                              <v-btn depressed color="transparent" class="text-capitalize">
                                <v-icon>mdi-window-close</v-icon>
                              Disable</v-btn>
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
  import axios from 'axios'
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
      users: [
        {
          name: 'Jerry Jones',
          email: 'jjones@bidout.app',
          lastLogin: '04/04/2022 at 12:51 pm'
        },
        {
          name: 'Rodney Giles',
          email: 'rgiles@bidout.app',
          lastLogin: '04/04/2022 at 12:51 pm'
        },
        {
          name: 'Julia Parker',
          email: 'jparker@bidout.app',
          lastLogin: '04/04/2022 at 12:51 pm'
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
  },
  methods: {
    
  },
  mounted() {
    
  }
};
</script>
<style scoped lang="scss">

</style>