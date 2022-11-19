import router from '@/router'
import axios from 'axios'

export default {

  pendingUserCount({commit},payload){
    axios.get('/user/getQueueUsersCount/'+payload)
      .then(responce => {
      commit('setPendingCount',responce.data.size)
    }).catch(err => {
          console.log(err);
      });
  }, 
  getPendingList({commit},payload){
    axios.get('/company/getCompanyInvitedUsers/'+ payload)
      .then(responce => {
      commit('setInvitedUsersList',responce.data)
    }).catch(err => {
          console.log(err);
      });
  },
  manageUsers({commit},payload){
    axios.get('/company/getUsersByCompany/'+ payload)
      .then(responce => {
      commit('getUsersList',responce.data)
    }).catch(err => {
          console.log(err);
      });
  }, 
  getInvitedList({commit},payload){
    axios.get('/company/getCompanyInvitedUsers/'+ payload)
      .then(responce => {
      commit('setInvitedUsersList',responce.data)
    }).catch(err => {
          console.log(err);
      });
  },

  disableUser({commit},payload){
    axios.get('/company/disableUser/'+ payload)
      .then(responce => {
      commit('setStatusMessage', 'User disabled sucessfully!')
      commit('setUserStatus',false)
      commit('showErrorAlert')
      router.replace({ name: "DisabledUsers" });
    }).catch(err => {
          console.log(err);
      });
  }, 

  enableUser({commit},payload){
    axios.get('/company/enableUser/'+payload)
      .then(responce => {
      commit('setStatusMessage','User enabled sucessfully!')
      commit('setUserStatus',true)
      commit('showErrorAlert')
      router.replace({ name: "ManageUsers" });
    }).catch(err => {
          console.log(err);
      });
  }, 
  acceptPendingUser({commit},payload){
    
    axios.post('/user/acceptPendingUser/',{ 'userId':payload.id, 'email': payload.email,'firstName':payload.firstName,'lastName':payload.lastName,'companyId':payload.companyId,'phoneNumber':payload.phoneNumber,'title':payload.title})
      .then(responce => {
     
      commit('setStatusMessage','User accepted sucessfully!')
      commit('showErrorAlert')
    }).catch(err => {
          console.log(err);
      });
  }, 
  getActivities({commit},payload){
    axios.get('/activity/getActivities/'+payload)
      .then(responce => {
      commit('setActivityList',responce.data)
    }).catch(err => {
          console.log(err);
      })
  }, 
  async getAllLocations({commit},payload){
    try{
      const res = await axios.get('/company/getCompanyLocations');
      commit('setAllLocations',res.data)
      commit('setPageLoader',false)
    }catch(err){
      console.log(err);
    }
    
  }, 
  
}