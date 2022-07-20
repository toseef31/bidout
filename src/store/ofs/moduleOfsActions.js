import axios from 'axios'

export default {
  getCategories({commit}){
    axios.get('/serviceCategory/getAllCategories')
      .then(responce => {
        // console.log(responce);
      commit('setCatgeoryList',responce.data)
    })
  }, 
  
}