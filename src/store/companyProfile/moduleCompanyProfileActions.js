import router from '@/router'
import store from "../../store";
import axios from 'axios'

export default {
  getCompany({commit,dispatch,state}, payload){
    axios.get('company/getCompanyById/'+payload)
     .then(responce => {
      if(responce.status === 200){
        commit('setCompany',responce.data)
        commit('setBasinLoading',false)
        commit('setPageLoader',false)
      }
     
    }).catch(async(err) => {
      if(state.apiCounter === 2){
        
        dispatch('signOutAction')
      }else{
        if(err.response.status === 403){
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
      if(state.apiCounter === 2){
        
        dispatch('signOutAction')
      }else{
        if(err.response.status === 403){
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
    axios.post('/company/updateCompanyProfile/',formData,config)
     .then(responce => {
      
      if(responce.status === 200){
        dispatch("getCompany",payload.companyId)
      }
    }).catch(async(err) => {
      if(state.apiCounter === 2){
        
        dispatch('signOutAction')
      }else{
        if(err.response.status === 403){
         await dispatch('refreshToken');
         state.apiCounter = 2;
         dispatch('companyProfileImg',payload);
        }
      }
          console.log(err);
      });
  },  
  updateBasicProfile({commit,dispatch,state}, payload){
    axios.post('/company/updateBasicProfile/',{'companyId': payload.companyId,'profileName': payload.profileName,'profileSummary': payload.profileSummary})
     .then(responce => {
      
      if(responce.status === 200){
        dispatch("getCompany",payload.companyId)
      }
    }).catch(async(err) => {
      if(state.apiCounter === 2){
        
        dispatch('signOutAction')
      }else{
        if(err.response.status === 403){
         await dispatch('refreshToken');
         state.apiCounter = 2;
         dispatch('updateBasicProfile',payload);
        }
      }
          console.log(err);
      });
  }, 
  addCompanyService({commit,dispatch,state}, payload){
    axios.post('/company/addCompanyService/',{'companyId': payload.companyId,'subCategories': payload.subCategories})
     .then(responce => {
      
      if(responce.status === 200){
        dispatch("getCompany",payload.companyId)
      }
    }).catch(async(err) => {
      if(state.apiCounter === 2){
        
        dispatch('signOutAction')
      }else{
        if(err.response.status === 403){
         await dispatch('refreshToken');
         state.apiCounter = 2;
         dispatch('addCompanyService',payload);
        }
      }
          console.log(err);
      });
  }, 
  addCompanyBasins({commit,dispatch,state}, payload){
    axios.post('/company/addCompanyBasin/',{'companyId': payload.companyId,'basins': payload.basins})
     .then(responce => {
      
      if(responce.status === 200){
        dispatch("getCompany",payload.companyId)
      }
    }).catch(async(err) => {
      console.log(err);
      if(state.apiCounter === 2){
        
        dispatch('signOutAction')
      }else{
        if(err.response.status === 403){
         await dispatch('refreshToken');
         state.apiCounter = 2;
         dispatch('addCompanyBasins',payload);
        }
      }
    });
  }, 
  addCompanyLocation({commit,dispatch,state}, payload){
    axios.post('/company/addCompanyLocation/',{'id': payload.id,'companyId': payload.companyId,'location': payload.location,'lat':payload.lat,'long':payload.long})
     .then(responce => {
      
      if(responce.status === 200){
        dispatch("getCompany",payload.companyId)
      }
    }).catch(async(err) => {
      if(state.apiCounter === 2){
        
        dispatch('signOutAction')
      }else{
        if(err.response.status === 403){
         await dispatch('refreshToken');
         state.apiCounter = 2;
         dispatch('addCompanyLocation',payload);
        }
      }
          console.log(err);
    });
  }, 
  deleteCompanyLocation({commit,dispatch,state}, payload){
    
    axios.post('/company/deleteCompanyLocation/',{'id': payload.id,'companyId': payload.companyId,'location': payload.location,'lat':payload.lat,'long':payload.long})
     .then(responce => {
      
      if(responce.status === 200){
        dispatch("getCompany",payload.companyId)
      }
    }).catch(async(err) => {
      if(state.apiCounter === 2){
        
        dispatch('signOutAction')
      }else{
        if(err.response.status === 403){
         await dispatch('refreshToken');
         state.apiCounter = 2;
         dispatch('deleteCompanyLocation',payload);
        }
      }
          console.log(err);
    });
  }, 
  addCompanyVideos({commit,dispatch,state}, payload){
   
    axios.post('/company/addCompanyVideo/',{'companyId': payload.companyId,'videoLinks': payload.videoLinks})
     .then(responce => {
      
      if(responce.status === 200){
        dispatch("getCompany",payload.companyId)
      }
    }).catch(async(err) => {
      if(state.apiCounter === 2){
        
        dispatch('signOutAction')
      }else{
        if(err.response.status === 403){
         await dispatch('refreshToken');
         state.apiCounter = 2;
         dispatch('addCompanyVideos',payload);
        }
      }
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
    axios.post('/company/addCompanyDocuments/',formData,config)
     .then(responce => {
      
      if(responce.status === 200){
        dispatch("getCompany",payload.companyId)
      }
    }).catch(async(err) => {
      if(state.apiCounter === 2){
        dispatch('signOutAction')
      }else{
        if(err.response.status === 403){
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
    formData.append('corporateDocument[documentId]', payload.corporateDocument.documentId);
    formData.append('corporateDocument[name]', payload.corporateDocument.name);
    formData.append('companyId', payload.companyId);
    axios.post('/company/deleteCompanyDocuments/',formData,config)
     .then(responce => {
      
      if(responce.status === 200){
        dispatch("getCompany",payload.companyId)
      }
    }).catch(async(err) => {
      if(state.apiCounter === 2){
        dispatch('signOutAction')
      }else{
        if(err.response.status === 403){
         await dispatch('refreshToken');
         state.apiCounter = 2;
         dispatch('deleteCompanyDocument',payload);
        }
      }
          console.log(err);
      });
  },
  editCompanyDocument({commit,dispatch,state}, payload){
      axios.post('/company/editCompanyDocumentName/',{'companyId': payload.companyId,'docData': payload.corporateDocument})
       .then(responce => {
        
        if(responce.status === 200){
          dispatch("getCompany",payload.companyId)
        }
      }).catch(async(err) => {
        if(state.apiCounter === 2){
          dispatch('signOutAction')
        }else{
          if(err.response.status === 403){
           await dispatch('refreshToken');
           state.apiCounter = 2;
           dispatch('editCompanyDocument',payload);
          }
        }
            console.log(err);
        });
  },
  addCompanyNews({commit,dispatch,state}, payload){
    
    axios.post('/company/addCompanyNews/',{'companyId': payload.companyId,'corporateNews': payload.corporateNews})
     .then(responce => {
      
      if(responce.status === 200){
        dispatch("getCompany",payload.companyId)
      }
    }).catch(async(err) => {
      if(state.apiCounter === 2){
        dispatch('signOutAction')
      }else{
        if(err.response.status === 403){
         await dispatch('refreshToken');
         state.apiCounter = 2;
         dispatch('addCompanyNews',payload);
        }
      }
          console.log(err);
      });
  },
  addCompanyFacts({commit,dispatch,state}, payload){
    
    axios.post('/company/addCompanyKeyfacts/',{'companyId':payload.companyId,'founded':payload.founded,'employees':payload.employees,'hqlocation':payload.hqLocation,'website':payload.website,'linkedin':payload.linkedin,'careers':payload.careers})
     .then(responce => {
      
      if(responce.status === 200){
        dispatch("getCompany",payload.companyId)
      }
    }).catch(async(err) => {
      if(state.apiCounter === 2){
        dispatch('signOutAction')
      }else{
        if(err.response.status === 403){
         await dispatch('refreshToken');
         state.apiCounter = 2;
         dispatch('addCompanyFacts',payload);
        }
      }
          console.log(err);
      });
  },
  addCompanyContacts({commit,dispatch,state}, payload){
    
    axios.post('/company/addCompanyContact/',{'companyId':payload.companyId,'accountContacts':payload.accountContacts})
     .then(responce => {
      
      if(responce.status === 200){
        dispatch("getCompany",payload.companyId)
      }
    }).catch(async(err) => {
      if(state.apiCounter === 2){
        dispatch('signOutAction')
      }else{
        if(err.response.status === 403){
         await dispatch('refreshToken');
         state.apiCounter = 2;
         dispatch('addCompanyContacts',payload);
        }
      }
          console.log(err);
      });
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
    axios.post('/company/addCompanyLeadership/',formData,config)
     .then(responce => {
      
      if(responce.status === 200){
        dispatch("getCompany",payload.companyId)
      }
    }).catch(async(err) => {
      if(state.apiCounter === 2){
        dispatch('signOutAction')
      }else{
        if(err.response.status === 403){
         await dispatch('refreshToken');
         state.apiCounter = 2;
         dispatch('addCompanyExcutive',payload);
        }
      }
          console.log(err);
      });
  },
  editCompanyExcutive({commit,dispatch,state}, payload){
    // console.log(payload);
    axios.post('/company/updateCompanyLeadership/',{'companyId': payload.companyId, 'leadershipData': payload.leadership})
     .then(responce => {
      
      if(responce.status === 200){
        dispatch("getCompany",payload.companyId)
      }
    }).catch(async(err) => {
      if(state.apiCounter === 2){
        dispatch('signOutAction')
      }else{
        if(err.response.status === 403){
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
    axios.post('/company/deleteCompanyLeadership/',formData,config)
     .then(responce => {
      
      if(responce.status === 200){
        dispatch("getCompany",payload.companyId)
      }
    }).catch(async(err) => {
      if(state.apiCounter === 2){
        dispatch('signOutAction')
      }else{
        if(err.response.status === 403){
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
    
    axios.post('/company/editCompanyDifferentiators/',formData,config)
     .then(responce => {
      
      if(responce.status === 200){
        dispatch("getCompany",payload.companyId)
      }
    }).catch(async(err) => {
      if(state.apiCounter === 2){
        dispatch('signOutAction')
      }else{
        if(err.response.status === 403){
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
    
    axios.post('/company/deleteCompanyDifferentiators/',formData,config)
     .then(responce => {
      
      if(responce.status === 200){
        dispatch("getCompany",payload.companyId)
      }
    }).catch(async(err) => {
      if(state.apiCounter == 2){
        dispatch('signOutAction');
      }else{
        if(err.response.status === 403){
         await dispatch('refreshToken');
         state.apiCounter = 2;
         dispatch('deleteCompanyEsg',payload);
        }
      }
          console.log(err);
      });
  },  

  
}
