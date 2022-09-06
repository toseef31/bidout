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
  updateUser({commit}, payload){
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
    var config = {
      headers: {
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      },
    };
    axios.post('/user/updateNotificationPreference/'+payload.userid,{'notificationPreference':payload.notificationPreference},config)
     .then(responce => {
      axios.get('/user/getUserData/'+payload.email)
       .then(responce => {
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
        commit('setMessage',responce.data)
        router.replace({ name: "ManageUsers" });
    })
  }
}
