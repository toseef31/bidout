<template>
  <section class="section-container fill-height">
     <v-row class="signin">
       <v-col cols="12" md="6" class="left">
          <div class="form-section mb-15 mt-n16 ">
            <div class="logo mb-15">
              <img :src="require('@/assets/images/logo1.png')" width="100%">
            </div>
             <v-form @submit.prevent="submit" ref="form" class="login-form" v-model="valid"
              lazy-validation>
               <label class="font-weight-bold">Email</label> 
                 <v-text-field
                   v-model="email"
                   :rules="emailRules"
                   required
                   outlined
                   placeholder="example@bidoutapp.com"
                   class="rounded-lg mt-2"
                   type="email"
                   color="#0D1139"
                   background-color="white"
                 ></v-text-field>
               <div class="text-center">
                 <v-btn class="signin-btn rounded-lg text-capitalize font-weight-bold"  type="submit" color="success" :disabled="!valid" @click="reset">
                   Request Reset Password Link
                 </v-btn>
               </div>

             </v-form>
          </div>
          <div class="bottom-section">
            <a href="/login" class="center font-weight-bold font-lg text-decoration-none"> <v-icon large color="#0D1139">mdi-chevron-left</v-icon>    Back to Log In</a>
          </div>
       </v-col>
       <v-col cols="12" md="6" class="right d-none d-md-block">
         <v-img :src="require('@/assets/images/sideBanner.png')" width="100%" height="100%"></v-img>
       </v-col>
     </v-row>
   </section>
</template>

<script>

export default {
  name : "ForgotPassword",
  data() {
    return {
      valid: true,
      email: "",
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
    };
  },
  methods: {
    reset() {
      this.$refs.form.validate();
      const { email } = this;
      console.log(email + "logged in")
    },
  },
};
</script>
<style scoped lang="scss">
@import '@/assets/styles/auth/common.scss';
</style>
