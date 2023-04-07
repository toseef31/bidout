<template>
  <v-row fill-height align="center" class="fill-height dashboard-module" v-if="loading">
    <v-col cols="12">
      <v-progress-circular :width="3" color="green" indeterminate ></v-progress-circular>
    </v-col>
  </v-row>
  <v-row class="dashboard-module white pa-0 ma-0" v-else>
     <v-col class="pa-0 pr-sm-3" :class="[ showSideBar ? 'col-md-12 col-12 col-sm-12' : 'mid-content-collapse', activityPanel ? 'd-sm-flex' : 'd-md-flex']" v-show="!activityPanel" >
       <v-row class="ma-0">
        
         <v-col class="col-md-12 col-12 pr-0 pr-sm-3 pt-0 pl-0">
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
                         <th class="text-left" width="70px">
                           Bid ID
                         </th>
                         <th class="text-left pl-0">
                           Title
                         </th>
                         <th class="text-left" width="145px">
                           End Time
                         </th>
                         <th class="text-left pl-0"  width="65px">
                           <span class=" d-none d-sm-block">Action</span>
                         </th>
                       </tr>
                     </thead>

                     <tbody>
                       <tr v-if="subLoading" style="height: 60px;" class="white">
                         <td colspan="4">
                           <v-row fill-height align="center" class="fill-height">
                             <v-col cols="12">
                               <v-progress-circular :width="3" color="green" indeterminate ></v-progress-circular>
                             </v-col>
                           </v-row>
                         </td>
                         
                       </tr>
                       
                       <template v-else>
                         <template v-if="bidsList.length > 0">
                           <tr
                             v-for="bid in bidsList"
                             :key="bid.id"
                           >
                             <td class="text-left pr-sm-0" width="60px">{{ bid.serial }}</td>
                             <td class="text-left title-truncate pl-0">{{ bid.title }}</td>

                             <td class="text-left" width="145px">{{ formatDate(bid.dueDate)  }} {{bid.dueTime}}</td>
                             <td class="text-left d-none d-sm-block pt-2 pl-0" width="65px"><router-link class="text-decoration-none"

                               :to="{
                                 path: `/view-bids/${bid.serial}`,
                               }"
                               >View Bid</router-link
                             ></td>
                             <td class="text-left d-flex d-sm-none align-center">
                               <router-link class="text-decoration-none icon-circle" :to="{
                                 path: `/view-bids/${bid.serial}`,
                               }"> 
                                 <span class=""><v-icon>mdi-chevron-right</v-icon></span> 
                               </router-link>
                               
                             </td>
                           </tr>
                         </template>
                         <tr v-else>
                           <td colspan="5">There are no active bids, <router-link to="/create">create a new bid?</router-link></td>
                         </tr>
                       </template>
                     </tbody>
                   </template>
                 </v-simple-table>
                 
               </div>
               <div class="pending-queue mb-2" v-if="userDatas && userDatas.role == 'admin' && pendingCount > 0">
                 <div class="d-flex justify-space-between">
                   <div class="pending-content d-flex">
                     <v-img :src="require('@/assets/images/dashboard/userCircle.png')" height="24px" width="24px"></v-img> <span class="pl-3">{{pendingCount}} Pending User in Queue</span>
                   </div>
                   <div>
                     <router-link to="/manage-users">Manage Users</router-link>
                   </div>
                 </div>
               </div>
               <div v-if="locationLoader" class="map-section map-section-full pa-1" :class="[mapClass]">
                <v-row fill-height align="center" class="fill-height">
                  <v-col cols="12">
                    <v-progress-circular :width="3" color="green" indeterminate ></v-progress-circular>
                  </v-col>
                </v-row>
              </div>
               <div v-else class="map-section map-section-full pa-1" :class="[mapClass]">
                 <div id="map" class="map" height="415px"></div>
               </div>
             </div>
         </v-col>
         
       </v-row>
       <div class="pl-0 right-col ml-md-n2" :class="[ activityPanel ? '' : 'mobile-right-col']" >
        <div class="right-sidebar"> 
          <RightSidebar></RightSidebar>
        </div>
       </div>
    </v-col>
  </v-row>
       
   <!-- </section> -->
