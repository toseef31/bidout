<template>
  <div>
    <v-form>
      <hr>
      <v-container class="pa-sm-10 pa-4">
        <v-row>
          <v-col cols="12" sm="12">
          <label class="d-block text-left main-label mb-4">Key Facts</label>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12"sm="6" text="left">
            <label class="d-block text-left input-label mb-2">Founded</label>
            <v-text-field placeholder="Enter founded year ..." v-model="founded" single-line outlined></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" text="left">
            <label class="d-block text-left input-label mb-2">Employess</label>
            <v-text-field placeholder="Enter Employees ..." v-model="employees" single-line outlined></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6" text="left" >
            <label class="d-block text-left input-label mb-2">HQ Location</label>
            <v-text-field placeholder="Enter hq location ..." v-model="hqLocation" single-line outlined></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" text="left">
            <label class="d-block text-left input-label mb-2">Stock Price</label>
            <v-text-field placeholder="Enter stock price ..." v-model="stockPrice" single-line outlined></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6" text="left">
            <label class="d-block text-left input-label mb-2">Website</label>
            <v-text-field placeholder="Enter website ..." v-model="website" single-line outlined></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" text="left">
            <label class="d-block text-left input-label mb-2">Company's LinkedIn</label>
            <v-text-field placeholder="Enter company LinkedIn url ..." v-model="linkedin" single-line outlined></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6" text="left">
            <label class="d-block text-left input-label mb-2">Careers Page</label>
            <v-text-field placeholder="Enter career page ..." v-model="careers" single-line outlined></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col  cols="12" sm="12">
            <v-btn color="#0D9648" large class="text-capitalize white--text" width="176px" height="54px" @click="addKeyFacts">Add</v-btn>
          </v-col>
        </v-row>
      </v-container>
      <hr>
      <v-container class="pa-sm-10 pa-4">
        <v-row>
          <v-col cols="12" sm="12">
          <label class="d-block text-left main-label mb-4">Account Contacts</label>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6" text="left">
            <label class="d-block text-left input-label mb-2">Name</label>
            <v-text-field placeholder="Full name ..." v-model="contactName" single-line outlined hide-details></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" text="left">
            <label class="d-block text-left input-label mb-2">Role</label>
            <v-text-field placeholder="Role ..." v-model="contactRole" single-line hide-details outlined></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6" text="left">
            <label class="d-block text-left input-label mb-2">Email</label>
            <v-text-field placeholder="Enter Email ..." v-model="contactEmail" single-line outlined hide-details type="email"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" text="left">
            <label class="d-block text-left input-label mb-1">Phone Number</label>
            <!-- <v-text-field placeholder="Phone Number ..." v-model="contactPhoneNo" single-line outlined></v-text-field> -->
            <VuePhoneNumberInput :border-radius="8" size="lg" v-model="contactPhoneNo"
            
            :loader="hasLoaderActive"
            :error="hasErrorActive"
            class="mb-2"
            @update="onUpdate"
            />
          </v-col>
        </v-row>
        <!-- <v-row>
          <v-col cols="12" sm="6" text="left">
            <label class="d-block text-left input-label mb-2">LinkedIn Profile</label>
            <v-text-field placeholder="LinkedIn Profile ..." v-modellink single-line outlined></v-text-field>
          </v-col>
        </v-row> -->
        <v-row>
          <v-col  cols="12" sm="12">
            <v-btn color="#0D9648" large class="text-capitalize white--text" width="176px" height="54px" @click="addContacts">Add</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <v-container class="pa-sm-10 pa-4">
      <div class="contact-list text-left mt-5 align-center" v-for="(contact,index) in companyData.accountContacts">
        <div class="profile-list">
          <h6>{{contact.name}}</h6>
        </div>
        <div class="profile-list">
          <h6>{{contact.position}}</h6>
        </div>
        <div class="profile-list">
          <h6>{{contact.email}}</h6>
        </div>
        <div class="profile-list">
          <h6>{{contact.phoneNo}}</h6>
        </div>
        <div class="profile-list text-right">
          <v-btn default color="transparent" class="text-capitalize dele-btn" @click="deleteContact(contact.index)"><v-icon>mdi-close</v-icon>Delete</v-btn>
        </div>
      </div>
    </v-container>
  </div>
</template>
<script>
  import VuePhoneNumberInput from 'vue-phone-number-input';
  import 'vue-phone-number-input/dist/vue-phone-number-input.css';
  import { mapActions } from "vuex";
export default {
  components: {
    VuePhoneNumberInput,
  },
  data() {
    return {
      founded: this.$store.getters.userInfo.company.founded,
      employees: this.$store.getters.userInfo.company.employees,
      hqLocation: this.$store.getters.userInfo.company.hqLocation,
      stockPrice: this.$store.getters.userInfo.company.stockPrice,
      website: this.$store.getters.userInfo.company.website,
      linkedin: this.$store.getters.userInfo.company.linkedin,
      careers: this.$store.getters.userInfo.company.careers,
      contactName: '',
      contactEmail: '',
      contactRole: '',
      contactPhoneNo: '',
      accountContacts: [],
      hasLoaderActive: false,
      hasErrorActive: false,
      results: {},
      results2: {},
    };
  },
  computed:{
    companyData(){
      return this.$store.getters.companyData;
    }
  },
  methods: {
    ...mapActions(["addCompanyFacts","addCompanyContacts"]),
    onUpdate (payload) {
      this.results = payload.formattedNumber
    },
    addKeyFacts(){
      var data = {
        companyId: this.$store.getters.userInfo.company.id,
        founded: this.founded,
        employees: this.employees,
        hqLocation: this.hqLocation,
        stockPrice: this.stockPrice,
        website: this.website,
        linkedin: this.linkedin,
        careers: this.careers
      }
      this.addCompanyFacts(data);
    },
    addContacts(){
      if(this.$store.getters.companyData.accountContacts){
        this.accountContacts = this.$store.getters.companyData.accountContacts;
      }
      var data = {
        name: this.contactName,
        email: this.contactEmail,
        position: this.contactRole,
        phoneNo: this.results
      }
      this.accountContacts.push(data);
      this.addCompanyContacts({companyId: this.$store.getters.userInfo.company.id,accountContacts: this.accountContacts});
    },
    deleteContact(index){
      if(this.$store.getters.companyData.accountContacts){
        this.accountContacts = this.$store.getters.companyData.accountContacts;
      }
      this.accountContacts.splice(index,1);
      this.addCompanyContacts({companyId: this.$store.getters.userInfo.company.id,accountContacts: this.accountContacts});
    }
  },
  mounted() {
    
  } 
};
</script>