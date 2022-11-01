<template>
  
   <v-col class="createBid-module bids-module pa-0 pa-sm-3 pl-sm-0 pb-sm-0" :class="[ showSideBar ? 'col-md-9 col-12 col-sm-7' : 'mid-content-collapse', activityPanel ? 'd-sm-block' : 'd-md-block']" v-show="!activityPanel">
      <div class="mid-content">
        <div class="content-section fill-height">
          <div class="title-block d-block d-sm-flex justify-space-between pa-4 pa-sm-6 align-center">
            <div>
              <h3 class="font-weight-bold text-left mb-4 mb-sm-0">All Bids <font color="#B8B8B8">(6)</font></h3>
            </div>
            <div class="d-block d-sm-flex align-center">
              <v-tabs
                  v-model="tab" class="bid-tab mb-4 mb-sm-0"
                   hide-slider centered center-active mobile-breakpoint
                >
                  <v-tabs-slider color="yellow"></v-tabs-slider>

                  <v-tab class="text-capitalize font-weight-bold mr-8"
                    v-for="(item, index) in items"
                    :key="item" :href="'#tab-' + index" ripple rounded
                  >
                    {{ item }}
                  </v-tab>
                </v-tabs>
              <div class="__searchBox">
                <v-text-field
                  v-model="searchBid"
                  prepend-inner-icon="search"
                  placeholder="Search here..."
                  single-line

                  outlined min-height="40px" min-width="100%"
                  hide-details
                ></v-text-field>
              </div>
            </div>
          </div>
          <v-tabs-items v-model="tab">
            <v-tab-item
              value="tab-0"
            >
              <v-simple-table class="bids-table">
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left pl-sm-6 black--text font-weight-bold">
                        Bid ID
                      </th>
                      <th class="text-left black--text font-weight-bold">
                        Title
                      </th>
                      <th class="text-left black--text font-weight-bold">
                        Creator
                      </th>
                      <th class="text-center black--text font-weight-bold">
                        Entries
                      </th>
                      <th class="text-left black--text font-weight-bold">
                        End Time
                      </th>
                      <th class="text-left black--text font-weight-bold">
                        <span class=" d-none d-sm-block">Action</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="bid in bids"
                      :key="bid.id"
                    >
                      <td class="text-left pl-sm-6">{{ bid.id }}</td>
                      <td class="text-left">{{ bid.title }}</td>
                      <td class="text-left">{{ bid.creator }}</td>
                      <td class="text-center">{{ bid.entries }}</td>
                      <td class="text-left">{{ bid.endTime }}</td>
                      <td class="text-left d-none d-sm-block pt-3"><a href="">View Details</a></td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
              <div class="title-block d-flex justify-space-between px-4 px-sm-6 py-4 align-center">
                <div>
                  <h3 class="font-weight-bold">Draft Bids <font color="#B8B8B8">({{draftBidsList.length}})</font></h3>
                </div>
              </div>
              <v-simple-table class="bids-table draft-table">
                <template v-slot:default>
                  <tbody>
                    
                    <tr
                      v-for="bid in draftBidsList"
                      :key="bid.id"
                    >
                      <td class="text-left pl-sm-6">{{ bid.id }}</td>
                      <td class="text-left">{{ bid.title }}</td>
                      <td class="text-left">{{ userDatas.firstName }} {{ userDatas.lastName }}</td>
                      <td class="text-center">0</td>
                      <td class="text-left">{{ bid.dueDate | moment('DD/MM/YYYY') }} {{bid.dueTime}}</td>
                      <td class="text-left d-none d-sm-block pt-3"><a href="">Edit Draft</a></td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-tab-item>
            <v-tab-item
              value="tab-1"
            >
              <v-simple-table class="bids-table">
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left pl-sm-6 black--text font-weight-bold">
                        Bid ID
                      </th>
                      <th class="text-left black--text font-weight-bold">
                        Title
                      </th>
                      <th class="text-left black--text font-weight-bold">
                        Creator
                      </th>
                      <th class="text-left black--text font-weight-bold">
                        Entries
                      </th>
                      <th class="text-left black--text font-weight-bold">
                        End Time
                      </th>
                      <th class="text-left black--text font-weight-bold">
                        <span class=" d-none d-sm-block">Action</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="bid in bids"
                      :key="bid.id"
                    >
                      <td class="text-left pl-sm-6">{{ bid.id }}</td>
                      <td class="text-left">{{ bid.title }}</td>
                      <td class="text-left">{{ bid.creator }}</td>
                      <td class="text-left">{{ bid.entries }}</td>
                      <td class="text-left">{{ bid.dueDate }}</td>
                      <td class="text-left d-none d-sm-block pt-3"><a href="">View Details</a></td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-tab-item>
          </v-tabs-items>
        </div>
      </div>
   </v-col>
</template>
<script>
  import Navbar from '../../components/Layout/Navbar.vue'
  import LeftSidebar from '../../components/Layout/Dashboard/LeftSidebar.vue'
  import RightSidebar from '../../components/Layout/Dashboard/RightSidebar.vue'
  import { mapActions } from "vuex";
export default {
  name : "ViewBids",
  components: {
    Navbar,
    LeftSidebar,
    RightSidebar,
  },
  
  data() {
    return {
      users: '',
      tab: 'tab-0',
      searchBid: '',
      items: [
        'Open Bids (6)', 'Closed Bids (3)'
      ],
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      bids: [
        {
          id: 106411,
          title: 'This is a test template',
          creator: 'Rodney Giles',
          entries: 0,
          endTime: '08/26/2022, 10:00 am',
        },
        {
          id: 106311,
          title: 'Sheu',
          creator: 'Baker Hughes',
          entries: 0,
          endTime: '08/26/2022, 10:00 am',
        },
        {
          id: 106211,
          title: 'Water Job',
          creator: 'Rodney Giles',
          entries: 0,
          endTime: '08/26/2022, 10:00 am',
        },
        {
          id: 106111,
          title: 'Water Job',
          creator: 'Rodney Giles',
          entries: 0,
          endTime: '08/26/2022, 10:00 am',
        },
        {
          id: 106011,
          title: 'Water Job',
          creator: 'Rodney Giles',
          entries: 0,
          endTime: '08/26/2022, 10:00 am',
        },
        {
          id: 105911,
          title: 'Water Job',
          creator: 'Rodney Giles',
          entries: 0,
          endTime: '08/26/2022, 10:00 am',
        },
      ],
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
    draftBidsList(){
      return this.$store.getters.draftBidsList;
    }
  },
  methods: {
    ...mapActions(["getDraftBids","getBidsLists"]),
  },
  mounted() {
    document.title = "Bids - BidOut";
    this.users = this.$store.getters.userInfo;
    this.getDraftBids(this.users.id);
    this.getBidsLists(this.users.id);
  }
};
</script>
<style scoped lang="scss">

</style>
