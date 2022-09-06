<template>
  <v-row class="my-8" justify="center">
    <v-col cols="12" sm="9">
      <v-form @submit.prevent="bidForm" ref="form">
        <v-container>
          <v-row justify="center">
            <v-col cols="12" sm="12" text="left">
              <label class="d-block text-left input-label mb-2 font-weight-bold">Bid Title</label>
              <v-text-field placeholder="Bid Title" v-model="title" single-line outlined type="text" hide-details>
              </v-text-field>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" sm="6" text="left">
              <label class="d-block text-left input-label mb-2 font-weight-bold">Bid Type 
                <v-tooltip right>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon small v-bind="attrs"
                      v-on="on">mdi-information-outline</v-icon>
                  </template>
                  <span>Choose Bid Type</span>
                </v-tooltip>
              </label>
              <v-select outlined hide-details :items="type" v-model="type">
                
              </v-select>
            </v-col>
            <v-col cols="12" sm="6" text="left">
              <label class="d-block text-left input-label mb-2 font-weight-bold">Due Date </label>
              <v-text-field placeholder="Bid Title" single-line outlined type="date" v-model="dueDate" hide-details>
              </v-text-field>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" sm="6" text="left">
              <label class="d-block text-left input-label mb-2 font-weight-bold">Due Time </label>
              <v-select outlined hide-details :items="time" v-model="dueTime">
                              
              </v-select>
            </v-col>
            <v-col cols="12" sm="6" text="left">
              <label class="d-block text-left input-label mb-2 font-weight-bold">Region </label>
              <v-select outlined hide-details :items="region" v-model="regions">
                              
              </v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6" text="left">
              <label class="d-block text-left input-label mb-2 font-weight-bold">Q&A 
                <v-tooltip right>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon small v-bind="attrs"
                      v-on="on">mdi-information-outline</v-icon>
                  </template>
                  <span>Check the Q&A options</span>
                </v-tooltip>
              </label>
              
              <v-radio-group
                row
                v-model="qAndAEnabled"
              >
                <v-radio
                  label="Yes"
                  value="true" checked
                ></v-radio>
                <v-radio
                  label="No"
                  value="false"
                ></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" sm="12" text="left">
              <label class="d-block text-left input-label mb-2 font-weight-bold">Bid Description</label>
              <v-textarea placeholder="Describe here..." single-line outlined type="text" v-model="bidDescriptions" hide-details>
              </v-textarea>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" sm="12" text="left" v-show="showAdditional">
              <label class="d-block text-left input-label mb-2 font-weight-bold">Additional Information <v-icon color="#F32349">mdi-trash-can-outline</v-icon></label> 
              <v-text-field placeholder="Title" single-line outlined type="text">
              </v-text-field>
              <v-textarea placeholder="Desribe here" single-line outlined type="text" hide-details>
              </v-textarea>
            </v-col>
            <v-col cols="12" sm="12" class="text-left">
              <v-btn color="rgba(13, 150, 72, 0.1)" rounded class="text-capitalize adtn-btn font-weight-bold" @click="showAdditional = !showAdditional"><v-icon>mdi-plus</v-icon>Add Aditional Description</v-btn>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="12">
              <v-btn color="#0D9648" height="56" class="text-capitalize white--text font-weight-bold save-btn px-9" @click="changeTab" large>Save Changes</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-col>
  </v-row>
</template>
<script>
  import { mapActions } from "vuex";
export default {
  data() {
    return {
      title: '',
      type: '',
      dueDate: '',
      dueTime: '',
      regions: [],
      bidDescriptions: '',
      qAndAEnabled: 'yes',
      showAdditional: false,
      type: ['RFP','RFI','BidOut Process'],
      time: ['1pm CST','2pm CST','3pm CST','4pm CST'],
      region: ['Gulf Coast','Northwest','Rockies','Mid-Con','Permian','Arklatex','Offshore','Other'],
    };
  },
  computed:{
    
  },
  methods: {
    changeTab(){
      var bidDetails = {
        title: this.title,
        type: this.type,
        dueDate: this.dueDate,
        dueTime: this.dueTime,
        regions: this.regions,
        bidDescriptions: this.bidDescriptions,
        qAndAEnabled: this.qAndAEnabled
      }
      this.$emit('changetab', 'tab-2');
    }
  },
  mounted() {
    
  } 
};
</script>