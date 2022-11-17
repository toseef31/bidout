<template>
	<div>
		<div class="bidline-section">
      <h4 class="text-left pl-4 font-weight-bold black--text my-4">Bid Line Items</h4>
      
        <input type="hidden" name="" :value="validat">
      <draggable
        :list="bidLines"
        :disabled="!enabled"
        class="list-group"
        ghost-class="ghost"
        :move="checkMove"
        @start="dragging = true"
        @end="dragging = false"
      >  
        <v-row class="bidline-list d-flex align-center px-6 mt-0" v-for="(items,index) in bidLines">
          <v-col md="3" class="d-flex">
            <v-row>
              <v-col md="1" class="pl-1">
                <div class="mr-2 bid-item" :class="[index != 0 ? 'mt-1' : 'mt-6']">
                  <img :src="require('@/assets/images/bids/DotsSix.png')">
                </div>
              </v-col>
              <v-col md="11">
                <div class="mr-2 bid-item">
                  <label class="d-block input-label text-left" v-if="index === 0">Line Item Description</label>
                  <v-text-field placeholder="Item Description" @change="savedraftOnchange()" v-model="bidLines[index]['description']" height="31px" width="200px" single-line outlined type="text" hide-details>
                  </v-text-field>
                </div>
              </v-col>
            </v-row>
          </v-col>
          
          <v-col md="2" class="pl-0">
            <div class="mr-2 bid-item">
              <label class="d-block input-label text-left" v-if="index === 0">Unit/Measure</label>
              <v-select outlined hide-details v-model="bidLines[index]['unit']" @change="savedraftOnchange()" :items="units"></v-select>
            </div>
          </v-col>
          <v-col md="2" class="pl-0">
            <div class="mr-2 bid-item">
              <label class="d-block input-label text-left" v-if="index === 0">Input Type</label>
              <v-select outlined hide-details v-model="bidLines[index]['type']" @change="savedraftOnchange()" :items="inputType"></v-select>
            </div>
          </v-col>
          <v-col md="2" class="pl-0">
            <div class="mr-2 bid-item">
              <label class="d-block input-label text-left" v-if="index === 0">QTY</label>
              <v-text-field placeholder="Quantity" @change="savedraftOnchange()" height="31px" single-line outlined  hide-details v-model="bidLines[index]['quantity']" @keypress="isLetterOrNumber($event)">
              </v-text-field>
            </div>
          </v-col>
          <v-col md="3" class="d-flex pl-0">
            <div class="mr-2 bid-item">
              <label class="d-block input-label text-left" v-if="index === 0">Buyer Comment</label>
              <v-text-field placeholder="Buyer Comment" @change="savedraftOnchange()" v-model="bidLines[index]['buyerComment']" height="31px" single-line outlined type="text" hide-details>
              </v-text-field>
            </div>
            <div class="d-flex">

              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-simple-checkbox color="#0D9648"
                    v-bind="attrs"
                    v-on="on"
                    v-model="items.switch1"
                    inset class="mr-2 ml-2" hide-details :class="[index != 0 ? 'mt-0' : 'mt-6']"
                  ></v-simple-checkbox>
                </template>
                <span>Required Line Item</span>
              </v-tooltip>
              <v-icon color="#F32349" :class="[index != 0 ? 'mt-0' : 'mt-5']" @click="removeBidLine(index)"
                v-bind="attrs"
                v-on="on">mdi-trash-can-outline</v-icon>
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
    <v-row justify="center" align="center" no-gutters class="my-12">
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
      inputType: ['USD'],
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
          switch1: false,
          description: '',
          unit: 'Feet',
          type: 'USD',
          quantity: '',
          buyerComment: '',
          valid: false,
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
    },
    validat(){
      if(this.bidLines.length > 0){
        this.$emit('validation',{'valid': true,'items': '4'});
        return this.valid;
      }else{
        this.$emit('validation',{'valid': false,'items': '4'});
        return this.valid;
      }
    },
  },
  methods: {
    ...mapActions(["updateDraftBid"]),
    changeTab(){
      this.updateDraftBid({'bidlines':this.bidLines});
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
    checkMove: function(e) {
      console.log("Future index: " + e.draggedContext.futureIndex);
    },
    isLetterOrNumber(e) {
        let char = String.fromCharCode(e.keyCode);
        if (/^[0-9]+$/.test(char)) return true;
        else e.preventDefault();
    },
    removeBidLine(index){
      this.bidLines.splice(index,1);
    },
    savedraftOnchange(){
      // const timer = setInterval(() => {
      //   this.updateDraftBid({'bidlines':this.bidLines,'exampleItems':this.bidLines});
      // }, 60000);

      // this.$once("hook:beforeDestroy", () => {
      //   clearInterval(timer);
      // });
    },
  },
  created() {
    // this.interval = setInterval(() => this.saveDraftBid({'invitedSuppliers':this.repsInvited}), 100000);
  },
  mounted() {
    
	}	
};
</script>