<template>
  <div>
    <div class="activity-section" :class="[ activityPanel ? '' : 'desktop-section']">
      <div class="title">
        <h3 class="font-weight-bold text-left">Activity</h3>
      </div>
      <v-list>
        <v-list-item-group
          v-model="selected"
          active-class="success--text"
          multiple
        >
          <template v-for="(item, index) in items">
            <v-list-item :key="item.title">
              <template v-slot:default="{ active }">
                
                <v-list-item-avatar class="my-1">
                  <v-icon
                    class="notification-icon"
                    v-text="item.icon"
                  >
                  </v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title v-text="item.title"></v-list-item-title>

                </v-list-item-content>

                <v-list-item-action >
                  <v-list-item-action-text v-text="item.action"></v-list-item-action-text>
                </v-list-item-action>
              </template>
            </v-list-item>

            <v-divider
              v-if="index < items.length - 1"
              :key="index"
            ></v-divider>
          </template>
        </v-list-item-group>
      </v-list>
      <div class="pa-3 view-all"> 
          <a href="">View all </a>     
      </div> 
    </div>    
    <div class="social-section pa-2 mt-3" :class="[ activityPanel ? 'd-none d-md-block' : 'd-block']">
      <v-row class="align-center d-none d-sm-flex">
        <v-col cols="6" md="4" class="pr-sm-0">
          <v-img :src="require('@/assets/images/dashboard/linkedin.png')" class="mb-2" width="90px" height="23px"></v-img>
          <h4 class="social-text text-left">Stay up to date!</h4>
        </v-col>
        <v-col cols="12" md="8">
          <v-btn class="follow-btn pa-2">Follow us on LinkedIn 
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
            <v-btn class="follow-btn pa-2">Follow us on LinkedIn 
                <v-icon>mdi-chevron-right</v-icon>
            </v-btn> 
          </v-col>
        </v-row>
      </div>
    </div> 
  </div>
</template>

<script>
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
export default {
  name : "RightSidebar",
  data() {
    return {
     selected: [2],
       items: [
         {
           action: '12min',
           title: 'Laura sent you new messages.',
           icon: 'mdi-email-outline'
         },
         {
           action: '32min',
           title: 'Aubrey sent you a new message.',
           icon: 'mdi-email-outline'
         },
         {
           action: '1hr',
           title: 'Laura sent you new messages.',
           icon: 'mdi-email-outline'
         },
         {
           action: '1d',
           title: 'Your bid Water Job was created.',
           icon: 'mdi-check'
         },
         {
           action: '1d',
           title: 'Your bid Water Job was created.',
           icon: 'mdi-check'
         },
         {
           action: '1d',
           title: 'Peter sent you new messages.',
           icon: 'mdi-email-outline'
         },
         {
           action: '1d',
           title: 'Your bid Water Job was created.',
           icon: 'mdi-check'
         },
         {
           action: '1d',
           title: 'Your bid Water Job was created.',
           icon: 'mdi-check'
         },
         {
           action: '1d',
           title: 'Your bid Water Job was created.',
           icon: 'mdi-check'
         },
         {
           action: '1d',
           title: 'Your bid Water Job was created.',
           icon: 'mdi-check'
         },
         {
           action: '1d',
           title: 'Your bid Water Job was created.',
           icon: 'mdi-check'
         },
         {
           action: '1d',
           title: 'Your bid Water Job was created.',
           icon: 'mdi-check'
         },
         {
           action: '1d',
           title: 'Peter sent you new messages.',
           icon: 'mdi-email-outline'
         },
       ],
    };
  },
  computed:{
    activityPanel(){
        return this.$store.getters.g_activityPanel;
    }
  },
  methods: {
    
  },
};
</script>
<style scoped lang="scss">
  @import '@/assets/styles/rightsidebar.scss';
</style>
