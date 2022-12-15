import Base from '@/components/Layout/Base.vue';
import store from '@/store';
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
          if(store.state.auth.userInfo == null) {
              
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
          if(store.state.auth.userInfo == null) {
              
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
          if(store.state.auth.userInfo == null) {
              
              next();
          }else{
            next('/dashboard');
          }
        }
      },
      {
        path: '/company-profiles/:name',
        name: 'CompanyProfiles',
        component: () => import('@/views/Ofs/ViewCompany.vue'),
        beforeEnter: (to, from, next) => {
          if(store.state.auth.userInfo == null) {
              
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
          if(store.state.auth.userInfo == null) {
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
