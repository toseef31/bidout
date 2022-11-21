<template>

   <v-col class="createBid-module bids-module pa-0 pa-sm-3 pl-sm-0 pb-sm-0" :class="[ showSideBar ? 'col-md-9 col-12 col-sm-7' : 'mid-content-collapse', activityPanel ? 'd-sm-block' : 'd-md-block']" v-show="!activityPanel">
      <div class="mid-content">
        <div class="content-section fill-height">
          <div class="title-block d-block d-sm-flex justify-space-between pa-4 pa-sm-6 align-center">
            <div>
              <h3 class="font-weight-bold text-left mb-4 mb-sm-0">All Bids <font color="#B8B8B8">({{bidsList.length}})</font></h3>
            </div>
            <div class="d-block d-sm-flex align-center">
              <v-tabs
                  v-model="tab" class="bid-tab mb-4 mb-sm-0"
                   hide-slider centered center-active mobile-breakpoint
                >
                  <v-tabs-slider color="yellow"></v-tabs-slider>

                  <v-tab class="text-capitalize font-weight-bold mr-8" :href="'#tab-0'" ripple rounded

                  >
                  Open Bids {{openBids.length}}
                  </v-tab>
                  <v-tab class="text-capitalize font-weight-bold mr-8" :href="'#tab-1'" ripple rounded

                  >
                  Closed Bids {{closedBids.length}}
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
              <v-simple-table class="bids-table open-bid-table">
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
                        End Date/Time
                      </th>
                      <th class="text-left black--text font-weight-bold">
                        <span class=" d-none d-sm-block">Action</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="bid in openBids"
                      :key="bid.id"
                    >
                      <td class="text-left pl-sm-6">{{ bid.serial }}</td>
                      <td class="text-left">{{ bid.title }}</td>
                      <td class="text-left">{{ userDatas.firstName }} {{ userDatas.lastName }}</td>
                      <td class="text-left">{{ bid.entries ? bid.entries.length : 0 }}</td>
                      <td class="text-left">{{ bid.dueDate | moment('MM/DD/YYYY') }} {{bid.dueTime}}</td>
                      <td class="text-left d-none d-sm-block pt-3"><router-link
                        :to="{
                          path: `/view-bids/${bid.serial}`,
                        }"
                        >View Bid</router-link
                      ></td>
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
                    <template v-if="draftBidsList">
                      <tr
                      v-for="bid in draftBidsList"
                      :key="bid.id"
                    >
                      <td class="text-left pl-sm-6">{{ bid.serial }}</td>
                      <td class="text-left">{{ bid.title }}</td>
                      <td class="text-left">{{ userDatas.firstName }} {{ userDatas.lastName }}</td>
                      <td class="text-left">{{ bid.entries ? bid.entries.length : 0 }}</td>
                      <td class="text-left">{{ bid.dueDate | moment('MM/DD/YYYY') }} {{bid.dueTime}}</td>
                      <td class="text-left d-none d-sm-block pt-3"><a href="">Edit Draft</a></td>
                    </tr>
                    </template>
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
                        End Date/Time
                      </th>
                      <th class="text-left black--text font-weight-bold">
                        <span class=" d-none d-sm-block">Action</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="bid in closedBids"
                      :key="bid.id"
                    >
                      <td class="text-left pl-sm-6">{{ bid.serial }}</td>
                      <td class="text-left">{{ bid.title }}</td>
                      <td class="text-left">{{ userDatas.firstName }} {{ userDatas.lastName }}</td>
                      <td class="text-left">{{ bid.entries ? bid.entries.length : 0 }}</td>
                      <td class="text-left">{{ bid.dueDate | moment('MM/DD/YYYY') }} {{bid.dueTime}}</td>
                      <td class="text-left d-none d-sm-block pt-3"><a href="">View Bid</a></td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-tab-item>
          </v-tabs-items>
        </div>

      </div>
    </div>
  </v-col>
</template>
<script>
import { mapActions } from 'vuex';
import Navbar from '../../components/Layout/Navbar.vue';
import LeftSidebar from '../../components/Layout/Dashboard/LeftSidebar.vue';
import RightSidebar from '../../components/Layout/Dashboard/RightSidebar.vue';

export default {
  name: 'ViewBids',
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
      openBids: [],
      closedBids: [],
      items: [],
    };
  },
  computed: {
    showSideBar() {
      return this.$store.getters.g_sideBarOpen;
    },
    activityPanel() {
      return this.$store.getters.g_activityPanel;
    },
    userDatas() {
      return this.$store.getters.userInfo;
    },
    draftBidsList() {
      if (this.$store.getters.draftBidsList) {
        return this.$store.getters.draftBidsList;
      }
    },
    bidsList() {
      if (this.$store.getters.bidsList.length > 0) {
        this.$store.getters.bidsList.filter((item) => {
          if (!item.status) {
            const found = this.openBids.find((el) => el.id === item.id);
            if (!found) this.openBids.push(item);
          } else {
            const foundC = this.closedBids.find((el) => el.id === item.id);

            if (!foundC) this.closedBids.push(item);
          }
        });

        if (this.searchBid) {
          console.log(this.searchBid);
          console.log(this.openBids);
          this.openBids = this.openBids.filter((item) => {
            console.log(this.searchBid
              .toLowerCase()
              .split(' ')
              .every((v) => item.title.toLowerCase().includes(v)));
            return this.searchBid
              .toLowerCase()
              .split(' ')
              .every((v) => item.title.toLowerCase().includes(v) || item.title.);
          });
        }
        return this.$store.getters.bidsList;
      }
      return [];
    },
  },
  methods: {
    ...mapActions(['getDraftBids', 'getBidsLists']),
  },
  mounted() {
    document.title = 'Bids - BidOut';
    this.users = this.$store.getters.userInfo;
    this.getDraftBids(this.users.id);
    this.getBidsLists(this.users.id);
  },
};
</script>
<style scoped lang="scss"></style>
