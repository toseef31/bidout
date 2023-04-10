<template>
  <section class="fill-height module-selection white">
    <NavbarBeforeLogin></NavbarBeforeLogin>
      <div class="get-topHeader d-flex">
        <v-container fill-height>
          <v-row
            align="center"
            justify="center"
            no-gutters>
            <v-col class="text-left"
              cols="12">
              <h1 class="font-weight-bolder white--text">Get Started</h1>
            </v-col>
          </v-row>
        </v-container>
      </div>
      <v-container>
        <v-main>
          <v-row justify="center">
            <v-col cols="12" md="9">
              <div class="title-head text-left">
                <h3 class="mb-4">New Account Setup:</h3>
                <h1 class="mb-8">{{companyName}}</h1>
                <h4 class="font-weight-bold">BidOut Modules</h4>
              </div>
              <v-form v-if="contractData">
                <template>
                  
                  <div class="create-bid text-left mt-5 pa-4"  v-if="rfxContractData && rfxContractData.length > 0">
                    <div class="d-flex justify-space-between align-center mb-5 label-title">
                      <h1 class="font-weight-bold">RFx Platform - Create Bids</h1>
                      <v-sheet>
                        <v-icon color="#0D9647">mdi-check-circle-outline</v-icon>
                        <!-- <v-checkbox
                          v-model="rfxActiveModule"
                          inset
                          disabled
                        ></v-checkbox> -->
                      </v-sheet>
                    </div>
                    <p class="font-weight-medium">BidOut's flagship RFP Platform. The ability to create and distribute RPF's to BidOut's network of <br>service providers.</p>
                    <div class="d-inline-block">
                      <div class="d-inline-block agreement-box pa-3">
                        <div class="d-flex">
                          <v-icon color="#0D9647">mdi-check-circle-outline</v-icon>
                          <div class="pl-2">
                            <p class="mb-0">Contract Excuted</p>
                            <p class="mb-0">{{ rfxContractData[0].signedAt | moment("MM/D/YYYY h:mm a") }} </p>
                          </div>
                        </div>
                      </div>
                      <a target="_blank" :href="rfxContractData[0].filePath" class="ml-2">Download Contract</a>
                    </div>
                  </div>



                  <div class="create-bid text-left mt-5 pa-4" v-else>
                    <div class="d-flex justify-space-between align-center mb-5 label-title">
                      <h1 class="font-weight-bold">RFx Platform - Create Bids</h1>
                      <v-sheet>
                        
                        <template v-if="moduleRfxOption == true">
                          <v-switch
                            v-model="rfxModule"
                            inset @change="rfxToggle"
                          ></v-switch>
                        </template>
                        <template v-else>
                          <v-switch
                            v-model="moduleRfxOption"
                            inset @change="rfxToggle"
                          ></v-switch>
                        </template>
                        
                      </v-sheet>
                    </div>
                    <p class="font-weight-medium">BidOut's flagship RFP Platform. The ability to create and distribute RPF's to BidOut's network of <br>service providers.</p>
                    <div class="d-inline-block">
                      <v-btn color="#0D9647" large dense width="260px" height="56" class="font-weight-bold white--text text-capitalize pa-4" @click="generateContract('rfx')" :disabled="rfxBtn == true ?  false : true" :loading="loadingRfx">Execute Agreement Now <v-icon class="pl-2" color="#fff">mdi-arrow-right-circle</v-icon></v-btn>
                    </div>
                  </div>
                </template>
                <template>
                  
                  <div class="create-bid text-left mt-10 pa-4" v-if="ofsContractData && ofsContractData.length > 0">
                    <div class="d-flex justify-space-between align-center mb-5 label-title">
                      <h1 class="font-weight-bold">Respond to Bids - OFS Directory</h1>
                      <h1 class="price-text"><span v-if="ofsContractData[0].contractType == 'ofs'">Free</span><span v-else>
                        <!-- <template v-if="package.id == 1">$79.99/month</template> -->
                        
                        <template v-if="packageValue == 1 && billingCycle == 'Yearly'">$800/year</template>
                        <template v-if="packageValue == 1 && billingCycle == 'Monthly'">$79.99/month</template>
                        <template v-if="packageValue == 2 && billingCycle == 'Yearly'">$1,000/year</template>
                        <template v-if="packageValue == 2 && billingCycle == 'Monthly'">$99.99/month</template>
                        <template v-if="packageValue == 3 && billingCycle == 'Yearly'">$1,200/year</template>
                        <template v-if="packageValue == 3 && billingCycle == 'Monthly'">$119.99/month</template>
                        <template v-if="packageValue == 4 && billingCycle == 'Yearly'">$2,400/year</template>
                        <template v-if="packageValue == 4 && billingCycle == 'Monthly'">$239.99/month</template>
                      </span></h1>
                      <v-sheet>
                        <v-icon color="#0D9647">mdi-check-circle-outline</v-icon>
                        <!-- <v-checkbox
                          v-model="ofsActiveModule"
                          inset
                          disabled :value="true"
                        ></v-checkbox>  -->
                      </v-sheet>
                    </div>
                    <p class="font-weight-medium">Respond to bid invitations & showcase your services to oil and gas operators to gain access to <br>greater visibility.</p>
                    <div class="d-flex">
                      <v-radio-group
                        v-model="ofsContractData[0].contractType == 'ofs' ? 'free' : 'premium'" 
                        mandatory
                        row :disabled="true"
                      >
                        <v-radio
                          label="Standard Edition (Free)"
                          color="#0D9647"
                          value="free"  
                        ></v-radio>
                        <v-radio
                          label="Premium Edition"
                          color="#0D9647"
                          value="premium"
                        ></v-radio>
                      </v-radio-group>
                    </div>
                    <v-row>
                      <v-col cols="12" sm="12" v-show="ofsContractData[0].contractType == 'ofs-premium'">
                        <label class="d-block text-left input-label mb-2 font-weight-bold">Billing Cycle</label>
                        <v-select outlined placeholder="Select" v-model="billingCycle" :items="cycle"  :disabled="true"></v-select>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" sm="12" v-show="ofsContractData[0].contractType == 'ofs-premium'">
                        <label class="d-block text-left input-label mb-2 font-weight-bold">Sales Team Contacts</label>
                        <v-select outlined placeholder="Select" v-model="packageValue" :items="packages" item-text="name" item-value="id" :disabled="true"></v-select>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" sm="5" text="left">
                        <div class="d-inline-block agreement-box pa-3">
                          <div class="d-flex">
                            <v-icon color="#0D9647">mdi-check-circle-outline</v-icon>
                            <div class="pl-2">
                              <p class="mb-0">Contract Excuted On</p>
                              <p class="mb-0">{{ ofsContractData[0].signedAt | moment("MM/D/YYYY h:mm a") }} </p>
                            </div>
                          </div>
                        </div>
                        <a target="_blank" :href="ofsContractData[0].filePath" class="ml-2">Download Contract</a>
                      </v-col>
                    </v-row>
                  </div>
                  <div class="create-bid text-left mt-10 pa-4" v-else>
                    <div class="d-flex justify-space-between align-center mb-5 label-title">
                      <h1 class="font-weight-bold">Respond to Bids - OFS Directory</h1>
                      <h1 class="price-text"><span v-if="trial_end == 'free'">Free</span><span v-else>
                        <template v-if="package.id == 1 && billingCycle == 'Yearly'">
                            $800/year
                        </template>
                        <template v-if="package.id == 1 && billingCycle == 'Monthly'">
                            $79.99/month
                        </template>
                        <template v-if="package == 1 && billingCycle == 'Yearly'">$800/year</template>
                        <template v-if="package == 1 && billingCycle == 'Monthly'">$79.99/month</template>
                        <template v-if="package == 2 && billingCycle == 'Yearly'">$1,000/year</template>
                        <template v-if="package == 2 && billingCycle == 'Monthly'">$99.99/month</template>
                        <template v-if="package == 3 && billingCycle == 'Yearly'">$1,200/year</template>
                        <template v-if="package == 3 && billingCycle == 'Monthly'">$119.99/month</template>
                        <template v-if="package == 4 && billingCycle == 'Yearly'">$2,400/year</template>
                        <template v-if="package == 4 && billingCycle == 'Monthly'">$239.99/month</template>
                      </span></h1>
                      <v-sheet>
                        <template v-if="moduleOfsOption == true">
                          <v-switch
                            v-model="ofsModule"
                            inset
                            @change="ofsToggle"
                          ></v-switch>
                        </template>
                        <template v-else>
                          <v-switch
                            v-model="moduleOfsOption"
                            inset
                            @change="ofsToggle"
                          ></v-switch>
                        </template>
                      </v-sheet>
                    </div>
                    <p class="font-weight-medium">Respond to bid invitations & showcase your services to oil and gas operators to gain access to <br>greater visibility.</p>
                    <div class="d-flex">
                      <v-radio-group
                        v-model="trial_end"
                        mandatory
                        row :disabled="!moduleOfsOption"
                      >
                        <v-radio
                          label="Standard Edition (Free)"
                          color="#0D9647"
                          value="free"
                        ></v-radio>
                        <v-radio
                          label="Premium Edition"
                          color="#0D9647"
                          value="premium"
                        ></v-radio>
                      </v-radio-group>
                    </div>
                    <v-row>
                      <v-col cols="12" sm="12" v-show="trial_end == 'premium'">
                        <label class="d-block text-left input-label mb-2 font-weight-bold">Billing Cycle</label>
                        <v-select outlined hide-details placeholder="Select" v-model="billingCycle" :items="cycle" @change="getCycle"  :disabled="moduleOfsOption == true ?  false : true" class="text-capitalize"></v-select>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" sm="12" v-show="trial_end == 'premium'">
                        <label class="d-block text-left input-label mb-2 font-weight-bold">Sales Team Contacts</label>
                        <v-select outlined placeholder="Select" v-model="package" :items="packages" item-text="name" item-value="id" @change="getPackage" :disabled="moduleOfsOption == true ?  false : true"></v-select>
                        
                      </v-col>
                    </v-row>
                    <v-row v-if="trial_end == 'premium'">
                      <v-col cols="12" sm="4" text="left">
                        <v-btn color="#0D9647" large dense width="260px" height="56" class="font-weight-bold white--text text-capitalize pa-4" @click="generateContract('ofs-premium')" :disabled="moduleOfsOption == true ?  false : true" :loading="loading">Execute Agreement Now <v-icon class="pl-2" color="#fff">mdi-arrow-right-circle</v-icon></v-btn>
                      </v-col>
                    </v-row>
                    <v-row v-else>
                      <v-col cols="12" sm="4" text="left">
                        <v-btn color="#0D9647" large dense width="260px" height="56" class="font-weight-bold white--text text-capitalize pa-4" :loading="loading" @click="createStandard('ofs')">Confirm Account <v-icon class="pl-2" color="#fff">mdi-arrow-right-circle</v-icon></v-btn>
                      </v-col>
                    </v-row>

                    
                  </div>
                </template>
                <v-row justify="center mt-10">
                  <v-col cols="12" md="3">

                    <template v-if="ofsContractData && ofsContractData.length > 0">
                      <template v-if="ofsContractData[0].contractType == 'ofs-premium'">
                        <v-btn color="#0D9647" large dense width="100%" height="56" class="font-weight-bold white--text text-capitalize" :disabled="buttonStatus" to="payment">Next <v-icon class="pl-2" color="#fff">mdi-arrow-right-circle</v-icon></v-btn>
                      </template>
                      <template v-else>
                        <v-btn color="#0D9647" large dense width="100%" height="56" class="font-weight-bold white--text text-capitalize" :disabled="buttonStatus" to="confirmation">Next <v-icon class="pl-2" color="#fff">mdi-arrow-right-circle</v-icon></v-btn>
                      </template>
                    </template>
                    <template v-else>
                      <v-btn color="#0D9647" large dense width="100%" height="56" class="font-weight-bold white--text text-capitalize" :disabled="buttonStatus" to="confirmation">Next <v-icon class="pl-2" color="#fff">mdi-arrow-right-circle</v-icon></v-btn>
                    </template>
                    
                  </v-col>
                </v-row>

              </v-form>

              <v-form v-else>
                <div class="create-bid text-left mt-5 pa-4">
                  <div class="d-flex justify-space-between align-center mb-5 label-title">
                    <h1 class="font-weight-bold">RFx Platform - Create Bids</h1>
                    <v-sheet>
                      <v-switch
                        v-model="rfxModule"
                        inset @change="rfxToggle"
                      ></v-switch>
                    </v-sheet>
                  </div>
                  <p class="font-weight-medium">BidOut's flagship RFP Platform. The ability to create and distribute RPF's to BidOut's network of <br>service providers.</p>
                  <div class="d-inline-block">
                    <v-btn color="#0D9647" large dense width="260px" height="56" class="font-weight-bold white--text text-capitalize pa-4" @click="generateContract('rfx')" :disabled="rfxBtn == true ?  false : true" :loading="loadingRfx">Execute Agreement Now <v-icon class="pl-2" color="#fff">mdi-arrow-right-circle</v-icon></v-btn>
                  </div>
                </div>
                
                <div class="create-bid text-left mt-10 pa-4">
                  <div class="d-flex justify-space-between align-center mb-5 label-title">
                    <h1 class="font-weight-bold">Respond to Bids - OFS Directory</h1>
                    <h1 class="price-text"><span v-if="trial_end == 'free'">Free</span><span v-else>
                      <template v-if="package.id == 1 && billingCycle == 'Yearly'">
                          $800/year
                      </template>
                      <template v-if="package.id == 1 && billingCycle == 'Monthly'">
                          $79.99/month
                      </template>
                      <template v-if="package == 1 && billingCycle == 'Yearly'">$800/year</template>
                      <template v-if="package == 1 && billingCycle == 'Monthly'">$79.99/month</template>
                      <template v-if="package == 2 && billingCycle == 'Yearly'">$1,000/year</template>
                      <template v-if="package == 2 && billingCycle == 'Monthly'">$99.99/month</template>
                      <template v-if="package == 3 && billingCycle == 'Yearly'">$1,200/year</template>
                      <template v-if="package == 3 && billingCycle == 'Monthly'">$119.99/month</template>
                      <template v-if="package == 4 && billingCycle == 'Yearly'">$2,400/year</template>
                      <template v-if="package == 4 && billingCycle == 'Monthly'">$239.99/month</template>
                    </span></h1>
                    <v-sheet>
                      <v-switch
                        v-model="ofsModule"
                        inset
                        @change="ofsToggle"
                      ></v-switch>
                    </v-sheet>
                  </div>
                  <p class="font-weight-medium">Respond to bid invitations & showcase your services to oil and gas operators to gain access to <br>greater visibility.</p>
                  <div class="d-flex">
                    <v-radio-group
                      v-model="trial_end"
                      mandatory
                      row
                    >
                      <v-radio
                        label="Standard Edition (Free)"
                        color="#0D9647"
                        value="free"
                      ></v-radio>
                      <v-radio
                        label="Premium Edition"
                        color="#0D9647"
                        value="premium"
                      ></v-radio>
                    </v-radio-group>
                  </div>
                  <v-row>
                    <v-col cols="12" sm="12" v-show="trial_end == 'premium'">
                      <label class="d-block text-left input-label mb-2 font-weight-bold">Billing Cycle</label>
                      <v-select outlined hide-details placeholder="Select" v-model="billingCycle" :items="cycle" @change="getCycle"  :disabled="ofsModule == true ?  false : true" class="text-capitalize"></v-select>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="12" v-show="trial_end == 'premium'">
                      <label class="d-block text-left input-label mb-2 font-weight-bold">Sales Team Contacts</label>
                      <v-select outlined placeholder="Select" v-model="package" :items="packages" item-text="name" item-value="id" @change="getPackage" :disabled="ofsModule == true ?  false : true"></v-select>
                      
                    </v-col>
                  </v-row>
                  <v-row v-if="trial_end == 'premium'">
                    <v-col cols="12" sm="4" text="left">
                      <v-btn color="#0D9647" large dense width="260px" height="56" class="font-weight-bold white--text text-capitalize pa-4" @click="generateContract('ofs-premium')" :disabled="ofsBtn == true ?  false : true" :loading="loading">Execute Agreement Now <v-icon class="pl-2" color="#fff">mdi-arrow-right-circle</v-icon></v-btn>
                    </v-col>
                  </v-row>
                  <v-row v-else>
                    <v-col cols="12" sm="4" text="left">
                      <v-btn color="#0D9647" large dense width="260px" height="56" class="font-weight-bold white--text text-capitalize pa-4" :disabled="ofsBtn == true ?  false : true" :loading="loading" @click="createStandard('ofs')">Confirm Account <v-icon class="pl-2" color="#fff">mdi-arrow-right-circle</v-icon></v-btn>
                    </v-col>
                  </v-row>
                </div>
                <v-row justify="center mt-10">
                  <v-col cols="12" md="3">
                    <v-btn color="#0D9647" large dense width="100%" height="56" class="font-weight-bold white--text text-capitalize" :disabled="!contractData ? true : false">Next <v-icon class="pl-2" color="#fff">mdi-arrow-right-circle</v-icon></v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" md="8">
              <div class="getStart-box pa-6 text-left">
                <h1 class="mb-3 font-weight-bold">Questions? Interested in an Enterpise Agreement?</h1>
                <div class="d-flex align-start">
                  <v-icon class="pr-4 mt-1" color="#0D9647">mdi-phone-outline</v-icon>
                  <p>Call BidOut <br><strong>832-786-2400</strong></p>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-main>
      </v-container>
      <Footer></Footer>
   </section>
