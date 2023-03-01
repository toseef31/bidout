<template>
    <div>
        <v-row class="supplier-row fill-height" no-gutters>
            <v-col cols="12" sm="6" class="available-data">
                <div class="d-flex justify-space-between align-center pl-4 pa-3 supplier-head">
                    <div>
                        <h4 class="mb-0 black--text font-weight-bold">Invite Team Members</h4>
                    </div>

                </div>

                <div>
                    <div class="available-search mt-5 px-4">
                        <div>
                            <v-text-field type="text" hide-details outlined placeholder="Search"
                                prepend-inner-icon="mdi-magnify" v-model="searchMember">
                            </v-text-field>
                        </div>
                    </div>
                    <div class="companies-list">
                        <div class="d-flex align-center justify-space-between list-company pa-4"
                            v-for="(team, index) in teamMembers" v-if="user.id !== team.id && team.status !== false"
                            :key="index">
                            <div class="comapny-data d-flex align-center">
                                <div class="company-img">
                                    <img v-if="!team.image" :src="require('@/assets/images/chat/chatUser.png')" width="48px"
                                        height="48px">
                                    <img v-else :src="team.image" width="48px" height="48px">
                                </div>
                                <div class="company-title text-left pl-4">
                                    <h4>{{ team.firstName }} {{ team.lastName }}</h4>
                                    <p class="mb-0">{{ team.company }}</p>
                                </div>
                            </div>
                            <div class="add-company">
                                <v-btn color="rgba(13, 150, 72, 0.1)" tile min-width="32px" height="32" class="pa-0"
                                    elevation="0" @click="addMember(team, index)"> <v-icon
                                        color="#0D9648">mdi-plus</v-icon></v-btn>
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
                    <div class="d-flex align-center justify-space-between list-company pa-4"
                        v-for="(team, index) in membersAdded" v-if="user.id !== team.id && team.status !== false"
                        :key="index">
                        <div class="comapny-data d-flex align-center">
                            <div class="company-img">
                                <img v-if="!team.image" :src="require('@/assets/images/chat/chatUser.png')">
                                <img v-else :src="team.image" width="48px" height="48px">
                            </div>
                            <div class="company-title text-left pl-4">
                                <h4>{{ team.firstName }} {{ team.lastName }}</h4>
                                <p class="mb-0">{{ team.company }} </p>
                            </div>
                        </div>
                        <div class="add-company">
                            <v-btn color="rgba(243, 35, 73, 0.1)" tile min-width="32px" height="32" class="pa-0"
                                elevation="0" @click="remove(team, index)"> <v-icon
                                    color="#F32349">mdi-minus</v-icon></v-btn>
                        </div>
                    </div>
                </div>
            </v-col>
        </v-row>
        {{ hey }}
        <v-row justify="center" align="center" no-gutters>
            <div class="mb-n2 align-center justify-center">
                <v-btn color="#0D9648" elevation="0" height="56px" width="220px" large :loading="getTeamLoading"
                    :disabled="getTeamLoading" class="white--text text-capitalize font-weight-bold mt-6 mb-5 save-btn"
                    @click="saveTeam">Save
                    Changes</v-btn>
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
            membersAdded: [],
            user: '',
            teamLoading: false,
        };
    },
    computed: {
        bidDetail() {
            return this.$store.getters.bidViewData;
        },
        hey() {
            console.log('INV - ', this.$store.getters.teamMembers);
            console.log('BID - ', this.bidDetail.bidData.invitedTeamMembers);
            console.log('STATE - ', this.$store.getters.invitedTeamMembers);
        },
        teamMembers() {
            if (this.bidDetail.bidData !== null) {
                if (this.bidDetail.bidData.invitedTeamMembers !== '') {
                    if (this.searchMember) {
                        return this.$store.getters.teamMembers.filter((item) => (this.searchMember.toLowerCase().split(' ').every((v) => item.firstName.toLowerCase().includes(v)) || this.searchMember.toLowerCase().split(' ').every((v) => item.lastName.toLowerCase().includes(v))));
                    }
                    console.log(this.$store.getters.teamMembers ? this.$store.getters.teamMembers.filter((el) => !this.bidDetail.bidData.invitedTeamMembers.find((team) => team.id === el.id)) : []);
                    console.log('HHHHH');

                    return this.$store.getters.teamMembers ? this.$store.getters.teamMembers.filter((el) => !this.bidDetail.bidData.invitedTeamMembers.find((team) => team.id === el.id)) : [];
                }
                return this.$store.getters.teamMembers;
            }
            if (this.searchMember) {
                return this.$store.getters.teamMembers.filter((item) => (this.searchMember.toLowerCase().split(' ').every((v) => item.firstName.toLowerCase().includes(v)) || this.searchMember.toLowerCase().split(' ').every((v) => item.lastName.toLowerCase().includes(v))));
            }
            return this.$store.getters.teamMembers ? this.$store.getters.teamMembers : [];
        },
        filterTeam() {
            if (this.bidDetail.bidData.invitedTeamMembers !== '') {
                this.membersAdded = this.$store.getters.teamMembers ? this.$store.getters.teamMembers.filter((el) => this.$store.getters.invitedTeamMembers.find((team) => team.id === el.id)) : [];

                console.log('MM - ', this.membersAdded);
            }
        },
        getTeamLoading() {
            return this.teamLoading;
        },
    },
    methods: {
        ...mapActions(['addTeamMemberToBid']),
        async saveTeam() {
            const teamIds = [];
            this.teamLoading = true;

            this.membersAdded.forEach((el) => teamIds.push(el.id));

            await this.addTeamMemberToBid({
                userId: this.user.id,
                bidId: this.bidDetail.bidData.id,
                teamMembersIds: teamIds,
                serial: this.$route.params.serial,
            });

            this.teamLoading = false;

            window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        addMember(member, index) {
            this.membersAdded.push(member);

            this.$store.commit('spliceTeamMember', index);

            this.$store.commit('setInvitedTeamMembers', this.membersAdded);
        },
        remove(member, index) {
            this.$store.commit('pushTeamMember', member);
            this.membersAdded.splice(index, 1);

            this.$store.commit('setInvitedTeamMembers', this.membersAdded);
        },
    },
    mounted() {
        this.user = this.$store.getters.userInfo;
    },
};
</script>
