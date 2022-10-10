import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import router from '@/router'
import store from "../../store";
import axios from 'axios'
export default {
    
  updateProfileImg({commit}, payload){
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
      axios.get('/user/getUserData/'+payload.email)
       .then(responce => {
        commit('setUser',responce.data)
        localStorage.setItem("userData",JSON.stringify(responce.data));
      })
    }).catch(err => {
          console.log(err);
      });
  },  
  updateProfile({commit}, payload){
    axios.post('/user/updateUser/'+payload.userid,{'email': payload.email,'firstName': payload.firstName,'lastName': payload.lastName,'phoneNumber': payload.phoneNumber,'title':payload.title,'timezone':payload.timezone})
     .then(responce => {
      axios.get('/user/getUserData/'+payload.email)
       .then(responce => {
        commit('setUser',responce.data)
        localStorage.setItem("userData",JSON.stringify(responce.data));
      }).catch(err => {
          console.log(err);
      });
    }).catch(err => {
          console.log(err);
      });
  },  
  changePassword({commit}, payload){
    
    axios.post('/user/changePassword/'+payload.userid,{'currentPassword': payload.currentPassword,'newPassword': payload.newPassword})
     .then(responce => {
      commit('setUserImg',responce.data.messages)
    }).catch(err => {
          console.log(err);
      });
  },  
  loginHistory({commit}, payload){
    axios.get('/user/getUserLoginHistory/'+payload.userid)
     .then(responce => {
      commit('setLoginHistory',responce.data)
    }).catch(err => {
          console.log(err);
      });
  },  
  adminsCompany({commit}, payload){
    
    axios.get('/company/getCompanyAdmins/'+payload.company)
     .then(responce => {
      commit('setCompanyAdmin',responce.data)
    }).catch(err => {
          console.log(err);
      });
  },  
  updateNotifications({commit}, payload){
    axios.post('/user/updateNotificationPreference/'+payload.userid,{'notificationPreference':payload.notificationPreference})
     .then(responce => {
      axios.get('/user/getUserData/'+payload.email)
       .then(responce => {
        // console.log(responce.data,'after uodate');
        commit('setUser',responce.data)
        localStorage.setItem("userData",JSON.stringify(responce.data));
      }).catch(err => {
          console.log(err);
      });
    }).catch(err => {
          console.log(err);
      });
  }, 
  inviteUser({commit},payload){
    
    axios.post('/company/addInvitedUser/',{'firstName':payload.firstName,'lastName': payload.lastName,'company': payload.company,'email':payload.email,'parent': payload.parent,'role': payload.role})
     .then(responce => {
        console.log(responce);
        commit('setMessage','User invited successfully')
        router.replace({ name: "ManageUsers" });
    }).catch(err => {
          console.log(err);
      });
  },
  editData({commit},payload){
    commit('setEditData',payload);
    router.replace({ name: "EditUser" });
  },
  updateUser({commit},payload){
    
    axios.post('/company/updateUser/'+payload.id,{'firstName':payload.firstName,'lastName': payload.lastName,'role': payload.role})
     .then(responce => {
        console.log(responce);
        commit('setMessage','User updated successfully')
        commit('showErrorAlert')
        router.replace({ name: "ManageUsers" });
    }).catch(err => {
          console.log(err);
      });
  },
  updateInvite({commit},payload){
    
    axios.post('/company/updateInvitedUser/'+payload.id,{'firstName':payload.firstName,'lastName': payload.lastName,'role': payload.role})
     .then(responce => {
        console.log(responce);
        commit('setMessage','User updated successfully')
        commit('showErrorAlert')
        router.replace({ name: "ManageUsers" });
    }).catch(err => {
          console.log(err);
      });
  },
  getDisabledUsers({commit},payload){
    axios.get('/company/getDisabledUsersByCompany/'+ payload)
      .then(responce => {
      // console.log(responce.data);
      commit('setDisableUsersList',responce.data)
      commit('showErrorAlert')
    }).catch(err => {
          console.log(err);
      });
  }, 
  getPendingUsers({commit},payload){
    axios.get('/user/getPendingUsers/'+ payload)
      .then(responce => {
      // console.log(responce.data);
      commit('setPendingUsersList',responce.data.data)
      commit('showErrorAlert')
    }).catch(err => {
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
    // console.log(payload);
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
