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
                    <v-icon small v-bind="attrs"
                      v-on="on">mdi-information-outline</v-icon>
                  </template>
                  <span>Choose Bid Type</span>
                </v-tooltip>
              </label>
              <v-select outlined :items="type" v-model="bidType" :rules="bidTypeRules">

              </v-select>
            </v-col>
            <v-col cols="12" sm="6" text="left">
              <label class="d-block text-left input-label mb-2 font-weight-bold">Due Date </label>
              <v-text-field placeholder="Due Date" single-line outlined type="date" v-model="dueDate" :rules="dueDateRules" :min="new Date().toISOString().substr(0, 10)" append-icon="mdi-calendar">
              </v-text-field>

            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" sm="6" text="left">
              <label class="d-block text-left input-label mb-2 font-weight-bold">Due Time </label>
              <v-select outlined :items="time" item-text="label" item-value="value" v-model="dueTime" :rules="dueTimeRules">

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
                    <v-icon small v-bind="attrs"
                      v-on="on">mdi-information-outline</v-icon>
                  </template>
                  <span>Check the Q&A options</span>
                </v-tooltip>
              </label>

              <v-radio-group
                row
                v-model="qAndAEnabled"
              >
                <v-radio
                  label="Yes"
                  value="true" checked
                ></v-radio>
                <v-radio
                  label="No"
                  value="false"
                ></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" sm="12" text="left">
              <label class="d-block text-left input-label mb-2 font-weight-bold">Bid Description</label>
              <v-textarea placeholder="Describe here..." single-line outlined type="text" v-model="bidDescriptions" :rules="descRules">
              </v-textarea>
            </v-col>
          </v-row>
          <v-row justify="center" v-for="(textField, i) in textFields"
             :key="i">
            <v-col cols="12" sm="12" text="left">
              <label class="d-block text-left input-label mb-2 font-weight-bold">Additional Information <v-icon color="#F32349" @click="remove(i)">mdi-trash-can-outline</v-icon></label>
              <v-text-field placeholder="Title" single-line outlined type="text" v-model="textFields[i]['name']">
              </v-text-field>
              <v-textarea placeholder="Describe here" single-line outlined type="text" hide-details v-model="textFields[i]['body']">
              </v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="12" class="text-left">
              <v-btn color="rgba(13, 150, 72, 0.1)" rounded class="text-capitalize adtn-btn font-weight-bold" @click="add"><v-icon>mdi-plus</v-icon>Add Aditional Description</v-btn>
            </v-col>
          </v-row>

          <v-row justify="center">
            <v-col cols="12">
              <v-btn color="#0D9648" height="56" class="text-capitalize white--text font-weight-bold save-btn px-9" @click="changeTab" large>Save Changes</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-col>
  </v-row>
