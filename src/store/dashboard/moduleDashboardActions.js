import router from '@/router'
import axios from 'axios'

export default {

  async pendingUserCount({commit},payload){
    await axios.get('/user/getQueueUsersCount/'+payload,{ headers: {"Authorization" : `Bearer ${JSON.parse(localStorage.getItem('token'))}`} })
      .then(responce => {
      commit('setPendingCount',responce.data.size)
    })
  }, 
  getPendingList({commit},payload){
    axios.get('/company/getCompanyInvitedUsers/'+ payload,{ headers: {"Authorization" : `Bearer ${JSON.parse(localStorage.getItem('token'))}`} })
      .then(responce => {
      commit('setInvitedUsersList',responce.data)
    })
  },
  manageUsers({commit},payload){
    axios.get('/company/getUsersByCompany/'+ payload,{ headers: {"Authorization" : `Bearer ${JSON.parse(localStorage.getItem('token'))}`} })
      .then(responce => {
      commit('getUsersList',responce.data)
    })
  }, 
  getInvitedList({commit},payload){
    axios.get('/company/getCompanyInvitedUsers/'+ payload,{ headers: {"Authorization" : `Bearer ${JSON.parse(localStorage.getItem('token'))}`} })
      .then(responce => {
      commit('setInvitedUsersList',responce.data)
    })
  },

  disableUser({commit},payload){
    axios.get('/company/disableUser/'+ payload,{ headers: {"Authorization" : `Bearer ${JSON.parse(localStorage.getItem('token'))}`} })
      .then(responce => {
      commit('setStatusMessage', 'User disabled sucessfully!')
      commit('setUserStatus',false)
      commit('showErrorAlert')
      router.replace({ name: "DisabledUsers" });
    })
  }, 

  enableUser({commit},payload){
    axios.get('/company/enableUser/'+payload,{ headers: {"Authorization" : `Bearer ${JSON.parse(localStorage.getItem('token'))}`} })
      .then(responce => {
      commit('setStatusMessage','User enabled sucessfully!')
      commit('setUserStatus',true)
      commit('showErrorAlert')
      router.replace({ name: "ManageUsers" });
    })
  }, 
  acceptPendingUser({commit},payload){
    var config = {
      headers: {
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      },
    };
    axios.post('/user/acceptPendingUser/',{ 'userId':payload.id, 'email': payload.email,'firstName':payload.firstName,'lastName':payload.lastName,'companyId':payload.companyId,'phoneNumber':payload.phoneNumber,'title':payload.title},config)
      .then(responce => {
      // console.log(responce.data);
      commit('setStatusMessage','User accepted sucessfully!')
      commit('showErrorAlert')
    })
  }, 
  getActivities({commit},payload){
    axios.get('/activity/getActivities/'+payload,{ headers: {"Authorization" : `Bearer ${JSON.parse(localStorage.getItem('token'))}`} })
      .then(responce => {
      commit('setActivityList',responce.data)
    })
  }, 
  
}