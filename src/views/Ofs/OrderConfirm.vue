<template>
  <v-row class="order-module catgeory-module ofsSupplier-module white pa-0 pa-sm-3 pl-sm-0 pb-sm-0">
    <v-col
      :class="[
        showSideBar ? 'col-md-12 col-12 col-sm-12' : 'mid-content-collapse',
        activityPanel ? 'd-sm-block' : 'd-md-block',
      ]"
      v-show="!activityPanel"
    >
      <div class="mid-content">
        <div class="content-section fill-height">
          <v-container class="px-sm-0">
            <v-row justify="center">
              <v-col cols="12" md="12">
                <div class="order-section pa-8">
                  <div class="top-section">
                    <h3 class="text-left font-weight-bold">Place order with {{supplierData.company}}</h3>
                    <div class="logo">
                      <v-img :src="supplierData.image" width="330px" height="90px"></v-img>
                    </div>
                  </div>
                  <div class="order-placed my-16">
                    <v-row justify="center">
                      <v-col cols="12" md="6">
                        <div class="order-content">
                          <v-img :src="require('@/assets/images/ofs/checked.png')" width="48px" height="48px" class="mx-auto"></v-img>
                          <p class="mt-6 text-left">This order has been sent to {{supplierData.company}}, you will be contacted directly from your account rep shortly.</p>
                        </div>
                      <router-link to="/view-ofs-suppliers" class="pt-5">View OFS Directory</router-link>
                      </v-col>
                    </v-row>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </div>
    </v-col>
  </v-row>
</template>
<script>
import _ from "lodash";
import { mapActions } from "vuex";
import Navbar from "../../components/Layout/Navbar.vue";
import LeftSidebar from "../../components/Layout/Dashboard/LeftSidebar.vue";

export default {
  name: "PlaceOrder",
  components: {
    Navbar,
    LeftSidebar,
  },

  data() {
    return {
      orderComplete: false,
      content: '',
    };
  },
  computed: {
    showSideBar() {
      return this.$store.getters.g_sideBarOpen;
    },
    activityPanel() {
      return this.$store.getters.g_activityPanel;
    },
    supplierData(){
      return this.$store.getters.supplierCompany.companyData;
    },
    orderStatus(){
      return this.$store.getters.orderStatus;
    },
  },
  watch: {
    
  },
  methods: {
    ...mapActions([
      "getCompanyInfo",
      "placeOrder",
    ]),
    viewPublicCompany() {
      this.getCompanyInfo({ slug : this.$route.fullPath.split('/').pop()});
    },
  },
  async created(){
    await this.viewPublicCompany();
  },
  mounted() {
    document.title = "Place Order - BidOut";
  },
};
</script>
