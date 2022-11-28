/* eslint-disable no-underscore-dangle */
import router from '@/router';
import axios from 'axios';
import store from '..';

export default {
  async getTeamMembers({ commit, dispatch, state }, payload) {
    try {
      const res = await axios.get(`company/getTeamMembers/${payload}`);
      if (res.status == 200) {
       	commit('setTeamMembers', res.data);
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
      const res = await axios.get(
        `bid/getBidBySerial/${payload.serial}/${payload.id}`,
      );

      if (res.status === 200) {
        localStorage.setItem('bidData', JSON.stringify(res.data));
        commit('setBidData', res.data);
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
      description: payload.description,
    };
    localStorage.setItem('bidData', JSON.stringify(bidData));
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
        formData.append(`bidDescriptions[${d}][name]`, payload.description[d].name);
        formData.append(`bidDescriptions[${d}][body]`, payload.description[d].body);
      }
    }
    formData.append('userId', payload.userId);
    formData.append('companyId', payload.companyId);

    formData.append('lineItems', []);
    formData.append('exampleItems', []);
    try {
      const res = await axios.post('bid/draft/createDraft', formData, config);
      if (res.status == 200) {
        commit('setDraftBidsList', res.data);
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
    formData.append('title', state.bidData.title);
    formData.append('type', state.bidData.type);
    formData.append('dueDate', state.bidData.dueDate);
    formData.append('dueTime', state.bidData.dueTime);
    formData.append('regions', state.bidData.regions);
    formData.append('qAndAEnabled', state.bidData.qAndAEnabled);
    formData.append('bidDescriptions', state.bidData.bidDescriptions);
    formData.append('userId', state.bidData.userId);
    formData.append('companyId', state.bidData.companyId);
    if (payload.invitedSuppliers) {
      console.log(payload.invitedSuppliers);
      for (let i = 0; i < payload.invitedSuppliers.length; i++) {
        if (payload.invitedSuppliers[i].type == 'user') {
          formData.append(`invitedSuppliers[${i}]`, payload.invitedSuppliers[i].item.companyId);
        } else {
          formData.append(`invitedSuppliers[${i}]`, payload.invitedSuppliers[i].item.objectID);
        }
      }
    }
    if (payload.invitedTeamMembers) {
      for (let t = 0; t < payload.invitedTeamMembers.length; t++) {
        formData.append(`invitedTeamMembers[${t}]`, payload.invitedTeamMembers[t].id);
      }
    }
    if (payload.bidlines) {
      for (let i = 0; i < payload.bidlines.length; i++) {
        formData.append(`lineItems[${i}][description]`, payload.bidlines[i].description);
        formData.append(`lineItems[${i}][unit]`, payload.bidlines[i].unit);
        formData.append(`lineItems[${i}][inputType]`, payload.bidlines[i].type);
        formData.append(`lineItems[${i}][quantity]`, payload.bidlines[i].quantity);
        formData.append(`lineItems[${i}][buyerComment]`, payload.bidlines[i].buyerComment);
        formData.append(`lineItems[${i}][required]`, payload.bidlines[i].required);
      }
    }
    if (payload.attachement) {
      for (let i = 0; i < payload.attachement.length; i++) {
        formData.append(`attachment[${i}][fileName]`, payload.attachement[i].fileName);
        formData.append(`attachment[${i}][fileSize]`, payload.attachement[i].fileSize);
        formData.append(`attachment[${i}][uploadedBy]`, payload.attachement[i].uploadedBy);
        formData.append(`attachment[${i}][url]`, payload.attachement[i].url);
        formData.append(`attachment[${i}][uploadedAt]`, payload.attachement[i].uploadedAt);
        formData.append(`attachment[${i}][comment]`, payload.attachement[i].comment);
        formData.append(`attachment[${i}][id]`, payload.attachement[i].id);
      }
    }
    if (payload.questions) {
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
    }
    try {
      const res = await axios.post(`bid/draft/updateDraft/${state.draftBidsList}`, formData, config);
      if (res.status == 200) {
        console.log(res);
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
};
