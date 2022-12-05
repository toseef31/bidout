/* eslint-disable no-underscore-dangle */
import router from '@/router';
import axios from 'axios';
import store from '..';

export default {
  async getTeamMembers({ commit, dispatch, state }, payload) {
    commit('setPageLoader', true);
    try {
      const res = await axios.get(`company/getTeamMembers/${payload}`);
      if (res.status == 200) {
       	commit('setTeamMembers', res.data);
        commit('setPageLoader', false);
      } else {
       	commit('setTeamMembers', null);
      }
    } catch (err) {
      if (state.apiCounter === 2) {
        console.log(state.apiCounter, 'counter');
        dispatch('apiSignOutAction');
      } else if (err.response.status === 403) {
        await dispatch('refreshToken');
        state.apiCounter = 2;
        dispatch('getTeamMembers', payload);
      }
    }
  },
  async getSalesReps({ commit, dispatch, state }, payload) {
    try {
      const res = await axios.post('company/getSalesReps/', { query: payload.query, basin: payload.basin });

      if (res.status == 200) {
         	commit('setSalesReps', res.data);
      } else {
         	commit('setSalesReps', null);
      }
    } catch (err) {
      if (state.apiCounter == 2) {
        dispatch('apiSignOutAction');
      } else if (err.response.status === 403) {
        await dispatch('refreshToken');
        state.apiCounter = 2;
        dispatch('getSalesReps', payload);
      }
    }
  },
  async searchByCompany({ commit, dispatch, state }, payload) {
    try {
      const res = await axios.post('company/searchCompanies/', { query: payload.query, basin: payload.basin });

      if (res.status == 200) {
         	commit('setCompaniesList', res.data);
      } else {
         	commit('setCompaniesList', null);
      }
    } catch (err) {
      if (state.apiCounter == 2) {
        dispatch('apiSignOutAction');
      } else if (err.response.status === 403) {
        await dispatch('refreshToken');
        state.apiCounter = 2;
        dispatch('searchByCompany', payload);
      }
    }
  },

  async getCompanyByServices({ commit, dispatch, state }, payload) {
    try {
      const res = await axios.get(`company/getCompaniesByService/${payload}`);

      if (res.status == 200) {
         	commit('setCompaniesList', res.data);
      } else {
         	commit('setCompaniesList', null);
      }
    } catch (err) {
      if (state.apiCounter == 2) {
        dispatch('apiSignOutAction');
      } else if (err.response.status === 403) {
        await dispatch('refreshToken');
        state.apiCounter = 2;
        dispatch('getCompanyByServices', payload);
      }
    }
  },
  async getDraftBids({ commit, dispatch, state }, payload) {
    try {
      const res = await axios.get(`bid/draft/getUserDrafts/${payload}`);

      if (res.status === 200) {
        commit('setDraftBidsList', res.data);
      }
    } catch (err) {
      if (state.apiCounter == 2) {
        dispatch('apiSignOutAction');
      } else if (err.response.status === 403) {
        await dispatch('refreshToken');
        state.apiCounter = 2;
        dispatch('getDraftBids', payload);
      }
    }
  },
  async getBidsLists({ commit, dispatch, state }, payload) {
    try {
      const res = await axios.get(`bid/getBidList/${payload}`);
      if (res.status === 200) {
        commit('setBidsList', res.data);
      }
    } catch (err) {
      if (state.apiCounter == 2) {
        dispatch('apiSignOutAction');
      } else if (err.response.status === 403) {
        await dispatch('refreshToken');
        state.apiCounter = 2;
        dispatch('getBidsLists', payload);
      }
    }
  },

  async getBidBySerial({ commit, dispatch, state }, payload) {
    try {
      commit('setPageLoader', true);
      const res = await axios.get(
        `bid/getBidBySerial/${payload.serial}/${payload.id}`,
      );

      if (res.status === 200) {
        commit('setBidViewData', res.data);
        commit('setPageLoader', false);
        commit('setViewBidError', false);
      } else {
        commit('setPageLoader', false);
        commit('setViewBidError', false);
      }
    } catch (err) {
      commit('setPageLoader', false);
      commit('setViewBidError', true);
      if (state.apiCounter == 2) {
        dispatch('apiSignOutAction');
      } else if (err.response.status === 403) {
        await dispatch('refreshToken');
        state.apiCounter = 2;
        dispatch('getBidBySerial', payload);
      }
    }
  },

  async deleteBid({ commit, dispatch, state }, payload) {
    try {
      const res = await axios.post('bid/deleteBid/', {
        bidId: payload.bidId,
      });

      if (res.status === 200) {
        localStorage.removeItem('bidData');
        commit('setBidData', null);
        router.replace({ name: "ViewBids" });
        commit('setSuccessDeleteBid');
      }
    } catch (err) {
      commit('setErrorDeleteBid');
      if (state.apiCounter == 2) {
        dispatch('apiSignOutAction');
      } else if (err.response.status === 403) {
        await dispatch('refreshToken');
        state.apiCounter = 2;
        dispatch('deleteBid', payload);
      }
    }
  },
  async getSubmittedBid({ commit, dispatch, state }, payload) {
    try {
      const res = await axios.get(`bidSubmission/getSubmittedBids/${payload.userId}/${payload.bidId}`);

      if (res.status === 200) {
        commit('setSubmittedBids', res.data);
      }
    } catch (err) {
      if (state.apiCounter == 2) {
        dispatch('apiSignOutAction');
      } else if (err.response.status === 403) {
        await dispatch('refreshToken');
        state.apiCounter = 2;
        dispatch('setSubmittedBids', payload);
      }
    }
  },
  async saveDraftBid({ commit, dispatch, state }, payload) {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
      },
    };
    const bidData = {
      title: payload.title,
      type: payload.type,
      dueDate: payload.dueDate,
      dueTime: payload.dueTime,
      regions: payload.regions,
      qAndAEnabled: payload.qAndAEnabled,
      bidDescriptions: payload.bidDescriptions,
      userId: payload.userId,
      companyId: payload.companyId,
      company: payload.company,
      description: payload.description,
    };
    commit('setBidData', bidData);
    const formData = new FormData();
    formData.append('title', payload.title);
    formData.append('type', payload.type);
    formData.append('dueDate', payload.dueDate);
    formData.append('dueTime', payload.dueTime);
    formData.append('regions', payload.regions);
    formData.append('qAndAEnabled', payload.qAndAEnabled);
    formData.append('bidDescriptions[0][body]', payload.bidDescriptions);
    if (payload.description) {
      for (let d = 0; d < payload.description.length; d++) {
        formData.append(`bidDescriptions[${d + 1}][name]`, payload.description[d].name);
        formData.append(`bidDescriptions[${d + 1}][body]`, payload.description[d].body);
      }
    }
    formData.append('userId', payload.userId);
    formData.append('companyId', payload.companyId);
    formData.append('company', payload.company);

    try {
      const res = await axios.post('bid/draft/createDraft', formData, config);
      if (res.status == 200) {
        console.log(res);
        commit('setDraftBidsList', res.data.id);
        commit('setBidSerial', res.data.serial);
        commit('setDraftTime', new Date().toLocaleString());
      } else {
        commit('setDraftBidsList', null);
      }
    } catch (err) {
      if (state.apiCounter == 2) {
        dispatch('apiSignOutAction');
      } else if (err.response.status === 403) {
        await dispatch('refreshToken');
        state.apiCounter = 2;
        dispatch('saveDraftBid', payload);
      }
    }
  },
  async updateDraftBid({ commit, state }, payload) {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
      },
    };
    const formData = new FormData();
    if(payload.bidDetails){
      if(state.bidData.status == 'edit'){
        state.draftBidsList = state.bidData.id;
        state.bidSerial = state.bidData.serial
      }
      const bidData = {
        title: payload.bidDetails.title,
        type: payload.bidDetails.type,
        dueDate: payload.bidDetails.dueDate,
        dueTime: payload.bidDetails.dueTime,
        regions: payload.bidDetails.regions,
        qAndAEnabled: payload.bidDetails.qAndAEnabled,
        bidDescriptions: payload.bidDetails.bidDescriptions,
        userId: payload.bidDetails.userId,
        companyId: payload.bidDetails.companyId,
        company: payload.bidDetails.company,
        description: payload.bidDetails.description,
        serial: payload.bidDetails.serial,
      };
      commit('setBidData', bidData);

      formData.append('title', payload.bidDetails.title);
      formData.append('type', payload.bidDetails.type);
      formData.append('dueDate', payload.bidDetails.dueDate);
      formData.append('dueTime', payload.bidDetails.dueTime);
      formData.append('regions', payload.bidDetails.regions);
      formData.append('qAndAEnabled', payload.bidDetails.qAndAEnabled);
      formData.append('userId', payload.bidDetails.userId);
      formData.append('companyId', payload.bidDetails.companyId);
      formData.append('company', payload.bidDetails.company);
      formData.append('bidDescriptions[0][body]', payload.bidDetails.bidDescriptions);
      formData.append('serial', payload.bidDetails.serial);
      if (payload.bidDetails.description) {
        for (let d = 0; d < payload.bidDetails.description.length; d++) {
          formData.append(`bidDescriptions[${d + 1}][name]`, payload.bidDetails.description[d].name);
          formData.append(`bidDescriptions[${d + 1}][body]`, payload.bidDetails.description[d].body);
        }
      }
    }else{
      if(state.bidData.status == 'edit'){
        state.draftBidsList = state.bidData.id;
        state.bidSerial = state.bidData.serial
      }
      formData.append('title', state.bidData.title);
      formData.append('type', state.bidData.type);
      formData.append('dueDate', state.bidData.dueDate);
      formData.append('dueTime', state.bidData.dueTime);
      formData.append('regions', state.bidData.regions);
      formData.append('qAndAEnabled', state.bidData.qAndAEnabled);
      formData.append('userId', state.bidData.userId);
      formData.append('companyId', state.bidData.companyId);
      formData.append('company', state.bidData.company);
      formData.append('bidDescriptions[0][body]', state.bidData.bidDescriptions);
      formData.append('serial', state.bidSerial);
      if (state.bidData.description) {
        for (let d = 0; d < state.bidData.description.length; d++) {
          formData.append(`bidDescriptions[${d + 1}][name]`, state.bidData.description[d].name);
          formData.append(`bidDescriptions[${d + 1}][body]`, state.bidData.description[d].body);
        }
      }
    }
    
    if (payload.invitedSuppliers) {
      state.invitedSuppliers = payload.invitedSuppliers;
      for (let i = 0; i < payload.invitedSuppliers.length; i++) {
        if (payload.invitedSuppliers[i].type == 'user') {
          formData.append(`invitedSuppliers[${i}]`, payload.invitedSuppliers[i].item.companyId);
        } else {
          formData.append(`invitedSuppliers[${i}]`, payload.invitedSuppliers[i].item.objectID);
        }
      }
    }else{
      if(state.invitedSuppliers != null){
        for (let i = 0; i < state.invitedSuppliers.length; i++) {
          if(!state.invitedSuppliers[i].type){
            formData.append(`invitedSuppliers[${i}]`, state.invitedSuppliers[i]);
          }else{
           if (state.invitedSuppliers[i].type == 'user') {
             formData.append(`invitedSuppliers[${i}]`, state.invitedSuppliers[i].item.companyId);
           } else {
             formData.append(`invitedSuppliers[${i}]`, state.invitedSuppliers[i].item.objectID);
           } 
         }
        }
      }
    }
    if (payload.invitedTeamMembers) {
      state.invitedTeamMembers = payload.invitedTeamMembers;
      for (let t = 0; t < payload.invitedTeamMembers.length; t++) {
        formData.append(`invitedTeamMembers[${t}]`, payload.invitedTeamMembers[t].id);
      }
    }else{
      if(state.invitedTeamMembers != null){
        for (let t = 0; t < state.invitedTeamMembers.length; t++) {
          if(!state.invitedTeamMembers[t].id){
            formData.append(`invitedTeamMembers[${t}]`, state.invitedTeamMembers[t]);
          }else{
            formData.append(`invitedTeamMembers[${t}]`, state.invitedTeamMembers[t].id);
          }
        }
      }
    }
    if (payload.bidlines) {
      state.bidlines = payload.bidlines;
      for (let i = 0; i < payload.bidlines.length; i++) {
        formData.append(`lineItems[${i}][description]`, payload.bidlines[i].description);
        formData.append(`lineItems[${i}][unit]`, payload.bidlines[i].unit);
        formData.append(`lineItems[${i}][inputType]`, payload.bidlines[i].type);
        formData.append(`lineItems[${i}][quantity]`, payload.bidlines[i].quantity);
        formData.append(`lineItems[${i}][buyerComment]`, payload.bidlines[i].buyerComment);
        formData.append(`lineItems[${i}][required]`, payload.bidlines[i].required);
      }
    }else{
      if(state.bidlines != null){
        for (let i = 0; i < state.bidlines.length; i++) {
          formData.append(`lineItems[${i}][description]`, state.bidlines[i].description);
          formData.append(`lineItems[${i}][unit]`, state.bidlines[i].unit);
          formData.append(`lineItems[${i}][inputType]`, state.bidlines[i].type);
          formData.append(`lineItems[${i}][quantity]`, state.bidlines[i].quantity);
          formData.append(`lineItems[${i}][buyerComment]`, state.bidlines[i].buyerComment);
          formData.append(`lineItems[${i}][required]`, state.bidlines[i].required);
        }
      }
    }
    if (payload.attachement) {
      state.attachement = payload.attachement;
      for (let i = 0; i < payload.attachement.length; i++) {
        formData.append(`attachment[${i}][fileName]`, payload.attachement[i].fileName);
        formData.append(`attachment[${i}][fileSize]`, payload.attachement[i].fileSize);
        formData.append(`attachment[${i}][uploadedBy]`, payload.attachement[i].uploadedBy);
        formData.append(`attachment[${i}][url]`, payload.attachement[i].url);
        formData.append(`attachment[${i}][uploadedAt]`, payload.attachement[i].uploadedAt);
        formData.append(`attachment[${i}][comment]`, payload.attachement[i].comment);
        formData.append(`attachment[${i}][id]`, payload.attachement[i].id);
      }
    }else{
      if(state.attachement != null){
        for (let i = 0; i < state.attachement.length; i++) {
          formData.append(`attachment[${i}][fileName]`, state.attachement[i].fileName);
          formData.append(`attachment[${i}][fileSize]`, state.attachement[i].fileSize);
          formData.append(`attachment[${i}][uploadedBy]`, state.attachement[i].uploadedBy);
          formData.append(`attachment[${i}][url]`, state.attachement[i].url);
          formData.append(`attachment[${i}][uploadedAt]`, state.attachement[i].uploadedAt);
          formData.append(`attachment[${i}][comment]`, state.attachement[i].comment);
          formData.append(`attachment[${i}][id]`, state.attachement[i].id);
        }
      }
    }
    if (payload.questions) {
      state.questions = payload.questions;
      for (let i = 0; i < payload.questions.length; i++) {
        formData.append(`questions[${i}][id]`, payload.questions[i].id);
        formData.append(`questions[${i}][order]`, payload.questions[i].order);
        formData.append(`questions[${i}][title]`, payload.questions[i].title);
        formData.append(`questions[${i}][type]`, payload.questions[i].type);
        formData.append(`questions[${i}][questionType]`, payload.questions[i].questionType);
        if (payload.questions[i].options) {
          for (let j = 0; j < payload.questions[i].options.length; j++) {
            formData.append(`questions[${i}][options][${j}][id]`, payload.questions[i].options[j].id);
            formData.append(`questions[${i}][options][${j}][label]`, payload.questions[i].options[j].label);
            formData.append(`questions[${i}][options][${j}][title]`, payload.questions[i].options[j].title);
          }
        }
      }
    }else{
      if(state.questions != null){
        for (let i = 0; i < state.questions.length; i++) {
          formData.append(`questions[${i}][id]`, state.questions[i].id);
          formData.append(`questions[${i}][order]`, state.questions[i].order);
          formData.append(`questions[${i}][title]`, state.questions[i].title);
          formData.append(`questions[${i}][type]`, state.questions[i].type);
          formData.append(`questions[${i}][questionType]`, state.questions[i].questionType);
          if (state.questions[i].options) {
            for (let j = 0; j < state.questions[i].options.length; j++) {
              formData.append(`questions[${i}][options][${j}][id]`, state.questions[i].options[j].id);
              formData.append(`questions[${i}][options][${j}][label]`, state.questions[i].options[j].label);
              formData.append(`questions[${i}][options][${j}][title]`, state.questions[i].options[j].title);
            }
          }
        }
      }
    }
    console.log(state.draftBidsList);
    try {
      const res = await axios.post(`bid/draft/updateDraft/${state.draftBidsList}`, formData, config);
      if (res.status == 200) {
        // commit('setDraftBidsList',null);
        commit('setDraftTime', new Date().toLocaleString());
      } else {
        // commit('setDraftBidsList',null);
      }
    } catch (err) {
      if (state.apiCounter == 2) {
        dispatch('apiSignOutAction');
      } else if (err.response.status === 403) {
        await dispatch('refreshToken');
        state.apiCounter = 2;
        dispatch('updateDraftBid', payload);
      }
    }
  },
  async inviteNewSupplier({ commit, state, dispatch }, payload) {
    try {
      const res = await axios.post('bid/inviteSupplier/', {
        firstName: payload.firstName, lastName: payload.lastName, company: payload.company, phone: payload.phone, email: payload.email, bidTitle: payload.bidTitle, bidType: payload.bidType, bidDueDate: payload.bidDueDate, bidDueTime: payload.bidDueTime,
      });

      if (res.status == 200) {
        localStorage.removeItem('bidData');
        commit('setBidData', null);
      } else {
        commit('setBidData', null);
      }
    } catch (err) {
      if (state.apiCounter == 2) {
        dispatch('apiSignOutAction');
      } else if (err.response.status === 403) {
        await dispatch('refreshToken');
        state.apiCounter = 2;
        dispatch('inviteNewSupplier', payload);
      }
    }
  },
  async publishBid({ commit, state }, payload) {
    try {
      const res = await axios.post('bid/publishBid', {
        draftBidId: state.draftBidsList,
      });
      if (res.status == 200) {
        commit('setDraftBidsList', null);
        commit('setDraftTime', null);
        commit('setDraftTime', null);
        commit('setAttachData', null);
        state.invitedTeamMembers = null;
        state.invitedSuppliers = null;
        state.bidlines = null;
        state.attachement = null;
        state.questions = null;
        const bidDetail = await axios.get(`bid/getBid/${res.data._path.segments[1]}`);
        return bidDetail.data.serial;
      } else {
      }
      return;
    } catch (err) {
      console.log(err);
    }
  },
  async inviteNewSupplier({ commit, state }, payload) {
    const res = await axios.post('bid/inviteSupplier/', {
      firstName: payload.firstName, lastName: payload.lastName, company: payload.company, phone: payload.phone, email: payload.email, bidTitle: payload.bidTitle, bidType: payload.bidType, bidDueDate: payload.bidDueDate, bidDueTime: payload.bidDueTime,
    });
    if (res.status == 200) {
      commit('setNewSupplier', res.data);
      // localStorage.removeItem('bidData');
      console.log(res.data);
      commit('setItemBidData', res.data);
    }
  },
  async uploadBidAttach({ commit, state, dispatch }, payload) {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
      },
    };
    const formData = new FormData();
    if (payload.attachement) {
      formData.append('uploadedBy', payload.uploadedBy);
      for (let i = 0; i < payload.attachement.length; i++) {
        formData.append(`attachement[${i}]`, payload.attachement[i]);
      }
    }
    try {
      const res = await axios.post('bid/uploadBidAttachment/', formData, config);

      if (res.status == 200) {
        commit('setAttachData', res.data);
        commit('setAttachement',res.data);
      } else {
        commit('setAttachData', null);
      }
    } catch (err) {
      if (state.apiCounter == 2) {
        dispatch('apiSignOutAction');
      } else if (err.response.status === 403) {
        await dispatch('refreshToken');
        state.apiCounter = 2;
        dispatch('uploadBidAttach', payload);
      }
    }
  },
  async getDraftBySerial({commit,state,dispatch},payload){
    commit('setPageLoader', true);
    try {
      const res = await axios.get(
        `bid/draft/getDraftBySerial/${payload.serial}`,
      );

      if (res.status === 200) {
        dispatch('getTeamMembers',payload.company);
        dispatch('getSalesReps',{query: '',basin: 'all'});
        dispatch('getCategories');
        dispatch('searchByCompany',{query: '',basin:'all'});
        commit('setDraftBidData', res.data);
        commit('setBidData', res.data);
        commit('setPageLoader', false);
        router.replace('/create-bid');
      }
    } catch (err) {
      if (state.apiCounter == 2) {
        dispatch('apiSignOutAction');
      } else if (err.response.status === 403) {
        await dispatch('refreshToken');
        state.apiCounter = 2;
        dispatch('getBidBySerial', payload);
      }
    }
  }
};
