import Base from '@/views/Layout/Base.vue';
import store from '@/store';

const routes = [
  {
    path: '',
    component: Base,
    meta: { requiresAuth: true },
    children: [
      {
        path: '/manage-users',
        name: 'ManageUsers',
        component: () => import('@/views/ManageUsers.vue'),
        beforeEnter: (to, from, next) => {
           if(localStorage.getItem("userData") == null) {
               next('/login');
           } else {
               next();
           }
       }
      },
      {
        path: '/add-users',
        name: 'AddUsers',
        component: () => import('@/views/AddUsers.vue'),
        beforeEnter: (to, from, next) => {
           if(localStorage.getItem("userData") == null) {
               next('/login');
           } else {
               next();
           }
       }
      },
    ],
  },
];


export default routes;