</template>
<script>
import { mapActions } from 'vuex';

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
      // qAndAEnabled: 'yes',
      showAdditional: false,
      type: ['RFP', 'RFI', 'BidOut Process'],
      time: [
        { label: '1pm CST', value: '1pm' },
        { label: '2pm CST', value: '2pm' },
        { label: '3pm CST', value: '3pm' },
        { label: '4pm CST', value: '4pm' },
      ],
      region: ['Gulf Coast', 'Northwest', 'Rockies', 'Mid-Con', 'Permian', 'Arklatex', 'Offshore', 'Other'],
      textFields: [],
      interval: '',
      bidFormData: '',
      formStatus: false,
    };
  },
  computed: {
    
    title: {
      get () {
        if(this.$store.getters.bidData != null){
          return this.$store.getters.bidData.title
        }else{
          return '';
        }
      },
      set (value) {
        console.log(value);
        this.$store.commit('setBidTitle', value)
      },
    },
    bidType: {
      get () {
        if(this.$store.getters.bidData != null){
          return this.$store.getters.bidData.type
        }else{
          return '';
        }
      },
      set (value) {
        this.$store.state.bidData.type = value
      },
    },
    dueDate: {
      get () {
        if(this.$store.getters.bidData != null){
          return this.$store.getters.bidData.dueDate
        }else{
          return '';
        }
      },
      set (value) {
        this.$store.state.bidData.dueDate = value
      },
    },
    dueTime: {
      get () {
        if(this.$store.getters.bidData != null){
          return this.$store.getters.bidData.dueTime
        }else{
          return '';
        }
      },
      set (value) {
        this.$store.state.bidData.dueTime =  value
      },
    },
    bidRegions: {
      get () {
        if(this.$store.getters.bidData != null){
          return this.$store.getters.bidData.regions
        }else{
          return '';
        }
      },
      set (value) {
        this.$store.state.bidData.regions =  value
      },
    },
    bidDescriptions: {
      get () {
        if(this.$store.getters.bidData != null){
          return this.$store.getters.bidData.bidDescriptions[0]['body']
        }else{
          return '';
        }
      },
      set (value) {
        this.$store.state.bidData.bidDescriptions[0]['body'] = value
      },
    },
    qAndAEnabled: {
      get () {
        if(this.$store.getters.bidData != null){
          return this.$store.getters.bidData.qAndAEnabled
        }else{
          return 'yes';
        }
      },
      set (value) {
        this.$store.state.bidData.qAndAEnabled = value
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
    ...mapActions(['saveDraftBid',"updateDraftBid"]),
    changeTab() {
      console.log('dada',this.title);
      if(this.$store.getters.bidData != null){
        const bidDetails = {
          title: this.title,
          type: this.bidType,
          dueDate: this.dueDate,
          dueTime: this.dueTime,
          regions: this.bidRegions,
          bidDescriptions: this.bidDescriptions,
          qAndAEnabled: this.qAndAEnabled,
          userId: this.$store.getters.userInfo.id,
          description: this.textFields,
          companyId: this.$store.getters.userInfo.company.id,
          company: this.$store.getters.userInfo.company.company,
          bidId: this.$store.getters.bidData.id,
          serial: this.$store.getters.bidData.serial,
          status: 'edit',
        };
        if (this.$refs.form.validate()) {
          this.updateDraftBid({bidDetails: bidDetails});
          this.$emit('changetab', 'tab-2');
        }
      }else{
        const bidDetails = {
          title: this.title,
          type: this.bidType,
          dueDate: this.dueDate,
          dueTime: this.dueTime,
          regions: this.bidRegions,
          bidDescriptions: this.bidDescriptions,
          qAndAEnabled: this.qAndAEnabled,
          userId: this.$store.getters.userInfo.id,
          companyId: this.$store.getters.userInfo.company.id,
          description: this.textFields,
          company: this.$store.getters.userInfo.company.company,
          status: 'create',
        };
        console.log(bidDetails);
        if (this.$refs.form.validate()) {
          // this.saveDraftBid(bidDetails);
          this.$emit('changetab', 'tab-2');
        }
      }
      
    },
    savedraft() {
      if(this.$store.getters.bidData != null){
        const bidDetails = {
          title: this.title,
          type: this.bidType,
          dueDate: this.dueDate,
          dueTime: this.dueTime,
          regions: this.bidRegions,
          bidDescriptions: this.bidDescriptions,
          qAndAEnabled: this.qAndAEnabled,
          userId: this.$store.getters.userInfo.id,
          description: this.textFields,
          companyId: this.$store.getters.userInfo.company.id,
          company: this.$store.getters.userInfo.company.company,
          bidId: this.$store.getters.bidData.id,
          serial: this.$store.getters.bidData.serial,
          status: 'edit',
        };
        if (this.$refs.form.validate()) {
          this.updateDraftBid({bidDetails: bidDetails});
          this.$emit('changetab', 'tab-2');
        }
      }else{  
          const bidDetails = {
          title: this.title,
          type: this.bidType,
          dueDate: this.dueDate,
          dueTime: this.dueTime,
          regions: this.bidRegions,
          bidDescriptions: this.bidDescriptions,
          description: this.textFields,
          qAndAEnabled: this.qAndAEnabled,
          userId: this.$store.getters.userInfo.id,
          companyId: this.$store.getters.userInfo.company.id,
          company: this.$store.getters.userInfo.company.company,
          status: 'create',
        };
        if (this.$refs.form.validate()) {
          this.saveDraftBid(bidDetails);
        }
      }
    },
    add() {
      this.textFields.push({
        name: '',
        body: '',
      });
    },

    remove(index) {
      this.textFields.splice(index, 1);
    },
    fillData(){
      // this.title = this.$store.getters.bidData.title;
      // this.bidType = this.$store.getters.bidData.type;
      // this.dueDate = this.$store.getters.bidData.dueDate;
      // this.dueTime = this.$store.getters.bidData.dueTime;
      // this.bidRegions = this.$store.getters.bidData.regions;
      // this.bidDescriptions = this.$store.getters.bidData.bidDescriptions[0]['body'];
      this.qAndAEnabled = this.$store.getters.bidData.qAndAEnabled;
      const status = edit;
      if(this.$store.getters.bidData != null){
        if(this.$store.getters.bidData.bidDescriptions.length > 1){
          this.textFields = this.$store.getters.bidData.bidDescriptions.slice();
          this.textFields.splice(0,1);
          this.showAdditional = true;
        }else{
          this.textFields =  [];
        }
        const bidDetails = {
          title: this.$store.getters.bidData.title,
          type: this.$store.getters.bidData.type,
          dueDate: this.$store.getters.bidData.dueDate,
          dueTime: this.$store.getters.bidData.dueTime,
          regions: this.$store.getters.bidData.regions,
          bidDescriptions: this.$store.getters.bidData.bidDescriptions[0]['body'],
          qAndAEnabled: this.$store.getters.bidData.qAndAEnabled,
          userId: this.$store.getters.userInfo.id,
          description: this.textFields,
          companyId: this.$store.getters.userInfo.company.id,
          companyId: this.$store.getters.userInfo.company.id,
          bidId: this.$store.getters.bidData.id,
          serial: this.$store.getters.bidData.serial,
          status: 'edit',
        };
        this.$store.state.bid.bidData.status = bidDetails.status;
        // this.$store.commit('setInvitedSuppliersData',this.$store.getters.bidData.invitedSuppliers);
        // this.$store.commit('setInvitedTeamMembers',this.$store.getters.bidData.invitedTeamMembers);
        // this.$store.commit('setBidlines',this.$store.getters.bidData.lineItems);
        // this.$store.commit('setAttachement',this.$store.getters.bidData.attachments);
        // this.$store.commit('setQuestions',this.$store.getters.bidData.questions);
      }
      
    },
    fieldUpdate() {
      this.formStatus = true;
    },
    savedraftOnInterval(){
      const timer = setInterval(() => {
        if(this.formStatus == true){
          this.savedraft();
          this.formStatus = false;
        }
      }, 60000);

      this.$once("hook:beforeDestroy", () => {
        clearInterval(timer);
      });
    },
  },
  mounted(){
    console.log('mounted',this.$store.getters.bidData);
    if(this.$store.getters.bidData.bidDescriptions.length > 1){
      this.textFields = this.$store.getters.bidData.bidDescriptions.slice();
      this.textFields.splice(0,1);
      this.showAdditional = true;
    }else{
      this.textFields =  [];
    }
    this.fillData();
    this.savedraftOnInterval();
  }
};
</script>
