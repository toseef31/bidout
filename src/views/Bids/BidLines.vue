<template>
	<div>
		<div class="bidline-section">
      <h4 class="text-left pl-6 font-weight-bold black--text my-4">Bid Line Items</h4>
      <div class="bidline-list d-flex align-center px-6 my-2">
        <div class="mt-6 mr-2 bid-item">
          <img :src="require('@/assets/images/bids/DotsSix.png')">
        </div>
        <div class="mr-2 bid-item">
          <label class="d-block input-label text-left">Line Item Description</label>
          <v-text-field placeholder="Line Item Description" height="31pxx" single-line outlined type="text" v-model="lineItems.description" hide-details>
          </v-text-field>
        </div>
        <div class="mr-2 bid-item">
          <label class="d-block input-label text-left">Unit/Measure</label>
          <v-select outlined hide-details :items="units" v-model="lineItems.unit"></v-select>
        </div>
        <div class="mr-2 bid-item">
          <label class="d-block input-label text-left">Input Type</label>
          <v-select outlined hide-details :items="inputType" v-model="lineItems.inputType"></v-select>
        </div>
        <div class="mr-2 bid-item">
          <label class="d-block input-label text-left">QTY</label>
          <v-text-field placeholder="Line Item Description" height="31pxx" single-line outlined type="text" v-model="lineItems.quantity" hide-details>
          </v-text-field>
        </div>
        <div class="mr-2 bid-item">
          <label class="d-block input-label text-left">Buyer Comment</label>
          <v-text-field placeholder="Line Item Description" height="31pxx" single-line outlined type="text" v-model="lineItems.buyerComment" hide-details>
          </v-text-field>
        </div>
        <div class="mr-2 d-flex">
          <v-switch
            v-model="switch1"
            inset class="mr-4"
          ></v-switch>
          <v-icon color="#0D9648" class="mr-4">mdi-content-copy</v-icon>
          <v-icon color="#F32349" class="mr-4">mdi-trash-can-outline</v-icon>
        </div>
      </div>
      <div class="bidline-list d-flex align-center px-6 my-2">
        <div class="mt-6 mr-2 bid-item">
          <img :src="require('@/assets/images/bids/DotsSix.png')">
        </div>
        <div class="mr-2 bid-item">
          <label class="d-block input-label text-left">Line Item Description</label>
          <v-text-field placeholder="Line Item Description" height="31pxx" single-line outlined type="text" hide-details>
          </v-text-field>
        </div>
        <div class="mr-2 bid-item">
          <label class="d-block input-label text-left">Unit/Measure</label>
          <v-select outlined hide-details :items="units"></v-select>
        </div>
        <div class="mr-2 bid-item">
          <label class="d-block input-label text-left">Input Type</label>
          <v-select outlined hide-details :items="inputType"></v-select>
        </div>
        <div class="mr-2 bid-item">
          <label class="d-block input-label text-left">QTY</label>
          <v-text-field placeholder="Line Item Description" height="31pxx" single-line outlined type="text" hide-details>
          </v-text-field>
        </div>
        <div class="mr-2 bid-item">
          <label class="d-block input-label text-left">Buyer Comment</label>
          <v-text-field placeholder="Line Item Description" height="31pxx" single-line outlined type="text" hide-details>
          </v-text-field>
        </div>
        <div class="mr-2 d-flex">
          <v-switch
            v-model="switch1"
            inset class="mr-4"
          ></v-switch>
          <v-icon color="#0D9648" class="mr-4">mdi-content-copy</v-icon>
          <v-icon color="#F32349" class="mr-4">mdi-trash-can-outline</v-icon>
        </div>
      </div>
    </div>
    <v-row justify="center" align="center" class="my-8" no-gutters>
      <v-col cols="12">
        <v-btn rounded color="rgba(13, 150, 72, 0.1)" elevation="0" class="text-capitalize font-weight-bold"><v-icon color="#0D9648" class="pr-2">mdi-plus</v-icon> Add 5 Line Items</v-btn>
      </v-col>
    </v-row>
    <div class="bidline-section bid-list">
      <h4 class="text-left pl-6 font-weight-bold black--text my-4">Bid Example</h4>
      <div class="bidline-list d-flex align-center px-6 my-2">
        <div class="mt-6 mr-2 bid-item">
          <img :src="require('@/assets/images/bids/DotsSix.png')">
        </div>
        <div class="mr-2 bid-item">
          <label class="d-block input-label text-left">Line Item Description</label>
          <v-text-field placeholder="Line Item Description" height="31pxx" single-line outlined type="text" v-model="exampleItems.description" hide-details>
          </v-text-field>
        </div>
        <div class="mr-2 bid-item">
          <label class="d-block input-label text-left">Unit/Measure</label>
          <v-select outlined hide-details :items="units" v-model="exampleItems.unit"></v-select>
        </div>
        <div class="mr-2 bid-item">
          <label class="d-block input-label text-left">Input Type</label>
          <v-select outlined hide-details :items="inputType" v-model="exampleItems.inputType"></v-select>
        </div>
        <div class="mr-2 bid-item">
          <label class="d-block input-label text-left">QTY</label>
          <v-text-field placeholder="Line Item Description" height="31px" single-line outlined type="text" v-model="exampleItems.quantity" hide-details>
          </v-text-field>
        </div>
        <div class="mr-2 bid-item">
          <label class="d-block input-label text-left">Buyer Comment</label>
          <v-text-field placeholder="Line Item Description" height="31pxx" single-line outlined type="text" v-model="exampleItems.buyerComment" hide-details>
          </v-text-field>
        </div>
        <div class="mr-2 d-flex">
          <v-switch
            v-model="switch1"
            inset class="mr-4"
          ></v-switch>
          <v-icon color="#0D9648" class="mr-4">mdi-content-copy</v-icon>
          <v-icon color="#F32349" class="mr-4">mdi-trash-can-outline</v-icon>
        </div>
      </div>
    </div>
    <v-row justify="center" align="center" no-gutters class="mt-16">
      <v-col cols="12">
        <v-btn color="#0D9648" elevation="0" class="white--text text-capitalize font-weight-bold save-btn py-4 px-9" large height="56px">Save Changes</v-btn>
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
      
      switch1: true,
      inputType: ['USD','EUR'],
      units: ['Gallon','Liter'],
      lineItems : [
      	{
      		description: '',
      		unit: '',
      		inputType: '',
      		quantity: '',
      		buyerComment: ''
      	}
      ],
      exampleItems : [
      	{
      		description: '',
      		unit: '',
      		inputType: '',
      		quantity: '',
      		buyerComment: ''
      	}
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