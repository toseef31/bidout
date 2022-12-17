import Base from '@/components/Layout/Base.vue';
import store from '@/store';
const routes = [
  {
    path: '',
    component: Base,
    children: [
      {
        path: '/get-started',
        name: 'GetStarted',
        component: () => import('@/views/GetStarted/GetStarted.vue'),
        beforeEnter: (to, from, next) => {
            if(store.getters.userInfo == null) {
                
                next();
            }else{
              next('/dashboard');
            }
        }
      },
      {
        path: '/get-started/existing-account',
        name: 'ExistingAccount',
        component: () => import('@/views/GetStarted/ExistingAccount.vue'),
        beforeEnter: (to, from, next) => {
            if(store.getters.userInfo == null) {
                
                next();
            }else{
              next('/dashboard');
            }
        }
      },
      {
        path: '/get-started/module-selection',
        name: 'ModuleSelection',
        component: () => import('@/views/GetStarted/ModuleSelection.vue'),
        beforeEnter: (to, from, next) => {
            if(store.getters.userInfo == null) {
                
                next();
            }else{
              next('/dashboard');
            }
        }
      },
      {
        path: '/get-started/contract',
        name: 'Contract',
        component: () => import('@/views/GetStarted/Contract.vue'),
        beforeEnter: (to, from, next) => {
            if(store.getters.userInfo == null) {
                
                next();
            }else{
              next('/dashboard');
            }
        }
      },
      {
        path: '/get-started/payment',
        name: 'Payment',
        component: () => import('@/views/GetStarted/Payment.vue'),
        beforeEnter: (to, from, next) => {
          if(store.getters.userInfo == null) {
              
              next();
          }else{
            next('/dashboard');
          }
        }
      },
      {
        path: '/get-started/confirmation',
        name: 'Confirmation',
        component: () => import('@/views/GetStarted/Confirmation.vue'),
        beforeEnter: (to, from, next) => {
            if(store.getters.userInfo == null) {
                
                next();
            }else{
              next('/dashboard');
            }
        }
      },
      
      { 
        path: "*", 
        component: () => import('@/views/PageNotFound.vue'), 
       
      }
    ],
  },
];


export default routes;
