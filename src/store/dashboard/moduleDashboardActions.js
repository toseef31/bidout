import router from '@/router'
import axios from 'axios'

export default {

  pendingUserCount({commit,dispatch},payload){
    axios.get('/user/getQueueUsersCount/'+payload)
      .then(responce => {
        
        if(responce.status === 200){
          commit('setPendingCount',responce.data.size)
        }
      
    }).catch(async(err) => {
        if(err.response.status === 403){
         await dispatch('refreshToken');
         dispatch('pendingUserCount',payload);
        }
          console.log(err);
      });
  }, 
  getPendingList({commit,dispatch},payload){
    axios.get('/company/getCompanyInvitedUsers/'+ payload)
      .then(responce => {
        
        if(responce.status === 200){
          commit('setInvitedUsersList',responce.data)
        }
    }).catch(async(err) => {
        if(err.response.status === 403){
         await dispatch('refreshToken');
         dispatch('getPendingList',payload);
        }
          console.log(err);
      });
  },
  manageUsers({commit,dispatch},payload){
    axios.get('/company/getUsersByCompany/'+ payload)
      .then(responce => {
        
        if(responce.status === 200){
          commit('getUsersList',responce.data)
        }
    }).catch(async(err) => {
        if(err.response.status === 403){
         await dispatch('refreshToken');
         dispatch('manageUsers',payload);
        }
          console.log(err);
      });
  }, 
  getInvitedList({commit,dispatch},payload){
    axios.get('/company/getCompanyInvitedUsers/'+ payload)
      .then(responce => {
        
        if(responce.status === 200){
          commit('setInvitedUsersList',responce.data)
        }
    }).catch(async(err) => {
        if(err.response.status === 403){
         await dispatch('refreshToken');
         dispatch('getInvitedList',payload);
        }
          console.log(err);
      });
  },

  disableUser({commit,dispatch},payload){
    axios.get('/company/disableUser/'+ payload)
      .then(responce => {
        
        if(responce.status === 200){
          commit('setStatusMessage', 'User disabled sucessfully!')
          commit('setUserStatus',false)
          commit('showErrorAlert')
          router.replace({ name: "DisabledUsers" });
        }
    }).catch(async(err) => {
      if(err.response.status === 403){
       await dispatch('refreshToken');
       dispatch('disableUser',payload);
      }
          console.log(err);
      });
  }, 

  enableUser({commit,dispatch},payload){
    axios.get('/company/enableUser/'+payload)
      .then(responce => {
        
        if(responce.status === 200){
          commit('setStatusMessage','User enabled sucessfully!')
          commit('setUserStatus',true)
          commit('showErrorAlert')
          router.replace({ name: "ManageUsers" });
        }
    }).catch(async(err) => {
        if(err.response.status === 403){
         await dispatch('refreshToken');
         dispatch('enableUser',payload);
        }
          console.log(err);
      });
  }, 
  acceptPendingUser({commit,dispatch},payload){
    
    axios.post('/user/acceptPendingUser/',{ 'userId':payload.id, 'email': payload.email,'firstName':payload.firstName,'lastName':payload.lastName,'companyId':payload.companyId,'phoneNumber':payload.phoneNumber,'title':payload.title})
      .then(responce => {
      
      if(responce.status === 200){
        commit('setStatusMessage','User accepted sucessfully!')
        commit('showErrorAlert')
      }
    }).catch(async(err) => {
      if(err.response.status === 403){
       await dispatch('refreshToken');
       dispatch('acceptPendingUser',payload);
      }
          console.log(err);
      });
  }, 
  getActivities({commit,dispatch},payload){
    axios.get('/activity/getActivities/'+payload)
      .then(responce => {
        
        if(responce.status === 200){
          commit('setActivityList',responce.data)
        }
    }).catch(async(err) => {
        if(err.response.status === 403){
         await dispatch('refreshToken');
         dispatch('getActivities',payload);
        }
          console.log(err);
      })
  }, 
  
}