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
                  <div class="order-box mt-10">
                    <v-form>
                      <v-row>
                        <v-col cols="12" md="12">
                          <v-textarea outlined placeholder="Please submit your needs here" rows="8" v-model="content"></v-textarea>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <v-btn width="220px" height="52px" color="#0D9648" class="white--text text-capitalize submit-btn font-weight-bold" @click="orderPlace">Submit</v-btn>
                        </v-col>
                      </v-row>
                    </v-form>
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
      if(this.$store.getters.supplierCompany && this.$store.getters.supplierCompany.companyData){
        return this.$store.getters.supplierCompany.companyData;
      }
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
    orderPlace(){
      var data = {
        companyId: this.supplierData._id,
        companyName: this.supplierData.companyName,
        content: this.content,
        buyerId: this.$store.getters.userInfo._id,
        slug: this.supplierData.slug,
      }
      this.placeOrder(data);
    },
    setOrder(){
      this.orderStatus = false;
    }
  },
  async created(){
    await this.viewPublicCompany();
  },
  mounted() {
    document.title = "Place Order - BidOut";
  },
};
</script>
