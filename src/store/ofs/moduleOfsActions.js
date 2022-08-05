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
    // console.log("ddd",payload);
    axios.get('/company/getCompaniesByService/'+payload.service)
      .then(responce => {
        var data = {
          'data': responce.data,
          'name': payload.service
        }
      commit('setCompanies',data)
      router.replace('/ofs-directory/'+payload.slug+'/'+payload.service);
    })
  },
  
}