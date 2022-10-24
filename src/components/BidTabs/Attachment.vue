<template>
	<div>
		<div class="attachment-list">
		  <v-simple-table
		      fixed-header
		      height="300px"
		    >
		    <template v-slot:default>
		      <thead>
		        <tr>
		          <th class="text-left">
		            
		          </th>
		          <th class="text-left">
		            File Name
		          </th>
		          <th class="text-left">
		            Comment
		          </th>
		          <th class="text-left">
		            File Size
		          </th>
		          <th class="text-left">
		            Uploaded By
		          </th>
		          <th class="text-left">
		            Uploaded Date
		          </th>
		          <th class="text-left">
		            
		          </th>
		        </tr>
		      </thead>
		      <tbody>
		        <tr v-for="doc in documents">
		          <td class="text-left"><img :src="require('@/assets/images/bids/FilePdf.png')"></td>
		          <td class="text-left">{{doc.name}}</td>
		          <td class="text-left">
		          	
		          	<span v-if="!edit"></span>
		          	<div v-if="edit" class="d-flex edit-comment align-center"><v-text-field outlined height="30px" width="150px" hide-details></v-text-field><v-checkbox color="#0D9648"></v-checkbox></div>
		          </td>
		          <td class="text-left">{{size(doc.size)}}</td>
		          <td class="text-left">{{uploadedBy}}</td>
		          <td class="text-left"></td>
		          <td>
		            <div class="d-flex">
		              <img :src="require('@/assets/images/bids/chatdots.png')" class="mr-3" @click="edit = !edit">
		              <v-icon color="#F32349">mdi-trash-can-outline</v-icon>
		            </div>
		          </td>
		        </tr>
		      </tbody>
		    </template>
		  </v-simple-table>
		</div>
		<v-row no-gutters align="center" class="px-6 mt-16">
		  <v-col cols="12" sm="12" md="12">
		    <div class="upload-attach">
		      <label for="uploadFile" class="upload-file pa-8 d-block font-weight-medium" >
		      	<input type="file" ref="documentUploader" class="d-none" id="uploadFile"  @change="handleDocumentUpload($event)">
		         Upload or Drop Attachments Here
		      </label>
		    </div>
		  </v-col>
		  
		</v-row>
	</div>
</template>
<script>
  import { mapActions } from "vuex";
export default {
  data() {
    return {
    	edit: false,
    	file: '',
    	fileName: '',
    	fileExt: '',
    	fileSize: '',
    	documents: [],
    	docsList: [],
    };
  },
  computed:{
    uploadedBy(){
    	return this.$store.getters.userInfo.firstName+' '+this.$store.getters.userInfo.lastName;
    }
  },
  methods: {
  	...mapActions(["uploadBidAttach"]),
    changeTab(){
      this.$emit('changetab', 'tab-6');
    },
     uploadDocument() {
      this.isSelecting = true
      window.addEventListener('focus', () => {
        this.isSelecting = false
      }, { once: true })

      this.$refs.documentUploader.click()
    },
    handleDocumentUpload( event ){
      this.file = event.target.files[0];
      this.fileName = this.file.name;
      this.fileExt =  this.fileName.split('.').pop();
      this.fileSize = (this.file.size / (1024*1024)).toFixed(2);
      console.log(this.fileSize);
      // this.previewDoc();
      this.documents.push(this.file);
      const head = Date.now().toString();
      const tail = Math.random().toString().substr(2);
      var data = {
        uploadedBy: this.$store.getters.userInfo.firstName+' '+this.$store.getters.userInfo.lastName,
        attachement: this.documents,
      }
      
      this.uploadBidAttach(data);
    },
    size(size){
    	var sizeInMB = (size / (1024*1024)).toFixed(2);
    	return sizeInMB+'mb';
    }
  },
  mounted() {
    
	}	
};
</script>