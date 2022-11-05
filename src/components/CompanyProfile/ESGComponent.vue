<template>
  <v-form class="excutive-form">
    <v-container class="pa-sm-10 pa-4">
      <v-row>
        <v-col cols="12" sm="12">
        <label class="d-block text-left main-label mb-4">ESG Differentiators</label>
        </v-col>
      </v-row>
      <v-row class="mt-5">
        <v-col cols="12" sm="4" v-for="(esgDB,key) in companyData">
          <div class="esg-list text-left">
            <h4 class="text-left mb-5">{{esgDB.name}}<small class="pl-5 company-link" @click="editOpen(esgDB)" v-show="!edit">Edit</small><small class="pl-5 company-link" @click="addEsG(esgDB)" v-show="edit">Save</small></h4>
            <p class="text-left" v-show="edit != esgDB.name">{{esgDB.description}}</p>
            <v-textarea outlined name="input-7-4" v-model="description" v-show="edit == esgDB.name">{{esgDB.description}}</v-textarea>
            <a :href="esgDB.attachment" download class="text-decoration-none" v-if="esgDB.attachment" v-show="edit != esgDB.name">Download <v-icon>mdi-tray-arrow-down</v-icon></a>
            
            <label for="docFile" class="profile-input" v-show="edit == esgDB.name">{{docName}}
              <input type="file" ref="attachment" id="docFile" class="d-none" @change="onFileChange($event)">
            </label>
            <br>
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
      docName: 'Add Document',
      esgData:  [
        {
          name: 'Environmental',
          description: 'Add your ESG differentiators here.',
          attachment: '',
          type: 'environmetal',
          id: '1665493735995301876774201398'
        },
        {
          name: 'Social',
          description: 'Add your ESG differentiators here.',
          attachment: '',
          type: 'social',
          id: '166549373599530187677420139',
        },
        {
          name: 'Governance',
          description: 'Add your ESG differentiators here.',
          attachment: '',
          type: 'governance',
          id: '1665493735995301876774201'
        },
      ],
    };
  },
  computed:{
    companyData(){
      var target = this.esgData;
      var source = this.$store.getters.companyData.companyData.esgInitiatives;
      Array.prototype.push.apply(target, source);
      let uniqueObjArray = [
        ...new Map(target.map((item) => [item["type"], item])).values(),
      ];
      return uniqueObjArray;
    }
  },
  methods: {
    ...mapActions(["addCompanyEsg","deleteCompanyEsg"]),
    onFileChange(event){
       this.attachment =  event.target.files[0];
       this.docName = this.attachment.name;
    },
    addEsG(esg){
      if(this.$store.getters.companyData.companyData.esgInitiatives){
        this.esgInitiatives = this.$store.getters.companyData.companyData.esgInitiatives;
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
      this.edit = esg.name;
      this.description = esg.description;
    }
  },
  mounted() {
    
  } 
};
</script>