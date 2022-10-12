import router from '@/router'
import axios from 'axios'

export default {
  getCategories({commit}){
    axios.get('/serviceCategory/getAllCategories')
      .then(responce => {
        // console.log(responce);
      commit('setCatgeoryList',responce.data)
    }).catch(err => {
          console.log(err);
      });
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
    }).catch(err => {
          console.log(err);
      });
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
    }).catch(err => {
          console.log(err);
      });
  },
  getSupplierMainService({commit},payload){
    var url = encodeURIComponent(payload.name);
    axios.get('/company/getCompaniesByMainService/'+url)
      .then(responce => {
        var data = {
          'data': responce.data,
          'name': payload.name
        }
      commit('setCompanies',data)
      router.replace('/ofs-supplier/'+url);
    }).catch(err => {
          console.log(err);
      });
  },
  getCompanyMainService({commit},payload){
    var url = encodeURIComponent(payload.name);

    axios.get('/company/getCompaniesByMainService/'+url)
      .then(responce => {
        var data = {
          'data': responce.data,
          'name': payload.name
        }
      commit('setCompanies',data)
      router.replace('/ofs-directory/'+url);
    }).catch(err => {
          console.log(err);
      });
  },
  getCompanyByBasin({commit},payload){
    axios.get('/company/getCompanyByBasin/'+payload)
      .then(responce => {
        // console.log(responce);
        commit('setCompanies',responce.data)
    }).catch(err => {
          console.log(err);
      });
  },
  getCompanyInfo({commit},payload){
    console.log(payload);
    var url = encodeURIComponent(payload.name);
    axios.get('/company/getCompanyById/'+payload.id)
     .then(responce => {
      console.log(responce);
      commit('setCompany',responce.data);
      localStorage.setItem('companyData', JSON.stringify(responce.data));
      router.replace('/company/'+url);
    }).catch(err => {
          console.log(err);
      });
  },
  getPublicCompanyInfo({commit},payload){
    var url = encodeURIComponent(payload.name);
    axios.get('/company/getCompanyById/'+payload.id)
     .then(responce => {
      commit('setCompany',responce.data);
      localStorage.setItem('companyData', JSON.stringify(responce.data));
      router.replace('/company-profiles/'+url);
    }).catch(err => {
          console.log(err);
      });
  },
  getPremiumCompanies({commit},payload){
    axios.get('admin/getPremiumCompanies')
     .then(responce => {
      commit('setPremiumList',responce.data);
    }).catch(err => {
          console.log(err);
      });
  },
  searchCompany({commit}, payload){
    axios.get('/ofs/searchSuppliers/'+payload)
      .then(responce => {
        console.log(responce.data);
      commit('setCompanies',responce.data.hits)
    }).catch(err => {
          console.log(err);
      });
  },
}