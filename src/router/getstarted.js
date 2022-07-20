import Base from '@/views/Layout/Base.vue';

const routes = [
  {
    path: '',
    component: Base,
    children: [
      {
        path: '/get-started',
        name: 'GetStarted',
        component: () => import('@/views/GetStarted/GetStarted.vue'),
      },
      {
        path: '/get-started/existing-account',
        name: 'ExistingAccount',
        component: () => import('@/views/GetStarted/ExistingAccount.vue'),
      },
      {
        path: '/get-started/module-selection',
        name: 'ModuleSelection',
        component: () => import('@/views/GetStarted/ModuleSelection.vue'),
      },
      {
        path: '/get-started/contract',
        name: 'Contract',
        component: () => import('@/views/GetStarted/Contract.vue'),
      },
      {
        path: '/get-started/payment',
        name: 'payment',
        component: () => import('@/views/GetStarted/Payment.vue'),
      },
      
      { path: "*", 
        component: () => import('@/views/PageNotFound.vue'), 
      }
    ],
  },
];


export default routes;
