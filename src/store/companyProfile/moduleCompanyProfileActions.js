import router from '@/router'
import store from "../../store";
import axios from 'axios'

export default {
  getCompany({commit}, payload){
    axios.get('company/getCompanyById/'+payload)
     .then(responce => {
      commit('setCompany',responce.data)
      localStorage.setItem('companyData', JSON.stringify(responce.data));
    })
  },
  getSubCategories({commit}, payload){
    console.log(payload);
    axios.get('serviceCategory/getSubCategories/'+payload)
     .then(responce => {
      console.log(responce);
      commit('setSubCategories',responce.data)
    })
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
    })
  },  
  updateBasicProfile({commit,dispatch}, payload){
    var config = {
      headers: {
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      },
    };
    axios.post('/company/updateBasicProfile/',{'companyId': payload.companyId,'profileName': payload.profileName,'profileSummary': payload.profileSummary},config)
     .then(responce => {
      dispatch("getCompany",payload.companyId)
    })
  }, 
  addCompanyService({commit,dispatch}, payload){
    var config = {
      headers: {
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      },
    };
    axios.post('/company/addCompanyServices/',{'companyId': payload.companyId,'services': payload.services},config)
     .then(responce => {
      dispatch("getCompany",payload.companyId)
    })
  }, 
  addCompanyLocation({commit,dispatch}, payload){
    var config = {
      headers: {
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      },
    };
    axios.post('/company/addCompanyLocation/',{'id': payload.id,'companyId': payload.companyId,'location': payload.location,'lat':payload.lat,'long':payload.long},config)
     .then(responce => {
      dispatch("getCompany",payload.companyId)
    })
  }, 
  deleteCompanyLocation({commit,dispatch}, payload){
    var config = {
      headers: {
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      },
    };
    axios.post('/company/deleteCompanyLocation/',{'id': payload.id,'companyId': payload.companyId,'location': payload.location,'lat':payload.lat,'long':payload.long},config)
     .then(responce => {
      dispatch("getCompany",payload.companyId)
    })
  }, 
  addCompanyVideos({commit,dispatch}, payload){
    var config = {
      headers: {
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      },
    };
    axios.post('/company/addCompanyVideo/',{'companyId': payload.companyId,'videoLinks': payload.videoLinks},config)
     .then(responce => {
      dispatch("getCompany",payload.companyId)
    })
  },
  addCompanyDocument({commit,dispatch}, payload){
    console.log(payload,'payload');
    var config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      },
    };
    const formData = new FormData()

    formData.append('files', payload.files);
    formData.append('companyId', payload.companyId);
    formData.append('documentId', payload.documentId);
    axios.post('/company/addCompanyDocuments/',formData,config)
     .then(responce => {
      dispatch("getCompany",payload.companyId)
    })
  },
  deleteCompanyDocument({commit,dispatch}, payload){
    console.log(payload,'payload');
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
    })
  },
  addCompanyNews({commit,dispatch}, payload){
    console.log(payload);
    var config = {
      headers: {
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      },
    };
    axios.post('/company/addCompanyNews/',{'companyId': payload.companyId,'corporateNews': payload.corporateNews},config)
     .then(responce => {
      dispatch("getCompany",payload.companyId)
    })
  },
  addCompanyFacts({commit,dispatch}, payload){
    console.log(payload);
    var config = {
      headers: {
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      },
    };
    axios.post('/company/addCompanyKeyfacts/',{'companyId':payload.companyId,'founded':payload.founded,'employees':payload.employees,'hqlocation':payload.hqLocation,'stockPrice':payload.stockPrice,'website':payload.website,'linkedin':payload.linkedin,'careers':payload.careers},config)
     .then(responce => {
      dispatch("getCompany",payload.companyId)
    })
  },
  addCompanyContacts({commit,dispatch}, payload){
    console.log(payload);
    var config = {
      headers: {
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      },
    };
    axios.post('/company/addCompanyContact/',{'companyId':payload.companyId,'accountContacts':payload.accountContacts},config)
     .then(responce => {
      dispatch("getCompany",payload.companyId)
    })
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
    })
  },
  deleteCompanyExcutive({commit,dispatch}, payload){
    console.log(payload,'payload');
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
    })
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
    formData.append('esgInitiatives[attachment]', payload.esgInitiatives.attachment);
    formData.append('esgInitiatives[id]', payload.esgInitiatives.id);
    
    axios.post('/company/addCompanyDifferentiators/',formData,config)
     .then(responce => {
      dispatch("getCompany",payload.companyId)
    })
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
    
    axios.post('/company/deleteCompanyDifferentiators/',formData,config)
     .then(responce => {
      dispatch("getCompany",payload.companyId)
    })
  },  

  
}
