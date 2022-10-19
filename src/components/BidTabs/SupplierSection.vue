<template>
	<div>
		<v-row class="my-4 supplier-row fill-height" no-gutters>
		  <v-col sm="2" v-if="categories" class="category-col"> 
		  	<v-list class="pt-0">
  	      <v-list-group
  	        v-for="category in allcategories"
  	        :key="category.name" active-class="black--text"
  	      >
  	        <template v-slot:activator>
  	          <v-list-item-content>
  	            <v-list-item-title v-text="category.name" class="text-left"></v-list-item-title>
  	          </v-list-item-content>
  	        </template>

  	        <v-list-item class="ml-3"
  	          v-for="subcategry in subCategories(category.subCategories)"
  	          :key="subcategry.name"
  	        >
  	          <v-list-item-content>
  	            <v-list-item-title v-text="subcategry.name" class="text-left"></v-list-item-title>
  	          </v-list-item-content>
  	        </v-list-item>
  	      </v-list-group>
  	    </v-list>
		  </v-col>
		  <v-col cols="12" sm="6" class="available-data">
		    <div class="d-flex justify-space-between align-center pl-4 supplier-head">
		      <div>
		        <h4 class="mb-0 black--text font-weight-bold">Available Suppliers</h4>
		      </div>
		      <div>
		        <v-tabs class="supplier-tabs" hide-slider v-model="availableSuppl">
		          <v-tab class="text-capitalize font-weight-bold" href="#companyName" @click="hideCategories">Company Name</v-tab>
		          <v-tab class="text-capitalize font-weight-bold" href="#salesRep" @click="hideCategories">Sales Rep</v-tab>
		          <v-tab class="text-capitalize font-weight-bold" href="#serviceCategory" @click="categories = !categories">Service Category</v-tab>
		        </v-tabs>
		      </div>
		    </div>
		    
		    <v-tabs-items v-model="availableSuppl">
		      <v-tab-item value="companyName">
		        <div class="available-search d-flex justify-space-between align-center mt-5 px-4">
		          <div>
		            <v-text-field
		              type="text" hide-details
		              outlined
		              placeholder="Search"
		              prepend-inner-icon="mdi-magnify"
		            >
		            </v-text-field>
		          </div>
		          <div class="d-flex align-center">
		            <label class="input-label black--text pr-2 font-weight-bold">Basin</label>
		            <v-select rounded hide-details outlined class="available-select" :items="availableSearch" width="150px" v-model="basinFilter" min-height="28px" @change="getSales"></v-select>
		          </div>
		        </div>
		        <div class="companies-list">
		          <div class="d-flex align-center justify-space-between list-company pa-4">
		            <div class="comapny-data d-flex align-center">
		              <div class="company-img">
		                <img :src="require('@/assets/images/bids/patterson.png')">
		              </div>
		              <div class="company-title text-left pl-4">
		                <h4>Patterson-UTI, Inc</h4>
		                <p class="mb-0"><router-link to="">View Profile</router-link></p>
		              </div>
		            </div>
		            <div class="add-company">
		              <v-btn color="rgba(13, 150, 72, 0.1)" tile min-width="32px" height="32" class="pa-0" elevation="0"> <v-icon color="#0D9648">mdi-plus</v-icon></v-btn>
		            </div>
		          </div>
		          <div class="d-flex align-center justify-space-between list-company pa-4">
		            <div class="comapny-data d-flex align-center">
		              <div class="company-img">
		                <img :src="require('@/assets/images/bids/ms.png')">
		              </div>
		              <div class="company-title text-left pl-4">
		                <h4>MS Directional, Inc</h4>
		                <p class="mb-0"><router-link to="">View Profile</router-link></p>
		              </div>
		            </div>
		            <div class="add-company">
		              <v-btn color="rgba(13, 150, 72, 0.1)" tile min-width="32px" height="32" class="pa-0" elevation="0"> <v-icon color="#0D9648">mdi-plus</v-icon></v-btn>
		            </div>
		          </div>
		          <div class="d-flex align-center justify-space-between list-company pa-4">
		            <div class="comapny-data d-flex align-center">
		              <div class="company-img">
		                <img :src="require('@/assets/images/bids/superior.png')">
		              </div>
		              <div class="company-title text-left pl-4">
		                <h4>Superior QC</h4>
		                <p class="mb-0"><router-link to="">View Profile</router-link></p>
		              </div>
		            </div>
		            <div class="add-company">
		              <v-btn color="rgba(13, 150, 72, 0.1)" tile min-width="32px" height="32" class="pa-0" elevation="0"> <v-icon color="#0D9648">mdi-plus</v-icon></v-btn>
		            </div>
		          </div>
		        </div>
		      </v-tab-item>
		      <v-tab-item value="salesRep">
		        <div class="available-search d-flex justify-space-between align-center mt-5 px-4">
		          <div>
		            <v-text-field
		              type="text" hide-details
		              outlined
		              placeholder="Search"
		              prepend-inner-icon="mdi-magnify" v-model="searchCompany" @keyup="getSales"
		            >
		            </v-text-field>
		          </div>
		          <div class="d-flex align-center">
		            <label class="input-label black--text pr-2 font-weight-bold">Basin</label>
		            <v-select rounded hide-details outlined class="available-select" :items="availableSearch" width="150px" v-model="basinFilter" @change="getSales"></v-select>
		          </div>
		        </div>
		        <div class="companies-list">
		          <div class="d-flex align-center justify-space-between list-company pa-4" v-for="(list,index) in salesRepsList">
		            <div class="comapny-data d-flex align-center">
		              <div class="company-img">
		                <img v-if="!list.image" :src="require('@/assets/images/chat/chatUser.png')">
		                <img v-else :src="list.image" width="48px" height="48px">
		              </div>
		              <div class="company-title text-left pl-4">
		                <h4>{{list.firstName}} {{list.lastName}}</h4>
		                <p class="mb-0">{{list.company}} <a @click="viewCompany(team.companyId,team.company)" class="text-decoration-underline">View Profile</a></p>
		              </div>
		            </div>
		            <div class="add-company">
		              <v-btn color="rgba(13, 150, 72, 0.1)" tile min-width="32px" height="32" class="pa-0" elevation="0" @click="addReps(list,index)"> <v-icon color="#0D9648">mdi-plus</v-icon></v-btn>
		            </div>
		          </div>
		        </div>
		      </v-tab-item>
		      <v-tab-item value="serviceCategory">
		        <div class="available-search d-flex justify-space-between align-center mt-5 px-4">
		          <!-- <div>
		            <v-text-field
		              type="text" hide-details
		              outlined
		              placeholder="Search"
		              prepend-inner-icon="mdi-magnify"
		            >
		            </v-text-field>
		          </div> -->
		          <div class="d-flex align-center">
		            <label class="input-label black--text pr-2 font-weight-bold">Basin</label>
		            <v-select rounded hide-details outlined class="available-select" :items="availableSearch" width="150px"></v-select>
		          </div>
		        </div>
		        <div class="companies-list">
		          <div>
		            <div class="d-flex align-center justify-space-between list-company pa-4">
		              <div class="comapny-data d-flex align-center">
		                <div class="pr-4">
		                  <v-icon>mdi-chevron-down</v-icon>
		                </div>
		                <div class="company-img">
		                  <img :src="require('@/assets/images/bids/patterson.png')">
		                </div>
		                <div class="company-title text-left pl-4">
		                  <h4>Patterson-UTI, Inc</h4>
		                  <p class="mb-0"><router-link to="">View Profile</router-link></p>
		                </div>
		              </div>
		              <div class="add-company">
		                <v-btn color="rgba(13, 150, 72, 0.1)" tile min-width="32px" height="32" class="pa-0" elevation="0"> <v-icon color="#0D9648">mdi-plus</v-icon></v-btn>
		              </div>
		            </div>
		            <div class="d-flex align-center justify-space-between list-company pa-4 pl-16">
		              <div class="comapny-data d-flex align-center">
		                <div class="company-img">
		                  <img :src="require('@/assets/images/chat/chatUser.png')">
		                </div>
		                <div class="company-title text-left pl-4">
		                  <h4>Pat Hodges</h4>
		                  <p class="mb-0">Patterson-UTI<router-link to="">View Profile</router-link></p>
		                </div>
		              </div>
		              <div class="add-company">
		                <v-btn color="rgba(13, 150, 72, 0.1)" tile min-width="32px" height="32" class="pa-0" elevation="0"> <v-icon color="#0D9648">mdi-plus</v-icon></v-btn>
		              </div>
		            </div>
		          </div>
		          <div>
		            <div class="d-flex align-center justify-space-between list-company pa-4">
		              <div class="comapny-data d-flex align-center">
		                <div class="pr-4">
		                  <v-icon>mdi-chevron-down</v-icon>
		                </div>
		                <div class="company-img">
		                  <img :src="require('@/assets/images/bids/greatplans.png')">
		                </div>
		                <div class="company-title text-left pl-4">
		                  <h4>Great Plains Oilfield Rental </h4>
		                  <p class="mb-0"><router-link to="">View Profile</router-link></p>
		                </div>
		              </div>
		              <div class="add-company">
		                <v-btn color="rgba(13, 150, 72, 0.1)" tile min-width="32px" height="32" class="pa-0" elevation="0"> <v-icon color="#0D9648">mdi-plus</v-icon></v-btn>
		              </div>
		            </div>
		            <div class="d-flex align-center justify-space-between list-company pa-4 pl-16">
		              <div class="comapny-data d-flex align-center">
		                <div class="company-img">
		                  <img :src="require('@/assets/images/chat/chatUser.png')">
		                </div>
		                <div class="company-title text-left pl-4">
		                  <h4>Pat Hodges</h4>
		                  <p class="mb-0">Great Plains Oilfield Rental <router-link to="">View Profile</router-link></p>
		                </div>
		              </div>
		              <div class="add-company">
		                <v-btn color="rgba(13, 150, 72, 0.1)" tile min-width="32px" height="32" class="pa-0" elevation="0"> <v-icon color="#0D9648">mdi-plus</v-icon></v-btn>
		              </div>
		            </div>
		          </div>
		          
		        </div>
		        
		      </v-tab-item>
		    </v-tabs-items>
		  </v-col>
		  <v-col cols="12" class="invited-data available-data" :class="[ categories ? 'col-sm-4' : 'col-sm-6']">
		    <div class="d-flex justify-space-between align-center pl-4 py-3 invited-head">
		      <div>
		        <h4 class="mb-0 black--text font-weight-bold">Invited Services Suppliers</h4>
		      </div>
		    </div>
		    <div>
		      <div class="companies-list">
		        <div class="d-flex align-center justify-space-between list-company pa-4">
		          <div class="comapny-data d-flex align-center">
		            <div class="company-img">
		              <img :src="require('@/assets/images/bids/greatplans.png')">
		            </div>
		            <div class="company-title text-left pl-4">
		              <h4>Great Plains Oilfield Rental </h4>
		              <p class="mb-0"><router-link to="">View Profile</router-link></p>
		            </div>
		          </div>
		          <div class="add-company">
		            <v-btn color="rgba(243, 35, 73, 0.1)" tile min-width="32px" height="32" class="pa-0" elevation="0"> <v-icon color="#F32349">mdi-minus</v-icon></v-btn>
		          </div>
		        </div>
		        <div class="d-flex align-center justify-space-between list-company pa-4" v-for="(list,index) in repsInvited">
		          <div class="comapny-data d-flex align-center">
		            <div class="company-img">
		              <img :src="require('@/assets/images/chat/chatUser.png')">
		            </div>
		            <div class="company-title text-left pl-4">
		              <h4>{{list.firstName}} {{list.lastName}}</h4>
		              <p class="mb-0">{{list.company}} <a @click="viewCompany(team.companyId,team.company)" class="text-decoration-underline">View Profile</a></p>
		            </div>
		          </div>
		          <div class="add-company">
		            <v-btn color="rgba(243, 35, 73, 0.1)" tile min-width="32px" height="32" class="pa-0" elevation="0" @click="removeReps(list,index)"> <v-icon color="#F32349">mdi-minus</v-icon></v-btn>
		          </div>
		        </div>
		      </div>
		    </div>
		  </v-col>
		</v-row>
		<v-row justify="center" align="center" no-gutters>
		  <v-col cols="12" md="12">
		    
		    <v-dialog
          v-model="supplierDialog"
          width="800"
        >
          <template v-slot:activator="{ on, attrs }">
            
            <v-btn color="rgba(13, 150, 72, 0.1)" elevation="0" height="56px" width="220px" large class="text-capitalize font-weight-bold mt-8 mb-8 invite-btn mr-5" v-bind="attrs"
              v-on="on">Invite  New Supplier </v-btn>
          </template>

          <v-card class="inviteSupplier-dialog">
            <v-card-title class="text-h5 justify-end">
              <v-icon @click="supplierDialog = false" color="#0D1139"> mdi-close</v-icon>
            </v-card-title>

            <v-card-text>
            	<h2 class="text-left mb-6 font-weight-bold">Invite New Supplier</h2>
              <v-form
                ref="form"
                v-model="valid"
                lazy-validation
              >
                <label class="d-block text-left font-weight-bold mb-2">First Name</label>
                <v-text-field
                  v-model="firstName"
                  :rules="nameRules"
                  placeholder="First Name"
                  required
                  outlined
                ></v-text-field>
                <label class="d-block text-left font-weight-bold mb-2">Last Name</label>
                <v-text-field
                  v-model="lastName"
                  :rules="nameRules"
                  placeholder="Last Name"
                  required
                  outlined
                ></v-text-field>
                <label class="d-block text-left font-weight-bold mb-2">Company</label>
                <v-text-field
                  v-model="company"
                  :rules="companyRules"
                  placeholder="Company Name"
                  required
                  outlined
                ></v-text-field>
                <label class="d-block text-left font-weight-bold mb-2">Phone Number</label>
                <VuePhoneNumberInput :border-radius="8" size="lg" v-model="phoneNumber"
                  :translations="translations"
                  :loader="hasLoaderActive"
                  :error="hasErrorActive"
                  
                  @update="onUpdate"
                  />
                <label class="d-block text-left font-weight-bold mb-2 mt-6">Email</label>
                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  placeholder="example@email.com"
                  required
                  outlined
                ></v-text-field>

                <v-btn
                  :disabled="!valid"
                  color="#0D9648"
                  class="mr-4 text-capitalize white--text font-weight-bold"
                  @click="validate"
                  large
                  height="50px"
                  min-width="220px"
                >
                  Send Invite
                </v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-dialog>
		    <v-btn color="#0D9648" elevation="0" height="56px" width="220px" large class="white--text text-capitalize font-weight-bold mt-8 mb-8 save-btn" @click="changeTab">Save Changes</v-btn>
		  </v-col>
		</v-row>
	</div>
