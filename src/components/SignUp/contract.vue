<template>
    <v-row justify="center" class="module-selection">
        <v-col cols="12" md="9">
            <div class="bg-light pa-8">
                <div class="title-head text-left">
                    <h4 class="mb-2 contract-title">RPF Platform - Create Bids</h4>
                    <h1 class="mb-8 ">Execute Contract</h1>
                </div>
                <vue-pdf-embed class="white text-left pa-4 font-weight-medium mb-5 contract-section" ref="pdfRef"
                    :source="pdfSource" />

                <v-row justify="center" align="center" class="mt-0 ">
                    <v-col cols="12" md="8" class="pb-1 middle-align-class">
                        <v-checkbox v-model="isAgree" color="#0D9648" hide-details>
                            <template v-slot:label>
                                <div>
                                    I agree to sign this document as <strong>Fist Name Last Name</strong>
                                </div>
                            </template>
                        </v-checkbox>
                    </v-col>
                    <v-col cols="12" md="4" class="text-right">
                        <v-btn color="#0D9647" large dense class="white--text text-capitalize mb-2" width="100%" height="56"
                            @click="sign()" :loading="loading" :disabled="disable"><strong>Sign Agreement</strong> <v-icon
                                class="pl-2" color="#fff">mdi-arrow-right-circle</v-icon></v-btn>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="8">
                        <div class="d-flex justify-center">
                            <small class="mr-4"><strong>Date:</strong> {{ new Date() | moment("MM/D/YYYY h:mm a") }}</small>
                            <small class="ml-4 mb-0"><strong>Ip Address:</strong> {{ ip }}</small>
                        </div>
                    </v-col>
                </v-row>
            </div>
            <div class="bg-light pa-7 mt-16">
                <div class="text-left">
                    <h1 class="mb-4"><v-icon color="#0D1139" class="mr-4">mdi-file-document-multiple-outline</v-icon>Need to
                        redline this agreement? </h1>
                    <p class="font-weight-medium agreement-text">No problem, our legal team will work directly with your legal team with
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
export default {
  name : "Contract",
  components: {
    VuePdfEmbed,
  },

  data() {
    return {
      loader: null,
      loading: false,
      disable: false,
      createBid: true,
      bidRespond: false,
      providerListing: true,
      results: [],
      page: null,
      pageCount: 1,
      pdfSource: this.$store.getters.contractData.pdfFile,
      showAllPages: true,
      isAgree: false
    };
  },
  computed:{
   ip(){
    return this.$store.getters.userIp;
   },
   userid(){
     return this.$store.getters.userId;
   },
   contractData(){
    return this.$store.getters.contractData;
   },

  },

  methods: {
    ...mapActions(["getIpAddress","signAgreement"]),

    sign() {
      const { isEmpty, data } = this.$refs.signaturePad.saveSignature();
      if(isEmpty){
        this.$toasted.show(`Please sign the contract to proceed.`, {
          class: 'error-toast',
          duration: 5000,
          type: 'error',
          position: 'top-center',
        });
      }else{
        var agreement = {
        contractType : this.$store.getters.contractData.contractType,
        fileName : this.$store.getters.contractData.fileName,
        sign: data,
        companyId: this.$store.getters.companyId,
        userId: this.$store.getters.id,
        yearly: true,
        plan: this.$store.getters.plan,
      }
      this.signAgreement(agreement);
      this.loading = 'loading';
      this.disable = true;
      }

    },
    undo() {
      this.$refs.signaturePad.undoSignature();
    },
  },
  mounted() {
    document.title = "Contract - BidOut" ;
    this.getIpAddress();

  }
};
</script>
<style scoped lang="scss"></style>
