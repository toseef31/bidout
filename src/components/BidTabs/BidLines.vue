<template>
  <div>
    <div class="bidline-section">
      <h4 class="text-left pl-4 font-weight-bold black--text my-4">Bid Line Items</h4>

        <input type="hidden" name="" :value="validate">
        {{validate}}
      <draggable
        :list="bidLines"
        :disabled="!enabled"
        class="list-group"
        ghost-class="ghost"
        :move="checkMove"
        @start="dragging = true"
        @end="dragging = false"
      >
        <v-row class="bidline-list d-flex align-center px-6 mt-0" gap v-for="(items,index) in bidLines" :key="index">
          <v-col md="4" class="d-flex px-0">
            <v-row>
              <v-col md="1" class="pl-1">
                <div class="mr-2 bid-item" :class="[index != 0 ? 'mt-1' : 'mt-6']">
                  <img :src="require('@/assets/images/bids/DotsSix.png')">
                </div>
              </v-col>
              <v-col md="11">
                <div class="mr-2 bid-item">
                  <label class="d-block input-label text-left" v-if="index === 0">Line Item Description</label>
                  <v-text-field placeholder="Item Description" v-model="bidLines[index]['description']" height="31px" width="200px" single-line outlined type="text" hide-details>
                  </v-text-field>
                </div>
              </v-col>
            </v-row>
          </v-col>

          <v-col md="2" class="px-0">
            <div class="mr-2 bid-item">
              <label class="d-block input-label text-left" v-if="index === 0">Unit/Measure</label>
              <v-select outlined hide-details v-model="bidLines[index]['unit']" :items="units"></v-select>
            </div>
          </v-col>
          <v-col md="2" class="px-0">
            <div class="mr-2 bid-item">
              <label class="d-block input-label text-left" v-if="index === 0">Input Type</label>
              <v-select outlined hide-details v-model="bidLines[index]['inputType']" :items="inputType"></v-select>
            </div>
          </v-col>
          <v-col md="2" class="px-0">
            <div class="mr-2 bid-item">
              <label class="d-block input-label text-left" v-if="index === 0">QTY</label>
              <v-text-field placeholder="Quantity" height="31px" single-line outlined  hide-details v-model="bidLines[index]['quantity']" type="number">
              </v-text-field>
            </div>
          </v-col>
          <v-col md="2" class="">
            <v-row>
              <v-col md="8" class="bid-item px-0">
                <label class="d-block input-label text-left" v-if="index === 0">Buyer Comment</label>
                <v-text-field placeholder="Buyer Comment" v-model="bidLines[index]['buyerComment']" height="31px" single-line outlined type="text" hide-details>
                </v-text-field>
              </v-col>
              <v-col md="4" class="d-flex px-0">
                <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-simple-checkbox color="#0D9648"
                    v-bind="attrs"
                    v-on="on"
                    v-model="bidLines[index]['required']"
                    :ripple="false"
                    inset class="mr-1 ml-2" hide-details :class="[index != 0 ? 'mt-0' : 'mt-6']"
                    @input="validate"
                  ></v-simple-checkbox>
                </template>
                <span>Required Line Item</span>
              </v-tooltip>
              <v-icon color="#F32349" :class="[index != 0 ? 'mt-0' : 'mt-5']" @click="removeBidLine(index)"
                v-bind="attrs"
                v-on="on">mdi-trash-can-outline</v-icon>
              </v-col>
            </v-row>
            <!-- <div class="mr-2 bid-item">
            </div>
            <div class="d-flex">

            </div> -->
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
import draggable from 'vuedraggable';
import { v4 as uuidv4 } from 'uuid';
import { mapActions } from 'vuex';

