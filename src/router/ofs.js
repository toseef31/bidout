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
        component: () => import('@/views/Ofs/CategoryListing.vue'),
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
        component: () => import('@/views/Ofs/CategoryListing.vue'),
        beforeEnter: (to, from, next) => {
          if(localStorage.getItem("userData") == null) {
              
              next();
          }else{
            next('/dashboard');
          }
        }
      },
      {
        path: '/company-profiles',
        name: 'CompanyProfiles',
        component: () => import('@/views/Ofs/CompanyProfile.vue'),
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
        component: () => import('@/views/Ofs/SubCompany.vue'),
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
