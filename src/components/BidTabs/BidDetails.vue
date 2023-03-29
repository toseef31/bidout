<template>
  <v-row class="my-8" justify="center">
    <v-col cols="12" sm="9">
      <v-form @submit.prevent="bidForm" ref="form" v-model="valid" @input="fieldUpdate">
        <v-container>
          <v-row justify="center">
            <v-col cols="12" sm="12" text="left">
              <input type="hidden" name="" :value="validate">
              <label class="d-block text-left input-label mb-2 font-weight-bold">Bid Title</label>
              <v-text-field placeholder="Bid Title" v-model="title" single-line outlined type="text" :rules="titleRules">
              </v-text-field>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" sm="6" text="left">
              <label class="d-block text-left input-label mb-2 font-weight-bold">Bid Type
                <v-tooltip right>
                  <template v-slot:activator="{ on, attrs }">
                    <a href="https://help.bidout.app/article/8-bid-types-availeable-on-bidout" target="_blank"
                      class="text-decoration-none"><v-icon small v-bind="attrs"
                        v-on="on">mdi-information-outline</v-icon></a>
                  </template>
                  <span>More info on bid types</span>
                </v-tooltip>
              </label>
              <v-select outlined :items="type" v-model="bidType" :rules="bidTypeRules">

              </v-select>
            </v-col>
            <v-col cols="12" sm="6" text="left">
              <label class="d-block text-left input-label mb-2 font-weight-bold">Due Date </label>
              <v-text-field placeholder="Due Date" single-line outlined type="date" v-model="dueDate"
                :rules="dueDateRules" :min="new Date().toISOString().substr(0, 10)" append-icon="mdi-calendar">
              </v-text-field>

            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" sm="6" text="left">
              <label class="d-block text-left input-label mb-2 font-weight-bold">Due Time </label>
              <v-select outlined :items="time" item-text="label" item-value="value" v-model="dueTime"
                :rules="dueTimeRules">

              </v-select>
            </v-col>
            <v-col cols="12" sm="6" text="left">
              <label class="d-block text-left input-label mb-2 font-weight-bold">Region </label>
              <v-select outlined :items="region" v-model="bidRegions" :rules="bidRegionsRules">

              </v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6" text="left">
              <label class="d-block text-left input-label mb-2 font-weight-bold">Q&A
                <v-tooltip right>
                  <template v-slot:activator="{ on, attrs }">
                    <a href="https://help.bidout.app/article/9-bidout-question-and-answers" target="_blank"
                      class="text-decoration-none">
                      <v-icon small v-bind="attrs" v-on="on">mdi-information-outline</v-icon>
                    </a>
                  </template>
                  <span>More info on Q&A</span>
                </v-tooltip>
              </label>

              <v-radio-group row v-model="qAndAEnabled">
                <v-radio label="Yes" value="true" checked></v-radio>
                <v-radio label="No" value="false"></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>

          <v-row justify="center" v-for="(textField, i) in bidDescriptions" :key="i">
            <v-col cols="12" sm="12" text="left" v-if="i == 0">
              <label class="d-block text-left input-label mb-2 font-weight-bold">Bid Description</label>
              <v-textarea placeholder="Describe here..." single-line outlined type="text"
                v-model="bidDescriptions[0]['body']" :rules="descRules">
              </v-textarea>
            </v-col>
            <v-col cols="12" sm="12" text="left" v-else>
              <label class="d-block text-left input-label mb-2 font-weight-bold">Additional Information <v-icon
                  color="#F32349" @click="remove(i)">mdi-trash-can-outline</v-icon></label>
              <v-text-field placeholder="Title" single-line outlined type="text" v-model="bidDescriptions[i]['name']">
              </v-text-field>
              <v-textarea placeholder="Describe here" single-line outlined type="text" hide-details
                v-model="bidDescriptions[i]['body']">
              </v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="12" class="text-left">
              <v-btn color="rgba(13, 150, 72, 0.1)" rounded class="text-capitalize adtn-btn font-weight-bold"
                @click="add"><v-icon>mdi-plus</v-icon>Add Additional Description</v-btn>
            </v-col>
          </v-row>

          <v-row justify="center">
            <v-col cols="12">
              <v-btn color="#0D9648" height="56" class="text-capitalize white--text font-weight-bold save-btn px-9"
                :loading="saveBidLoading" :disabled="!valid" @click="changeTab" large>Save Changes</v-btn>
            </v-col>
          </v-row>
          <template v-if="route != 'EditTemplate'">
            <v-row justify="center" v-if="statusType == 'draftBid'">
              <v-col cols="12">
                <v-btn text class="text-capitalize font-weight-bold" @click="dialog = true" large>Delete Draft Bid
                  #{{ serial }}</v-btn>
              </v-col>
            </v-row>
          </template>

          <v-dialog v-model="dialog" width="500">
            <v-card>
              <v-card-title class="text-h5 grey lighten-2">
                Confirm
              </v-card-title>
              <v-card-text class="pt-5">
                Are you sure you want to delete?
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="#F32349" outlined @click="dialog = false">
                  Cancel
                </v-btn>
                <v-btn color="#0d9648" outlined @click="deleteDraft(); dialog = false">
                  Confirm
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-container>
      </v-form>
    </v-col>
  </v-row>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import moment from 'moment-timezone';

