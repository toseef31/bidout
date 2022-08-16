import router from '@/router'
import axios from 'axios'

export default {
  getAllBids({commit}){
    axios.get('/admin/getBids',{ headers: {"Authorization" : `Bearer ${JSON.parse(localStorage.getItem('token'))}`} })
      .then(responce => {
      commit('getBids',responce.data)
    })
  }, 

  manageUsers({commit},payload){
    axios.get('/company/getUsersByCompany/'+ payload,{ headers: {"Authorization" : `Bearer ${JSON.parse(localStorage.getItem('token'))}`} })
      .then(responce => {
      console.log(responce.data);
      commit('getUsersList',responce.data)
    })
  }, 

  disableUser({commit},payload){
    axios.post('/admin/disableUser/',{'id': payload},{ headers: {"Authorization" : `Bearer ${JSON.parse(localStorage.getItem('token'))}`} })
      .then(responce => {
      commit('setStatusMessage', responce.data)
      commit('setUserStatus',false)
    })
  }, 

  enableUser({commit},payload){
    axios.post('/admin/enableUser/',{'id': payload},{ headers: {"Authorization" : `Bearer ${JSON.parse(localStorage.getItem('token'))}`} })
      .then(responce => {
      commit('setStatusMessage',responce.data)
      commit('setUserStatus',true)
    })
  }, 
  
}