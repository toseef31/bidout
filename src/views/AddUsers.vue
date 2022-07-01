<template>
  <section class="section-container fill-height">
    <Navbar></Navbar>
     <v-row class="mx-0">
       <v-col :class="[ showSideBar ? 'col-12' : 'toggleLeft-sidebar']" class="left-sidebar pr-1">
          <LeftSidebar></LeftSidebar>
       </v-col>
       <v-col class="mid-content pa-0 pa-sm-3" :class="[ showSideBar ? 'col-md-9 col-12 col-sm-9' : 'mid-content-collapse', activityPanel ? 'd-sm-block' : 'd-md-block']" v-show="!activityPanel">
          <div class="content-section">
            <v-row class="mx-0">
              <v-col cols="12" sm="12" md="12" class="d-sm-block">
                <div class="manage-sections pa-4 pa-sm-16">
                  <div class="top-section d-flex">
                    <h4>Add Users</h4>
                  </div>
                  <div class="addUser-form mt-16">
                    <v-form
                      ref="form"
                      v-model="valid"
                      lazy-validation
                    >
                      <label class="d-block text-left font-weight-bold mb-2">Name</label>
                      <v-text-field
                        v-model="name"
                        :rules="nameRules"
                        placeholder="Full Name"
                        required
                        outlined
                      ></v-text-field>
                      <label class="d-block text-left font-weight-bold mb-2">Email Address</label>
                      <v-text-field
                        v-model="email"
                        :rules="emailRules"
                        placeholder="Example@email.com"
                        required
                        outlined
                      ></v-text-field>
                      <label class="d-block text-left font-weight-bold mb-2">Privileges
                        <v-tooltip top>
                          <template v-slot:activator="{ on, attrs }">
                            <v-icon small 
                              v-bind="attrs"
                              v-on="on">mdi-information-outline</v-icon>
                          </template>
                          <span>Add user privileges</span>
                        </v-tooltip>
                      </label>
                      <v-select
                        v-model="select"
                        :items="items"
                        :rules="[v => !!v || 'Privileges is required']"
                        placeholder="Select"
                        required
                        outlined
                        solo-flat
                      ></v-select>

                      <v-btn
                        :disabled="!valid"
                        color="#0D9648"
                        class="mr-4 text-capitalize white--text font-weight-bold"
                        @click="validate"
                        large
                        height="50px"
                        min-width="220px"
                      >
                        Invite User
                      </v-btn>
                    </v-form>
                  </div>
                </div>
              </v-col>
            </v-row>
          </div>
       </v-col>
       <!-- <v-col cols="12" class="pl-0 right-col" :class="[ activityPanel ? '' : 'mobile-right-col']" >
        <div class="right-sidebar"> 
          <RightSidebar></RightSidebar>
        </div>
       </v-col> -->
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
      valid: true,
        name: '',
        nameRules: [
          v => !!v || 'Name is required',
        ],
        email: '',
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        select: null,
        items: [
          'Admin',
          'Customer',
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
    validate() {
      this.$refs.form.validate()
    },
  },
  mounted() {
    
  }
};
</script>
<style scoped lang="scss">
@import '@/assets/styles/profile/addUsers.scss';
</style>
