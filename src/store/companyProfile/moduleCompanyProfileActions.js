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
    axios.post('/company/addCompanyDocuments/',formData,config)
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
    axios.post('/company/addCompanyKeyfacts/',{'companyId':payload.companyId,'founded':payload.founded,'employees':payload.employees,'hqlocation':payload.hqlocation,'stockPrice':payload.stockPrice,'website':payload.website,'linkedin':payload.linkedin,'careers':payload.careers},config)
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
    console.log(payload,'payload');
    var config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      },
    };

    const formData = new FormData()
    formData.append('executiveLeadership', JSON.stringify(payload.executiveLeadership));
    // formData.append('executiveLeadership[1][role]', payload.role);
    // formData.append('executiveLeadership[1][linkedin]', payload.linkedin);
    // formData.append('executiveLeadership[1][profilePicture]', payload.profilePicture);
    formData.append('companyId', payload.companyId);
    console.log(formData);
    axios.post('/company/addCompanyLeadership/',formData,config)
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
    formData.append('esgInitiatives[0][name]', payload.name);
    formData.append('esgInitiatives[0][description]', payload.description);
    formData.append('esgInitiatives[0][attachment]', payload.attachment);
    axios.post('/company/addCompanyDifferentiators/',formData,config)
     .then(responce => {
      dispatch("getCompany",payload.companyId)
    })
  },  

  
}
