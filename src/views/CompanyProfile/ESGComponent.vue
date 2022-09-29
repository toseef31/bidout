<template>
  <v-form>
    <v-container class="pa-sm-10 pa-4">
      <v-row>
        <v-col cols="12" sm="12">
        <label class="d-block text-left main-label mb-4">ESG Differentiators</label>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6" text="left">
          <label class="d-block text-left input-label mb-2">Title</label>
          <v-text-field placeholder="Full name ..." v-model="title" single-line outlined></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" text="left">
          <label class="d-block text-left input-label mb-2">Document</label>
          <v-file-input outlined class="logo-input text-center profile-input" v-model="attachment" placeholder="Add Document" color="#0D9648"></v-file-input>
          <!-- <input id="attach-file"
             type="file" 
            truncate-length="8" ref="attachment"> -->
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
      </v-row>
      <v-row class="mt-5">
        <v-col cols="12" sm="4" v-for="(esg,index) in companyData.esgInitiatives">
          <div class="esg-list text-left">
            <h4 class="text-left mb-5">{{esg.name}}</h4>
            <p class="text-left">{{esg.description}}</p>
            <a :href="esg.attachment" download class="text-decoration-none" v-if="esg.attachment">Download <v-icon>mdi-tray-arrow-down</v-icon></a><br>
            <v-btn color="#F32349" outlined small min-width="32px" height="32px" class="pa-0 mt-3" @click="deleteEsG(esg)"><v-icon>mdi-trash-can-outline</v-icon></v-btn>
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
      esgInitiatives: [],
    };
  },
  computed:{
    companyData(){
      return this.$store.getters.companyData;
    }
  },
  methods: {
    ...mapActions(["addCompanyEsg","deleteCompanyEsg"]),
    addEsG(){
      if(this.$store.getters.companyData.esgInitiatives){
        this.esgInitiatives = this.$store.getters.companyData.esgInitiatives;
      }
      const head = Date.now().toString();
      const tail = Math.random().toString().substr(2);
      var esgData = {
        name: this.title,
        description: this.description,
        attachment: this.attachment,
        id: head + tail,
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
    }
  },
  mounted() {
    
  } 
};
</script>