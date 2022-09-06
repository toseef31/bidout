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
    console.log(url);
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
  
}