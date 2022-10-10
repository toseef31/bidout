// import Base from '@/components/Layout/Base.vue';
import Settings from '@/components/Layout/Settings.vue';

const routes = [
  {
    path: '',
    component: Settings,
    children: [
      {
        path: '/view-bids',
        name: 'ViewBids',
        component: () => import('@/views/Bid/ViewBids.vue'),
        beforeEnter: (to, from, next) => {
          if(localStorage.getItem("userData") == null) {
              next('/login');
          } else {
              next();
          }
        }
      },
      {
        path: '/create-bid',
        name: 'CreateBid',
        component: () => import('@/views/Bid/CreateBid.vue'),
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
        component: () => import('@/views/Bid/Templates.vue'),
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
        component: () => import('@/views/Bid/NotCompleted.vue'),
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
        component: () => import('@/views/Bid/Completed.vue'),
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