</template>
<script async defer id="map-api-script" src="https://maps.googleapis.com/maps/api/js?key=%VITE_GOOGLE_MAP%&libraries=places&callback=Function.prototype"></script>
<script>
  import Navbar from '../components/Layout/Navbar.vue'
  import LeftSidebar from '../components/Layout/Dashboard/LeftSidebar.vue'
  import RightSidebar from '../components/Layout/Dashboard/RightSidebar.vue'
  import _ from 'lodash'
  import { mapActions,mapGetters } from "vuex";
  import moment from 'moment-timezone';

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
      map: null,
      users: '',
    };
  },
  computed:{
    ...mapGetters(["activities","locationLoader"]),
    showSideBar(){
        return this.$store.getters.g_sideBarOpen;
    },
    activityPanel(){
        return this.$store.getters.g_activityPanel;
    },
    userDatas(){
      if(this.$store.getters.userInfo){
        return this.$store.getters.userInfo;
      }
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
    subLoading(){
     return this.$store.getters.pageSubLoader;
    },
    bidsList(){
      return _.orderBy(this.$store.getters.bidsList.filter((items)=>{
        return items.receivingBids != false;
      }).slice(0,6),['dueDate','asc','dueTime','asc']);
    },
    mapClass(){
      if(this.bidsList.length == '1'){
        if(this.pendingCount > 0 && (this.userDatas && this.userDatas.role == 'admin')){
          return 'map-section-pend-1';
        }else{
          return 'map-section-1';
        }
      }else if(this.bidsList.length == '2'){
        if(this.pendingCount > 0 && (this.userDatas && this.userDatas.role == 'admin')){
          return 'map-section-pend-2';
        }else{
          return 'map-section-2';
        }
      }else if(this.bidsList.length == '3'){
        if(this.pendingCount > 0 && (this.userDatas && this.userDatas.role == 'admin')){
          return 'map-section-pend-3';
        }else{
          return 'map-section-3';
        }
      }else if(this.bidsList.length == '4'){
        if(this.pendingCount > 0 && (this.userDatas && this.userDatas.role == 'admin')){
          return 'map-section-pend-4';
        }else{
          return 'map-section-4';
        }
      }else if(this.bidsList.length == '5'){
        if(this.pendingCount > 0 && (this.userDatas && this.userDatas.role == 'admin')){
          return 'map-section-pend-5';
        }else{
          return 'map-section-5';
        }
      }else if(this.bidsList.length == '6'){
        if(this.pendingCount > 0 && (this.userDatas && this.userDatas.role == 'admin')){
          return 'map-section-pend';
        }else{
          return 'map-section';
        }
      }else{
        if(this.pendingCount > 0 && (this.userDatas && this.userDatas.role == 'admin')){
          return 'map-section-pend-1';
        }else{
          return 'map-section-1';
        }
      }
    }
  },
  methods: {
    ...mapActions(["pendingUserCount","getAllLocations","getBidDashboard"]),
    loadMapScript() {
      let scriptId = "map-api-script";
      let mapAlreadyAttached = !!document.getElementById(scriptId);
      if (typeof google === 'undefined') {
        if (!mapAlreadyAttached) {
          const mapScript = document.createElement('script');
          mapScript.id = scriptId;
          mapScript.async = true;
          mapScript.defer = true
          
          mapScript.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAP}&libraries=places&callback=Function.prototype`;
          document.head.appendChild(mapScript);
        }
      } else {
         
      }
    },
    formatDate(dueDate) {
      return dueDate !== '' && dueDate !== null ? moment.tz(dueDate, 'America/Chicago').format('MM/DD/YYYY') : '';
    },
    getLocation(){
      var LocationsForMap = this.locations;
      var map = this.map;
      if(LocationsForMap && document.getElementById('map') != null){
        if(this.map == null){
          
          map = new google.maps.Map(document.getElementById('map'), {
            zoom: 4,
            mapId: "2993bb26d878ba6a",
            center: new google.maps.LatLng('39.8283', '-98.5795'),
            streetViewControl: false,
            mapTypeControl: false,
            // mapTypeId: google.maps.MapTypeId.ROADMAP
          });
          this.map = map;
        }
        var infowindow = new google.maps.InfoWindow();

        var marker, i,j;
        // var latlngbounds =new google.maps.LatLngBounds();
        for (i = 0; i < LocationsForMap.length; i++) {  
          for (j = 0; j < LocationsForMap[i].locations.length; j++){
            marker = new google.maps.Marker({
              position: new google.maps.LatLng(LocationsForMap[i].locations[j].lattitude, LocationsForMap[i].locations[j].longitude),
              map: map,
              title: 'Marker',
              anchorPoint: new google.maps.Point(0, -29),
            });
            var imageAppend;
            var image = '<h1 id="firstHeading" class="firstHeading"><img src="'+LocationsForMap[i].companyImage+'" height="50px" width="100px"></h1>';
            if(LocationsForMap[i].companyImage){
              imageAppend = image;
            }else{
              imageAppend = '';
            }
            const contentString =
              '<div id="content">' +
              '<div id="siteNotice">' +
              "</div>" +
              imageAppend +
              
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
          }
        }
      } 

    },
  },
  async created(){
     await this.loadMapScript();
     await this.getAllLocations().then((data) => {
       this.$store.commit('setLocationLoader',false);
    });
    
  },
  async updated(){
    this.getLocation();
  },
  async beforeMount(){
    
  },
  async mounted() {
    document.title = "Dashboard - BidOut";
    this.users = this.$store.getters.userInfo;
    this.pendingUserCount(this.userDatas.companyId)
    await this.getBidDashboard(this.userDatas._id);
    this.loadMapScript();
  }
};
</script>
<style scoped lang="scss">

</style>
