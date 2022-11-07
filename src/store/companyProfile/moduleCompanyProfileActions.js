import router from '@/router'
import store from "../../store";
import axios from 'axios'

export default {
  async getCompany({commit}, payload){
    await axios.get('company/getCompanyById/'+payload)
     .then(responce => {
      commit('setCompany',responce.data)
      localStorage.setItem('companyData', JSON.stringify(responce.data));
    }).catch(err => {
          console.log(err);
      });
  },
  async getSubCategories({commit}, payload){
    await axios.get('serviceCategory/getSubCategories/'+payload)
     .then(responce => {
      commit('setSubCategories',responce.data)
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
      dispatch("getCompany",payload.companyId)
    }).catch(err => {
          console.log(err);
      });
  },  
  updateBasicProfile({commit,dispatch}, payload){
    axios.post('/company/updateBasicProfile/',{'companyId': payload.companyId,'profileName': payload.profileName,'profileSummary': payload.profileSummary})
     .then(responce => {
      dispatch("getCompany",payload.companyId)
    }).catch(err => {
          console.log(err);
      });
  }, 
  addCompanyService({commit,dispatch}, payload){
    axios.post('/company/addCompanyService/',{'companyId': payload.companyId,'subCategories': payload.subCategories})
     .then(responce => {
      dispatch("getCompany",payload.companyId)
    }).catch(err => {
          console.log(err);
      });
  }, 
  addCompanyBasins({commit,dispatch}, payload){
    axios.post('/company/addCompanyBasin/',{'companyId': payload.companyId,'basins': payload.basins})
     .then(responce => {
      dispatch("getCompany",payload.companyId)
    })
  }, 
  addCompanyLocation({commit,dispatch}, payload){
    axios.post('/company/addCompanyLocation/',{'id': payload.id,'companyId': payload.companyId,'location': payload.location,'lat':payload.lat,'long':payload.long})
     .then(responce => {
      dispatch("getCompany",payload.companyId)
    }).catch(err => {
          console.log(err);
      });
  }, 
  deleteCompanyLocation({commit,dispatch}, payload){
    
    axios.post('/company/deleteCompanyLocation/',{'id': payload.id,'companyId': payload.companyId,'location': payload.location,'lat':payload.lat,'long':payload.long})
     .then(responce => {
      dispatch("getCompany",payload.companyId)
    }).catch(err => {
          console.log(err);
      });
  }, 
  addCompanyVideos({commit,dispatch}, payload){
   
    axios.post('/company/addCompanyVideo/',{'companyId': payload.companyId,'videoLinks': payload.videoLinks})
     .then(responce => {
      dispatch("getCompany",payload.companyId)
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
      dispatch("getCompany",payload.companyId)
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
    formData.append('companyId', payload.companyId);
    axios.post('/company/deleteCompanyDocuments/',formData,config)
     .then(responce => {
      dispatch("getCompany",payload.companyId)
    }).catch(err => {
          console.log(err);
      });
  },
  editCompanyDocument({commit,dispatch}, payload){
       console.log(payload);
  },
  addCompanyNews({commit,dispatch}, payload){
    
    axios.post('/company/addCompanyNews/',{'companyId': payload.companyId,'corporateNews': payload.corporateNews})
     .then(responce => {
      dispatch("getCompany",payload.companyId)
    }).catch(err => {
          console.log(err);
      });
  },
  addCompanyFacts({commit,dispatch}, payload){
    
    axios.post('/company/addCompanyKeyfacts/',{'companyId':payload.companyId,'founded':payload.founded,'employees':payload.employees,'hqlocation':payload.hqLocation,'stockPrice':payload.stockPrice,'website':payload.website,'linkedin':payload.linkedin,'careers':payload.careers})
     .then(responce => {
      dispatch("getCompany",payload.companyId)
    }).catch(err => {
          console.log(err);
      });
  },
  addCompanyContacts({commit,dispatch}, payload){
    
    axios.post('/company/addCompanyContact/',{'companyId':payload.companyId,'accountContacts':payload.accountContacts})
     .then(responce => {
      dispatch("getCompany",payload.companyId)
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
    formData.append('companyId', payload.companyId);
    axios.post('/company/addCompanyLeadership/',formData,config)
     .then(responce => {
      dispatch("getCompany",payload.companyId)
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
    formData.append('companyId', payload.companyId);
    axios.post('/company/deleteCompanyLeadership/',formData,config)
     .then(responce => {
      dispatch("getCompany",payload.companyId)
    }).catch(err => {
          console.log(err);
      });
  },
  addCompanyEsg({commit,dispatch}, payload){
    console.log(payload);
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
    
    axios.post('/company/editCompanyDifferentiators/',formData,config)
     .then(responce => {
      dispatch("getCompany",payload.companyId)
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
      dispatch("getCompany",payload.companyId)
    }).catch(err => {
          console.log(err);
      });
  },  

  
}
