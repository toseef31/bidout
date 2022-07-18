<template>
  <section class="fill-height module-selection white">
    <NavbarBeforeLogin></NavbarBeforeLogin>
      <div class="get-topHeader d-flex">
        <v-row
          align="center"
          justify="center"
          no-gutters
        >
          <v-col
            class="text-left pl-16"
            cols="12"
          >
            <h1 class="font-weight-bolder white--text">
              Get Started
            </h1>
          </v-col>
        </v-row>
      </div>
      <v-container>
        <v-main>
          <v-row justify="center">
            <v-col cols="12" md="9">
              <div class="bg-light pa-8">
                <div class="title-head text-left">
                  <h4 class="mb-2">RPF Platfmor - Create Bids</h4>
                  <h1 class="mb-8">Execute Contract</h1>
                </div>
                <div class="white text-left pa-4 font-weight-medium mb-5">
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ornare, dolor ac pulvinar varius, magna risus volutpat velit, quis porta nibh nulla eu risus. Maecenas congue a nibh tempus molestie. Phasellus vitae orci in sem gravida pretium. Nam nibh risus, consectetur eget erat sed, dapibus porta mauris. Vestibulum ut imperdiet turpis, non auctor magna. Quisque id lorem mollis, aliquet libero eu, sagittis velit. Quisque a arcu vel dolor placerat pretium eget at odio. Suspendisse potenti. Phasellus pulvinar, turpis ut placerat tincidunt, velit leo serat scelerisque nisl, ac posuere elit sem a urna. Duis hendrerit a quam ut vehicula. Nullam risus nunc, scelerisque id rhoncus ut, hendrerit ac nulla. Suspendisse cursus nisl id neque fringilla, eu tincidunt nisl fringilla. Duis eget elit diam. Aliquam mi erat, vulputate id lorem sed, lacinia luctus erat. Vivamus auctor lacus in sapien viverra, vitae eleifend odio volutpat.</p>
                  <p>Nam vestibulum vel nisi nec scelerisque. Fusce nec tortor vel magna imperdiet tempor eget et nulla. Cras in nisl rutrum eros ornare auctor. Quisque sapien enim, sodales eu tempus ege, varius id libero. Sed dapibus hendrerit ex sit amet ultrices. Nulla nec leo in ex euismod onite, vulputate. Donec ullamcorper orci quis leo rhoncus tempus. Curabitur facilisis orci a viverra consequat. Vestibulum in lectus eget lorem tincidunt accumsan. Vestibulum purus orci, mola faucibus id ante ut, elementum dapibus nulla. Duis felis mi, lacinia vel dui in, hendrerit septna venenatis dui. Proin rhoncus turpis id velit consectetur hendrerit eu ut mauris. Nullam in orle orci vecta yoma.</p>

                  <p>Donec in scelerisque tellus. Sed aliquet accumsan lacinia. Aenean non tristique risus olestam. Suspendisse lobortis eget justo sit amet sodales. Aliquam euismod, tellus eget dictum porte pulvinar, justo urna venenatis ex, id molestie metus lectus vitae sapien. Praesent vitae porta dui. Nullam ullamcorper justo sem, sit amet fermentum eros semper sed.</p>

                  <p>Quisque ornare luctus vulputate. Nulla pulvinar est urna, ut tincidunt augue consectetur eget. Proin a accumsan nulla, commodo dapibus ante. Maecenas molestie ligula at sem auctor, a mattis ligula sodales. Integer at quam eleifend, faucibus velit id, pharetra nisl. Donec mulat consequat consequat justo, sed aliquam ipsum rhoncus a. Duis sollicitudin nulla purus, uteo laoreet massa posuere at. Suspendisse laoreet magna at pellentesque porttitor.</p>

                  <p>Aenean pellentesque dui et orci ornare commodo. Aenean eu purus vulputate, iaculis diam id, auctor ipsum. Ut condimentum non lacus non rhoncus. Sed in fringilla eros. Sed venenatis ole consectetur tortor quis lacinia. Sed tristique sapien id est maximus egestas. Proin porttitor on lorem a ligula dapibus malesuada. Aliquam tellus nunc, elementum vel lectus acervo  colatte condimentum dapibus augue. Duis pulvinar eget lorem eget elementum. Donec vel faucibus diam. Nullam quis bibendum odio, id pulvinar nunc. Aliquam ut lectus porta, commodo risus a, vehicula nulla. Aenean eget posuere neque, ut molestie ligula. Curabitur ac sem auctorelis viverra felis nec, feugiat mauris. Nullam pretium est ac mollis vestibulum.</p>
                </div>
                <v-row justify="center" align="center">
                  <v-col cols="12" md="8" class="pb-1">
                    <div class="white">
                      <img :src="require('@/assets/images/getStarted/sign.png')" class="py-6 mx-auto">
                    </div>
                  </v-col>
                  <v-col cols="12" md="4" class="text-right">
                    <v-btn color="#0D9647" large dense class="white--text text-capitalize" width="100%" height="56">Sign Agreement <v-icon class="pl-2" color="#fff">mdi-arrow-right-circle</v-icon></v-btn>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="8">
                    <div class="d-flex justify-center">
                      <small class="mr-4"><strong>Date:</strong> 07/11/22 8:53pm</small>
                      <small class="ml-4 mb-0"><strong>Ip Address:</strong> 238.393.3.22</small>
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
<script>
  import NavbarBeforeLogin from '../Layout/NavbarBeforeLogin.vue'
  import Footer from '../Layout/Footer.vue'
export default {
  name : "Contract",
  components: {
    NavbarBeforeLogin,
    Footer,
  },
  
  data() {
    return {
      createBid: true,
      bidRespond: false,
      providerListing: true,
      editions : 'premium',
      packages: ['1-5 Staff Members - $79.99 month or $800/year', '5-10 Staff Members - $159.99 month or $1600/year', '10-15 Staff Members - $139.99 month or $2400/year'],
    };
  },
  computed:{
   
  },
  methods: {
    
  },
  mounted() {
    
}
};
</script>
<style scoped lang="scss">

</style>
