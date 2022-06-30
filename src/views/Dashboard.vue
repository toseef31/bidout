<template>
  <section class="section-container fill-height">
    <Navbar></Navbar>
     <v-row class="mx-0">
       <v-col :class="[ showSideBar ? 'col-12' : 'toggleLeft-sidebar']" class="left-sidebar pr-1">
          <LeftSidebar></LeftSidebar>
       </v-col>
       <v-col class="mid-content pa-0 pa-sm-3" :class="[ showSideBar ? 'col-md-6 col-12 col-sm-7' : 'mid-content-collapse', activityPanel ? 'd-sm-block' : 'd-md-block']" v-show="!activityPanel">
          <div class="content-section">
            <div class="title-block">
              <h3 class="font-weight-bold">Active Bids</h3>
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
          <div class="map-section">
            <!-- <v-img :src="require('@/assets/images/dashboard/map.png')" class="d-none d-sm-block"></v-img>
            <v-img :src="require('@/assets/images/dashboard/mapMobile.png')" class="d-block d-sm-none"></v-img> -->
            <div id="map" class="map" height="400px"></div>
            <GmapMarker ref="myMarker"
                :position="google && new google.maps.LatLng(1.38, 103.8)" />
          </div>
       </v-col>
       <v-col cols="12" class="pl-0 right-col" :class="[ activityPanel ? '' : 'mobile-right-col']" >
        <div class="right-sidebar"> 
          <RightSidebar></RightSidebar>
        </div>
       </v-col>
     </v-row>
   </section>
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
      ],
      bidss:{},
      mapOptions: {},
      markerOptions: {},
      map: ''
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
    }
  },
  methods: {
    ...mapActions(["getAllBids"]),
    getBids(){
      this.getAllBids();
    },
    shipMap(){
      this.mapOptions = {
        center: new google.maps.LatLng(29.721085, -95.342049),
        zoom: 10,
        mapTypeId: 'terrain',
        mapTypeControl: false,
        scaleControl: false,
           streetViewControl: false,
           rotateControl: false,
           fullscreenControl: true,
           disableDefaultUi: false
      },
      this.markerOptions = {
        url: '/assets/images/dashboard/mapMobile.png',
        size: {width: 60, height: 90, f: 'px', b: 'px',},
        scaledSize: {width: 30, height: 45, f: 'px', b: 'px',},
      },
      this.map = new google.maps.Map(document.getElementById("map"), this.mapOptions);
    }
  },
  mounted() {
    this.getBids();
    this.shipMap();
}
};
</script>
<style scoped lang="scss">
@import '@/assets/styles/dashboard/dashboard.scss';
</style>
