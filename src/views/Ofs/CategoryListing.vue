<template>
  <section class="fill-height catgeory-module white">
    <NavbarBeforeLogin></NavbarBeforeLogin>
      <v-container>
        <v-main>
          <v-row justify="center">
            <v-col cols="12" md="12">
              <div class="category-list">
                <h1 class="text-left service-title mb-8">Drilling Services</h1>
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
                      v-model="search"
                      prepend-inner-icon="search"
                      label="Search here..."
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
                            v-for="item in desserts"
                            :key="item.companies"
                          >
                            <td class="pl-8">{{ item.companies }} 
                              
                            </td>
                            <td>{{ item.hQLocation }}</td>
                            <td>{{ item.employees }}</td>
                            <td>{{ item.fieldLocations }}</td>
                            <td>{{ item.accountContacts }}</td>
                            <td>View Details</td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                    <v-pagination
                      v-model="page"
                      :length="4"
                      color="#0D9647"
                      next-icon="mdi-arrow-right"
                      prev-icon="mdi-arrow-left"
                    ></v-pagination>
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
export default {
  name : "ModuleSelection",
  components: {
    NavbarBeforeLogin,
    Footer,
  },
  
  data() {
    return {
      tab: null,
      search: '',
      page: 1,
      items: [
        'All', 'Gulf Coast', 'Northwest', 'Rockies', 'Mid-Con', 'Permian', 'Arklatex', 'Offshore',
      ],
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      headers: [
        {
          text: 'Companies',
          align: 'start',
          sortable: false,
          value: 'companies',
        },
        { text: 'HQ Location', value: 'hQLocation' ,sortable: false},
        { text: 'Employees', value: 'employees' ,sortable: false},
        { text: 'Field Locations', value: 'fieldLocations' ,sortable: false },
        { text: 'Account Contacts', value: 'accountContacts' ,sortable: false},
        { text: '', value: 'iron' ,sortable: false},
      ],
      desserts: [
        {
          companies: 'Peterson-UTI',
          image: 'badge.png',
          hQLocation: 'Houston TX USA',
          employees: '2100+',
          fieldLocations: 11,
          accountContacts: 1,
        },
        {
          companies: 'Nabors',
          image: 'badge.png',
          hQLocation: 'Houston TX USA',
          employees: '1800+',
          fieldLocations: 4,
          accountContacts: 7,
        },
        {
          companies: 'Cactus Drilling',
          image: 'badge.png',
          hQLocation: 'Oklahoma City OK USA',
          employees: '22+',
          fieldLocations: 4,
          accountContacts: 2,
        },
        {
          companies: 'Peterson-UTI',
          image: 'badge.png',
          hQLocation: 'Houston TX USA',
          employees: '2100+',
          fieldLocations: 11,
          accountContacts: 1,
        },
        {
          companies: 'Nabors',
          image: 'badge.png',
          hQLocation: 'Houston TX USA',
          employees: '1800+',
          fieldLocations: 4,
          accountContacts: 7,
        },
        {
          companies: 'Cactus Drilling',
          image: 'badge.png',
          hQLocation: 'Oklahoma City OK USA',
          employees: '22+',
          fieldLocations: 4,
          accountContacts: 2,
        },
        {
          companies: 'Peterson-UTI',
          image: 'badge.png',
          hQLocation: 'Houston TX USA',
          employees: '2100+',
          fieldLocations: 11,
          accountContacts: 1,
        },
        {
          companies: 'Nabors',
          image: 'badge.png',
          hQLocation: 'Houston TX USA',
          employees: '1800+',
          fieldLocations: 4,
          accountContacts: 7,
        },
        {
          companies: 'Cactus Drilling',
          image: 'badge.png',
          hQLocation: 'Oklahoma City OK USA',
          employees: '22+',
          fieldLocations: 4,
          accountContacts: 2,
        },
        {
          companies: 'Peterson-UTI',
          image: 'badge.png',
          hQLocation: 'Houston TX USA',
          employees: '2100+',
          fieldLocations: 11,
          accountContacts: 1,
        },
        {
          companies: 'Nabors',
          image: 'badge.png',
          hQLocation: 'Houston TX USA',
          employees: '1800+',
          fieldLocations: 4,
          accountContacts: 7,
        },
        {
          companies: 'Cactus Drilling',
          image: 'badge.png',
          hQLocation: 'Oklahoma City OK USA',
          employees: '22+',
          fieldLocations: 4,
          accountContacts: 2,
        },
        {
          companies: 'Peterson-UTI',
          image: 'badge.png',
          hQLocation: 'Houston TX USA',
          employees: '2100+',
          fieldLocations: 11,
          accountContacts: 1,
        },
        {
          companies: 'Nabors',
          image: 'badge.png',
          hQLocation: 'Houston TX USA',
          employees: '1800+',
          fieldLocations: 4,
          accountContacts: 7,
        },
        {
          companies: 'Cactus Drilling',
          image: 'badge.png',
          hQLocation: 'Oklahoma City OK USA',
          employees: '22+',
          fieldLocations: 4,
          accountContacts: 2,
        },
      ],
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
