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
import '@/assets/styles/index.scss';
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

LogRocket.init('voayxx/v2-ib4bb');
const logrocketPlugin = createPlugin(LogRocket);

Vue.use(vueCountryRegionSelect);
Vue.use(Vuex,axios);

Sentry.init({
  Vue: Vue,
  dsn: "https://d0c77b4dc8a44c08aef179eee86f1635@o1327357.ingest.sentry.io/6601536",
  integrations: [
    new BrowserTracing({
      routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      tracingOrigins: ["localhost", "http://localhost:8080/", /^\//],
    }),
  ],
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  // tracesSampleRate: 1.0,
})

LogRocket.getSessionURL(sessionURL => {
  Sentry.configureScope(scope => {
    scope.setExtra("sessionURL", sessionURL);
  });
});
LogRocket.identify('KwWt77ohqDTWHm9Ad9aQnyxTEQy1', {
  name: 'abdulazizyesuf',
  email: 'abdulazizyesuf7+sp12@gmail.com',

  // Add your own custom user variables here, ie:
  subscriptionType: 'pro'
});

new Vue({
  vuetify,
  router,
  store ,
  render: (h) => h(App),
}).$mount('#app');