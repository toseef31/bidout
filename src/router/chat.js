import Base from '@/views/Layout/Base.vue';
import store from '@/store';

const routes = [
  {
    path: '',
    component: Base,
    meta: { requiresAuth: true },
    children: [
      // {
      //   path: '/',
      //   name: 'Home',
      //   component: () => import('@/views/Home.vue'),
      // },
      {
        path: '/messages',
        name: 'Messages',
        component: () => import('@/views/Chat.vue'),
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
