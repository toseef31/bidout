<template>
  <v-row class="addUsers-module pa-0 ma-0">
    <v-col class="pa-0 pr-sm-3" :class="[ showSideBar ? 'col-md-12 col-12 col-sm-12' : 'mid-content-collapse', activityPanel ? 'd-sm-block' : 'd-md-block']" v-show="!activityPanel">
      <div class="mid-content">
        <div class="content-section">
          <v-row class="mx-0">
            <v-col cols="12" sm="12" md="12" class="d-sm-block">
              <div class="manage-sections pa-4 pa-sm-16">
                <div class="top-section d-flex">
                  <h4>Add Users</h4>
                </div>
                <div class="addUser-form mt-16">
                  <v-form
                    ref="form"
                    v-model="valid"
                    lazy-validation
                  >
                    <label class="d-block text-left font-weight-bold mb-2">First Name</label>
                    <v-text-field
                      v-model="firstName"
                      :rules="nameRules"
                      placeholder="First Name"
                      required
                      outlined
                    ></v-text-field>
                    <label class="d-block text-left font-weight-bold mb-2">Last Name</label>
                    <v-text-field
                      v-model="lastName"
                      :rules="nameRules"
                      placeholder="Last Name"
                      required
                      outlined
                    ></v-text-field>
                    <label class="d-block text-left font-weight-bold mb-2">Email Address</label>
                    <v-text-field
                      v-model="email"
                      :rules="emailRules"
                      placeholder="Example@email.com"
                      required
                      outlined
                    ></v-text-field>
                    <label class="d-block text-left input-label mb-2 font-weight-bold">Mobile Number
                    </label>

                    <VuePhoneNumberInput @phone-number-blur="onBlurB" default-country-code="US" :required="true"
                      clearable :error="!getPhoneInfo.valid && getCounter >= 1" :border-radius="8" size="lg"
                      v-model="mobileNumber" error-color="#FF0000" valid-color="#9E9E9E"
                      :translations="translations" class="mb-5" @update="onUpdate" />

                    <div class="phone-class" v-if="!getPhoneInfo.valid && getCounter >= 1">
                      {{ getPhoneInfo.message }}</div>
                    <label class="d-block text-left font-weight-bold mb-2">Privileges
                      <v-tooltip right>
                        <template v-slot:activator="{ on, attrs }">
                          <v-icon small 
                            v-bind="attrs"
                            v-on="on">mdi-information-outline</v-icon>
                        </template>
                        <span>Add user privileges</span>
                      </v-tooltip>
                    </label>
                    <v-select
                      v-model="select"
                      :items="items"
                      :rules="[v => !!v || 'Privileges is required']"
                      placeholder="Select"
                      item-text="label" item-value="value"
                      required
                      outlined
                      solo-flat class="text-capitalize"
                    ></v-select>

                    <v-btn
                      :disabled="profileLoading || !getPhoneInfo.valid || !valid"
                      :loading="profileLoading"
                      color="#0D9648"
                      class="mr-4 text-capitalize white--text font-weight-bold"
                      @click="validate"
                      large
                      height="50px"
                      min-width="220px"
                    >
                      Invite User
                    </v-btn>
                  </v-form>
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
import 'vue-phone-number-input/dist/vue-phone-number-input.css';
import Navbar from '../components/Layout/Navbar.vue';
import LeftSidebar from '../components/Layout/Dashboard/LeftSidebar.vue';
import RightSidebar from '../components/Layout/Dashboard/RightSidebar.vue';

export default {
  name: 'ManageUsers',
  components: {
    Navbar,
    LeftSidebar,
    RightSidebar,
    VuePhoneNumberInput,
  },
  data() {
    return {
      isHidden: false,
      valid: true,
      firstName: '',
      lastName: '',
      nameRules: [
        (v) => !!v || 'Name is required',
      ],
      email: '',
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /^[\w.+-]+@(?!.*_{1})[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{1,63}$/.test(v) || 'E-mail must be valid',
      ],
      select: null,
      items: [
        { value: 'admin', label: 'Administrator' },
        { value: 'user', label: 'User' },
      ],
      user: '',
      mobileNumber: '',
      translations: {
        countrySelectorLabel: 'Country Code',
        countrySelectorError: 'Choose country',
        phoneNumberLabel: 'Phone Number',
        example: 'Example',
      },
      results: {},
      phoneInfo: {
        valid: false,
        message: '',
      },
      counter: 0,
    };
  },
  computed: {
    ...mapGetters(['profileLoading', 'inviteMessage']),
    showSideBar() {
      return this.$store.getters.g_sideBarOpen;
    },
    activityPanel() {
      return this.$store.getters.g_activityPanel;
    },
    getPhoneInfo() {
      return this.phoneInfo;
    },
    getCounter() {
      return this.counter;
    },
  },
  watch: {
    inviteMessage(value) {
      if (value) {
        this.$toasted.show(value, {
          position: 'top-center',
          duration: 3000,
          className: 'error-toast',
          type: 'error',
        });
        this.valid = true;
      }
    },
  },
  methods: {
    ...mapActions(['inviteUser']),
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
          this.mobileNumber = payload.formattedNumber;
        }
      } else {
        this.phoneInfo.message = 'Phone number is required';
      }
    },
    onBlurB() {
      if (this.mobileNumber === '') {
        this.phoneInfo.message = 'Phone number is required';
        this.phoneInfo.valid = false;
        this.counter++;
      } else if (this.mobileNumber !== null && this.mobileNumber.length === 1) {
        this.phoneInfo.message = 'Invalid Phone number format';
        this.phoneInfo.valid = false;
        this.counter++;
      }
    },
    validate() {
      if (this.results === '' && this.results === undefined) {
        this.counter += 2;
        this.phoneInfo = {
          valid: false,
          message: 'Phone number is required',
        };
      }
      if (this.$refs.form.validate() && this.getPhoneInfo.valid) {
        const data = {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          role: this.select,
          company: this.user.company.companyName,
          companyId: this.user.company,
          parent: this.user._id,
          phoneNumber: this.results,
        }
        this.inviteUser(data);
        this.btnLoading = true;
      };
    },
  },
  mounted() {
    document.title = 'Add Users - BidOut';
    this.user = this.$store.getters.userInfo;
  },
};
</script>
<style scoped lang="scss">

</style>
