<template>
  <section class="section-container fill-height auth-module">
     <v-row class="signin">
       <v-col cols="12" md="6" class="left">
          <div class="form-section mb-15">
            <div class="logo mb-lg-15" :class="[passwordError != null ? 'mb-0' : 'mb-9']">
              <router-link to="/"><img :src="require('@/assets/images/logo.png')" width="100%"></router-link>
            </div>
            <v-alert type="error" v-if="logInError != null">
              {{ logInError }}
            </v-alert>

            <v-alert type="error" v-if="passwordError != null">
              Oops! You have entered an incorrect email or password, Please try again, if you are still unsure of your password, please <router-link to="/forgot-password" class="white--text">Reset Password</router-link>
            </v-alert>
            <v-alert type="success" v-show="showSuccessAlert" v-if="successMessage != ''">
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
                   placeholder="example@bidout.app"
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
                 <router-link to="/forgot-password" class="ml-3 font-weight-medium">Forgot password?</router-link> </v-hover>
               <div class="text-center mt-8">
                 <v-btn class="signin-btn rounded-lg font-weight-bold text-capitalize" type="submit" color="success" :disabled="!valid" :loading="loginLoading" @click="login">
                   Submit
                 </v-btn>
               </div>

             </v-form>
          </div>
          <div class="bottom-section">
            <p class="center font-weight-bold">Don't have account yet? <router-link to="/get-started">Join BidOut</router-link></p>
          </div>
          
      </v-col>
      <v-col cols="12" md="6" class="right d-none d-md-block">
        <v-img
          :src="require('@/assets/images/sideBanner.png')"
          width="100%"
          height="100%"
        ></v-img>
      </v-col>
    </v-row>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Login',
  data() {
    return {
      valid: true,
      email: this.$store.getters.resetEmail,
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /^[\w\.+]+@([\w-]+\.)+[\w-]{2,3}$/.test(v) || 'E-mail must be valid',
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 6) || 'Password must be at least 6 characters',
      ],
      showPass: false,
      xhrRequest: false,
      showAlert: false,
      errorMessage: '',
      userData: '',
      errorMsg: '',
    };
  },
  watch: {
    email(newValue, oldValue) {
      this.$store.commit('setForgetEmail', newValue);
    },
  },
  computed: {
    ...mapGetters(['loginLoading']),
    logInError() {
      return this.$store.getters.error;
    },
    passwordError() {
      return this.$store.getters.passError;
    },
    showErrorAlert() {
      return this.$store.getters.showErrorAlert;
    },
    showSuccessAlert() {
      return this.$store.getters.showSuccessAlert;
    },
    successMessage() {
      return this.$store.getters.successMessage;
    },
  },
  methods: {
    ...mapActions(['signInAction']),
    login() {
      this.$refs.form.validate();
      const { email } = this;
    },
    loginRequest() {
      this.signInAction({ email: this.email, password: this.password });
    },
  },
  created() {
    setTimeout(() => {
      this.errorMsg = '';
      this.showAlert = false;
    }, 2000);
  },
  mounted() {
    document.title = 'Login - BidOut';
  },
};
</script>
<style scoped lang="scss"></style>
