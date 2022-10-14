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
        commit('setContract', null)
        commit('setCredentials', null)
        localStorage.removeItem('contractData');
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
            axios.get('company/getCompanyById/'+responce.data.company.id)
             .then(responce => {
              commit('setCompany',responce.data)
              localStorage.setItem('companyData', JSON.stringify(responce.data));
            })
            commit('setUser',responce.data)
            localStorage.setItem("userData",JSON.stringify(responce.data));
            router.replace({ name: "Dashboard" });
          }
          
        })
        
      }, (err) => {
        commit('setPassError',"Oops! You have entered a incorrect password, try again, if you are still unsure of your password, please Reset Password")
        // commit('showErrorAlert')
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
        commit('setCompany', null)
        commit('setCredentials', null)
        commit('setContract', null)
        localStorage.removeItem('contractData');
        // console.log(result);
        localStorage.removeItem("userData");
        // localStorage.removeItem("userId");
        localStorage.removeItem("token");
        localStorage.removeItem("companyData");
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
      
        commit('setEmailSuccess', 'If this account exists, a password reset email has been sent to the email address for the account.');
    }, (err) => {

        commit('setEmailSuccess',"If this account exists, a password reset email has been sent to the email address for the account.")
      })
  },
  verifyToken({commit}, payload){
    axios.get('/auth/verifyPasswordResetToken/'+payload)
     .then(responce => {
      commit('setVerifyData',responce.data)
    }).catch(err => {
        console.log(err);
    })
  },
  resetPassword({commit}, payload){
    axios.post('/auth/updatePassword',{'email': payload.email, 'oobCode': payload.oobCode, 'password': payload.password})
     .then(responce => {
      if(responce.status == 200){
        commit('setEmailSuccess', 'Password reset successfully!');
        commit('setVerifyData', {});
        commit('setResetEmail', payload.email);
        commit('showSuccessAlert')
        router.replace({ name: "Login" });
      }
      else{
        commit('setEmailError', 'Something wrong please try again')
      }
    }).catch(err => {
        console.log(err);
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
        
       
      }).catch(err => {
        console.log(err);
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
               
                commit('setCompanyId', payload.id);
                commit('setCompanyName', payload.companyName);
                router.replace({
                  name: "ModuleSelection"
                });
                commit('setEmailSuccess', 'Email sent successfully! Please check your email')
              }
              else{
                commit('setEmailError', 'Something wrong please try again')
              }
            }).catch(err => {
                console.log(err);
            });
           }else{
            axios.post('/ofs/createCompany',{'company': payload.company, 'companyHq': payload.companyHq, 'companyHq2': payload.companyHq2, 'companyHqCountry': payload.companyHqCountry,'companyHqState':payload.companyHqState, 'companyHqCity': payload.companyHqCity, 'companyHqZip': payload.companyHqZip})
             .then(responce => {
              commit('setCompanyId', responce.data.data.companyId);
              localStorage.setItem("companyId",JSON.stringify(responce.data.companyId));
              if(responce.status == 200){
                axios.post('/ofs/createUser',{'company': payload.company,'firstName': payload.firstName, 'lastName': payload.lastName,'email': payload.email,'phoneNumber':payload.phoneNumber, 'title': payload.title, 'password': payload.password,'companyId':responce.data.data.companyId})
                 .then(responce => {
                  if(responce.status == 200){
                    commit('setCredentials',payload)
                     commit("setId",responce.data.data.id)
                     commit("setCustomerId",responce.data.data.chargebee_customer_id)
                    // commit('setCompanyId', responce.data);
                    commit('setCompanyName', payload.company)
                    router.replace({
                      name: "ModuleSelection"
                    });
                    commit('setEmailSuccess', 'Email sent successfully! Please check your email')
                  }
                  else{
                    commit('setEmailError', 'Something wrong please try again')
                  }
                }).catch(err => {
                  console.log(err);
                });
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
  
  searchSupplier({commit}, payload){
    axios.get('/ofs/searchSuppliers/'+payload)
      .then(responce => {
      commit('setSupplierList',responce.data)
    }).catch(err => {
      console.log(err);
    });
  },
  // Buyer SignUp Acton
  buyerSignUpAction({ commit }, payload) {
    // Try to sigin
    if(payload.email.indexOf('@') != -1){
      axios.post('/user/checkIfUserWithEmailExists',{'email': payload.email})
       .then(responce => {
        if(responce.data.exists == true){
          commit('setEmailExistSuccess', 'Email already Exists! Please try different one')
          
        }else{
          axios.post('/ofs/createCompany',{'company': payload.company, 'companyHq': payload.companyHq, 'companyHq2': payload.companyHq2, 'companyHqCountry': payload.companyHqCountry,'companyHqState':payload.companyHqState, 'companyHqCity': payload.companyHqCity, 'companyHqZip': payload.companyHqZip})
           .then(responce => {
            commit('setCompanyId', responce.data.data.companyId)
            localStorage.setItem("companyId",JSON.stringify(responce.data.companyId));
            if(responce.status == 200){
              axios.post('/ofs/createUser',{'company': payload.company,'firstName': payload.firstName, 'lastName': payload.lastName,'email': payload.email,'phoneNumber':payload.phoneNumber, 'title': payload.title, 'password': payload.password,'companyId':responce.data.data.companyId})
               .then(responce => {
                if(responce.status == 200){
                  commit('setCredentials',payload)
                  commit("setId",responce.data.data.id)
                  commit("setCustomerId",responce.data.data.chargebee_customer_id)
                  commit('setCompanyName', payload.company)
                  router.replace({
                    name: "ModuleSelection"
                  });
                  commit('setEmailSuccess', 'Email sent successfully! Please check your email')
                }
                else{
                  commit('setEmailError', 'Something wrong please try again')
                }
              }).catch(err => {
                console.log(err);
              });
            }
            else{
              commit('setCompanyError', 'Please try with different Company details')
            }
          }).catch(err => {
            console.log(err);
          });
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
    }).catch(err => {
      console.log(err);
    });  
  },

  // signAgreement
  contractGenerate({commit}, payload){
    // console.log(payload,'contract');
    axios.post('/ofs/generateContract',{'id': payload.id,'ip': payload.ip,'contractType': payload.contractType, 'plan': payload.plan,'userId':payload.userId})
     .then(responce => {
      if(responce.status == 200){
        localStorage.setItem('contractData', JSON.stringify(responce.data));
        commit('setContract', responce.data)
        commit('setPlan', payload.plan)
        commit('setPrice',payload.unit_price)
        router.replace({
          name: "Contract"
        });
      }
      else{
        commit('setEmailError', 'Something wrong please try again')
      }
    }).catch(err => {
      console.log(err);
    });
  },
  signAgreement({commit}, payload){
    // Try to store Agreement
    axios.post('/ofs/signContract',{'sign': payload.sign,'contractType': payload.contractType,'fileName':payload.fileName,'companyId':payload.companyId,'userId':payload.userId,'yearly':payload.yearly,'plan':payload.plan})
     .then(responce => {
      if(responce.status == 200){
        commit('setContract', responce.data)

        router.replace({
          name: "ModuleSelection"
        });
      }
      else{
        commit('setEmailError', 'Something wrong please try again')
      }
    }).catch(err => {
      console.log(err);
    });
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
  savePaymentsDetails({commit},payload){
    axios.post('/chargeBee/savePaymentDetails',{'userId': payload.userId,'customer_id': payload.customer_id,'cardNumber':payload.cardNumber,'CVV':payload.CVV,'expiryMonth':payload.expiryMonth,'expiryYear':payload.expiryYear,'billing_zip':payload.billing_zip,'billing_country':payload.billing_country})
     .then(responce => {
      if(responce.status == 200){
        commit('setPlan', null);
        router.replace({
          name: "Confirmation"
        });
      }
      else{
        commit('setEmailError', 'Something wrong please try again')
      }
    }).catch(err => {
      console.log(err);
    });
   },
  savePaymentsNet30({commit},payload){
    axios.post('/chargeBee/saveNet30Payment',{'customer_id': payload.customer_id,'sameAsyou':payload.sameAsYou,'email':payload.email,'first_name':payload.firstName,'last_name':payload.lastName,'phone':payload.phone})
     .then(responce => {
      if(responce.status == 200){
        commit('setContract', null);
        localStorage.removeItem('contractData');
        commit('setPlan', null);
        router.replace({
          name: "Confirmation"
        });
      }
      else{
        commit('setEmailError', 'Something wrong please try again')
      }
    }).catch(err => {
      console.log(err);
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
