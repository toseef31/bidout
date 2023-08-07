<template>
  <v-col class="my-7 bid-detail-tab pa-0" align="start">
    <div class="bid-row pb-5">
      <div class="px-5">
        <div class="title-detail">Bid Details</div>
        <br />

        <div class="title-desc">
          <div><span>Bid Title:</span> {{ bidDetail.bidData.title }}</div>
          <div><span>Bid Type:</span> {{ bidDetail.bidData.type }}</div>
          <div>
            <span>Due Date/Time:</span> {{ formatDate(bidDetail.bidData.dueDate) }} @
            {{ bidDetail.bidData.dueTime }} CST <v-btn @click="changeDate" icon
              v-if="bidDetail.receivingBids && !isBidOut"><v-icon color="black"
                size="20">mdi-square-edit-outline</v-icon></v-btn>
          </div>
          <div><span>Region:</span> {{ bidDetail.bidData.region }}</div>
          <div>
            <span>Q&A:</span>
            {{ bidDetail.bidData.qAndAEnabled === true ? "Yes" : "No" }}
          </div>
        </div>
        <br />

        <p class="bid-desc">
          <span>Description:</span>
          <span class="pl-2 font-weight-regular ql-editor pa-0" v-html="bidDetail.bidData.bidDescriptions &&
            Array.isArray(bidDetail.bidData.bidDescriptions)
            ? bidDetail.bidData.bidDescriptions[0].body
            : bidDetail.bidData.bidDescriptions"></span>
        </p>
        <br>

        <div class="bid-headline"
          v-if="bidDetail.bidData && bidDetail.bidData.bidDescriptions && Array.isArray(bidDetail.bidData.bidDescriptions)"
          v-for="(item, index) in bidDetail.bidData.bidDescriptions.slice(1)" :key="index">
          <span class="additional-title">{{ item && item.title }}:</span>
          <div class="font-weight-regular ql-editor pa-0" v-html="item && item.body"></div>
          <br>
        </div>
      </div>
    </div>

    <div class="px-5 pt-8 bid-row-2">
      <div class="title-detail">Invited Suppliers</div>

      <div v-if="getAllInvitedSuppliers && getAllInvitedSuppliers.length
        ">
        <div class="d-flex bid-section-2" v-for="(item, i) in getAllInvitedSuppliers" :key="i">
          <div class="d-flex align-center">
            <v-img v-if="item && item.image" max-height="26.67" max-width="100" width="100"
              :src="item && item.image"></v-img>

            <div v-else class="icon-class">
              <v-icon size="40">mdi-domain</v-icon>
            </div>
            <div class="ml-5">
              <div class="font-weight-bold">{{ item && item.companyName ? item.companyName : item.company }}
                <span v-if="hasOfsPremium(item)">
                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon color="#0D9647" size="16px" v-bind="attrs" v-on="on">mdi-check-decagram</v-icon>
                    </template>
                    <span>Premium Service Provider</span>
                  </v-tooltip>
                </span>
              </div>
              <router-link v-if="item.slug" :to="item.slug ? '/company/' + item.slug : ''"
                class="text-decoration-underline text-body-2 profile">View profile</router-link>
            </div>
          </div>

          <div class="invitedS-sec">
            <v-row>
              <v-col class="mr-10">
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-badge color="#0D9648" dot overlap v-if="checkActiveSupplier(item._id)">
                      <v-icon v-bind="attrs" v-on="on">mdi-domain</v-icon>
                    </v-badge>
                  </template>
                  <span>Active</span>
                </v-tooltip>

                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-badge color="#D5D91C" dot overlap v-if="checkInActiveSupplier(item._id)">
                      <v-icon v-bind="attrs" v-on="on">mdi-domain</v-icon>
                    </v-badge>
                  </template>
                  <span>Pending Registration</span>
                </v-tooltip>

              </v-col>

              <v-col class="mr-10" v-if="isEligible">
                <v-tooltip top v-if="checkNDASigned(item._id)">
                  <template v-slot:activator="{ on, attrs }">
                    <v-badge color="#0D9648" dot overlap >
                      <v-icon v-bind="attrs" v-on="on">mdi-file-sign</v-icon>
                    </v-badge>
                  </template>
                  <span>NDA Signed</span>
                </v-tooltip>

                <v-tooltip top v-if="!checkNDASigned(item._id)">
                  <template v-slot:activator="{ on, attrs }">
                    <v-badge color="#D5D91C" dot overlap >
                      <v-icon v-bind="attrs" v-on="on">mdi-file-sign</v-icon>
                    </v-badge>
                  </template>
                  <span>NDA not Signed</span>
                </v-tooltip>

              </v-col>
              <v-col class="mr-10">
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon v-bind="attrs" v-on="on">mdi-eye-outline</v-icon>
                  </template>
                  <span>Viewed {{ getBidViewNumber(item._id) }} Times</span>
                </v-tooltip>
              </v-col>
              <v-col class="mr-10">

                <v-tooltip top v-if="getCompanyIntend(item._id) === 'intended'">
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon v-bind="attrs" v-on="on" color="#0D9648">mdi-check-circle-outline</v-icon>

                  </template>

                  <span>{{ item && item.companyName ? item.companyName :
                    item.company }} does intend to submit
                    a
                    bid</span>

                </v-tooltip>

                <v-tooltip top v-if="getCompanyIntend(item._id) === 'not-intended'">
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon v-bind="attrs" v-on="on" color="#F32349">mdi-close-circle-outline</v-icon>
                  </template>

                  <span>{{ item && item.companyName ?
                    item.companyName : item.company }} does not intend to
                    submit a bid</span>

                </v-tooltip>

                <v-tooltip top v-if="getCompanyIntend(item._id) === 'neither'">
                  <template v-slot:activator="{ on, attrs }">

                    <v-icon v-bind="attrs" v-on="on">mdi-circle-outline</v-icon>
                  </template>

                  <span>{{ item && item.companyName ? item.companyName :
                    item.company }} has not indicated if
                    they intend to submit a bid</span>

                </v-tooltip>

              </v-col>
              <v-col>
                <v-tooltip top
                  v-if="getSubmissionStatus(item._id) === 'not-sent' && getCompanyIntend(item._id) !== 'not-intended'">
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon v-bind="attrs" v-on="on">mdi-circle-outline</v-icon>
                  </template>
                  <span>{{
                    item
                    && item.companyName ? item.companyName : item.company }} has not sent Bid Submissions yet</span>
                </v-tooltip>

                <span v-if="getSubmissionStatus(item._id) === 'sent' && getCompanyIntend(item._id) === 'intended'">
                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      <img :src="require('@/assets/images/bids/bidSubmitted.svg')" width="24" height="24" v-bind="attrs"
                        v-on="on" />

                    </template>
                    <span>{{
                      item
                      && item.companyName ? item.companyName : item.company }} has sent Bid Submissions</span>

                  </v-tooltip>
                </span>
                <div
                  v-if="getCompanyIntend(item._id) === 'not-intended' || getSubmissionStatus(item._id) === 'sent' && getCompanyIntend(item._id) === 'not-intended'">
                  <v-tooltip top
                    v-if="getCompanyIntend(item._id) === 'not-intended' || getSubmissionStatus(item._id) === 'sent' && getCompanyIntend(item._id) === 'not-intended'">
                    <template v-slot:activator="{ on, attrs }">

                      <v-icon v-bind="attrs" v-on="on" color="#F32349">mdi-close-circle-outline</v-icon>
                    </template>

                    <span>{{
                      item && item.companyName ?
                      item.companyName : item.company }} will not be submitting a bid</span>
                  </v-tooltip>
                </div>
              </v-col>

            </v-row>
          </div>
        </div>

      </div>
      <div v-else class="no-data pt-3 pb-6">None</div>

      <div class="text-center my-8" v-if="!toggleSupplier && bidDetail.receivingBids && !isBidOut"><v-btn
          color="rgba(13, 150, 72, 0.1)" elevation="0" @click="toggleSupplier = true" height="32px" width="220px" large
          class="text-capitalize invited-btn py-2 px-4">
          <v-icon class="mr-1">mdi-plus</v-icon>
          Add Additional Suppliers </v-btn>
      </div>

      <div class="new-supplier-class mx-5 mb-5 mt-16" v-if="toggleSupplier">
        <div class="d-flex justify-space-between align-center">
          <div class="additional-title mb-4">Add Additional Suppliers</div>

          <v-btn icon @click="toggleSupplier = false">
            <v-icon size="30" color="#F32349
                                                                                      ">mdi-close</v-icon>
          </v-btn>
        </div>
        <AddSupplier @toggle-dialog="(el) => supplierDialog = el" :data="newRepsInvited">
        </AddSupplier>
        <v-dialog v-model="supplierDialog" width="800">

          <v-card class="inviteSupplier-dialog">
            <v-card-title class="text-h5 justify-end">
              <v-icon @click=" supplierDialog = false" color="#0D1139"> mdi-close</v-icon>
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

                <VuePhoneNumberInput @phone-number-blur="onBlurS" default-country-code="US" :border-radius="0" size="lg"
                  :required="true" clearable :error="!getPhoneInfo.valid && getCounter >= 1" v-model="phoneNumber"
                  error-color="#FF0000" valid-color="#9E9E9E" :translations="translations" class="mb-2"
                  @update="onUpdate" />
                <div class="phone-class" v-if="!getPhoneInfo.valid && getCounter >= 1">
                  {{ getPhoneInfo.message }}</div>
                <label class="d-block text-left font-weight-bold mb-2 " :class="{
                  ' mt-2': !getPhoneInfo.valid && getCounter >= 1,
                  'mt-6': getPhoneInfo.valid
                }">Email<span class="required-class">*</span></label>
                <v-text-field v-model="email" :rules="emailRules" @input="checkEmailI" @keypress="removeSpace($event)"
                  placeholder="example@email.com" required outlined :class="{ 'error--text': emailError }">
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
                  :disabled="!valid || !getPhoneInfo.valid || getEmailLoading || emailError || getInvitedSupplierEmailExists"
                  color="#0D9648" class="mr-4 text-capitalize white--text font-weight-bold" @click="validate" large
                  height="50px" min-width="220px">
                  Send Invite
                </v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-dialog>

      </div>
    </div>

    <div class="px-5 pt-8 pb-10 bid-row-2">
      <div class="title-detail">Team member</div>
      <div class="mt-10 d-flex flex-row flex-wrap team-member">

        <div class="d-flex align-center flex-child">
          <v-img v-if="bidDetail.bidData.user.image" max-width="100" height="auto" contain :aspect-ratio="16 / 9"
            :src="bidDetail.bidData.user.image"></v-img>
          <v-avatar v-else color="#0d96481a" size="62">
            <v-icon color="#0d9648" large>mdi-account-outline </v-icon>
          </v-avatar>
          <span v-if="bidDetail.bidData.user.image" class="text--black pr-4  bid-creator">{{
            bidDetail.bidData.user.firstName }} {{
    bidDetail.bidData.user.lastName
  }}</span>

          <span v-else class="text--black px-4  bid-creator">{{ bidDetail.bidData.user.firstName }} {{
            bidDetail.bidData.user.lastName
          }}</span>
          <span class="bid-creator-title">Bid Creator</span>
        </div>

        <div v-if="bidDetail.bidData && bidDetail.bidData.invitedTeamMembers &&
            bidDetail.bidData.invitedTeamMembers.length > 0
            " v-for="(item, index) in bidDetail.bidData.invitedTeamMembers" :key="index"
          class="d-flex align-center flex-child">
          <v-img v-if="item.image" max-width="100" height="auto" contain :aspect-ratio="16 / 9" :src="item.image"></v-img>
          <v-avatar v-else color="#0d96481a" size="62" class="ml-5">
            <v-icon color="#0d9648" large>mdi-account-outline </v-icon>
          </v-avatar>
          <span class="text--black px-5 bid-creator">{{ item && item.firstName }} {{ item && item.lastName }}</span>
        </div>
      </div>

      <div class="text-center my-8" v-if="!toggleTeam && bidDetail.receivingBids && !isBidOut"><v-btn
          color="rgba(13, 150, 72, 0.1)" elevation="0" @click="openTeam" height="32px" width="250px" large
          class="text-capitalize invited-btn py-2 px-4">
          <v-icon class="mr-1">mdi-plus</v-icon>
          Add Additional Team member </v-btn>
      </div>

      <div class="new-supplier-class mx-5 mb-5 mt-16" v-if="toggleTeam">
        <div class="d-flex justify-space-between align-center">
          <div class="additional-title mb-4">Add Additional Team members</div>

          <v-btn icon @click="toggleTeam = false">
            <v-icon size="30" color="#F32349
                                                                                      ">mdi-close</v-icon>
          </v-btn>
        </div>
        <AddTeamMember />
      </div>
    </div>

    <div class="pt-8 pb-10 bid-row-2">
      <div class="title-detail px-6">Line items</div>

      <v-simple-table class="template-table-style mt-8" v-if="bidDetail.bidData &&
        bidDetail.bidData.lineItems &&
        bidDetail.bidData.lineItems.length > 0
        ">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Line Item Description</th>
              <th class="text-left">Unit/Measure</th>
              <th class="text-left">Input Type</th>
              <th class="text-left">QTY</th>
              <th class="text-left">Buyer Comment</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in bidDetail.bidData.lineItems" :key="index">
              <td class="text-left">{{ item.description }}</td>
              <td class="text-left">{{ item.unit }}</td>
              <td class="text-left">{{ item.inputType }}</td>
              <td class="text-left">{{ item.quantity }}</td>
              <td class="text-left">
                {{ item.buyerComment === 'undefined' || item.buyerComment === '' ? '' : item.buyerComment }}
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>

      <div v-else class="no-data">None</div>
    </div>

    <div class="py-8 bid-row-2">
      <div class="title-detail px-6">Attachments</div>
      <div class="attachment-list-style" v-if="bidDetail.bidData &&
        bidDetail.bidData.attachments &&
        bidDetail.bidData.attachments.length
        ">
        <v-simple-table fixed-header>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left"></th>
                <th class="text-left">File Name</th>
                <th class="text-left" width="250">Comment</th>
                <th class="text-left" width="110">File Size</th>
                <th class="text-left" width="150">Uploaded By</th>
                <th class="text-left" width="150">Uploaded Date</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(doc, index) in bidDetail.bidData.attachments" :key="index">
                <td class="text-left ">
                  <img :src="require('@/assets/images/bids/FilePdf.png')" v-if="checkFileType(doc.fileName) === 'pdf'" />
                  <img :src="require('@/assets/images/bids/FileDoc.png')"
                    v-else-if="checkFileType(doc.fileName) === 'docx' || checkFileType(doc.fileName) === 'doc'" />
                  <v-icon color="#0D1139"
                    v-else-if="checkFileType(doc.fileName) === 'xlsx' || checkFileType(doc.fileName) === 'xls'">mdi-microsoft-excel</v-icon>
                  <v-icon color="#0D1139" v-else>mdi-file-document</v-icon>
                </td>
                <td class="text-left doc-class "><a :href="doc.url" target="_blank" class="text-decoration-none">{{
                  doc.fileName
                }}</a></td>
                <td class="text-left text-truncate comment-class">
                  <span>{{ doc.comment !== 'undefined' ? doc.comment : '' }}</span>
                </td>
                <td class="text-left">{{ size(doc.fileSize) }}</td>
                <td class="text-left">{{ `${doc.uploadedBy.firstName} ${doc.uploadedBy.lastName}` }}</td>
                <td class="text-left">
                  {{ doc.uploadedAt | moment("MM/DD/YYYY") }}
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </div>

      <div v-else class="no-data">None</div>
    </div>

    <div class="pt-8 bid-row-3">
      <div class="question-section-title">
        <span class="title-detail px-6">Bid Questions</span>
      </div>
      <div class="question-sub-section"
        v-if="bidDetail.bidData && Array.isArray(bidDetail.bidData.questions) && bidDetail.bidData.questions.length">

        <div v-for="(item, index) in bidDetail.bidData.questions" :key="index">
          <v-divider color="#F1F1F1" v-if="item.type === 'category'"></v-divider>
          <div class="sub-section-title px-6 " v-if="item.type === 'category'">{{ item.title }}</div>

          <v-row class="mx-10 px-3 operational-ques py-1 my-2 " justify="space-between" align="center"
            v-if="item.type === 'question'">

            <v-col md="6" class="first-child" v-if="item.type === 'question'">{{
              item.title
            }}</v-col>

            <div class="second-child ml-auto" v-if="item.required === true">Required Question</div>

          </v-row>
        </div>
      </div>
      <div v-else class="no-data py-5">No questions are currently configured on this bid.</div>
    </div>
  </v-col>
