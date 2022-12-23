<template>
   <v-col class="createBid-module bids-module pa-0 pa-sm-3 pl-sm-0 pb-sm-0" :class="[ showSideBar ? 'col-md-9 col-12 col-sm-7' : 'mid-content-collapse', activityPanel ? 'd-sm-block' : 'd-md-block']" v-show="!activityPanel">
      <div class="mid-content">
        <v-row fill-height align="center" class="fill-height content-section" v-if="loading">
          <v-col cols="12">
            <v-progress-circular :width="3" color="green" indeterminate ></v-progress-circular>
          </v-col>
        </v-row>
        <div class="content-section fill-height mb-1 pb-1" v-else>
          <v-alert type="success"  v-show="showSuccessDeleteBidAlert" class="mx-5 mt-3">
            You have successfully deleted this bid!
          </v-alert>
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

                  <v-tab class="text-capitalize font-weight-bold mr-8" :href="'#tab-0'" @click="tabValue('1')" ripple rounded

                  >
                  Open Bids {{openBids.length}}
                  </v-tab>
                  <v-tab class="text-capitalize font-weight-bold mr-8" :href="'#tab-1'" @click="tabValue('2')" ripple rounded

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
                      <th class="text-left pl-sm-6 black--text font-weight-bold" width="84px">
                        Bid ID
                      </th>
                      <th class="text-left black--text font-weight-bold">
                        Title
                      </th>
                      <th class="text-left black--text font-weight-bold" width="150px">
                        Creator
                      </th>
                      <!-- <th class="text-left black--text font-weight-bold">
                        Entries
                      </th> -->
                      <th class="text-left black--text font-weight-bold" width="145px">
                        End Date/Time
                      </th>
                      <th class="text-left black--text font-weight-bold" width="100px">
                        <span class=" d-none d-sm-block">Action</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>

                    <tr class="company-link" 
                      v-for="bid in openBids"
                      :key="bid.id" @click="redirectBid(bid.serial)"
                    >
                      <td class="text-left pl-sm-6" width="84px">{{ bid.serial }}</td>
                      <td class="text-left title-truncate">{{ bid.title }}</td>
                      <td class="text-left" width="150px">{{ checkIfUserIsSupplier(bid) ? bid.company : `${userDatas.firstName} ${ userDatas.lastName}` }}</td>
                      <!-- <td class="text-left" width="50px">{{ bid.bidEntries }}</td> -->
                      <td class="text-left" width="145px">{{ bid.dueDate | moment('MM/DD/YYYY') }} {{bid.dueTime}}</td>
                      <td class="text-left d-none d-sm-block pt-3" width="100px"><router-link
                        :to="{
                          path: `/view-bids/${bid.serial}`,
                        }"
                        >View Bid</router-link
                      ></td>
                      <td class="text-left d-flex d-sm-none align-center">
                        <router-link class="text-decoration-none" :to="{
                          path: `/view-bids/${bid.serial}`,
                        }"> 
                          <span class=""><v-icon>mdi-chevron-right</v-icon></span> 
                        </router-link>
                        
                      </td>
                    </tr>
                    <tr class="draft-title pl-sm-3">
                      <td colspan="6" class="text-left pl-sm-6"><h3 class="font-weight-bold">Draft Bids <font color="#B8B8B8">({{draftBidsList.length}})</font></h3></td>
                    </tr>
                    <template v-if="draftBidsList">
                      <tr class="company-link"
                      v-for="bid in draftBidsList"
                      :key="bid.id"  @click="editDraft(bid.serial)"
                    >
                      <td class="text-left pl-sm-6" width="84px">{{ bid.serial }}</td>
                      <td class="text-left title-truncate">{{ bid.title }}</td>
                      <td class="text-left" width="150px">{{ userDatas.firstName }} {{ userDatas.lastName }}</td>
                      <!-- <td class="text-left" width="50px">{{ bid.bidEntries ? bid.bidEntries : 0 }}</td> -->
                      <td class="text-left" width="145px">{{ bid.dueDate | moment('MM/DD/YYYY') }} {{bid.dueTime}}</td>
                      <td class="text-left d-none d-sm-block pt-3" @click="editDraft(bid.serial)"  width="100px"><router-link to="">Edit Draft</router-link></td>
                      <td class="text-left d-flex d-sm-none align-center" @click="editDraft(bid.serial)">
                        <span class=""><v-icon>mdi-square-edit-outline</v-icon></span> 
                      </td>
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
                      <!-- <th class="text-left black--text font-weight-bold">
                        Entries
                      </th> -->
                      <th class="text-left black--text font-weight-bold">
                        End Date/Time
                      </th>
                      <th class="text-left black--text font-weight-bold" width="100px">
                        <span class=" d-none d-sm-block">Action</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="company-link" 
                      v-for="bid in closedBids"
                      :key="bid.id" @click="redirectBid(bid.serial)"
                    >
                      <td class="text-left pl-sm-6" width="60px">{{ bid.serial }}</td>
                      <td class="text-left title-truncate">{{ bid.title }}</td>
                      <td class="text-left" width="150px"> {{ checkIfUserIsSupplier(bid) ? bid.company : `${userDatas.firstName} ${ userDatas.lastName}` }} </td>
                      <!-- <td class="text-left" width="50px">{{ bid.bidEntries }}</td> -->
                      <td class="text-left" width="100px">{{ bid.dueDate | moment('MM/DD/YYYY') }} {{bid.dueTime}}</td>
                      <td class="text-left d-none d-sm-block pt-3" width="100px">
                        <router-link
                          :to="{
                            path: `/view-bids/${bid.serial}`,
                          }"
                        >View Bid</router-link>
                      </td>
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
import { mapActions, mapGetters } from 'vuex';
import Navbar from '../../components/Layout/Navbar.vue';
import LeftSidebar from '../../components/Layout/Dashboard/LeftSidebar.vue';
import RightSidebar from '../../components/Layout/Dashboard/RightSidebar.vue';
import _ from 'lodash'
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
      items: [],
      tabVal: 1,
    };
  },
  computed: {
    ...mapGetters(["bidsList"]),
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
        if (this.searchBid && this.tabVal == '1') {
          return _.orderBy(this.$store.getters.draftBidsList.filter((item) => {
              return this.searchBid
            .toLowerCase()
            .split(' ')
            .every((v) => item.title.toLowerCase().includes(v))
          }),['dueDate','asc','dueTime','asc']);
        }else{
          return _.orderBy(this.$store.getters.draftBidsList,['dueDate','asc','dueTime','asc']);
        }
      }
    },
    openBids(){
      if (this.$store.getters.bidsList.length > 0) {
        if (this.searchBid && this.tabVal == '1') {
          return _.orderBy(this.$store.getters.bidsList.filter((item) => {
            if(item.receivingBids == true){
              return this.searchBid
            .toLowerCase()
            .split(' ')
            .every((v) => item.title.toLowerCase().includes(v))
            }
          }),['dueDate','asc','dueTime','asc']);
        }
          return _.orderBy(this.$store.getters.bidsList.filter((item) => {
            return item.receivingBids == true
          }),['dueDate','asc','dueTime','asc']);
        
      } else {
        return [];
      }
    },
    closedBids(){
      if (this.$store.getters.bidsList.length > 0) {
        if (this.searchBid && this.tabVal == '2') {
          return _.orderBy(this.$store.getters.bidsList.filter((item) => {
            if(item.receivingBids == false){
              return this.searchBid
            .toLowerCase()
            .split(' ')
            .every((v) => item.title.toLowerCase().includes(v)) 
            }
          }),['dueDate','asc','dueTime','asc']);
        }
          return _.orderBy(this.$store.getters.bidsList.filter((item) => {
            return item.receivingBids == false
          }),['dueDate','asc','dueTime','asc']);
        
      } else {
        return [];
      }
    },
    showSuccessDeleteBidAlert() {
      return this.$store.getters.showSuccessDeleteBid;
    },
    loading(){
      return this.$store.getters.pageLoader;
    }
  },
  methods: {
    ...mapActions(['getDraftBids', 'getBidsLists','getDraftBySerial']),
    editDraft(serial){
      this.getDraftBySerial({serial,company:this.$store.getters.userInfo.company.company});
    },
    checkIfUserIsSupplier(bid) {
      if (bid.invitedSuppliers) {
        const found = bid.invitedSuppliers.find((el) => el === this.users.companyId);
        if (found) {
          return true;
        }
        return false;
      }
      return false;
    },
    redirectBid(serial){
      this.$router.push(`/view-bids/${serial}`);
    },
    tabValue(value){
      this.tabVal = value;
    }
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
