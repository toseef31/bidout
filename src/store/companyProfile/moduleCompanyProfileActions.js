import router from '@/router'
import store from "../../store";
import axios from 'axios'

export default {
  getCompany({commit,dispatch}, payload){
    axios.get('company/getCompanyById/'+payload)
     .then(responce => {
      if(responce.status === 403){
       dispatch('refreshToken');
       dispatch('getCompany',payload);
      }
      if(responce.status === 200){
        commit('setCompany',responce.data)
        commit('setBasinLoading',false)
        commit('setPageLoader',false)
      }
     
    }).catch(err => {
          console.log(err);
      });
  },
  async getSubCategories({commit,dispatch}, payload){
    await axios.get('serviceCategory/getSubCategories/'+payload)
     .then(responce => {
      if(responce.status === 403){
       dispatch('refreshToken');
       dispatch('getSubCategories',payload);
      }
      if(responce.status === 200){
        commit('setSubCategories',responce.data)
      }
    }).catch(err => {
          console.log(err);
      });
  },
  companyProfileImg({commit,dispatch}, payload){
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
      if(responce.status === 403){
       dispatch('refreshToken');
       dispatch('companyProfileImg',payload);
      }
      if(responce.status === 200){
        dispatch("getCompany",payload.companyId)
      }
    }).catch(err => {
          console.log(err);
      });
  },  
  updateBasicProfile({commit,dispatch}, payload){
    axios.post('/company/updateBasicProfile/',{'companyId': payload.companyId,'profileName': payload.profileName,'profileSummary': payload.profileSummary})
     .then(responce => {
      if(responce.status === 403){
       dispatch('refreshToken');
       dispatch('updateBasicProfile',payload);
      }
      if(responce.status === 200){
        dispatch("getCompany",payload.companyId)
      }
    }).catch(err => {
          console.log(err);
      });
  }, 
  addCompanyService({commit,dispatch}, payload){
    axios.post('/company/addCompanyService/',{'companyId': payload.companyId,'subCategories': payload.subCategories})
     .then(responce => {
      if(responce.status === 403){
       dispatch('refreshToken');
       dispatch('addCompanyService',payload);
      }
      if(responce.status === 200){
        dispatch("getCompany",payload.companyId)
      }
    }).catch(err => {
          console.log(err);
      });
  }, 
  addCompanyBasins({commit,dispatch}, payload){
    axios.post('/company/addCompanyBasin/',{'companyId': payload.companyId,'basins': payload.basins})
     .then(responce => {
      if(responce.status === 403){
       dispatch('refreshToken');
       dispatch('addCompanyBasins',payload);
      }
      if(responce.status === 200){
        dispatch("getCompany",payload.companyId)
      }
    })
  }, 
  addCompanyLocation({commit,dispatch}, payload){
    axios.post('/company/addCompanyLocation/',{'id': payload.id,'companyId': payload.companyId,'location': payload.location,'lat':payload.lat,'long':payload.long})
     .then(responce => {
      if(responce.status === 403){
       dispatch('refreshToken');
       dispatch('addCompanyLocation',payload);
      }
      if(responce.status === 200){
        dispatch("getCompany",payload.companyId)
      }
    }).catch(err => {
          console.log(err);
      });
  }, 
  deleteCompanyLocation({commit,dispatch}, payload){
    
    axios.post('/company/deleteCompanyLocation/',{'id': payload.id,'companyId': payload.companyId,'location': payload.location,'lat':payload.lat,'long':payload.long})
     .then(responce => {
      if(responce.status === 403){
       dispatch('refreshToken');
       dispatch('deleteCompanyLocation',payload);
      }
      if(responce.status === 200){
        dispatch("getCompany",payload.companyId)
      }
    }).catch(err => {
          console.log(err);
      });
  }, 
  addCompanyVideos({commit,dispatch}, payload){
   
    axios.post('/company/addCompanyVideo/',{'companyId': payload.companyId,'videoLinks': payload.videoLinks})
     .then(responce => {
      if(responce.status === 403){
       dispatch('refreshToken');
       dispatch('addCompanyVideos',payload);
      }
      if(responce.status === 200){
        dispatch("getCompany",payload.companyId)
      }
    }).catch(err => {
          console.log(err);
      });
  },
  addCompanyDocument({commit,dispatch}, payload){
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
      if(responce.status === 403){
       dispatch('refreshToken');
       dispatch('addCompanyDocument',payload);
      }
      if(responce.status === 200){
        dispatch("getCompany",payload.companyId)
      }
    }).catch(err => {
          console.log(err);
      });
  },
  deleteCompanyDocument({commit,dispatch}, payload){
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
      if(responce.status === 403){
       dispatch('refreshToken');
       dispatch('deleteCompanyDocument',payload);
      }
      if(responce.status === 200){
        dispatch("getCompany",payload.companyId)
      }
    }).catch(err => {
          console.log(err);
      });
  },
  editCompanyDocument({commit,dispatch}, payload){
    console.log(payload);
      axios.post('/company/editCompanyDocumentName/',{'companyId': payload.companyId,'docData': payload.corporateDocument})
       .then(responce => {
        if(responce.status === 403){
         dispatch('refreshToken');
         dispatch('editCompanyDocument',payload);
        }
        if(responce.status === 200){
          dispatch("getCompany",payload.companyId)
        }
      }).catch(err => {
            console.log(err);
        });
  },
  addCompanyNews({commit,dispatch}, payload){
    
    axios.post('/company/addCompanyNews/',{'companyId': payload.companyId,'corporateNews': payload.corporateNews})
     .then(responce => {
      if(responce.status === 403){
       dispatch('refreshToken');
       dispatch('addCompanyNews',payload);
      }
      if(responce.status === 200){
        dispatch("getCompany",payload.companyId)
      }
    }).catch(err => {
          console.log(err);
      });
  },
  addCompanyFacts({commit,dispatch}, payload){
    
    axios.post('/company/addCompanyKeyfacts/',{'companyId':payload.companyId,'founded':payload.founded,'employees':payload.employees,'hqlocation':payload.hqLocation,'website':payload.website,'linkedin':payload.linkedin,'careers':payload.careers})
     .then(responce => {
      if(responce.status === 403){
       dispatch('refreshToken');
       dispatch('addCompanyFacts',payload);
      }
      if(responce.status === 200){
        dispatch("getCompany",payload.companyId)
      }
    }).catch(err => {
          console.log(err);
      });
  },
  addCompanyContacts({commit,dispatch}, payload){
    
    axios.post('/company/addCompanyContact/',{'companyId':payload.companyId,'accountContacts':payload.accountContacts})
     .then(responce => {
      if(responce.status === 403){
       dispatch('refreshToken');
       dispatch('addCompanyContacts',payload);
      }
      if(responce.status === 200){
        dispatch("getCompany",payload.companyId)
      }
    }).catch(err => {
          console.log(err);
      });
  },
  addCompanyExcutive({commit,dispatch}, payload){
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
      if(responce.status === 403){
       dispatch('refreshToken');
       dispatch('addCompanyExcutive',payload);
      }
      if(responce.status === 200){
        dispatch("getCompany",payload.companyId)
      }
    }).catch(err => {
          console.log(err);
      });
  },
  editCompanyExcutive({commit,dispatch}, payload){
    // console.log(payload);
    axios.post('/company/updateCompanyLeadership/',{'companyId': payload.companyId, 'leadershipData': payload.leadership})
     .then(responce => {
      if(responce.status === 403){
       dispatch('refreshToken');
       dispatch('editCompanyExcutive',payload);
      }
      if(responce.status === 200){
        dispatch("getCompany",payload.companyId)
      }
    }).catch(err => {
          console.log(err);
      });
  },
  deleteCompanyExcutive({commit,dispatch}, payload){
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
      if(responce.status === 403){
       dispatch('refreshToken');
       dispatch('deleteCompanyExcutive',payload);
      }
      if(responce.status === 200){
        dispatch("getCompany",payload.companyId)
      }
    }).catch(err => {
          console.log(err);
      });
  },
  addCompanyEsg({commit,dispatch}, payload){
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
      if(responce.status === 403){
       dispatch('refreshToken');
       dispatch('addCompanyEsg',payload);
      }
      if(responce.status === 200){
        dispatch("getCompany",payload.companyId)
      }
    }).catch(err => {
          console.log(err);
      });
  }, 
  deleteCompanyEsg({commit,dispatch}, payload){
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
      if(responce.status === 403){
       dispatch('refreshToken');
       dispatch('deleteCompanyEsg',payload);
      }
      if(responce.status === 200){
        dispatch("getCompany",payload.companyId)
      }
    }).catch(err => {
          console.log(err);
      });
  },  

  
}