</template>

<script>
import moment from 'moment-timezone';
import AddSupplier from '@/components/viewBid/addSupplier.vue';
import AddTeamMember from '@/components/viewBid/addTeamMember.vue';
import { mapActions, mapGetters } from 'vuex';
import VuePhoneNumberInput from 'vue-phone-number-input';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';

export default {
  data() {
    return {
      users: '',
      toggleSupplier: false,
      toggleTeam: false,
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
  components: {
    AddTeamMember,
    AddSupplier,
    VuePhoneNumberInput,
  },
  methods: {
    ...mapActions(['inviteNewSupplier', 'checkEmail']),
    openTeam() {
      this.toggleTeam = true;
    },
    size(size) {
      const sizeInMB = (size / (1024 * 1024)).toFixed(2);
      return `${sizeInMB}mb`;
    },
    checkFileType(file) {
      return file.substring(file.lastIndexOf('.') + 1);
    },
    getBidViewNumber(id) {
      const { supplierViews } = this.bidDetail.bidData;
      let number = 0;

      if (supplierViews && id) {
        supplierViews.forEach((el) => {
          if (el.supplier === id) {
            number = el.views;
          }
        });
      }
      return number;
    },
    getCompanyIntend(id) {
      let result = 'neither';
      const intent = this.getBidAllIntend;

      if (intent && id) {
        intent.forEach((el) => {
          if (el.company === id && el.answer === true) {
            result = 'intended';
          }
          if (el.company === id && el.answer === false) {
            result = 'not-intended';
          }
        });
      }
      return result;
    },
    getSubmissionStatus(id) {
      let result = 'not-sent';

      const { supplierSubmissions } = this.bidDetail;

      if (supplierSubmissions.length) {
        supplierSubmissions.forEach((el) => {
          if (el.company._id === id) {
            result = 'sent';
          }
        });
      }

      return result;
    },

    formatDate(dueDate) {
      return dueDate !== '' && dueDate !== null ? moment.tz(dueDate, 'America/Chicago').format('MM/DD/YYYY') : '';
    },
    checkActiveSupplier(id) {
      const { invitedSuppliers } = this.bidDetail.bidData;
      let active = false;
      if (invitedSuppliers.length) {
        invitedSuppliers.forEach((el) => {
          if (el && el._id === id) {
            active = true;
          }
        });
      }

      return active;
    },
    checkInActiveSupplier(id) {
      const { invitedNewSuppliers } = this.bidDetail.bidData;

      let inActive = false;
      if (invitedNewSuppliers.length) {
        invitedNewSuppliers.forEach((el) => {
          if (el && el._id === id) {
            inActive = true;
          }
        });
      }

      return inActive;
    },
    hasOfsPremium(supplier) {
      if (supplier.contracts) {
        return supplier.contracts.some((contract) => contract.contractType === 'ofs-premium');
      }
    },
    changeDate() {
      this.$router.push(`/update-dueDate/${this.$route.params.serial}`);
    },
    checkNDASigned(id) {
      const { signedNDAs } = this.bidDetail.bidData;
      let active = false;

      if (signedNDAs && signedNDAs.length) {
        signedNDAs.forEach((el) => {
          if (el && el.company === id) {
            active = true;
          }
        });
      }

      return active;
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
    async validate() {
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
        bidTitle: this.bidDetail.bidData.title,
        bidType: this.bidDetail.bidData.type,
        bidDueDate: this.bidDetail.bidData.dueDate,
        bidDueTime: this.bidDetail.bidData.dueTime,
        serial: this.bidDetail.bidData.serial,
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
  computed: {
    ...mapGetters(['loadingInvite']),
    bidDetail() {
      return this.$store.getters.bidViewData;
    },
    isBidOut() {
      if (this.bidDetail.bidData.type === 'BidOut Process' && this.bidDetail.bidout) {
        return true;
      }
      return false;
    },
    getBidAllIntend() {
      return this.$store.getters.bidAllIntend;
    },
    getAllInvitedSuppliers() {
      const { invitedNewSuppliers, invitedSuppliers } = this.bidDetail.bidData;

      if (this.bidDetail.bidData) {
        if ((invitedSuppliers && Array.isArray(invitedSuppliers) && invitedSuppliers.length > 0) && (invitedNewSuppliers && Array.isArray(invitedNewSuppliers) && invitedNewSuppliers.length > 0)) {
          return [...invitedSuppliers, ...invitedNewSuppliers];
        }
        if (invitedNewSuppliers && Array.isArray(invitedNewSuppliers) && invitedNewSuppliers.length > 0) {
          return invitedNewSuppliers;
        }
        if (invitedSuppliers && Array.isArray(invitedSuppliers) && invitedSuppliers.length > 0) {
          return invitedSuppliers;
        }

        return [];
      }
      return [];
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
    isEligible() {
      if (
        this.$store.getters.userInfo &&
        this.$store.getters.userInfo.company &&
        this.$store.getters.userInfo.company.contracts
      ) {
        return this.$store.getters.userInfo.company.contracts.find(
          (contract) =>
            contract.contractType === "rfx-enterprise"
        ) && this.bidDetail.bidData.requiresNDA
      }
      return false;
    }
  },
};
</script>
