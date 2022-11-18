import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

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
      user.getIdToken(/* forceRefresh */ true)
        .then(idToken => {
          commit('setToken',idToken);
          localStorage.setItem("token",JSON.stringify(idToken));
        }).catch(function(error) {
           // Handle error
        });
    });
  },
  refreshToken({commit,dispatch}){
    const user = firebase.auth().currentUser;
    if(user){
     user.getIdToken(true)
      .then(idToken => {
        console.log(idToken,'tokenn');
        commit('setToken',idToken);
        localStorage.setItem("token",JSON.stringify(idToken));
      }).catch(function(error) {
         dispatch('signOutAction')
      });
    }else{
      dispatch('signOutAction')
    }
    
  },
}

export default actions