export default {
  components: {
    draggable,
  },
  data() {
    return {
      availableSearch: ['All', 'Company'],
      availableSuppl: null,
      inputType: ['USD'],
      units: ['Feet', 'Pound', 'Ton', 'Mile', 'Gallon', 'Barrell', 'Day', 'Each', 'Hourly', 'N/A'],
      exampleItems: [],
      qtyRules: [
        (v) => !!v || 'This field is required',
      ],
      numberRule: (v) => {
        if (!v.trim()) return true;
        // eslint-disable-next-line no-restricted-globals
        if (!isNaN(parseFloat(v)) && v >= 0 && v <= 999) return true;
        return 'Number has to be between 0 and 999';
      },
      bidLines: [
        {
          id: uuidv4(),
          switch1: false,
          description: null,
          unit: 'Feet',
          inputType: 'USD',
          quantity: null,
          buyerComment: '',
          valid: false,
          required: true,
          bidLinesStatus: false,
        },
      ],
      descRules: [
        (v) => /^\d+$/.test(v) || 'Description is required',
      ],
      enabled: true,
      dragging: false,
    };
  },
  computed: {
    draggingInfo() {
      return this.dragging ? 'under drag' : '';
    },
    validate() {
      // if(this.$store.getters.bidData != null){
        if(this.$store.getters.bidData.lineItems != ""){
          this.$emit('validation', { valid: true, items: '4' });
          this.$store.commit('setLineItemsComplete', true);
          this.$store.commit('setBidlines',this.bidLines);
        }else if (this.bidLines.length > 0 && this.bidLines.filter((item) => item.required === true && item.description && item.quantity).length > 0) {
          console.log('fsfsd');
          this.$emit('validation', { valid: true, items: '4' });
          this.$store.commit('setLineItemsComplete', true);
          this.$store.commit('setBidlines',this.bidLines);
          this.bidLinesStatus = true;
          return this.valid;
        }else{
          console.log('dgd');
          this.$emit('validation', { valid: false, items: '4' });
          this.$store.commit('setLineItemsComplete', false);
          return this.valid;
        }
        
      // }else if (this.bidLines.length > 0 && this.bidLines.filter((item) => item.required === true && item.description && item.quantity).length > 0) {
      //   console.log('fsfsd');
      //   this.$emit('validation', { valid: true, items: '4' });
      //   this.$store.commit('setLineItemsComplete', true);
      //   this.$store.commit('setBidlines',this.bidLines);
      //   this.bidLinesStatus = true;
      //   return this.valid;
      // }else{
      //   console.log('dgd');
      //   this.$emit('validation', { valid: false, items: '4' });
      //   this.$store.commit('setLineItemsComplete', false);
      //   return this.valid;
      // }
      
    },
  },
  watch: {
    bidLines: {
      handler() {
        this.validate();
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions(['updateDraftBid','updateTemplate']),
    changeTab() {
      if(this.$route.name == 'EditTemplate'){
        this.updateTemplate({ bidlines: this.bidLines });
      }else{
        this.updateDraftBid({ bidlines: this.bidLines });
      }
      this.$emit('changetab', 'tab-5');
    },
    addItem() {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < 5; i++) {
        this.bidLines.push({
          id: uuidv4(),
          type: 'USD',
          inputType: 'USD',
          units: ['Gallon', 'Liter'],
          description: '',
          unit: 'Feet',
          quantity: '',
          buyerComment: '',
          switch1: '',
          required: true,
        });
      }
    },
    checkMove(e) {
      console.log(`Future index: ${e.draggedContext.futureIndex}`);
    },
    isLetterOrNumber(e) {
      const char = String.fromCharCode(e.keyCode);
      if (/^[0-9]+$/.test(char)) return true;
      e.preventDefault();
      return false;
    },
    removeBidLine(index) {
      this.bidLines.splice(index, 1);
      this.bidLinesStatus = true;
    },
    savedraftOnInterval(){
      const timer = setInterval(() => {
        if(this.bidLinesStatus == true){
          if(this.$route.name == 'EditTemplate'){
            this.updateTemplate({ bidlines: this.bidLines });
          }else{
            this.updateDraftBid({ bidlines: this.bidLines });
          }
          this.bidLinesStatus = false;
        }
      }, 60000);

      this.$once("hook:beforeDestroy", () => {
        clearInterval(timer);
      });
    },
  },
  mounted(){
    if(this.$store.getters.bidData.lineItems != ""){
      this.bidLines = this.$store.getters.bidData.lineItems;
      this.$emit('validation', { valid: true, items: '4' });
      this.$store.commit('setLineItemsComplete', true);
      this.$store.commit('setBidlines',this.bidLines);
    }
    this.savedraftOnInterval();
  }
};
</script>
