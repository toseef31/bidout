<template>
  <v-row class="createBid-module pa-0 ma-0">
    <v-col  class="pa-0 pr-sm-3"
      :class="[
        showSideBar ? 'col-md-12 col-12 col-sm-12' : 'mid-content-collapse',
        activityPanel ? 'd-sm-block' : 'd-md-block',
      ]"
      v-show="!activityPanel"
    >
      <div class="mid-content">
        <div class="content-section fill-height pa-0 d-flex align-center justify-center" v-if="loading">
          <v-progress-circular :width="3" color="green" indeterminate ></v-progress-circular>
        </div>
        <div class="content-section fill-height pa-0" v-else>
          <v-row
            align="center"
            justify="space-between"
            no-gutters
            class="px-2 px-sm-6 my-4 not-completd-title"
          >
            <v-col cols="12" md="5" class="text-left">
              <div class="d-flex align-center">
                <h3 class="pl-1 mr-4">{{ bidTitle }}</h3>
                <!-- <p class="preview-text mb-0 ml-3">
                    <a href="" class="text-decoration-none"><v-icon color="#0D9648" class="pr-2">mdi-open-in-new</v-icon>Preview Bid in Supplier View</a>
                  </p> -->
              </div>
            </v-col>
            <v-col cols="12" md="7" class="text-right">
              <div class="d-flex align-center justify-end">
                <!-- <p class="mb-0 mr-4 auto-text" v-if="draftTime">
                  <strong>Autosaved Draft:</strong> {{ draftTime }}
                </p> -->
                <v-btn
                  color="#0D9648"
                  :disabled="!bidDetailsComplete || !lineItemsComplete ? true : false"
                  class="white--text text-capitalize publish-btn"
                  width="250px"
                  height="52px"
                  large
                  @click="publishBid"
                  :loading="saveLoading"
                >
                  Save Bid
                </v-btn>
              </div>
            </v-col>
          </v-row>
          <div class="bidtabs-section">
            <v-tabs
              v-model="currentItem"
              class="bids-tabs"
              fixed-tabs
              hide-slider
             
            >
              <v-tab
                v-for="(item, index) in tabs"
                :key="item.value"
                :href="'#tab-' + item.value"
                class="text-capitalize black--text font-weight-bold"
                @click="updateDraft"
              >
                {{ item.text }} {{ item.index }}

                <template v-if="index === 0">
                  <v-icon
                    small
                    right
                    v-if="validate == true && value == item.value"
                    color="#0D9648"
                    >mdi-check-circle-outline</v-icon
                  >
                  <v-icon right small color="#F32349" v-else>
                    {{ item.icon }}
                  </v-icon>
                </template>

                <template v-if="index === 3">
                  <v-icon
                    small
                    right
                    v-if="itemsValid == true && itemsValue == item.value"
                    color="#0D9648"
                    >mdi-check-circle-outline</v-icon
                  >
                  <v-icon right small color="#F32349" v-else>
                    {{ item.icon }}
                  </v-icon>
                </template>
              </v-tab>
            </v-tabs>
            <v-tabs-items v-model="currentItem">
              <v-tab-item value="tab-1">
                <edit-bid-details
                  @changetab="ChangeT($event)"
                  @validation="validateValue($event)"
                ></edit-bid-details>
              </v-tab-item>
              <v-tab-item value="tab-2">
                <EditSupplierSection
                @toggle-dialog="(el) => supplierDialog = el" :data="newRepsInvited"
                  @changetab="ChangeT($event)"
                  @validation="validateSupplier($event)"
                ></EditSupplierSection>
              </v-tab-item>
              <v-tab-item value="tab-3">
                <edit-team-members
                  @changetab="ChangeT($event)"
                  @validation="validateTeam($event)"
                ></edit-team-members>
              </v-tab-item>
              <v-tab-item

                value="tab-4"
                class="bidline-tab"
              >
                <edit-bid-lines
                  @changetab="ChangeT($event)"
                  @validation="validateItems($event)"
                ></edit-bid-lines>
              </v-tab-item>
              <v-tab-item

                value="tab-5"
                class="attachment-tab mt-5"
              >
                <edit-attachment
                  @changetab="ChangeT($event)"
                  @validation="validateAttachment($event)"
                ></edit-attachment>
              </v-tab-item>
              <v-tab-item

                value="tab-6"
                class="question-tab mt-5"
              >
                <edit-question-section2></edit-question-section2>
              </v-tab-item>
            </v-tabs-items>
          </div>
        </div>
      </div>
    </v-col>
    <v-dialog v-model="supplierDialog" width="800" v-if="!$route.path.includes('create-template')">
          <v-card class="inviteSupplier-dialog">
            <v-card-title class="text-h5 justify-end">
              <v-icon @click="supplierDialog = false" color="#0D1139"> mdi-close</v-icon>
            </v-card-title>

            <v-card-text>
              <h2 class="text-left mb-6 font-weight-bold">Invite New Supplier</h2>
              <v-form ref="form" v-model="valid" lazy-validation>
                <label class="d-block text-left font-weight-bold mb-2">First Name<span
                    class="required-class">*</span></label>
                <v-text-field v-model="firstName" :rules="nameRules" placeholder="First Name" required
                  outlined></v-text-field>
             <label class="d-block text-left font-weight-bold mb-2">Last Name<span
                    class="required-class">*</span></label>
                <v-text-field v-model="lastName" :rules="nameRules" placeholder="Last Name" required
                  outlined></v-text-field>
                <label class="d-block text-left font-weight-bold mb-2">Company<span
                    class="required-class">*</span></label>
                <v-text-field v-model="company" :rules="companyRules" placeholder="Company Name" required
                  outlined></v-text-field>
                <label class="d-block text-left font-weight-bold mb-2">Phone Number<span
                    class="required-class">*</span></label>

                <VuePhoneNumberInput @phone-number-blur="onBlurS" default-country-code="US" :required="true" clearable
                  :error="!getPhoneInfo.valid" :border-radius="8" size="lg" v-model="phoneNumber" error-color="#FF0000"
                  valid-color="#9E9E9E" :translations="translations" class="mb-2" @update="onUpdate" />
                <div class="phone-class" v-if="!getPhoneInfo.valid && getCounter >= 1">
                  {{ getPhoneInfo.message }}</div>
                <label class="d-block text-left font-weight-bold mb-2" :class="{
                  ' mt-2': !getPhoneInfo.valid && getCounter >= 1,
                  'mt-6': getPhoneInfo.valid
                }">Email<span class="required-class">*</span></label>
                <v-text-field v-model="email" :class="{ 'error--text': emailError }" :rules="emailRules"
                  @keypress="removeSpace($event)" @input="checkEmailI" placeholder="example@email.com" required outlined>
                  <template v-slot:append>

                    <v-progress-circular v-if="getEmailLoading" indeterminate :size="20" :width="2"
                      color="
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      #0D1139"
                      :value="80"></v-progress-circular>
                  </template>
                </v-text-field>
                <div class=" email-error-text text-left" v-if="emailError && !getInvitedSupplierEmailExists">
                  Email already exists! Please try a different one.
                </div>
                <div class=" email-error-text text-left" v-if="getInvitedSupplierEmailExists">
                  Supplier is pending registration and cannot be invited at this time.
                </div>

                <v-btn :loading="loadingInvite"
                  :disabled="!valid || !getPhoneInfo.valid || getEmailLoading || emailError || loadingInvite"
                  color="#0D9648" class="mr-4 text-capitalize white--text font-weight-bold" @click="validateS" large
                  height="50px" min-width="220px">
                  Send Invite
                </v-btn> 
              </v-form>
            </v-card-text>
          </v-card>
        </v-dialog>
  </v-row>
