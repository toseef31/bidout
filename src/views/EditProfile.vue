<template>
  <v-row class="profile-module pa-0 ma-0">
    <v-col
      class="pa-0 pr-sm-3"
      :class="[
        showSideBar ? 'col-md-12 col-12 col-sm-12' : 'mid-content-collapse',
        activityPanel ? 'd-sm-block' : 'd-md-block',
      ]"
      v-show="!activityPanel"
    >
      <div class="mid-content mb-2">
        <div class="content-section">
          <v-row class="mx-0" justify="center" no-gutters>
            <v-col cols="12" sm="12" md="12" class="d-sm-block pt-0">
              <div class="manage-sections py-4 pt-0">
                <profile-image></profile-image>
                <div class="editprofile-section mt-16">
                  <v-row justify="center">
                    <v-col cols="12" sm="10" md="10">
                      <v-form @submit.prevent="editForm" ref="form">
                        <v-row justify="center">
                          <v-col cols="12" sm="6" text="left">
                            <label
                              class="d-block text-left input-label mb-2 font-weight-bold"
                              >First Name</label
                            >
                            <v-text-field
                              placeholder="First Name"
                              v-model="firstName"
                              single-line
                              outlined
                              type="text"
                              hide-details
                            >
                            </v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" text="left">
                            <label
                              class="d-block text-left input-label mb-2 font-weight-bold"
                              >Last Name
                            </label>
                            <v-text-field
                              placeholder="Last Name"
                              v-model="lastName"
                              single-line
                              outlined
                              type="text"
                              hide-details
                            >
                            </v-text-field>
                          </v-col>
                        </v-row>
                        <v-row justify="center">
                          <v-col cols="12" sm="6" text="left">
                            <label
                              class="d-block text-left input-label mb-2 font-weight-bold"
                              >Title
                            </label>
                            <v-text-field
                              placeholder="Title"
                              v-model="title"
                              single-line
                              outlined
                              type="text"
                              hide-details
                            >
                            </v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" text="left">
                            <label
                              class="d-block text-left input-label mb-2 font-weight-bold"
                              >Mobile Number
                            </label>
                            <VuePhoneNumberInput
                              :border-radius="8"
                              size="lg"
                              v-model="mobileNumber"
                              :translations="translations"
                              :loader="hasLoaderActive"
                              :error="hasErrorActive"
                              class="mb-2"
                              @update="onUpdate"
                            />
                          </v-col>
                        </v-row>
                        <v-row justify="center">
                          <v-col cols="12" sm="12" text="left">
                            <label
                              class="d-block text-left input-label mb-2 font-weight-bold"
                              >Email Address
                              <v-tooltip right>
                                <template v-slot:activator="{ on, attrs }">
                                  <v-icon small v-bind="attrs" v-on="on">
                                    mdi-information-outline
                                  </v-icon>
                                </template>
                                <span>You can't edit your email</span>
                              </v-tooltip>
                            </label>

                            <v-text-field
                              placeholder="Email Address"
                              single-line
                              outlined
                              type="email"
                              v-model="email"
                              hide-details
                              readonly
                            >
                            </v-text-field>
                          </v-col>
                        </v-row>
                        <v-row justify="center">
                          <v-col cols="12" sm="12" text="left">
                            <label
                              class="d-block text-left input-label mb-2 font-weight-bold"
                              >Timezone
                            </label>

                            <v-autocomplete
                              v-model="userTimezone"
                              :items="timezone"
                              :search-input.sync="searchTimezone"
                              item-text="label"
                              item-value="tzCode"
                              flat
                              auto-select-first
                              hide-details
                              outlined
                            ></v-autocomplete>
                          </v-col>
                        </v-row>
                        <v-row justify="center">
                          <v-col cols="12">
                            <v-btn
                              color="#0D9648"
                              type="submit"
                              height="56"
                              min-width="220px"
                              class="text-capitalize white--text font-weight-bold save-btn px-9"
                              :loading="profileLoading"
                              :disabled="profileLoading"
                              large
                              >Save</v-btn
                            >
                          </v-col>
                        </v-row>
                      </v-form>
                    </v-col>
                  </v-row>
                  <v-divider class="my-12"></v-divider>
                  <change-password></change-password>

                  <v-divider class="my-12"></v-divider>
                  <notifications></notifications>
                  <v-divider class="my-12"></v-divider>
                  <v-row justify="center">
                    <v-col cols="12" sm="10" md="10">
                      <v-row justify="start" class="mb-4">
                        <v-col cols="12" sm="12" text="left">
                          <h2 class="text-left pl-3">
                            Organization Administrators
                          </h2>
                        </v-col>
                      </v-row>
                      <v-simple-table>
                        <template v-slot:default>
                          <thead>
                            <tr>
                              <th class="text-left black--text">Name</th>
                              <th class="text-left black--text">
                                Email Address
                              </th>
                              <th class="text-left black--text">Phone</th>
                            </tr>
                          </thead>
                          <tbody>
                            <template v-if="companyAdmins.length > 0">
                              <tr v-for="admins in companyAdmins">
                                <td class="text-left">
                                  {{ admins.firstName }} {{ admins.lastName }}
                                </td>
                                <td class="text-left">{{ admins.email }}</td>
                                <td class="text-left">
                                  <span v-if="admins.phoneNumber">{{
                                    admins.phoneNumber
                                  }}</span
                                  ><span v-else>Not Provided</span>
                                </td>
                              </tr>
                            </template>
                            <template v-else>
                              <tr>
                                <td colspan="3">
                                  There is no Administrator of this company.
                                </td>
                              </tr>
                            </template>
                          </tbody>
                        </template>
                      </v-simple-table>
                    </v-col>
                  </v-row>
                  <v-divider class="my-12 d-none"></v-divider>
                  <v-row justify="center" class="d-none">
                    <v-col cols="12" sm="10" md="10">
                      <v-row justify="start" class="mb-8">
                        <v-col cols="12" sm="12" text="left">
                          <h2 class="text-left pl-3">Login History</h2>
                        </v-col>
                      </v-row>
                      <v-simple-table>
                        <template v-slot:default>
                          <tbody>
                            <tr v-for="(history,index) in historyData" :key="index">
                              <td class="text-left">
                                {{ time(history.date, userTimezone) }}
                              </td>
                              <td class="text-left">{{ history.location }}</td>
                              <td class="text-right">
                                {{ history.deviceType }}
                              </td>
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                    </v-col>
                  </v-row>
                </div>
              </div>
            </v-col>
          </v-row>
        </div>
      </div>
    </v-col>
  </v-row>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import VuePhoneNumberInput from 'vue-phone-number-input';
