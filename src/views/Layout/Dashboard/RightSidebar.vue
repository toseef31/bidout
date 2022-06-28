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
  .activity-section{
    border: 1px solid #B8B8B8;
    border-radius: 8px;
    background-color: #fff;
    .title{
      flex-direction: row;
      align-items: center;
      padding: 16px 16px;
      border-bottom: 1px solid #F2F2F2;
      h3{
        font-size: 20px;
        line-height: 25px;
        color: #0D9648;
      }
    } 
    .v-list{
      padding: 0 0;
      .notification-icon{
        background-color: #F2F2F2;
        color: lightgrey;
        font-size: 19px;
        padding: 0 0;
      } 
      .v-list-item__title{
        font-size: 12px;
        line-height: 15px;
        display: flex;
        align-items: center;
        color: #000000;
      }
      .v-list-item--link:before{
        background-color: transparent;
      }
      .v-list-item--link:first-child:before{
        width: 5px;
        height: 5px;
        background-color: #0d9648;
        opacity: 1;
        border-radius: 50%;
        left: 5px;
        top: 23px;   
      }
    }  
    .view-all{
      border-top: 1px solid rgba(0, 0, 0, 0.12);
      a{
        font-size: 12px;
        font-weight: 600;
      }
    }
  }
  .social-section{
    background: rgba(53, 120, 177, 0.1);
    border-radius: 8px;
    height: 106px;
    .social-text{
      font-weight: 800;
      font-size: 19px;
      line-height: 24px;
      color: #0D1139;
    }
    .follow-btn{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      background: #0D1139;
      border-radius: 4px;
      text-transform: none;
      font-weight: 700;
      font-size: 12px;
      line-height: 20px;
      color: #fff;
      width: 100%;
    }
  }
  @media(max-width: 768px){
    .desktop-section{
      display: none;
    }
    .activity-section{
      border-radius: 0;
      border: 0;
    }
    .social-section{
      height: auto;
      margin: 0 0px 0 10px;
      .row{
        margin: 0 0;
        .social-text{
          font-weight: 800;
          font-size: 24px;
          line-height: 26px
        }
        .follow-btn{
          font-size: 14px;
          height: 44px;
        }
        .mobile-social{
          border-bottom: 1px solid #8d8d8d;
        }
      }
      .row:first-child{
        border-bottom: 1px solid #919191;
      }
    }
  }
</style>