</template>
<script>
import * as Sentry from '@sentry/vue';
import { mapGetters, mapActions,mapState } from 'vuex';
import EditSupplierSection from '../../components/BidTabs/SupplierSection.vue';
import EditTeamMembers from '../../components/BidTabs/TeamMembers.vue';
import EditBidLines from '../../components/BidTabs/BidLines.vue';
import EditAttachment from '../../components/BidTabs/Attachment.vue';
import EditBidDetails from '../../components/BidTabs/BidDetails.vue';
import EditQuestionSection2 from '../../components/BidTabs/QuestionSection2.vue';
import VuePhoneNumberInput from 'vue-phone-number-input';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';

export default {
  name: 'NotCompleted',
  components: {
    EditSupplierSection,
    EditTeamMembers,
    EditBidLines,
    EditAttachment,
    EditBidDetails,
    EditQuestionSection2,
    VuePhoneNumberInput
  },

  data() {
    return {
      users: '',
      currentItem: 'tab-1',
      tabs: [
        { text: 'Bid Detail', icon: 'mdi-information-outline', value: 1 },
        {
          text: 'Supplier Invitation',
          icon: 'mdi-information-outline',
          value: 2,
        },
        { text: 'Team Members', icon: 'mdi-information-outline', value: 3 },
        { text: 'Line Items', icon: 'mdi-information-outline', value: 4 },
        { text: 'Attachment', icon: 'mdi-information-outline', value: 5 },
        { text: 'Questions', icon: 'mdi-information-outline', value: 6 },
      ],

      availableSearch: ['All', 'Company'],
      availableSuppl: null,
      inviteTeam: null,
      subCompany: false,
      switch1: true,
      ex4: '',
      validate: '',
      value: '',
      bidTitle: '',
      supplierValid: '',
      supplierValue: '',
      teamValid: '',
      teamValue: '',
      itemsValid: '',
      itemsValue: '',
      attachValid: '',
      attachValue: '',
      questionValid: '',
      questionValue: '',
      saveLoading: false,
      supplierDialog: false,
      valid: false,
      firstName: '',
      lastName: '',
      nameRules: [
        (v) => !!v || 'Name is required',
      ],
      company: '',
      companyRules: [
        (v) => !!v || 'Company name is required',
      ],
      email: '',
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => {
          v = v && v.replace(/\s+/g, '');
          return /^[\w.+-]+@(?!.*_{1})[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{1,63}$/.test(v) || 'E-mail must be valid';
        },
      ],
      phoneNumber: '',
      results: {},
      counter: 0,
      phoneInfo: {
        valid: true,
        message: '',
      },
      emailLoading: false,
      translations: {
        countrySelectorLabel: 'Country Code',
        countrySelectorError: 'Choose country',
        phoneNumberLabel: 'Phone Number',
        example: 'Example',
      },
      newRepsInvited: []
    };
  },
  computed: {
    ...mapGetters(['lineItemsComplete', 'bidDetailsComplete','isEditBidChanges','loadingInvite']),
    showSideBar() {
      return this.$store.getters.g_sideBarOpen;
    },
    activityPanel() {
      return this.$store.getters.g_activityPanel;
    },
    userDatas() {
      return this.$store.getters.userInfo;
    },
    passRule1() {
      return this.$store.getters.validate;
    },
    draftTime() {
      return this.$store.getters.draftTime;
    },
    enableTabs() {
      if (!this.$store.getters.draftBidsList) {
        return true;
      }
      return false;
    },
    loading(){
     return this.$store.getters.pageLoader;
    }, 
    getPhoneInfo() {
      return this.phoneInfo;
    },
    getCounter() {
      return this.counter;
    },
    getEmailLoading() {
      return this.emailLoading;
    },
    emailMessage() {
      return this.$store.getters.emailExists;
    },
    emailError() {
      if (this.emailMessage) {
        return true;
      }
      return false;
    },
    getInvitedSupplierEmailExists() {
      return this.$store.getters.invitedSupplierEmailExists;
    },
  },
  methods: {
    ...mapActions(["updateBid","getUpdateBid","publishUpdateBid",'inviteNewSupplier','checkEmail']),
    ...mapState(["invitedSuppliers"]),
    ChangeT(tab) {
      this.currentItem = tab;
    },
    validateValue(event) {
      if (event.type === 'L') {
        this.itemsValid = event.valid;
        this.itemsValue = event.items;
      } else {
        this.validate = event.valid;
        this.value = event.value;
        this.bidTitle = event.bidTitle;
      }
    },
    validateSupplier(event) {
      this.supplierValid = event.valid;
      this.supplierValue = event.supplier;
    },
    validateTeam(event) {
      this.teamValid = event.valid;
      this.teamValue = event.team;
    },
    validateItems(event) {
      this.itemsValid = event.valid;
      this.itemsValue = event.items;
    },
    validateAttachment(event) {
     
      this.attachValid = event.valid;
      this.attachValue = event.attach;
    },
    async publishBid() {
      this.saveLoading = true;
      try {
        await this.publishUpdateBid({serial:this.$route.params.serial});
        this.$router.push(`/view-bids/${this.$route.params.serial}`);
        this.$store.commit('setDraftBidsList', null);
        
      } catch (error) {
        Sentry.captureException(error);
        console.log(error);
      }
      this.saveLoading = false;
    },
    async updateDraft(){
			if(this.isEditBidChanges == true){
        await this.updateBid({'supplier': this.$store.state.bid.invitedSuppliers});
      }
    },
     onUpdate(payload) {
      this.counter++;
      this.phoneInfo.valid = payload.isValid;

      if (!payload) {
        this.phoneInfo.message = 'Phone number is required';
      } else if (payload.phoneNumber && payload.phoneNumber !== '' && payload.phoneNumber.length >= 1) {
        if (!payload.isValid) {
          this.phoneInfo.message = 'Invalid Phone number format';
        }

        if (payload.formattedNumber && payload.isValid) {
          this.phoneNumber = payload.formattedNumber;
          this.results = payload.formattedNumber;
        }
      } else {
        this.phoneInfo.message = 'Phone number is required';
      }
    },
    async validateS() {
      if (this.results === '' && this.results === undefined) {
        this.counter += 2;
        this.phoneInfo = {
          valid: false,
          message: 'Phone number is required',
        };
      }

      const supplier = {
        firstName: this.firstName,
        lastName: this.lastName,
        company: this.company,
        phoneNumber: this.results,
        email: this.email,
        bidTitle: this.$store.getters.bidData.title,
        bidType: this.$store.getters.bidData.type,
        bidDueDate: this.$store.getters.bidData.dueDate,
        bidDueTime: this.$store.getters.bidData.dueTime,
        serial: this.$store.getters.bidData.serial,
      };

      if (this.$refs.form.validate() && this.getPhoneInfo.valid && !this.emailError && !this.getInvitedSupplierEmailExists) {
        const user = await this.inviteNewSupplier(supplier);

        if (user && user._id) {
          this.newRepsInvited = user;
          this.$refs.form.reset();
          this.phoneNumber = '';
          this.phoneInfo = {
            valid: true,
            message: '',
          };
          this.counter = 0;
          this.valid = false;
          this.results = '';
          this.supplierDialog = false;
        } else if (user !== '' && typeof user === 'string') {
          this.$toasted.show(
            user,
            {
              class: 'error-toast',
              type: 'error',
              duration: 5000,
              position: 'top-center',
            },
          );
        } else {
          this.$toasted.show(
            'Error! Something went wrong. Please try again',
            {
              class: 'error-toast',
              type: 'error',
              duration: 5000,
              position: 'top-center',
            },
          );
        }
      }
    },
    async checkEmailI() {
      this.email = this.email && this.email.replace(/\s+/g, '');
      const testEmail = /^[\w.+-]+@(?!.*_{1})[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{1,63}$/.test(this.email);

      if (this.email === '' || !testEmail) {
        this.$store.commit('setEmailExistSuccess', false);
        this.$store.commit('setInvitedSupplierEmailExists', false);
      }

      if (testEmail) {
        this.emailLoading = true;
        await this.checkEmail(this.email);
        this.emailLoading = false;
      }
    },
    onBlurS() {
      if (this.phoneNumber === '') {
        this.phoneInfo.message = 'Phone number is required';
        this.phoneInfo.valid = false;
        this.counter++;
      } else if (this.phoneNumber !== null && this.phoneNumber.length === 1) {
        this.phoneInfo.message = 'Invalid Phone number format';
        this.phoneInfo.valid = false;
        this.counter++;
      }
    },
    removeSpace(event) {
      const charCode = event.keyCode;

      if (charCode === 32) {
        event.preventDefault();
      } else {
        return true;
      }
    },
  },
  async created(){
    await this.getUpdateBid({id: this.$store.getters.userInfo._id, serial:this.$route.params.serial, company: this.$store.getters.userInfo.company})
  },
  mounted() {
    document.title = 'Edit Bid - BidOut';
    this.users = this.userDatas;
    this.$store.commit('setIsEditBidChanges',false);
  },
};
</script>
<style scoped lang="scss">
</style>
