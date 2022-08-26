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
                  <profile-image></profile-image>
                  <div class="editprofile-section mt-16">
                    <v-row justify="center">
                      <v-col cols="12" sm="10" md="10">
                        <v-form @submit.prevent="editForm" ref="form">
                          <v-row justify="center">
                            <v-col cols="12" sm="6" text="left">
                              <label class="d-block text-left input-label mb-2 font-weight-bold">First Name</label>
                              <v-text-field placeholder="First Name" v-model="firstName" single-line outlined type="text" hide-details>
                              </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" text="left">
                              <label class="d-block text-left input-label mb-2 font-weight-bold">Last Name </label>
                              <v-text-field placeholder="Last Name" v-model="lastName" single-line outlined type="text" hide-details>
                              </v-text-field>
                            </v-col>
                          </v-row>
                          <v-row justify="center">
                            <v-col cols="12" sm="6" text="left">
                              <label class="d-block text-left input-label mb-2 font-weight-bold">Title </label>
                              <v-text-field placeholder="Title" v-model="title" single-line outlined type="text" hide-details>
                              </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" text="left">
                              <label class="d-block text-left input-label mb-2 font-weight-bold">Mobile Number </label>
                              <VuePhoneNumberInput :border-radius="8" size="lg" v-model="mobileNumber"
                              :translations="translations"
                              :loader="hasLoaderActive"
                              :error="hasErrorActive"
                              class="mb-2"
                              @update="onUpdate"
                              />
                            </v-col>
                          </v-row>
                          <v-row justify="center">
                            <v-col cols="12" sm="12" text="left">
                              <label class="d-block text-left input-label mb-2 font-weight-bold">Email Address </label>
                              <v-text-field placeholder="Email Address  " single-line outlined type="email" v-model="email" s hide-details>
                              </v-text-field>
                            </v-col>
                          </v-row>
                          <v-row justify="center">
                            <v-col cols="12">
                              <v-btn color="#0D9648" type="submit" height="56" min-width="220px" class="text-capitalize white--text font-weight-bold save-btn px-9"  large>Save</v-btn>
                            </v-col>
                          </v-row>
                        </v-form>
                      </v-col>
                    </v-row>
                    <v-divider class="my-12"></v-divider>
                    <change-password></change-password>
                    <v-divider class="my-12"></v-divider>
                    <v-row justify="center">
                      <v-col cols="12" sm="10" md="10">
                        <v-row justify="center">
                          <v-col cols="10" sm="6">
                            <h3 class="text-left font-weight-bold admin-title">Two Factor Authentication</h3>
                          </v-col>
                          <v-col cols="2" sm="6">
                            <v-switch
                              v-model="twoFactor"
                              inset class="mr-4 mt-0 text-right" hide-details
                            ></v-switch>
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                    <v-divider class="my-12"></v-divider>
                    <notifications></notifications>
                    <v-divider class="my-12"></v-divider>
                    <v-row justify="center">
                      <v-col cols="12" sm="10" md="10">
                        <v-row justify="start" class="mb-4">
                          <v-col cols="12" sm="12" text="left">
                            <h2 class="text-left pl-3">Organization Administrators</h2>
                          </v-col>
                        </v-row>
                        <v-simple-table>
                          <template v-slot:default>
                            <thead>
                              <tr>
                                <th class="text-left black--text">
                                  Name
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
  import ProfileImage from './Profile/ProfileImage.vue'
  import ChangePassword from './Profile/ChangePassword.vue'
  import Notifications from './Profile/Notifications.vue'
  import VuePhoneNumberInput from 'vue-phone-number-input';
  import 'vue-phone-number-input/dist/vue-phone-number-input.css';
export default {
  name : "EditProfile",
  components: {
    Navbar,
    LeftSidebar,
    ProfileImage,
    ChangePassword,
    Notifications,
    VuePhoneNumberInput
  },
  
  data() {
    return {
      isHidden : false,
      firstName: this.$store.getters.userInfo.firstName,
      lastName: this.$store.getters.userInfo.lastName,
      title: this.$store.getters.userInfo.title,
      mobileNumber: this.$store.getters.userInfo.phone,
      email: this.$store.getters.userInfo.email,
      defaultCountry: 'US',
      translations: {
        countrySelectorLabel: 'Country Code',
        countrySelectorError: 'Choose country',
        phoneNumberLabel: 'Phone Number',
        example: 'Example'
      },
      hasLoaderActive: false,
      hasErrorActive: false,
      results: {},
      twoFactor: true,
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
        this.firstName = this.$store.getters.userInfo.firstName;
    },
  },
  methods: {
    onUpdate (payload) {
      this.results = payload.formattedNumber;
    },
    editForm(){
      this.mobileNumber = this.results;
    },
    
  },
  mounted() {
    document.title = "Edit Profile - BidOut"
  }
};
</script>
