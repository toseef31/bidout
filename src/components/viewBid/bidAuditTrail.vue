<template>
  <v-col class="pa-0 pb-3 audit-tab fill-height" align="start">
    <div class="title-detail px-6 title-border" v-if="getBidActivityList && getBidActivityList.length > 0">Activity
    </div>

    <v-list>
      <v-list-item-group active-class="success--text" multiple>
        <template v-if="getBidActivityList.length == 0 || !getBidActivityList">
          <div class="text-center a-title-detail">Audit Trail Data is Currently Being Collected</div>
        </template>
        <template v-else v-for="(item, index) in getBidActivityList">
          <v-list-item class="py-1">
            <template>
              <v-list-item-avatar>
                <v-icon v-text="'mdi-email-outline'" :class="[
                  'notification-icon',
                ]">
                </v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ item.message }}</v-list-item-title>
              </v-list-item-content>

              <v-list-item-action>
                <v-list-item-action-text>{{
                  item.newDate
                }} </v-list-item-action-text>
              </v-list-item-action>
            </template>
          </v-list-item>

          <v-divider v-if="index < getBidActivityList.length - 1" :key="index"></v-divider>
        </template>
      </v-list-item-group>
    </v-list>
  </v-col>
</template>

<script>
import moment from 'moment-timezone';

export default {
  computed: {
    getBidActivityList() {
      if (this.$store.getters.bidActivities) {
        this.$store.getters.bidActivities.map((item) => {
          const timestamp = item.createdOn._seconds * 1000 + item.createdOn._nanoseconds / 1000000;
          item.newDate = moment(timestamp).format('MM/DD/YYYY hh:mm A');
        });
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        const sorted = this.$store.getters.bidActivities.sort((a, b) => (moment(b.newDate, 'MM/DD/YYYY hh:mm A').isBefore(moment(a.newDate, 'MM/DD/YYYY hh:mm A')) ? -1 : 1));

        return sorted;
      }
      return [];
    },
  },
};
</script>
