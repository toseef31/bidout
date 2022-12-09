<template>
  <v-col class="createBid-module manage-template  pa-0 pa-sm-3 pl-sm-0" :class="[ showSideBar ? 'col-md-9 col-12 col-sm-7' : 'mid-content-collapse', activityPanel ? 'd-sm-block' : 'd-md-block']" v-show="!activityPanel">
    <div class="mid-content fill-height">
      <div class="content-section fill-height">
        <v-row align="center" justify="space-between" class="px-6 mb-4 mt-2 mx-0">
          <v-col cols="6" class="text-left pl-0">
            <h4>Bid Templates </h4>
          </v-col>
          <v-col cols="6" class="text-right pr-0">
            <v-btn large elevation="0" color="#0D9648" height="56px" to="/create-template" class="text-capitalize white--text font-weight-bold py-6">Create New Template</v-btn>
          </v-col>
        </v-row>
        <v-simple-table class="template-table">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left pl-6">
                  Template Name
                </th>
                <th class="text-left">
                  Type
                </th>
                <th class="text-left">
                  Created Date
                </th>
                <th class="text-left">
                  Creator
                </th>
                <th class="text-left">
                  Notes
                </th>
                <th class="text-left pr-6 white--text">
                  action Text
                </th>
              </tr>
            </thead>
            
            <tbody>
              <tr v-for="(template, index) in bidTemplates" class="py-4 px-6" v-if="template.companyId == userDatas.company.id">
                <td class="text-left pl-6">{{template.title}}</td>
                <td class="text-left">{{template.type}}</td>
                <td class="text-left">{{template.createdAt | moment('MM/DD/YYYY')}}</td>
                <td class="text-left">{{template.userName ? template.userName : 'No name'}}</td>
                <td class="text-left">
                  <div class="">
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
                      ></v-text-field
                      >
                      <v-btn icon><v-icon color="#0D9648" @click="saveNote(template,index)">
                        mdi-content-save
                      </v-icon></v-btn>
                      
                    </div>
                    <div v-else class="d-flex justify-space-between">
                      {{template.note}}
                      <img
                        :src="require('@/assets/images/bids/chatdots.png')"
                        class="mr-3" width="24px" height="24px"
                        @click="openNote(index)"
                      />
                    </div>
                    
                  </div>
                </td>
                <td class="text-left pr-6">
                  <v-icon color="#0D9648" class="mr-4"  @click="editDraft(template.id)">mdi-pencil-outline</v-icon>
                  <v-icon color="#F32349" @click="openConfirm(template.id,index)">mdi-trash-can-outline</v-icon>
                </td>
              </tr>
              <v-dialog
                v-model="dialog"
                width="500"
              >
                <v-card>
                  <v-card-title class="text-h5 grey lighten-2">
                    Confirm
                  </v-card-title>
                  <v-card-text class="pt-5">
                    Are you sure you want to delete?
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="#F32349"
                      outlined
                      @click="dialog = false"
                    >
                      Cancel
                    </v-btn>
                    <v-btn
                      color="#0d9648"
                      outlined
                      @click="deleteTemp(); dialog = false"
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
</template>
<script>
  import Navbar from '../components/Layout/Navbar.vue'
  import LeftSidebar from '../components/Layout/Dashboard/LeftSidebar.vue'
  import RightSidebar from '../components/Layout/Dashboard/RightSidebar.vue'
  import { mapActions } from "vuex";
export default {
  name : "ManageTemplate",
  components: {
    Navbar,
    LeftSidebar,
    RightSidebar,
  },
  
  data() {
    return {
      users: '',
      edit: "",
      isEdit: false,
      editIcon: [true],
      dialog: false,
      templateId: '',
      templateIndex: '',
    };
  },
  computed:{
    showSideBar(){
        return this.$store.getters.g_sideBarOpen;
    },
    activityPanel(){
        return this.$store.getters.g_activityPanel;
    },
    userDatas(){
        return this.$store.getters.userInfo;
    },
    bidTemplates(){
      return this.$store.getters.bidTemplates;
    },
  },
  methods: {
    ...mapActions(["getBidTemplates","deleteTemplate","updateTemplateNote","getEditTemplate"]),
    openConfirm(id,index){
      this.dialog = true;
      this.templateId = id;
      this.templateIndex = index;
    },
    deleteTemp(){
      this.deleteTemplate({id:this.templateId});
      this.dialog = false;
    },
    openNote(index) {
      this.edit = index;
      this.isEdit = true;
      this.editIcon[index] = false;
    },
    saveNote(template,index) {
      this.isEdit = false;
      this.editIcon[index] = true;
      this.updateTemplateNote({ templateId: template.id, note: template.note });
    },
    editDraft(id){
      this.getEditTemplate({id,company:this.$store.getters.userInfo.company.company});
    }
  },
  async created(){
    await this.getBidTemplates();
  },
  mounted() {
    document.title = "Manage Templates - BidOut";
    this.users = this.$store.getters.userInfo;
  }
};
</script>
<style scoped lang="scss">

</style>
