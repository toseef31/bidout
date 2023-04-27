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
             <v-form @submit.prevent="forgetPassword" ref="form" class="login-form" v-model="valid"
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
               <div class="text-center">
                 <v-btn class="reset-btn rounded-lg text-capitalize font-weight-bold white--text" color="#0D9648"  type="submit" :disabled="loading" :loading="loading" @click="reset">
                   Request Reset Password Link
                 </v-btn>
               </div>

             </v-form>
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
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'ForgotPassword',
  data() {
    return {
      valid: true,
      loading: false,
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^[\w\.+]+@([\w-]+\.)+[\w-]{2,3}$/.test(v) || 'E-mail must be valid',
      ],
      errorMessage: '',
      successMessage: '',
    };
  },
  computed: {
    ...mapGetters(['forgetEmail']),
    emailError() {
      return this.$store.getters.errorMessage;
    },
    emailSucess() {
      if (this.$store.getters.successMessage) {
        this.loading = false;
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.loading = false;
      return this.$store.getters.successMessage;
    },
  },
  methods: {
    ...mapActions(['forgotEmail']),
    reset() {
      this.$refs.form.validate();
      const { email } = this;
    },
    forgetPassword() {
      this.forgotEmail({ 'email': this.email});
      this.loading = true;
      this.$refs.form.reset();
    },
  },
  mounted() {
    document.title = 'Forgot Password - BidOut';
    if (this.forgetEmail != null) {
      this.email = this.forgetEmail;
    }
  },
};
</script>
<style scoped lang="scss">
</style>
