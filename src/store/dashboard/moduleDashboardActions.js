import router from '@/router'
import axios from 'axios'

export default {

  pendingUserCount({commit,dispatch,state},payload){
    axios.get('/user/getQueueUsersCount/'+payload)
      .then(responce => {
        
        if(responce.status === 200){
          commit('setPendingCount',responce.data.size)
        }
      
    }).catch(async(err) => {
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
    axios.get('/company/getCompanyInvitedUsers/'+ payload)
      .then(responce => {
        
        if(responce.status === 200){
          commit('setInvitedUsersList',responce.data)
        }
    }).catch(async(err) => {
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
    const name = decodeURIComponent(payload);
    axios.get('/company/getUsersByCompany/'+ name)
      .then(responce => {
        if(responce.status === 200){
          commit('getUsersList',responce.data)
        }
    }).catch(async(err) => {
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
    axios.get('/company/getCompanyInvitedUsers/'+ payload)
      .then(responce => {
        
        if(responce.status === 200){
          commit('setInvitedUsersList',responce.data)
        }
    }).catch(async(err) => {
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
    axios.get('/company/disableUser/'+ payload)
      .then(responce => {
        
        if(responce.status === 200){
          commit('setStatusMessage', 'User disabled sucessfully!')
          commit('setUserStatus',false)
          commit('showErrorAlert')
          router.replace({ name: "DisabledUsers" });
        }
    }).catch(async(err) => {
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

  enableUser({commit,dispatch,state},payload){
    axios.get('/company/enableUser/'+payload)
      .then(responce => {
        
        if(responce.status === 200){
          commit('setStatusMessage','User enabled sucessfully!')
          commit('setUserStatus',true)
          commit('showErrorAlert')
          router.replace({ name: "ManageUsers" });
        }
    }).catch(async(err) => {
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
    axios.post('/user/acceptPendingUser/',{ 'userId':payload.user.id, 'email': payload.user.email,'firstName':payload.user.firstName,'lastName':payload.user.lastName,'companyId':payload.user.companyId,'phoneNumber':payload.user.phoneNumber,'title':payload.user.title,'role': 'user'})
      .then(responce => {
      
      if(responce.status === 200){
        commit('setStatusMessage','User accepted sucessfully!')
        commit('showErrorAlert')
        dispatch('manageUsers',payload.companyName)
        dispatch('getPendingUsers',payload.user.companyId)
      }
    }).catch(async(err) => {
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
    
    axios.get('/activity/getActivities/'+payload)
      .then(responce => {
        
        if(responce.status === 200){
          commit('setActivityList',responce.data)
          commit('setPageLoader', false);
          // commit('setPageSubLoader', false);
        }
    }).catch(async(err) => {
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
    return new Promise(async (resolve, reject) => {
      try{
        const res = await axios.get('/company/getCompanyLocations');
        commit('setAllLocations',res.data)
        resolve(res.data);
      }catch(err){
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
      const res = await axios.get('bid/getBidList/'+payload,config);
        commit('setBidsList',res.data);
        await dispatch('getActivities',payload);
        commit('setPageSubLoader',false);
    }catch(err){
      console.log(err);
    }
    
  },
  
}