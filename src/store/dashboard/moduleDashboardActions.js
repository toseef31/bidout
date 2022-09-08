import router from '@/router'
import axios from 'axios'

export default {
  getAllBids({commit}){
    axios.get('/admin/getBids',{ headers: {"Authorization" : `Bearer ${JSON.parse(localStorage.getItem('token'))}`} })
      .then(responce => {
      commit('getBids',responce.data)
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
      router.replace({ name: "DisabledUsers" });
    })
  }, 

  enableUser({commit},payload){
    axios.get('/company/enableUser/'+payload,{ headers: {"Authorization" : `Bearer ${JSON.parse(localStorage.getItem('token'))}`} })
      .then(responce => {
      commit('setStatusMessage','User enabled sucessfully!')
      commit('setUserStatus',true)
      router.replace({ name: "ManageUsers" });
    })
  }, 
  getActivities({commit},payload){
    axios.get('/activity/getActivities/'+payload,{ headers: {"Authorization" : `Bearer ${JSON.parse(localStorage.getItem('token'))}`} })
      .then(responce => {
      commit('setActivityList',responce.data)
    })
  }, 
  
}