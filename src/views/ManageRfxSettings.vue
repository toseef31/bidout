<template>
    <v-row class="createBid-module manage-rfx pa-0 ma-0">
        <v-col class="pa-0 pr-sm-3" :class="[
            showSideBar ? 'col-md-12 col-12 col-sm-12' : 'mid-content-collapse',
            activityPanel ? 'd-sm-block' : 'd-md-block',
        ]" v-show="!activityPanel">
            <div class="mid-content fill-height">
                <div class="content-section fill-height">
                    <v-row align="center" justify="space-between" class="px-6 mb-2 mt-2 mx-0">
                        <v-col cols="6" class="text-left pl-0">
                            <h2>Create Bid NDA Requirement</h2>
                        </v-col>

                    </v-row>

                    <v-row align="center" class="px-6  justify-start mx-16">
                        <v-col cols="5">
                            <div class=" font-weight-bold text-left">Require All Suppliers to Sign NDA</div>
                        </v-col>
                        <v-col cols="6">
                            <v-checkbox color="#0D9648" v-model="selected"></v-checkbox>
                        </v-col>

                    </v-row>
                    <v-row align="center" class="px-6 mb-4 justify-start mx-16">
                        <v-col cols="5">
                            <div class=" font-weight-bold text-left">Upload document</div>
                        </v-col>
                        <v-col cols="4">
                            <v-file-input color="#0D9648" chips multiple label="Upload here"></v-file-input>
                        </v-col>

                    </v-row>
                    <v-row align="center" class="px-6 mb-4 justify-start mx-16">
                        <v-col cols="auto" class="mr-auto">

                        </v-col>
                        <v-col cols="auto">
                            <v-btn width="150" height="40" color="#0D9648" outlined>
                                <v-progress-circular v-if="false" indeterminate :width="3" size="25"
                                    color="#0D9648"></v-progress-circular>
                                <div v-else class="text-capitalize">Save</div>
                            </v-btn>
                        </v-col>

                    </v-row>

                </div>
            </div>
        </v-col>
    </v-row>
</template>

<script>
import { mapActions } from 'vuex';
import moment from 'moment-timezone';
import Navbar from '../components/Layout/Navbar.vue';
import LeftSidebar from '../components/Layout/Dashboard/LeftSidebar.vue';
import RightSidebar from '../components/Layout/Dashboard/RightSidebar.vue';

export default {
    name: 'ManageRFxSettings',
    components: {
        Navbar,
        LeftSidebar,
        RightSidebar,
    },
    data() {
        return {
            users: '',
            selected: false,
        };
    },
    computed: {
        showSideBar() {
            return this.$store.getters.g_sideBarOpen;
        },
        activityPanel() {
            return this.$store.getters.g_activityPanel;
        },
    },
    mounted() {
        document.title = 'Manage RFx Settings - BidOut';
        this.users = this.$store.getters.userInfo;
    },
};
</script>

<style scoped lang="scss"></style>
