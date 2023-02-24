<template>
    <v-row fill-height align="center" class="bid-alert" v-if="getPageLoading || getViewBidError">
        <v-col cols="12">
            <v-progress-circular v-if="getPageLoading" :width="3" color="green" indeterminate></v-progress-circular>
            <div class="alert-section" v-if="getViewBidError && !getPageLoading">
                <div class="error-title mb-5">
                    <h1 class="font-weight-bold">Opps!</h1>
                    <h1 class="font-weight-medium">This page is not available.</h1>
                </div>

                <div class="btn-section mt-8 mb-16 pb-16">
                    <a class="text-decoration-none" href="https://bidout.app"><v-btn large outlined color="#0D9647"
                            height="52" class="mr-5 font-weight-bold text-capitalize">Access Homepage</v-btn></a>
                    <router-link to="/dashboard" class="text-decoration-none"><v-btn large outlined color="#0D9647"
                            class="font-weight-bold text-capitalize" height="52">Access Dashboard</v-btn></router-link>
                </div>
            </div>

        </v-col>
    </v-row>
    <v-col v-else class="pl-0 pr-3 pb-0 pt-0 bid-detail-module  ">
        <v-card class="fill-height main-card" :elevation="0">
            <v-row class="px-5 my-5 row-title" no-gutters>
                <v-col>
                    <div class="pa-1 text-left text--primary">
                        <div class="font-weight-bold text--primary bid-title">
                            {{ bidDetail.bidData.title }}
                        </div>

                        <div class="detail">
                            <div>
                                Bid: <span class="serial">#{{ bidDetail.bidData.serial }}</span>
                            </div>
                            <div>
                                Due Date/Time: {{ formatDate(bidDetail.bidData.dueDate) }} @
                                {{ bidDetail.bidData.dueTime }} CST
                            </div>
                            <div>
                                Created by: <strong>{{ bidDetail.bidData.company }}</strong>, {{
                                    bidDetail.bidData.userId.firstName }}
                                {{ bidDetail.bidData.userId.lastName }}
                            </div>
                            <div>Bid Type: {{ bidDetail.bidData.type }}</div>
                        </div>
                    </div>
                </v-col>

                <v-col class="status-sec mx-auto">
                    <v-sheet class="py-2 px-4 bid-status-card text-left" rounded="lg" height="119" width="300">
                        <div class="status">
                            Status: Receiving Bids
                        </div>
                        <div class="time pt-2 align-center">
                            <v-icon small color="#0D9648"> mdi-timer-outline</v-icon>
                            {{ days }} days, {{ hours }} hours, {{ minutes }} min,
                            {{ seconds }} sec remaining
                        </div>

                        <v-divider color="#0D9648"></v-divider>
                        <div class="bid-number">
                            {{ noOfBidSubmitted }} Bids Received
                        </div>
                    </v-sheet>
                </v-col>

                <v-col cols="auto">
                </v-col>
            </v-row>
            <div class="text-left edit-bid-time">
                <p class="time-title">Edit Due Date & Time</p>

                <v-form ref="form" v-model="valid">

                    <v-row>
                        <v-col cols="12" sm="4" text="left">
                            <label class="d-block text-left input-label mb-2 font-weight-bold">Due Date </label>
                            <v-text-field placeholder="Due Date" single-line outlined type="date" v-model="dueDate"
                                :rules="dueDateRules"
                                :min="new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().slice(0, 10)"
                                append-icon="mdi-calendar">
                            </v-text-field>

                        </v-col>
                        <v-col cols="12" sm="4" text="left">
                            <label class="d-block text-left input-label mb-2 font-weight-bold">Due Time </label>
                            <v-select outlined :items="time" item-text="label" item-value="value" v-model="dueTime"
                                :rules="dueTimeRules">

                            </v-select>
                        </v-col>

                    </v-row>

                    <v-row>
                        <v-col cols="12" sm="3">
                            <v-btn color="#0D9648" elevation="0" height="56px" width="220px" large :disabled="getLoading"
                                :loading="getLoading" class="white--text text-capitalize font-weight-bold save-btn"
                                @click="saveChanges">Save
                                Changes</v-btn>
                        </v-col>
                    </v-row>

                </v-form>
            </div>
        </v-card>
    </v-col>
</template>

<script>
import moment from 'moment-timezone';
import { mapActions } from 'vuex';

