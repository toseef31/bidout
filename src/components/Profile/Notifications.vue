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
	                v-model="responseAll"
	                color="#0D9648"
	                class="mt-0"
	                hide-details 
	              ></v-checkbox>
	            </td>
	            <td class="text-right">
	              <v-checkbox
	                v-model="notificationPreference.bidResponses.email"
	                color="#0D9648"
	                class="mt-0"
	                hide-details  @change="updateNoti"
	              ></v-checkbox>
	            </td>
	            <td class="text-right">
	              <v-checkbox
	                v-model="notificationPreference.bidResponses.sms"
	                color="#0D9648"
	                class="mt-0"
	                hide-details  @change="updateNoti"
	              ></v-checkbox>
	            </td>
	          </tr>
	          <tr>
	            <td class="text-left">Questions & Answers</td>
	            <td class="text-left">
	              <v-checkbox
	                v-model="questionAndAnswersAll"
	                color="#0D9648"
	                class="mt-0"
	                hide-details  
	              ></v-checkbox>
	            </td>
	            <td class="text-left">
	              <v-checkbox
	                v-model="notificationPreference.questionAndAnswers.email"
	                color="#0D9648"
	                class="mt-0"
	                hide-details  @change="updateNoti"
	              ></v-checkbox>
	            </td>
	            <td class="text-left">
	              <v-checkbox
	                v-model="notificationPreference.questionAndAnswers.sms"
	                color="#0D9648"
	                class="mt-0"
	                hide-details  @change="updateNoti"
	              ></v-checkbox>
	            </td>
	          </tr>
	          <tr>
	            <td class="text-left">Bid Completion Emails</td>
	            <td class="text-left">
	              <v-checkbox
	                v-model="bidCompletionEmailsAll"
	                color="#0D9648"
	                class="mt-0"
	                hide-details
	              ></v-checkbox>
	            </td>
	            <td class="text-left">
	              <v-checkbox
	                v-model="notificationPreference.bidCompletionEmails.email"
	                color="#0D9648"
	                class="mt-0"
	                hide-details  @change="updateNoti"
	              ></v-checkbox>
	            </td>
	            <td class="text-left">
	              <v-checkbox
	                v-model="notificationPreference.bidCompletionEmails.sms"
	                color="#0D9648"
	                class="mt-0"
	                hide-details @change="updateNoti"
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
  import _ from 'lodash';
export default {
  data() {
    return {
    	responseAll: false,
    	questionAndAnswersAll: false,
    	bidCompletionEmailsAll: false,
    	notificationPreference: {
    		bidResponses: {
    			email: '',
    			sms: '',
    		},
    		questionAndAnswers: {
    			email: '',
    			sms: '',
    		},
    		bidCompletionEmails: {
    			email: '',
    			sms: '',
    		},
    	},
    };
  },
  computed:{
    notifications(){

    	return this.$store.getters.userInfo;
    }
  },
 	watch: {
 		responseAll: _.debounce(function(){
 		  if(this.responseAll == true){
 		    this.notificationPreference.bidResponses.email = true;
 		    this.notificationPreference.bidResponses.sms = true;
 		  }else{
 		    this.notificationPreference.bidResponses.email = false;
 		    this.notificationPreference.bidResponses.sms = false;
 		  }
 		  this.updateNoti();
 		},500),
 		questionAndAnswersAll: _.debounce(function(){
 		  if(this.questionAndAnswersAll == true){
 		    this.notificationPreference.questionAndAnswers.email = true;
 		    this.notificationPreference.questionAndAnswers.sms = true;
 		  }else {
 		    this.notificationPreference.questionAndAnswers.email = false;
 		    this.notificationPreference.questionAndAnswers.sms = false;
 		  }
 		  this.updateNoti();
 		},500),
 		bidCompletionEmailsAll: _.debounce(function(){
 		  if(this.bidCompletionEmailsAll == true){
 		    this.notificationPreference.bidCompletionEmails.email = true;
 		    this.notificationPreference.bidCompletionEmails.sms = true;
 		  }else {
 		    this.notificationPreference.bidCompletionEmails.email = false;
 		    this.notificationPreference.bidCompletionEmails.sms = false;
 		  }
 		  this.updateNoti();
 		},500),
 	},
  methods: {
    ...mapActions(["updateNotifications"]),
    updateNoti(){
    	var data = {
    		userid: this.$store.getters.userInfo.id,
    		email: this.$store.getters.userInfo.email,
    		notificationPreference: this.notificationPreference,
    	}
    	// console.log(data);
    	this.updateNotifications(data);
    }
  },
  mounted() {
    if(this.$store.getters.userInfo.notificationPreference){
    	this.notificationPreference.bidResponses.email = this.$store.getters.userInfo.notificationPreference.bidResponses.email;
    	this.notificationPreference.bidResponses.sms = this.$store.getters.userInfo.notificationPreference.bidResponses.sms;
    	if(this.$store.getters.userInfo.notificationPreference.bidResponses.email == true && this.$store.getters.userInfo.notificationPreference.bidResponses.sms == true){
    		this.responseAll = true;
    	}
    	this.notificationPreference.questionAndAnswers.email = this.$store.getters.userInfo.notificationPreference.questionAndAnswers.email;
    	this.notificationPreference.questionAndAnswers.sms = this.$store.getters.userInfo.notificationPreference.questionAndAnswers.sms;
    	if(this.$store.getters.userInfo.notificationPreference.questionAndAnswers.email == true && this.$store.getters.userInfo.notificationPreference.questionAndAnswers.sms == true){
    		this.questionAndAnswersAll = true;
    	}
	    this.notificationPreference.bidCompletionEmails.email = this.$store.getters.userInfo.notificationPreference.bidCompletionEmails.email;
	    this.notificationPreference.bidCompletionEmails.sms = this.$store.getters.userInfo.notificationPreference.bidCompletionEmails.sms;
	    if(this.$store.getters.userInfo.notificationPreference.bidCompletionEmails.email == true && this.$store.getters.userInfo.notificationPreference.bidCompletionEmails.sms == true){
	    	this.bidCompletionEmailsAll = true;
	    }
    }

  } 
};
</script>