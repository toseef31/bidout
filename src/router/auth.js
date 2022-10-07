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
        component: () => import('@/components/Login.vue'),
      },
      {
        path: '/forgot-password',
        name: 'ForgotPassword',
        component: () => import('@/components/ForgotPassword.vue'),
      },
      {
        path: '/reset-password/:token',
        name: 'ResetPassword',
        component: () => import('@/components/ResetPassword.vue'),
      },
      {
        path: '/invitation/:token',
        name: 'Invitation',
        component: () => import('@/components/Invitation.vue'),
      },
    ],
  },
];


export default routes;
