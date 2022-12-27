<template>
  <v-row fill-height align="center" class="fill-height" v-if="loading">
    <v-col cols="12">
      <v-progress-circular :width="3" color="green" indeterminate ></v-progress-circular>
    </v-col>
  </v-row>
  <div class="rightSide-Module" v-else>
    <div class="activity-section" :class="[ activityPanel ? '' : 'desktop-section']">
      <div class="title">
        <h3 class="font-weight-bold text-left">Activity</h3>
      </div>
      <v-list>
        <v-list-item-group
          active-class="success--text"
          multiple
        >
          <template v-if="activities.length == 0 || !activities">
            <h4 class="text-center py-3">
              No activity
            </h4>
          </template>
          <template v-for="(item, index) in activities" v-if="activities.length > 0 || activities">
            <v-list-item :key="item.index">
              <template v-slot:default="{ active }">
                
                <v-list-item-avatar class="my-1 mr-2">
                  <v-icon
                    class="notification-icon"
                  >mdi-email-outline
                  </v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title v-text="item.action"></v-list-item-title>

                </v-list-item-content>

                <v-list-item-action >
                  <v-list-item-action-text>{{istoday(item.date)}}</v-list-item-action-text>
                </v-list-item-action>
              </template>
            </v-list-item>

            <v-divider
              v-if="index < activities.length - 1"
              :key="index"
            ></v-divider>
          </template>
          
        </v-list-item-group>
      </v-list>
      <!-- <div class="pa-3 view-all" v-if="activities.length > 11"> 
          <a href="">View all </a>     
      </div>  -->
    </div>    
    <div class="social-section pa-2 mt-3" :class="[ activityPanel ? 'd-none d-md-block' : 'd-block']">
      <v-row class="align-center d-none d-sm-flex">
        <v-col cols="6" md="4" class="pr-sm-0">
          <v-img :src="require('@/assets/images/dashboard/linkedin.png')" class="mb-2" width="90px" height="23px"></v-img>
          <h4 class="social-text text-left">Stay up to date!</h4>
        </v-col>
        <v-col cols="12" md="8">
          <v-btn class="follow-btn pa-2 white--text" href="https://www.linkedin.com/company/bidout" target="__blank">Follow us on LinkedIn 
              <v-icon>mdi-chevron-right</v-icon>
          </v-btn> 
        </v-col>
      </v-row>
      <div class="align-center d-block d-sm-none mobile-social">
        <v-row justify-space-between>
          <v-col cols="4" class="pr-sm-0 py-0 pt-4">
            <v-img :src="require('@/assets/images/dashboard/linkedin.png')" class=""></v-img>
          </v-col>
          <v-col cols="8" class="pr-sm-0 py-0">
            <v-img :src="require('@/assets/images/dashboard/truck.png')" class="ml-auto mr-7" width="76px" height="76px"></v-img>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4" class="pr-sm-0">
            <h4 class="social-text text-left">Stay up to date!</h4>
          </v-col>
          <v-col cols="8">
            <v-btn class="follow-btn pa-2 white--text" href="https://www.linkedin.com/company/bidout" target="__blank">Follow us on LinkedIn 
                <v-icon>mdi-chevron-right</v-icon>
            </v-btn> 
          </v-col>
        </v-row>
      </div>
    </div> 
  </div>
</template>

<script>
import VueMoment from 'vue-moment';
import moment from 'moment-timezone';
import _ from 'lodash';
import { mapActions } from "vuex";
export default {
  name : "RightSidebar",
  data() {
    return {
     
    };
  },
  computed:{
    activityPanel(){
        return this.$store.getters.g_activityPanel;
    },
    activities(){
      return _.orderBy(this.$store.getters.activities.slice(0,7),'date','desc');
    },
    loading(){
     return this.$store.getters.pageLoader;
    },
    userDatas(){
        return this.$store.getters.userInfo;
    },
  },
  methods: {
    ...mapActions(["getActivities"]),
    istoday(date) {
      return moment(date).startOf('hour').fromNow();
    },
  },
  async created(){
    await this.getActivities(this.$store.getters.userInfo.id);
  },
  updated(){
    
  },
  mounted() {
    
  }
};
</script>
<style scoped lang="scss">
 
</style>
