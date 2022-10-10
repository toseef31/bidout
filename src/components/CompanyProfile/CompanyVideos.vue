<template>
  <v-container class="pa-sm-10 pa-4 corporate-video">
    <label class="text-left main-label d-block">Corporate Video</label>
    <v-row>
      <v-col cols="10" sm="10">
        <v-text-field placeholder="Add youtube video url ..." v-model="videoLinks" single-line outlined hide-details></v-text-field>
      </v-col>
      <v-col cols="2" sm="2" class="pl-0">
      <v-btn color="#0D9648" class="text-capitalize mr-2 white--text" width="100%" height="54px" @click="addVideos">Add Video</v-btn>
      </v-col>
    </v-row>
    <v-row v-if="companyData.corporateVideos">
      <v-col cols="6" sm="6" v-for="(video,key) in companyData.corporateVideos">
        <div class="video-col">
          <iframe  id="video-preview" :src="video" width="100%" height="350px"></iframe >
          <v-btn absolute top left @click="deleteVideo(key)"><v-icon>mdi-trash-can-outline</v-icon> Delete Video</v-btn>
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
      videoLinks: '',
      videos: [],
    };
  },
  computed:{
    companyData(){
      return this.$store.getters.companyData;
    }
  },
  methods: {
    ...mapActions(["addCompanyVideos"]),
    addVideos(){
     if(this.$store.getters.companyData.corporateVideos){
       this.videos = this.$store.getters.companyData.corporateVideos;
     }
     this.videos.push(this.videoLinks);
     var data = {
       companyId: this.$store.getters.userInfo.company.id,
       videoLinks: this.videos,
     }
     this.addCompanyVideos(data);
     this.videoLinks = '';
    },
    deleteVideo(index){
     if(this.$store.getters.companyData.corporateVideos){
       this.videos = this.$store.getters.companyData.corporateVideos;
     }
     if(index >= 0){
       this.videos.splice(index,1);
       var data = {
         companyId: this.$store.getters.userInfo.company.id,
         videoLinks: this.videos,
       }
       this.addCompanyVideos(data);
     }else{
       alert("error");
     }
     
    },
  },
  mounted() {
  } 
};
</script>