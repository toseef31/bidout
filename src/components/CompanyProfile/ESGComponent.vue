<template>
  <v-form>
    <v-container class="pa-sm-10 pa-4">
      <v-row>
        <v-col cols="12" sm="12">
        <label class="d-block text-left main-label mb-4">ESG Differentiators</label>
        </v-col>
      </v-row>
      <!-- <v-row>
        <v-col cols="12" sm="6" text="left">
          <label class="d-block text-left input-label mb-2">Title</label>
          <v-text-field placeholder="Full name ..." v-model="title" single-line outlined></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" text="left">
          <label class="d-block text-left input-label mb-2">Document</label>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12" text="left">
          <label class="d-block text-left input-label mb-2">Text</label>
          <v-textarea outlined name="input-7-4" v-model="description"></v-textarea>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12">
        <v-btn color="#0D9648" large class="text-capitalize white--text" width="176px" height="54px" @click="addEsG">Add</v-btn>
        </v-col>
      </v-row> -->
      <v-row class="mt-5">
        <!-- <v-col cols="12" sm="4" v-for="(esg,index) in companyData.esgInitiatives">
          <div class="esg-list text-left">
            <h4 class="text-left mb-5">{{esg.name}} </h4>
            <p class="text-left">{{esg.description}}</p>
            <a :href="esg.attachment" download class="text-decoration-none" v-if="esg.attachment">Download <v-icon>mdi-tray-arrow-down</v-icon></a><br>
            <v-btn color="#F32349" outlined small min-width="32px" height="32px" class="pa-0 mt-3" @click="deleteEsG(esg)"><v-icon>mdi-trash-can-outline</v-icon></v-btn>
          </div>
        </v-col> -->


        <v-col cols="12" sm="4" v-for="(esgDB,key) in companyData">
              <div class="esg-list text-left">
                <h4 class="text-left mb-5">{{esgDB.name}}<small class="pl-5 company-link" @click="editOpen(esgDB)" v-show="!edit">Edit</small><small class="pl-5 company-link" @click="addEsG(esgDB)" v-show="edit">Save</small></h4>
                <p class="text-left" v-show="edit != esgDB.name">{{esgDB.description}}</p>
                <v-textarea outlined name="input-7-4" v-model="description" v-show="edit == esgDB.name">{{esgDB.description}}</v-textarea>
                <a :href="esgDB.attachment" download class="text-decoration-none" v-if="esgDB.attachment" v-show="edit != esgDB.name">Download <v-icon>mdi-tray-arrow-down</v-icon></a>
                <v-file-input outlined class="logo-input text-center profile-input" v-model="attachment" placeholder="Add Document" color="#0D9648" v-show="edit == esgDB.name"></v-file-input>
                <br>
                <v-btn color="#F32349" outlined small min-width="32px" height="32px" class="pa-0 mt-3" @click="deleteEsG(esgDB)"><v-icon>mdi-trash-can-outline</v-icon></v-btn>
              </div>
        </v-col>



      </v-row>
    </v-container>
  </v-form>
</template>
<script>
  import { mapActions } from "vuex";
