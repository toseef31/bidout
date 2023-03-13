<template>
  <div>
    <div class="bidline-section">
      <div class="d-flex justify-space-between align-center">
        <h4 class="text-left pl-4 font-weight-bold black--text my-4">Bid Line Items</h4>
        <div>
          <v-tooltip top >
            <template v-slot:activator="{ on, attrs }">
             <a v-bind="attrs" class="mr-4 text-capitalize text-decoration-none export-excel" href="https://firebasestorage.googleapis.com/v0/b/bidout-dev.appspot.com/o/assets%2FlineItemsTemplate.xlsx?alt=media&token=1be2f0ce-491d-4286-80e9-ca56f4641ce9" download width="125px"
              v-on="on"  icon color="#0D9648">
               <v-icon size="24" class="pl-2" color="#0d9648">mdi-information-outline
               </v-icon>
            </a>
            </template>
            <span>Click here to download the <strong>Excel template</strong></span>
          </v-tooltip>
          <v-tooltip top >
            <template v-slot:activator="{ on, attrs }">
              <label class="import-excel btn" for="import" v-bind="attrs" v-on="on">
                Import <v-icon size="30" color="#0d9648">mdi-microsoft-excel</v-icon>
                <input type="file" id="import" class="d-none" @change="onChange" />
              </label>
            </template>
              <span>Import the <strong>Excel Template</strong> to upload line items</span>
          </v-tooltip>
        </div>
      </div>

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
              <v-text-field placeholder="Quantity" height="31px" :class="{ 'new--text': bidLines[index]['quantity'] === '' }"
              hide-details
              single-line outlined
              v-model="bidLines[index]['quantity']"
              type="text"
              required
              @keypress="NumbersOnly($event,index)"
              @input="validateNumber($event,index)"
              @blur="formatNumber(index)" @keyup="removeExtra(index)" @paste="onPaste">
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
import * as XLSX from 'xlsx';
import { mapActions,mapGetters } from 'vuex';

