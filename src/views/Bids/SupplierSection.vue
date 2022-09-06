<template>
	<div>
		<v-row class="my-4 supplier-row fill-height" no-gutters>
		  <v-col cols="12" sm="6" class="available-data">
		    <div class="d-flex justify-space-between align-center pl-4 supplier-head">
		      <div>
		        <h4 class="mb-0 black--text font-weight-bold">Available Suppliers</h4>
		      </div>
		      <div>
		        <v-tabs class="supplier-tabs" hide-slider v-model="availableSuppl">
		          <v-tab class="text-capitalize font-weight-bold" href="#companyName" >Company Name</v-tab>
		          <v-tab class="text-capitalize font-weight-bold" href="#salesRep">Sales Rep</v-tab>
		          <v-tab class="text-capitalize font-weight-bold" href="#serviceCategory">Service Category</v-tab>
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
		            <v-select rounded hide-details outlined class="available-select" :items="availableSearch" width="122px"></v-select>
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
		          <div class="d-flex align-center justify-space-between list-company pa-4 bg-light">
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
		              prepend-inner-icon="mdi-magnify"
		            >
		            </v-text-field>
		          </div>
		          <div class="d-flex align-center">
		            <label class="input-label black--text pr-2 font-weight-bold">Basin</label>
		            <v-select rounded hide-details outlined class="available-select" :items="availableSearch" width="122px"></v-select>
		          </div>
		        </div>
		        <div class="companies-list">
		          <div class="d-flex align-center justify-space-between list-company pa-4">
		            <div class="comapny-data d-flex align-center">
		              <div class="company-img">
		                <img :src="require('@/assets/images/chat/chatUser.png')">
		              </div>
		              <div class="company-title text-left pl-4">
		                <h4>Patrick Smith</h4>
		                <p class="mb-0">Baker Hughes <router-link to="">View Profile</router-link></p>
		              </div>
		            </div>
		            <div class="add-company">
		              <v-btn color="rgba(13, 150, 72, 0.1)" tile min-width="32px" height="32" class="pa-0" elevation="0"> <v-icon color="#0D9648">mdi-plus</v-icon></v-btn>
		            </div>
		          </div>
		          <div class="d-flex align-center justify-space-between list-company pa-4 bg-light">
		            <div class="comapny-data d-flex align-center">
		              <div class="company-img">
		                <img :src="require('@/assets/images/chat/chatUser.png')">
		              </div>
		              <div class="company-title text-left pl-4">
		                <h4>Pat Hodges</h4>
		                <p class="mb-0">Halli Burton <router-link to="">View Profile</router-link></p>
		              </div>
		            </div>
		            <div class="add-company">
		              <v-btn color="rgba(13, 150, 72, 0.1)" tile min-width="32px" height="32" class="pa-0" elevation="0"> <v-icon color="#0D9648">mdi-plus</v-icon></v-btn>
		            </div>
		          </div>
		        </div>
		      </v-tab-item>
		      <v-tab-item value="serviceCategory">
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
		            <v-select rounded hide-details outlined class="available-select" :items="availableSearch" width="122px"></v-select>
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
		  <v-col cols="12" sm="6" class="invited-data">
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
		        <div class="d-flex align-center justify-space-between list-company pa-4">
		          <div class="comapny-data d-flex align-center">
		            <div class="company-img">
		              <img :src="require('@/assets/images/chat/chatUser.png')">
		            </div>
		            <div class="company-title text-left pl-4">
		              <h4>Pat Hodges</h4>
		              <p class="mb-0">Halli Burton <router-link to="">View Profile</router-link></p>
		            </div>
		          </div>
		          <div class="add-company">
		            <v-btn color="rgba(243, 35, 73, 0.1)" tile min-width="32px" height="32" class="pa-0" elevation="0"> <v-icon color="#F32349">mdi-minus</v-icon></v-btn>
		          </div>
		        </div>
		      </div>
		    </div>
		  </v-col>
		</v-row>
		<v-row justify="center" align="center" no-gutters>
		  <v-col cols="12" md="12">
		    <v-btn color="rgba(13, 150, 72, 0.1)" elevation="0" height="56px" width="220px" large class="text-capitalize font-weight-bold mt-8 mb-8 invite-btn mr-5">Invite  New Supplier </v-btn>
		    <v-btn color="#0D9648" elevation="0" height="56px" width="220px" large class="white--text text-capitalize font-weight-bold mt-8 mb-8 save-btn" @click="changeTab">Save Changes</v-btn>
		  </v-col>
		</v-row>
	</div>
</template>
<script>
  import { mapActions } from "vuex";
export default {
  data() {
    return {
      availableSearch: ['All','Company'],
      availableSuppl: null,
    };
  },
  computed:{
    
  },
  methods: {
    changeTab(){
      this.$emit('changetab', 'tab-3');
    }
  },
  mounted() {
    
	}	
};
</script>