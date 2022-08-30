<template>
	<div class="top-section d-flex my-12">
	  <div class="user-info d-flex align-center">
	    
	    <div size="120" class="user">
      	<v-img :src="image_name" class="profile-img"></v-img>
        <v-icon class="icon white--text" @click="$refs.FileInput.click()">mdi-upload</v-icon>
        <input ref="FileInput" type="file" style="display: none;" @change="croppie($event)" />
      </div>
      <v-dialog v-model="dialog" width="500">
        <v-card class="px-0">
          <v-card-text class="px-0 pb-0">
            <vue-croppie ref="croppieRef" :enableOrientation="true" :boundary="{ width: 500, height: 350}" :viewport="{ width:112, height:112, 'type':'circle' }">
            </vue-croppie>
            <!-- <VueCropper v-show="selectedFile" ref="cropper" :src="selectedFile" alt="Source Image" :scalable="false" :cropBoxResizable="false" :rounded="true"></VueCropper> -->
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn color="#0D9648" rounded class="text-capitalize" width="100px" text @click="dialog = false">Cancel</v-btn>
            <v-btn color="#0D9648" class="white--text text-capitalize" width="100px" rounded @click="crop()">Crop</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
	    <div class="user-name text-left pl-4 mr-6">
	      <h3>{{userDatas.firstName}}  {{userDatas.lastName}}</h3>
	      <p class="mb-0">{{userDatas.company}}</p>
	    </div>
	    <v-divider vertical inset class="my-4"></v-divider>
	  </div>
	  <v-btn 
	  color="#0d964814" 
	  rounded elevation="0"
	  class="text-capitalize admin-tag ml-8 font-weight-bold"><v-icon>mdi-check-decagram-outline</v-icon> Admin</v-btn>
	</div>
</template>
<script>
  import { mapActions } from "vuex";
  import VueCropper from 'vue-cropperjs'
  import 'cropperjs/dist/cropper.css'
export default {
	components: {
	  VueCropper,
	},
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
    };
  },
  computed:{
   userDatas(){
       return this.$store.getters.userInfo;
   },
  },
  methods: {
    ...mapActions(["updateProfileImg"]),
    // saveImage() {
    //   const userId = this.$route.params.user_id
    //   this.cropedImage = this.$refs.cropper.getCroppedCanvas().toDataURL()
    //   this.$refs.cropper.getCroppedCanvas().toBlob((blob) => {
    //     const formData = new FormData()
        
    //     this.image_name = this.cropedImage;
    //     // formData.append('profile_photo', blob, 'name.jpeg')
    //     // axios
    //     //   .post('/api/user/' + userId + '/profile-photo', formData)
    //     //   .then((response) => {
    //     //   })
    //     //   .catch(function (error) {
    //     //     console.log(error)
    //     //   })
    //   }, this.mime_type)
    // },
    // onFileSelect(e) {
    //   const file = e.target.files[0]
    //   this.mime_type = file.type
    //   console.log(this.mime_type)
    //   if (typeof FileReader === 'function') {
    //     this.dialog = true
    //     const reader = new FileReader()
    //     reader.onload = (event) => {
    //       this.selectedFile = event.target.result
    //       this.$refs.croppieRef.replace(this.selectedFile)
    //     }
    //     reader.readAsDataURL(file)
    //   } else {
    //     alert('Sorry, FileReader API not supported')
    //   }
    // },
    croppie (e) {
      var files = e.target.files || e.dataTransfer.files;
      // alert(files);
      if (!files.length) return;
      this.dialog = true;
      console.log(files[0].name);

      var reader = new FileReader();
      reader.onload = e => {
        this.$refs.croppieRef.bind({
          url: e.target.result

        });

      };

    reader.readAsDataURL(files[0]);
    },
    crop() {
      // Options can be updated.
      // Current option will return a base64 version of the uploaded image with a size of 600px X 450px.
      let options = {
        type: 'base64',
        size: { width: 112, height: 112 },
        format: 'jpeg'
      };
      this.$refs.croppieRef.result(options, output => {
        this.image_name = this.croppieImage = output;
          console.log(this.image_name,'image name');
          this.dialog = false;

          // this.filename = "";
          // var chat_file = this.$refs.msgFile.files;
          // if (chat_file.length > 0) {
          //   this.filename = chat_file[0].name;
          // }
          var data = {
            userid: this.$store.getters.userInfo.id,
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