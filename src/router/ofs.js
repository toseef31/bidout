import Base from '@/components/Layout/Base.vue';
import router from '@/router'
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
          if(store.getters.userInfo == null) {
            store.dispatch('getCurrentUser').then((data) => {
              next('/dashboard');
            }).catch((error) => {
              console.log(error);
              next();
            });
          }else{
            next();
            
          }
          
        }
      },
      {
        path: '/ofs-directory/:slug',
        name: 'CategoryName',
        component: () => import('@/views/Ofs/CategoryListing.vue'),
        beforeEnter: (to, from, next) => {
          if(store.getters.userInfo == null) {
              next();
          }else{
            store.dispatch('getCurrentUser').then((data) => {
              next('/dashboard');
            }).catch((error) => {
              console.log(error);
              next();
            });
          }
        }
      },
      {
        path: '/ofs-directory/:slug/:name',
        name: 'CategoryListing',
        component: () => import('@/views/Ofs/CategoryListing.vue'),
        beforeEnter: (to, from, next) => {
          if(store.getters.userInfo == null) {
              
              next();
          }else{
            store.dispatch('getCurrentUser').then((data) => {
              next('/dashboard');
            }).catch((error) => {
              console.log(error);
              next();
            });
          }
        }
      },
      {
        path: '/company-profiles/:name',
        name: 'CompanyProfiles',
        component: () => import('@/views/Ofs/ViewCompany.vue'),
        beforeEnter: (to, from, next) => {
          if(store.getters.userInfo == null) {
              
              next();
          }else{
            store.dispatch('getCurrentUser').then((data) => {
              next('/dashboard');
            }).catch((error) => {
              console.log(error);
              next();
            });
          }
        }
      },
      {
        path: '/subcompany-profile',
        name: 'SubCompanyProfile',
        component: () => import('@/views/Ofs/SubCompany.vue'),
        beforeEnter: (to, from, next) => {
          if(store.getters.userInfo == null) {
            next();
          }else{
            store.dispatch('getCurrentUser').then((data) => {
              next('/dashboard');
            }).catch((error) => {
              console.log(error);
              next();
            });
          }
        }
      },
    ],
  },
];


export default routes;
