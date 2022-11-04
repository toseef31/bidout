<template>
  <v-col class="my-7 bid-detail-tab pa-0" align="start">
    <div class="bid-row pb-5">
      <div class="px-5">
        <div class="title-detail">Bid Details</div>
        <br />

        <div class="title-desc">
          <p><span>Bid Title:</span> Annual Chemical Bid</p>
          <p><span>Bid Type:</span> RFP</p>
          <p><span>Due Date/Time:</span> 08/29/2022 @ 12:00pm CST</p>
          <p><span>Region:</span> Permian Basin</p>
          <p><span>Q&A:</span> No</p>
        </div>
        <br />

        <p class="bid-desc">
          <span>Bid Description:</span> Praesent ac pulvinar diam, at aliquet
          quam. Vivamus eu metus blandit, maximus massa id, semper nisi. Quisque
          vel libero ornare, rhoncus diam in, vulputate lectus. Ut rhoncus
          hendrerit magna in pretium. Curabitur tristique blandit turpis sed
          vestibulum. Suspendisse porttitor lectus ac ipsum convallis, non
          tristique nibh venenatis. Phasellus quis porttitor sapien. Nam gravida
          ullamcorper lorem, eget vulputate tortor cursus eu. Mauris ut augue
          vel felis dictum tincidunt eu sed justo. Vivamus venenatis turpis non
          mi tincidunt, vel euismod mi posuere. Class aptent taciti sociosqu ad
          litora torquent per conubia nostra, per inceptos himenaeos. Mauris nec
          semper magna.
        </p>
        <br />

        <p class="bid-headline">
          <span>Saftey Headline:</span> Curabitur elementum pellentesque massa.
          Duis id feugiat erat. Donec porta feugiat quam at ullamcorper. Quisque
          et sollicitudin dui. Nulla ullamcorper condimentum nibh, id dapibus
          arcu. Morbi finibus libero lectus, eget pharetra urna vestibulum
          vitae. Etiam in eros vel ligula suscipit porta.
        </p>
      </div>
    </div>
    <div class="px-5 pt-8 bid-row-2">
      <div class="title-detail">Invited Suppliers</div>
      <div class="d-flex bid-section-2">
        <div class="d-flex align-center">
          <v-img
            width="88px"
            height="29px"
            :src="require('@/assets/images/ofs/company/subs-3.png')"
          ></v-img>
          <div class="ml-5">
            <div class="font-weight-bold">KLX Energy Services</div>
            <a href="#" class="text-decoration-underline text-body-2"
              >View profile</a
            >
          </div>
        </div>
        <div class="ml-auto">
          <v-row>
            <v-col class="mr-2">
              <v-badge color="#0D9648" dot overlap>
                <v-icon>mdi-domain</v-icon>
              </v-badge>
            </v-col>
            <v-col class="mr-2"> <v-icon>mdi-eye-outline</v-icon></v-col>
            <v-col class="mr-2"> <v-icon>mdi-circle-outline</v-icon> </v-col>
            <v-col> <v-icon>mdi-circle-outline</v-icon> </v-col>
          </v-row>
        </div>
      </div>
      <div class="d-flex bid-section-2">
        <div class="d-flex align-center">
          <v-img
            width="88px"
            height="29px"
            :src="require('@/assets/images/ofs/company/subs-3.png')"
          ></v-img>
          <div class="ml-5">
            <div class="font-weight-bold">Tetra Technologies</div>
            <a href="#" class="text-decoration-underline text-body-2"
              >View profile</a
            >
          </div>
        </div>
        <div class="ml-auto">
          <v-row>
            <v-col class="mr-2">
              <v-badge color="#D5D91C" dot overlap>
                <v-icon>mdi-domain</v-icon>
              </v-badge>
            </v-col>
            <v-col class="mr-2"> <v-icon>mdi-eye-outline</v-icon></v-col>
            <v-col class="mr-2"> <v-icon>mdi-circle-outline</v-icon> </v-col>
            <v-col> <v-icon>mdi-circle-outline</v-icon> </v-col>
          </v-row>
        </div>
      </div>
      <div class="d-flex bid-section-2">
        <div class="d-flex align-center">
          <v-img
            width="88px"
            height="29px"
            :src="require('@/assets/images/ofs/company/subs-3.png')"
          ></v-img>
          <div class="ml-5">
            <div class="font-weight-bold">KLX Energy Services</div>
            <a href="#" class="text-decoration-underline text-body-2"
              >View profile</a
            >
          </div>
        </div>
        <div class="ml-auto">
          <v-row>
            <v-col class="mr-2">
              <v-icon>mdi-domain</v-icon>
            </v-col>
            <v-col class="mr-2"> <v-icon>mdi-eye-outline</v-icon></v-col>
            <v-col class="mr-2">
              <v-icon color="#0D9648">mdi-check-circle-outline</v-icon>
            </v-col>
            <v-col> <v-icon color="#0D9648">mdi-currency-usd</v-icon> </v-col>
          </v-row>
        </div>
      </div>
      <div class="d-flex bid-section-2">
        <div class="d-flex align-center">
          <v-img
            width="88px"
            height="29px"
            :src="require('@/assets/images/ofs/company/subs-3.png')"
          ></v-img>
          <div class="ml-5">
            <div class="font-weight-bold">KLX Energy Services</div>
            <a href="#" class="text-decoration-underline text-body-2"
              >View profile</a
            >
          </div>
        </div>
        <div class="ml-auto">
          <v-row>
            <v-col class="mr-2">
              <v-icon>mdi-domain</v-icon>
            </v-col>
            <v-col class="mr-2"> <v-icon>mdi-eye-outline</v-icon></v-col>
            <v-col class="mr-2">
              <v-icon color="#F32349">mdi-close-circle-outline</v-icon>
            </v-col>
            <v-col>
              <v-icon color="#F32349">mdi-close-circle-outline</v-icon>
            </v-col>
          </v-row>
        </div>
      </div>
    </div>

    <div class="px-5 pt-8 pb-14 bid-row-2">
      <div class="title-detail">Team member</div>
      <v-row class="mt-10" justify="space-around" align="center">
        <v-col>
          <v-avatar color="#0d96481a" size="62">
            <v-icon color="#0d9648" large>mdi-account-outline </v-icon>
          </v-avatar>
          <span class="text--black px-4 bid-creator">Tyler Cherry</span>
          <span class="bid-creator-title">Bid Creator</span>
        </v-col>
        <v-col>
          <v-avatar color="#0d96481a" size="62">
            <v-icon color="#0d9648" large>mdi-account-outline </v-icon>
          </v-avatar>
          <span class="text--black px-4 bid-creator">Tyler Cherry</span>
        </v-col>
        <v-col>
          <v-avatar color="#0d96481a" size="62">
            <v-icon color="#0d9648" large>mdi-account-outline </v-icon>
          </v-avatar>
          <span class="text--black px-4 bid-creator">Tyler Cherry</span>
        </v-col>
      </v-row>
      <v-row class="mt-10" justify="space-around" align="center">
        <v-col>
          <v-avatar color="#0d96481a" size="62">
            <v-icon color="#0d9648" large>mdi-account-outline </v-icon>
          </v-avatar>
          <span class="text--black px-4 bid-creator">Tyler Cherry</span>
        </v-col>
        <v-col>
          <v-avatar color="#0d96481a" size="62">
            <v-icon color="#0d9648" large>mdi-account-outline </v-icon>
          </v-avatar>
          <span class="text--black px-4 bid-creator">Tyler Cherry</span>
        </v-col>
        <v-col>
          <v-avatar color="#0d96481a" size="62">
            <v-icon color="#0d9648" large>mdi-account-outline </v-icon>
          </v-avatar>
          <span class="text--black px-4 bid-creator">Tyler Cherry</span>
        </v-col>
      </v-row>
    </div>

    <div class="pt-8 pb-14 bid-row-2">
      <div class="title-detail px-6">Line items</div>

      <v-simple-table class="template-table-style mt-8">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Line Item Description</th>
              <th class="text-left">Unit/Measure</th>
              <th class="text-left">Input Type</th>
              <th class="text-left">QTY</th>
              <th class="text-left">Buyer Comment</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="n in 6" :key="n">
              <td class="text-left">Diesel</td>
              <td class="text-left">Gallon</td>
              <td class="text-left px-10">USD</td>
              <td class="text-left px-10">1000</td>
              <td class="text-left">
                Lorem Ipsum sit amet alote monaco forgarden toprecio uno amargo
                calette riona
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>

    <div class="py-8 bid-row-2">
      <div class="title-detail px-6">Attachments</div>
      <div class="attachment-list-style">
        <v-simple-table fixed-header>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left"></th>
                <th class="text-left">File Name</th>
                <th class="text-left">Comment</th>
                <th class="text-left">File Size</th>
                <th class="text-left">Uploaded By</th>
                <th class="text-left">Uploaded Date</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(doc, index) in docsList">
                <td class="text-left">
                  <img :src="require('@/assets/images/bids/FilePdf.png')" />
                </td>
                <td class="text-left">{{ doc.fileName }}</td>
                <td class="text-left">
                  <span>{{ doc.comment }}</span>
                </td>
                <td class="text-left">{{ doc.fileSize }}</td>
                <td class="text-left">{{ doc.uploadedBy }}</td>
                <td class="text-left">
                  {{ doc.uploadedAt | moment("MM/DD/YYYY hh:mm a") }}
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </div>
    </div>

    <div class="pt-8 bid-row-3">
      <div class="question-section-title">
        <span class="title-detail px-6">Big Questions</span>
      </div>
      <div class="question-sub-section">
        <span class="sub-section-title px-6">Operational Questions</span>
        <v-row
          class="px-10 pt-6 operational-ques"
          justify="space-between"
          align="center"
        >
          <v-col md="6" offset-md="1" class="first-child"
            >I agree that this pricing is valid and Supplier Name can performe
            the work?</v-col
          >
          <div class="second-child">Required Question</div>
        </v-row>
      </div>
      <div class="legal-sub-section">
        <span class="sub-section-title px-6">Legal Questions</span>
        <v-row
          class="px-10 pt-6 legal-ques"
          justify="space-between"
          align="center"
        >
          <v-col md="6" offset-md="1" class="first-child"
            >Do you curently have a MSA with buyer?</v-col
          >
          <div class="second-child">Required Question</div>
        </v-row>
        <v-row class="px-10 legal-ques" justify="space-between" align="center">
          <v-col md="6" offset-md="1" class="first-child"
            >Please explain your Previous safety incident
          </v-col>
          <div class="second-child">Required Question</div>
        </v-row>
        <v-divider inset class="mt-10 mb-8"></v-divider>
        <v-row class="px-10 legal-ques" justify="space-between" align="center">
          <v-col md="6" offset-md="1" class="first-child"
            >Upload your certificate of insurance
          </v-col>
          <div class="second-child">Required Question</div>
        </v-row>
        <v-divider inset class="mt-10 mb-8"></v-divider>
        <v-row class="px-10 legal-ques" justify="space-between" align="center">
          <v-col md="6" offset-md="1" class="first-child"
            >Upload your certificate of insurance
          </v-col>
          <div class="second-child">Required Question</div>
        </v-row>
      </div>
    </div>
  </v-col>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      document: [
        {
          fileName: "SafteyPlan.pdf",
          comment: "Saftey Plan",
          fileSize: "16kb",
          uploadedBy: "Tyler Cherry",
          uploadedAt: "08/08/2022 1:29 pm",
        },
        {
          fileName: "SafteyPlan.pdf",
          comment: "Saftey Plan",
          fileSize: "16kb",
          uploadedBy: "Tyler Cherry",
          uploadedAt: "08/08/2022 1:29 pm",
        },
      ],
    };
  },
  computed: {
    docsList() {
      return this.document;
    },
  },
};
</script>
