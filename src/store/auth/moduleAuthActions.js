import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import router from '@/router'
import store from "../../store";
import axios from 'axios'

export default {
    
  signInAction({ commit }, payload) {
    // Try to sigin
    firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)

      .then((result) => {

        commit('setUser', result.user.multiFactor.user.uid)
        commit('setError', null)
        localStorage.setItem("userData",result.user.multiFactor.user);
        router.replace({ name: "Dashboard" });
        
      }, (err) => {
        commit('setError',err.message)
      })
  },  
  signOutAction({ commit }) {
    
    // Try to sigout
    firebase
      .auth()
      .signOut()
      .then((result) => {
        commit('setUser', null)
        commit('setError', null)
        // console.log(result);
        localStorage.removeItem("userData");
        router.replace({
          name: "Login"
        });
      })
      .catch((error) => {
        commit('setError', error.message)
      }) ;
  },  

  forgotEmail({ commit },payload) {
    let email = payload.email;
    // Try to sendForgot email
    axios.post('/auth/sendPasswordResetEmail',{'email': payload.email})
     .then(responce => {
      console.log(responce);
      if(responce.status == 200){
        commit('setEmailSuccess', 'Email sent successfully! Please check your email')
      }
      else{
        commit('setEmailError', 'Something wrong please try again')
      }
      
     // this.singleChate = responce.data;
    })
  },

  signUpAction({ commit }, payload) {

    console.log(payload);
    // Try to sigin
    // axios.post('/ofs/createProvider',{'email': payload.email})
    //  .then(responce => {
    //   console.log(responce);
    //   if(responce.status == 200){
    //     commit('setEmailSuccess', 'Email sent successfully! Please check your email')
    //   }
    //   else{
    //     commit('setEmailError', 'Something wrong please try again')
    //   }
      
     
    // })
  },
}
