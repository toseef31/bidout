import Base from '@/components/Layout/Base.vue';

const routes = [
  {
    path: '',
    component: Base,
    children: [
      {
        path: '/get-started',
        name: 'GetStarted',
        component: () => import('@/components/GetStarted/GetStarted.vue'),
        beforeEnter: (to, from, next) => {
            if(localStorage.getItem("userData") == null) {
                
                next();
            }else{
              next('/dashboard');
            }
        }
      },
      {
        path: '/get-started/existing-account',
        name: 'ExistingAccount',
        component: () => import('@/components/GetStarted/ExistingAccount.vue'),
        beforeEnter: (to, from, next) => {
            if(localStorage.getItem("userData") == null) {
                
                next();
            }else{
              next('/dashboard');
            }
        }
      },
      {
        path: '/get-started/module-selection',
        name: 'ModuleSelection',
        component: () => import('@/components/GetStarted/ModuleSelection.vue'),
        beforeEnter: (to, from, next) => {
            if(localStorage.getItem("userData") == null) {
                
                next();
            }else{
              next('/dashboard');
            }
        }
      },
      {
        path: '/get-started/contract',
        name: 'Contract',
        component: () => import('@/components/GetStarted/Contract.vue'),
        beforeEnter: (to, from, next) => {
            if(localStorage.getItem("userData") == null) {
                
                next();
            }else{
              next('/dashboard');
            }
        }
      },
      {
        path: '/get-started/payment',
        name: 'Payment',
        component: () => import('@/components/GetStarted/Payment.vue'),
        beforeEnter: (to, from, next) => {
          if(localStorage.getItem("userData") == null) {
              
              next();
          }else{
            next('/dashboard');
          }
        }
      },
      {
        path: '/get-started/confirmation',
        name: 'Confirmation',
        component: () => import('@/components/GetStarted/Confirmation.vue'),
        beforeEnter: (to, from, next) => {
            if(localStorage.getItem("userData") == null) {
                
                next();
            }else{
              next('/dashboard');
            }
        }
      },
      
      { 
        path: "*", 
        component: () => import('@/components/PageNotFound.vue'), 
       
      }
    ],
  },
];


export default routes;
