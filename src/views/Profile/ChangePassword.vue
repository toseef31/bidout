<template>
  <v-row justify="center">
    <v-col cols="12" sm="10" md="10">
      <v-row justify="start" class="mb-8">
        <v-col cols="12" sm="12" text="left">
          <h2 class="text-left pl-3">Change Password</h2>
        </v-col>
      </v-row>
      <v-form @submit.prevent="passwordForm" ref="form" v-model="valid">
        <v-row justify="center">
          <v-col cols="12" sm="12" text="left">
            <label class="d-block text-left input-label mb-2 font-weight-bold">Current Password</label>
            <v-text-field placeholder="Type your current password" v-model="currentPassword" single-line outlined type="password" hide-details>
            </v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="12" sm="12" text="left">
            <label class="d-block text-left input-label mb-2 font-weight-bold">New Password</label>
            <v-text-field placeholder="Type a new password" v-model="newPassword" single-line outlined type="password" :rules="[required, min6]" hide-details>
            <template v-slot:append>
              <v-icon
                 v-if="successPass"
                 color="green"
                 >{{ passRule }}</v-icon
                >
              <v-icon
                 v-if="!successPass"
                 color="red"
                 >{{ passRule }}</v-icon
                >
            </template>
            </v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="12" sm="12" text="left">
            <label class="d-block text-left input-label mb-2 font-weight-bold">Confirm New Password</label>
            <v-text-field placeholder="Repeat your new password" v-model="confirmPassword" single-line outlined type="password"  :rules="[required, min6, matchingPasswords ]" hide-details>
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
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="12">
            <v-btn color="#0D9648" height="56" min-width="220px" class="text-capitalize white--text font-weight-bold save-btn px-9" :disabled="!valid" large>Change Password</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-col>
  </v-row>
</template>
<script>
  import { mapActions } from "vuex";
export default {
  data() {
    return {
      successPass: false,
      successPass1: false,
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      valid: true,
    };
  },
  computed:{
    passRule: function() {
      if (this.newPassword === '') {
        this.successPass = false;
        return '';
      } else if (this.min6(this.newPassword) === true) {
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
      if (this.newPassword === this.confirmPassword) {
        return true;
      } else {
        return 'Passwords does not match.';
      }
    },
  },
  mounted() {
    
  } 
};
</script>