<template>
  <v-container class="pa-sm-10 pa-4 corporate-video">
    <v-row>
      <v-col cols="12" sm="12" class="d-flex align-center justify-space-between">
      <label class="text-left main-label">Corporate Documents</label>
        <v-btn color="#0D9648" class="text-capitalize white--text mt-5" width="176px" height="54px" @click="uploadDocument">Add Document</v-btn>
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
            <p>{{get_url_name(doc.attachment)}}</p>
          </a>
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
    };
  },
  computed:{
    companyData(){
      return this.$store.getters.companyData.companyData;
    }
  },
  methods: {
    ...mapActions(["addCompanyDocument","deleteCompanyDocument"]),
     uploadDocument() {
      this.isSelecting = true
      window.addEventListener('focus', () => {
        this.isSelecting = false
      }, { once: true })

      this.$refs.documentUploader.click()
    },
    
    
    handleDocumentUpload( event ){
      console.log(event);
      this.file = event.target.files[0];
      this.fileName = this.file.name;
      this.fileExt =  this.fileName.split('.').pop();
      // this.previewDoc();
      if(this.$store.getters.companyData.companyData.corporateDocuments){
        this.documents = this.$store.getters.companyData.companyData.corporateDocuments;
      }
      this.documents.push(this.file);
      const head = Date.now().toString();
      const tail = Math.random().toString().substr(2);
      var data = {
        companyId: this.$store.getters.userInfo.company.id,
        files: this.file,
        documentId: head + tail
      }
      this.addCompanyDocument(data);
    },
    addDocument(){
      var data = {
        companyId: this.$store.getters.userInfo.company.id,
        files: this.documents,
      }
      this.addCompanyDocument(data);
    },
    deleteDoc(data){
      if(this.$store.getters.companyData.companyData.corporateDocuments){
        this.documents = this.$store.getters.companyData.companyData.corporateDocuments;
      }
      var data = {
        companyId: this.$store.getters.userInfo.company.id,
        corporateDocument: data,
      }
      this.deleteCompanyDocument(data);
      
    },
    get_url_extension( url ) {
      return url.split(/[#?]/)[0].split('.').pop().trim();
    },
    get_url_name( url ) {
      return url.split('/').pop();
    },
  },
  mounted() {
  } 
};
</script>