export default {
  components: {
    draggable,
  },
  data() {
    return {
      on: '',
      attrs: '',
      availableSearch: ['All', 'Company'],
      availableSuppl: null,
      inputType: ['USD'],
      excelHeader: ['Description', 'Unit', 'Quantity', 'BuyerComment'],
      units: ['Feet', 'Pound', 'Ton', 'Mile', 'Gallon', 'Barrell', 'Day', 'Each', 'Hourly','Stage','Job', 'N/A'],
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
      isInitialized: false,
    };
  },
  computed: {
    ...mapGetters(['isEditBidChanges']),
    draggingInfo() {
      return this.dragging ? 'under drag' : '';
    },
    // eslint-disable-next-line consistent-return, vue/return-in-computed-property
    validate() {
      if (this.$store.getters.bidData.lineItems != '') {
        this.$emit('validation', { valid: true, items: '4' });
        this.$store.commit('setLineItemsComplete', true);
        this.$store.commit('setBidlines', this.bidLines);
      } else if (this.bidLines.length > 0 && this.bidLines.filter((item) => item.required === true && item.description && item.quantity).length > 0) {
        this.$emit('validation', { valid: true, items: '4' });
        this.$store.commit('setLineItemsComplete', true);
        this.$store.commit('setBidlines', this.bidLines);
        this.$store.commit('setIsEditBidChanges', true);
        this.bidLinesStatus = true;
        return this.valid;
      } else {
        this.$emit('validation', { valid: false, items: '4' });
        this.$store.commit('setLineItemsComplete', false);
        return this.valid;
      }
    },
  },
  watch: {
    bidLines: {
      handler(newValue, oldValue) {
        // eslint-disable-next-line no-unused-expressions
        this.validate;
        if (this.isInitialized) {
          this.$store.commit('setIsEditBidChanges', false);
          this.isInitialized = false;
        } else {
          this.$store.commit('setIsEditBidChanges', true);
        }
      },
      deep: true,
    },
    validate: function() {
    },
  },
  methods: {
    ...mapActions(['updateDraftBid','updateTemplate','updateBid']),
    changeTab() {
      if (this.$route.name === 'EditBid') {
        if (this.isEditBidChanges === true) {
          this.updateBid({ bidlines: this.bidLines });
        }
      } else if (this.$route.name === 'EditTemplate') {
        this.updateTemplate({ bidlines: this.bidLines });
      } else {
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
      console.log('e', e);
      const char = String.fromCharCode(e.keyCode);
      if (/^[0-9]+$/.test(char)) return true;
      e.preventDefault();
      return false;
    },
    removeBidLine(index) {
      this.bidLines.splice(index, 1);
      this.$store.commit('setIsEditBidChanges',true);
      this.bidLinesStatus = true;
    },
    exportF() {
      const header = this.excelHeader;

      const dataD = [];
      let index;

      this.bidLines.forEach((el, lIndex) => {
        dataD.push([el.description]);
      });
      dataD.unshift(header);
      const data = XLSX.utils.json_to_sheet(dataD, {skipHeader: true});
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, data, 'data');
      XLSX.writeFile(wb, `line.xlsx`);
    },
    onChange(event) {
      this.file = event.target.files ? event.target.files[0] : null;
      if (this.file) {
        const reader = new FileReader();

        reader.onload = (e) => {
          const bstr = e.target.result;
          const wb = XLSX.read(bstr, { type: 'binary' });
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          const data = XLSX.utils.sheet_to_json(ws, { header: 0,skipHeader:true });
          for (let i = 0; i < data.length; i++) {
            let quantityValue = 0;
            let error = '';
            if (/^[0-9]+$/.test(data[i].Quantity)) {
              quantityValue = data[i].Quantity;
            } else {
              const string = String(data[i].Quantity);
              const formatQuantity = string.replace(/[^0-9]/g, '');
              console.log('hyy', formatQuantity);
              if (formatQuantity === '') {
                error = 'please enter valid quantity';
              } else {
                error = '';
              }
              quantityValue = formatQuantity;
            }
            this.bidLines.push({
              id: uuidv4(),
              type: 'USD',
              inputType: 'USD',
              units: ['Gallon', 'Liter'],
              description: data[i].Description,
              unit: data[i].Unit,
              quantity: quantityValue,
              buyerComment: data[i].BuyerComment,
              error,
              switch1: '',
              required: ((data[i].Required == 'Yes') ? true : false),
            });
          }
        }

        reader.readAsBinaryString(this.file);
        this.$store.commit('setIsEditBidChanges', true);
      }
      event.target.value = '';
    },
    NumbersOnly(evt) {
      evt = (evt) || window.event;
      const charCode = (evt.which) ? evt.which : evt.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    removeNonNumeric(num) {
      num = num.replace(/[^0-9]/g, '');
      return num;
    },
    onPaste(event) {
      // eslint-disable-next-line no-undef
      let num = event.clipboardData.getData('Text');
      let nmbrs = num.replace(/[^0-9]/g, '');
      if (!nmbrs) {
        event.preventDefault();
      } else {
        return true;
      }
    },
    validateNumber(event, index) {
      if (!isNaN(event)) {
        this.bidLines[index].quantity = this.removeNonNumeric(event);
      }
    },
    formatNumber(index) {
      if (this.bidLines[index].quantity) {
        let formatValue = parseInt(this.removeNonNumeric(this.bidLines[index].quantity), 10);
        this.bidLines[index].quantity = formatValue;
      } else {
        this.bidLines[index].quantity = '';
      }
    },
    removeExtra(index) {
      if (this.bidLines[index].quantity) {
        let formatValue = parseInt(this.removeNonNumeric(this.bidLines[index].quantity), 10);
        this.bidLines[index].quantity = formatValue;
      } else {
        this.bidLines[index].quantity = '';
      }
    },
    savedraftOnInterval() {
      const timer = setInterval(() => {
        if (this.bidLinesStatus === true) {
          if (this.$route.name === 'EditBid') {
            if (this.isEditBidChanges === true) {
              this.updateBid({ bidlines: this.bidLines });
            }
          } else if (this.$route.name === 'EditTemplate') {
            this.updateTemplate({ bidlines: this.bidLines });
          } else {
            this.updateDraftBid({ bidlines: this.bidLines });
          }
          this.bidLinesStatus = false;
        }
      }, 60000);

      this.$once('hook:beforeDestroy', () => {
        clearInterval(timer);
      });
    },
  },
  mounted() {
    if (this.$store.getters.bidData.lineItems !== '') {
      this.bidLines = this.$store.getters.bidData.lineItems;
      this.bidLines = JSON.parse(JSON.stringify(this.bidLines.map((item, index) => {
        if (item.required === 'true') {
          item.required = true;
        } else {
          item.required = false;
        }
        return item;
      })));
      this.$emit('validation', { valid: true, items: '4' });
      this.$store.commit('setLineItemsComplete', true);
      this.$store.commit('setBidlines',this.bidLines);
      this.isInitialized = true;
    }
    this.savedraftOnInterval();
  },
};
</script>
