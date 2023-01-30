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
      
      
    ],
  },
];


export default routes;
