<template>
  <v-form>
    <v-container class="pa-sm-10 pa-4">
      <v-row>
        <v-col cols="12" sm="12">
        <label class="d-block text-left main-label mb-4">Executive Leadership</label>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6" text="left">
          <label class="d-block text-left input-label mb-2">Executive's name</label>
          <v-text-field placeholder="Full name ..." single-line outlined></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" text="left">
          <label class="d-block text-left input-label mb-2">Role</label>
          <v-text-field placeholder="Role ..." single-line outlined></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6" text="left">
          <label class="d-block text-left input-label mb-2">LinkedIn Profile</label>
          <v-text-field placeholder="Paste link here ..." single-line outlined></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" text="left">
          <label class="d-block text-left input-label mb-2">Profile</label>
          <v-file-input outlined class="logo-input text-center profile-input" placeholder="Add Image" color="#0D9648" append-icon="mdi-paperclip"
            ></v-file-input>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12">
          <v-btn color="#0D9648" large class="text-capitalize white--text">Add Executive</v-btn>
        </v-col>
      </v-row>
      <div class="service-list text-left mt-10">
        <div class="profile-list" v-for="excutive in excutiveLeadership">
          <v-icon color="#F32349">mdi-trash-can-outline</v-icon>
          <v-img :src="require('@/assets/images/profile/demo.png')" width="100"></v-img>
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
        { name: 'William A. (Andy) Hendricks, Jr.',designation: 'President and CEO',},
        { name: 'William A. (Andy) Hendricks, Jr.',designation: 'President and CEO',},
        { name: 'William A. (Andy) Hendricks, Jr.', designation: 'President and CEO',},
        { name: 'William A. (Andy) Hendricks, Jr.',designation: 'President and CEO',},
      ],
    };
  },
  computed:{
    
  },
  methods: {
    
  },
  mounted() {
    
  } 
};
</script>