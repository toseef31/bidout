<template>
  <v-row>
    <v-col class="col-12 pa-0 pa-sm-3 pl-sm-0 pb-sm-0 inviation-module">
      <div class="mid-content">
        <div class="content-section fill-height">
          <v-row align="center" justify="space-between" no-gutters class="pa-6 mb-10 mx-0">
            <v-col cols="12">
              <div class="completed-banner d-flex justify-center align-center">
                <img :src="require('@/assets/images/bids/tick.png')" width="88px" height="88px">
              </div>
              
            </v-col>
          </v-row>
          <v-row justify="center" align="center" class="mx-0">
            <v-col cols="12" md="6">
              <div class="completed-content">
                <h1 class="font-weight-bold mb-10">You have accepted the invitation</h1>
                <h2 class="mb-12">Set your account password</h2>
              </div>
            </v-col>
          </v-row>
          <v-row justify="center" align="center" class="mx-0">
            <v-col cols="12" md="4">
              <v-form @submit.prevent="resetInvite" ref="form" class="login-form mb-7" v-model="valid"
               lazy-validation>
                 <label class="font-weight-bold d-block text-left">New Password</label> 
                 <input type="hidden" v-model="token">
                 <v-text-field placeholder="Password" single-line outlined type="password" v-model="password" :rules="[required, min6]">
                   <template v-slot:append>
                     <v-icon
                       v-if="successPass"
                       color="green"
                       >{{ passRule }}</v-icon>
                     <v-icon
                       v-if="!successPass"
                       color="red"
                       >{{ passRule }}</v-icon>
                   </template>
                 </v-text-field>
                 <label class="font-weight-bold d-block text-left">Confirm Password</label> 
                 <v-text-field placeholder="Confirm Password" single-line outlined type="password" v-model="confirmPassword":rules="[required, min6, matchingPasswords ]">
                   <template v-slot:append>
                     <v-icon
                       v-if="successPass1"
                       color="green"
                       >{{ passRule1 }}</v-icon
                     >
                     <v-icon
                        v-if="!successPass1"
                        color="red"
                        >{{ passRule1 }}</v-icon
                     >
                   </template>
                 </v-text-field>
                <div class="text-center">
                  <v-btn class="signin-btn text-capitalize font-weight-bold white--text px-4"  type="submit" color="#0D9648" width="220px" height="45px" :disabled="!valid">
                    Set Password
                  </v-btn>
                </div>

              </v-form>
            </v-col>
          </v-row>
        </div>
      </div>
    </v-col>
  </v-row>
</template>
<script>
 
  import { mapActions } from "vuex";
export default {
  name : "Completed",
  components: {
    
  },
  
  data() {
    return {
      valid: true,
      token: this.$route.params.token,
      users: '',
      password: '',
      confirmPassword: '',
      successPass: false,
      successPass1: false,
    };
  },
  computed:{
    passRule: function() {
      if (this.password === '') {
        this.successPass = false;
        return '';
      } else if (this.min6(this.password) === true) {
        this.successPass = true;
        return 'mdi-check';
      } else {
        this.successPass = false;
        return 'mdi-close';
      }
    },
    passRule1: function() {
      if (this.confirmPassword === '') {
        // field is empty
        this.successPass1 = false;
        return '';
      } else if (this.min6(this.confirmPassword) === true && this.matchingPasswords() === true) {
        this.successPass1 = true;
        return 'mdi-check';
      } else {
        // password wrong
        this.successPass1 = false;
        return 'mdi-close';
      }
    },
  },
  methods: {
    ...mapActions(["resetInvitePassword","verifyInviteToken"]),
    required: function(value) {
      if (value) {
        return true;
      } else {
        return 'This field is required.';
      }
    },
    min6: function(value) {
      if (value.length >= 6) {
        return true;
      } else {
        return 'Password should have more than 6 characters.';
      }
    },
    matchingPasswords: function() {
      if (this.password === this.confirmPassword) {
        return true;
      } else {
        return 'Passwords does not match.';
      }
    },
    verifyInvite(){
      this.verifyInviteToken(this.token);
    },
    resetInvite(){
      this.$refs.form.validate();
      this.resetInvitePassword({invitationId: this.token, password: this.password});
    }
  },
  mounted() {
    document.title = "Create Bid - BidOut";
    this.verifyInvite();
  }
};
</script>
<style scoped lang="scss">

</style>
