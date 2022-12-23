// import Base from '@/components/Layout/Base.vue';
import Settings from '@/components/Layout/Settings.vue';
import store from '@/store';

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
          if (store.getters.userInfo == null) {
            next('/login');
          } else {
            next();
          }
        },
      },
      {
        path: '/view-bids/:serial',
        name: 'BidDetail',
        component: () => import('@/views/Bid/BidDetail.vue'),
        beforeEnter: (to, from, next) => {
          if (store.getters.userInfo == null) {
            next('/login');
          } else {
            next();
          }
        },
      },
      {
        path: '/create',
        name: 'CreateBid',
        component: () => import('@/views/Bid/CreateBid.vue'),
        beforeEnter: (to, from, next) => {
          if (store.getters.userInfo == null) {
            next('/login');
          } else {
            next();
          }
        },
      },
      {
        path: '/templates',
        name: 'Templates',
        component: () => import('@/views/Bid/Templates.vue'),
        beforeEnter: (to, from, next) => {
          if (store.getters.userInfo == null) {
            next('/login');
          } else {
            next();
          }
        },
      },
      {
        path: '/create-bid',
        name: 'NotCompleted',
        component: () => import('@/views/Bid/NotCompleted.vue'),
        beforeEnter: (to, from, next) => {
          if (store.getters.userInfo == null) {
            next('/login');
          } else {
            next();
          }
        },
      },

      {
        path: "/create-template/",
        name: "EditTemplate",
        component: () => import("@/views/Bid/EditTemplate.vue"),
        beforeEnter: (to, from, next) => {
          if (store.getters.userInfo == null) {
            next("/login");
          } else {
            next();
          }
        },
      },
      {
        path: "/edit-bid/:serial",
        name: "EditBid",
        component: () => import("@/views/Bid/EditBid.vue"),
        props: true,
        beforeEnter: (to, from, next) => {
          if (store.getters.userInfo == null) {
            next("/login");
          } else {
            next();
          }
        },
      },
      {
        path: "/completed",
        name: "Completed",
        component: () => import("@/views/Bid/Completed.vue"),
        beforeEnter: (to, from, next) => {
          if (store.getters.userInfo == null) {
            next('/login');
          } else {
            next();
          }
        },
      },

      // {
      //   path: "*",
      //   component: () => import('@/views/PageNotFound.vue'),

      // }
    ],
  },
];

export default routes;
