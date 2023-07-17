<template>
  <section class="section-container fill-height auth-module">
     <v-row class="signin">
       <v-col cols="12" md="6" class="left">
          <div class="form-section mb-15 mt-n16 ">
            <div class="logo mb-15">
              <router-link to="/"><img :src="require('@/assets/images/logo.png')" width="100%"></router-link>
            </div>
            <v-alert type="error" v-if="emailError !== null">
              {{ emailError }}
            </v-alert>
            <v-alert type="success" v-if="emailSucess !== null">
              {{ emailSucess }}
            </v-alert>
            <ValidationObserver ref="form" v-slot="{ valid, handleSubmit }">
              <v-form @submit.prevent="resetForm" class="login-form"
                lazy-validation>
                  <label class="font-weight-bold">New Password</label> 
                  <input type="hidden" v-model="token">
                  <ValidationProvider name="Password" rules="required|min:6" vid="password"
                  v-slot="{ errors, valid }">
                    <v-text-field placeholder="Password" single-line outlined type="password" v-model="password" :error-messages="errors" :success="valid">
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
                  </ValidationProvider>
                  <label class="font-weight-bold">Confirm Password</label>
                  <ValidationProvider name="Password confirmation" rules="confirmed:password|required"
                  v-slot="{ errors, valid }">
                    <v-text-field placeholder="Confirm Password" single-line outlined type="password" v-model="confirmPassword" :error-messages="errors" :success="valid">
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
                  </ValidationProvider>
                <div class="text-center">
                  <v-btn class="rounded-lg text-capitalize font-weight-bold white--text" width="100%" height="56" color="#0D9648" type="submit" :disabled="!valid" >
                    Reset Password
                  </v-btn>
                </div>

              </v-form>
            </ValidationObserver>
          </div>
          <div class="bottom-section">
            <router-link to="/login" class="center font-weight-bold font-lg text-decoration-none"><v-icon large color="#0D1139">mdi-chevron-left</v-icon> <span class="text-decoration-underline">Back to Log In</span></router-link>
          </div>
       </v-col>
       <v-col cols="12" md="6" class="right d-none d-md-block">
         <v-img :src="require('@/assets/images/sideBanner.png')" width="100%" height="100%"></v-img>
       </v-col>
     </v-row>
   </section>
</template>

<script>
import { mapActions } from "vuex";
import {
  ValidationObserver,
  ValidationProvider
} from "vee-validate";
export default {
  name: "ResetPassword",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      valid: true,
      successPass: false,
      successPass1: false,
      password: '',
      confirmPassword: '',
      errorMessage: '',
      successMessage: '',
      token: this.$route.params.token,
      email: '',
    };
  },
  computed: {
    emailError () {
      return this.$store.getters.errorMessage
    },
    emailSucess () {
      return this.$store.getters.successMessage
    },
    verifyData (){
     return this.$store.getters.verifyData;
    },
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
    ...mapActions(["resetPassword","verifyToken"]),
    resetForm() {
      if (this.$refs.form.validate()) {
        console.log('true');
        var resetData = {
          email: this.$store.getters.verifyData.email,
          oobCode: this.$store.getters.verifyData.oobCode,
          password: this.password,
        }
        this.resetPassword(resetData);
      }
    },
    verify(){
      this.verifyToken(this.token);
    },
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
  },
  mounted(){
    document.title = "Reset Password - BidOut ";
    this.verify();
  }
};
</script>
<style scoped lang="scss">
</style>
