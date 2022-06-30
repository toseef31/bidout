import axios from 'axios'

export default {
  getAllBids({commit}){
    axios.get('/admin/getBids')
      .then(responce => {
      commit('setUnreadCount',responce.data.totalUnreadMessages)
    })
  }, 
  
}