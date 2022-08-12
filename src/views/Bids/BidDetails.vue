<template>
  <v-row class="my-8" justify="center">
    <v-col cols="12" sm="9">
      <v-form @submit.prevent="bidForm" ref="form">
        <v-container>
          <v-row justify="center">
            <v-col cols="12" sm="12" text="left">
              <label class="d-block text-left input-label mb-2 font-weight-bold">Bid Title</label>
              <v-text-field placeholder="Bid Title" single-line outlined type="text" hide-details>
              </v-text-field>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" sm="6" text="left">
              <label class="d-block text-left input-label mb-2 font-weight-bold">Bid Type <v-icon small>mdi-information-outline</v-icon></label>
              <v-select outlined hide-details :items="bidType">
                
              </v-select>
            </v-col>
            <v-col cols="12" sm="6" text="left">
              <label class="d-block text-left input-label mb-2 font-weight-bold">Due/Date Time</label>
              <v-text-field placeholder="Bid Title" single-line outlined type="date" hide-details>
              </v-text-field>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" sm="6" text="left">
              <label class="d-block text-left input-label mb-2 font-weight-bold">Region </label>
              <v-select outlined hide-details>
                
              </v-select>
            </v-col>
            <v-col cols="12" sm="6" text="left">
              <label class="d-block text-left input-label mb-2 font-weight-bold">Q&A <v-icon small>mdi-information-outline</v-icon></label>
              <v-radio-group
                row
                v-model="qa"
              >
                <v-radio
                  label="Yes"
                  value="yes" checked
                ></v-radio>
                <v-radio
                  label="No"
                  value="no"
                ></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" sm="12" text="left">
              <label class="d-block text-left input-label mb-2 font-weight-bold">Bid Description</label>
              <v-textarea placeholder="Describe here..." single-line outlined type="text" hide-details>
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
              <v-btn color="#0D9648" height="56" class="text-capitalize white--text font-weight-bold save-btn px-9" large>Save Changes</v-btn>
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
      qa: 'yes',
      showAdditional: false,
      bidType: ['RFP','RFI'],
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