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
        component: () => import('@/components/Bids/ViewBids.vue'),
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
        component: () => import('@/components/Bids/CreateBid.vue'),
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
        component: () => import('@/components/Bids/Templates.vue'),
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
        component: () => import('@/components/Bids/NotCompleted.vue'),
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
        component: () => import('@/components/Bids/Completed.vue'),
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
      //   component: () => import('@/components/PageNotFound.vue'), 
       
      // }
    ],
  },
];


export default routes;
