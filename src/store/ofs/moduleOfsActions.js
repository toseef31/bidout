import router from '@/router'
import axios from 'axios'

export default {
  getCategories({commit}){
    axios.get('/serviceCategory/getAllCategories')
      .then(responce => {
        // console.log(responce);
      commit('setCatgeoryList',responce.data)
    })
  },
  getCompanyByservice({commit}, payload){
    var url = encodeURIComponent(payload.service);
    console.log(url);
    axios.get('/company/getCompaniesByService/'+url)
      .then(responce => {
        var data = {
          'data': responce.data,
          'name': payload.service
        }
      commit('setCompanies',data)
      router.replace('/ofs-directory/'+payload.slug+'/'+url);
    })
  },

  getSupplierCompanyByservice({commit}, payload){
    var url = encodeURIComponent(payload.service);
    axios.get('/company/getCompaniesByService/'+url)
      .then(responce => {
        var data = {
          'data': responce.data,
          'name': payload.service
        }
      commit('setCompanies',data)
      router.replace('/ofs-supplier/'+payload.slug+'/'+url);
    })
  },
  getSupplierMainService({commit},payload){
    var url = encodeURIComponent(payload.name);
    console.log(url);
    axios.get('/company/getCompaniesByMainService/'+url)
      .then(responce => {
        var data = {
          'data': responce.data,
          'name': payload.name
        }
      commit('setCompanies',data)
      router.replace('/ofs-supplier/'+url);
    })
  },
  getCompanyMainService({commit},payload){
    var url = encodeURIComponent(payload.name);
    console.log(url);
    axios.get('/company/getCompaniesByMainService/'+url)
      .then(responce => {
        var data = {
          'data': responce.data,
          'name': payload.name
        }
      commit('setCompanies',data)
      router.replace('/ofs-directory/'+url);
    })
  },
  getCompanyInfo({commit},payload){
    var url = encodeURIComponent(payload.name);
    axios.get('company/getCompanyById/'+payload.id)
     .then(responce => {
      commit('setCompany',responce.data);
      localStorage.setItem('companyData', JSON.stringify(responce.data));
      router.replace('/company/'+url);
    })
  },
  getPublicCompanyInfo({commit},payload){
    var url = encodeURIComponent(payload.name);
    axios.get('company/getCompanyById/'+payload.id)
     .then(responce => {
      commit('setCompany',responce.data);
      localStorage.setItem('companyData', JSON.stringify(responce.data));
      router.replace('/company-profiles/'+url);
    })
  }
}