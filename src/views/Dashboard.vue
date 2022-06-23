<template>
  <section class="section-container fill-height">
    <Navbar></Navbar>
     <v-row class="pa-3">
       <v-col cols="12" md="3" class="left-sidebar pr-1">
          <LeftSidebar></LeftSidebar>
       </v-col>
       <v-col cols="12" md="6" class="mid-content">
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
            </v-simple-table>
            <div class="title-block shipment">
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
            </v-simple-table>
          </div>
          <div class="map-section">
            <v-img :src="require('@/assets/images/dashboard/map.png')"></v-img>
          </div>
       </v-col>
       <v-col cols="12" md="3" class="pl-0">
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
export default {
  name : "Dashboard",
  components: {
    Navbar,
    LeftSidebar,
    RightSidebar,
  },
  
  data() {
    return {
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
    };
  },
  computed : {

  },
  methods: {
    
  },
};
</script>
<style scoped lang="scss">
@import '@/assets/styles/dashboard/dashboard.scss';
</style>
