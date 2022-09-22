<template>
  <v-form class="excutive-form">
    <v-container class="pa-sm-10 pa-4">
      <v-row>
        <v-col cols="12" sm="12">
        <label class="d-block text-left main-label mb-4">Executive Leadership</label>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6" text="left">
          <label class="d-block text-left input-label mb-2">Executive's name</label>
          <v-text-field placeholder="Enter executive's name" v-model="excutiveName" single-line outlined></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" text="left">
          <label class="d-block text-left input-label mb-2">Role</label>
          <v-text-field placeholder="Enter role" v-model="excutiveRole" single-line outlined></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6" text="left">
          <label class="d-block text-left input-label mb-2">LinkedIn Profile</label>
          <v-text-field placeholder="Paste link here ..." v-model="excutivelinkdinProfile" single-line outlined hide-details></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" text="left">
          <label class="d-block text-left input-label mb-2">Profile</label>
          <label class="profile-input font-weight-bold" for="profile-input">
          <input type="file" id="profile-input" accept="image/*" class="d-none"  @change="cropProfile($event)">
          Add Image</label>
          <v-dialog
            v-model="dialogProfile"
            width="700"
          >
            <v-card>
              <v-card-title class="text-h5">
                Crop Image
              </v-card-title>
              <v-card-text>
                <vue-croppie ref="croppieRefProfile" :enableOrientation="true" :enableResize="false" :boundary="{ width: 400, height: 250}" :viewport="{ width:175, height:175, 'type':'square' }">
                </vue-croppie>
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="#0D9648"
                  rounded
                  @click="cropImage"
                  class="px-7 white--text text-capitalize"
                >
                  Crop
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- the result -->
          <!-- <img :src="croppedProfile"> -->
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12">
          <v-btn color="#0D9648" large class="text-capitalize white--text" height="54px" width="176px">Add Executive</v-btn>
        </v-col>
      </v-row>
      <div class="service-list text-left mt-10">
        <div class="profile-list" v-if="croppedProfile">
          <v-icon color="#F32349" class="pa-1 white">mdi-trash-can-outline</v-icon>
          <v-img :src="croppedProfile" width="173"></v-img>
          <h6>{{excutiveName}}</h6>
          <p>{{excutiveRole}}</p>
          <v-icon color="#013D3A">mdi-linkedin</v-icon>
        </div>
        <div class="profile-list" v-for="excutive in excutiveLeadership">
          <v-icon color="#F32349" class="pa-1 white">mdi-trash-can-outline</v-icon>
          <v-img :src="require('@/assets/images/ofs/company/leader-1.png')" width="173"></v-img>
          <h6>{{excutive.name}}</h6>
          <p>{{excutive.designation}}</p>
          <v-icon color="#013D3A">mdi-linkedin</v-icon>
        </div>
      </div>
    </v-container>
  </v-form>
</template>
<script>
  import { mapActions } from "vuex";
export default {
  data() {
    return {
      excutiveLeadership: [
        { name: 'William A. (Andy) Hendricks, Jr.',designation: 'President and CEO',image: 'leader-1.png'},
        { name: 'William A. (Andy) Hendricks, Jr.',designation: 'President and CEO',image: 'leader-2.png'},
        { name: 'William A. (Andy) Hendricks, Jr.', designation: 'President and CEO',image: 'leader-3.png'},
        { name: 'William A. (Andy) Hendricks, Jr.',designation: 'President and CEO',image: 'leader-4.png'},
      ],
      croppieProfile: '',
      croppedProfile: null,
      dialogProfile: false,
      excutivelinkdinProfile: '',
      profileImage: '',
      excutiveName: '',
      excutiveRole: '',
    };
  },
  computed:{
    
  },
  methods: {
    cropProfile (e) {
      console.log(e);
      var files = e.target.files || e.dataTransfer.files;
      // alert(files);
      if (!files.length) return;
      this.dialogProfile = true;
      var reader = new FileReader();
      reader.onload = e => {
        this.profileImage = e.target.result
        setTimeout(() => {
          this.bind()
        }, 200)
      };

    reader.readAsDataURL(files[0]);
    },
    bind() {
      this.$refs.croppieRefProfile.bind({
        url: this.profileImage,
      });
    },
    cropImage() {
      
      let options = {
        type: 'base64',
        size: { width: 175, height: 175 },
        format: 'png'
      };
      this.$refs.croppieRefProfile.result(options, output => {
        this.croppedProfile = this.croppieProfile = output;
          console.log(this.croppieProfile);
          this.dialogProfile = false;
        });
    }
  },
  mounted() {
    
  } 
};
</script>