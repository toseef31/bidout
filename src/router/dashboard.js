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
        component: () => import('@/components/Dashboard.vue'),
        beforeEnter: (to, from, next) => {
           if(localStorage.getItem("userData") == null) {
               next('/login');
           } else {
               next();
           }
       }
      },
      // { 
      //   path: "*", 
      //   component: () => import('@/components/PageNotFoundLogin.vue'),
         
      // }
    ],
  },
];


export default routes;
