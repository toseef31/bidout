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
								<v-checkbox v-model="responseAll" color="#0D9648" class="mt-0" hide-details></v-checkbox>
							</td>
							<td class="text-right">
								<v-checkbox v-model="notificationPreference.bidResponses.email" color="#0D9648" class="mt-0"
									hide-details @change="updateNoti"></v-checkbox>
							</td>
							<td class="text-right">
								<v-checkbox v-model="notificationPreference.bidResponses.sms" color="#0D9648" class="mt-0"
									hide-details @change="updateNoti"></v-checkbox>
							</td>
						</tr>
						<tr>
							<td class="text-left">Questions & Answers</td>
							<td class="text-left">
								<v-checkbox v-model="questionAndAnswersAll" color="#0D9648" class="mt-0"
									hide-details></v-checkbox>
							</td>
							<td class="text-left">
								<v-checkbox v-model="notificationPreference.questionAndAnswers.email" color="#0D9648"
									class="mt-0" hide-details @change="updateNoti"></v-checkbox>
							</td>
							<td class="text-left">
								<v-checkbox v-model="notificationPreference.questionAndAnswers.sms" color="#0D9648"
									class="mt-0" hide-details @change="updateNoti"></v-checkbox>
							</td>
						</tr>
						<tr>
							<td class="text-left">Bid Completion Emails</td>
							<td class="text-left">
								<v-checkbox v-model="bidCompletionEmailsAll" color="#0D9648" class="mt-0"
									hide-details></v-checkbox>
							</td>
							<td class="text-left">
								<v-checkbox v-model="notificationPreference.bidCompletionEmails.email" color="#0D9648"
									class="mt-0" hide-details @change="updateNoti"></v-checkbox>
							</td>
							<td class="text-left">
								<v-checkbox v-model="notificationPreference.bidCompletionEmails.sms" color="#0D9648"
									class="mt-0" hide-details @change="updateNoti"></v-checkbox>
							</td>
						</tr>

						<tr>
							<td class="text-left">Chat Notifications</td>
							<td class="text-left">
								<v-checkbox v-model="chatNotificationAll" color="#0D9648" class="mt-0"
									hide-details></v-checkbox>
							</td>
							<td class="text-left">
								<v-checkbox v-model="notificationPreference.chatNotification.email" color="#0D9648"
									class="mt-0" hide-details @change="updateNoti"></v-checkbox>
							</td>
							<td class="text-left">
								<v-checkbox v-model="notificationPreference.chatNotification.sms" color="#0D9648"
									class="mt-0" hide-details @change="updateNoti"></v-checkbox>
							</td>
						</tr>
					</tbody>
				</template>
			</v-simple-table>
		</v-col>
	</v-row>
</template>
<script>
import { mapActions } from 'vuex';
import _ from 'lodash';

