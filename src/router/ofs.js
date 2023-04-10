import Base from '@/components/Layout/Base.vue';
// eslint-disable-next-line import/no-cycle
import store from '@/store';

const routes = [
  {
    path: '',
    component: Base,
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Login.vue'),
        beforeEnter: (to, from, next) => {
          if (store.getters.userInfo == null) {
            store.dispatch('getCurrentUser').then((data) => {
              next();
            }).catch((error) => {
              console.log(error);
              next('/login');
            });
          }
        },
      },
    ],
  },
];

export default routes;
