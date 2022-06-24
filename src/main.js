import Vue from 'vue';
import App from './App.vue';
import router from './router';
// import store from './store';
import Vuex from "vuex"
import vuetify from './plugins/vuetify';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import axios from 'axios';

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

Vue.use(Vuex,axios);

const stores = new Vuex.Store(
    {
        state: {
            authenticated: false
        },
        mutations: {
            setAuthentication(state, status) {
                state.authenticated = status;
            }
        }
    }
);

new Vue({
  vuetify,
  router,
  store : stores,
  render: (h) => h(App),
}).$mount('#app');