export default {
    name: 'UpdateDueDate',
    data() {
        return {
            users: '',
            actualTime: moment.tz('America/Chicago').format('X'),
            years: 0,
            months: 0,
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            dueTimeRules: [
                (v) => !!v || 'Please select due time',
            ],
            dueDateRules: [
                (v) => !!v || 'Due date is required',
                (v) => {
                    const currentDate = moment.tz('America/Chicago');
                    const momentDueDate = moment.tz(v, 'America/Chicago');

                    if (moment(momentDueDate).isBefore(currentDate)) return 'Due Date cannot be today or in the past';

                    return true;
                },
            ],
            time: [
                { label: '1pm CST', value: '1pm' },
                { label: '2pm CST', value: '2pm' },
                { label: '3pm CST', value: '3pm' },
                { label: '4pm CST', value: '4pm' },
            ],
            valid: true,
            loading: false,
            dueDate: '',
            dueTime: '',
        };
    },
    methods: {
        ...mapActions(['getBidBySerial', 'changeBidDate']),
        addOneSecondToActualTimeEverySecond() {
            const component = this;
            component.actualTime = moment.tz('America/Chicago').format('X');
            setTimeout(() => {
                component.addOneSecondToActualTimeEverySecond();
            }, 1000);
        },
        getDiffInSeconds() {
            const bidDueDate = this.bidDetail.bidData.dueDate;
            const bidDueTime = this.bidDetail.bidData.dueTime;
            const momentTime = moment(bidDueTime, ['h:mm:ss A ']).format('HH:mm:ss');

            const stringDate = `${bidDueDate}T${momentTime}`;

            let momentDueDate = moment.tz(stringDate, 'America/Chicago');

            if (this.bidDetail.bidData.type === 'BidOut Process' && !this.bidDetail.bidout && this.bidDetail.receivingBids) {
                momentDueDate = momentDueDate.subtract(4, 'hours');
            }

            return moment.tz(momentDueDate, 'America/Chicago').format('X') - this.actualTime;
        },
        compute() {
            const duration = moment.duration(this.getDiffInSeconds(), 'seconds');
            this.years = duration.years() > 0 ? duration.years() : 0;
            this.months = duration.months() > 0 ? duration.months() : 0;
            this.days = duration.days() > 0 ? duration.days() : 0;
            this.hours = duration.hours() > 0 ? duration.hours() : 0;
            this.minutes = duration.minutes() > 0 ? duration.minutes() : 0;
            this.seconds = duration.seconds() > 0 ? duration.seconds() : 0;
        },
        formatDate(dueDate) {
            return dueDate !== '' && dueDate !== null ? moment.tz(dueDate, 'America/Chicago').format('MM/DD/YYYY') : '';
        },
        checkZero(item) {
            if (Number(item) === 0) {
                return true;
            } return false;
        },
        async saveChanges() {
            this.loading = true;

            await this.changeBidDate({
                dueDate: this.dueDate,
                dueTime: this.dueTime,
                userId: this.users.id,
                bidId: this.bidDetail.bidData.id,
            });

            this.$router.push(`/view-bids/${this.$route.params.serial}`);

            this.loading = false;
        },
    },
    computed: {
        changeTime() {
            return `${this.years}|${this.months}|${this.days}|${this.hours}|${this.minutes}|${this.seconds}`;
        },
        bidDetail() {
            return this.$store.getters.bidViewData;
        },
        isBidOut() {
            if (this.bidDetail.bidData.type === 'BidOut Process' && this.bidDetail.bidout) {
                return true;
            }
            return false;
        },
        getPageLoading() {
            return this.$store.getters.pageLoader;
        },
        getViewBidError() {
            return this.$store.getters.showViewBidError;
        },
        noOfBidSubmitted() {
            return this.bidDetail.supplierSubmissions.length;
        },
        getLoading() {
            return this.loading;
        },
    },
    async created() {
        this.users = this.$store.getters.userInfo;
        if (this.users) {
            await this.getBidBySerial({
                serial: this.$route.params.serial,
                id: this.users.id,
            });
        } else {
            this.$router.push('/login');
        }

        if (!this.bidDetail.receivingBids) {
            this.$router.push(`/view-bids/${this.bidDetail.bidData.serial}`);
        }

        if (this.bidDetail && this.bidDetail.bidData) {
            this.dueDate = this.bidDetail.bidData.dueDate;
            this.dueTime = this.bidDetail.bidData.dueTime;
        }
        this.compute();
        this.addOneSecondToActualTimeEverySecond();
    },
    mounted() {
        moment.tz.setDefault('America/Chicago');
    },
    watch: {
        actualTime(val, oldVal) {
            this.compute();
        },
        changeTime(newVal, oldVal) {
            const [years, months, days, hours, minutes, seconds] = newVal.split('|');

            if (this.checkZero(years) && this.checkZero(months) && this.checkZero(days) && this.checkZero(hours) && this.checkZero(minutes) && this.checkZero(seconds)) {
                this.$router.go(0);
            }
        },
    },
};
</script>

<style lang="scss"></style>
