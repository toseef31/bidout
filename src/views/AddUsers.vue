<template>
  
   <v-col class="addUsers-module pa-0 pa-sm-3 pl-sm-0" :class="[ showSideBar ? 'col-md-9 col-12 col-sm-9' : 'mid-content-collapse', activityPanel ? 'd-sm-block' : 'd-md-block']" v-show="!activityPanel">
    <div class="mid-content">
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
                  <label class="d-block text-left font-weight-bold mb-2">First Name</label>
                  <v-text-field
                    v-model="firstName"
                    :rules="nameRules"
                    placeholder="First Name"
                    required
                    outlined
                  ></v-text-field>
                  <label class="d-block text-left font-weight-bold mb-2">Last Name</label>
                  <v-text-field
                    v-model="lastName"
                    :rules="nameRules"
                    placeholder="Last Name"
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
    </div>
   </v-col>
</template>
<script>
  import Navbar from './Layout/Navbar.vue'
  import LeftSidebar from './Layout/Dashboard/LeftSidebar.vue'
  import RightSidebar from './Layout/Dashboard/RightSidebar.vue'
  import axios from 'axios'
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
      valid: true,
        firstName: '',
        lastName: '',
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
          'Administrator',
          'User',
        ],
        user: '',
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
    ...mapActions(["inviteUser"]),
    
    validate() {
      this.$refs.form.validate();
      var data = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        role: this.select,
        company: this.user.company,
        parent: this.user.id,
      }
      this.inviteUser(data);
    },
  },
  mounted() {
    document.title = "Add Users - BidOut";
    this.user = this.$store.getters.userInfo;
    console.log(this.user);
  }
};
</script>
<style scoped lang="scss">

</style>
