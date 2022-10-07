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
        component: () => import('@/components/Chat.vue'),
        beforeEnter: (to, from, next) => {
           if(localStorage.getItem("userData") == null) {
               next('/login');
           } else {
               next();
           }
       }
      },
      // {
      //   path: '/messages?room_id=:id',
      //   name: 'Message',
      //   component: () => import('@/components/Chat.vue'),
      //   beforeEnter: (to, from, next) => {
      //      if(localStorage.getItem("userData") == null) {
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
