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
              <input type="hidden" name="" :value="validate" />
              <v-text-field type="text" hide-details outlined placeholder="Search" prepend-inner-icon="mdi-magnify"
                v-model="searchMember">
              </v-text-field>
            </div>
          </div>
          <div class="companies-list">
            <div class="d-flex align-center justify-space-between list-company pa-4" v-for="(team, index) in teamMembers"
              v-if="user._id !== team._id && team.status !== false" :key="team._id">
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
          {{ filterTeam }}
          <div class="d-flex align-center justify-space-between list-company pa-4" v-for="(team) in membersAdded"
            v-if="user._id !== team._id && team.status !== false" :key="team._id">
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
        </div>
      </v-col>
    </v-row>
    <v-row justify="center" align="center" no-gutters>
      <v-col cols="12" md="12" class="mb-n2">
        <v-btn color="#0D9648" elevation="0" height="56px" width="220px" large
          class="white--text text-capitalize font-weight-bold mt-6 mb-5 save-btn" @click="changeTab"
          :loading="saveBidLoading" :disabled="saveBidLoading">Save Changes</v-btn>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      inviteTeam: null,
      searchMember: '',
      membersAdded: [],
      valid: false,
      user: '',
      oldCount: 0,
      newCount: 0,
    };
  },
  computed: {
    ...mapGetters(['isEditBidChanges', 'saveBidLoading']),
    teamMembers() {
      if (this.$store.getters.bidData && this.$store.getters.bidData.invitedTeamMembers && this.$store.getters.bidData.invitedTeamMembers.length) {
        if (this.searchMember) {
          return this.$store.getters.teamMembers.filter(
            (item) => (this.searchMember
              .toLowerCase()
              .split(' ')
              .every((v) => item.firstName.toLowerCase().includes(v))
              || this.searchMember
                .toLowerCase()
                .split(' ')
                .every((v) => item.lastName.toLowerCase().includes(v))) && item._id !== this.$store.state.bid.bidData.user._id,
          );
        }
     
        const unique = this.$store.getters.teamMembers && this.$store.state.bid.invitedTeamMembers
          ? this.$store.getters.teamMembers.filter(
            (el) => !this.$store.state.bid.invitedTeamMembers.find(
              (team) => {
                if (team._id) {
                  return team._id === el._id;
                }
                return team === el._id;
              },
            ) && el._id !== this.$store.state.bid.bidData.user._id
          )
          : [];

        return [...new Map(unique.map((item) => [item._id, item])).values()];
      }

      if (this.searchMember) {
        return this.$store.getters.teamMembers.filter(
          (item) => (this.searchMember
            .toLowerCase()
            .split(' ')
            .every((v) => item.firstName.toLowerCase().includes(v))
            || this.searchMember
              .toLowerCase()
              .split(' ')
              .every((v) => item.lastName.toLowerCase().includes(v))) && item._id !== this.$store.state.bid.bidData.user._id,
        );
      }

      return this.$store.getters.teamMembers
        ? this.$store.getters.teamMembers.filter((item) => item._id !== this.$store.state.bid.bidData.user._id)
        : [];
    },
    // eslint-disable-next-line vue/return-in-computed-property
    filterTeam() {
      if (this.$store.getters.bidData.invitedTeamMembers && this.$store.getters.bidData.invitedTeamMembers.length) {
        if (Array.isArray(this.$store.state.bid.invitedTeamMembers) && typeof this.$store.state.bid.invitedTeamMembers[0] === 'object') {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          const unique = this.$store.state.bid.invitedTeamMembers
            ? this.$store.state.bid.invitedTeamMembers
            : [];
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.membersAdded = [
            ...new Map(unique.map((item) => [item._id, item])).values(),
          ];
        } else {
          const unique = this.$store.getters.teamMembers
            ? this.$store.getters.teamMembers.filter((el) => this.$store.state.bid.invitedTeamMembers?.includes(el._id))
            : [];
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.membersAdded = [
            ...new Map(unique.map((item) => [item._id, item])).values(),
          ];
        }
      }
    },
    validate() {
      if (this.membersAdded.length > 0) {
        this.$emit('validation', { valid: true, team: '3' });
        return this.valid;
      }
      this.$emit('validation', { valid: false, team: '3' });
      return this.valid;
    },
  },
  methods: {
    ...mapActions([
      'getTeamMembers',
      'getCompanyInfo',
      'updateDraftBid',
      'updateTemplate',
      'updateBid',
    ]),
    async changeTab() {
      if (this.$route.name === 'EditBid') {
        if (this.isEditBidChanges === true) {
          await this.updateBid({ invitedTeamMembers: this.membersAdded });
        }
      } else if (this.$route.name === 'EditTemplate') {
        await this.updateTemplate({ invitedTeamMembers: this.membersAdded });
      } else {
        await this.updateDraftBid({ invitedTeamMembers: this.membersAdded });
      }
      this.$emit('changetab', 'tab-4');
    },
    addMember(member) {
      this.oldCount = this.membersAdded.length;
      this.membersAdded.push(member);

      this.newCount = this.membersAdded.length;
      this.$store.commit('spliceTeamMember', member);
      this.$store.commit('setIsEditBidChanges', true);
      this.$store.commit('setInvitedTeamMembers', this.membersAdded);
    },
    remove(member) {
      this.oldCount = this.membersAdded.length;
      this.$store.commit('pushTeamMember', member);
      this.newCount = this.membersAdded.length;
      const indexToRemove = this.membersAdded.findIndex((obj) => obj._id === member._id);
      this.membersAdded.splice(indexToRemove, 1);
      this.$store.commit('setIsEditBidChanges', true);
      this.$store.commit('setInvitedTeamMembers', this.membersAdded);
    },
    savedraftOnInterval() {
      const timer = setInterval(() => {
        if (this.oldCount !== this.newCount) {
          if (this.$route.name === 'EditBid') {
            if (this.isEditBidChanges === true) {
              this.updateBid({ invitedTeamMembers: this.membersAdded });
            }
          } else if (this.$route.name === 'EditTemplate') {
            this.updateTemplate({ invitedTeamMembers: this.membersAdded });
          } else {
            this.updateDraftBid({ invitedTeamMembers: this.membersAdded });
          }
          this.oldCount = this.newCount;
        }
      }, 60000);

      this.$once('hook:beforeDestroy', () => {
        clearInterval(timer);
      });
    },
  },
  mounted() {
    this.user = this.$store.getters.userInfo;
    this.getTeamMembers(this.$store.getters.userInfo.company._id);
    this.savedraftOnInterval();
  },
};
</script>
