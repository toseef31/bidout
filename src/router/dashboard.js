import Base from '@/views/Layout/Base.vue';


const routes = [
  {
    path: '',
    component: Base,
    meta: { requiresAuth: true },
    children: [
      // {
      //   path: '/',
      //   name: 'Home',
      //   component: () => import('@/views/Home.vue'),
      // },
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard.vue'),
      },
    ],
  },
];


export default routes;
