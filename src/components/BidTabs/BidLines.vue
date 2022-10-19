<template>
	<div>
		<div class="bidline-section">
      <h4 class="text-left pl-6 font-weight-bold black--text my-4">Bid Line Items</h4>
      
        
      <draggable
        :list="bidLines"
        :disabled="!enabled"
        class="list-group"
        ghost-class="ghost"
        :move="checkMove"
        @start="dragging = true"
        @end="dragging = false"
      >  
        <v-row class="bidline-list d-flex align-center px-6 my-2" v-for="items in bidLines">
          <v-col md="3" class="d-flex">
            <v-row>
              <v-col md="1">
                <div class="mt-6 mr-2 bid-item">
                  <img :src="require('@/assets/images/bids/DotsSix.png')">
                </div>
              </v-col>
              <v-col md="11">
                <div class="mr-2 bid-item">
                  <label class="d-block input-label text-left">Line Item Description</label>
                  <v-text-field placeholder="Line Item Description" v-model="items.description" height="31px" width="200px" single-line outlined type="text" hide-details>
                  </v-text-field>
                </div>
              </v-col>
            </v-row>
          </v-col>
          
          <v-col md="2">
            <div class="mr-2 bid-item">
              <label class="d-block input-label text-left">Unit/Measure</label>
              <v-select outlined hide-details v-model="items.unit" :items="units"></v-select>
            </div>
          </v-col>
          <v-col md="2">
            <div class="mr-2 bid-item">
              <label class="d-block input-label text-left">Input Type</label>
              <v-select outlined hide-details v-model="items.type" :items="inputType"></v-select>
            </div>
          </v-col>
          <v-col md="2">
            <div class="mr-2 bid-item">
              <label class="d-block input-label text-left">QTY</label>
              <v-text-field placeholder="Line Item Description" v-model="items.quantity" height="31px" single-line outlined type="text" hide-details>
              </v-text-field>
            </div>
          </v-col>
          <v-col md="3" class="d-flex">
            <div class="mr-2 bid-item">
              <label class="d-block input-label text-left">Buyer Comment</label>
              <v-text-field placeholder="Line Item Description"  v-model="items.buyerComment" height="31px" single-line outlined type="text" hide-details>
              </v-text-field>
            </div>
            <div class="d-flex">
              <v-checkbox
                v-model="items.switch1"
                inset class="mr-2 ml-2" hide-details
              ></v-checkbox>
              <v-icon color="#0D9648" class="mr-2 mt-6" @click="clone(items)">mdi-content-copy</v-icon>
              <v-icon color="#F32349" class=" mt-6">mdi-trash-can-outline</v-icon>
            </div>
          </v-col>
        </v-row>
      </draggable>
    </div>
    
    <v-row justify="center" align="center" class="my-8" no-gutters>
      <v-col cols="12">
        <v-btn rounded color="rgba(13, 150, 72, 0.1)" elevation="0" class="text-capitalize font-weight-bold"  @click="addItem"><v-icon color="#0D9648" class="pr-2">mdi-plus</v-icon> Add 5 Line Items</v-btn>
      </v-col>
    </v-row>
    <div class="bidline-section bid-list">
      <h4 class="text-left pl-6 font-weight-bold black--text my-4">Bid Example</h4>
      <v-row class="bidline-list d-flex align-center px-6 my-2" v-for="elements in exampleItems">
        <v-col md="3" class="d-flex">
          <v-row>
            <v-col md="1">
              <div class="mt-6 mr-2 bid-item">
                <img :src="require('@/assets/images/bids/DotsSix.png')">
              </div>
            </v-col>
            <v-col md="11">
              <div class="mr-2 bid-item">
                <label class="d-block input-label text-left">Line Item Description</label>
                <v-text-field placeholder="Line Item Description" v-model="elements.description" height="31px" width="200px" single-line outlined type="text" hide-details>
                </v-text-field>
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-col md="2">
          <div class="mr-2 bid-item">
            <label class="d-block input-label text-left">Unit/Measure</label>
            <v-select outlined hide-details :items="units" v-model="elements.unit"></v-select>
          </div>
        </v-col>
        <v-col md="2">
          <div class="mr-2 bid-item">
            <label class="d-block input-label text-left">Input Type</label>
            <v-select outlined hide-details :items="inputType" v-model="elements.inputType"></v-select>
          </div>
        </v-col>
        <v-col md="2">
          <div class="mr-2 bid-item">
            <label class="d-block input-label text-left">QTY</label>
            <v-text-field placeholder="Line Item Description" height="31px" single-line outlined type="text" v-model="elements.quantity" hide-details>
            </v-text-field>
          </div>
        </v-col>
        <v-col md="3" class="d-flex">
          <div class="mr-2 bid-item">
            <label class="d-block input-label text-left">Buyer Comment</label>
            <v-text-field placeholder="Line Item Description" height="31px" single-line outlined type="text" v-model="elements.buyerComment" hide-details>
            </v-text-field>
          </div>
          <div class="d-flex">
            <v-checkbox
              v-model="elements.switch1"
              inset class="mr-2 ml-2" hide-details
            ></v-checkbox>
            <v-icon color="#F32349" class="mr-4 mt-5">mdi-trash-can-outline</v-icon>
          </div>
        </v-col>
      </v-row>
    </div>
    <v-row justify="center" align="center" no-gutters class="mt-16">
      <v-col cols="12">
        <v-btn color="#0D9648" elevation="0" class="white--text text-capitalize font-weight-bold save-btn py-4 px-9" large height="56px" @click="changeTab">Save Changes</v-btn>
      </v-col>
    </v-row>
	</div>
</template>
<script>
  import draggable from 'vuedraggable'
  import { mapActions } from "vuex";
export default {
  components: {
    draggable,
  },
  data() {
    return {
      availableSearch: ['All','Company'],
      availableSuppl: null,
      inputType: ['USD','EUR'],
      units: ['Gallon','Liter'],
      exampleItems : [],
      bidLines: [
        {
          switch1: true,
          description: '',
          unit: 'Gallon',
          type: 'USD',
          quantity: '',
          buyerComment: '',
        }
      ],
      enabled: true,
      dragging: false
    };
  },
  computed:{
    draggingInfo() {
      return this.dragging ? "under drag" : "";
    }
  },
  methods: {
    changeTab(){
      this.$emit('changetab', 'tab-5');
    },
    addItem(){
      for(let i=0; i<5; i++){
        this.bidLines.push({  
          type: 'USD',
          inputType: ['USD','EUR'],
          units: ['Gallon','Liter'],
          description: '',
          unit: 'Gallon',
          quantity: '',
          buyerComment: '',
          switch1: '',
        })
      }
    },
    clone(item){
      console.log(item);
      this.exampleItems.push({
        type: item.type,
        description: item.description,
        unit: item.unit,
        quantity: item.quantity,
        buyerComment: item.buyerComment,
        switch1: item.switch1,
      })
    },
    checkMove: function(e) {
      console.log("Future index: " + e.draggedContext.futureIndex);
    }
  },
  mounted() {
    
	}	
};
</script>