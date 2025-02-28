import Base from '@/components/Layout/Base.vue';

const routes = [
  {
    path: '',
    component: Base,
    meta: { requiresAuth: true },
    children: [
      {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login.vue'),
      },
      {
        path: '/forgot-password',
        name: 'ForgotPassword',
        component: () => import('@/views/ForgotPassword.vue'),
      },
      {
        path: '/reset-password/:token',
        name: 'ResetPassword',
        component: () => import('@/views/ResetPassword.vue'),
      },
      {
        path: '/invitation/:token',
        name: 'Invitation',
        component: () => import('@/views/Invitation.vue'),
      },
      {
        path: '/impersonate',
        name: 'Impersonate',
        component: () => import('@/views/Impersonate.vue'),
      },
    ],
  },
];


export default routes;
