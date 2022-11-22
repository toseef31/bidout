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

  async refreshToken({commit,dispatch}){
    const user = firebase.auth().currentUser;
    if(user){
      return new Promise(async (resolve, reject) => {
        try{
          const token =  await user.getIdToken(true);
          console.log(token);
          commit('setToken',token);
          localStorage.setItem("token",JSON.stringify(token));
          resolve(token);
        } catch(error) {
            dispatch('signOutAction')
            reject(error)
        }
      })
          
    }else{
      dispatch('signOutAction')
    }
    
  },
}

export default actions
