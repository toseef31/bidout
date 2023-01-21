// import Settings from '@/components/Layout/Base.vue';
import Settings from '@/components/Layout/Settings.vue';
import store from '@/store';

const routes = [
  {
    path: '/setting/',
    component: Settings,
    meta: { requiresAuth: true },
    children: [

      {
        path: '/company-profile',
        name: 'CompanyProfile',
        component: () => import('@/views/CompanyProfile.vue'),
        beforeEnter: (to, from, next) => {
          if (store.getters.userInfo == null) {
            store.dispatch('getCurrentUser').then((data) => {
              next();
            });
          } else if (store.getters.userInfo.company.contracts && store.getters.userInfo.company.contracts.find((contract) => contract.contractType === 'ofs' || contract.contractType === 'ofs-premium')) {
            next();
          } else {
            next('/dashboard');
          }
        },
      },
      {
        path: '/manage-users',
        name: 'ManageUsers',
        component: () => import('@/views/ManageUsers.vue'),
        // meta: { authorize: [store.getters.userInfo.role == 'admin'] }
        beforeEnter: (to, from, next) => {
          if (store.getters.userInfo != null) {
            if (store.getters.userInfo.role == 'user') {
              next('/dashboard');
            } else {
              next();
            }
          } else {
            store.dispatch('getCurrentUser').then((data) => {
              next();
            });
          }
        },
      },
      {
        path: '/manage-users/pending-users',
        name: 'PendingUsers',
        component: () => import('@/views/PendingUsers.vue'),
        beforeEnter: (to, from, next) => {
          if (store.getters.userInfo == null) {
            store.dispatch('getCurrentUser').then((data) => {
              next();
            });
          } else {
            next();
          }
        },
      },
      {
        path: '/manage-users/disabled-users',
        name: 'DisabledUsers',
        component: () => import('@/views/DisabledUsers.vue'),
        beforeEnter: (to, from, next) => {
          if (store.getters.userInfo == null) {
            store.dispatch('getCurrentUser').then((data) => {
              next();
            });
          } else {
            next();
          }
        },
      },
      {
        path: '/manage-users/add-users',
        name: 'AddUsers',
        component: () => import('@/views/AddUsers.vue'),
        beforeEnter: (to, from, next) => {
          if (store.getters.userInfo == null) {
            store.dispatch('getCurrentUser').then((data) => {
              next();
            });
          } else {
            next();
          }
        },
      },
      {
        path: '/manage-users/edit-user/',
        name: 'EditUser',
        component: () => import('@/views/EditUser.vue'),
        beforeEnter: (to, from, next) => {
          if (store.getters.userInfo == null) {
            store.dispatch('getCurrentUser').then((data) => {
              next();
            });
          } else {
            next();
          }
        },
      },
      {
        path: '/manage-module',
        name: 'ManageModules',
        component: () => import('@/views/ManageModule.vue'),
        beforeEnter: (to, from, next) => {
          if (store.getters.userInfo == null) {
            store.dispatch('getCurrentUser').then((data) => {
              next();
            });
          } else {
            next();
          }
        },
      },
      {
        path: '/manage-templates',
        name: 'ManageTemplates',
        component: () => import('@/views/ManageTemplates.vue'),
        beforeEnter: (to, from, next) => {
          if (store.getters.userInfo == null) {
            store.dispatch('getCurrentUser').then((data) => {
              next();
            });
          } else {
            next();
          }
        },
      },

    ],
  },
];

export default routes;
