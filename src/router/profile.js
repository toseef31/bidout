// import Settings from '@/views/Layout/Base.vue';
import Settings from '@/views/Layout/Settings.vue';
import store from '@/store';

const routes = [
  {
    path: '/seeting/',
    component: Settings,
    meta: { requiresAuth: true },
    children: [
      
      {
        path: '/company-profile',
        name: 'CompanyProfile',
        component: () => import('@/views/CompanyProfile.vue'),
        beforeEnter: (to, from, next) => {
           if(localStorage.getItem("userData") == null) {
               next('/login');
           } else {
               next();
           }
       }
      },
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
        path: '/disabled-users',
        name: 'DisabledUsers',
        component: () => import('@/views/DisabledUsers.vue'),
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
      {
        path: '/edit-user/',
        name: 'EditUser',
        component: () => import('@/views/EditUser.vue'),
        beforeEnter: (to, from, next) => {
           if(localStorage.getItem("userData") == null) {
               next('/login');
           } else {
               next();
           }
       }
      },
      {
        path: '/manage-module',
        name: 'ManageModules',
        component: () => import('@/views/ManageModule.vue'),
        beforeEnter: (to, from, next) => {
           if(localStorage.getItem("userData") == null) {
               next('/login');
           } else {
               next();
           }
       }
      },
      {
        path: '/manage-templates',
        name: 'ManageTemplates',
        component: () => import('@/views/ManageTemplates.vue'),
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
