<template>
  <section class="fill-height module-selection white">
    <NavbarBeforeLogin></NavbarBeforeLogin>
      <div class="get-topHeader d-flex">
        <v-container fill-height>
          <v-row
            align="center"
            justify="center"
            no-gutters
          >
            <v-col
              class="text-left"
              cols="12"
            >
              <h1 class="font-weight-bolder white--text">
                Get Started
              </h1>
            </v-col>
          </v-row>
        </v-container>
      </div>
      <v-container>
        <v-main>
          <v-row justify="center">
            <v-col cols="12" md="11">
              <div class="bg-light pa-8">
                <div class="title-head text-left">
                  <h4 class="mb-2">RPF Platform - Create Bids</h4>
                  <h1 class="mb-8">Execute Contract</h1>
                </div>
                  <vue-pdf-embed class="white text-left pa-4 font-weight-medium mb-5 contract-section"
                      ref="pdfRef"
                      :source="pdfSource"
                    />
                
                <v-row justify="center" align="center">
                  <v-col cols="12" md="8" class="pb-1">
                    <div class="white">
                      <!-- <img :src="require('@/assets/images/getStarted/sign.png')" class="py-6 mx-auto"> -->
                      <VueSignaturePad width="500px" height="130px" ref="signaturePad" />
                    </div>
                  </v-col>
                  <v-col cols="12" md="4" class="text-right">
                    <v-btn color="#0D9647" large dense class="white--text text-capitalize mb-2" width="100%" height="56" @click="sign()" 
                    :loading="loading"
                    :disabled="disable">Sign Agreement <v-icon class="pl-2" color="#fff">mdi-arrow-right-circle</v-icon></v-btn>
                    <v-btn color="#0D9647" large dense class="white--text text-capitalize" width="100%" height="56" @click="undo()">Undo Sign </v-btn>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="8">
                    <div class="d-flex justify-center">
                      <small class="mr-4"><strong>Date:</strong> {{ new Date() | moment("MM/D/YYYY h:mm a") }}</small>
                      <small class="ml-4 mb-0"><strong>Ip Address:</strong> {{ip}}</small>
                    </div>
                  </v-col>
                </v-row>
              </div>
              <div class="bg-light pa-8 mt-8">
                <div class="text-left">
                  <h1 class="mb-4"><v-icon color="#0D1139" class="mr-4">mdi-file-document-multiple-outline</v-icon>Need to redline this agreement? </h1>
                  <p class="font-weight-medium">No problem, our legal team will work directly with your legal team with the purchase of an Enterprise Licesing agreement, please reach out to our Sales Team at <strong>832-786-2400</strong> to disuss a package appropriate for you.</p>
                </div>
              </div>
              
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" md="8">
              <div class="getStart-box pa-6 text-left">
                <h1 class="mb-3 font-weight-bold ">Get Started Today for Free!</h1>
                <div class="d-flex align-start">
                  <v-icon class="pr-4 mt-1" color="#0D9647">mdi-phone-outline</v-icon>
                  <p>Contact a BidOut Team Member Today by calling <br><strong>832-786-2400</strong></p>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-main>
      </v-container>
      <Footer></Footer>
   </section>
</template>
<script type="application/javascript" src="https://api.ipify.org?format=jsonp&callback=getIP"></script>
<script>
  import NavbarBeforeLogin from '../../components/Layout/NavbarBeforeLogin.vue'
  import Footer from '../../components/Layout/Footer.vue'
  import VuePdfEmbed from 'vue-pdf-embed/dist/vue2-pdf-embed'
  import { mapActions } from "vuex";
export default {
  name : "Contract",
  components: {
    NavbarBeforeLogin,
    Footer,
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
   }
  },
  methods: {
    ...mapActions(["getIpAddress","signAgreement"]),
    sign() {
      const { isEmpty, data } = this.$refs.signaturePad.saveSignature();
      
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
    },
    undo() {
      this.$refs.signaturePad.undoSignature();
    },
    getIP(json) {
      console.log(json.ip);
    }
  },
  mounted() {
    document.title = "Contract - BidOut" ;
    this.getIP();  
    console.log('contract',this.$store.getters.contractData);
    axios
        .get("https://www.cloudflare.com/cdn-cgi/trace")
          .then(response=> (console.log(response.data)))
      
  }
};
</script>
<style scoped lang="scss">

</style>
