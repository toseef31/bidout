<template>
  <div>
    <v-form ref="contactForm">
      <v-container class="pa-sm-10 pa-4">
        <v-row>
          <v-col cols="12" sm="12">
            <label class="d-block text-left main-label mb-4">Account Contacts</label>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6" text="left">
            <label class="d-block text-left input-label mb-2">Name</label>
            <v-text-field placeholder="Full name ..." v-model="contactName" single-line outlined
              hide-details></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" text="left">
            <label class="d-block text-left input-label mb-2">Role</label>
            <v-text-field placeholder="Role ..." v-model="contactRole" single-line hide-details outlined></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6" text="left">
            <label class="d-block text-left input-label mb-2">Email</label>
            <v-text-field placeholder="Enter Email ..." v-model="contactEmail" single-line outlined type="email"
              :rules="contactEmailRule" required></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" text="left">

            <div>
              <label class="d-block text-left input-label mb-2 "
                :class="{ 'space-error-class': getPhoneInfo.valid && getCounter >= 1 || getPhoneInfo.valid && getCounter === 0, 'space-class': !getPhoneInfo.valid }">Phone
                Number</label>

              <VuePhoneNumberInput @phone-number-blur="onBlurB" default-country-code="US" :required="true" clearable
                :error="!getPhoneInfo.valid && getCounter >= 1" :border-radius="8" size="lg" v-model="contactPhoneNo"
                error-color="#FF0000" valid-color="#9E9E9E" :translations="translations" class="mb-2"
                @update="onUpdate" />
              <div class="phone-class" v-show="!getPhoneInfo.valid && getCounter >= 1">
                {{ getPhoneInfo.message }}</div>
            </div>

          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12">
            <v-btn color="#0D9648" large class="text-capitalize white--text" width="176px" height="54px"
              :loading="loading" :disabled="!valid || !getPhoneInfo.valid || getContactLoading" @click="addContacts">
              <v-progress-circular v-if="getContactLoading" indeterminate :width="3" size="25"
                color="#b8b8b8"></v-progress-circular>
              <div v-else>Add</div>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <v-container class="pa-sm-10 pa-4">
      <div class="contact-list text-left mt-5 align-center" v-for="(contact, index) in companyData.accountContacts"
        :key="index">
        <div class="profile-list">
          <h6>{{ contact.name }}</h6>
        </div>
        <div class="profile-list">
          <h6>{{ contact.position }}</h6>
        </div>
        <div class="profile-list">
          <h6>{{ contact.email }}</h6>
        </div>
        <div class="profile-list">
          <h6>{{ contact.phoneNumber }}</h6>
        </div>
        <div class="profile-list text-right">
          <v-btn default color="transparent" class="text-capitalize dele-btn"
            @click="deleteContact(index)"><v-icon>mdi-close</v-icon>Delete</v-btn>
        </div>
      </div>
    </v-container>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import VuePhoneNumberInput from 'vue-phone-number-input';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';

export default {
  components: {
    VuePhoneNumberInput,
  },
  data() {
    return {
      contactName: '',
      contactEmail: '',
      contactEmailRule: [
        (v) => !!v || 'E-mail is required',
        (v) => /^[\w.+-]+@(?!.*_{1})[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{1,63}$/.test(v) || 'E-mail must be valid',
      ],
      contactRole: '',
      contactPhoneNo: '',
      accountContacts: [],
      results: {},
      contactLoading: false,
      valid: false,
      loading: false,
      deleteAccount: false,
      counter: 0,
      phoneInfo: {
        valid: true,
        message: '',
      },
      toggleError: false,
      translations: {
        countrySelectorLabel: 'Country Code',
        countrySelectorError: 'Choose country',
        phoneNumberLabel: 'Phone Number',
        example: 'Example',
      },
    };
  },
  watch: {
    contactName() {
      if (this.contactName.length > 0 && this.contactEmail.length > 0 && this.contactRole.length > 0) {
        this.valid = true;
      } else {
        this.valid = false;
      }
    },
    contactEmail() {
      if (this.contactName.length > 0 && this.contactEmail.length > 0 && this.contactRole.length > 0) {
        this.valid = true;
      } else {
        this.valid = false;
      }
    },
    contactRole() {
      if (this.contactName.length > 0 && this.contactEmail.length > 0 && this.contactRole.length > 0) {
        this.valid = true;
      } else {
        this.valid = false;
      }
    },
  },
  computed: {
    ...mapGetters(['keyfactsLoading']),
    companyData() {
      return this.$store.getters.companyData.companyData;
    },
    getPhoneInfo() {
      return this.phoneInfo;
    },
    getCounter() {
      return this.counter;
    },
    getContactLoading() {
      return this.contactLoading;
    },
  },
  methods: {
    ...mapActions(['addCompanyContacts']),
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
          this.phoneInfo.message = '';
          this.results = payload.formattedNumber;
          this.contactPhoneNo = payload.formattedNumber;
        }
      } else {
        this.phoneInfo.message = 'Phone number is required';
      }
    },
    onBlurB() {
      if (this.contactPhoneNo === '') {
        this.phoneInfo.message = 'Phone number is required';
        this.phoneInfo.valid = false;
        this.counter++;
      } else if (this.contactPhoneNo !== null && this.contactPhoneNo.length === 1) {
        this.phoneInfo.message = 'Invalid Phone number format';
        this.phoneInfo.valid = false;
        this.counter++;
      }
    },
    async addContacts() {
      this.contactLoading = true;
      if (this.$refs.contactForm.validate() && this.getPhoneInfo.valid) {
        if (this.$store.getters.companyData.companyData.accountContacts) {
          this.accountContacts = this.$store.getters.companyData.companyData.accountContacts;
        }
        const data = {
          name: this.contactName,
          email: this.contactEmail,
          position: this.contactRole,
          phoneNumber: this.results,
        };
        this.accountContacts.push(data);

        await this.addCompanyContacts({ companyId: this.$store.getters.userInfo.company._id, accountContacts: this.accountContacts });
      }
      this.contactLoading = false;
      this.$refs.contactForm.reset();
      this.contactName = '';
      this.contactEmail = '';
      this.contactRole = '';
      this.contactPhoneNo = '';
      this.results = '';
      this.phoneInfo.message = '';
      this.phoneInfo.valid = true;
      this.counter = 0;
    },
    deleteContact(index) {
      if (this.$store.getters.companyData.companyData.accountContacts) {
        this.accountContacts = this.$store.getters.companyData.companyData.accountContacts;
      }
      this.deleteAccount = true;
      this.accountContacts.splice(index, 1);
      this.addCompanyContacts({ companyId: this.$store.getters.userInfo.company._id, accountContacts: this.accountContacts });
      this.deleteAccount = false;
    },
  },
  mounted() {
    
  },
};
</script>
