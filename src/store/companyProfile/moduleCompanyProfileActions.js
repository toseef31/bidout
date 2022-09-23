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
    console.log(payload);
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
  addCompanyNews({commit,dispatch}, payload){
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
  
}
