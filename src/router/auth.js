import Base from '@/components/Layout/Base.vue';
import store from '@/store';

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
        beforeEnter: (to, from, next) => {
          if (store.getters.userInfo == null) {
            store.dispatch('getCurrentUser').then((data) => {
              console.log('data', data, 'next', next());
              next('/dashboard');
            }).catch((error) => {
              console.log(error);
              next();
            });
          }
        },
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
