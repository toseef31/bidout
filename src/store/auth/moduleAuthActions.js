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
           
            commit('showErrorAlert')
          }else{
            axios.get('/auth/addUserLoginHistory/'+responce.data.id)
              .then(responce => {
            })
            axios.get('company/getCompanyById/'+responce.data.company.id)
             .then(responce => {
              commit('setCompany',responce.data)
            })
            commit('setUser',responce.data)
            localStorage.setItem('userData', JSON.stringify(responce.data)); 
            // router.push('/dashboard');
            window.location.href ="/dashboard";
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

  apiSignOutAction({ commit }) {
    
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
        // console.log(result);
        localStorage.removeItem("userData");
        // localStorage.removeItem("userId");
        localStorage.removeItem("token");
        localStorage.removeItem("companyData");
        localStorage.removeItem("companyId");
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
      // console.log(responce.data.message);
      // if(responce.status == 200){
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
                // localStorage.setItem("userId",payload.id);
                commit('setCompanyId', payload.id);
                commit('setCompanyName', payload.companyName);
                commit('setCompanyAdmins', responce.data.admins);
                router.replace({
                  name: "ExistingAccount"
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
                    commit('setSameAsData',{'firstName': payload.firstName,'lastName': payload.lastName,'email':payload.email,'phoneNumber':payload.phoneNumber})
                    commit('setCredentials',{'email':payload.email,'password': payload.password})
                     commit("setId",responce.data.data.id);
                     commit("setCustomerId",responce.data.data.chargebee_customer_id);
                    // commit('setCompanyId', responce.data);
                    commit('setCompanyName', payload.company);
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
            if(err.response.status === 400){
              commit('setCompanyError', err.response.data.message)
              commit('showErrorAlert')
            }
            console.log(err);
          });
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
            commit('setCompanyId', responce.data.data.companyId);
            localStorage.setItem("companyId",JSON.stringify(responce.data.companyId));
            if(responce.status == 200){
              axios.post('/ofs/createUser',{'company': payload.company,'firstName': payload.firstName, 'lastName': payload.lastName,'email': payload.email,'phoneNumber':payload.phoneNumber, 'title': payload.title, 'password': payload.password,'companyId':responce.data.data.companyId})
               .then(responce => {
                if(responce.status == 200){
                  commit('setSameAsData',{'firstName': payload.firstName,'lastName': payload.lastName,'email':payload.email,'phoneNumber':payload.phoneNumber})
                  commit('setCredentials',{'email':payload.email,'password': payload.password})
                  commit("setId",responce.data.data.id);
                  commit("setCustomerId",responce.data.data.chargebee_customer_id);
                  commit('setCompanyName', payload.company);
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
            if(err.response.status === 400){
              commit('setCompanyError', err.response.data.message)
              commit('showErrorAlert')
            }
            console.log(err);
          });
        }
        
       
      })
    }
  },
  // Get IP
  getIpAddress({ commit }, payload){
    console.log("dasdasd");
    const res = fetch('https://api.ipify.org?format=json',{
      method: 'get',
    }).then(response => response.json())
    .then(json =>{
      commit('setLocalIp', json.ip)
      console.log(json.ip);
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
        // commit('setContract', 'Contract generated successfully!')

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
  
  savePaymentsDetails({commit},payload){
    axios.post('/chargeBee/savePaymentDetails',{'userId': payload.userId,'customer_id': payload.customer_id,'cardNumber':payload.cardNumber,'CVV':payload.CVV,'expiryMonth':payload.expiryMonth,'expiryYear':payload.expiryYear,'billing_zip':payload.billing_zip,'billing_country':payload.billing_country})
     .then(responce => {
      if(responce.status == 200){
        commit('setContract', null);
         commit('setPlan', null);
         // axios.post('/chargeBee/createAuthorizePayment',{'customer_id': payload.customer_id,'amount':payload.amount})
         //  .then(responce => {
            router.replace({
              name: "Confirmation"
            });
          // })
        // commit('setContract', 'Contract generated successfully!')

        
      }
      else{
        commit('setEmailError', 'Something wrong please try again')
      }
    }).catch(err => {
      console.log(err);
    });
   },
   async savePaymentsNet30({commit},payload){
    const res = await axios.post('chargeBee/saveNet30Payment',{'customerId':payload.customerId,'sameAsyou':payload.sameAsYou,'email':payload.email,'first_name':payload.firstName,'last_name':payload.lastName,'phone':payload.phone})
    if(res.status == 200){
      router.replace({
        name: "Confirmation"
      });
    }
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
          router.replace({ name: "Dashboard" }).then(() => {
            window.location.reload();
          });
        }
        resolve(result)
      } catch(err) {
        console.log(err);
        reject(err)
      }
    })
  }
}
