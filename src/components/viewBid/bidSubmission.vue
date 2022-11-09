<template>
  <v-col class="my-7 pa-0 bid-submission-tab" align="start">
    <v-simple-table class="template-table-style mt-8">
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
            <td class="text-left px-10">
              <span v-if="true"
                ><v-icon color="#F32349">mdi-close</v-icon> No Bid</span
              >
              <span v-else>$ 174 hour</span>
            </td>
            <td class="text-left px-10">
              <span v-if="false"
                ><v-icon color="#F32349">mdi-close</v-icon> No Bid</span
              >
              <span v-else>$ 174 day</span>
            </td>
            <td class="text-left px-10">
              <span v-if="false"
                ><v-icon color="#F32349">mdi-close</v-icon> No Bid</span
              >
              <span v-else>$ 174 one time</span>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <div class="py-8 submission-section px-8">
      <v-row class="py-5">
        <v-col class="first-title">Bid Example Pre-BidOut Period </v-col>

        <v-col class="text-center ml-10"> $ 22,170.20 </v-col>

        <v-col class="text-center"> $ 22,170.20 </v-col>

        <v-col class="text-center"> $ 22,170.20 </v-col>

        <v-col class="text-center"> $ 22,170.20 </v-col>
      </v-row>

      <v-row class="py-8">
        <v-col class="first-title"> Bid Example Post-BidOut Period </v-col>

        <v-col class="text-center ml-10">
          <v-icon color="#0D9648">mdi-arrow-down-thin-circle-outline</v-icon>
          <span class="ml-1">$ 22,170.20</span>

          <div class="subscript">Saving 22.5%</div>
        </v-col>

        <v-col class="text-center"> $ 22,170.20 </v-col>

        <v-col class="text-center">
          <v-icon color="#0D9648">mdi-arrow-down-thin-circle-outline</v-icon>
          <span class="ml-1">$ 22,170.20</span>

          <div class="subscript">Saving 22.5%</div>
        </v-col>

        <v-col class="text-center">
          <v-icon color="#0D9648">mdi-arrow-down-thin-circle-outline</v-icon>
          <span class="ml-1">$ 22,170.20</span>

          <div class="subscript">Saving 22.5%</div>
        </v-col>
      </v-row>
    </div>

    <div class="py-10 submission-section px-8">
      <v-row>
        <v-col class="first-title"> Supplier comment </v-col>

        <v-col class="text-left ml-8">
          Thanks for letting us have this opportunity, we can provide you 2Net10
          on this as well.
        </v-col>

        <v-col class="text-center">
          <span class="none-class">None provided.</span>
        </v-col>

        <v-col> We can start this project until 10/01/2022. </v-col>

        <v-col class="text-center">
          <span class="none-class">None provided.</span>
        </v-col>
      </v-row>
    </div>

    <div class="py-10 submission-section px-8">
      <v-row>
        <v-col class="first-title"> Supplier attachments </v-col>

        <v-col class="text-left ml-8 d-flex flex-column align-center">
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
        </v-col>

        <v-col class="text-center">
          <span class="none-class">None provided.</span>
        </v-col>

        <v-col> <span class="none-class">None provided.</span> </v-col>

        <v-col class="text-left ml-8 d-flex flex-column align-center">
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
        </v-col>
      </v-row>
    </div>

    <div class="pt-12">
      <div class="title-detail-supplier px-8">Supplier Answers</div>

      <v-row class="px-8 pt-8">
        <v-col class="first-title">
          Are you able to start this work on 9/1/2022 and end by 9/10/2022?
        </v-col>

        <v-col class="text-left ml-8 d-flex flex-column align-center">
          Yes
        </v-col>

        <v-col class="text-center"> Yes </v-col>

        <v-col> Yes </v-col>

        <v-col class="text-left ml-8 d-flex flex-column align-center">
          No
        </v-col>
      </v-row>
      <v-row class="px-8">
        <v-col class="first-title"> Please upload your COI </v-col>

        <v-col class="text-left ml-8 d-flex flex-column align-center">
          <div class="pb-4 d-inline-flex">
            <img
              :src="require('@/assets/images/bids/FilePdf.png')"
              class="pr-2"
            />

            <div>BHI-COI.pdf</div>
          </div>
        </v-col>

        <v-col class="text-center">
          <div class="pb-4 d-inline-flex">
            <img
              :src="require('@/assets/images/bids/FilePdf.png')"
              class="pr-2"
            />

            <div>BHI-COI.pdf</div>
          </div>
        </v-col>

        <v-col>
          <div class="pb-4 d-inline-flex">
            <img
              :src="require('@/assets/images/bids/FilePdf.png')"
              class="pr-2"
            />

            <div>BHI-COI.pdf</div>
          </div>
        </v-col>

        <v-col class="text-left ml-8 d-flex flex-column align-center">
          <div class="pb-4 d-inline-flex">
            <img
              :src="require('@/assets/images/bids/FilePdf.png')"
              class="pr-2"
            />

            <div>BHI-COI.pdf</div>
          </div>
        </v-col>
      </v-row>
      <v-row class="px-8">
        <v-col class="first-title">
          Please list any safety incidents in the last 24 months
        </v-col>

        <v-col class="text-left ml-8 d-flex flex-column align-center">
          None
        </v-col>

        <v-col class="text-center"> None </v-col>

        <v-col> None </v-col>

        <v-col class="text-left ml-8 d-flex flex-column align-center">
          2 accidents envolving failed equipments, more detail are uploaded
          here.
        </v-col>
      </v-row>
      <v-row class="px-8">
        <v-col class="first-title">
          Please provide us your INSet World Number
        </v-col>

        <v-col class="text-left ml-8 d-flex flex-column align-center">
          54645665
        </v-col>

        <v-col class="text-center"> 56756778 </v-col>

        <v-col> 8978978 </v-col>

        <v-col class="text-left ml-8 d-flex flex-column align-center">
          89789778
        </v-col>
      </v-row>
    </div>
  </v-col>
</template>

<script>
export default {
  data() {
    return {
      listItem: [
        {
          "Line Item": "Water Transfer Pump Rentals",
          "": "Pumps",
        },
      ],
    };
  },
};
</script>
