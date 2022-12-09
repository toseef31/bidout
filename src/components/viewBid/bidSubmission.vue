<template>
  <v-col class="my-7 pa-0 bid-submission-tab" align="start">
    <div class="text-center b-title-detail ">There are currently no bid submissions by service providers. </div>
  </v-col>
</template>

<script>
import moment from 'moment-timezone';

export default {
  data() {
    return {
      lineItem: [{
        price: [],
        description: '',
        unit: '',
      }],
      header: ['Line items'],
    };
  },
  computed: {
    bidDetail() {
      return this.$store.getters.bidViewData;
    },

    isAfterDueDate() {
      const bidDueDate = this.bidDetail.bidData.dueDate;
      const bidDueTime = this.bidDetail.bidData.dueTime;
      const currentDate = moment();
      const Time = moment(bidDueTime, ['h:mm:ss A']).format('HH:mm:ss');
      const stringDate = `${bidDueDate}T${Time}`;
      const momentDueDate = moment(stringDate);

      return moment(currentDate).isAfter(momentDueDate);
    },
  },
};
</script>
