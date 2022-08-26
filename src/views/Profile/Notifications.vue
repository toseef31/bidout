<template>
	<v-row justify="center">
	  <v-col cols="12" sm="10" md="10">
	    <v-simple-table>
	      <template v-slot:default>
	        <thead>
	          <tr>
	            <th class="text-left head-title">
	              Notification Settings
	            </th>
	            <th class="text-right black--text pr-6">
	              All
	            </th>
	            <th class="text-right black--text">
	              Email
	            </th>
	            <th class="text-right black--text">
	              SMS
	            </th>
	          </tr>
	        </thead>
	        <tbody>
	          <tr>
	            <td class="text-left">Bid Response</td>
	            <td class="text-right">
	              <v-checkbox
	                v-model="bidResponseAll"
	                color="#0D9648"
	                class="mt-0"
	                hide-details
	              ></v-checkbox>
	            </td>
	            <td class="text-right">
	              <v-checkbox
	                v-model="bidResponseEmail"
	                color="#0D9648"
	                class="mt-0"
	                hide-details
	              ></v-checkbox>
	            </td>
	            <td class="text-right">
	              <v-checkbox
	                v-model="bidResponseSMS"
	                color="#0D9648"
	                class="mt-0"
	                hide-details
	              ></v-checkbox>
	            </td>
	          </tr>
	          <tr>
	            <td class="text-left">Questions & Answers</td>
	            <td class="text-left">
	              <v-checkbox
	                v-model="qAAll"
	                color="#0D9648"
	                class="mt-0"
	                hide-details
	              ></v-checkbox>
	            </td>
	            <td class="text-left">
	              <v-checkbox
	                v-model="qAEmail"
	                color="#0D9648"
	                class="mt-0"
	                hide-details
	              ></v-checkbox>
	            </td>
	            <td class="text-left">
	              <v-checkbox
	                v-model="qASMS"
	                color="#0D9648"
	                class="mt-0"
	                hide-details
	              ></v-checkbox>
	            </td>
	          </tr>
	          <tr>
	            <td class="text-left">Bid Completion Emails</td>
	            <td class="text-left">
	              <v-checkbox
	                v-model="bidCompletionAll"
	                color="#0D9648"
	                class="mt-0"
	                hide-details
	              ></v-checkbox>
	            </td>
	            <td class="text-left">
	              <v-checkbox
	                v-model="bidCompletionEmail"
	                color="#0D9648"
	                class="mt-0"
	                hide-details
	              ></v-checkbox>
	            </td>
	            <td class="text-left">
	              <v-checkbox
	                v-model="bidCompletionSMS"
	                color="#0D9648"
	                class="mt-0"
	                hide-details
	              ></v-checkbox>
	            </td>
	          </tr>
	        </tbody>
	      </template>
	    </v-simple-table>
	  </v-col>
	</v-row>
</template>
<script>
  import { mapActions } from "vuex";
export default {
  data() {
    return {
      bidResponseAll: true,
      bidResponseEmail: true,
      bidResponseSMS: true,
      qAAll: true,
      qAEmail: true,
      qASMS: true,
      bidCompletionAll: true,
      bidCompletionEmail: true,
      bidCompletionSMS: true
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