import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import router from '@/router'
import store from "../../store";
import axios from 'axios'

export default {
    
  updateProfileImg({commit}, payload){
    console.log(payload);
    var config = {
      header: {
        "Content-Type": "multipart/form-data",
      },
    };
    console.log('send',payload);
    const formData = new FormData()
    formData.append('files', payload.files)
    axios.post('/user/updateProfilePicture/'+payload.userid,formData, config,{ headers: {"Authorization" : `Bearer ${JSON.parse(localStorage.getItem('token'))}`} })
     .then(responce => {
      console.log(responce);
      commit('setUserImg',responce.data)
    })
  }, 
}
