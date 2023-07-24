<template>
  <div>
    <v-form>
      <v-container class="pa-sm-10 py-sm-0 pa-4">
        <v-row>
          <v-col cols="12" sm="12">
            <label class="d-block text-left main-label mb-4">Key Facts</label>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6" text="left">
            <label class="d-block text-left input-label mb-2">Founded Year</label>
            <v-text-field placeholder="Enter founded year ..." v-model="founded" single-line outlined
              hide-details></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" text="left">
            <label class="d-block text-left input-label mb-2">Employees</label>
            <v-select placeholder="Enter Employees ..." :items="emplyeesItems" v-model="employees" single-line outlined
              hide-details></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6" text="left">
            <label class="d-block text-left input-label mb-2">Website</label>
            <v-text-field placeholder="https://" v-model="website" single-line outlined
              hide-details></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" text="left">
            <label class="d-block text-left input-label mb-2">Careers Page</label>
            <v-text-field placeholder="https://" v-model="careers" single-line outlined
              hide-details></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6" text="left">
            <label class="d-block text-left input-label mb-2">Company's LinkedIn</label>
            <v-text-field placeholder="https://www.linkedin/" v-model="linkedin" single-line outlined
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
      founded: this.$store.getters.companyData.companyData.founded,
      employees: this.$store.getters.companyData.companyData.employees,
      hqLocation: this.$store.getters.companyData.companyData.hqLocation,
      website: this.$store.getters.companyData.companyData.website,
      linkedin: this.$store.getters.companyData.companyData.linkedin,
      careers: this.$store.getters.companyData.companyData.careers,
      mapOption: {},
      markerOption: {},
      maps: '',
      contactLoading: false,
      valid: false,
      loading: false,
      deleteAccount: false,
      counter: 0,
      toggleError: false,
      emplyeesItems: ['1-25', '26-50', '51-75', '76-100', '101-150', '151-200', '201-300', '301-400', '401-500', '501-700', '701-1000', '1001+'],
    };
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
    ...mapActions(['addCompanyFacts']),
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

        this.hqLocation = document.getElementById('hq-location').value;
      });
    },
    addKeyFacts() {
      const data = {
        companyId: this.$store.getters.userInfo.company._id,
        founded: this.founded,
        employees: this.employees,
        website: this.website,
        linkedin: this.linkedin,
        careers: this.careers,
      };
      this.addCompanyFacts(data);
    },
  },
  mounted() {
    this.getHqLocation();
  },
};
</script>
