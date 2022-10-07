import Base from '@/components/Layout/Base.vue';
const routes = [
  {
    path: '',
    component: Base,
    children: [
      {
        path: '/',
        name: 'OFSHome',
        component: () => import('@/components/Ofs/OFSHome.vue'),
        beforeEnter: (to, from, next) => {
          if(localStorage.getItem("userData") == null) {
              
              next();
          }else{
            next('/dashboard');
          }
        }
      },
      {
        path: '/ofs-directory/:slug',
        name: 'CategoryName',
        component: () => import('@/components/Ofs/CategoryListing.vue'),
        beforeEnter: (to, from, next) => {
          if(localStorage.getItem("userData") == null) {
              
              next();
          }else{
            next('/dashboard');
          }
        }
      },
      {
        path: '/ofs-directory/:slug/:name',
        name: 'CategoryListing',
        component: () => import('@/components/Ofs/CategoryListing.vue'),
        beforeEnter: (to, from, next) => {
          if(localStorage.getItem("userData") == null) {
              
              next();
          }else{
            next('/dashboard');
          }
        }
      },
      {
        path: '/company-profiles/:name',
        name: 'CompanyProfiles',
        component: () => import('@/components/Ofs/ViewCompany.vue'),
        beforeEnter: (to, from, next) => {
          if(localStorage.getItem("userData") == null) {
              
              next();
          }else{
            next('/dashboard');
          }
        }
      },
      {
        path: '/subcompany-profile',
        name: 'SubCompanyProfile',
        component: () => import('@/components/Ofs/SubCompany.vue'),
        beforeEnter: (to, from, next) => {
          if(localStorage.getItem("userData") == null) {
            next();
          }else{
            next('/dashboard');
          }
        }
      },
    ],
  },
];


export default routes;
