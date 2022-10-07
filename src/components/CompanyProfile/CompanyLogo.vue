<template>
  <v-container class="pa-sm-10 pa-4">
    <v-row>
      <v-col cols="8" sm="6" class="pt-10 text-left">
        <label class="d-block text-left input-label">Company's Logo</label>
        
        <v-dialog
          v-model="dialog"
          width="700"
        >
          <v-card>
            <v-card-title class="text-h5">
              Crop Image
            </v-card-title>
            <v-card-text>
              <vue-croppie ref="croppieRef" :showZoomer="true" :enableOrientation="true" :enableResize="false" :boundary="{ width: 600, height: 350}" :viewport="{ width:450, height:120, 'type':'square' }">
              </vue-croppie>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="#0D9648"
                rounded
                @click="crop"
                class="px-7 white--text text-capitalize"
              >
                Crop
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- the result -->
        <img :src="companyData.image">
      </v-col>
      <v-col cols="4" sm="6" class="pt-10 mt-4 btn-col pl-0 d-flex align-center justify-end">
        <label for="logo-input" class="text-capitalize mr-2 white--text add-logo d-flex align-center font-weight-bold justify-center">Add Image
          <input type="file" accept="image/*" class="logo-input d-none" id="logo-input" @change="croppie($event)">
        </label>
        <v-btn color="rgb(243, 35, 73, 0.1)" class="text-capitalize del-btn" width="48%" height="56px" @click="deleteLogo">Delete</v-btn>
      </v-col>
    </v-row>
  </v-container>
  
</template>
<script>
  import { mapActions } from "vuex";
export default {
  data() {
    return {
      croppieImage: '',
      imageSrc: this.$store.getters.companyData.image,
      base64data: '',
      dialog: false,
      imageUrl: '',
      logoName: '',
    };
  },
  computed:{
    companyData(){
      return this.$store.getters.companyData;
    }
  },
  methods: {
    ...mapActions(["companyProfileImg"]),
    croppie (e) {
      var files = e.target.files || e.dataTransfer.files;
      // alert(files);
      if (!files.length) return;
      this.logoName = files[0].name;
      this.dialog = true;
      var reader = new FileReader();
      reader.onload = e => {
        this.imageUrl = e.target.result
        setTimeout(() => {
            this.bind()
        }, 200)
        
      };

      reader.readAsDataURL(files[0]);
    },
    bind() {
      this.$refs.croppieRef.bind({
        url: this.imageUrl,
      });
    },
    crop() {
      let options = {
        type: 'blob',
        size: { width: 450, height: 120 },
        format: 'png',
        name: this.logoName
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
            companyId: this.$store.getters.userInfo.company.id,
            files: this.image_name,
          }
          this.companyProfileImg(data);
      });
    },
    deleteLogo(){
      var data = {
        companyId: this.$store.getters.userInfo.company.id,
        files: '',
      }
      this.companyProfileImg(data);
    },
  },
  mounted() {
  } 
};
</script>