export default {
  data() {
    return {
      responseAll: false,
      questionAndAnswersAll: false,
      bidCompletionEmailsAll: false,
      chatNotificationAll: false,
      notificationPreference: {
        bidResponses: {
          email: this.$store.getters.userInfo.notificationPreferences.bidResponses.email,
          sms: this.$store.getters.userInfo.notificationPreferences.bidResponses.sms,
        },
        questionAndAnswers: {
          email: this.$store.getters.userInfo.notificationPreferences.questionAndAnswers.email,
          sms: this.$store.getters.userInfo.notificationPreferences.questionAndAnswers.sms,
        },
        bidCompletionEmails: {
          email: this.$store.getters.userInfo.notificationPreferences.bidCompletionEmails.email,
          sms: this.$store.getters.userInfo.notificationPreferences.bidCompletionEmails.sms,
        },
        chatNotification: {
          email: this.$store.getters.userInfo.notificationPreferences.chatNotification.email,
          sms: this.$store.getters.userInfo.notificationPreferences.chatNotification.sms,
        },
      },
    };
  },
  computed: {
    notifications() {
      return this.$store.getters.userInfo;
    },
  },
  watch: {
    responseAll: _.debounce(function () {
      if (this.responseAll == true) {
        this.notificationPreferences.bidResponses.email = true;
        this.notificationPreferences.bidResponses.sms = true;
      } else {
        this.notificationPreferences.bidResponses.email = false;
        this.notificationPreferences.bidResponses.sms = false;
      }
      this.updateNoti();
    }, 500),
    questionAndAnswersAll: _.debounce(function () {
      if (this.questionAndAnswersAll == true) {
        this.notificationPreferences.questionAndAnswers.email = true;
        this.notificationPreferences.questionAndAnswers.sms = true;
      } else {
        this.notificationPreferences.questionAndAnswers.email = false;
        this.notificationPreferences.questionAndAnswers.sms = false;
      }
      this.updateNoti();
    }, 500),
    bidCompletionEmailsAll: _.debounce(function () {
      if (this.bidCompletionEmailsAll == true) {
        this.notificationPreferences.bidCompletionEmails.email = true;
        this.notificationPreferences.bidCompletionEmails.sms = true;
      } else {
        this.notificationPreferences.bidCompletionEmails.email = false;
        this.notificationPreferences.bidCompletionEmails.sms = false;
      }
      this.updateNoti();
    }, 500),
    chatNotificationAll: _.debounce(function () {
      if (this.chatNotificationAll == true) {
        this.notificationPreferences.chatNotification.email = true;
        this.notificationPreferences.chatNotification.sms = true;
      } else {
        this.notificationPreferences.chatNotification.email = false;
        this.notificationPreferences.chatNotification.sms = false;
      }
      this.updateNoti();
    }, 500),
  },
  methods: {
    ...mapActions(['updateNotifications']),
    updateNoti() {
      const data = {
        userid: this.$store.getters.userInfo._id,
        email: this.$store.getters.userInfo.email,
        notificationPreference: this.notificationPreference,
      };

      this.updateNotifications(data);
    },
  },
  mounted() {
    if (this.$store.getters.userInfo.notificationPreferences) {
      this.notificationPreferences.bidResponses.email = this.$store.getters.userInfo.notificationPreferences.bidResponses.email;
      this.notificationPreferences.bidResponses.sms = this.$store.getters.userInfo.notificationPreferences.bidResponses.sms;
      if (this.$store.getters.userInfo.notificationPreferences.bidResponses.email == true && this.$store.getters.userInfo.notificationPreferences.bidResponses.sms == true) {
        this.responseAll = true;
      }
      this.notificationPreferences.questionAndAnswers.email = this.$store.getters.userInfo.notificationPreferences.questionAndAnswers.email;
      this.notificationPreferences.questionAndAnswers.sms = this.$store.getters.userInfo.notificationPreferences.questionAndAnswers.sms;
      if (this.$store.getters.userInfo.notificationPreferences.questionAndAnswers.email == true && this.$store.getters.userInfo.notificationPreferences.questionAndAnswers.sms == true) {
        this.questionAndAnswersAll = true;
      }
      this.notificationPreferences.bidCompletionEmails.email = this.$store.getters.userInfo.notificationPreferences.bidCompletionEmails.email;
      this.notificationPreferences.bidCompletionEmails.sms = this.$store.getters.userInfo.notificationPreferences.bidCompletionEmails.sms;
      if (this.$store.getters.userInfo.notificationPreferences.bidCompletionEmails.email == true && this.$store.getters.userInfo.notificationPreferences.bidCompletionEmails.sms == true) {
        this.bidCompletionEmailsAll = true;
      }

      this.notificationPreferences.chatNotification.email = this.$store.getters.userInfo.notificationPreferences.chatNotification.email;
      this.notificationPreferences.chatNotification.sms = this.$store.getters.userInfo.notificationPreferences.chatNotification.sms;
      if (this.$store.getters.userInfo.notificationPreferences.chatNotification.email == true && this.$store.getters.userInfo.notificationPreferences.chatNotification.sms == true) {
        this.chatNotificationAll = true;
      }
    }
  },
};
</script>
