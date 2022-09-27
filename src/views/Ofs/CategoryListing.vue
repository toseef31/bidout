<template>
  <section class="fill-height catgeory-module white">
    <NavbarBeforeLogin></NavbarBeforeLogin>
      <v-container>
        <v-main class="mb-16">
          <v-row justify="center">
            <v-col cols="12" md="12">
              <div class="category-list">
                <h1 class="text-left service-title mb-8">{{allcompanies.name}}</h1>
                <div class="d-flex align-center tabs-header">
                  <v-tabs
                    v-model="tab"
                    hide-slider class="service-tabs mb-5"
                  >

                    <v-tab
                      v-for="item in items"
                      :key="item"
                    >
                      <span class="text-capitalize">{{ item }}</span>
                    </v-tab>
                  </v-tabs>
                  <div class="category-list__searchBox">
                    <v-text-field
                      v-model="searchCompany"
                      prepend-inner-icon="search"
                      placeholder="Search here..."
                      single-line
                      outlined height="56"
                      hide-details
                    ></v-text-field>
                  </div>
                </div>
                <v-tabs-items v-model="tab">
                  <v-tab-item
                    v-for="item in items"
                    :key="item"
                  >
                    <v-simple-table dense class="company-table mb-12">
                      <template v-slot:default>
                        <thead>
                          <tr class="py-4 px-8">
                            <th class=" pl-8">Companies</th>
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
                            <td class="pl-8">{{ company.company }} 
                              
                            </td>
                            <td>{{ company.hQLocation }}</td>
                            <td>{{ company.employees }}</td>
                            <td>{{ company.fieldLocations }}</td>
                            <td>{{ company.accountContacts }}</td>
                            <td><span @click="viewPublicCompany(company.objectID,company.company)" class="text-decoration-none company-link">View Details</span></td>
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
        </v-main>
      </v-container>
      <Footer></Footer>
   </section>
</template>
<script>
  import NavbarBeforeLogin from '../Layout/NavbarBeforeLogin.vue'
  import Footer from '../Layout/Footer.vue'
  import _ from 'lodash';
  import { mapActions } from "vuex";
export default {
  name : "ModuleSelection",
  components: {
    NavbarBeforeLogin,
    Footer,
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
    ...mapActions(["getPublicCompanyInfo"]),
    viewPublicCompany(id,name){
      this.getPublicCompanyInfo({'id':id,'name':name});
    }
  },
  mounted() {
    document.title = "Categories - BidOut" 
  }
};
</script>
<style scoped lang="scss">

</style>
