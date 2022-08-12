<template>
  <v-form>
    <v-container class="pa-sm-10 pa-4">
      <v-row>
        <v-col cols="12" sm="12">
        <label class="d-block text-left main-label mb-4">ESG Differentiators</label>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6" text="left">
          <label class="d-block text-left input-label mb-2">Title</label>
          <v-text-field placeholder="Full name ..." single-line outlined></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" text="left">
          <label class="d-block text-left input-label mb-2">Document</label>
          <v-file-input outlined class="logo-input text-center profile-input" placeholder="Add Document" color="#0D9648"></v-file-input>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12" text="left">
          <label class="d-block text-left input-label mb-2">Text</label>
          <v-textarea outlined name="input-7-4"></v-textarea>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12">
        <v-btn color="#0D9648" large class="text-capitalize white--text" width="20%">Add</v-btn>
        </v-col>
      </v-row>
      <v-row class="mt-5">
        <v-col cols="12" sm="4" v-for="esg in esGList">
          <div class="esg-list text-left">
            <h4 class="text-left mb-5">{{esg.title}}</h4>
            <p class="text-left">{{esg.description}}</p>
            <a href="" download class="text-decoration-none" v-if="esg.file">{{esg.file}} <v-icon>mdi-tray-arrow-down</v-icon></a><br>
            <v-btn color="#F32349" outlined small min-width="32px" height="32px" class="pa-0 mt-3"><v-icon>mdi-trash-can-outline</v-icon></v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
<script>
  import { mapActions } from "vuex";
export default {
  data() {
    return {
      esGList: [
        {
          title: 'Environmetal',
          description: 'Donec vulputate dolor ac tempus fringilla. Vestibulum et consectetur dui, nec condimentum risus. Vivamus vel mauris lacus. Sed vel sagittis augue, sed aliquet velit. Curabitur nunc enim, dignissim eu tellus a, molestie aliquam risus. Mauris ornare eros eget eros semper, ut cursus sapien viverra.',
          file: '2021_ESG_Report.pdf',
        },
        {
          title: 'Social',
          description: 'Donec vulputate dolor ac tempus fringilla. Vestibulum et consectetur dui, nec condimentum risus. Vivamus vel mauris lacus. Sed vel sagittis augue, sed aliquet velit. Curabitur nunc enim, dignissim eu tellus a, molestie aliquam risus. Mauris ornare eros eget eros semper, ut cursus sapien viverra.',
          file: '',
        },
        {
          title: 'Governance',
          description: 'Donec vulputate dolor ac tempus fringilla. Vestibulum et consectetur dui, nec condimentum risus. Vivamus vel mauris lacus. Sed vel sagittis augue, sed aliquet velit. Curabitur nunc enim, dignissim eu tellus a, molestie aliquam risus. Mauris ornare eros eget eros semper, ut cursus sapien viverra.',
          file: '2021_ESG_Report.pdf',
        },
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