import Settings from '@/components/Layout/Settings.vue';
import store from '@/store';
const routes = [
  {
    path: '',
    component: Settings,
    meta: { requiresAuth: true },
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard.vue'),
        beforeEnter: async (to, from, next) => {
          if (store.getters.userInfo == null) {
            store.dispatch('getCurrentUser').then((data) => {
              next();
            }).catch((error) => {
              console.log(error);
              next('/login');
            });
          } else {
            next();
          }
        },
      },
    ],
  },
];

export default routes;
