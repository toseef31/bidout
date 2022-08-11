import Base from '@/views/Layout/Base.vue';

const routes = [
  {
    path: '',
    component: Base,
    children: [
      {
        path: '/create-bid',
        name: 'CreateBid',
        component: () => import('@/views/Bids/CreateBid.vue'),
        beforeEnter: (to, from, next) => {
          if(localStorage.getItem("userData") == null) {
              next('/login');
          } else {
              next();
          }
        }
      },
      {
        path: '/templates',
        name: 'Templates',
        component: () => import('@/views/Bids/Templates.vue'),
        beforeEnter: (to, from, next) => {
          if(localStorage.getItem("userData") == null) {
              next('/login');
          } else {
              next();
          }
        }
      },
      {
        path: '/not-completed',
        name: 'NotCompleted',
        component: () => import('@/views/Bids/NotCompleted.vue'),
        beforeEnter: (to, from, next) => {
          if(localStorage.getItem("userData") == null) {
              next('/login');
          } else {
              next();
          }
        }
      },
      {
        path: '/completed',
        name: 'Completed',
        component: () => import('@/views/Bids/Completed.vue'),
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
      //   component: () => import('@/views/PageNotFound.vue'), 
       
      // }
    ],
  },
];


export default routes;
