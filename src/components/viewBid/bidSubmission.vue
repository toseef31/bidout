<template>
  <v-col class="my-7 pa-0 bid-submission-tab" align="start">
    <v-simple-table class="template-table-style mt-2">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Line Item</th>
            <th class="text-left">Baker Hughes</th>
            <th class="text-left">Patterson-UTI</th>
            <th class="text-left">MS Directional</th>
            <th class="text-left">SwiftWater</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="n in 5" :key="n">
            <td class="text-left">Water Transfer Pump Rentals</td>
            <td class="text-left">
              <span v-if="false"
                ><v-icon color="#F32349">mdi-close</v-icon> No Bid</span
              >
              <span v-else>$ 170.92 month</span>
            </td>
            <td class="text-left ">
              <span v-if="true" class="justify-start"
                ><v-icon color="#F32349">mdi-close</v-icon> No Bid</span
              >
              <span v-else>$ 174 hour</span>
            </td>
            <td class="text-left ">
              <span v-if="false"
                ><v-icon color="#F32349">mdi-close</v-icon> No Bid</span
              >
              <span v-else>$ 174 day</span>
            </td>
            <td class="text-left ">
              <span v-if="false"
                ><v-icon color="#F32349">mdi-close</v-icon> No Bid</span
              >
              <span v-else>$ 174 one time</span>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

<div class="submission-section">
    <v-simple-table class="submission-table-style">
      <template v-slot:default>
        <tbody>
          <tr>
            <td class="text-left">Bid Example Pre-BidOut Period</td>
            <td class="text-left">
              $ 22,170.20
            </td>
            <td class="text-left ">
              $ 22,170.20
            </td>
            <td class="text-left ">
              $ 22,170.20
            </td>
            <td class="text-left ">
              $ 22,170.20
            </td>
          </tr>
          <tr>
            <td class="text-left">Bid Example Post-BidOut Period</td>
            <td class="text-left">
              <v-icon color="#0D9648">mdi-arrow-down-thin-circle-outline</v-icon>
          <span class="ml-1">$ 22,170.20</span>

          <div class="subscript">Saving 22.5%</div>
            </td>
            <td class="text-left ">
              $ 22,170.20
            </td>
            <td class="text-left ">
              <v-icon color="#0D9648">mdi-arrow-down-thin-circle-outline</v-icon>
          <span class="ml-1">$ 22,170.20</span>

          <div class="subscript">Saving 22.5%</div>
            </td>
            <td class="text-left ">
              <v-icon color="#0D9648">mdi-arrow-down-thin-circle-outline</v-icon>
          <span class="ml-1">$ 22,170.20</span>

          <div class="subscript">Saving 22.5%</div>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>

  <div class=" submission-section">
    <v-simple-table class="submission-table-style">
      <template v-slot:default>
        <tbody>
          <tr>
            <td class="text-left">Supplier comment</td>
            <td class="text-left">
              Thanks for letting us have this opportunity, we can provide you 2Net10
          on this as well.
            </td>
            <td class="text-left ">
              <span class="none-class">None provided.</span>
            </td>
            <td class="text-left ">
              We can start this project until 10/01/2022.
            </td>
            <td class="text-left ">
              <span class="none-class">None provided.</span>
            </td>
          </tr>
          <tr>
            <td class="text-left">Supplier attachments</td>
            <td class="text-left">
              <div class="pb-4 d-inline-flex">
            <img
              :src="require('@/assets/images/bids/FilePdf.png')"
              class="pr-2"
            />

            <div>BHI-COI.pdf</div>
          </div>
          <div class="pb-4 d-inline-flex">
            <img
              :src="require('@/assets/images/bids/FilePdf.png')"
              class="pr-2"
            />
            <span>BHI-COI.pdf</span>
          </div>
          <div class="d-inline-flex">
            <img
              :src="require('@/assets/images/bids/FilePdf.png')"
              class="pr-2"
            />
            <span>BHI-COI.pdf</span>
          </div>
            </td>
            <td class="text-left ">
              <span class="none-class">None provided.</span>
            </td>
            <td class="text-left ">
              <span class="none-class">None provided.</span>
            </td>
            <td class="text-left ">
              <div class="pb-4 d-inline-flex">
            <img
              :src="require('@/assets/images/bids/FilePdf.png')"
              class="pr-2"
            />

            <div>BHI-COI.pdf</div>
          </div>
          <div class="pb-4 d-inline-flex">
            <img
              :src="require('@/assets/images/bids/FilePdf.png')"
              class="pr-2"
            />
            <span>BHI-COI.pdf</span>
          </div>
          <div class="d-inline-flex">
            <img
              :src="require('@/assets/images/bids/FilePdf.png')"
              class="pr-2"
            />
            <span>BHI-COI.pdf</span>
          </div>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>

    <div class="submission-section">
      <div class="title-detail-supplier mt-10">Supplier Answers</div>
      <v-simple-table class="supplier-answer-table-style mt-3">
      <template v-slot:default>
        <tbody>
          <tr>
            <td class="text-left"> Are you able to start this work on 9/1/2022 and end by 9/10/2022?</td>
            <td class="text-left">
              Yes
            </td>
            <td class="text-left ">
              Yes
            </td>
            <td class="text-left ">
              Yes
            </td>
            <td class="text-left ">
            No
            </td>
          </tr>
          <tr>
            <td class="text-left">Please upload your COI</td>
            <td class="text-left">
              <div class="pb-4 d-inline-flex">
            <img
              :src="require('@/assets/images/bids/FilePdf.png')"
              class="pr-2"
            />

            <div>BHI-COI.pdf</div>
          </div>
            </td>
            <td class="text-left ">
              <div class="pb-4 d-inline-flex">
            <img
              :src="require('@/assets/images/bids/FilePdf.png')"
              class="pr-2"
            />

            <div>BHI-COI.pdf</div>
          </div>
            </td>
            <td class="text-left ">
              <div class="pb-4 d-inline-flex">
            <img
              :src="require('@/assets/images/bids/FilePdf.png')"
              class="pr-2"
            />

            <div>BHI-COI.pdf</div>
          </div>
            </td>
            <td class="text-left ">
              <div class="pb-4 d-inline-flex">
            <img
              :src="require('@/assets/images/bids/FilePdf.png')"
              class="pr-2"
            />

            <div>BHI-COI.pdf</div>
          </div>
            </td>
          </tr>
          <tr>
            <td class="text-left">  Please list any safety incidents in the last 24 months</td>
            <td class="text-left">
              None
            </td>
            <td class="text-left ">
              None
            </td>
            <td class="text-left ">
              None
            </td>
            <td class="text-left ">
              2 accidents evolving failed equipments, more detail are uploaded
          here.
            </td>
          </tr>
          <tr>
            <td class="text-left">   Please provide us your INSet World Number</td>
            <td class="text-left">
              54645665
            </td>
            <td class="text-left ">
              56756778
            </td>
            <td class="text-left ">
              8978978
            </td>
            <td class="text-left ">
              89789778
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    </div>

    <v-simple-table class="button-table-style mt-8" v-if="isAfterDueDate && bidDetail.user_status === 'waiting'">
      <template v-slot:default>
        <tbody>
          <tr>
            <td class="text-left"></td>
            <td class="text-left">
              <v-btn   color="#0d9648" depressed >
            Award Bid
          </v-btn>
          <v-btn   color="#F03F20" depressed  class="mt-2">
            Disqualify Bid
          </v-btn>
            </td>
            <td class="text-left ">
              <v-btn   color="#0d9648" depressed >
            Award Bid
          </v-btn>
          <v-btn   color="#F03F20" depressed class="mt-2" >
            Disqualify Bid
          </v-btn>
            </td>
            <td class="text-left ">
              <v-btn   color="#0d9648" depressed >
            Award Bid
          </v-btn>
          <v-btn   color="#F03F20" depressed class="mt-2" >
            Disqualify Bid
          </v-btn>
            </td>
            <td class="text-left ">
              <v-btn   color="#0d9648" depressed >
            Award Bid
          </v-btn>
          <v-btn   color="#F03F20" depressed class="mt-2" >
            Disqualify Bid
          </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <v-simple-table class="award-table-style mt-8" v-if="isAfterDueDate && bidDetail.user_status !== 'waiting'">
      <template v-slot:default>
        <tbody>
          <tr>
            <td class="text-left"></td>
            <td class="text-left">
              <div
              class=" action d-flex align-center"
  color="white"
  height="56"
  rounded
  width="190"
