<template>
  <v-row class="createBid-module pa-0 ma-0">
    <v-col class="pa-0 pr-sm-3"
      :class="[showSideBar ? 'col-md-12 col-12 col-sm-12' : 'mid-content-collapse', activityPanel ? 'd-sm-block' : 'd-md-block']"
      v-show="!activityPanel">
      <div class="mid-content">
        <div class="content-section fill-height d-flex justify-center align-center" v-if="loading">
          <v-progress-circular :width="3" color="green" indeterminate></v-progress-circular>
        </div>
        <div class="content-section fill-height" v-else>
          <v-row align="center" justify="space-between" class="px-6 mb-4 mt-2 mx-0">
            <v-col cols="6" class="text-left pl-0">
              <h4>Templates</h4>
            </v-col>
            <v-col cols="6" class="text-right pr-0">
              <p class="mb-0"><router-link to="/manage-templates">Manage Templates</router-link></p>
            </v-col>
          </v-row>
          <v-simple-table class="template-table">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left pl-6">
                    Template Name
                  </th>
                  <th class="text-left">
                    Type
                  </th>
                  <th class="text-left">
                    Created Data
                  </th>
                  <th class="text-left">
                    Creator
                  </th>
                  <th class="text-left">
                    Notes
                  </th>
                  <th class="text-left pr-6">

                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(template, index) in bidTemplates" class="py-4 px-6"
                  v-if="template.companyId == userDatas.company.id">
                  <td class="text-left pl-6">{{ template.title }}</td>
                  <td class="text-left">{{ template.type }}</td>
                  <td class="text-left">{{ formatDate(template.createdAt._seconds, template.createdAt._nanoseconds) }}
                  </td>
                  <td class="text-left">{{ template.userName ? template.userName : 'No name' }}</td>
                  <td class="text-left">{{ template.note ? template.note : 'Note not added yet.' }}</td>
                  <td class="text-left pr-6">

                    <v-btn color="#0D9648" elevation="0" class="white--text text-capitalize"
                      @click="useTemplate(template)">Use Template</v-btn>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </div>
      </div>
    </v-col>
  </v-row>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import moment from 'moment-timezone';
import Navbar from '../../components/Layout/Navbar.vue';
import LeftSidebar from '../../components/Layout/Dashboard/LeftSidebar.vue';
import RightSidebar from '../../components/Layout/Dashboard/RightSidebar.vue';

export default {
  name: 'Template',
  components: {
    Navbar,
    LeftSidebar,
    RightSidebar,
  },

  data() {
    return {
      users: '',
    };
  },
  computed: {
    ...mapGetters(['bidTemplates']),
    showSideBar() {
      return this.$store.getters.g_sideBarOpen;
    },
    activityPanel() {
      return this.$store.getters.g_activityPanel;
    },
    userDatas() {
      return this.$store.getters.userInfo;
    },
    loading() {
      return this.$store.getters.pageLoader;
    },
  },
  methods: {
    ...mapActions(['getBidTemplates']),
    async useTemplate(template) {
      this.$store.commit('setBidData', template);
      this.$store.state.bid.bidData.statusType = 'templateBid';
      await this.$store.dispatch('getTeamMembers', this.userDatas.company.company);
      await this.$store.dispatch('getSalesReps', { query: '', basin: 'all' });
      await this.$store.dispatch('getCategories');
      await this.$store.dispatch('searchByCompany', { query: '', basin: 'all' });
      this.$router.push('/create-bid/');
    },
    formatDate(item, item2) {
      const date = moment(item * 1000 + item2 / 1000000).tz('America/Chicago').format('MM/DD/YYYY');

      return date;
    },
  },
  async created() {
    await this.getBidTemplates();
  },
  mounted() {
    document.title = 'Create Bid - BidOut';
    this.users = this.$store.getters.userInfo;
  },
};
</script>
<style scoped lang="scss"></style>
