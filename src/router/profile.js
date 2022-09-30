// import Settings from '@/views/Layout/Base.vue';
import Settings from '@/views/Layout/Settings.vue';
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
         // meta: { authorize: [localStorage.getItem("userData").role == 'admin'] }
        beforeEnter: (to, from, next) => {
           if(localStorage.getItem("userData") != null) {
               if(localStorage.getItem("userData").role == 'user'){
                    next('/dashboard');
                }else{
                    next();
                }
           } else {
               next('/login');
           }
       }
      },
      {
        path: '/manage-users/pending-users',
        name: 'PendingUsers',
        component: () => import('@/views/PendingUsers.vue'),
        beforeEnter: (to, from, next) => {
           if(localStorage.getItem("userData") == null) {
               next('/login');
           } else {
               next();
           }
       }
      },
      {
        path: '/manage-users/disabled-users',
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
        path: '/manage-users/add-users',
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
        path: '/manage-users/edit-user/',
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
