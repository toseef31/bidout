import router from '@/router'
import axios from 'axios'
import * as Sentry from '@sentry/vue';

export default {

  pendingUserCount({commit,dispatch,state},payload){
    axios.get('/v2/user/getQueueUsersCount/'+payload)
      .then(responce => {
        
        if(responce.status === 200){
          commit('setPendingCount',responce.data.size)
        }
      
    }).catch(async(err) => {
       Sentry.captureException(err);
      if(state.apiCounter === 2){
        dispatch('apiSignOutAction')
      }else{
        if(err.response && err.response.status === 403){
         await dispatch('refreshToken');
         state.apiCounter = 2;
         dispatch('pendingUserCount',payload);
        }
      }
          console.log(err);
      });
  }, 
  getPendingList({commit,dispatch,state},payload){
    axios.get('/v2/company/getCompanyInvitedUsers/'+ payload)
      .then(responce => {
        
        if(responce.status === 200){
          commit('setInvitedUsersList',responce.data)
        }
    }).catch(async(err) => {
       Sentry.captureException(err);
      if(state.apiCounter === 2){
        dispatch('apiSignOutAction')
      }else{
        if(err.response && err.response.status === 403){
         await dispatch('refreshToken');
         state.apiCounter = 2;
         dispatch('getPendingList',payload);
        }
      }
          console.log(err);
      });
  },
  manageUsers({commit,dispatch,state},payload){
    axios.get('/v2/company/getUsersByCompany/'+ payload)
      .then(responce => {
        if(responce.status === 200){
          commit('getUsersList',responce.data)
        }
    }).catch(async(err) => {
       Sentry.captureException(err);
      if(state.apiCounter === 2){
        dispatch('apiSignOutAction')
      }else{
        if(err.response && err.response.status === 403){
         await dispatch('refreshToken');
         state.apiCounter = 2;
         dispatch('manageUsers',payload);
        }
      }
          console.log(err);
      });
  }, 
  getInvitedList({commit,dispatch,state},payload){
    axios.get('/v2/company/getCompanyInvitedUsers/'+ payload)
      .then(responce => {
        
        if(responce.status === 200){
          commit('setInvitedUsersList',responce.data)
        }
    }).catch(async(err) => {
       Sentry.captureException(err);
        if(state.apiCounter === 2){
          dispatch('apiSignOutAction')
        }else{
          if(err.response && err.response.status === 403){
           await dispatch('refreshToken');
           state.apiCounter = 2;
           dispatch('getInvitedList',payload);
          }
        }
          console.log(err);
      });
  },

  disableUser({commit,dispatch,state},payload){
    axios.post('/v2/company/disableUser/'+ payload)
      .then(responce => {
        
        if(responce.status === 200){
          commit('setStatusMessage', 'User disabled sucessfully!')
          commit('setUserStatus',false)
          commit('showErrorAlert')
          router.replace({ name: "DisabledUsers" });
        }
    }).catch(async(err) => {
       Sentry.captureException(err);
      if(state.apiCounter === 2){
        dispatch('apiSignOutAction')
      }else{
        if(err.response && err.response.status === 403){
         await dispatch('refreshToken');
         state.apiCounter = 2;
         dispatch('disableUser',payload);
        }
      }
          console.log(err);
      });
  }, 
  deletePendingSignUp({commit,dispatch,state},payload){
    axios.post('/v2/user/deletePendingSignUp/'+ payload)
      .then(responce => {
        if(responce.status === 200){
          commit('setStatusMessage', 'User deleted sucessfully!')
          commit('setUserStatus',false)
          commit('showErrorAlert')
        }
    }).catch(async(err) => {
       Sentry.captureException(err);
      if(state.apiCounter === 2){
        dispatch('apiSignOutAction')
      }else{
        if(err.response && err.response.status === 403){
         await dispatch('refreshToken');
         state.apiCounter = 2;
         dispatch('deletePending',payload);
        }
      }
          console.log(err);
      });
  }, 

  enableUser({commit,dispatch,state},payload){
    axios.post('/v2/company/enableUser/'+payload)
      .then(responce => {
        
        if(responce.status === 200){
          commit('setStatusMessage','User enabled sucessfully!')
          commit('setUserStatus',true)
          commit('showErrorAlert')
          router.replace({ name: "ManageUsers" });
        }
    }).catch(async(err) => {
       Sentry.captureException(err);
      if(state.apiCounter === 2){
        dispatch('apiSignOutAction')
      }else{
        if(err.response && err.response.status === 403){
         await dispatch('refreshToken');
         state.apiCounter = 2;
         dispatch('enableUser',payload);
        }
      }
        console.log(err);
      });
  }, 
  acceptPendingUser({commit,dispatch,state},payload){
    axios.post('/v2/user/acceptPendingUser/',{ 'userId':payload.user._id, 'email': payload.user.email,'firstName':payload.user.firstName,'lastName':payload.user.lastName,'companyId':payload.companyId,'phoneNumber':payload.user.phoneNumber,'title':payload.user.title,'role': 'user', 'companyName': payload.companyName})
      .then(responce => {
      
      if(responce.status === 200){
        commit('setStatusMessage','User accepted sucessfully!')
        commit('showErrorAlert')
        dispatch('manageUsers',responce.data.company._id)
        dispatch('getPendingUsers',responce.data.company._id)
      }
    }).catch(async(err) => {
       Sentry.captureException(err);
      if(state.apiCounter === 2){
        dispatch('apiSignOutAction')
      }else{
        if(err.response && err.response.status === 403){
         await dispatch('refreshToken');
         state.apiCounter = 2;
         dispatch('acceptPendingUser',payload);
        }
      }
          console.log(err);
      });
  }, 
  getActivities({commit,dispatch,state},payload){
    commit('setActivityList',null);
    commit('setActivityLoader', true);
    axios.get('/v2/activity/getUserActivities/'+payload)
      .then(responce => {
        if(responce.status === 200){
          commit('setActivityList',responce.data)
          commit('setActivityLoader', false);
          
        }
    }).catch(async(err) => {
      commit('setActivityLoader', false);
       Sentry.captureException(err);
      if(state.apiCounter === 2){
        dispatch('apiSignOutAction')
      }else{
        if(err.response && err.response.status === 403){
         await dispatch('refreshToken');
         state.apiCounter = 2;
         dispatch('getActivities',payload);
        }
      }
          console.log(err);
      })
  }, 
  
  getAllLocations({commit,dispatch}){
    commit('setLocationLoader',true);
    return new Promise(async (resolve, reject) => {
      try{
        const res = await axios.get('/v2/company/getCompanyLocations');
        commit('setAllLocations',res.data)
        
        resolve(res.data);
      }catch(err){
         Sentry.captureException(err);
        commit('setLocationLoader',false);
        console.log(err);
        reject(err)
      }
    });
  }, 
  async getBidDashboard({commit,dispatch}, payload){
    var config = {
      headers: {
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      },
    };
    commit('setPageLoader',true)
    commit('setPageSubLoader',true)
    try{
      const res = await axios.get('v2/bid/getBidList/'+payload,config);
        commit('setBidsList',res.data);
        commit('setPageSubLoader',false);
        commit('setPageLoader',false)
    }catch(err){
       Sentry.captureException(err);
      console.log(err);
      commit('setPageLoader',false)
    }
    
  },
  
}