import timezones from 'timezones-list';
import VueMoment from 'vue-moment';
import moment from 'moment-timezone';
import _ from 'lodash';
import ProfileImage from '../components/Profile/ProfileImage.vue';
import ChangePassword from '../components/Profile/ChangePassword.vue';
import Notifications from '../components/Profile/Notifications.vue';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';

export default {
  name: 'EditProfile',
  components: {
    ProfileImage,
    ChangePassword,
    Notifications,
    VuePhoneNumberInput,
  },

  data() {
    return {
      timezone: timezones,
      isHidden: false,
      firstName: this.$store.getters.userInfo.firstName,
      lastName: this.$store.getters.userInfo.lastName,
      title: this.$store.getters.userInfo.title,
      mobileNumber: this.$store.getters.userInfo.phoneNumber,
      email: this.$store.getters.userInfo.email,
      userTimezone: this.$store.getters.userInfo.timezone,
      searchTimezone: null,
      defaultCountry: 'US',
      translations: {
        countrySelectorLabel: 'Country Code',
        countrySelectorError: 'Choose country',
        phoneNumberLabel: 'Phone Number',
        example: 'Example',
      },
      hasLoaderActive: false,
      hasErrorActive: false,
      results: {},
      twoFactor: true,
      timee: '',
      saveLoading: false,
    };
  },

  computed: {
    ...mapGetters(['profileLoading', 'showErrorAlert', 'message']),
    showSideBar() {
      return this.$store.getters.g_sideBarOpen;
    },
    activityPanel() {
      return this.$store.getters.g_activityPanel;
    },
    // eslint-disable-next-line vue/return-in-computed-property
    userDatas() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.firstName = this.$store.getters.userInfo.firstName;
    },
    userDatss() {
      return this.$store.getters.userInfo;
    },
    historyData() {
      return _.orderBy(this.$store.getters.historyData, 'date', 'desc');
    },
    companyAdmins() {
      return this.$store.getters.companyAdmins;
    },
  },
  watch: {
    searchTimezone(val) {
      // eslint-disable-next-line no-unused-expressions
      val && val !== this.userTimezone;
    },
    message(value) {
      if (value) {
        this.$toasted.show(value, {
          position: 'top-center',
          duration: 3000,
          className: 'error-toast',
          type: 'error',
        });
      }
    },
  },
  methods: {
    ...mapActions(['updateProfile', 'loginHistory', 'adminsCompany']),
    onUpdate(payload) {
      this.results = payload.formattedNumber;
    },
    editForm() {
      this.mobileNumber = this.results;
      const user = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        phoneNumber: this.mobileNumber,
        title: this.title,
        userid: this.$store.getters.userInfo.id,
        timezone: this.userTimezone,
      };
      this.updateProfile(user);
    },
    history() {
      const user = {
        userid: this.$store.getters.userInfo.id,
      };
      this.loginHistory(user);
    },
    getAdmins() {
      const data = {
        company: this.$store.getters.userInfo.company.company,
      };
      this.adminsCompany(data);
    },
    time(newDate, zone) {
      return moment.tz(newDate, zone).format('MMM DD YYYY, h:mm:ss a');
    },
  },
  mounted() {
    document.title = 'Edit Profile - BidOut';
    this.history();
    this.getAdmins();

    if (!this.$store.getters.userInfo.timezone) {
      this.userTimezone = 'America/Chicago';
    }
  },
};
</script>
