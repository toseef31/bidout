<template>
  <v-container class="pa-sm-10 py-sm-0 pa-4">
    <label class="d-block text-left main-label">Services Location</label>
    <div class="pac-card mt-0 mt-md-10" id="pac-card">
      <div id="pac-container">
        <v-row>
          <v-col cols="12" sm="12">
            <div id="map" class="map" style="height:400px"></div>
          </v-col>
        </v-row>
        <v-row class="py-4">
          <v-col cols="10" sm="10">
            <input type="text" class="location-input" name="" placeholder="Add a location here ..." id="pac-input">
           <!--  <v-text-field placeholder="Add a location here ..." single-line outlined hide-details id="pac-input"></v-text-field> -->
          </v-col>
          <v-col cols="2" sm="2" class="pl-0 pt-0 pb-0">
            <v-btn color="#0D9648" class="text-capitalize mr-2 white--text" width="100%" height="54px" :loading="loading" :disabled="loading" @click="addLocation">Add</v-btn>
          </v-col>
        </v-row>
        <!-- <input id="pac-input" type="text" placeholder="Enter a location" /> -->
      </div>
    </div>
    <v-row>
      <v-col cols="12" sm="12">
        <div class="locations">
          <h4 class="my-4 text-left">HQ Location</h4>
          <v-row class="grey lighten-5 mx-0 my-4 rounded-lg hq-location">
            <v-col cols="12" class="text-left py-4">
              <div  class="d-flex justify-space-between">
                <label>
                  <span>
                  <v-icon color="#0D9648">mdi-map-marker-outline</v-icon>
                    {{companyData.hqLocation}}
                  </span>
                </label>
              </div>
            </v-col>
          </v-row>
        </div>
        <div class="other-listing my-4">
          <h4  class="py-4 text-left">Other Locations</h4>
          <v-row>
            <v-col cols="12" sm="6" class="-list text-left pt-2"  v-for="(location,index) in companyData.companyLocations" :key="index">
              <div  class="d-flex justify-space-between py-4 grey lighten-5 rounded-lg">
                <label>
                  <span>
                  <v-icon color="#0D9648">mdi-map-marker-outline</v-icon>
                    {{location.location}}
                  </span>
                </label>
                <label>
                  <v-icon color="#0D9648" size="20" class="pr-2">mdi-pencil-outline</v-icon>
                  <v-icon color="#F32349" size="20" @click="deleteLocation(location,index)">mdi-trash-can-outline</v-icon>
                </label>
              </div>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import _ from 'lodash';
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      mapOptions: {},
      markerOptions: {},
      map: '',
      lat: '',
      lng: '',
      address: '',
      loading: false,
      loader: null,
    };
  },
  computed: {
    companyData() {
      return this.$store.getters.companyData.companyData;
    },
  },
  watch: {
    address: _.debounce(function() {
      const autocomplete = new google.maps.places.Autocomplete(this.address);
    }, 500),
  },
  methods: {
    ...mapActions(['addCompanyLocation', 'deleteCompanyLocation']),
    getLocation() {
      if (this.$store.getters.companyData.companyData.companyLocations && this.$store.getters.companyData.companyData.companyLocations && this.$store.getters.companyData.companyData.companyLocations.length > 0) {
        var lat = this.$store.getters.companyData.companyData.companyLocations[0].latitude;
      } else {
        var lat = 29.721085;
      }
      if (this.$store.getters.companyData.companyData.companyLocations && this.$store.getters.companyData.companyData.companyLocations && this.$store.getters.companyData.companyData.companyLocations.length > 0) {
        var lng = this.$store.getters.companyData.companyData.companyLocations[0].longitude;
      } else {
        var lng = -95.342049;
      }
      if (this.$store.getters.companyData.companyData.companyLocations && this.$store.getters.companyData.companyData.companyLocations && this.$store.getters.companyData.companyData.companyLocations.length > 0) {
        var LocationsForMap = this.$store.getters.companyData.companyData.companyLocations;
      } else {
        var LocationsForMap = [
          {
            latitude: 29.721085,
            longitude: -95.342049,
            location: 'M.D. Anderson Library'
          }
        ];
      }

      if (this.$store.getters.companyData.companyData.companyLocations && this.$store.getters.companyData.companyData.companyLocations.length === 1) {
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 9,
          center: new google.maps.LatLng(LocationsForMap[0].latitude, LocationsForMap[0].longitude),
          // mapTypeId: google.maps.MapTypeId.ROADMAP,
          mapId: "2993bb26d878ba6a",
          streetViewControl: false,
          mapTypeControl: false,
        });

          var infowindow = new google.maps.InfoWindow();
          var marker, i;

            for (i = 0; i < LocationsForMap.length; i++) {
            marker = new google.maps.Marker({

              position: new google.maps.LatLng(LocationsForMap[i].latitude, LocationsForMap[i].longitude),

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
          
          }
     else if (this.$store.getters.companyData.companyData.companyLocations && this.$store.getters.companyData.companyData.companyLocations.length > 1){
      var map = new google.maps.Map(document.getElementById('map'), {
        center: new google.maps.LatLng(LocationsForMap[0].latitude, LocationsForMap[0].longitude),
        // mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapId: "2993bb26d878ba6a",
        streetViewControl: false,
        mapTypeControl: false,
      });

      var infowindow = new google.maps.InfoWindow();
      var marker, i;
      
       var latlngbounds =new google.maps.LatLngBounds();
      
            for (i = 0; i < LocationsForMap.length; i++) {  
            marker = new google.maps.Marker({

              position: new google.maps.LatLng(LocationsForMap[i].latitude, LocationsForMap[i].longitude),

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
            latlngbounds.extend(marker.position);
          } 
         
            map.setCenter(latlngbounds.getCenter());
            map.fitBounds(latlngbounds);
          
          }else{
            var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 4,
            center: new google.maps.LatLng(LocationsForMap[0].latitude, LocationsForMap[0].longitude),
            // mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapId: "2993bb26d878ba6a",
            streetViewControl: false,
            mapTypeControl: false,
          });

          var infowindow = new google.maps.InfoWindow();
          var marker, i;
        for (i = 0; i < LocationsForMap.length; i++) {
          marker = new google.maps.Marker({
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
      }

      const center = { lat: lat, lng: lng };
      // Create a bounding box with sides ~10km away from the center point
      const defaultBounds = {
        north: center.lat + 0.1,
        south: center.lat - 0.1,
        east: center.lng + 0.1,
        west: center.lng - 0.1,
      };
      const input = document.getElementById('pac-input');

      const options = {
        bounds: defaultBounds,
        fields: ['address_components', 'geometry', 'icon', 'name', 'formatted_address'],
        strictBounds: false,
        types: ['address'],
      };
      const autocomplete = new google.maps.places.Autocomplete(input, options);

      const southwest = { lat: 5.6108, lng: 136.589326 };
      const northeast = { lat: 61.179287, lng: 2.64325 };
      const newBounds = new google.maps.LatLngBounds(southwest, northeast);

      autocomplete.setBounds(newBounds);

      autocomplete.addListener('place_changed', () => {
        marker.setVisible(true);

        const place = autocomplete.getPlace();
        if (!place.geometry || !place.geometry.location) {
          // eslint-disable-next-line no-alert
          window.alert(`No details available for input: '${place.name}'`);
          return;
        }

        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
          map.fitBounds(place.geometry.viewport);
          // map.setZoom(2);
        } else {
          map.setCenter(place.geometry.location);
          map.setZoom(2);
        }

        marker.setPosition(place.geometry.location);
        marker.setVisible(true);

        let address = '';

        if (place.address_components) {
          address = [
            (place.address_components[0] && place.address_components[0].short_name) || '',
            (place.address_components[1] && place.address_components[1].short_name) || '',
            (place.address_components[2] && place.address_components[2].short_name) || '',
            (place.address_components[3] && place.address_components[3].short_name) || '',
          ].join(' ');
        }
        this.lat = place.geometry.location.lat();
        this.lng = place.geometry.location.lng();
        this.address = document.getElementById('pac-input').value;
      });
    },
    addLocation() {
      const head = Date.now().toString();
      const tail = Math.random().toString().substr(2);
      const data = {
        id: head + tail,
        companyId: this.$store.getters.userInfo.company._id,
        location: this.address,
        lat: this.lat,
        long: this.lng,
      }
      this.addCompanyLocation(data);
      this.loader = 'loading';
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        if (document.getElementById('pac-input')) {
          document.getElementById('pac-input').value = '';
        }
        this.getLocation();
      }, 5000);
    },
    deleteLocation(data,indexing) {
      const locData = {
        id: data._id,
        companyId: this.$store.getters.userInfo.company._id,
        location: data.location,
        lat: data.latitude,
        long: data.longitude,
      };

      const indexOfObject = this.companyData.companyLocations.findIndex((object) => object._id === data._id);

      this.companyData.companyLocations.splice(indexOfObject, 1);

      this.deleteCompanyLocation(locData);
      this.getLocation();
    },
  },
  mounted() {
    this.getLocation();
  },
};
</script>
