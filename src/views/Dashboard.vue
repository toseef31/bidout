<template>
  <!-- <section class="section-container fill-height dashboard-module"> -->
    
       <v-col class="dashboard-module pa-0 pa-sm-3 pl-sm-0" :class="[ showSideBar ? 'col-md-6 col-12 col-sm-7' : 'mid-content-collapse', activityPanel ? 'd-sm-block' : 'd-md-block']" v-show="!activityPanel">
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
                          <tr
                            v-for="bid in bids"
                            :key="bid.id"
                          >
                            <td class="text-left">{{ bid.id }}</td>
                            <td class="text-left">{{ bid.title }}</td>
                            <td class="text-left">{{ bid.entries }}</td>
                            <td class="text-left">{{ bid.endTime }}</td>
                            <td class="text-left d-none d-sm-block pt-3">View Details</td>
                            <td class="text-left d-flex d-sm-none align-center"><span class="icon-circle"><v-icon>mdi-chevron-right</v-icon></span></td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                    <!-- <div class="title-block shipment">
                      <h3>Active Shipments</h3>
                      <a href="">View all</a>
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
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="bid in bids"
                            :key="bid.id"
                          >
                            <td class="text-left">{{ bid.id }}</td>
                            <td class="text-left">{{ bid.title }}</td>
                            <td class="text-left">{{ bid.entries }}</td>
                            <td class="text-left">{{ bid.endTime }}</td>
                            <td class="text-left">View Details</td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table> -->
                  </div>
                  <div class="pending-queue mb-2" v-if="userDatas.role == 'admin'">
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
                    <!-- <v-img :src="require('@/assets/images/dashboard/map.png')" class="d-none d-sm-block"></v-img>
                    <v-img :src="require('@/assets/images/dashboard/mapMobile.png')" class="d-block d-sm-none"></v-img> -->
                    <div id="map" class="map" height="400px"></div>
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
  import Navbar from './Layout/Navbar.vue'
  import LeftSidebar from './Layout/Dashboard/LeftSidebar.vue'
  import RightSidebar from './Layout/Dashboard/RightSidebar.vue'
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
      bids: [
        {
          id: 10007,
          title: 'Water Job',
          entries: 0,
          endTime: '-',
        },
        {
          id: 10008,
          title: 'Water Job',
          entries: 0,
          endTime: '-',
        },
        {
          id: 10009,
          title: 'Water Job',
          entries: 0,
          endTime: '-',
        },
        {
          id: 10010,
          title: 'Water Job',
          entries: 0,
          endTime: '-',
        },
        {
          id: 10010,
          title: 'Water Job',
          entries: 0,
          endTime: '-',
        },
        {
          id: 10010,
          title: 'Water Job',
          entries: 0,
          endTime: '-',
        },
      ],
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
    allbids(){
        return this.$store.getters.bids;
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
  },
  methods: {
    ...mapActions(["getAllBids","pendingUserCount"]),
    getBids(){
      this.getAllBids();
    },
    shipMap(){
      this.mapOptions = {
        center: new google.maps.LatLng(29.721085, -95.342049),
        zoom: 19,
        mapTypeId: 'terrain',
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: true,
        disableDefaultUi: false,
        zoomControl: true,
        scrollwheel: false,
      },
      this.markerOptions = {
        url: '/assets/images/dashboard/mapMobile.png',
        size: {width: 60, height: 90, f: 'px', b: 'px',},
        scaledSize: {width: 30, height: 45, f: 'px', b: 'px',},
      },
      this.map = new google.maps.Map(document.getElementById("map"), this.mapOptions);
    },
    
  },
  mounted() {
    document.title = "Dashboard - BidOut";
    this.getBids();
    this.shipMap();
    this.pendingUserCount(this.$store.getters.userInfo.company.id)
    this.users = JSON.parse(localStorage.getItem("userData")).user;
    
}
};
</script>
<style scoped lang="scss">

</style>
