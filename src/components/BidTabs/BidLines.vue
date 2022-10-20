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
        <v-row class="bidline-list d-flex align-center px-6" v-for="(items,index) in bidLines">
          <v-col md="3" class="d-flex">
            <v-row>
              <v-col md="1">
                <div class="mr-2 bid-item" :class="[index != 0 ? 'mt-1' : 'mt-6']">
                  <img :src="require('@/assets/images/bids/DotsSix.png')">
                </div>
              </v-col>
              <v-col md="11">
                <div class="mr-2 bid-item">
                  <label class="d-block input-label text-left" v-if="index === 0">Line Item Description</label>
                  <v-text-field placeholder="Line Item Description" v-model="items.description" height="31px" width="200px" single-line outlined type="text" hide-details>
                  </v-text-field>
                </div>
              </v-col>
            </v-row>
          </v-col>
          
          <v-col md="2">
            <div class="mr-2 bid-item">
              <label class="d-block input-label text-left" v-if="index === 0">Unit/Measure</label>
              <v-select outlined hide-details v-model="items.unit" :items="units"></v-select>
            </div>
          </v-col>
          <v-col md="2">
            <div class="mr-2 bid-item">
              <label class="d-block input-label text-left" v-if="index === 0">Input Type</label>
              <v-select outlined hide-details v-model="items.type" :items="inputType"></v-select>
            </div>
          </v-col>
          <v-col md="2">
            <div class="mr-2 bid-item">
              <label class="d-block input-label text-left" v-if="index === 0">QTY</label>
              <v-text-field placeholder="Line Item Description" height="31px" single-line outlined  hide-details v-model="items.quantity" @keypress="isLetterOrNumber($event)">
              </v-text-field>
            </div>
          </v-col>
          <v-col md="3" class="d-flex">
            <div class="mr-2 bid-item">
              <label class="d-block input-label text-left" v-if="index === 0">Buyer Comment</label>
              <v-text-field placeholder="Line Item Description"  v-model="items.buyerComment" height="31px" single-line outlined type="text" hide-details>
              </v-text-field>
            </div>
            <div class="d-flex">
              <v-checkbox
                v-model="items.switch1"
                inset class="mr-2 ml-2" hide-details :class="[index != 0 ? 'mt-0' : 'mt-4']"
              ></v-checkbox>
              <v-icon color="#0D9648" class="mr-2"  :class="[index != 0 ? 'mt-0' : 'mt-6']" @click="clone(items)">mdi-content-copy</v-icon>
              <v-icon color="#F32349" :class="[index != 0 ? 'mt-0' : 'mt-6']" @click="removeBidLine(index)">mdi-trash-can-outline</v-icon>
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
      <v-row class="bidline-list d-flex align-center px-6 my-2" v-for="(elements,index) in exampleItems">
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
                <v-text-field placeholder="Line Item Description" v-model="elements.description" height="31px" width="200px" single-line outlined type="text" hide-details readonly>
                </v-text-field>
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-col md="2">
          <div class="mr-2 bid-item">
            <label class="d-block input-label text-left">Unit/Measure</label>
            <v-select outlined hide-details :items="units" v-model="elements.unit" readonly></v-select>
          </div>
        </v-col>
        <v-col md="2">
          <div class="mr-2 bid-item">
            <label class="d-block input-label text-left">Input Type</label>
            <v-select outlined hide-details :items="inputType" v-model="elements.type" readonly></v-select>
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
            <v-text-field placeholder="Line Item Description" height="31px" single-line outlined type="text" v-model="elements.buyerComment" hide-details readonly>
            </v-text-field>
          </div>
          <div class="d-flex">
            <v-checkbox
              v-model="elements.switch1"
              inset class="mr-2 ml-2" hide-details readonly
            ></v-checkbox>
            <v-icon color="#F32349" class="mr-4 mt-5" @click="removeExample(index)">mdi-trash-can-outline</v-icon>
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
      units: ['Feet','Pound','Ton','Mile','Gallon','Barrell','Day','Each','Hourly','N/A'],
      exampleItems : [],
      qtyRules: [
        v => !!v || 'This field is required',
        ],
        numberRule: v  => {
              if (!v.trim()) return true;
              if (!isNaN(parseFloat(v)) && v >= 0 && v <= 999) return true;
              return 'Number has to be between 0 and 999';
            },
      bidLines: [
        {
          switch1: true,
          description: '',
          unit: 'Feet',
          type: 'USD',
          quantity: '',
          buyerComment: '',
        }
      ],
      descRules: [
        v => /^\d+$/.test(v) || 'Description is required',
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
          unit: 'Feet',
          quantity: '',
          buyerComment: '',
          switch1: '',
        })
      }
    },
    clone(item){
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
    },
    isLetterOrNumber(e) {
        let char = String.fromCharCode(e.keyCode);
        if (/^[0-9]+$/.test(char)) return true;
        else e.preventDefault();
    },
    removeExample(index){
      this.exampleItems.splice(index,1);
    },
    removeBidLine(index){
      this.bidLines.splice(index,1);
    }
  },
  mounted() {
    
	}	
};
</script>