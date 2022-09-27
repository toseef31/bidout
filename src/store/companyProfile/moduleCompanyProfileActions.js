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
    for(let i=0; i<payload.executiveLeadership.length; i++){
      formData.append('executiveLeadership['+ i +'][name]', payload.executiveLeadership[i].name);
      formData.append('executiveLeadership['+ i +'][role]', payload.executiveLeadership[i].role);
      formData.append('executiveLeadership['+ i +'][linkedin]', payload.executiveLeadership[i].linkedin);
      formData.append('executiveLeadership['+ i +'][profilePicture]', payload.executiveLeadership[i].profilePicture);
    }
    formData.append('companyId', payload.companyId);
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
    for(let i=0; i<payload.esgInitiatives.length; i++){
      formData.append('esgInitiatives['+ i +'][name]', payload.esgInitiatives[i].name);
      formData.append('esgInitiatives['+ i +'][description]', payload.esgInitiatives[i].description);
      formData.append('esgInitiatives['+ i +'][attachment]', payload.esgInitiatives[i].attachment);
    }
    axios.post('/company/addCompanyDifferentiators/',formData,config)
     .then(responce => {
      dispatch("getCompany",payload.companyId)
    })
  },  

  
}
