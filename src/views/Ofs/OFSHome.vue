<template>
  <section class="fill-height ofs-module white">
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
                OFS Provider Directory
              </h1>
            </v-col>
          </v-row>
        </v-container>
      </div>
      <v-container>
        <v-main>
          <v-row>
            <v-col cols="12" md="12">
              <VueSlickCarousel v-bind="settings" class="company-slider">
                <div class="slide-item">
                  <div class="slide-img d-flex align-center justify-center flex-column">
                    <img
                      :src="require('@/assets/images/ofs/patterson.png')" class="mx-auto"
                    >
                  </div>
                  <div class="slide-caption">
                    <h3 class="font-weight-bold">Premium Service Provider</h3>
                  </div>
                </div>
                <div class="slide-item">
                  <div class="slide-img d-flex align-center justify-center flex-column">
                    <img
                      :src="require('@/assets/images/ofs/tetra.png')" class="mx-auto"
                    >
                  </div>
                  <div class="slide-caption">
                    <h3 class="font-weight-bold">Premium Service Provider</h3>
                  </div>
                </div>
                <div class="slide-item">
                  <div class="slide-img d-flex align-center justify-center flex-column">
                    <img
                      :src="require('@/assets/images/ofs/champion.png')" class="mx-auto"
                    >
                  </div>
                  <div class="slide-caption">
                    <h3 class="font-weight-bold">Premium Service Provider</h3>
                  </div>
                </div>
                <div class="slide-item">
                  <div class="slide-img d-flex align-center justify-center flex-column">
                    <img
                      :src="require('@/assets/images/ofs/patterson.png')" class="mx-auto"
                    >
                  </div>
                  <div class="slide-caption">
                    <h3 class="font-weight-bold">Premium Service Provider</h3>
                  </div>
                </div>
              </VueSlickCarousel>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" md="9">
              <v-form class="search-form">
                <v-row class="mt-8">
                  <v-col cols="10" sm="11" text="left">
                    <v-text-field label="Search here ..." single-line outlined type="text" placeholder="Search here">
                    </v-text-field>
                  </v-col>
                  <v-col cols="2" sm="1" text="left" class="pl-0">
                    <v-btn color="#0D9647" class="white--text" height="56" min-width="50"><v-icon>search</v-icon></v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" md="6">
              <div class="ofs-listing text-left">
                <h1 class="font-weight-bold mb-3">Drilling Services</h1>
                <p>Pad Construction (23) Drilling Companies (13) Drilling Companies (13)
                  Pipe Service (99) Pad Construction (23) Pad Construction (23)
                  Drilling Companies (13) Pad Construction (23) Pad Construction (23)
                  Trucking Companies (12)</p>
              </div>
            </v-col>
            <v-col cols="12" md="6">
              <div class="ofs-listing text-left">
                <h1 class="font-weight-bold mb-3">Completion Services</h1>
                <p>Water Service (23) Water Transfer (13) Chemicals (92) Wireline (99)
                  Wireline (99) Coiled Tubbing (44) Chemicals (92) Water Service (23)
                  Water Service (23) Water Transfer (13) Coiled Tubbing (44)
                  Wireline (99) Coiled Tubbing (44) Chemicals (92)</p>
              </div>
            </v-col>
            <v-col cols="12" md="6">
              <div class="ofs-listing text-left">
                <h1 class="font-weight-bold mb-3">Land & Legal Services</h1>
                <p>Pad Construction (23) Drilling Companies (13) Drilling Companies (13)
                  Pipe Service (99) Pad Construction (23) Pad Construction (23)
                  Drilling Companies (13) Pad Construction (23) Pad Construction (23)
                  Trucking Companies (12)</p>
              </div>
            </v-col>
            <v-col cols="12" md="6">
              <div class="ofs-listing text-left">
                <h1 class="font-weight-bold mb-3">Equipment & Rental Companies</h1>
                <p>Pad Construction (23) Drilling Companies (13) Drilling Companies (13)
                  Pipe Service (99) Pad Construction (23) Pad Construction (23)
                  Drilling Companies (13) Pad Construction (23) Pad Construction (23)
                  Trucking Companies (12)</p>
              </div>
            </v-col>
            <v-col cols="12" md="6">
              <div class="ofs-listing text-left">
                <h1 class="font-weight-bold mb-3">Environmental & HSE</h1>
                <p>Pad Construction (23) Drilling Companies (13) Drilling Companies (13)
                  Pipe Service (99) Pad Construction (23) Pad Construction (23)
                  Drilling Companies (13) Pad Construction (23) Pad Construction (23)
                  Trucking Companies (12)</p>
              </div>
            </v-col>
            <v-col cols="12" md="6">
              <div class="ofs-listing text-left">
                <h1 class="font-weight-bold mb-3">Engineering</h1>
                <p>Pad Construction (23) Drilling Companies (13) Drilling Companies (13)
                  Pipe Service (99) Pad Construction (23) Pad Construction (23)
                  Drilling Companies (13) Pad Construction (23) Pad Construction (23)
                  Trucking Companies (12)</p>
              </div>
            </v-col>
          </v-row>
          <v-row justify="center" class="mb-15 mt-16">
            <v-col cols="12" md="12">
              <div class="ofs-bottom-section text-left">
                <div class="ofs-bottom-content d-flex justify-space-between">
                  <div class="ml-5 ml-sm-5 my-5 my-sm-12">
                    <h1 class="mb-4 font-weight-medium white--text">OFS DIRECTORY</h1>
                    <h1 class="white--text font-weight-bold mb-0 title">Get listed today<br>
                    For free</h1>
                  </div>
                  <div class="mt-5 mt-sm-5 mr-5 mr-sm-8">
                    <img
                      :src="require('@/assets/images/green-black.png')"
                       width="102px"
                    >
                  </div>
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
  import VueSlickCarousel from 'vue-slick-carousel'
  import 'vue-slick-carousel/dist/vue-slick-carousel.css'
    // optional style for arrows & dots
  import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
export default {
  name : "ModuleSelection",
  components: {
    NavbarBeforeLogin,
    Footer,
    VueSlickCarousel
  },
  
  data() {
    return {
      settings: {
        "arrows": true,
        "dots": false,
        "infinite": true,
        "slidesToShow": 3,
        "slidesToScroll": 3,
        "touchThreshold": 5,
        "autoplay": true,
        "autoplaySpeed": 5000,
        "pauseOnDotsHover": true,
        "pauseOnFocus": true,
        "pauseOnHover": true,
        "prev-icon": 'mdi-arrow-left',
        "responsive": [
            {
              "breakpoint": 950,
              "settings": {
                "slidesToShow": 3,
                "slidesToScroll": 3,
                "infinite": true,
                "dots": true,
                "arrows": false
              }
            },
            {
              "breakpoint": 600,
              "settings": {
                "slidesToShow": 2,
                "slidesToScroll": 2,
                "initialSlide": 2,
                "arrows": false,
                "dots" : true
              }
            },
            {
              "breakpoint": 480,
              "settings": {
                "slidesToShow": 1,
                "slidesToScroll": 1,
                "arrows": false,
                "dots" : true
              }
            }
          ]
      },
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
