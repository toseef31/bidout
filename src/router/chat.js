// import Base from '@/components/Layout/Base.vue';
import Settings from '@/components/Layout/Settings.vue';
import store from '@/store';

const routes = [
  {
    path: '',
    component: Settings,
    meta: { requiresAuth: true },
    children: [
      {
        path: '/messages',
        name: 'Messages',
        component: () => import('@/views/Chat.vue'),
        beforeEnter: (to, from, next) => {
           if(store.getters.userInfo == null) {
              store.dispatch('getCurrentUser').then((data) => {
                next();
              });
           } else {
               next();
           }
       }
      },
      // {
      //   path: '/messages?room_id=:id',
      //   name: 'Message',
      //   component: () => import('@/views/Chat.vue'),
      //   beforeEnter: (to, from, next) => {
      //      if(this.$store.getters.userInfo == null) {
      //          next('/login');
      //      } else {
      //          next();
      //      }
      //  }
      // },
      
    ],
  },
];


export default routes;
