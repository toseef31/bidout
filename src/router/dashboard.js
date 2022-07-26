import Base from '@/views/Layout/Base.vue';
import store from '@/store';

const routes = [
  {
    path: '',
    component: Base,
    meta: { requiresAuth: true },
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard.vue'),
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
      //   component: () => import('@/views/PageNotFoundLogin.vue'),
         
      // }
    ],
  },
];


export default routes;
