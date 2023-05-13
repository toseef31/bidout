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
          <v-col cols="12" sm="6" text="left">
            <label class="d-block text-left input-label mb-2">Founded</label>
            <v-text-field placeholder="Enter founded year ..." v-model="founded" single-line outlined
              hide-details></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" text="left">
            <label class="d-block text-left input-label mb-2">Employess</label>
            <v-text-field placeholder="Enter Employees ..." v-model="employees" single-line outlined
              hide-details></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6" text="left">
            <label class="d-block text-left input-label mb-2">HQ Location</label>
            <input type="text" class="location-input" placeholder="Enter hq location ..." name="" id="hq-location"
              v-model="hqLocation">
            <div id="maps" class="map" style="height:400px; display: none;"></div>
          </v-col>
          <v-col cols="12" sm="6" text="left">
            <label class="d-block text-left input-label mb-2">Website</label>
            <v-text-field placeholder="Enter website ..." v-model="website" single-line outlined
              hide-details></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6" text="left">
            <label class="d-block text-left input-label mb-2">Company's LinkedIn</label>
            <v-text-field placeholder="Enter company LinkedIn url ..." v-model="linkedin" single-line outlined
              hide-details></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" text="left">
            <label class="d-block text-left input-label mb-2">Careers Page</label>
            <v-text-field placeholder="Enter career page ..." v-model="careers" single-line outlined
              hide-details></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12">
            <v-btn color="#0D9648" large class="text-capitalize white--text" width="176px" height="54px"
              :loading="keyfactsLoading" @click="addKeyFacts">Save</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <hr>
    <v-form ref="contactForm"
      :class="{ 'phone-error-class': !getPhoneInfo.valid && getCounter > 1, 'phone-valid-class': getPhoneInfo.valid }">
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
                :class="{ 'space-error-class': getPhoneInfo.message !== '', 'space-class': getPhoneInfo.message === '' }">Phone
                Number</label>
              <vue-tel-input defaultCountry="US" :autoDefaultCountry="false" :autoFormat="false" :dropdownOptions="{
                showDialCodeInSelection: true,
                showFlags: true,
                width: ' max-content'
              }" :inputOptions="{
  showDialCode: false,
  maxlength: 15,
  placeholder: 'Phone number',

}" model="national" :validCharactersOnly="true" :styleClasses="{ 'phone-main-class': true }" v-model="contactPhoneNo"
                @validate="onUpdate"></vue-tel-input>
              <div class="phone-class" v-show="!getPhoneInfo.valid && getCounter > 1">
                {{ getPhoneInfo.message }}</div>
            </div>

          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12">
            <v-btn color="#0D9648" large class="text-capitalize white--text" width="176px" height="54px"
              :loading="loading" :disabled="!valid || !getPhoneInfo.valid" @click="addContacts">Add</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <v-container class="pa-sm-10 pa-4">
      <div class="contact-list text-left mt-5 align-center" v-for="(contact, index) in companyData.accountContacts">
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
          <h6>{{ contact.phoneNo }}</h6>
        </div>
        <div class="profile-list text-right">
          <v-btn default color="transparent" class="text-capitalize dele-btn" @click="deleteContact(index)"
            :disabled="loadingBasin"><v-icon>mdi-close</v-icon>Delete</v-btn>
        </div>
      </div>
    </v-container>
  </div>
