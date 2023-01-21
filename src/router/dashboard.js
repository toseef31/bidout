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
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard.vue'),
        beforeEnter: async (to, from, next)=> {
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
      //   path: "*", 
      //   component: () => import('@/views/PageNotFoundLogin.vue'),
         
      // }
    ],
  },
];


export default routes;
