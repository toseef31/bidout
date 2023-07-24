<template>
  <v-container class="px-sm-10 px-4">
    <v-row class="company-logo-row" justify="space-between" align="center">
      <v-col cols="12" sm="4" class="text-left">
        <label class="d-block text-left input-label mb-2">Company's Logo</label>
        <v-dialog
          v-model="dialog"
          width="700"
        >
          <v-card>
            <v-card-title class="text-h5">
              Crop Image
            </v-card-title>
            <v-card-text>
              <vue-croppie ref="croppieRef" :showZoomer="true" :enableOrientation="true" :enableResize="false" :enforceBoundary="false" :boundary="{ width: 600, height: 350}" :viewport="{ width:450, height:120, 'type':'square' }">
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
        <div class="logo-box rounded pa-4 pt-1">
          <div class="text-right pa-1 pr-0">
            <label for="logo-input" class="text-capitalize white--text add-logo font-weight-bold justify-center"><v-icon color="#0D9648">mdi-pencil-outline</v-icon>
              <input type="file" accept="image/*" class="logo-input d-none" id="logo-input" @change="croppie($event)">
            </label>
            <v-icon color="#F32349" @click="deleteLogo">mdi-delete-outline</v-icon>
          </div>
          <img :src="companyData.image" width="100%">
        </div>
      </v-col>
      <v-col cols="12" sm="4" class="btn-col d-flex align-center justify-end">
        <v-btn color="#F1F1F1" class="text-capitalize del-btn mr-2" width="48%" height="56px" @click="deleteLogo">Cancel</v-btn>
        <label for="logo-input" class="text-capitalize white--text add-logo d-flex align-center font-weight-bold justify-center">Save
          <input type="file" accept="image/*" class="logo-input d-none" id="logo-input" @change="croppie($event)">
        </label>
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
      imageSrc: this.$store.getters.companyData.companyData.image,
      base64data: '',
      dialog: false,
      imageUrl: '',
      logoName: '',
    };
  },
  computed:{
    companyData(){
      return this.$store.getters.companyData.companyData;
    }
  },
  methods: {
    ...mapActions(["companyProfileImg"]),
    croppie (e) {
      var files = e.target.files || e.dataTransfer.files;
      
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
            companyId: this.$store.getters.userInfo.company._id,
            files: this.image_name,
          }
          this.companyProfileImg(data);
      });
    },
    deleteLogo(){
      var data = {
        companyId: this.$store.getters.userInfo.company._id,
        files: '',
      }
      this.companyProfileImg(data);
    },
  },
  mounted() {
  } 
};
</script>
