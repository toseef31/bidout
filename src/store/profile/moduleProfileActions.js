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
    })
  },  
  updateProfile({commit}, payload){
    var config = {
      headers: {
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      },
    };
    axios.post('/user/updateUser/'+payload.userid,{'email': payload.email,'firstName': payload.firstName,'lastName': payload.lastName,'phoneNumber': payload.phoneNumber,'title':payload.title,'timezone':payload.timezone},config)
     .then(responce => {
      axios.get('/user/getUserData/'+payload.email)
       .then(responce => {
        commit('setUser',responce.data)
        localStorage.setItem("userData",JSON.stringify(responce.data));
      })
    })
  },  
  changePassword({commit}, payload){
    var config = {
      headers: {
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      },
    };
    axios.post('/user/changePassword/'+payload.userid,{'currentPassword': payload.currentPassword,'newPassword': payload.newPassword},config)
     .then(responce => {
      commit('setUserImg',responce.data.messages)
    })
  },  
  loginHistory({commit}, payload){
    axios.get('/user/getUserLoginHistory/'+payload.userid)
     .then(responce => {
      commit('setLoginHistory',responce.data)
    })
  },  
  adminsCompany({commit}, payload){
    var config = {
      headers: {
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      },
    };
    axios.get('/company/getCompanyAdmins/'+payload.company,config)
     .then(responce => {
      commit('setCompanyAdmin',responce.data)
    })
  },  
  updateNotifications({commit}, payload){
    console.log(payload);
    var config = {
      headers: {
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      },
    };
    axios.post('/user/updateNotificationPreference/'+payload.userid,{'notificationPreference':payload.notificationPreference},config)
     .then(responce => {
      axios.get('/user/getUserData/'+payload.email)
       .then(responce => {
        // console.log(responce.data,'after uodate');
        commit('setUser',responce.data)
        localStorage.setItem("userData",JSON.stringify(responce.data));
      })
    })
  }, 
  inviteUser({commit},payload){
    var config = {
      headers: {
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      },
    };
    axios.post('/company/addInvitedUser/',{'firstName':payload.firstName,'lastName': payload.lastName,'company': payload.company,'email':payload.email,'parent': payload.parent,'role': payload.role},config)
     .then(responce => {
        console.log(responce);
        commit('setMessage','User invited successfully')
        router.replace({ name: "ManageUsers" });
    })
  },
  editData({commit},payload){
    commit('setEditData',payload);
    router.replace({ name: "EditUser" });
  },
  updateUser({commit},payload){
    var config = {
      headers: {
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      },
    };
    axios.post('/company/updateUser/'+payload.id,{'firstName':payload.firstName,'lastName': payload.lastName,'role': payload.role},config)
     .then(responce => {
        console.log(responce);
        commit('setMessage','User updated successfully')
        commit('showErrorAlert')
        router.replace({ name: "ManageUsers" });
    })
  },
  updateInvite({commit},payload){
    var config = {
      headers: {
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      },
    };
    axios.post('/company/updateInvitedUser/'+payload.id,{'firstName':payload.firstName,'lastName': payload.lastName,'role': payload.role},config)
     .then(responce => {
        console.log(responce);
        commit('setMessage','User updated successfully')
        commit('showErrorAlert')
        router.replace({ name: "ManageUsers" });
    })
  },
  getDisabledUsers({commit},payload){
    axios.get('/company/getDisabledUsersByCompany/'+ payload,{ headers: {"Authorization" : `Bearer ${JSON.parse(localStorage.getItem('token'))}`} })
      .then(responce => {
      // console.log(responce.data);
      commit('setDisableUsersList',responce.data)
      commit('showErrorAlert')
    })
  }, 
  getPendingUsers({commit},payload){
    axios.get('/user/getPendingUsers/'+ payload,{ headers: {"Authorization" : `Bearer ${JSON.parse(localStorage.getItem('token'))}`} })
      .then(responce => {
      // console.log(responce.data);
      commit('setPendingUsersList',responce.data.data)
      commit('showErrorAlert')
    })
  }, 
  verifyInviteToken({commit}, payload){
    axios.get('/auth/checkIfInvitationIsValid/'+payload)
     .then(responce => {
      commit('setInviteData',responce.data)
    })
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
    })
  }
}
