import Vue from 'vue';
import VueRouter from 'vue-router';
import Base from '@/views/Layout/Base.vue';
import AuthRoutes from '@/router/auth'
import Dashboard from '@/router/dashboard'
import Chat from '@/router/chat'
import Profile from '@/router/profile'
import store from '@/store';

Vue.use(VueRouter);

var allRoutes = []
allRoutes = allRoutes.concat(AuthRoutes, Dashboard, Chat, Profile)

const routes = allRoutes

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.Base,
  routes,
});

export default router;
