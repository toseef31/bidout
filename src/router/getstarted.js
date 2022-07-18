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
        path: '/existing-account',
        name: 'ExistingAccount',
        component: () => import('@/views/GetStarted/ExistingAccount.vue'),
      },
      {
        path: '/module-selection',
        name: 'ModuleSelection',
        component: () => import('@/views/GetStarted/ModuleSelection.vue'),
      },
      {
        path: '/contract',
        name: 'Contract',
        component: () => import('@/views/GetStarted/Contract.vue'),
      },
      {
        path: '/payment',
        name: 'payment',
        component: () => import('@/views/GetStarted/Payment.vue'),
      },
      {
        path: '/404',
        name: '404',
        component: () => import('@/views/404.vue'),
      },
    ],
  },
];


export default routes;
