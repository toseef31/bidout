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
    async getDraftBids({commit}, payload){
      const res = await axios.get('bid/draft/getUserDrafts/'+payload);
      if(res.status == 200){
        console.log(res);
        commit('setDraftBidsList',res.data);
      }else{
        commit('setDraftBidsList',null);
      }
    },
    async saveDraftBid({commit}, payload){
      var config = {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
        },
      };
      var bidData = {
        bidTitle: payload.title,
        bidType: payload.type,
        bidDueDate: payload.dueDate,
        bidDueTime: payload.dueTime
      }
      // console.log(bidData,'actn');
      localStorage.setItem('bidData', JSON.stringify(bidData));
      commit('setBidData',bidData);
      const formData = new FormData()
      formData.append('title', payload.title);
      formData.append('type', payload.type);
      formData.append('dueDate', payload.dueDate);
      formData.append('dueTime', payload.dueTime);
      formData.append('regions', payload.regions);
      formData.append('qAndAEnabled', payload.qAndAEnabled);
      formData.append('bidDescriptions', payload.bidDescriptions);
      formData.append('userId', payload.userId);
      formData.append('companyId', payload.companyId);
      if(payload.invitedSuppliers){
        for(let i=0; i<payload.invitedSuppliers.length; i++){
          formData.append('invitedSuppliers['+i+']', payload.invitedSuppliers[i].objectId);
        }
      }
      if(payload.invitedTeamMembers){
        for(let t=0; t<payload.invitedTeamMembers.length; t++){
          formData.append('invitedTeamMembers['+i+']', payload.invitedTeamMembers[i].id);
        }
      }
      if(payload.bidlines){
        for(let l=0; l<payload.bidlines.length; l++){
          formData.append('lineItems['+i+']["description"]', payload.bidlines[i].description);
          formData.append('lineItems['+i+']["unit"]', payload.bidlines[i].unit);
          formData.append('lineItems['+i+']["inputType"]', payload.bidlines[i].type);
          formData.append('lineItems['+i+']["quantity"]', payload.bidlines[i].quantity);
          formData.append('lineItems['+i+']["buyerComment"]', payload.bidlines[i].buyerComment);
        }
      }
      if(payload.exampleItems){
        for(let l=0; l<payload.exampleItems.length; l++){
          formData.append('exampleItems['+i+']["description"]', payload.exampleItems[i].description);
          formData.append('exampleItems['+i+']["unit"]', payload.exampleItems[i].unit);
          formData.append('exampleItems['+i+']["inputType"]', payload.exampleItems[i].type);
          formData.append('exampleItems['+i+']["quantity"]', payload.exampleItems[i].quantity);
          formData.append('exampleItems['+i+']["buyerComment"]', payload.exampleItems[i].buyerComment);
        }
      }
      
      // const res = await axios.post('bid/draft/createDraft',formData,config);
      // if(res.status == 200){
      //   console.log(res);
      //   commit('setDraftBidsList',res.data);
      // }else{
      //   commit('setDraftBidsList',null);
      // }
    },
    async inviteNewSupplier({commit,state}, payload){
      console.log(payload);
      const res = await axios.post('bid/inviteSupplier/',{'firstName': payload.firstName,'lastName':payload.lastName,'company': payload.company,'phone':payload.phone,'email':payload.email,'bidTitle':payload.bidTitle,'bidType':payload.bidType,'bidDueDate':payload.bidDueDate,'bidDueTime':payload.bidDueTime});
       if(res.status == 200){
        localStorage.removeItem('bidData');
        commit('setBidData',null);
       }else{
        commit('setBidData',null);
       }
    },
}