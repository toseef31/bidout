<template>
	<div>
		<v-row class="my-4 supplier-row fill-height" no-gutters>
		  <v-col sm="2" v-if="categories" class="category-col">
        {{itemBidId}}
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
  	          :key="subcategry.name"  @click="getByCategory(subcategry.slug)"
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
		          	<input type="hidden" name="" :value="validat">
		            <v-text-field
		              type="text" hide-details
		              outlined
		              placeholder="Search"
		              prepend-inner-icon="mdi-magnify" v-model="companySearch" @keyup="getCompanies"
		            >
		            </v-text-field>
		          </div>
		          <div class="d-flex align-center">
		            <label class="input-label black--text pr-2 font-weight-bold">Basin</label>
		            <v-select rounded hide-details outlined class="available-select text-capitalize" :items="availableSearch" width="150px" v-model="companyBasin" min-height="28px" @change="getCompanies"></v-select>
		          </div>
		        </div>
		        <div class="companies-list">
		          <div class="d-flex align-center justify-space-between list-company pa-4" v-for="(company,index) in companiesList" v-if="user.company.id != company.objectID">
		            <div class="comapny-data d-flex align-center">
		              <div class="company-img">
		                <img v-if="!company.image" :src="require('@/assets/images/bids/company.png')">
		                <img v-else :src="company.image" width="56.25px" height="15px">
		              </div>
		              <div class="company-title text-left pl-4">
		                <h4>{{company.company}}</h4>
										<router-link :to="`/company/${company.slug}`" target="_blank" class="mb-0">View Profile</router-link>
		              </div>
		            </div>
		            <div class="add-company">
		              <v-btn color="rgba(13, 150, 72, 0.1)" tile min-width="32px" height="32" class="pa-0" elevation="0" @click="addCompany(company,index)"> <v-icon color="#0D9648">mdi-plus</v-icon></v-btn>
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
		            <v-select rounded hide-details outlined class="available-select text-capitalize" :items="availableSearch" width="150px" v-model="basinFilter" @change="getSales"></v-select>
		          </div>
		        </div>
		        <div class="companies-list">
		          <div class="d-flex align-center justify-space-between list-company pa-4" v-for="(list,index) in salesRepsList" v-if="user.id != list.objectID">
		            <div class="comapny-data d-flex align-center">
		              <div class="company-img">
		                <img v-if="!list.image" :src="require('@/assets/images/chat/chatUser.png')">
		                <img v-else :src="list.image" width="48px" height="48px">
		              </div>
		              <div class="company-title text-left pl-4">
		                <h4>{{list.firstName}} {{list.lastName}}</h4>
		                <p class="mb-0">{{list.company}}
		                		<!-- <a @click="viewCompany(team.companyId,team.company)" class="text-decoration-underline">View Profile</a> -->
		                </p>
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

		        </div>
		        <div class="companies-list">
		          <div>
		            <div class="d-flex align-center justify-space-between list-company pa-4" v-for="(company,index) in companiesList" v-if="user.company.id != company.id">
		              <div class="comapny-data d-flex align-center">
		                <!-- <div class="pr-4">
		                  <v-icon>mdi-chevron-down</v-icon>
		                </div> -->
		                <div class="company-img">
		                  <img v-if="!company.image" :src="require('@/assets/images/bids/company.png')">
		                  <img v-else :src="company.image" width="56.25px" height="15px">
		                </div>
		                <div class="company-title text-left pl-4">
		                  <h4>{{company.company}}</h4>
		                  <router-link :to="`/company/${company.slug}`" target="_blank" class="mb-0">View Profile</router-link>
		                </div>
		              </div>
		              <div class="add-company">
		                <v-btn color="rgba(13, 150, 72, 0.1)" tile min-width="32px" height="32" class="pa-0" elevation="0" @click="addServiceCompany(company,index)"> <v-icon color="#0D9648">mdi-plus</v-icon></v-btn>
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
		        <template  v-if="filteredEntries.length">
	  	        <template v-for="(company,index) in filteredEntries" >
	  	        	<div class="d-flex align-center justify-space-between list-company pa-4">
	  	        	  <div class="comapny-data d-flex align-center">
	  	        	    <div class="company-img">
	  	        	      <img v-if="!company.image" :src="require('@/assets/images/bids/company.png')">
	  	        	      <img v-else :src="company.image" width="56.25px" height="15px">
	  	        	    </div>
	  	        	    <div class="company-title text-left pl-4">
	  	        	      <h4>{{company.company}} </h4>
	  									<router-link :to="`/company/${company.slug}`" target="_blank" class="mb-0">View Profile</router-link>
	  	        	    </div>
	  	        	  </div>
	  	        	  <div class="add-company">
	  	        	    <v-btn color="rgba(243, 35, 73, 0.1)" tile min-width="32px" height="32" class="pa-0" elevation="0" @click="removeCompany(company,index)"> <v-icon color="#F32349">mdi-minus</v-icon></v-btn>
	  	        	  </div>
	  	        	</div>
	  	        </template>
		        </template>
		        <template  v-for="(company,index) in newRepsInvited">
		        	<div class="d-flex align-center justify-space-between list-company pa-4">
		        	  <div class="comapny-data d-flex align-center">
		        	    <div class="company-img">
		        	      <img v-if="!company.image" :src="require('@/assets/images/bids/company.png')">
		        	      <img v-else :src="company.image" width="56.25px" height="15px">
		        	    </div>
		        	    <div class="company-title text-left pl-4">
		        	      <h4>{{company.firstName}} {{company.lastName}} </h4>
										<p>{{company.company}}</p>
										<!-- <router-link :to="`/company/${company.slug}`" target="_blank" class="mb-0">View Profile</router-link> -->
		        	    </div>
		        	  </div>
		        	  <div class="add-company">
		        	    <v-btn color="rgba(243, 35, 73, 0.1)" tile min-width="32px" height="32" class="pa-0" elevation="0" @click="removeNewSup(company,index)"> <v-icon color="#F32349">mdi-minus</v-icon></v-btn>
		        	  </div>
		        	</div>
		        </template>
		        <template  v-for="(company,index) in repsInvited">
		        	<div class="d-flex align-center justify-space-between list-company pa-4" v-if="!company.item.companyId">
		        	  <div class="comapny-data d-flex align-center">
		        	    <div class="company-img">
		        	      <img v-if="!company.item.image" :src="require('@/assets/images/bids/company.png')">
		        	      <img v-else :src="company.item.image" width="56.25px" height="15px">
		        	    </div>
		        	    <div class="company-title text-left pl-4">
		        	      <h4>{{company.item.company}} </h4>
										<router-link :to="`/company/${company.slug}`" target="_blank" class="mb-0">View Profile</router-link>
		        	    </div>
		        	  </div>
		        	  <div class="add-company">
		        	    <v-btn color="rgba(243, 35, 73, 0.1)" tile min-width="32px" height="32" class="pa-0" elevation="0" @click="removeCompany(company,index)"> <v-icon color="#F32349">mdi-minus</v-icon></v-btn>
		        	  </div>
		        	</div>
		        	<div class="d-flex align-center justify-space-between list-company pa-4" v-if="company.item.companyId">
		        	  <div class="comapny-data d-flex align-center">
		        	    <div class="company-img">
		        	      <img v-if="!company.item.image" :src="require('@/assets/images/chat/chatUser.png')">
		        	      <img v-else :src="company.item.image" width="48px" height="48px">
		        	    </div>
		        	    <div class="company-title text-left pl-4">
		        	      <h4>{{company.item.firstName}} {{company.item.lastName}}</h4>
		        	      <p class="mb-0">{{company.item.company}}
		        	      	<!-- <a @click="viewCompany(company.item.companyId,company.item.company)" class="text-decoration-underline">View Profile</a> -->
		        	      </p>
		        	    </div>
		        	  </div>
		        	  <div class="add-company">
		        	    <v-btn color="rgba(243, 35, 73, 0.1)" tile min-width="32px" height="32" class="pa-0" elevation="0" @click="removeReps(company,index)"> <v-icon color="#F32349">mdi-minus</v-icon></v-btn>
		        	  </div>
		        	</div>
		        </template>
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
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    VuePhoneNumberInput,
  },
  data() {
    return {
      availableSearch: ['All', 'Gulf Coast', 'Northeast', 'Rockies', 'Mid-Con', 'Permian', 'Arklatex', 'Offshore', 'Other'],
      availableSuppl: null,
      supplierDialog: false,
      valid: true,
      firstName: '',
      lastName: '',
      nameRules: [
        (v) => !!v || 'Name is required',
      ],
      company: '',
      companyRules: [
        (v) => !!v || 'Company name is required',
      ],
      email: '',
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      phoneNumber: '',
      defaultCountry: 'US',
      translations: {
        countrySelectorLabel: 'Country Code',
        countrySelectorError: 'Choose country',
        phoneNumberLabel: 'Phone Number',
        example: 'Example',
      },
      hasLoaderActive: false,
      hasErrorActive: false,
      results: {},
      categories: false,
      searchCompany: '',
      basinFilter: 'All',
      repsInvited: [],
      companySearch: '',
      companyBasin: 'All',
      invitedCompanies: [],
      itembidData: [],
      interval: '',
      valid: false,
      user: '',
      parsedSelectedBasin: 'all',
      parsedSelectedCompanyBasin: 'all',
      oldCount: '',
      newCount: '',
      filterData: [],
      newRepsInvited: [],
    };
  },
  computed: {
  	...mapGetters(['newSupplier', 'userInfo']),
    allcategories() {
      setTimeout(() => this.loading = false, 500);
      return _.orderBy(this.$store.getters.categories, 'orderNumber', 'asc');
    },
    salesRepsList() {
    	if(this.$route.name == 'EditBid'){
    		if(this.$store.getters.bidData.invitedSuppliers != ""){
    			return this.$store.getters.salesRepsList.filter((el) => { return !this.$store.getters.bidData.invitedSuppliers.find((supplier) => supplier.id === el.companyId); })
    		}else{
    			return this.$store.getters.salesRepsList ? this.$store.getters.salesRepsList.filter((rep) => rep.company !== this.userInfo.company.company) : [];
    		}
    	}else{
    		if(this.$store.getters.bidData.invitedSuppliers != ""){
    			return this.$store.getters.salesRepsList.filter((el) => { return !this.$store.getters.bidData.invitedSuppliers.includes(el.companyId); })
    		}else{
    			return this.$store.getters.salesRepsList ? this.$store.getters.salesRepsList.filter((rep) => rep.company !== this.userInfo.company.company) : [];
    		}
    	}
    },
    itemBidId() {
      return this.$store.getters.itemBidData;
    },
    companiesList() {
    	if(this.$route.name == 'EditBid'){
    		if(this.$store.getters.bidData.invitedSuppliers != ""){
    			return this.$store.getters.companiesList.filter((el) => { return !this.$store.getters.bidData.invitedSuppliers.find((supplier) => supplier.id === el.objectID); })
    		}else{
    			return this.$store.getters.companiesList ? this.$store.getters.companiesList.filter((rep) => rep.company !== this.userInfo.company.company) : [];
    		}
    	}else{
	  		if(this.$store.getters.bidData.invitedSuppliers != ""){
	  			return this.$store.getters.companiesList.filter((el) => { return !this.$store.getters.bidData.invitedSuppliers.includes(el.objectID); })
	  		}else{
	  			return this.$store.getters.companiesList;
	  		}
	  	}
    	
    },
    serviceCompanies() {
    	return this.$store.getters.serviceCompaniesList;
    },
    filteredEntries() {
    	if(this.$store.getters.bidData){
    		if(this.$store.getters.bidData.invitedSuppliers != ""){
    			if(this.$route.name == 'EditBid'){
    				return this.$store.getters.companiesList.filter((el) => { return this.$store.getters.bidData.invitedSuppliers.find((supplier) => supplier.id === el.objectID); }).slice();
    			}else{
    				return this.$store.getters.companiesList.filter((el) => { return this.$store.getters.bidData.invitedSuppliers.includes(el.objectID); }).slice();
    			}
    		}else{
    			return 0;
    		}
    	}else{
    		return [];
    	}
    	
    },
    validat() {
    	if (this.repsInvited.length > 0) {
    		this.$emit('validation', { valid: true, supplier: '2' });
    		return this.valid;
    	}
    		this.$emit('validation', { valid: false, supplier: '2' });
    		return this.valid;
    },
  },
  methods: {
  	...mapActions(['getCategories', 'getSalesReps', 'getCompanyInfo', 'searchByCompany', 'getCompanyByServices', 'saveDraftBid', 'inviteNewSupplier', 'updateDraftBid','updateTemplate','updateBid']),
    changeTab() {
    	if(this.$route.name == 'EditBid'){
    		this.updateBid({ invitedSuppliers: this.repsInvited });
			}else if(this.$route.name == 'EditTemplate'){
    	  this.updateTemplate({ invitedSuppliers: this.repsInvited });
    	}else{
    		this.updateDraftBid({ invitedSuppliers: this.repsInvited });
    	}
      this.$emit('changetab', 'tab-3');
    },
    onUpdate(payload) {
      this.results = payload.formattedNumber;
    },
    async validate() {
      const supplier = {
        firstName: this.firstName,
    		lastName: this.lastName,
    		company: this.company,
    		phone: this.results,
    		email: this.email,
    		bidTitle: this.$store.getters.bidData.title,
    		bidType: this.$store.getters.bidData.type,
    		bidDueDate: this.$store.getters.bidData.dueDate,
    		bidDueTime: this.$store.getters.bidData.dueTime,
    	};
    	if(this.$refs.form.validate()){
    		try {
    			const user = await this.inviteNewSupplier(supplier);
    			this.supplierDialog = false;
    			this.oldCount = this.newRepsInvited.length; 
    			this.newRepsInvited.push(user);
    			this.newCount = this.newRepsInvited.length;
    			this.$store.commit('setInvitedNewSuppliers', this.newRepsInvited);
    			this.$refs.form.reset();
    		} catch(error) {
    			console.log(error)
    		}
    	}
    },
    hideCategories() {
    	this.categories = false;
    },
    subCategories(subCats) {
      return _.orderBy(subCats, 'orderNumber', 'asc');
    },
    getSales() {
      if (this.basinFilter === 'All') {
        this.parsedSelectedBasin = 'all';
      } else {
        this.parsedSelectedBasin = this.basinFilter;
      }
    	this.getSalesReps({ query: this.searchCompany, basin: this.parsedSelectedBasin });
    },
    viewCompany(id, name) {
      this.getCompanyInfo({ id, name });
    },
    addReps(list, index) {
    	const data = {
    		type: 'user',
    		item: list,
    	};
    	this.oldCount = this.repsInvited.length; 
    	this.repsInvited.push(data);
    	this.newCount = this.repsInvited.length;
    	this.$store.getters.salesRepsList.splice(index, 1);
    	this.repsInvited = [...new Map(this.repsInvited.map((m) => [m.item.company, m])).values()];
    	console.log('respnss',this.repsInvited);
    	this.$store.commit('setInvitedSuppliersData', this.repsInvited);
    },
    removeReps(list, index) {
    	this.$store.getters.salesRepsList.push(list.item);
    	this.oldCount = this.repsInvited.length;
    	this.repsInvited.splice(index, 1);
    	this.newCount = this.repsInvited.length;
    	this.$store.commit('setInvitedSuppliersData', this.repsInvited);
    },
    getCompanies() {
      if (this.companyBasin === 'All') {
        this.parsedSelectedCompanyBasin = 'all';
      } else {
        this.parsedSelectedCompanyBasin = this.companyBasin;
      }
    	this.searchByCompany({ query: this.companySearch, basin: this.parsedSelectedCompanyBasin });
    },
    getByCategory(category) {
    	this.getCompanyByServices(category);
    },
    addCompany(company, index) {
    	const data = {
    		type: 'company',
    		item: company,
    	};
    	this.oldCount = this.repsInvited.length;
    	this.repsInvited.push(data);
    	this.newCount = this.repsInvited.length;
    	this.$store.getters.companiesList.splice(index, 1);
    	const unique = [...new Map(this.repsInvited.map((m) => [m.item.company, m])).values()];
    	console.log('comm',unique);
    	this.$store.commit('setInvitedSuppliersData', this.repsInvited);
    },
    addServiceCompany(company, index) {
    	const data = {
    		type: 'company',
    		item: company,
    	};
    	this.oldCount = this.repsInvited.length;
    	this.repsInvited.push(data);
    	this.newCount = this.repsInvited.length;
    	this.$store.getters.companiesList.splice(index, 1);
    	this.$store.commit('setInvitedSuppliersData', this.repsInvited);
    },
    removeCompany(company, index) {
    	this.oldCount = this.repsInvited.length;
    	this.repsInvited.splice(index, 1);
    	this.newCount = this.repsInvited.length;
    	this.$store.getters.companiesList.push(company.item);
    	this.$store.commit('setInvitedSuppliersData', this.repsInvited);
    },
    removeNewSup(company, index) {
    	this.oldCount = this.newRepsInvited.length;
    	this.newRepsInvited.splice(index, 1);
    	this.newCount = this.newRepsInvited.length;
    	this.$store.commit('setInvitedNewSuppliers', this.newRepsInvited);
    },
    savedraftOnInterval() {
  		const timer = setInterval(() => {
  			if(this.oldCount != this.newCount){
  				if(this.$route.name == 'EditBid'){
  					this.updateBid({ invitedSuppliers: this.repsInvited });
  				}else if(this.$route.name == 'EditTemplate'){
  				  this.updateTemplate({'invitedSuppliers':this.repsInvited});
  				}else{
  				  this.updateDraftBid({'invitedSuppliers':this.repsInvited});
  				}
  		  	this.oldCount = this.newCount;
  		  }
  		}, 60000);

  		this.$once("hook:beforeDestroy", () => {
  		  clearInterval(timer);
  		}); 
    },
  },
  beforeMount(){
  	this.getCategories();
  	this.getSales();
  	this.getCompanies();
  },
  mounted() {
  	this.user = this.$store.getters.userInfo;
    this.savedraftOnInterval();

  },
};
</script>
