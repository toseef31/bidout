<template>
  <v-row justify="center" class="module-selection">
    <v-col cols="12" md="9">
      <v-alert type="error" class="mt-4" v-show="getShowErrorAlert">
        {{ getCompanyErrorAlert }}
      </v-alert>
    </v-col>
    <v-col cols="12" md="9">
      <div class="title-head text-left">
        <h3 class="mb-1">New Account Setup:</h3>
        <h1 class="mb-8">{{ companyName }}</h1>
      </div>

      <v-form>

        <div class="create-bid text-left mt-10 pa-4">
          <div class="d-flex justify-space-between align-center mb-5 label-title">
            <h1 class="main-module-title">Respond to Bids - OFS Directory</h1>
            <h1 class="price-text"><span v-if="trial_end === 'free'">Free</span><span v-else>
                <template v-if="packageType === 1">$1000/year</template>

                <template v-if="packageType === 2">$1,200/year</template>

                <template v-if="packageType === 3">$1,400/year</template>

                <template v-if="packageType === 4">$2,400/year</template>

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
                item-value="id" :disabled="ofsModule === true ? false : true"></v-select>

            </v-col>
          </v-row>

        </div>

        <v-row justify="center" class="mt-10" v-if="trial_end == 'premium'">
          <v-col cols="12" sm="4" text="left">
            <v-btn color="#0D9647" large dense width="260px" height="56"
              class="font-weight-bold white--text text-capitalize pa-4" @click="generateContract('ofs-premium')"
              :disabled="ofsBtn === true ? false : true || getLoading" :loading="getLoading">Next<v-icon class="pl-2"
                color="#fff">mdi-arrow-right-circle</v-icon></v-btn>
          </v-col>
        </v-row>
        <v-row v-else justify="center" class="mt-10">
          <v-col cols="12" sm="4" text="left">
            <v-btn color="#0D9647" large dense width="260px" height="56"
              class="font-weight-bold white--text text-capitalize pa-4"
              :disabled="ofsBtn === true ? false : true || getLoading" :loading="getLoading"
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
      ofsModule: true,
      ofsBtn: true,
      trial_end: 'premium',
      packageType: 1,
      packages: [
        { name: '1-5 Sales Employees - $1000/year', id: 1 },
        { name: '6-10 Sales Employees - $1200/year', id: 2 },
        { name: '11-15 Sales Employees - $1400/year', id: 3 },
        { name: '16+ Sales Employees - $2400/year', id: 4 },
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
    getSupplierId() {
      return this.$store.getters.supplierId;
    },
    getLoading() {
      return this.loading;
    },
    getShowErrorAlert() {
      return this.$store.getters.authShowErrorAlert;
    },
    getCompanyErrorAlert() {
      return this.$store.getters.companyError;
    },
  },
  methods: {
    ...mapActions(['contractGenerate', 'getIpAddress']),
    async generateContract(type) {
      this.loading = true;

      const contract = {
        ip: this.$store.getters.userIp,
        contractType: type,
        plan: this.packageType,
        supplierId: this.getSupplierId,
      };

      await this.contractGenerate(contract);

      this.loading = false;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    async createStandard(type) {
      this.loading = true;

      const contract = {
        ip: this.$store.getters.userIp,
        contractType: type,
        supplierId: this.getSupplierId,
      };

      await this.contractGenerate(contract);
      this.loading = false;
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
