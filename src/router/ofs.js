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
        path: '/ofs-directory/:slug',
        name: 'CategoryListing',
        component: () => import('@/views/Ofs/CategoryListing.vue'),
      },
      {
        path: '/company-profile',
        name: 'CompanyProfile',
        component: () => import('@/views/Ofs/CompanyProfile.vue'),
      },
      {
        path: '/subcompany-profile',
        name: 'SubCompanyProfile',
        component: () => import('@/views/Ofs/SubCompany.vue'),
      },
    ],
  },
];


export default routes;
