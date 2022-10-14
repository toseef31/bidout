<template>
  <v-container class="pa-sm-10 pa-4">
    <label class="d-block text-left main-label">Services Location</label>
    <div class="pac-card" id="pac-card">
      
      <div id="pac-container">
        <v-row>
          <v-col cols="10" sm="10">
            <v-text-field placeholder="Add a location here ..." single-line outlined hide-details id="pac-input"></v-text-field>
          </v-col>
          <v-col cols="2" sm="2" class="pl-0 pt-0 pb-0">
            <v-btn color="#0D9648" class="text-capitalize mr-2 white--text" width="100%" height="54px" @click="addLocation">Add</v-btn>
          </v-col>
        </v-row>
        <!-- <input id="pac-input" type="text" placeholder="Enter a location" /> -->
      </div>

      <v-row>
        <v-col cols="12" sm="12">
          <div id="map"class="map" style="height:400px"></div>
        </v-col>
      </v-row>
    </div>
    <v-row>
      <v-col cols="12" sm="12">
        <v-row>
          <v-col cols="12" class="-list text-left pt-2"  v-for="(location,index) in companyData.companyLocations">
            <label class="d-flex justify-space-between"><span><v-icon>mdi-map-marker-outline</v-icon>{{location.location}}</span> <v-icon color="#F32349"  @click="deleteLocation(location)">mdi-trash-can-outline</v-icon></label>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
  import _ from 'lodash';
  import { mapActions } from "vuex";
export default {
  data() {
    return {
      mapOptions: {},
      markerOptions: {},
      map: '',
      lat: '',
      lng: '',
      address: "",
    };
  },
  computed:{
    companyData(){
      return this.$store.getters.companyData.companyData;
    }
  },
  watch:{
    address: _.debounce(function(){
      const autocomplete = new google.maps.places.Autocomplete(this.address);
    },500),
  },
  methods: {
    ...mapActions(["addCompanyLocation","deleteCompanyLocation"]),
    getLocation(){
      if(this.$store.getters.companyData.companyData.companyLocations){
        var lat = this.$store.getters.companyData.companyData.companyLocations[0].lattitude;
      }else{
        var lat = 29.721085;
      }
      if(this.$store.getters.companyData.companyData.companyLocations){
        var lng = this.$store.getters.companyData.companyData.companyLocations[0].longitude;
      }else{
        var lng = -95.342049;
      }
      if(this.$store.getters.companyData.companyData.companyLocations){
        var LocationsForMap = this.$store.getters.companyData.companyData.companyLocations;
      }else{
        var LocationsForMap = [
          {
            lattitude: 29.721085,
            longitude: -95.342049,
            location: 'M.D. Anderson Library'
          }
        ];
      }

      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 2,
        center: new google.maps.LatLng(LocationsForMap[0].lattitude, LocationsForMap[0].longitude),
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });

      var infowindow = new google.maps.InfoWindow();
      var marker, i;
      for (i = 0; i < LocationsForMap.length; i++) {  
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(LocationsForMap[i].lattitude, LocationsForMap[i].longitude),
          map: map,
          title: 'Marker',
          anchorPoint: new google.maps.Point(0, -29),
        });
        
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
          return function() {
            infowindow.setContent(LocationsForMap[i].location);
            infowindow.open(map, marker);
          }
        })(marker, i));
      }


        // [START maps_places_autocomplete_creation]
        const center = { lat: lat, lng: lng };
        // Create a bounding box with sides ~10km away from the center point
        const defaultBounds = {
          north: center.lat + 0.1,
          south: center.lat - 0.1,
          east: center.lng + 0.1,
          west: center.lng - 0.1,
        };
        const input = document.getElementById("pac-input");

        const options = {
          bounds: defaultBounds,
          fields: ["address_components", "geometry", "icon", "name","formatted_address"],
          strictBounds: false,
          types: ["establishment"],
        };
        const autocomplete = new google.maps.places.Autocomplete(input, options);
        

        // [END maps_places_autocomplete_countries_multiple]
        // [START maps_places_autocomplete_setbounds]
        const southwest = { lat: 5.6108, lng: 136.589326 };
        const northeast = { lat: 61.179287, lng: 2.64325 };
        const newBounds = new google.maps.LatLngBounds(southwest, northeast);

        autocomplete.setBounds(newBounds);
        
        autocomplete.addListener("place_changed", () => {
         
          marker.setVisible(true);

          const place = autocomplete.getPlace();

          if (!place.geometry || !place.geometry.location) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert("No details available for input: '" + place.name + "'");
            return;
          }

          // If the place has a geometry, then present it on a map.
          if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
            // map.setZoom(2);
          } else {
            map.setCenter(place.geometry.location);
            map.setZoom(2); // Why 17? Because it looks good.
          }

          marker.setPosition(place.geometry.location);
          marker.setVisible(true);

          let address = "";

          if (place.address_components) {
            address = [
              (place.address_components[0] &&
                place.address_components[0].short_name) ||
                "",
              (place.address_components[1] &&
                place.address_components[1].short_name) ||
                "",
              (place.address_components[2] &&
                place.address_components[2].short_name) ||
                "",
              (place.address_components[3] &&
                place.address_components[3].short_name) ||
                "",
            ].join(" ");
          }
          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
          this.address = place.name+', '+place.formatted_address;
        });
    },
    addLocation(){
      const head = Date.now().toString();
      const tail = Math.random().toString().substr(2);
      var data = {
        id: head + tail,
        companyId: this.$store.getters.userInfo.company.id,
        location: this.address,
        lat: this.lat,
        long: this.lng,
      }
      this.addCompanyLocation(data);
    },
    deleteLocation(data){
      var data = {
        id: data.id,
        companyId: this.$store.getters.userInfo.company.id,
        location: data.location,
        lat: data.lattitude,
        long: data.longitude,
      }
      this.deleteCompanyLocation(data);
    },
  },
  mounted() {
    this.getLocation();
  } 
};
</script>