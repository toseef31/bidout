<template>
  <v-row justify="center" class="module-selection">
    <v-col cols="12" md="9">
      <v-alert type="error" class="mt-4" v-show="getShowErrorAlert">
        {{ getCompanyErrorAlert }}
      </v-alert>
    </v-col>

    <v-col cols="12" md="9">
      <div class="bg-light pa-8">
        <div class="title-head text-left">
          <h4 class="mb-2 contract-title">Respond to Bids - OFS Directory</h4>
          <h1 class="mb-8 ">Execute Contract</h1>
        </div>
        <vue-pdf-embed class="white text-left pa-4 font-weight-medium mb-5 contract-section" ref="pdfRef"
          :source="pdfSource" />

        <v-row justify="center" align="center" class="mt-0 ">
          <v-col cols="12" md="8" class="pb-1 middle-align-class">
            <v-checkbox v-model="isAgree" color="#0D9648" hide-details>
              <template v-slot:label>
                <div>
                  I agree to sign this document as <strong>{{ getUserInfo.firstName }} {{ getUserInfo.lastName }}</strong>
                </div>
              </template>
            </v-checkbox>
          </v-col>
          <v-col cols="12" md="4" class="text-right">
            <v-btn color="#0D9647" large dense class="white--text text-capitalize mb-2" width="100%" height="56"
              @click="sign()" :loading="getLoading" :disabled="!isAgree || getLoading"><strong>Sign Agreement</strong>
              <v-icon class="pl-2" color="#fff">mdi-arrow-right-circle</v-icon></v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="8">
            <div class="d-flex justify-center">
              <small class="mr-4"><strong>Date:</strong> {{ formatDate() }}</small>
              <small class="ml-4 mb-0"><strong>Ip Address:</strong> {{ ip }}</small>
            </div>
          </v-col>
        </v-row>
      </div>
      <div class="bg-light pa-7 mt-16">
        <div class="text-left">
          <h1 class="mb-4"><v-icon color="#0D1139" class="mr-4">mdi-file-document-multiple-outline</v-icon>Need to
            redline this agreement? </h1>
          <p class="font-weight-medium agreement-text">No problem, our legal team will work directly with your legal team
            with
            the purchase of an Enterprise Licensing agreement, please reach out to our Sales Team at
            <strong>832-786-2400</strong> or email <strong>hello@bidout.app</strong> to discuss a package
            appropriate for you.
          </p>
        </div>
      </div>

    </v-col>
  </v-row>
</template>

<script type="application/javascript" src="https://api.ipify.org?format=jsonp&callback=getIP"></script>

<script>
  import VuePdfEmbed from 'vue-pdf-embed/dist/vue2-pdf-embed'
  import { mapActions } from "vuex";
  import moment from 'moment-timezone';

export default {
  name : "Contract",
  components: {
    VuePdfEmbed,
  },

  data() {
    return {
      loading: false,
      pdfSource: this.$store.getters.contractData.pdfFile,
      isAgree: false
    };
  },
  computed:{
   ip(){
    return this.$store.getters.userIp;
   },
   contractData(){
    return this.$store.getters.contractData;
   },
   getUserInfo() {
    return this.$store.getters.sameAsData
   },
   getSupplierId() {
    return this.$store.getters.supplierId
   },
   getPlan() {
    return this.$store.getters.plan
   },
   getLoading() {
    return this.loading
   },
   getShowErrorAlert() {
      return this.$store.getters.authShowErrorAlert
   },
   getCompanyErrorAlert() {
      return this.$store.getters.companyError
   },
  },

  methods: {
    ...mapActions(["getIpAddress","signAgreement"]),
    async sign() {
        this.loading = true
        let agreement = {
        contractType : this.contractData.contractType,
        fileName : this.contractData.fileName,
        supplierId: this.getSupplierId,
        plan: this.getPlan ? this.getPlan : 1,
      }
      await this.signAgreement(agreement);
      this.loading = false;

      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    formatDate() {
      return moment.tz(new Date(),'America/Chicago').format("MM/D/YYYY h:mm a")
    }
  },
  mounted() {
    document.title = "Contract - BidOut" ;
    this.getIpAddress();
  }
};
</script>
<style scoped lang="scss"></style>
