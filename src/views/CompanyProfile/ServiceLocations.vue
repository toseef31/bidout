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
      <v-col cols="12" sm="10">
        <div class="service-list text-left mt-5">
          <label class="d-flex justify-space-between" v-for="(location,index) in companyData.companyLocations"><span><v-icon>mdi-map-marker-outline</v-icon>{{location.location}}</span> <v-icon color="#F32349"  @click="deleteLocation(location)">mdi-trash-can-outline</v-icon></label>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
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
      return this.$store.getters.companyData;
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
      this.mapOptions = {
        center: { lat: this.$store.getters.companyData.lattitude, lng: this.$store.getters.companyData.longitude },
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
      this.markerOptions = {
        url: '/assets/images/dashboard/mapMobile.png',
        size: {width: 60, height: 90, f: 'px', b: 'px',},
        scaledSize: {width: 30, height: 45, f: 'px', b: 'px',},
      };
      // console.log(this.mapOptions,'maps');
      const map = new google.maps.Map(document.getElementById("map"), this.mapOptions);
        // const card = document.getElementById("pac-card");

        // map.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);

        // [START maps_places_autocomplete_creation]
        const center = { lat: this.$store.getters.companyData.lattitude, lng: this.$store.getters.companyData.longitude };
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
          // componentRestrictions: { country: "us" },
          fields: ["address_components", "geometry", "icon", "name","formatted_address"],
          strictBounds: false,
          types: ["establishment"],
        };
        const autocomplete = new google.maps.places.Autocomplete(input, options);
        // console.log(autocomplete,'autpo',input);
        // autocomplete.setComponentRestrictions({
        //     country: ["us", "pr", "vi", "gu", "mp"],
        //   });

        // [END maps_places_autocomplete_countries_multiple]
        // [START maps_places_autocomplete_setbounds]
        const southwest = { lat: 5.6108, lng: 136.589326 };
        const northeast = { lat: 61.179287, lng: 2.64325 };
        const newBounds = new google.maps.LatLngBounds(southwest, northeast);

        autocomplete.setBounds(newBounds);

        // [END maps_places_autocomplete_setbounds]
        // const infowindow = new google.maps.InfoWindow();
        // const infowindowContent = document.getElementById("infowindow-content");
        // console.log(infowindowContent);
        // infowindow.setContent(infowindowContent);
        
        const marker = new google.maps.Marker({
          position: new google.maps.LatLng(this.$store.getters.companyData.lattitude, this.$store.getters.companyData.longitude),
          title: 'Marker',
          map: map,
          draggable: true,
          // map,
          anchorPoint: new google.maps.Point(0, -29),
        });
        autocomplete.addListener("place_changed", () => {
          // infowindow.open();
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
          } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17); // Why 17? Because it looks good.
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
          this.address = place.name;
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