<template>
  <section class="section-container fill-height">
     <v-row class="signin">
       <v-col cols="12" md="6" class="left">
          <div class="form-section mb-15">
            <div class="logo mb-15">
              <img :src="require('@/assets/images/logo.png')" width="100%">
            </div> 
            <v-alert type="error" v-if="errorMessage !== ''">
              {{ errorMessage }}
            </v-alert>
            <v-alert type="success" v-if="successMessage !== ''">
              {{ successMessage }}
            </v-alert>
            <v-form @submit.prevent="loginRequest" ref="form" class="login-form" v-model="valid"
              lazy-validation>
               <label class="font-weight-bold">Email</label> 
                 <v-text-field
                   v-model="email"
                   :rules="emailRules"
                   required
                   outlined
                   placeholder="admin@bidoutapp.com"
                   class="rounded-lg mt-2"
                   type="email"
                   color="#0D1139"
                   background-color="white"
                 ></v-text-field>
                 <label class="font-weight-bold">Password</label> 
                 <v-text-field
                   v-model="password"
                   :rules="passwordRules"
                   :append-icon="showPass ? 'mdi-eye view-pass' : 'mdi-eye-off view-pass'"
                   @click:append="showPass = !showPass"
                   required
                   outlined
                   placeholder="••••••••••••"
                   class="rounded-lg mt-2"
                   :type="showPass ? 'text' : 'password'"
                   color="#0D1139"
                   background-color="white"
                 ></v-text-field>
                 <v-hover
                    v-slot="{ hover }"
                    open-delay="200"
                  >
                 <a href="/forgot-password" class="ml-3 font-weight-medium">Forgot password?</a> </v-hover>
               <div class="text-center mt-8">
                 <v-btn class="signin-btn rounded-lg font-weight-bold text-capitalize" type="submit" color="success" :disabled="!valid" @click="login">
                   Submit
                 </v-btn>
               </div>

             </v-form>
          </div>
          <div class="bottom-section">
            <p class="center font-weight-bold">Don't have account yet? <a href="">Join BidOut</a></p>
          </div>
       </v-col>
       <v-col cols="12" md="6" class="right d-none d-md-block">
         <v-img :src="require('@/assets/images/sideBanner.png')" width="100%" height="100%"></v-img>
       </v-col>
     </v-row>
   </section>
</template>

<script>
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
export default {
  name : "Login",
  data() {
    return {
      valid: true,
      email: "",
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      password: "",
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 6) || 'Password must be more than 6 characters',
      ],
      showPass: false,
      xhrRequest: false,
      errorMessage: "",
      successMessage: "",
      userData: ""
    };
  },
  methods: {
    login() {
      this.$refs.form.validate()
      const { email } = this;
      console.log(email + "logged in")
    },
    loginRequest() {
      let v = this;

      v.xhrRequest = true;
      v.errorMessage = "";
      v.successMessage = "";

      firebase.auth().signInWithEmailAndPassword(v.email, v.password).then(
          (result) => {
            this.userData = result.user.multiFactor.user;
            console.log(this.userData); 
            localStorage.setItem("userData",this.userData);
            localStorage.setItem("userId",this.userData.uid);
            this.$router.replace({ name: "Dashboard" });
              // this.$router.replace('dashboard')
              v.xhrRequest = false;
          }, 
          (error) => {
              v.errorMessage = error.message;
              v.xhrRequest = false;
          }
      )
    },
  },
};
</script>
<style scoped lang="scss">
@import '@/assets/styles/auth/common.scss';
</style>
