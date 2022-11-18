import Vue from 'vue';
import App from './App.vue';
import router from './router';
import Vuex from "vuex";
import LogRocket from 'logrocket';
import createPlugin from 'logrocket-vuex';
import store from './store';
import * as Sentry from '@sentry/vue';
import { BrowserTracing } from "@sentry/tracing";
import vuetify from './plugins/vuetify';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import axios from 'axios';
import vueCountryRegionSelect from 'vue-country-region-select';
import VueMoment from 'vue-moment';
import moment from 'moment-timezone';
// import momentTimeZone from 'vue-moment-tz';
import VueSignaturePad from 'vue-signature-pad';
import '@/assets/styles/index.scss';
import VueCroppie from 'vue-croppie';
import 'croppie/croppie.css';
import VueGtag from "vue-gtag";
import VueMeta from 'vue-meta';
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGE_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.headers.common['Authorization'] = `Bearer ${store.getters.userToken}`;
LogRocket.init('voayxx/v2-ib4bb');
const logrocketPlugin = createPlugin(LogRocket);

Vue.use(vueCountryRegionSelect);
Vue.use(Vuex,axios);
// Vue.use(moment);
Vue.use(VueMoment, {
    moment,
});
Vue.use(VueMeta, {
  keyName: 'metaInfo',
  attribute: 'data-vue-meta',
  ssrAttribute: 'data-vue-meta-server-rendered',
  tagIDKeyName: 'vmid',
  refreshOnceOnNavigation: true
});
// Vue.use(momentTimeZone);
Vue.use(VueSignaturePad);
Vue.use(VueCroppie);
Sentry.init({
  Vue: Vue,
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [
    new BrowserTracing({
      routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      tracingOrigins: ["localhost", "http://localhost:8080/", /^\//],
    }),
  ],
  
})


LogRocket.getSessionURL(sessionURL => {
  Sentry.configureScope(scope => {
    scope.setExtra("sessionURL", sessionURL);
  });
});

Vue.use(VueGtag, {
  config: { id: import.meta.env.VITE_GOOGLE_TAG_MANAGER }
});

var userData = store.getters.userInfo;
if(userData){
  LogRocket.identify(userData.id, {
    name: userData.firstName+' '+userData.lastName,
    email: userData.email,

    // Add your own custom user variables here, ie:
    subscriptionType: 'pro'
  });
}

new Vue({
  vuetify,
  router,
  store ,
  render: (h) => h(App),
}).$mount('#app');