</template>
<script>
  import NavbarBeforeLogin from '../../components/Layout/NavbarBeforeLogin.vue'
  import Footer from '../../components/Layout/Footer.vue'
  import { mapActions,mapGetters } from "vuex";
export default {
  name : "ModuleSelection",
  components: {
    NavbarBeforeLogin,
    Footer,
  },
  
  data() {
    return {
      loading: false,
      loadingRfx: false,
      rfxModule: true,
      rfxModuleSign: false,
      rfxBtn: true,
      bidRespond: false,
      ofsModule: true,
      ofsModuleSign: false,
      ofsBtn: true,
      rfxActiveModule: true,
      ofsActiveModule: true,
      trial_end : 'premium',
      billingCycle: 'Yearly',
      billing_cycles: '',
      cycle: ['Monthly','Yearly'],
      item_price_id: '',
      unit_price: '',
      signData: true,
      package: 1,
      packages: [
        { name: '1-5 Users - $79.99/month or $800/year prepaid', id: 1},
        { name: '6-10 Users - $99.99/month or $1,000/year prepaid', id: 2},
        { name: '11-15 Users - $119.99/month or $1,200/year prepaid', id: 3},
        { name: '16+ Users - $239.99/month or $2,400/year prepaid', id: 4},
      ],
    };
  },
  computed:{
    ...mapGetters(["packageValue","moduleRfxOption"]),
   companyName(){
    return this.$store.getters.companyName;
   },
   contractData(){
    if(this.$store.getters.contractData){
      return this.$store.getters.contractData.company.contracts.filter((item)=>{
        return this.$store.getters.id == item.signedBy
      })
    }
   },
   ofsContractData(){
    if(this.$store.getters.contractData){
      return this.$store.getters.contractData.company.contracts.filter((item)=>{
        if(this.$store.getters.id == item.signedBy){
          if(item.contractType == 'ofs-premium' || item.contractType == 'ofs'){this.ofsModuleSign = true;}
          return item.contractType == 'ofs-premium' || item.contractType == 'ofs'
        }
      })
    }else{
      return [];
    }
   },
   rfxContractData(){
    if(this.$store.getters.contractData){
      return this.$store.getters.contractData.company.contracts.filter((item)=>{
        if(this.$store.getters.id == item.signedBy){
          if(item.contractType == 'rfx'){this.rfxModuleSign = true;}
          return item.contractType == 'rfx'
        }
      })
    }else{
      return [];
    }
   },
   ofsStandrdContractData(){
    if(this.$store.getters.contractData){
      return this.$store.getters.contractData.company.contracts.filter((item)=>{
        if(this.$store.getters.id == item.signedBy){
          if(item.contractType == 'ofs'){this.ofsModuleSign = true;}
          return item.contractType == 'ofs'
        }
      })
    }else{
      return [];
    }
   },
   buttonStatus(){
    if(this.rfxModuleSign == true && this.ofsModuleSign == true){
      return false;
    }else if(this.rfxModuleSign == true && this.moduleOfsOption == true){
      return true;
    }else if(this.ofsModuleSign == true && this.moduleRfxOption == true){
      return true;
    }else if(this.rfxModuleSign == true && this.moduleOfsOption == false){
      return false;
    }else if(this.ofsModuleSign == true && this.moduleRfxOption == false){
      return false;
    }else{
      return false;
    }
   },
   ip(){
    return this.$store.getters.userIp;
   },
   userid(){
    return this.$store.getters.id;
   },
   moduleRfxOption(){
    this.rfxBtn = this.$store.getters.moduleRfxOption;
    return this.$store.getters.moduleRfxOption;
   },
   moduleOfsOption(){
    this.ofsBtn = this.$store.getters.moduleOfsOption;
    return this.$store.getters.moduleOfsOption;
   }
  },
  methods: {
    ...mapActions(["contractGenerate","getIpAddress","standardAccount"]),
    generateContract(type){
      if(this.package == 1){
        if(this.billing_cycles == 1){
          this.unit_price = 79.99;
        }else{
          this.unit_price = 800;
        }
      }
      if(this.package == 2){
        if(this.billing_cycles == 1){
          this.unit_price = 99.99;
        }else{
          this.unit_price = 1000;
        }
      }
      if(this.package == 3){
        if(this.billing_cycles == 1){
          this.unit_price = 119.99;
        }else{
          this.unit_price = 1200;
        }
      }
      if(this.package == 4){
        if(this.billing_cycles == 1){
          this.unit_price = 239.99;
        }else{
          this.unit_price = 2400;
        }
      }
      if(type == 'ofs-premium'){
        var plan = this.package;
      }else{
        this.unit_price = 0;
        var plan = 0;
      }
      if(this.trial_end == 'free'){
        this.unit_price = 0;
        this.billing_cycles = 0;
        var plan = 0;
      } 
      var contract = {
        ip: this.$store.getters.userIp,
        contractType: type,
        plan: plan,
        id: this.$store.getters.companyId,
        userId: this.$store.getters.id,
        customer_id: this.$store.getters.customerId,
        unit_price: this.unit_price,
        package: this.package,
      }

      this.contractGenerate(contract);
      if(type == 'ofs-premium'){
        this.loading = 'loading';
        this.ofsBtn = false;
      }else{
        this.loadingRfx = 'loading';
        this.rfxBtn = false;
      }
    },
    createStandard(type){
      var contract = {
        ip: this.$store.getters.userIp,
        contractType: type,
        plan: 0,
        id: this.$store.getters.companyId,
        userId: this.$store.getters.id,
        customer_id: this.$store.getters.customerId,
        unit_price: 0,
      }
      this.contractGenerate(contract);
      this.loading = 'loading';
    },
    getCycle(){
      if(this.billingCycle == 'Yearly'){
        this.billing_cycles = 12;
      }else{
        this.billing_cycles = 1;
      }
    },
    getPackage(){
      if(this.package == 4){
        this.billingCycle = 'Yearly';
      }
    },
    rfxToggle(){
      this.rfxBtn = !this.rfxBtn; 
      this.$store.commit('setModuleRfxOption',this.rfxBtn);
      
    },
    ofsToggle(){
      this.ofsBtn = !this.ofsBtn
      this.$store.commit('setModuleOfsOption',this.ofsBtn);

    },
  },
  mounted() {
    document.title = "Module Selection - BidOut" 
    this.getIpAddress();
    
  }
};
</script>
<style scoped lang="scss">

</style>