</template>
<script>
import { VueTelInput } from 'vue-tel-input';
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    VueTelInput,
  },
  data() {
    return {
      founded: this.$store.getters.companyData.companyData.founded,
      employees: this.$store.getters.companyData.companyData.employees,
      hqLocation: this.$store.getters.companyData.companyData.hqlocation,
      website: this.$store.getters.companyData.companyData.website,
      linkedin: this.$store.getters.companyData.companyData.linkedin,
      careers: this.$store.getters.companyData.companyData.careers,
      contactName: '',
      contactEmail: '',
      contactEmailRule: [
        (v) => !!v || 'E-mail is required',
        (v) => /^[\w-\.+]+@([\w-]+\.)+[\w-]{1,63}$/.test(v) || 'E-mail must be valid',
      ],
      contactRole: '',
      contactPhoneNo: '',
      accountContacts: [],
      results: {},
      results2: {},
      mapOption: {},
      markerOption: {},
      maps: '',
      loader: null,
      contctLoading: false,
      valid: false,
      loading: false,
      deleteAccount: false,
      counter: 0,
      phoneInfo: {
        valid: true,
        message: '',
      },
      toggleError: false,
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
    loadingBasin() {
      return this.$store.getters.loadingBasin;
    },
    getPhoneInfo() {
      return this.phoneInfo;
    },
    getCounter() {
      return this.counter;
    },
  },
  methods: {
    ...mapActions(['addCompanyFacts', 'addCompanyContacts']),
    onUpdate(payload) {
      this.counter++;
      this.phoneInfo.valid = payload.valid;

      if (payload.number && !payload.valid) {
        this.phoneInfo.message = 'Invalid Phone number format';
      } else {
        this.phoneInfo.message = '';
        this.results = payload.number;
        this.contactPhoneNo = payload.nationalNumber;
      }
    },
    getHqLocation() {
      this.mapOption = {
        center: { lat: this.$store.getters.companyData.companyData.lattitude, lng: this.$store.getters.companyData.companyData.longitude },
        zoom: 17,
        mapTypeId: 'terrain',
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: true,
        disableDefaultUi: false,
        zoomControl: true,
        scrollwheel: false,
      };
      this.markerOption = {
        url: '/assets/images/dashboard/mapMobile.png',
        size: {
          width: 60, height: 90, f: 'px', b: 'px',
        },
        scaledSize: {
          width: 30, height: 45, f: 'px', b: 'px',
        },
      };

      const map = new google.maps.Map(document.getElementById('maps'), this.mapOption);

      const center = { lat: this.$store.getters.companyData.companyData.lattitude, lng: this.$store.getters.companyData.companyData.longitude };

      const defaultBounds = {
        north: center.lat + 0.1,
        south: center.lat - 0.1,
        east: center.lng + 0.1,
        west: center.lng - 0.1,
      };
      const input = document.getElementById('hq-location');

      const options = {
        bounds: defaultBounds,
        fields: ['address_components', 'geometry', 'icon', 'name', 'formatted_address'],
        strictBounds: false,
        types: ['(regions)'],
      };
      const autocomplete = new google.maps.places.Autocomplete(input, options);

      const southwest = { lat: 5.6108, lng: 136.589326 };
      const northeast = { lat: 61.179287, lng: 2.64325 };
      const newBounds = new google.maps.LatLngBounds(southwest, northeast);

      autocomplete.setBounds(newBounds);

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();

        if (!place.geometry || !place.geometry.location) {
          window.alert(`No details available for input: '${place.name}'`);
          return;
        }

        let address = '';

        if (place.address_components) {
          address = [
            (place.address_components[0]
              && place.address_components[0].short_name)
            || '',
            (place.address_components[1]
              && place.address_components[1].short_name)
            || '',
            (place.address_components[2]
              && place.address_components[2].short_name)
            || '',
            (place.address_components[3]
              && place.address_components[3].short_name)
            || '',
          ].join(' ');
        }

        this.hqLocation = document.getElementById('hq-location').value;
      });
    },
    addKeyFacts() {
      const data = {
        companyId: this.$store.getters.userInfo.company.id,
        founded: this.founded,
        employees: this.employees,
        hqLocation: this.hqLocation,
        website: this.website,
        linkedin: this.linkedin,
        careers: this.careers,
      };
      this.addCompanyFacts(data);
    },
    addContacts() {
      if (this.$refs.contactForm.validate()) {
        if (this.$store.getters.companyData.companyData.accountContacts) {
          this.accountContacts = this.$store.getters.companyData.companyData.accountContacts;
        }
        const data = {
          name: this.contactName,
          email: this.contactEmail,
          position: this.contactRole,
          phoneNo: this.results,
        };
        this.accountContacts.push(data);
        this.addCompanyContacts({ companyId: this.$store.getters.userInfo.company.id, accountContacts: this.accountContacts });
      }

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
      this.addCompanyContacts({ companyId: this.$store.getters.userInfo.company.id, accountContacts: this.accountContacts });
      this.deleteAccount = false;
    },
  },
  mounted() {
    this.getHqLocation();
  },
};
</script>

<style src="vue-tel-input/dist/vue-tel-input.css"></style>
