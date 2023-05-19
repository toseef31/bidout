<template>
  <v-row class="createBid-module manage-template pa-0 ma-0">
    <v-col
      class="pa-0 pr-sm-3"
      :class="[
        showSideBar ? 'col-md-12 col-12 col-sm-12' : 'mid-content-collapse',
        activityPanel ? 'd-sm-block' : 'd-md-block',
      ]"
      v-show="!activityPanel"
    >
      <div class="mid-content fill-height">
        <div class="content-section fill-height">
          <v-row align="center" justify="space-between" class="px-6 mb-4 mt-2 mx-0">
            <v-col cols="6" class="text-left pl-0">
              <h4>Bid Templates</h4>
            </v-col>
            <v-col cols="6" class="text-right pr-0">
              <v-btn
                large
                elevation="0"
                color="#0D9648"
                height="56px"
                @click="createTem"
                class="text-capitalize white--text font-weight-bold py-6"
                >Create New Template</v-btn
              >
            </v-col>
          </v-row>
          <v-simple-table class="template-table">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left pl-6">Template Name</th>
                  <th class="text-left">Type</th>
                  <th class="text-left">Created Date</th>
                  <th class="text-left">Creator</th>
                  <th class="text-left">Notes</th>
                  <th class="text-left pr-6 white--text">action Text</th>
                </tr>
              </thead>

              <tbody>
                <tr
                  v-for="(template, index) in bidTemplates"
                  class="py-4 px-6"
                  v-if="template.company == userDatas.company._id"
                >
                  <td class="text-left pl-6">{{ template.title }}</td>
                  <td class="text-left">{{ template.type }}</td>
                  <td class="text-left">
    
                    {{ formatDatev2(template.dueDate) }} {{template.dueTime}}
                  </td>
                  <td class="text-left">
                    {{ template.user ? `${template.user.firstName} ${template.user.lastName}` : "No name" }}
                  </td>
                  <td class="text-left">
                    <div
                      v-if="edit === index && isEdit"
                      class="d-flex edit-comment align-center"
                    >
                      <v-text-field
                        outlined
                        height="30px"
                        width="150px"
                        hide-details
                        v-model="bidTemplates[index]['note']"
                      ></v-text-field>
                      <v-btn icon
                        ><v-icon color="#0D9648" @click="saveNote(template, index)">
                          mdi-content-save
                        </v-icon></v-btn
                      >
                    </div>
                    <div
                      v-else
                      class="d-flex justify-space-between text-truncate"
                      style="width: 400px"
                    >
                      {{ template.note }}
                    </div>
                  </td>

                  <td class="text-left pr-6">
                    <v-icon
                      v-if="!isEdit || edit !== index"
                      class="mr-4"
                      color="#0D9648"
                      @click="openNote(index)"
                      >mdi-message-processing-outline
                    </v-icon>
                    <v-icon color="#0D9648" class="mr-4" @click="editDraft(template._id)"
                      >mdi-pencil-outline</v-icon
                    >
                    <v-icon color="#F32349" @click="openConfirm(template._id, index)"
                      >mdi-trash-can-outline</v-icon
                    >
                  </td>
                </tr>
                <v-dialog v-model="dialog" width="500">
                  <v-card>
                    <v-card-title class="text-h5 grey lighten-2"> Confirm </v-card-title>
                    <v-card-text class="pt-5">
                      Are you sure you want to delete?
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="#F32349" outlined @click="dialog = false">
                        Cancel
                      </v-btn>
                      <v-btn
                        color="#0d9648"
                        outlined
                        @click="
                          deleteTemp();
                          dialog = false;
                        "
                      >
                        Confirm
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </tbody>
            </template>
          </v-simple-table>
        </div>
      </div>
    </v-col>
  </v-row>
</template>
<script>
import { mapActions } from "vuex";
import moment from "moment-timezone";
import Navbar from "../components/Layout/Navbar.vue";
import LeftSidebar from "../components/Layout/Dashboard/LeftSidebar.vue";
import RightSidebar from "../components/Layout/Dashboard/RightSidebar.vue";

export default {
  name: "ManageTemplate",
  components: {
    Navbar,
    LeftSidebar,
    RightSidebar,
  },

  data() {
    return {
      users: "",
      edit: "",
      isEdit: false,
      editIcon: [true],
      dialog: false,
      templateId: "",
      templateIndex: "",
    };
  },
  computed: {
    showSideBar() {
      return this.$store.getters.g_sideBarOpen;
    },
    activityPanel() {
      return this.$store.getters.g_activityPanel;
    },
    userDatas() {
      if (this.$store.getters.userInfo) {
        return this.$store.getters.userInfo;
      }
    },
    bidTemplates() {
      return this.$store.getters.bidTemplates;
    },
  },
  methods: {
    ...mapActions([
      "getBidTemplates",
      "deleteTemplate",
      "updateTemplateNote",
      "getEditTemplate",
    ]),
    formatDate(item, item2) {
      const date = moment(item * 1000 + item2 / 1000000)
        .tz("America/Chicago")
        .format("MM/DD/YYYY");

      return date;
    },
     formatDatev2(dueDate) { 
      return dueDate !== '' && dueDate !== null ? moment.tz(dueDate, 'America/Chicago').format('MM/DD/YYYY') : '';
    },
    openConfirm(id, index) {
      this.dialog = true;
      this.templateId = id;
      this.templateIndex = index;
    },
    deleteTemp() {
      this.deleteTemplate({ id: this.templateId });
      this.dialog = false;
    },
    openNote(index) {
      this.edit = index;
      this.isEdit = true;
      this.editIcon[index] = false;
    },
    saveNote(template, index) {
      this.isEdit = false;
      this.editIcon[index] = true;
      this.updateTemplateNote({ templateId: template._id, note: template.note });
    },
    editDraft(id) {
      this.getEditTemplate({ id, company: this.$store.getters.userInfo.company });
    },
    createTem() {
      this.$store.state.bid.bidData.serial = "";
      this.$store.state.bid.bidData.id = "";
      this.$store.state.bid.bidData._id = "";
      this.$store.state.bid.bidData.status = "";
      this.$store.state.bid.bidData.statusType = "";
      this.$store.state.bid.bidData.attachments = "";
      this.$store.state.bid.bidData.invitedSuppliers = "";
      this.$store.state.bid.bidData.invitedTeamMembers = "";
      this.$store.state.bid.bidData.lineItems = "";
      this.$store.state.bid.bidData.questions = "";
      this.$store.commit("setBidTitle", "");
      this.$store.commit("setBidType", "");
      this.$store.commit("setBidDueDate", "");
      this.$store.commit("setBidDueTime", "");
      this.$store.commit("setBidRegions", "");
      this.$store.commit("setBidEnabled", "");
      this.$store.commit("setBidDescription", [{ body: "" }]);
      this.$store.commit("setInvitedTeamMembers", null);
      this.$store.commit("setInvitedSuppliersData", null);
      this.$store.commit("setBidlines", null);
      this.$store.commit("setAttachement", null);
      this.$store.commit("setAttachData", null);
      this.$store.commit("setQuestions", null);
      this.$store.commit("setDraftBidsList", null);
      this.$store.commit("setDraftTime", null);
      this.$router.push("/create-template");
    },
  },
  async created() {
    await this.getBidTemplates();  
  },
  mounted() {
    document.title = "Manage Templates - BidOut";
    this.users = this.$store.getters.userInfo;
  },
};
</script>
<style scoped lang="scss"></style>
