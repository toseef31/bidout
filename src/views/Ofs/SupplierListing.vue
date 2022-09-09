<template>
  <v-col class="catgeory-module ofsSupplier-module white  pa-0 pa-sm-3 pl-sm-0 pb-sm-0" :class="[ showSideBar ? 'col-md-9 col-12 col-sm-7' : 'mid-content-collapse', activityPanel ? 'd-sm-block' : 'd-md-block']" v-show="!activityPanel">
    <div class="mid-content">
      <div class="content-section fill-height">
        <v-container class="px-sm-0">
          <v-row justify="center">
            <v-col cols="12" md="12">
              <div class="category-list">
                <div class="d-flex justify-space-between px-4">
                  <h1 class="text-left service-title mb-8">{{allcompanies.name}}</h1>
                  <div class="category-list__searchBox">
                    <v-text-field
                      v-model="searchCompany"
                      prepend-inner-icon="search"
                      placeholder="Search here..."
                      single-line
                      outlined min-height="40px" min-width="100%"
                      hide-details
                    ></v-text-field>
                  </div>
                </div>
                <div class="d-flex align-center tabs-header mb-3 px-4">
                  <v-tabs
                    v-model="tab"
                    hide-slider class="service-tabs"
                  >

                    <v-tab
                      v-for="item in items"
                      :key="item"
                    >
                      <span class="text-capitalize">{{ item }}</span>
                    </v-tab>
                  </v-tabs>
                  
                </div>
                <v-tabs-items v-model="tab">
                  <v-tab-item
                    v-for="item in items"
                    :key="item"
                  >
                    <v-simple-table dense class="company-table mb-12">
                      <template v-slot:default>
                        <thead>
                          <tr class="py-4 px-6">
                            <th class=" pl-6">Companies</th>
                            <th>HQ Location</th>
                            <th>Employees</th>
                            <th>Field Locations</th>
                            <th>Account Contacts</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="company in allcompanies.data"
                            :key="company.objectID"
                          >
                            <td class="pl-6">{{ company.company }} 
                              
                            </td>
                            <td>{{ company.hQLocation }}</td>
                            <td>{{ company.employees }}</td>
                            <td>{{ company.fieldLocations }}</td>
                            <td>{{ company.accountContacts }}</td>
                            <td><router-link to="/company-profile" class="text-decoration-none">View Details</router-link></td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                    <!-- <v-pagination
                      v-model="page"
                      :length="4"
                      color="#0D9647"
                      next-icon="mdi-arrow-right"
                      prev-icon="mdi-arrow-left"
                    ></v-pagination> -->
                  </v-tab-item>
                </v-tabs-items>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </div>
  </v-col>
</template>
<script>
  import Navbar from '../Layout/Navbar.vue'
  import LeftSidebar from '../Layout/Dashboard/LeftSidebar.vue'
  import _ from 'lodash';
  import { mapActions } from "vuex";
export default {
  name : "SupplierListing",
  components: {
    Navbar,
    LeftSidebar,
  },
  
  data() {
    return {
      tab: null,
      searchCompany: '',
      page: 1,
      items: [
        'All', 'Gulf Coast', 'Northwest', 'Rockies', 'Mid-Con', 'Permian', 'Arklatex', 'Offshore', 'Other',
      ],
      headers: [
        {
          text: 'Companies',
          align: 'start',
          value: 'companies',
        },
        { text: 'HQ Location', value: 'hQLocation'},
        { text: 'Employees', value: 'employees'},
        { text: 'Field Locations', value: 'fieldLocations' },
        { text: 'Account Contacts', value: 'accountContacts'},
        { text: '', value: 'link'},
      ],
    };
  },
  computed:{
    showSideBar(){
      return this.$store.getters.g_sideBarOpen;
    },
    activityPanel(){
      return this.$store.getters.g_activityPanel;
    },
   allcompanies(){
    if(this.searchCompany){
      return this.$store.getters.serviceCompanies.filter((companies)=>{
        return this.searchCompany.toLowerCase().split(' ').every(v => companies.name.toLowerCase().includes(v))
      })
    }else{
      return this.$store.getters.serviceCompanies;
    }
   },
  },
  methods: {
    
  },
  mounted() {
    document.title = "Categories - BidOut" 
  }
};
</script>
<style scoped lang="scss">

</style>
