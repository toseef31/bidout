import router from '@/router'
import store from "../../store";
import axios from 'axios'

export default {
    async getTeamMembers({commit}, payload){
      const res = await axios.get('company/getTeamMembers/'+payload);
       if(res.status == 200){
       	commit('setTeamMembers',res.data);
       }else{
       	commit('setTeamMembers',null);
       }
    },
    async getSalesReps({commit}, payload){
      const res = await axios.post('company/getSalesReps/',{'query': payload.query,'basin':payload.basin});
       if(res.status == 200){
       	commit('setSalesReps',res.data);
       }else{
       	commit('setSalesReps',null);
       }
    },
    async searchByCompany({commit}, payload){
      const res = await axios.post('company/searchCompanies/',{'query': payload.query,'basin':payload.basin});
       if(res.status == 200){
       	commit('setCompaniesList',res.data);
       }else{
       	commit('setCompaniesList',null);
       }
    },
    async getCompanyByServices({commit}, payload){
      const res = await axios.get('company/getCompaniesByService/'+payload);
       if(res.status == 200){
       	commit('setCompaniesList',res.data);
       }else{
       	commit('setCompaniesList',null);
       }
    },
}