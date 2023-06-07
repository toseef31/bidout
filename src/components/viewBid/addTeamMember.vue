<template>
  <div>
    <v-row class="supplier-row fill-height" no-gutters>
      <v-col cols="12" sm="6" class="available-data">
        <div class="d-flex justify-space-between align-center pl-4 pa-3 supplier-head">
          <div>
            <h4 class="mb-0 black--text font-weight-bold">
              Invite Team Members
            </h4>
          </div>
        </div>

        <div>
          <div class="available-search mt-5 px-4">
            <div>
              <v-text-field type="text" hide-details outlined placeholder="Search" prepend-inner-icon="mdi-magnify"
                v-model="searchMember">
              </v-text-field>
            </div>
          </div>
          <div class="companies-list">
            <div class="d-flex align-center justify-space-between list-company pa-4" v-for="(team, index) in teamMembers"
              v-if="user._id !== team._id && team.status !== false" :key="index">
              <div class="comapny-data d-flex align-center">
                <div class="company-img">
                  <img v-if="!team.image" :src="require('@/assets/images/chat/chatUser.png')" width="48px"
                    height="48px" />
                  <img v-else :src="team.image" width="48px" height="48px" />
                </div>
                <div class="company-title text-left pl-4">
                  <h4>{{ team.firstName }} {{ team.lastName }}</h4>
                  <p class="mb-0">{{ team.company.companyName }}</p>
                </div>
              </div>
              <div class="add-company">
                <v-btn color="rgba(13, 150, 72, 0.1)" tile min-width="32px" height="32" class="pa-0" elevation="0"
                  @click="addMember(team)">
                  <v-icon color="#0D9648">mdi-plus</v-icon></v-btn>
              </div>
            </div>
          </div>
        </div>
      </v-col>
      <v-col cols="12" sm="6" class="invited-data available-data">
        <div class="d-flex justify-space-between align-center pl-4 py-3 invited-head">
          <div>
            <h4 class="mb-0 black--text font-weight-bold">Added</h4>
          </div>
        </div>
        <div class="companies-list">
          <div class="d-flex align-center justify-space-between list-company pa-4" v-for="(team, index) in filterTeam"
            v-if="user._id !== team._id && team.status !== false && filterTeam.length
              " :key="index">

            <div class="comapny-data d-flex align-center">
              <div class="company-img">
                <img v-if="!team.image" :src="require('@/assets/images/chat/chatUser.png')" />
                <img v-else :src="team.image" width="48px" height="48px" />
              </div>
              <div class="company-title text-left pl-4">
                <h4>{{ team.firstName }} {{ team.lastName }}</h4>
              </div>
            </div>
            <div class="add-company">
              <v-btn color="rgba(243, 35, 73, 0.1)" tile min-width="32px" height="32" class="pa-0" elevation="0"
                @click="remove(team)">
                <v-icon color="#F32349">mdi-minus</v-icon></v-btn>
            </div>
          </div>

          <div class="text-center mt-10 no-team-class" v-if="filterTeam.length === 0">
            No team member added.
          </div>
        </div>
      </v-col>
    </v-row>

    <v-row justify="center" align="center" no-gutters>
      <div class="mb-n2 align-center justify-center">
        <v-btn color="#0D9648" elevation="0" height="56px" width="220px" large :loading="getTeamLoading"
          :disabled="getTeamLoading" class="white--text text-capitalize font-weight-bold mt-6 mb-5 save-btn"
          @click="saveTeam">Save Changes</v-btn>
      </div>
    </v-row>
  </div>
</template>
<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      searchMember: '',
      user: '',
      teamLoading: false,
    };
  },
  computed: {
    bidDetail() {
      return this.$store.getters.bidViewData;
    },
    teamMembers() {
      if (
        this.$store.getters.teamMembersForBid
        && this.$store.getters.teamMembersForBid.length
      ) {
        if (this.searchMember) {
          const unique = this.$store.getters.teamMembersInitial.filter(
            (item) => this.searchMember
              .toLowerCase()
              .split(' ')
              .every((v) => item.firstName.toLowerCase().includes(v))
              || this.searchMember
                .toLowerCase()
                .split(' ')
                .every((v) => item.lastName.toLowerCase().includes(v)),
          );
          return [...new Map(unique.map((item) => [item.id, item])).values()];
        }
        const unique = this.$store.getters.teamMembersInitial
          ? this.$store.getters.teamMembersInitial.filter(
            (el) => !this.$store.getters.teamMembersForBid.find(
              (team) => team._id === el._id,
            ),
          )
          : [];

        return [...new Map(unique.map((item) => [item._id, item])).values()];
      }

      if (this.searchMember) {
        return this.$store.getters.teamMembersInitial.filter(
          (item) => this.searchMember
            .toLowerCase()
            .split(' ')
            .every((v) => item.firstName.toLowerCase().includes(v))
            || this.searchMember
              .toLowerCase()
              .split(' ')
              .every((v) => item.lastName.toLowerCase().includes(v)),
        );
      }
      return this.$store.getters.teamMembersInitial ? this.$store.getters.teamMembersInitial : [];
    },
    filterTeam() {
      const unique = this.$store.getters.teamMembersForBid;

      return unique && unique.length
        ? [...new Map(unique.map((item) => [item._id, item])).values()]
        : [];
    },
    getTeamLoading() {
      return this.teamLoading;
    },
  },
  methods: {
    ...mapActions(['addTeamMemberToBid']),
    async saveTeam() {
      let teamIds = [];
      this.teamLoading = true;

      this.$store.getters.teamMembersForBid.forEach((el) => teamIds.push(el._id));

      teamIds = [...new Set(teamIds)];

      await this.addTeamMemberToBid({
        userId: this.user._id,
        bidId: this.bidDetail.bidData._id,
        teamMembersIds: teamIds,
        serial: this.$route.params.serial,
        company: this.user.company,
      });

      this.teamLoading = false;

      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    addMember(member) {
      this.$store.commit('spliceTeamMembersInitial', member._id);

      this.$store.commit('pushTeamMembersForBid', member);
    },
    remove(member) {
      this.$store.commit('spliceTeamMembersForBid', member._id);
      this.$store.commit('pushTeamMembersInitial', member);
    }
  },
  mounted() {
    this.user = this.$store.getters.userInfo;
  },
};
</script>
