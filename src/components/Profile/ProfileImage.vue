<template>
	<div class="top-section d-flex my-12">

	  <div class="user-info d-flex align-center">
	    
	    <div size="120" class="user">
        <v-img :src="userDatas.image" v-if="userDatas.image" class="profile-img"></v-img>
      	<v-img :src="require('@/assets/images/user/demo.png')" v-else class="profile-img"></v-img>
        <v-icon class="icon white--text" @click="$refs.FileInput.click()">mdi-upload</v-icon>
        <input ref="FileInput" type="file" style="display: none;" @change="croppie($event)" />
      </div>
      <v-dialog v-model="dialog" width="500">
        <v-card class="px-0">
          <v-card-text class="px-0 pb-0">
            <vue-croppie ref="croppieRef" :enableOrientation="true" :enableResize="false" :boundary="{ width: 500, height: 350}" :viewport="{ width:112, height:112, 'type':'circle' }" :enforceBoundry="true">
            </vue-croppie>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn color="#0D9648" rounded class="text-capitalize" width="100px" text @click="dialog = false">Cancel</v-btn>
            <v-btn color="#0D9648" class="white--text text-capitalize" width="100px" rounded @click="crop()">Crop</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
	    <div class="user-name text-left pl-4 mr-6">
	      <h3>{{userDatas.firstName}}  {{userDatas.lastName}}</h3>
	      <p class="mb-0">{{userDatas.company.company}}</p>
	    </div>
	    <v-divider vertical inset class="my-4"></v-divider>
	  </div>
	  <v-btn 
	  color="#0d964814" 
	  rounded elevation="0"
	  class="text-capitalize admin-tag ml-8 font-weight-bold"><v-icon>mdi-check-decagram-outline</v-icon>{{userDatas.role}}</v-btn>
	</div>
</template>
<script>
  import { mapActions } from "vuex";
export default {
  data() {
    return {
      mime_type: '',
      cropedImage: '',
      autoCrop: false,
      selectedFile: '',
      image: '',
      dialog: false,
      files: '',
      image_name: '',
      croppieImage: '',
      cropped: null,
      dialog: false,
      fileName: '',
      imageSrc: this.$store.getters.userInfo.image,
      base64data: '',
      url: '',
    };
  },
  computed:{
    userDatas(){
      return this.$store.getters.userInfo;
    },
    userImg(){
      return this.$store.getters.userImg;
    }
  },
  methods: {
    ...mapActions(["updateProfileImg"]),
    croppie (e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      
      this.fileName = files[0].name;
      this.dialog = true;
      var reader = new FileReader();
        
      reader.onload = e => {
        this.url = e.target.result;
        setTimeout(() => {
          this.bind()
        }, 180)
        
      };

      reader.readAsDataURL(files[0]);
    },
    bind() {
      this.$refs.croppieRef.bind({
        url: this.url,
      });
    },
    crop() {
      // Options can be updated.
      // Current option will return a base64 version of the uploaded image with a size of 600px X 450px.
      let options = {
        type: 'blob',
        size: { width: 112, height: 112 },
        format: 'png',
        name: this.fileName
      };
      this.$refs.croppieRef.result(options, output => {
        var reader = new FileReader();
        this.base64data = reader.readAsDataURL(output); 
        reader.onloadend = function() {
          this.base64data = reader.result;                
          this.imageSrc = this.base64data;
        }
        this.image_name = this.croppieImage = output;
        this.dialog = false;

          var data = {
            userid: this.$store.getters.userInfo.id,
            email: this.$store.getters.userInfo.email,
            files: this.image_name,
          }
          this.updateProfileImg(data);
        });
      },
  },
  mounted() {
    
  } 
};
</script>