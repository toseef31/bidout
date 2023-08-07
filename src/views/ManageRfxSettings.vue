<template>
  <v-row class="createBid-module manage-rfx pa-0 ma-0">

    <v-col class="pa-0 pr-sm-3" :class="[
      showSideBar ? 'col-md-12 col-12 col-sm-12' : 'mid-content-collapse',
      activityPanel ? 'd-sm-block' : 'd-md-block',
    ]" v-show="!activityPanel">
      <v-alert type="success" v-show="getNDADocumentAlert" class="mx-5">
        You have successfully added the NDA Agreement
      </v-alert>
      <v-alert type="success" v-show="getNDADocumentUpdateAlert" class="mx-5">
        You have successfully updated the NDA Agreement
      </v-alert>
      <div class="mid-content fill-height">
        <div class="content-section fill-height">
          <v-row align="center" justify="space-between" class="px-6 mb-2 mt-2 mx-0">
            <v-col cols="6" class="text-left pl-0">
              <h2>Create Bid NDA Requirement</h2>
            </v-col>

          </v-row>
          <v-form @submit.prevent="submit" ref="form" v-model="valid" lazy-validation>

            <v-row align="center" class="px-6  justify-start mx-16">
              <v-col cols="5">
                <div class=" font-weight-bold text-left">Require All Suppliers to Sign NDA</div>
              </v-col>
              <v-col cols="6">
                <v-checkbox color="#0D9648" v-model="requireNda" @change="updateRequireNda"></v-checkbox>
              </v-col>

            </v-row>
            <v-row align="center" class="px-6 mb-4 justify-start mx-16">
              <v-col cols="5">
                <div class=" font-weight-bold text-left">Upload document</div>
              </v-col>
              <v-col cols="4" v-if="!getNDADocument"  class="d-flex align-center">
                <v-file-input @change="fileChange($event)" v-model="document" color="#0D9648" chips :rules="fileRule"
                  label="Upload here"></v-file-input>

                  <a target="_blank" class="ml-16 text-decoration-none" href="https://help.bidout.app/article/22-require-nda-agreement-on-a-rfx">
                <v-icon color="black">mdi-information-outline</v-icon>
                </a>
              </v-col>
              <v-col cols="4" v-if="getNDADocument" class="d-flex align-center">
                <a :href="getNDADocument.href" target="_blank" class="text-left ml-1 mr-16 text-decoration-none">{{ getNDADocument.document }}</a>

                <v-dialog class="dialog-class" v-model="dialog" width="340">

                  <template v-slot:activator="{ on, attrs }">

                    <v-btn v-on="on" v-bind="attrs" icon>
                      <v-icon size="20" color="#F03F20">mdi-close
                      </v-icon>
                    </v-btn>
                  </template>

                  <v-card>
                    <v-card-title class="text-h5 justify-center grey lighten-2">
                      Remove NDA Agreement Document?
                    </v-card-title>
                    <v-card-text class="pt-3 mb-n2">Are you sure you really want to remove this
                      document?</v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                      <v-spacer></v-spacer>

                      <v-btn color="#0d9648" outlined @click="dialog = false">
                        Cancel
                      </v-btn>
                      <v-btn color="#F32349" outlined @click="dialog = false; removeDoc()">
                        Agree
                      </v-btn>
                    </v-card-actions>
                  </v-card>

                </v-dialog>

                <a target="_blank" class="ml-5 text-decoration-none" href="https://help.bidout.app/article/22-require-nda-agreement-on-a-rfx">
                <v-icon size="22" color="black">mdi-information-outline</v-icon>
                </a>

              </v-col>

            </v-row>
            <v-row align="center" class="px-6 mb-4 justify-start mx-16">
              <v-col cols="auto" class="mr-auto">

              </v-col>
              <v-col cols="auto">
                <v-btn width="150" height="40" color="#0D9648" outlined @click="submit" :disabled="getLoading">
                  <v-progress-circular v-if="getLoading" indeterminate :width="3" size="25"
                    color="#0D9648"></v-progress-circular>
                  <div v-else class="text-capitalize">Save</div>
                </v-btn>
              </v-col>

            </v-row>
          </v-form>

        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex';
import moment from 'moment-timezone';

export default {
  name: 'ManageRFxSettings',
  data() {
    return {
      users: '',
      requireNda: false,
      loading: false,
      document: null,
      valid: true,
      dialog: false,
      fileRule: [
        (value) => !!value || 'Document is required!',
      ],
    };
  },
  computed: {
    showSideBar() {
      return this.$store.getters.g_sideBarOpen;
    },
    activityPanel() {
      return this.$store.getters.g_activityPanel;
    },
    getLoading() {
      return this.loading;
    },
    getNDADocumentAlert() {
      return this.$store.getters.ndaDocumentAlert;
    },
    getNDADocument() {
      return this.$store.getters.ndaDocument;
    },
    getNDADocumentUpdateAlert() {
      return this.$store.getters.ndaDocumentUpdateAlert
    }
  },
  methods: {
    ...mapActions(['addCompanyNDADocument','updateNDARequirement']),
    async submit() {
      if (this.$refs.form.validate() && this.document) {
        this.loading = true;

        await this.addCompanyNDADocument({
          companyId: this.users.company._id,
          userId: this.users._id,
          document: this.document,
          requireNda: this.requireNda,
        });

        this.loading = false;
      }
    },
    fileChange(event) {
      this.document = event;
    },
    removeDoc() {
      this.document = null;
      this.$store.commit('setNDADocument', null);
    },
    updateRequireNda() {
      if (this.getNDADocument) {
        this.updateNDARequirement({
          companyId: this.users.company._id,
          requireNda: this.requireNda,
        })
      }
    }
  },
  created() {
    this.users = this.$store.getters.userInfo;

    if (this.users.company.ndaDocument && this.users.company.requireNda !== null) {
      this.$store.commit('setNDADocument', { document: this.users.company.ndaDocument.fileName, requireNda: this.users.company.requireNda, href: this.users.company.ndaDocument.filePath});
    }
  },
  mounted() {
    document.title = 'Manage RFx Settings - BidOut';

    if (this.getNDADocument) {
      this.requireNda = this.getNDADocument.requireNda;
    }
  },
};
</script>

<style scoped lang="scss"></style>
