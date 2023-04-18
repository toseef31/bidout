import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import * as Sentry from '@sentry/vue';

const actions = {
  // Toggle Side Menu
  toggleSideMenu({ commit }){
    commit('toggleSideBar')
  },
  // Toggle Activity Panel
  activityPanel({ commit }){
    commit('toggleActivityPanel')
  },
  
  getToken({commit}){
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        user.getIdToken(/* forceRefresh */ true)
        .then(idToken => {
          commit('setToken',idToken);
          localStorage.setItem("token",JSON.stringify(idToken));
        }).catch(function(error) {
           // Handle error
           Sentry.captureException(error);
        });
      }
    });
  },

  async refreshToken({commit,dispatch}){
    const user = firebase.auth().currentUser;
    if(user){
      return new Promise(async (resolve, reject) => {
        try{
          const token =  await user.getIdToken(true);
          commit('setToken',token);
          localStorage.setItem("token",JSON.stringify(token));
          window.location.reload();
          resolve(token);
        } catch(error) {
            Sentry.captureException(error);
            dispatch('signOutAction')
            reject(error)
        }
      })
          
    }
    
  },
}

export default actions
