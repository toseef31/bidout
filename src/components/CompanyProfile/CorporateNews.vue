<template>
  <v-container class="pa-sm-10 pa-4">
    <v-row>
      <v-col cols="10" sm="10">
        <label class="d-block text-left main-label mb-4">Corporate News & Press Releases</label>
      </v-col>
    </v-row>
    <v-form>
      <v-row>
        <v-col cols="12" sm="6" text="left">
          <label class="d-block text-left input-label mb-2">Title</label>
          <v-text-field placeholder="Enter news title" v-model="newsTitle" single-line outlined hide-details></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" text="left">
          <label class="d-block text-left input-label mb-2">Date</label>
          <v-text-field type="date" placeholder="Role ..." v-model="newsDate" single-line outlined hide-details></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6" text="left">
          <label class="d-block text-left input-label mb-2">Url</label>
          <v-text-field placeholder="Enter news url" v-model="newsUrl" single-line outlined></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12" class="pb-0 pl-0 pt-0">
          <v-btn color="#0D9648" class="text-capitalize mr-2 white--text" width="176px" height="54px" :loading="newsLoading" @click="addNews">Add</v-btn>
        </v-col>
      </v-row>
    </v-form>
    <v-row align="center" justify="space-between" class="news-list mt-10" v-for="(news,index) in companyData.corporateNews">
      <v-col cols="12" sm="8" text="left">
        <p class="text-left mb-0">{{news.date | moment('MM/DD/YYYY')}} -  <a :href="news.url" class="text-decoration-none">{{news.title}}</a></p>
      </v-col>
      <v-col cols="12" sm="4" class="text-right">
        
        <v-btn default color="transparent" class="text-capitalize dele-btn" @click="deleteNews(news.index)"><v-icon>mdi-close</v-icon>Delete</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
  import { mapActions,mapGetters } from "vuex";
export default {
  data() {
    return {
      corporateNews:'',
      newsTitle: '',
      newsDate: '',
      newsUrl: '',
      corporateNews: [],
    };
  },
  computed:{
    ...mapGetters(["newsLoading"]),
    companyData(){
      return this.$store.getters.companyData.companyData;
    }
  },
  methods: {
    ...mapActions(["addCompanyNews"]),
    addNews(){
      if(this.$store.getters.companyData.companyData.corporateNews){
        this.corporateNews = this.$store.getters.companyData.companyData.corporateNews;
      }
      var data = {
        title: this.newsTitle,
        date: this.newsDate,
        url: this.newsUrl,
      }
      this.corporateNews.push(data);
      this.addCompanyNews({companyId: this.$store.getters.userInfo.company._id,corporateNews: this.corporateNews});
      this.newsUrl = '';
      this.newsTitle = '';
      this.newsDate = '';
    },
    deleteNews(index){
      if(this.$store.getters.companyData.companyData.corporateNews){
        this.corporateNews = this.$store.getters.companyData.companyData.corporateNews;
      }
      this.corporateNews.splice(index,1);
      this.addCompanyNews({companyId: this.$store.getters.userInfo.company._id,corporateNews: this.corporateNews});
    },
  },
  mounted() {
  } 
};
</script>
