<template>
  <v-col class="catgeory-module ofsSupplier-module white  pa-0 pa-sm-3 pl-sm-0 pb-sm-0" :class="[ showSideBar ? 'col-md-9 col-12 col-sm-7' : 'mid-content-collapse', activityPanel ? 'd-sm-block' : 'd-md-block']" v-show="!activityPanel">
    <div class="mid-content">
      <div class="content-section fill-height">
        <v-container class="px-sm-0">
          <v-row justify="center">
            <v-col cols="12" md="12">
              <div class="category-list">
                <div class="d-flex justify-space-between px-4">
                  <h1 class="text-left service-title mb-8">{{serviceName}}</h1>
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
                      :key="item" @click="getByBasin(item,serviceName)"
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
                            v-for="company in allcompanies"
                            :key="company.objectID"
                          >
                            <td class="pl-6"><span @click="viewCompany(company.objectID,company.company)" class="text-decoration-none company-link">{{ company.company }}</span> 
                              
                            </td>
                            <td><span v-if="!company.companyHq">No location</span><span v-else>{{ company.companyHq }}</span></td>
                            <td><span v-if="!company.employees">Not Added</span><span v-else>{{  company.employees }}</span></td>
                            <td> <span v-if="!company.companyHqState">No location</span><span v-else>{{company.companyHqCountry}},{{ company.companyHqState }}</span></td>
                            <td><span v-if="!company.accountContacts">No Contacts</span><span v-else>{{ company.accountContacts.length }}</span></td>
                            <td><span @click="viewCompany(company.objectID,company.company)" class="text-decoration-none company-link">View Details</span></td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                    
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
  import Navbar from '../../components/Layout/Navbar.vue'
  import LeftSidebar from '../../components/Layout/Dashboard/LeftSidebar.vue'
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
      return this.$store.getters.serviceCompanies.data;
    },
    serviceName(){
      return this.$store.getters.serviceCompanies.name;
    },
  },
  watch:{
    searchCompany: _.debounce(function(){
      return this.$store.getters.serviceCompanies.data.filter((companies)=>{
        return this.searchCompany.toLowerCase().split(' ').every(v => companies.company.toLowerCase().includes(v))
      })
    },500), 
  },
  methods: {
    ...mapActions(["getCompanyInfo","getCompanyByBasin","getSupplierMainService"]),
    viewCompany(id,name){
      this.getCompanyInfo({'id':id,'name':name});
    },
    getByBasin(basin,service){
      if(basin == 'All'){
        return this.$store.getters.serviceCompanies.data;
      }else{
        this.getCompanyByBasin({'basin': basin,'name': service});
      }
    },
  },
  mounted() {
    document.title = "Categories - BidOut" ;
  }
};
</script>
