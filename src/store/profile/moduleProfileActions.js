import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import router from '@/router'
import store from "../../store";
import axios from 'axios'
export default {
    
  updateProfileImg({commit,dispatch}, payload){
    var config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      },
    };
    const formData = new FormData()
    formData.append('files', payload.files)
    axios.post('/user/updateProfilePicture/'+payload.userid,formData,config)
     .then(responce => {
      
      if(responce.status === 200){
        axios.get('/user/getUserData/'+payload.email)
         .then(responce => {
          commit('setUser',responce.data)
          localStorage.setItem("userData",JSON.stringify(responce.data));
        }).catch(async(err) => {
          if(err.response.status === 403){
           await dispatch('refreshToken');
           dispatch('updateProfileImg',payload);
          }
          console.log(err);
        });
      }
    }).catch(async(err) => {
        if(err.response.status === 403){
         await dispatch('refreshToken');
         dispatch('updateProfileImg',payload);
        }
          console.log(err);
      });
  },  
  updateProfile({commit,dispatch}, payload){
    axios.post('/user/updateUser/'+payload.userid,{'email': payload.email,'firstName': payload.firstName,'lastName': payload.lastName,'phoneNumber': payload.phoneNumber,'title':payload.title,'timezone':payload.timezone})
     .then(responce => {
      
      if(responce.status === 200){
        axios.get('/user/getUserData/'+payload.email)
         .then(responce => {
          commit('setUser',responce.data)
          localStorage.setItem("userData",JSON.stringify(responce.data));
        }).catch(async(err) => {
          if(err.response.status === 403){
           await dispatch('refreshToken');
           dispatch('updateProfile',payload);
          }
            console.log(err);
        });
      }
      
    }).catch(async(err) => {
        if(err.response.status === 403){
         await dispatch('refreshToken');
         dispatch('updateProfile',payload);
        }
          console.log(err);
      });
  },  
  changePassword({commit,dispatch}, payload){
    
    axios.post('/user/changePassword/'+payload.userid,{'currentPassword': payload.currentPassword,'newPassword': payload.newPassword})
     .then(responce => {
      
      if(responce.status === 200){
        commit('setUserImg',responce.data.messages)
      }
    }).catch(async(err) => {
        if(err.response.status === 403){
         await dispatch('refreshToken');
         dispatch('changePassword',payload);
        }
          console.log(err);
      });
  },  
  loginHistory({commit,dispatch}, payload){
    axios.get('/user/getUserLoginHistory/'+payload.userid)
     .then(responce => {
      commit('setLoginHistory',responce.data)
    }).catch(err => {
          console.log(err);
      });
  },  
  adminsCompany({commit,dispatch}, payload){
    
    axios.get('/company/getCompanyAdmins/'+payload.company)
     .then(responce => {
      
      if(responce.status === 200){
        commit('setCompanyAdmin',responce.data)
      }
    }).catch(async(err) => {
      if(err.response.status === 403){
       await dispatch('refreshToken');
       dispatch('adminsCompany',payload);
      }
          console.log(err);
      });
  },  
  updateNotifications({commit,dispatch}, payload){
    axios.post('/user/updateNotificationPreference/'+payload.userid,{'notificationPreference':payload.notificationPreference})
     .then(responce => {
      
      if(responce.status === 200){
        axios.get('/user/getUserData/'+payload.email)
         .then(responce => {
          
          commit('setUser',responce.data)
          localStorage.setItem("userData",JSON.stringify(responce.data));
        }).catch(async(err) => {
          if(err.response.status === 403){
           await dispatch('refreshToken');
           dispatch('updateNotifications',payload);
          }
            console.log(err);
        });
      }
    }).catch(async(err) => {
        if(err.response.status === 403){
         await dispatch('refreshToken');
         dispatch('updateNotifications',payload);
        }
          console.log(err);
      });
  }, 
  inviteUser({commit,dispatch},payload){
    
    axios.post('/company/addInvitedUser/',{'firstName':payload.firstName,'lastName': payload.lastName,'company': payload.company,'email':payload.email,'parent': payload.parent,'role': payload.role})
     .then(responce => {
        
        if(responce.status === 200){
          commit('setMessage','User invited successfully')
          router.replace({ name: "ManageUsers" });
        }
    }).catch(async(err) => {
        if(err.response.status === 403){
         await dispatch('refreshToken');
         dispatch('inviteUser',payload);
        }
          console.log(err);
      });
  },
  editData({commit},payload){
    commit('setEditData',payload);
    router.replace({ name: "EditUser" });
  },
  updateUser({commit,dispatch},payload){
    
    axios.post('/company/updateUser/'+payload.id,{'firstName':payload.firstName,'lastName': payload.lastName,'role': payload.role})
     .then(responce => {
        
        if(responce.status === 200){
          commit('setMessage','User updated successfully')
          commit('showErrorAlert')
          router.replace({ name: "ManageUsers" });
        }
    }).catch(async(err) => {
        if(err.response.status === 403){
          await dispatch('refreshToken');
          dispatch('updateUser',payload);
        }
          console.log(err);
      });
  },
  updateInvite({commit,dispatch},payload){
    
    axios.post('/company/updateInvitedUser/'+payload.id,{'firstName':payload.firstName,'lastName': payload.lastName,'role': payload.role})
     .then(responce => {
        
        if(responce.status === 200){
          commit('setMessage','User updated successfully')
          commit('showErrorAlert')
          router.replace({ name: "ManageUsers" });
        }
    }).catch(async(err) => {
        if(err.response.status === 403){
          await dispatch('refreshToken');
          dispatch('updateInvite',payload);
        }
          console.log(err);
      });
  },
  getDisabledUsers({commit,dispatch},payload){
    axios.get('/company/getDisabledUsersByCompany/'+ payload)
      .then(responce => {
      
      if(responce.status === 200){
        commit('setDisableUsersList',responce.data)
        commit('showErrorAlert')
      }
    }).catch(async(err) => {
        if(err.response.status === 403){
          await dispatch('refreshToken');
          dispatch('getDisabledUsers',payload);
        }
          console.log(err);
      });
  }, 
  getPendingUsers({commit,dispatch},payload){
    axios.get('/user/getPendingUsers/'+ payload)
      .then(responce => {
      
      if(responce.status === 200){
        commit('setPendingUsersList',responce.data.data)
        commit('showErrorAlert')
      }
    }).catch(async(err) => {
        if(err.response.status === 403){
          await dispatch('refreshToken');
          dispatch('getPendingUsers',payload);
        }
          console.log(err);
      });
  }, 
  verifyInviteToken({commit}, payload){
    axios.get('/auth/checkIfInvitationIsValid/'+payload)
     .then(responce => {
      commit('setInviteData',responce.data)
    }).catch(err => {
          console.log(err);
      });
  },
  resetInvitePassword({commit}, payload){
    
    axios.post('/auth/signUpInvitedUser/',{'invitationId': payload.invitationId, 'password': payload.password})
     .then(responce => {
      if(responce.status == 200){
        commit('setEmailSuccess', 'Login here to continue with your account!');
        commit('setInviteData', {});
        commit('showSuccessAlert')
        router.replace({ name: "Login" });
      }
      else{
        commit('setEmailError', 'Something wrong please try again')
      }
    }).catch(err => {
          console.log(err);
      });
  }
}