</template>
<script>
	import VuePhoneNumberInput from 'vue-phone-number-input';
	import 'vue-phone-number-input/dist/vue-phone-number-input.css';
	import _ from 'lodash';
  import { mapActions } from "vuex";
export default {
	components: {
		VuePhoneNumberInput
	},
  data() {
    return {
      availableSearch: ['Gulf Coast','Northwest','Rockies','Mid-Con','Permian','Arklatex','Offshore','Other'],
      availableSuppl: null,
      supplierDialog: false,
      valid: true,
      firstName: '',
      lastName: '',
      nameRules: [
        v => !!v || 'Name is required',
      ],
      company: '',
      companyRules: [
        v => !!v || 'Company name is required',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      phoneNumber: '',
      defaultCountry: 'US',
      translations: {
        countrySelectorLabel: 'Country Code',
        countrySelectorError: 'Choose country',
        phoneNumberLabel: 'Phone Number',
        example: 'Example'
      },
      hasLoaderActive: false,
      hasErrorActive: false,
      results: {},
      categories: false,
      searchCompany: '',
      basinFilter: '',
      repsInvited: [],
    };
  },
  computed:{
    allcategories(){
      setTimeout(() => this.loading = false, 500);
      return _.orderBy(this.$store.getters.categories, 'orderNumber', 'asc');
    },
    salesRepsList(){
    	return this.$store.getters.salesRepsList;
    }
  },
  methods: {
  	...mapActions(["getCategories","getSalesReps","getCompanyInfo"]),
    changeTab(){
      this.$emit('changetab', 'tab-3');
    },
    onUpdate (payload) {
      this.results = payload.formattedNumber;
    },
    validate() {
      this.$refs.form.validate();
    },
    hideCategories(){
    	this.categories = false;
    },
    subCategories(subCats){
     return _.orderBy(subCats, 'orderNumber', 'asc');
    },
    getSales(){
    	this.getSalesReps({'query':this.searchCompany,'basin':this.basinFilter})
    },
    viewCompany(id,name){
      this.getCompanyInfo({'id':id,'name':name});
    },
    addReps(list,index){
    	this.repsInvited.push(list);
    	this.$store.getters.salesRepsList.splice(index,1);
    },
    removeReps(list,index){
    	this.$store.getters.salesRepsList.push(list);
    	this.repsInvited.splice(index,1);
    },
  },
  mounted() {
    this.getCategories();
	}	
};
</script>