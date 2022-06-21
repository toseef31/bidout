<template>
  <section class="section-container fill-height">
    <Navbar></Navbar>
     <!-- <v-row class="signin">
       <v-col cols="12" md="6" class="left">
          <div class="form-section mb-15">
            <div class="logo mb-15">
              <v-img :src="require('@/assets/images/logo.png')" contain></v-img>
            </div>
             <v-form @submit.prevent="submit" ref="form" class="login-form" v-model="valid"
              lazy-validation>
               <label class="font-weight-bold">Dashboard</label> 
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
                 <a href="/forgot-password" class="ml-3 font-weight-medium">Forgot password?</a>
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
         <v-img src="src/assets/sideBanner.png"></v-img>
       </v-col>
     </v-row> -->
   </section>
</template>

<script>
  import Navbar from './Layout/Navbar.vue'
export default {
  name : "Dashboard",
  components: {
    Navbar,
  },
  data() {
    return {
      
    };
  },
  methods: {
    
  },
};
</script>
<style scoped lang="scss">
@import '@/assets/styles/dashboard/dashboard.scss';
</style>
