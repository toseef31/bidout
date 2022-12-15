<template>
  <v-row fill-height align="center" class="fill-height dashboard-module" v-if="loading">
    <v-col cols="12">
      <v-progress-circular :width="3" color="green" indeterminate ></v-progress-circular>
    </v-col>
  </v-row>
  <v-col class="dashboard-module pa-0 pa-sm-3 pl-sm-0" :class="[ showSideBar ? 'col-md-6 col-12 col-sm-7' : 'mid-content-collapse', activityPanel ? 'd-sm-block' : 'd-md-block']" v-show="!activityPanel" v-else>
          <v-row>
           
            <v-col class="col-md-8 col-12 col-sm-8">
              <div class="mid-content">
                  <div class="content-section">
                    <div class="title-block">
                      <h3 class="font-weight-bold">Active Bids</h3>
                      <router-link to="/view-bids">View all</router-link>
                    </div>
                    <v-simple-table class="bids-table">
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th class="text-left">
                              Bid ID
                            </th>
                            <th class="text-left">
                              Title
                            </th>
                            <th class="text-left">
                              Entries
                            </th>
                            <th class="text-left">
                              End Time
                            </th>
                            <th class="text-left">
                              <span class=" d-none d-sm-block">Action</span>
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          <template v-if="bidsList.length > 0">
                            <tr
                              v-for="bid in bidsList"
                              :key="bid.id" v-if=""
                            >
                              <td class="text-left">{{ bid.serial }}</td>
                              <td class="text-left">{{ bid.title }}</td>
                              <td class="text-left">{{ bid.entries ? bid.entries.length : 0 }}</td>
                              <td class="text-left">{{ bid.dueDate | moment('MM/DD/YYYY') }} {{bid.dueTime}}</td>
                              <td class="text-left d-none d-sm-block pt-3"><router-link class="text-decoration-none"
                                :to="{
                                  path: `/view-bids/${bid.serial}`,
                                }"
                                >View Bid</router-link
                              ></td>
                              <td class="text-left d-flex d-sm-none align-center"><span class="icon-circle"><v-icon>mdi-chevron-right</v-icon></span></td>
                            </tr>
                          </template>
                          <tr v-else>
                            <td colspan="5">There are no active bids, <router-link to="/create">create a new bid?</router-link></td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                    
                  </div>
                  <div class="pending-queue mb-2" v-if="userDatas.role == 'admin' && pendingCount > 0">
                    <div class="d-flex justify-space-between">
                      <div class="pending-content d-flex">
                        <v-img :src="require('@/assets/images/dashboard/userCircle.png')" height="24px" width="24px"></v-img> <span class="pl-3">{{pendingCount}} Pending User in Queue</span>
                      </div>
                      <div>
                        <router-link to="/manage-users">Manage Users</router-link>
                      </div>
                    </div>
                  </div>
                  <div class="map-section">
                    <div id="map" class="map" height="415px"></div>
                  </div>
                </div>
            </v-col>
            <v-col cols="12" md="4" sm="4" class="pl-0 right-col" :class="[ activityPanel ? '' : 'mobile-right-col']" >
             <div class="right-sidebar"> 
               <RightSidebar></RightSidebar>
             </div>
            </v-col>
          </v-row>
       </v-col>
       
   <!-- </section> -->
</template>
<script>
  import Navbar from '../components/Layout/Navbar.vue'
  import LeftSidebar from '../components/Layout/Dashboard/LeftSidebar.vue'
  import RightSidebar from '../components/Layout/Dashboard/RightSidebar.vue'
  import _ from 'lodash'
  import { mapActions } from "vuex";
export default {
  name : "Dashboard",
  components: {
    Navbar,
    LeftSidebar,
    RightSidebar,
  },
  
  data() {
    return {
      isActivity : false,
      bidss:{},
      mapOptions: {},
      markerOptions: {},
      map: '',
      users: ''
    };
  },
  computed:{
    showSideBar(){
        return this.$store.getters.g_sideBarOpen;
    },
    activityPanel(){
        return this.$store.getters.g_activityPanel;
    },
    userDatas(){
        return this.$store.getters.userInfo;
    },
    userToken(){
      return this.$store.getters.userToken;
    },
    pendingCount(){
      return this.$store.getters.pendingCount;
    },
    locations(){
      return this.$store.getters.allLocations;
    },
    loading(){
     return this.$store.getters.pageLoader;
    },
    bidsList(){
      return _.orderBy(this.$store.getters.bidsList.slice(0,6),'dueDate','desc');
    }
  },
  methods: {
    ...mapActions(["pendingUserCount","getAllLocations","getBidDashboard"]),
    getLocation(){
      var LocationsForMap = this.locations;
      var map = new google.maps.Map(document.getElementById('map'), {
        center: new google.maps.LatLng(LocationsForMap[0].locations[0].lattitude, LocationsForMap[0].locations[0].longitude),
        streetViewControl: false,
        mapTypeControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });

      var infowindow = new google.maps.InfoWindow();

      var marker, i,j;
      var latlngbounds =new google.maps.LatLngBounds();
      for (i = 0; i < LocationsForMap.length; i++) {  
        for (j = 0; j < LocationsForMap[i].locations.length; j++){
          marker = new google.maps.Marker({
            position: new google.maps.LatLng(LocationsForMap[i].locations[j].lattitude, LocationsForMap[i].locations[j].longitude),
            map: map,
            title: 'Marker',
            anchorPoint: new google.maps.Point(0, -29),
          });
          const contentString =
            '<div id="content">' +
            '<div id="siteNotice">' +
            "</div>" +
            '<h1 id="firstHeading" class="firstHeading"><img src="'+LocationsForMap[i].companyImage+'" height="50px" width="100px"></h1>' +
            '<div id="bodyContent">' +
            '<p><b>'+LocationsForMap[i].companyName+': </b><a href="company/'+LocationsForMap[i].companySlug+'">' +
            "View Profile</a> </p>" +
            "<p><b>"+LocationsForMap[i].locations[j].location+"<b></p> " +
            "</div>" +
            "</div>";
          google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
              infowindow.setContent(contentString);
              infowindow.open(map, marker);
            }
          })(marker, j));
          latlngbounds.extend(marker.position);
        }
      }
      
        map.setCenter(latlngbounds.getCenter());
        map.fitBounds(latlngbounds);

    },
  },
  async created(){
   let scriptId = "map-api-script";
   let mapAlreadyAttached = !!document.getElementById(scriptId);
   if(!mapAlreadyAttached){
    let mapScript = document.createElement('script')
    mapScript.id = scriptId;
    mapScript.src = 'https://maps.googleapis.com/maps/api/js?key='+import.meta.env.VITE_GOOGLE_MAP+'&libraries=places';
    document.head.appendChild(mapScript);
    this.users = JSON.parse(localStorage.getItem("userData")).user;
   }
  },
  async updated(){
    await this.getAllLocations();
    await this.getLocation();
  },
  mounted() {
    document.title = "Dashboard - BidOut";
    
    this.pendingUserCount(this.$store.getters.userInfo.company.id)
    this.users = this.$store.getters.userInfo;
    this.getBidDashboard(this.userDatas.id);
    
    
}
};
</script>
<style scoped lang="scss">

</style>