>  <img  :src="require('@/assets/images/bids/disqualified.png')"/> Disqualified Bid</div>
<div
              class=" action d-flex align-center"
  color="white"
  height="56"
  rounded
  width="190"
>  <img  :src="require('@/assets/images/bids/awarded.png')"/> Awarded Bid</div>
          </div>

            </td>
            <td class="text-left ">
              <div
              class=" action d-flex align-center"
  color="white"
  height="56"
  rounded
  width="190"
>  <img  :src="require('@/assets/images/bids/disqualified.png')"/> Disqualified Bid</div>
<div
              class=" action d-flex align-center"
  color="white"
  height="56"
  rounded
  width="190"
>  <img  :src="require('@/assets/images/bids/awarded.png')"/> Awarded Bid</div>
          </div>
            </td>
            <td class="text-left ">
              <div
              class=" action d-flex align-center"
  color="white"
  height="56"
  rounded
  width="190"
>  <img  :src="require('@/assets/images/bids/disqualified.png')"/> Disqualified Bid</div>
<div
              class=" action d-flex align-center"
  color="white"
  height="56"
  rounded
  width="190"
>  <img  :src="require('@/assets/images/bids/awarded.png')"/> Awarded Bid</div>
          </div>
            </td>
            <td class="text-left ">
              <div
              class=" action d-flex align-center"
  color="white"
  height="56"
  rounded
  width="190"
>  <img  :src="require('@/assets/images/bids/disqualified.png')"/> Disqualified Bid</div>
<div
              class=" action d-flex align-center"
  color="white"
  height="56"
  rounded
  width="190"
>  <img  :src="require('@/assets/images/bids/awarded.png')"/> Awarded Bid</div>
          </div>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-col>
</template>

<script>
import moment from 'moment-timezone';

export default {
  data() {
    return {
      listItem: [
        {
          'Line Item': 'Water Transfer Pump Rentals',
          '': 'Pumps',
        },
      ],
    };
  },
  computed: {
    bidDetail() {
      return this.$store.getters.bidData;
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