export default {
  data() {
    return {
      valid: true,
      titleRules: [
        (v) => !!v || 'Title is required',
      ],
      bidTypeRules: [
        (v) => !!v || 'Please select bid type',
      ],
      dueDateRules: [
        (v) => !!v || 'Due date is required',
        (v) => {
          const currentDate = moment.tz('America/Chicago');
          const momentDueDate = moment.tz(v, 'America/Chicago');

          if (moment(momentDueDate).isBefore(currentDate)) return 'Due Date cannot be today or in the past';

          return true;
        },
      ],
      dueTimeRules: [
        (v) => !!v || 'Please select due time',
      ],
      bidRegionsRules: [
        (v) => !!v || 'Please select region',
      ],
      descRules: [
        (v) => !!v || 'Description is required',
      ],
      showAdditional: false,
      type: ['RFP', 'RFI', 'BidOut Process'],
      time: [
        { label: '1pm CST', value: '1pm' },
        { label: '2pm CST', value: '2pm' },
        { label: '3pm CST', value: '3pm' },
        { label: '4pm CST', value: '4pm' },
      ],
      region: ['Gulf Coast', 'Northeast', 'Rockies', 'Mid-Con', 'Permian', 'Arklatex', 'Offshore', 'Other'],
      interval: '',
      bidFormData: '',
      formStatus: false,
      dialog: false,
      route: '',
      isTemplate: false,
      loading: false,
    };
  },
  computed: {
    ...mapGetters(['userInfo', 'saveBidLoading', 'isEditBidChanges']),
    singleTemplate() {
      return this.$store.getters.singleTemplate;
    },
    title: {
      get() {
        if (this.$store.getters.bidData != null) {
          return this.$store.getters.bidData.title;
        }
        return '';
      },
      set(value) {
        this.$store.commit('setBidTitle', value);
      },
    },
    bidType: {
      get() {
        if (!this.$store.getters.bidData.id) {
          return '';
        }
        return this.$store.getters.bidData.type;
      },
      set(value) {
        this.$store.commit('setBidType', value);
      },
    },
    dueDate: {
      get() {
        if (this.isTemplate) {
          let currentDate = moment.tz('America/Chicago');
          currentDate = currentDate.add(10, 'days');
          this.$store.commit('setBidDueDate', currentDate.format('YYYY-MM-DD'));

          return currentDate.format('YYYY-MM-DD');
        }
        if (!this.$store.getters.bidData.id) {
          return '';
        }

        return this.$store.getters.bidData.dueDate;
      },
      set(value) {
        this.$store.commit('setBidDueDate', value);
      },
    },
    dueTime: {
      get() {
        if (!this.$store.getters.bidData.id) {
          return '';
        }
        return this.$store.getters.bidData.dueTime;
      },
      set(value) {
        this.$store.commit('setBidDueTime', value);
      },
    },
    bidRegions: {
      get() {
        if (!this.$store.getters.bidData.id) {
          return '';
        }
        return this.$store.getters.bidData.regions;
      },
      set(value) {
        this.$store.commit('setBidRegions', value);
      },
    },
    bidDescriptions: {
      get() {
        if (this.$store.getters.bidData != null) {
          return this.$store.getters.bidData.bidDescriptions;
        }
        return [{ body: '' }];
      },
      set(value) {
        this.$store.commit('setBidDescription', value);
      },
    },
    qAndAEnabled: {
      get() {
        if (!this.$store.getters.bidData.id) {
          return 'yes';
        }
        return this.$store.getters.bidData.qAndAEnabled;
      },
      set(value) {
        this.$store.commit('setBidEnabled', value);
      },
    },
    serial: {
      get() {
        if (!this.$store.getters.bidData.id) {
          return '';
        }
        return this.$store.getters.bidData.serial;
      },
      set(value) {
        // this.$store.commit('setBidEnabled', value)
      },
    },
    statusType: {
      get() {
        if (!this.$store.getters.bidData.id) {
          return '';
        }
        return this.$store.getters.bidData.statusType;
      },
      set(value) {
        // this.$store.commit('setBidEnabled', value)
      },
    },
    validate() {
      this.$emit('validation', { valid: this.valid, value: '1', bidTitle: this.title });
      this.$store.commit('setBidDetailsComplete', this.valid);
      return this.valid;
    },
  },
  watch: {
    date() {
      this.dueDate = this.formatDate(this.date);
    },
  },
  methods: {
    ...mapActions(['saveDraftBid', 'updateDraftBid', 'deleteDraftBid', 'saveTemplateBid', 'updateTemplate', 'updateBid', 'getAllIntent']),
    async changeTab() {
      if (this.$store.getters.bidData != null) {
        const bidDetails = {
          userId: this.userInfo.id,
          userName: `${this.userInfo.firstName} ${this.userInfo.lastName}`,
          companyId: this.userInfo.company.id,
          company: this.userInfo.company.company,
        };
        if (this.$refs.form.validate()) {
          this.valid = true;
          this.loading = true;
          if (this.$route.name === 'EditTemplate') {
            if (!this.$store.getters.bidData.id) {
              await this.saveTemplateBid(bidDetails);
            } else {
              await this.updateTemplate(bidDetails);
            }
          } else {
            if (this.$route.name === 'EditBid') {
              if (this.isEditBidChanges === true) {
                await this.updateBid(bidDetails);
              }
            }
            if (!this.$store.getters.bidData.id) {
              await this.saveDraftBid(bidDetails);
            } else if (this.$store.getters.bidData.id && this.$store.getters.bidData.statusType === 'templateBid') {
              await this.saveDraftBid(bidDetails);
            } else {
              await this.updateDraftBid(bidDetails);
            }
          }

          this.$emit('changetab', 'tab-2');
        }
      } else {
        const bidDetails = {
          userId: this.userInfo.id,
          userName: `${this.userInfo.firstName} ${this.userInfo.lastName}`,
          companyId: this.userInfo.company.id,
          company: this.userInfo.company.company,
        };
        if (this.$route.name === 'EditTemplate') {
          await this.saveTemplateBid(bidDetails);
        } else {
          await this.saveDraftBid(bidDetails);
        }
      }
    },
    async savedraft() {
      if (this.$store.getters.bidData != null) {
        const bidDetails = {
          userId: this.userInfo.id,
          userName: `${this.userInfo.firstName} ${this.userInfo.lastName}`,
          companyId: this.userInfo.company.id,
          company: this.userInfo.company.company,
        };
        if (this.$store.getters.bidData.id && this.$store.getters.bidData.statusType === 'templateBid') {
          await this.saveDraftBid(bidDetails);
        }
        if (this.$refs.form.validate()) {
          if (this.$route.name === 'EditTemplate') {
            if (!this.$store.getters.bidData.id) {
              await this.saveTemplateBid(bidDetails);
            } else if (this.$store.getters.bidData.id && this.$store.getters.bidData.statusType === 'templateBid') {
              await this.saveTemplateBid(bidDetails);
            } else {
              await this.updateTemplate(bidDetails);
            }
          } else {
            if (this.$route.name === 'EditBid') {
              if (this.isEditBidChanges === true) {
                await this.updateBid(bidDetails);
              }
            }
            if (!this.$store.getters.bidData.id) {
              await this.saveDraftBid(bidDetails);
            } else if (this.$store.getters.bidData.id && this.$store.getters.bidData.statusType === 'templateBid') {
              await this.saveDraftBid(bidDetails);
            } else {
              await this.updateDraftBid(bidDetails);
            }
          }
        }
      } else {
        const bidDetails = {
          userId: this.userInfo.id,
          userName: `${this.userInfo.firstName} ${this.userInfo.lastName}`,
          companyId: this.userInfo.company.id,
          company: this.userInfo.company.company,
        };
        if (this.$route.name === 'EditTemplate') {
          await this.saveTemplateBid(bidDetails);
        } else {
          await this.saveDraftBid(bidDetails);
        }
      }
    },
    add() {
      this.$store.commit('setBidDescription', [...this.bidDescriptions, { name: '', body: '' }]);
    },

    remove(index) {
      this.bidDescriptions.splice(index, 1);
    },
    fieldUpdate() {
      this.formStatus = true;
    },
    savedraftOnInterval() {
      const timer = setInterval(() => {
        if (this.formStatus === true) {
          this.savedraft();
          this.formStatus = false;
        }
      }, 60000);

      this.$once('hook:beforeDestroy', () => {
        clearInterval(timer);
      });
    },
    deleteDraft() {
      this.deleteDraftBid({ draftId: this.$store.getters.bidData.id });
    },
  },
  async mounted() {
    this.route = this.$route.name;
    
    if (this.$route.name === 'EditBid') {
      await this.getAllIntent({
      bidId: this.$store.getters.bidData.id,
      reload: false,
    });
    }


    if (this.$store.getters.entryCheckForEditBid) {
      this.$router.push('/view-bids');
    }
    this.$store.commit('setInvitedSuppliersData', this.$store.getters.bidData.invitedSuppliers);
    this.$store.commit('setInvitedNewSuppliers', this.$store.getters.bidData.invitedNewSuppliers);
    this.$store.commit('setInvitedTeamMembers', this.$store.getters.bidData.invitedTeamMembers);
    this.$store.commit('setBidlines', this.$store.getters.bidData.lineItems);
    this.$store.commit('setLineItemsComplete', false);
    if (this.$route.name === 'EditBid') {
      this.$store.commit('setAttachement', this.$store.getters.bidData.attachments);
    } else if (this.$store.getters.bidData.statusType === 'draftBid') {
      this.$store.commit('setAttachData', null);
      this.$store.commit('setAttachement', null);
      this.$store.commit('setAttachement', this.$store.getters.bidData.attachments);
    } else if (this.$store.getters.bidData.statusType === 'templateBid') {
      this.$store.commit('setAttachement', this.$store.getters.bidData.attachment);
    } else {
      this.$store.commit('setAttachement', this.$store.getters.bidData.attachment);
    }
    this.$store.commit('setQuestions', this.$store.getters.bidData.questions);
    if (this.$store.getters.bidData.statusType === 'templateBid') {
      this.isTemplate = true;
      this.savedraft();
    }
    this.savedraftOnInterval();
  },
};
</script>
