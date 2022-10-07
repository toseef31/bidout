// import Base from '@/components/Layout/Base.vue';
import Settings from '@/components/Layout/Settings.vue';
import store from '@/store';

const routes = [
  {
    path: '',
    component: Settings,
    meta: { requiresAuth: true },
    children: [
      {
        path: '/view-ofs-suppliers',
        name: 'ViewOfsSupplier',
        component: () => import('@/components/Ofs/ViewOFsSupplier.vue'),
        beforeEnter: (to, from, next) => {
           if(localStorage.getItem("userData") == null) {
               next('/login');
           } else {
               next();
           }
       }
      },
      {
        path: '/ofs-supplier/:slug/:name',
        name: 'SupplierListing',
        component: () => import('@/components/Ofs/SupplierListing.vue'),
         beforeEnter: (to, from, next) => {
            if(localStorage.getItem("userData") == null) {
                next('/login');
            } else {
                next();
            }
        }
      },
      {
        path: '/ofs-supplier/:slug',
        name: 'SupplierName',
        component: () => import('@/components/Ofs/SupplierListing.vue'),
         beforeEnter: (to, from, next) => {
            if(localStorage.getItem("userData") == null) {
                next('/login');
            } else {
                next();
            }
        }
      },
      {
        path: '/edit-profile',
        name: 'EditProfile',
        component: () => import('@/components/EditProfile.vue'),
        beforeEnter: (to, from, next) => {
           if(localStorage.getItem("userData") == null) {
               next('/login');
           } else {
               next();
           }
       }
      },
      {
        path: '/company/:name',
        name: 'Company',
        component: () => import('@/components/Ofs/Company.vue'),
        beforeEnter: (to, from, next) => {
           if(localStorage.getItem("userData") == null) {
               next('/login');
           } else {
               next();
           }
       }
      },
      // { 
      //   path: "*", 
      //   component: () => import('@/components/PageNotFoundLogin.vue'),
         
      // }
    ],
  },
];


export default routes;
