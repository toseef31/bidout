<template>
    <v-row justify="center" class="module-selection">
        <v-col cols="12" md="9">
            <div class="title-head text-left">
                <h3 class="mb-1">New Account Setup:</h3>
                <h1 class="mb-8">{{ companyName }}Tetra Technologies</h1>
            </div>

            <v-form>

                <div class="create-bid text-left mt-10 pa-4">
                    <div class="d-flex justify-space-between align-center mb-5 label-title">
                        <h1 class="main-module-title">Respond to Bids - OFS Directory</h1>
                        <h1 class="price-text"><span v-if="trial_end === 'free'">Free</span><span v-else>
                                <template v-if="packageType.id === 1 && billingCycle === 'Yearly'">
                                    $800/year
                                </template>
                                <template v-if="packageType.id === 1 && billingCycle === 'Monthly'">
                                    $79.99/month
                                </template>
                                <template v-if="packageType === 1 && billingCycle === 'Yearly'">$800/year</template>
                                <template v-if="packageType === 1 && billingCycle === 'Monthly'">$79.99/month</template>
                                <template v-if="packageType === 2 && billingCycle === 'Yearly'">$1,000/year</template>
                                <template v-if="packageType === 2 && billingCycle === 'Monthly'">$99.99/month</template>
                                <template v-if="packageType === 3 && billingCycle === 'Yearly'">$1,200/year</template>
                                <template v-if="packageType === 3 && billingCycle === 'Monthly'">$119.99/month</template>
                                <template v-if="packageType === 4 && billingCycle === 'Yearly'">$2,400/year</template>
                                <template v-if="packageType === 4 && billingCycle === 'Monthly'">$239.99/month</template>
                            </span></h1>
                        <v-sheet>
                            <v-switch v-model="ofsModule" inset @change="ofsToggle"></v-switch>
                        </v-sheet>
                    </div>
                    <p class="font-weight-medium pr-8">Respond to bid invitations & showcase your services to oil and gas
                        operators to gain access to greater visibility. Standard Edition is 100% Free.

                    </p>

                    <p><strong>Premium Edition</strong> allows your company to be invited to RFx (RFP’s & RFI’s) outside of
                        your existing
                        network of buyers and gain work from BidOut’s network of oil & gas operators and other buyers.</p>
                    <div class="d-flex mt-n4">
                        <v-radio-group v-model="trial_end" mandatory row>
                            <v-radio label="Standard Edition (Free)" color="#0D9647" value="free"></v-radio>
                            <v-radio label="Premium Edition" color="#0D9647" value="premium"></v-radio>

                            <a icon class="ml-n1 text-decoration-none" href="https://bidout.app/ofs-provider-directory/"
                                target="_blank">
                                <v-icon size="20">mdi-information-outline</v-icon></a>
                        </v-radio-group>
                    </div>

                    <v-row class="mt-1">
                        <v-col cols="12" sm="12" v-show="trial_end == 'premium'">
                            <label class="d-block text-left input-label mb-2 font-weight-bold">Sales Employees</label>
                            <v-select outlined placeholder="Select" v-model="packageType" :items="packages" item-text="name"
                                item-value="id" @change="getPackage"
                                :disabled="ofsModule === true ? false : true"></v-select>

                        </v-col>
                    </v-row>

                </div>

                <v-row justify="center" class="mt-10" v-if="trial_end == 'premium'">
                    <v-col cols="12" sm="4" text="left">
                        <v-btn color="#0D9647" large dense width="260px" height="56"
                            class="font-weight-bold white--text text-capitalize pa-4"
                            @click="generateContract('ofs-premium')" :disabled="ofsBtn === true ? false : true"
                            :loading="loading">Next<v-icon class="pl-2" color="#fff">mdi-arrow-right-circle</v-icon></v-btn>
                    </v-col>
                </v-row>
                <v-row v-else justify="center" class="mt-10">
                    <v-col cols="12" sm="4" text="left">
                        <v-btn color="#0D9647" large dense width="260px" height="56"
                            class="font-weight-bold white--text text-capitalize pa-4"
                            :disabled="ofsBtn === true ? false : true" :loading="loading"
                            @click="createStandard('ofs')">Next <v-icon class="pl-2"
                                color="#fff">mdi-arrow-right-circle</v-icon></v-btn>
                    </v-col>
                </v-row>
            </v-form>
        </v-col>
    </v-row>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'ModuleSelection',
  data() {
    return {
      loading: false,
      loadingRfx: false,
      rfxBtn: true,
      ofsModule: true,
      ofsBtn: true,
      trial_end: 'premium',
      billingCycle: 'Yearly',
      packageType: 1,
      packages: [
        { name: '1-5 Sales Employees - $800/year', id: 1 },
        { name: '6-10 Sales Employees - $1,000/year', id: 2 },
        { name: '11-15 Sales Employees - $1,200/year', id: 3 },
        { name: '16+ Sales Employees - $2,400/year', id: 4 },
      ],
    };
  },
  computed: {
    companyName() {
      return this.$store.getters.companyName;
    },
    ip() {
      return this.$store.getters.userIp;
    },
    userid() {
      return this.$store.getters.id;
    },
  },
  methods: {
    ...mapActions(['contractGenerate', 'getIpAddress']),
    generateContract(type) {
      let plan;
      if (type === 'ofs-premium') {
        plan = this.packageType;
      } else {
        plan = 0;
      }
      if (this.trial_end === 'free') {
        plan = 0;
      }

      const contract = {
        ip: this.$store.getters.userIp,
        contractType: type,
        plan,
        id: this.$store.getters.companyId,
        userId: this.$store.getters.id,
      };

      this.contractGenerate(contract);
      if (type === 'ofs-premium') {
        this.loading = 'loading';
        this.ofsBtn = false;
      } else {
        this.loadingRfx = 'loading';
        this.rfxBtn = false;
      }
    },
    createStandard(type) {
      const contract = {
        ip: this.$store.getters.userIp,
        contractType: type,
        plan: 0,
        id: this.$store.getters.companyId,
        userId: this.$store.getters.id,
      };
      this.contractGenerate(contract);
      this.loading = 'loading';
    },
    getPackage() {
      if (this.packageType === 4) {
        this.billingCycle = 'Yearly';
      }
    },
    ofsToggle() {
      this.ofsBtn = !this.ofsBtn;
    },
  },
  mounted() {
    document.title = 'Module Selection - BidOut';
    this.getIpAddress();
  },
};
</script>
<style scoped lang="scss"></style>
