<template>
  <section class="section-container fill-height profile-module">
    <Navbar></Navbar>
     <v-row class="mx-0">
       <v-col :class="[ showSideBar ? 'col-12' : 'toggleLeft-sidebar']" class="left-sidebar pr-1">
          <LeftSidebar></LeftSidebar>
       </v-col>
       <v-col class="mid-content pa-0 pa-sm-3" :class="[ showSideBar ? 'col-md-9 col-12 col-sm-9' : 'mid-content-collapse', activityPanel ? 'd-sm-block' : 'd-md-block']" v-show="!activityPanel">
          <div class="content-section">
            <v-row class="mx-0" justify="center" no-gutters>
              <v-col cols="12" sm="12" md="12" class="d-sm-block pt-0">
                <div class="manage-sections py-4 pt-0">
                  <div class="top-section d-flex my-12">
                    <div class="user-info d-flex align-center">
                      <div class="user-img">
                        <img :src="require('@/assets/images/user/user.png')">
                      </div>
                      <div class="user-name text-left pl-4 mr-6">
                        <h3>{{userDatas.firstName}}  {{userDatas.lastName}}</h3>
                        <p class="mb-0">{{userDatas.company}}</p>
                      </div>
                      <v-divider vertical inset class="my-4"></v-divider>
                    </div>
                    <v-btn 
                    color="#0d964814" 
                    rounded elevation="0"
                    class="text-capitalize admin-tag ml-8 font-weight-bold"><v-icon>mdi-check-decagram-outline</v-icon> Admin</v-btn>
                  </div>
                  <div class="editprofile-section mt-16">
                    <v-row justify="center">
                      <v-col cols="12" sm="10" md="10">
                        <v-form @submit.prevent="editForm" ref="form">
                          <v-container>
                            <v-row justify="center">
                              <v-col cols="12" sm="6" text="left">
                                <label class="d-block text-left input-label mb-2 font-weight-bold">First Name</label>
                                <v-text-field placeholder="First Name" v-model="userDatas.firstName" single-line outlined type="text" hide-details>
                                </v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" text="left">
                                <label class="d-block text-left input-label mb-2 font-weight-bold">Last Name </label>
                                <v-text-field placeholder="Last Name" v-model="userDatas.lastName" single-line outlined type="text" hide-details>
                                </v-text-field>
                              </v-col>
                            </v-row>
                            <v-row justify="center">
                              <v-col cols="12" sm="6" text="left">
                                <label class="d-block text-left input-label mb-2 font-weight-bold">Title </label>
                                <v-text-field placeholder="Title" v-model="userDatas.title" single-line outlined type="text" hide-details>
                                </v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" text="left">
                                <label class="d-block text-left input-label mb-2 font-weight-bold">Mobile Number </label>
                                <v-text-field placeholder="(281) 782-5332" single-line outlined type="text" v-model="userDatas.phone" hide-details>
                                </v-text-field>
                              </v-col>
                            </v-row>
                            <v-row justify="center">
                              <v-col cols="12" sm="12" text="left">
                                <label class="d-block text-left input-label mb-2 font-weight-bold">Email Address </label>
                                <v-text-field placeholder="Email Address  " single-line outlined type="email" v-model="userDatas.email" hide-details>
                                </v-text-field>
                              </v-col>
                            </v-row>
                            <v-row justify="center">
                              <v-col cols="12">
                                <v-btn color="#0D9648" height="56" min-width="220px" class="text-capitalize white--text font-weight-bold save-btn px-9"  large>Save</v-btn>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-form>
                      </v-col>
                    </v-row>
                    <v-divider class="my-12"></v-divider>
                    <change-password></change-password>
                    <v-divider class="my-12"></v-divider>
                    <v-row justify="center">
                      <v-col cols="12" sm="10" md="10">
                        <v-form @submit.prevent="twofactor" ref="form">
                          <v-container>
                            <v-row justify="center">
                              <v-col cols="10" sm="6">
                                <h3 class="text-left font-weight-bold">Two-Factor Authentication</h3>
                              </v-col>
                              <v-col cols="2" sm="6">
                                <v-switch
                                  v-model="switch1"
                                  inset class="mr-4 mt-0 text-right" hide-details
                                ></v-switch>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-form>
                      </v-col>
                    </v-row>
                    <v-divider class="my-12"></v-divider>
                    <notifications></notifications>
                    <v-divider class="my-12"></v-divider>
                    <v-row justify="center">
                      <v-col cols="12" sm="10" md="10">
                        <v-simple-table>
                          <template v-slot:default>
                            <thead>
                              <tr>
                                <th class="text-left head-title">
                                  Two-Factor Authentication
                                </th>
                                <th class="text-left black--text">
                                  Email Address
                                </th>
                                <th class="text-left black--text">
                                  Phone
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td class="text-left">Tyler Cherry</td>
                                <td class="text-left">tcherry@bidout.app</td>
                                <td class="text-left">281-782-5332</td>
                              </tr>
                              <tr>
                                <td class="text-left">Jerry jones</td>
                                <td class="text-left">jjones@bidout.app</td>
                                <td class="text-left">932-232-5000</td>
                              </tr>
                            </tbody>
                          </template>
                        </v-simple-table>
                      </v-col>
                    </v-row>
                    <v-divider class="my-12"></v-divider>
                    <v-row justify="center">
                      <v-col cols="12" sm="10" md="10">
                        <v-row justify="start" class="mb-8">
                          <v-col cols="12" sm="12" text="left">
                            <h2 class="text-left pl-3">Login History</h2>
                          </v-col>
                        </v-row>
                        <v-simple-table>
                          <template v-slot:default>
                            <tbody>
                              <tr>
                                <td class="text-left">May 28, 2022, 3:45pm</td>
                                <td class="text-left">San Antonio, TX - USA 108.73.11.1</td>
                                <td class="text-right">Desktop</td>
                              </tr>
                              <tr>
                                <td class="text-left">May 28, 2022, 1:11pm</td>
                                <td class="text-left">San Antonio, TX - USA 108.73.11.1</td>
                                <td class="text-right">Mobile</td>
                              </tr>
                              <tr>
                                <td class="text-left">May 27, 2022, 9:45pm</td>
                                <td class="text-left">San Antonio, TX - USA 108.73.11.1</td>
                                <td class="text-right">Desktop</td>
                              </tr>
                            </tbody>
                          </template>
                        </v-simple-table>
                      </v-col>
                    </v-row>
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
  import ChangePassword from './Profile/ChangePassword.vue'
  import Notifications from './Profile/Notifications.vue'
  import axios from 'axios'
export default {
  name : "EditProfile",
  components: {
    Navbar,
    LeftSidebar,
    ChangePassword,
    Notifications
  },
  
  data() {
    return {
      isHidden : false,
      firstName: userDatas.firstName,
      lastName: userDatas.lastName,
      title: userDatas.title,
      mobileNumber: userDatas.phone,
      email: userDatas.email,
      switch1: true,
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
    
  }
};
</script>
