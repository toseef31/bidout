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
          <input type="file" id="profile-input" accept="image/*" class="d-none"  @change="cropProfile">
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
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12">
          <v-btn color="#0D9648" large class="text-capitalize white--text" height="54px" width="176px" @click="addExcutive">Add Executive</v-btn>
        </v-col>
      </v-row>
      <div class="service-list text-left mt-10">
        <draggable
          :list="companyData.executiveLeadership"
          :disabled="!enabled"
          class="list-group"
          ghost-class="ghost"
          @start="dragging = true"
          @end="checkMove"
        > 
          <div class="profile-list" v-for="(excutive,index) in orderCate(companyData.executiveLeadership)">
            <v-icon color="#F32349" class="pa-1 white" @click="deleteExcutive(excutive)">mdi-trash-can-outline</v-icon>
            <v-img :src="excutive.profilePicture" width="173"></v-img>
            <h6>{{excutive.name}}</h6>
            <p>{{excutive.role}}</p>
            <a v-if="excutive.linkedin" class="text-decoration-none" target="_blank" :href="excutive.linkedin">
              <v-icon color="#013D3A">mdi-linkedin</v-icon>
            </a>
          </div>
        </draggable>
      </div>
    </v-container>
  </v-form>
</template>
<script>
  import draggable from 'vuedraggable'
  import _ from "lodash";
  import { mapActions } from "vuex";
export default {
  components: {
    draggable,
  },
  data() {
    return {
      croppieProfile: '',
      croppedProfile: null,
      dialogProfile: false,
      excutivelinkdinProfile: '',
      profileImage: '',
      excutiveName: '',
      excutiveRole: '',
      logoName: '',
      executiveLeadership: '',
      enabled: true,
      dragging: false,
      sortData: [],
    };
  },
  computed:{
    companyData(){
      return this.$store.getters.companyData.companyData;
    },
    draggingInfo() {
      return this.dragging ? "under drag" : "";
    }
  },
  methods: {
    ...mapActions(["addCompanyExcutive","deleteCompanyExcutive","editCompanyExcutive"]),
    cropProfile (file) {
      var files = file.target.files || file.dataTransfer.files;
      if (!files.length) return;
      this.logoName = files[0].name;
      this.dialogProfile = true;
      var reader = new FileReader();
      reader.onload = e => {
      
        this.profileImage = e.target.result
      
        setTimeout(() => {
          this.bind()
        }, 200)
      };

    reader.readAsDataURL(files[0]);
    document.getElementById("profile-input").value = "";
    },
    bind() {
      this.$refs.croppieRefProfile.bind({
        url: this.profileImage,
      });
    },
    cropImage() {
      
      let options = {
        type: 'blob',
        size: { width: 175, height: 175 },
        format: 'png',
        name: this.logoName
      };
      this.$refs.croppieRefProfile.result(options, output => {
        var reader = new FileReader();
        this.base64data = reader.readAsDataURL(output); 
        reader.onloadend = function() {
          this.base64data = reader.result;                
          this.imageSrc = this.base64data;
        }
        this.croppedProfile = this.croppieProfile = output;
          this.dialogProfile = false;
        });
    },
    addExcutive(){
      const head = Date.now().toString();
      const tail = Math.random().toString().substr(2);
      let order = this.$store.getters.companyData.companyData.executiveLeadership.length;
      var leader = {
        profilePicture : this.croppieProfile,
        name: this.excutiveName,
        role: this.excutiveRole,
        linkedin: this.excutivelinkdinProfile,
        id: head + tail,
        orderNumber: order + 1,
      }
      var data = {
        companyId: this.$store.getters.userInfo.company.id,
        executiveLeadership: leader
      }
      this.addCompanyExcutive(data);
      this.croppieProfile = '';
      this.excutiveName = '';
      this.excutiveRole = '';
      this.excutivelinkdinProfile = '';
      this.$refs.croppieRefProfile = '';
      this.$refs.croppieRefProfile = null;
      document.getElementById("profile-input").value = "";
    },
    deleteExcutive(esgData){
      var data = {
        companyId: this.$store.getters.userInfo.company.id,
        executiveLeadership: esgData,
      }
      this.deleteCompanyExcutive(data);
    },
    checkMove: function(e) {
      this.executiveLeadership = this.$store.getters.companyData.companyData.executiveLeadership;
      this.executiveLeadership = JSON.parse(JSON.stringify(this.executiveLeadership.map((item, index) => {
        item.orderNumber = index + 1;
        return item;
      })));

      var data = {
        companyId: this.$store.getters.userInfo.company.id,
        leadership: this.executiveLeadership,
      }
      this.editCompanyExcutive(data);
    },
    orderCate(leadership){
      return _.orderBy(leadership, "orderNumber", "asc");
    }
  },
  mounted() {
    
  } 
};
</script>