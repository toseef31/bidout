import Base from '@/views/Layout/Base.vue';
const routes = [
  {
    path: '',
    component: Base,
    children: [
      {
        path: '/',
        name: 'OFSHome',
        component: () => import('@/views/Ofs/OFSHome.vue'),
      },
      {
        path: '/category-listing',
        name: 'CategoryListing',
        component: () => import('@/views/Ofs/CategoryListing.vue'),
      },
    ],
  },
];


export default routes;
