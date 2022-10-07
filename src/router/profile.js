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
        component: () => import('@/components/CompanyProfile.vue'),
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
        component: () => import('@/components/ManageUsers.vue'),
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
        component: () => import('@/components/PendingUsers.vue'),
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
        component: () => import('@/components/DisabledUsers.vue'),
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
        component: () => import('@/components/AddUsers.vue'),
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
        component: () => import('@/components/EditUser.vue'),
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
        component: () => import('@/components/ManageModule.vue'),
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
        component: () => import('@/components/ManageTemplates.vue'),
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
