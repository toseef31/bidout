<template>
  <v-col class="addUsers-module pa-0 pa-sm-3 pl-sm-0" :class="[ showSideBar ? 'col-md-9 col-12 col-sm-9' : 'mid-content-collapse', activityPanel ? 'd-sm-block' : 'd-md-block']" v-show="!activityPanel">
    <div class="mid-content">
      <div class="content-section">
        <v-row class="mx-0">
          <v-col cols="12" sm="12" md="12" class="d-sm-block">
            <div class="manage-sections pa-4 pa-sm-16">
              <div class="top-section d-flex">
                <h4>Update Users</h4>
              </div>
              <div class="addUser-form mt-16">
                <v-form
                  ref="form"
                  v-model="valid"
                  lazy-validation
                >
                  <label class="d-block text-left font-weight-bold mb-2">First Name</label>
                  <v-text-field
                    v-model="userData.firstName"
                    :rules="nameRules"
                    placeholder="First Name"
                    required
                    outlined
                  ></v-text-field>
                  <label class="d-block text-left font-weight-bold mb-2">Last Name</label>
                  <v-text-field
                    v-model="userData.lastName"
                    :rules="nameRules"
                    placeholder="Last Name"
                    required
                    outlined
                  ></v-text-field>
                  <label class="d-block text-left font-weight-bold mb-2">Email Address
                      <v-tooltip right>
                        <template v-slot:activator="{ on, attrs }">
                          <v-icon small
                            v-bind="attrs"
                            v-on="on"
                          >
                            mdi-information-outline
                          </v-icon>
                        </template>
                        <span>Email is not editable</span>
                      </v-tooltip>
                  </label>
                  <v-text-field
                    v-model="userData.email"
                    :rules="emailRules"
                    placeholder="Example@email.com"
                    required
                    outlined disabled
                  ></v-text-field>
                  <label class="d-block text-left font-weight-bold mb-2">Privileges
                    <v-tooltip right>
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon small 
                          v-bind="attrs"
                          v-on="on">mdi-information-outline</v-icon>
                      </template>
                      <span>Add user privileges</span>
                    </v-tooltip>
                  </label>
                  <v-select
                    v-model="userData.role"
                    :items="items"
                    :rules="[v => !!v || 'Privileges is required']"
                    placeholder="Select"
                    item-text="label" item-value="value"
                    required
                    outlined
                    solo-flat class="text-capitalize"
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
                    Update User
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
  import { mapActions,mapState } from "vuex";
export default {
  name : "EditUser",
  components: {
    Navbar,
    LeftSidebar,
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
        role: this.$store.getters.userData.role,
        items: [
          {value: 'admin', label: 'Administrator'},
          {value:'user', label: 'User'},
        ],
    };
  },
  computed:{
    ...mapState(["userData"]),
    showSideBar(){
        return this.$store.getters.g_sideBarOpen;
    },
    activityPanel(){
        return this.$store.getters.g_activityPanel;
    },
    userData(){
      return this.$store.getters.userData.user;
    }
  },
  methods: {
    ...mapActions(['updateUser',"updateInvite"]),
    validate() {
      this.$refs.form.validate();
      // console.log()
      var data = {
        firstName: this.userData.firstName,
        lastName: this.userData.lastName,
        role: this.userData.role,
        id: this.userData.id
      }
      if(this.$store.getters.userData.type == 'general'){
        this.updateUser(data);
      }else{
        this.updateInvite(data);
      }
    },
  },
  mounted() {
    document.title = "Update User - BidOut";
  }
};
</script>
<style scoped lang="scss">

</style>
