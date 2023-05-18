import router from '@/router'
import store from "../../store";
import axios from 'axios'
import * as Sentry from '@sentry/vue';

export default {
  getCompany({commit,dispatch,state}, payload){
    axios.get('v2/company/getCompanyById/'+payload)
     .then(responce => {
      if(responce.status === 200){
        if(responce.data.companyData.accountContacts && responce.data.companyData.accountContacts.length > 0){
          const data = {
            module : 'contacts',
            weight: 8,
            status: 'add'
          }
          commit('setModuleWeight',data);
        }
        if(responce.data.companyData.basins && responce.data.companyData.basins.length > 0){
          const data = {
            module : 'basin',
            weight: 8,
            status: 'add',
          }
          commit('setModuleWeight',data);
        }
        if(responce.data.companyData.companyLocations && responce.data.companyData.companyLocations.length > 0){
          const data = {
            module : 'locations',
            weight: 8,
            status: 'add'
          }
          commit('setModuleWeight',data);
        }else{
          const data = {
            module : 'locations',
            weight: 0,
            status: 'remove'
          }
          commit('setModuleWeight',data);
        }
        if(responce.data.companyData.corporateDocuments && responce.data.companyData.corporateDocuments.length > 0){
          const data = {
            module : 'documents',
            weight: 8,
            status: 'add',
          }
          commit('setModuleWeight',data);
        }else{
          const data = {
            module : 'documents',
            weight: 0,
            status: 'remove',
          }
          commit('setModuleWeight',data);
        }
        if(responce.data.companyData.corporateNews && responce.data.companyData.corporateNews.length > 0){
          const data = {
            module : 'news',
            weight: 8,
            status: 'add',
          }
          commit('setModuleWeight',data);
        }
        if(responce.data.companyData.corporateVideos && responce.data.companyData.corporateVideos.length > 0){
          const data = {
            module : 'videos',
            weight: 8,
            status: 'add',
          }
          commit('setModuleWeight',data);
        }
        if(responce.data.companyData.esgInitiatives && responce.data.companyData.esgInitiatives.length > 0){
          const data = {
            module : 'esg',
            weight: 8,
            status: 'add',
          }
          commit('setModuleWeight',data);
        }
        if(responce.data.companyData.executiveLeadership && responce.data.companyData.executiveLeadership.length > 0){
          const data = {
            module : 'excutive',
            weight: 8,
            status: 'add',
          }
          commit('setModuleWeight',data);
        }else{
          const data = {
            module : 'excutive',
            weight: 0,
            status: 'remove',
          }
          commit('setModuleWeight',data);
        }
        if(responce.data.companyData.image){
          const data = {
            module : 'logo',
            weight: 8,
            status: 'add',
          }
          commit('setModuleWeight',data);
        }
        if(responce.data.companyData.services && responce.data.companyData.services.length > 0){
          const data = {
            module : 'services',
            weight: 10,
            status: 'add',
          }
          commit('setModuleWeight',data);
        }
        commit('setCompany',responce.data)
        commit('setBasinLoading',false)
        commit('setPageLoader',false)
      }
     
    }).catch(async(err) => {
      Sentry.captureException(err);
      if(state.apiCounter === 2){
        
        dispatch('apiSignOutAction')
      }else{
        if(err.response && err.response.status === 403){
         await dispatch('refreshToken');
         state.apiCounter = 2;
         dispatch('getCompany',payload);
        }
      }
      console.log(err);
    });
  },
  getSubCategories({commit,dispatch,state}, payload){
    axios.get('serviceCategory/getSubCategories/'+payload)
     .then(responce => {
      
      if(responce.status === 200){
        commit('setSubCategories',responce.data)
      }
    }).catch(async(err) => {
      Sentry.captureException(err);
      if(state.apiCounter === 2){
        
        dispatch('apiSignOutAction')
      }else{
        if(err.response && err.response.status === 403){
         await dispatch('refreshToken');
         state.apiCounter = 2;
         dispatch('getSubCategories',payload);
        }
      }
      console.log(err);
    });
  },
  companyProfileImg({commit,dispatch,state}, payload){
    var config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      },
    };
    const formData = new FormData()
    formData.append('files', payload.files);
    formData.append('companyId', payload.companyId);
    axios.post('v2/company/updateCompanyProfile/',formData,config)
     .then(responce => {
      
      if(responce.status === 200){
        dispatch("getCompany",payload.companyId)
        commit('setProgressCount',9);
        commit('setModuleCOunt',1);
        if(payload.files != ''){
          const data = {
            module : 'logo',
            weight: 8,
            status: 'add',
          }
          commit('setModuleWeight',data);
        }else{
         const data = {
           module : 'logo',
           weight: 8,
           status: 'remove',
         }
         commit('setModuleWeight',data); 
        }
      }
    }).catch(async(err) => {
      Sentry.captureException(err);
      if(state.apiCounter === 2){
        
        dispatch('apiSignOutAction')
      }else{
        if(err.response && err.response.status === 403){
         await dispatch('refreshToken');
         state.apiCounter = 2;
         dispatch('companyProfileImg',payload);
        }
      }
          console.log(err);
      });
  },  
  updateBasicProfile({commit,dispatch,state}, payload){
    commit('setSaveInfoLoading',true);
    axios.post('v2/company/updateBasicProfile/',{'userId': payload.userId,'companyId': payload.companyId,'profileName': payload.profileName,'profileSummary': payload.profileSummary})
     .then(responce => {
      
      if(responce.status === 200){
        dispatch("getCompany",payload.companyId)
        commit('setSaveInfoLoading',false);
      }
    }).catch(async(err) => {
      Sentry.captureException(err);
      commit('setSaveInfoLoading',false);
      if(state.apiCounter === 2){
        
        dispatch('apiSignOutAction')
      }else{
        if(err.response && err.response.status === 403){
         await dispatch('refreshToken');
         state.apiCounter = 2;
         dispatch('updateBasicProfile',payload);
        }
        if(err.response.status === 400){
          state.basicError = true;
        }
      }
      commit('setManageCompanyError','Something went wrong.Please try again in few moments.');
          console.log(err);
      });
  }, 
  addCompanyService({commit,dispatch,state}, payload){
    axios.post('v2/company/addCompanyService/',{'companyId': payload.companyId,'subCategories': payload.subCategories})
     .then(responce => {
      
      if(responce.status === 200){
        if(payload.subCategories.length > 0){
          const data = {
            module : 'services',
            weight: 10,
            status: 'add',
          }
          commit('setModuleWeight',data);
        }else{
          const data = {
            module : 'services',
            weight: 10,
            status: 'remove'
          }
          commit('setModuleWeight',data);
        }
        dispatch("getCompany",payload.companyId)
      }
    }).catch(async(err) => {
      Sentry.captureException(err);
      if(state.apiCounter === 2){
        
        dispatch('apiSignOutAction')
      }else{
        if(err.response && err.response.status === 403){
         await dispatch('refreshToken');
         state.apiCounter = 2;
         dispatch('addCompanyService',payload);
        }
      }
          console.log(err);
      });
  }, 
  addCompanyBasins({commit,dispatch,state}, payload){
    axios.post('v2/company/addCompanyBasin/',{'companyId': payload.companyId,'basins': payload.basins})
     .then(responce => {
      
      if(responce.status === 200){
        if(payload.basins.length > 0){
          const data = {
            module : 'basin',
            weight: 8,
            status: 'add',
          }
          commit('setModuleWeight',data);
        }else{
          const data = {
            module : 'basin',
            weight: 8,
            status: 'remove'
          }
          commit('setModuleWeight',data);
        }
        
        dispatch("getCompany",payload.companyId)
      }
    }).catch(async(err) => {
      Sentry.captureException(err);
      console.log(err);
      if(state.apiCounter === 2){
        
        dispatch('apiSignOutAction')
      }else{
        if(err.response && err.response.status === 403){
         await dispatch('refreshToken');
         state.apiCounter = 2;
         dispatch('addCompanyBasins',payload);
        }
      }
    });
  }, 
  addCompanyLocation({commit,dispatch,state}, payload){
    axios.post('v2/company/addCompanyLocation/',{'id': payload.id,'companyId': payload.companyId,'location': payload.location,'lat':payload.lat,'long':payload.long})
     .then(responce => {
      
      if(responce.status === 200){
        const data = {
          module : 'locations',
          weight: 8,
          status: 'add'
        }
        commit('setModuleWeight',data);
        dispatch("getCompany",payload.companyId)
      }
    }).catch(async(err) => {
      Sentry.captureException(err);
      if(state.apiCounter === 2){
        
        dispatch('apiSignOutAction')
      }else{
        if(err.response && err.response.status === 403){
         await dispatch('refreshToken');
         state.apiCounter = 2;
         dispatch('addCompanyLocation',payload);
        }
      }
          console.log(err);
    });
  }, 
  deleteCompanyLocation({commit,dispatch,state}, payload){
    
    axios.post('v2/company/deleteCompanyLocation/',{'id': payload.id,'companyId': payload.companyId,'location': payload.location,'lat':payload.lat,'long':payload.long})
     .then(responce => {
      
      if(responce.status === 200){
        dispatch("getCompany",payload.companyId)
      }
    }).catch(async(err) => {
      Sentry.captureException(err);
      if(state.apiCounter === 2){
        
        dispatch('apiSignOutAction')
      }else{
        if(err.response && err.response.status === 403){
         await dispatch('refreshToken');
         state.apiCounter = 2;
         dispatch('deleteCompanyLocation',payload);
        }
      }
          console.log(err);
    });
  }, 
  addCompanyVideos({commit,dispatch,state}, payload){
    commit('setNewsLoading',true);
    axios.post('v2/company/addCompanyVideo/',{'companyId': payload.companyId,'videoLinks': payload.videoLinks})
     .then(responce => {
      
      if(responce.status === 200){
        if(payload.videoLinks.length > 0){
          const data = {
            module : 'videos',
            weight: 8,
            status: 'add',
          }
          commit('setModuleWeight',data);
        }else{
          const data = {
            module : 'videos',
            weight: 8,
            status: 'remove',
          }
          commit('setModuleWeight',data);
        }  
        dispatch("getCompany",payload.companyId)
        commit('setNewsLoading',false)
      }
    }).catch(async(err) => {
      Sentry.captureException(err);
      commit('setNewsLoading',false);
      if(state.apiCounter === 2){
        
        dispatch('apiSignOutAction')
      }else{
        if(err.response && err.response.status === 403){
         await dispatch('refreshToken');
         state.apiCounter = 2;
         dispatch('addCompanyVideos',payload);
        }
      }
      commit('setManageCompanyError','Something went wrong.Please try again in few moments.');
          console.log(err);
      });
  },
  addCompanyDocument({commit,dispatch,state}, payload){
    var config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      },
    };
    const formData = new FormData()

    formData.append('files', payload.files);
    formData.append('companyId', payload.companyId);
    formData.append('name', payload.name);
    formData.append('documentId', payload.documentId);
    axios.post('v2/company/addCompanyDocuments/',formData,config)
     .then(responce => {
      
      if(responce.status === 200){
        const data = {
          module : 'documents',
          weight: 8,
          status: 'add',
        }
        commit('setModuleWeight',data);
        dispatch("getCompany",payload.companyId)
      }
    }).catch(async(err) => {
      Sentry.captureException(err);
      if(state.apiCounter === 2){
        dispatch('apiSignOutAction')
      }else{
        if(err.response && err.response.status === 403){
         await dispatch('refreshToken');
         state.apiCounter = 2;
         dispatch('addCompanyDocument',payload);
        }
      }
          console.log(err);
    });
  },
  deleteCompanyDocument({commit,dispatch,state}, payload){
    var config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      },
    };
    const formData = new FormData()

    formData.append('corporateDocument[attachment]', payload.corporateDocument.attachment);
    formData.append('corporateDocument[documentId]', payload.corporateDocument._id);
    formData.append('corporateDocument[name]', payload.corporateDocument.name);
    formData.append('companyId', payload.companyId);
    axios.post('v2/company/deleteCompanyDocuments/',formData,config)
     .then(responce => {
      
      if(responce.status === 200){
        dispatch("getCompany",payload.companyId)
      }
    }).catch(async(err) => {
      Sentry.captureException(err);
      if(state.apiCounter === 2){
        dispatch('apiSignOutAction')
      }else{
        if(err.response && err.response.status === 403){
         await dispatch('refreshToken');
         state.apiCounter = 2;
         dispatch('deleteCompanyDocument',payload);
        }
      }
          console.log(err);
      });
  },
  editCompanyDocument({commit,dispatch,state}, payload){
      axios.post('v2/company/editCompanyDocumentName/',{'companyId': payload.companyId,'docData': payload.corporateDocument})
       .then(responce => {
        
        if(responce.status === 200){
          dispatch("getCompany",payload.companyId)
        }
      }).catch(async(err) => {
        Sentry.captureException(err);
        if(state.apiCounter === 2){
          dispatch('apiSignOutAction')
        }else{
          if(err.response && err.response.status === 403){
           await dispatch('refreshToken');
           state.apiCounter = 2;
           dispatch('editCompanyDocument',payload);
          }
        }
            console.log(err);
        });
  },
  addCompanyNews({commit,dispatch,state}, payload){
    commit('setNewsLoading',true);
    axios.post('v2/company/addCompanyNews/',{'companyId': payload.companyId,'corporateNews': payload.corporateNews})
     .then(responce => {
      
      if(responce.status === 200){
        if(payload.corporateNews.length > 0){
          const data = {
            module : 'news',
            weight: 8,
            status: 'add',
          }
          commit('setModuleWeight',data);
        }else{
          const data = {
            module : 'news',
            weight: 8,
            status: 'remove',
          }
          commit('setModuleWeight',data);
        }
        
        dispatch("getCompany",payload.companyId)
        commit('setNewsLoading',false)
      }
    }).catch(async(err) => {
      Sentry.captureException(err);
      commit('setNewsLoading',false);
      if(state.apiCounter === 2){
        dispatch('apiSignOutAction')
      }else{
        if(err.response && err.response.status === 403){
         await dispatch('refreshToken');
         state.apiCounter = 2;
         dispatch('addCompanyNews',payload);
        }
      }
      commit('setManageCompanyError','Something went wrong.Please try again in few moments.');
          console.log(err);
      });
  },
  addCompanyFacts({commit,dispatch,state}, payload){
    commit('setKeyFactsLoading',true);
    axios.post('v2/company/addCompanyKeyfacts/',{'companyId':payload.companyId,'founded':payload.founded,'employees':payload.employees,'hqlocation':payload.hqLocation,'website':payload.website,'linkedin':payload.linkedin,'careers':payload.careers})
     .then(responce => {
      
      if(responce.status === 200){
        const data = {
          module : 'facts',
          weight: 8,
          status: 'add',
        }
        commit('setModuleWeight',data);
        dispatch("getCompany",payload.companyId)
        commit('setKeyFactsLoading',false)
      }
    }).catch(async(err) => {
      Sentry.captureException(err);
      commit('setKeyFactsLoading',false);
      if(state.apiCounter === 2){
        dispatch('apiSignOutAction')
      }else{
        if(err.response && err.response.status === 403){
         await dispatch('refreshToken');
         state.apiCounter = 2;
         dispatch('addCompanyFacts',payload);
        }
      }
      commit('setManageCompanyError','Something went wrong.Please try again in few moments.');
          console.log(err);
      });
  },
  async addCompanyContacts({commit,dispatch,state}, payload){
    try{
      commit('setBasinLoading',true)
    const res = await axios.post('v2/company/addCompanyContact/',{'companyId':payload.companyId,'accountContacts':payload.accountContacts});
     
      if(res.status === 200){
        if(payload.accountContacts.length > 0){
          const data = {
            module : 'contacts',
            weight: 8,
            status: 'add'
          }
          commit('setModuleWeight',data);
        }else{
          const data = {
            module : 'contacts',
            weight: 8,
            status: 'remove'
          }
          commit('setModuleWeight',data);
        }
        await dispatch("getCompany",payload.companyId)
      }
    } catch (err) {
      Sentry.captureException(err);
      if(state.apiCounter === 2){
        dispatch('apiSignOutAction')
      }else{
        if(err.response && err.response.status === 403){
         await dispatch('refreshToken');
         state.apiCounter = 2;
         await dispatch('addCompanyContacts',payload);
        }
      }
    } 
  },
  addCompanyExcutive({commit,dispatch,state}, payload){
    var config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      },
    };
    const formData = new FormData()
    formData.append('executiveLeadership[name]', payload.executiveLeadership.name);
    formData.append('executiveLeadership[role]', payload.executiveLeadership.role);
    formData.append('executiveLeadership[linkedin]', payload.executiveLeadership.linkedin);
    formData.append('executiveLeadership[profilePicture]', payload.executiveLeadership.profilePicture);
    formData.append('executiveLeadership[id]', payload.executiveLeadership.id);
    formData.append('executiveLeadership[orderNumber]', payload.executiveLeadership.orderNumber);
    formData.append('companyId', payload.companyId);
    axios.post('v2/company/addCompanyLeadership/',formData,config)
     .then(responce => {
      
      if(responce.status === 200){
        const data = {
          module : 'excutive',
          weight: 8,
          status: 'add',
        }
        commit('setModuleWeight',data);
        dispatch("getCompany",payload.companyId)
      }
    }).catch(async(err) => {
      Sentry.captureException(err);
      if(state.apiCounter === 2){
        dispatch('apiSignOutAction')
      }else{
        if(err.response && err.response.status === 403){
         await dispatch('refreshToken');
         state.apiCounter = 2;
         dispatch('addCompanyExcutive',payload);
        }
      }
          console.log(err);
      });
  },
  editCompanyExcutive({commit,dispatch,state}, payload){
  
    axios.post('v2/company/updateCompanyLeadership/',{'companyId': payload.companyId, 'leadershipData': payload.leadership})
     .then(responce => {
      
      if(responce.status === 200){
        dispatch("getCompany",payload.companyId)
      }
    }).catch(async(err) => {
      Sentry.captureException(err);
      if(state.apiCounter === 2){
        dispatch('apiSignOutAction')
      }else{
        if(err.response && err.response.status === 403){
         await dispatch('refreshToken');
         state.apiCounter = 2;
         dispatch('editCompanyExcutive',payload);
        }
      }
          console.log(err);
      });
  },
  deleteCompanyExcutive({commit,dispatch,state}, payload){
    var config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      },
    };
    const formData = new FormData()
    formData.append('executiveLeadership[name]', payload.executiveLeadership.name);
    formData.append('executiveLeadership[role]', payload.executiveLeadership.role);
    formData.append('executiveLeadership[linkedin]', payload.executiveLeadership.linkedin);
    formData.append('executiveLeadership[profilePicture]', payload.executiveLeadership.profilePicture);
    formData.append('executiveLeadership[id]', payload.executiveLeadership.id);
    formData.append('executiveLeadership[orderNumber]', payload.executiveLeadership.orderNumber);
    formData.append('companyId', payload.companyId);
    axios.post('v2/company/deleteCompanyLeadership/',formData,config)
     .then(responce => {
      
      if(responce.status === 200){
        dispatch("getCompany",payload.companyId)
      }
    }).catch(async(err) => {
      Sentry.captureException(err);
      if(state.apiCounter === 2){
        dispatch('apiSignOutAction')
      }else{
        if(err.response && err.response.status === 403){
         await dispatch('refreshToken');
         state.apiCounter = 2;
         dispatch('deleteCompanyExcutive',payload);
        }
      }
          console.log(err);
      });
  },
  addCompanyEsg({commit,dispatch,state}, payload){
    var config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      },
    };
    const formData = new FormData()
    formData.append('companyId', payload.companyId);
    formData.append('esgInitiatives[name]', payload.esgInitiatives.name);
    formData.append('esgInitiatives[description]', payload.esgInitiatives.description);
    if(payload.esgInitiatives.attachment != ''){
      formData.append('esgInitiatives[attachment]', payload.esgInitiatives.attachment);
    }
    formData.append('esgInitiatives[id]', payload.esgInitiatives.id);
    formData.append('esgInitiatives[type]', payload.esgInitiatives.type);
    
    axios.post('v2/company/editCompanyDifferentiators/',formData,config)
     .then(responce => {
      
      if(responce.status === 200){
        const data = {
          module : 'esg',
          weight: 8,
          status: 'add',
        }
        commit('setModuleWeight',data);
        dispatch("getCompany",payload.companyId)
      }
    }).catch(async(err) => {
      Sentry.captureException(err);
      if(state.apiCounter === 2){
        dispatch('apiSignOutAction')
      }else{
        if(err.response && err.response.status === 403){
         await dispatch('refreshToken');
         state.apiCounter = 2;
         dispatch('addCompanyEsg',payload);
        }
      }
          console.log(err);
      });
  }, 
  deleteCompanyEsg({commit,dispatch,state}, payload){
    var config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      },
    };
    const formData = new FormData()
    formData.append('companyId', payload.companyId);
    formData.append('esgInitiatives[name]', payload.esgInitiatives.name);
    formData.append('esgInitiatives[description]', payload.esgInitiatives.description);
    formData.append('esgInitiatives[attachment]', payload.esgInitiatives.attachment);
    formData.append('esgInitiatives[id]', payload.esgInitiatives.id);
    formData.append('esgInitiatives[type]', payload.esgInitiatives.type);
    
    axios.post('v2/company/deleteCompanyDifferentiators/',formData,config)
     .then(responce => {
      
      if(responce.status === 200){
        dispatch("getCompany",payload.companyId)
      }
    }).catch(async(err) => {
      Sentry.captureException(err);
      if(state.apiCounter == 2){
        dispatch('apiSignOutAction');
      }else{
        if(err.response && err.response.status === 403){
         await dispatch('refreshToken');
         state.apiCounter = 2;
         dispatch('deleteCompanyEsg',payload);
        }
      }
          console.log(err);
      });
  },  

  
}
