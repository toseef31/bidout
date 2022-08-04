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
        commit('setError', null)
        console.log(result.user.multiFactor.user);
        axios.get('/user/getUserData/'+result.user.multiFactor.user.email)
         .then(responce => {
          commit('setUser',responce.data)
          localStorage.setItem("userData",JSON.stringify(responce.data));
          router.replace({ name: "Dashboard" });
        })
        
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
    })
  },

  checkEmail({ commit }, payload) {
    // console.log(payload);
    // Try to sigin
    if(payload.indexOf('@') != -1){
      axios.post('/user/checkIfUserWithEmailExists',{'email': payload})
       .then(responce => {
        console.log(responce.data.exists);
        if(responce.data.exists == true){
          commit('setEmailExistSuccess', 'Email aleardy Exists! Please try different one')
        }else{
          commit('setEmailExistSuccess', '')
        }
        
       
      })
    }
    
  },
  supplierSignUpAction({ commit }, payload) {
    // Try to sigin
    if(payload.email.indexOf('@') != -1){
      axios.post('/user/checkIfUserWithEmailExists',{'email': payload.email})
       .then(responce => {
        if(responce.data.exists == true){
          commit('setEmailExistSuccess', 'Email aleardy Exists! Please try different one')
          router.replace({
          name: "ExistingAccount"
        });
        }else{
          if(payload.id){
            axios.post('/ofs/queueSupplierUser',{'id': payload.id, 'email': payload.email, 'firstName': payload.firstName, 'lastName': payload.lastName,'phoneNumber':payload.phoneNumber, 'title': payload.title, 'password': payload.password})
             .then(responce => {
              if(responce.status == 200){
                router.replace({
                  name: "ModuleSelection"
                });
                commit('setEmailSuccess', 'Email sent successfully! Please check your email')
              }
              else{
                commit('setEmailError', 'Something wrong please try again')
              }
            })
           }else{
            axios.post('/ofs/createCompany',{'company': payload.company, 'companyHq': payload.companyHq, 'companyHq2': payload.companyHq2, 'companyHqCountry': payload.companyHqCountry,'companyHqState':payload.companyHqState, 'companyHqCity': payload.companyHqCity, 'companyHqZip': payload.companyHqZip})
             .then(responce => {
              if(responce.status == 200){
                axios.post('/ofs/createUser',{'company': payload.company,'firstName': payload.firstName, 'lastName': payload.lastName,'email': payload.email,'phoneNumber':payload.phoneNumber, 'title': payload.title, 'password': payload.password})
                 .then(responce => {
                  if(responce.status == 200){
                    router.replace({
                      name: "ModuleSelection"
                    });
                    commit('setEmailSuccess', 'Email sent successfully! Please check your email')
                  }
                  else{
                    commit('setEmailError', 'Something wrong please try again')
                  }
                })
              }
              else{
                console.log(responce.data.message);
                commit('setCompanyError', 'Please try with different Company details')
              }
            })
           }
            
        }
        
       
      })
    }
    
  },
  searchSupplier({commit}, payload){
    axios.get('/ofs/searchSuppliers/'+payload)
      .then(responce => {
      commit('setSupplierList',responce.data.hits)
    })
  },
  // Buyer SignUp Acton
  buyerSignUpAction({ commit }, payload) {
    console.log(payload);
    // Try to sigin
    if(payload.email.indexOf('@') != -1){
      axios.post('/user/checkIfUserWithEmailExists',{'email': payload.email})
       .then(responce => {
        console.log(responce);
        if(responce.data.exists == true){
          commit('setEmailExistSuccess', 'Email aleardy Exists! Please try different one')
          
        }else{
          console.log(payload);
          axios.post('/ofs/createCompany',{'company': payload.company, 'companyHq': payload.companyHq, 'companyHq2': payload.companyHq2, 'companyHqCountry': payload.companyHqCountry,'companyHqState':payload.companyHqState, 'companyHqCity': payload.companyHqCity, 'companyHqZip': payload.companyHqZip})
           .then(responce => {
            if(responce.status == 200){
              axios.post('/ofs/createUser',{'company': payload.company,'firstName': payload.firstName, 'lastName': payload.lastName,'email': payload.email,'phoneNumber':payload.phoneNumber, 'title': payload.title, 'password': payload.password})
               .then(responce => {
                if(responce.status == 200){
                  router.replace({
                    name: "ModuleSelection"
                  });
                  commit('setEmailSuccess', 'Email sent successfully! Please check your email')
                }
                else{
                  commit('setEmailError', 'Something wrong please try again')
                }
              })
            }
            else{
              console.log(responce.data.message);
              commit('setCompanyError', 'Please try with different Company details')
            }
          })
        }
        
       
      })
    }
  }
}