export default {
  data() {
    return {
      title: '',
      attachment: '',
      description: '',
      edit: '',
      esgInitiatives: [],
      filteredArray: [],
      esgData:  [
        {
          name: 'Environmetal',
          description: 'Donec vulputate dolor ac tempus fringilla. Vestibulum et consectetur dui, nec condimentum risus. Vivamus vel mauris lacus. Sed vel sagittis augue, sed aliquet velit. Curabitur nunc enim, dignissim eu tellus a, molestie aliquam risus. Mauris ornare eros eget eros semper, ut cursus sapien viverra.',
          attachment: '',
          companyId: this.$store.getters.userInfo.company.id,
          type: 'environmetal'
        },
        {
          name: 'Social',
          description: 'Donec vulputate dolor ac tempus fringilla. Vestibulum et consectetur dui, nec condimentum risus. Vivamus vel mauris lacus. Sed vel sagittis augue, sed aliquet velit. Curabitur nunc enim, dignissim eu tellus a, molestie aliquam risus. Mauris ornare eros eget eros semper, ut cursus sapien viverra.',
          attachment: '',
          companyId: this.$store.getters.userInfo.company.id,
          type: 'social'
        },
        {
          name: 'Governance',
          description: 'Donec vulputate dolor ac tempus fringilla. Vestibulum et consectetur dui, nec condimentum risus. Vivamus vel mauris lacus. Sed vel sagittis augue, sed aliquet velit. Curabitur nunc enim, dignissim eu tellus a, molestie aliquam risus. Mauris ornare eros eget eros semper, ut cursus sapien viverra.',
          attachment: '',
          companyId: this.$store.getters.userInfo.company.id,
          type: 'governance'
        },
      ],
    };
  },
  computed:{
    companyData(){
      // if(this.$store.getters.companyData.esgInitiatives){
        // var egsNewData = this.$store.getters.companyData.esgInitiatives;
      //       for(const j=0; j < egsNewData.length; j++){
      //     for(const i= 0; i < this.esgData.length; i++){
      //         if(this.esgData[i].type == egsNewData[j].type){
      //           console.log(this.esgData[i].type == egsNewData[j].type);
      //           var myIndex = this.esgData[i].type.indexOf(this.esgData[i].type);
      //           console.log(myIndex,'ifff');
      //           if (myIndex !== -1) {
      //               this.esgData.splice(myIndex, 1);
      //             this.esgData = [...egsNewData, ...this.esgData];
      //                 return this.esgData;
      //             console.log(this.esgData,'array');
      //           }
      //         }
      //       }
      //     }
      //   }else{
      //     return this.esgData;
      //   }
      // if(this.$store.getters.companyData.esgInitiatives){
      //   var egsNewData = this.$store.getters.companyData.esgInitiatives;
      //   for(var i=0;i<egsNewData.length;i++){
      //     this.esgData.splice(i,1);
      //   this.filteredArray = [...egsNewData, ...this.esgData];
      //   } 
      //   console.log(this.esgData);
      //   return this.esgData;
      // }else{
        return this.$store.getters.companyData.esgInitiatives;
      // }
      
    }
  },
  methods: {
    ...mapActions(["addCompanyEsg","deleteCompanyEsg"]),
    addEsG(esg){
      if(this.$store.getters.companyData.esgInitiatives){
        this.esgInitiatives = this.$store.getters.companyData.esgInitiatives;
      }
      const head = Date.now().toString();
      const tail = Math.random().toString().substr(2);
      if(this.attachment){
        var attach = this.attachment;
      }else{
        var attach = '';
      }
      var esgData = {
        name: esg.name,
        description: this.description,
        attachment: attach,
        id: head + tail,
        type: esg.type,
      }
      // this.esgInitiatives.push(esgData);
      var data = {
        companyId: this.$store.getters.userInfo.company.id,
        esgInitiatives: esgData,
      }
      this.addCompanyEsg(data);
      this.title = '';
      this.description = '';
      this.attachment = '';
      this.edit = false;
    },
    deleteEsG(data){
      if(this.$store.getters.companyData.esgInitiatives){
        this.esgInitiatives = this.$store.getters.companyData.esgInitiatives;
      }
      // this.esgInitiatives.splice(index,1);
      var data = {
        companyId: this.$store.getters.userInfo.company.id,
        esgInitiatives: data,
      }
      this.deleteCompanyEsg(data);
    },
    get_url_name( url ) {
      return url.split('/').pop();
    },
    editOpen(esg){
      console.log(esg);
      this.edit = esg.name;
      this.description = esg.description;
      console.log(this.esg.description);
    }
  },
  mounted() {
    // if(this.$store.getters.companyData.esgInitiatives){
    //   this.esgData.push(this.$store.getters.companyData.esgInitiatives);
    // }
  } 
};
</script>