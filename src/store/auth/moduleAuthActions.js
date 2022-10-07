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
        commit('setToken',result.user.multiFactor.user.accessToken);
        localStorage.setItem("token",JSON.stringify(result.user.multiFactor.user.accessToken));
        axios.get('/user/getUserData/'+result.user.multiFactor.user.email)
         .then(responce => {
          if(responce.data.status == false){
            commit('setError', 'Disabled account! You cannot login with this account');
            // router.replace({ name: "Login" });
            commit('showErrorAlert')
          }else{
            axios.get('/auth/addUserLoginHistory/'+responce.data.id)
              .then(responce => {
            })
            commit('setUser',responce.data)
            localStorage.setItem("userData",JSON.stringify(responce.data));
            router.replace({ name: "Dashboard" });
          }
          
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
        commit('setToken', null)
        commit('setUserId', null)
        commit('setError', null)
        // console.log(result);
        localStorage.removeItem("userData");
        // localStorage.removeItem("userId");
        localStorage.removeItem("token");
        router.replace({
          name: "OFSHome"
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
      if(responce.status == 200){
        commit('setEmailSuccess', 'If this account exists, a password reset email has been sent to the email address for the account.');
      }
      else{
        commit('setEmailError', 'Something wrong please try again')
      }
    })
  },
  verifyToken({commit}, payload){
    axios.get('/auth/verifyPasswordResetToken/'+payload)
     .then(responce => {
      commit('setVerifyData',responce.data)
    })
  },
  resetPassword({commit}, payload){
    console.log(payload,'reset password');
    axios.post('/auth/updatePassword',{'email': payload.email, 'oobCode': payload.oobCode, 'password': payload.password})
     .then(responce => {
      if(responce.status == 200){
        commit('setEmailSuccess', 'Password reset successfully!');
        commit('setVerifyData', {})
      }
      else{
        commit('setEmailError', 'Something wrong please try again')
      }
    })
  },
  checkEmail({ commit }, payload) {
    // Try to sigin
    if(payload.indexOf('@') != -1){
      axios.post('/user/checkIfUserWithEmailExists',{'email': payload})
       .then(responce => {
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
                // localStorage.setItem("userId",payload.id);
                commit('setUserId', payload.id);
                commit('setCompanyName', payload.companyName);
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
                    // localStorage.setItem("userId",JSON.stringify(responce.data));
                    commit('setUserId', responce.data);
                    commit('setCompanyName', payload.company);
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
                commit('setCompanyError', 'Please try with different Company details')
              }
            })
           }   
        } 
      })
    }
    
  },
  // searchSupplier({commit}){
  //   axios.get('/company/getAllSuppliersPublic/')
  //     .then(responce => {
  //     commit('setSupplierList',responce.data)
  //   })
  // },
  searchSupplier({commit}, payload){
    axios.get('/ofs/searchSuppliers/'+payload)
      .then(responce => {
      commit('setSupplierList',responce.data.hits)
    })
  },
  // Buyer SignUp Acton
  buyerSignUpAction({ commit }, payload) {
    // Try to sigin
    if(payload.email.indexOf('@') != -1){
      axios.post('/user/checkIfUserWithEmailExists',{'email': payload.email})
       .then(responce => {
        if(responce.data.exists == true){
          commit('setEmailExistSuccess', 'Email aleardy Exists! Please try different one')
          
        }else{
          axios.post('/ofs/createCompany',{'company': payload.company, 'companyHq': payload.companyHq, 'companyHq2': payload.companyHq2, 'companyHqCountry': payload.companyHqCountry,'companyHqState':payload.companyHqState, 'companyHqCity': payload.companyHqCity, 'companyHqZip': payload.companyHqZip})
           .then(responce => {
            if(responce.status == 200){
              axios.post('/ofs/createUser',{'company': payload.company,'firstName': payload.firstName, 'lastName': payload.lastName,'email': payload.email,'phoneNumber':payload.phoneNumber, 'title': payload.title, 'password': payload.password})
               .then(responce => {
                if(responce.status == 200){
                  // localStorage.setItem("userId",JSON.stringify(responce.data));
                  commit('setUserId', responce.data);
                  commit('setCompanyName', payload.company);
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
              commit('setCompanyError', 'Please try with different Company details')
            }
          })
        }
        
       
      })
    }
  },
  // Get IP
  getIpAddress({ commit }, payload){
    axios.get('https://api.ipify.org')
      .then(responce => {
       commit('setLocalIp', responce.data)
       // return responce;
    })  
  },

  // signAgreement
  contractGenerate({commit}, payload){
    axios.post('/ofs/generateContract',{'id': payload.id,'ip': payload.ip,'contractType': payload.contractType, 'plan': payload.plan})
     .then(responce => {
      if(responce.status == 200){
        localStorage.setItem('contractData', JSON.stringify(responce.data));
        commit('setContract', responce.data)
        router.replace({
          name: "Contract"
        });
      }
      else{
        commit('setEmailError', 'Something wrong please try again')
      }
    })
  },
  signAgreement({commit}, payload){
    // Try to store Agreement
    axios.post('/ofs/signContract',{'sign': payload.sign,'contractType': payload.contractType,'fileName':payload.fileName,'plan':payload.plan,'cbUserId':payload.cbUserId})
     .then(responce => {
      if(responce.status == 200){
        localStorage.removeItem('contractData');
        commit('setContract', 'Contract generated successfully!')
        router.replace({
          name: "ModuleSelection"
        });
      }
      else{
        commit('setEmailError', 'Something wrong please try again')
      }
    })
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
  signInWithCustomToken({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        const result  = await firebase.auth().signInWithCustomToken(payload)
        commit('setError', null)
        commit('setToken',result.user.multiFactor.user.accessToken);
        localStorage.setItem("token",JSON.stringify(result.user.multiFactor.user.accessToken));
        const userResp = await axios.get('/user/getUserData/'+result.user.multiFactor.user.email)
        if(userResp.data.status == false){
          commit('setError', 'Disabled account! You cannot login with this account');
          commit('showErrorAlert')
        }else{
          axios.get('/auth/addUserLoginHistory/'+userResp.data.id)
          const companyResp = await axios.get('company/getCompanyById/'+userResp.data.company.id)
          commit('setCompany',companyResp.data)
          localStorage.setItem('companyData', JSON.stringify(companyResp.data));
          commit('setUser',userResp.data)
          localStorage.setItem("userData",JSON.stringify(userResp.data));
          router.replace({ name: "Dashboard" });
        }
        resolve(result)
      } catch(err) {
        console.log(err);
        reject(err)
      }
    })
  }
}
