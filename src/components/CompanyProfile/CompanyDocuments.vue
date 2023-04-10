<template>
  <v-container class="pa-sm-10 pa-4 corporate-video">
    <v-row>
      <v-col cols="12" sm="12" class="d-flex align-center justify-space-between">
      <label class="text-left main-label">Corporate Documents</label>
        <v-btn color="#0D9648" class="text-capitalize white--text mt-5" width="176px" height="54px" @click="uploadDocument" :loading="loading" :disabled="loading">Add Document</v-btn>
        <input ref="documentUploader" class="d-none" type="file"
          accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint, application/pdf"
          @change="handleDocumentUpload($event)"
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3" sm="2" v-for="(doc,index) in companyData.corporateDocuments">
        <div class="doc-col">
          <a :href="doc.attachment" target="_blank" class="text-decoration-none">
            <v-img v-if="get_url_extension(doc.attachment) == 'pdf'" :src="require('@/assets/images/profile/pdf.png')" width="80px" class="mx-auto"></v-img>
            <v-img v-else-if="get_url_extension(doc.attachment) == 'xlsx' || get_url_extension(doc.attachment) == 'xls'" :src="require('@/assets/images/profile/excel.png')" width="80px" class="mx-auto"></v-img>
            <v-img v-else :src="require('@/assets/images/profile/other.png')" width="80px" class="mx-auto"></v-img>
            <p v-if="edit != doc.documentId">{{doc.name}}</p>
          </a>
            <v-text-field clearable v-model="nameEdit" v-if="edit == doc.documentId"></v-text-field>
            <v-btn small min-width="36px" v-show="!edit" min-height="36px" @click="editDoc(doc)"><v-icon>mdi-pencil</v-icon></v-btn>
            <v-btn small min-width="36px" v-show="edit" min-height="36px" @click="saveDoc(doc)"><v-icon>mdi-content-save</v-icon></v-btn>
            &nbsp;
            <v-btn small min-width="36px" min-height="36px" @click="deleteDoc(doc)"><v-icon>mdi-trash-can-outline</v-icon></v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
  import { mapActions } from "vuex";
export default {
  data() {
    return {
      documents: [],
      loading: false,
      loader: null,
      isName: true,
      isField: false,
      nameEdit: '',
      edit: '',
    };
  },
  computed:{
    companyData(){
      return this.$store.getters.companyData.companyData;
    }
  },
  methods: {
    ...mapActions(["addCompanyDocument","deleteCompanyDocument","editCompanyDocument"]),
     uploadDocument() {
      
      window.addEventListener('focus', () => {
        this.isSelecting = false
        this.isSelecting = true
        this.loader = 'loading';
        this.loading = true;
      }, { once: true })

      this.$refs.documentUploader.click()
    },
    
    
    handleDocumentUpload( event ){
      this.file = event.target.files[0];
      this.fileName = this.file.name;
      this.fileExt =  this.fileName.split('.').pop();
      
      if(this.$store.getters.companyData.companyData.corporateDocuments){
        this.documents = this.$store.getters.companyData.companyData.corporateDocuments;
      }
      this.documents.push(this.file);
      const head = Date.now().toString();
      const tail = Math.random().toString().substr(2);
      var data = {
        companyId: this.$store.getters.userInfo.company.id,
        files: this.file,
        name: this.fileName,
        documentId: head + tail
      }
      this.addCompanyDocument(data);
       setTimeout(() => {
        this.loading = false
      }, 5000)
    },
    addDocument(){
      
      var data = {
        companyId: this.$store.getters.userInfo.company.id,
        files: this.documents,
      }
      this.addCompanyDocument(data);
       
    },
    deleteDoc(val){
      if(this.$store.getters.companyData.companyData.corporateDocuments){
        this.documents = this.$store.getters.companyData.companyData.corporateDocuments;
      }
      var data = {
        companyId: this.$store.getters.userInfo.company.id,
        corporateDocument: val,
      }
      this.deleteCompanyDocument(data);
    },
    editDoc(val){
      this.edit = val.documentId;
      this.isField = true;
      this.nameEdit = val.name;
    },
    saveDoc(val){
      var obj = {
        documentId: val.documentId,
        attachment: val.attachment,
        name: this.nameEdit
      };
      var data = {
        companyId: this.$store.getters.userInfo.company.id,
        corporateDocument: obj,
      }
      this.editCompanyDocument(data);
      this.edit = '',
      this.isField = false;
    },
    get_url_extension( url ) {
      return url.split(/[#?]/)[0].split('.').pop().trim();
    },
  },
  mounted() {
  } 
};
</script>