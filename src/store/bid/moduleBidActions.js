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
        commit('setUserType', res.data.user_type);

        if (res.data.user_type === 'supplier' && res.data.supplierSubmissions) {
          commit('setSupplierBid', res.data.supplierSubmissions);
          commit('setIsBidSubmitted', true);
        }
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
        commit('setBidViewData', null);
        router.replace({ name: 'ViewBids' });
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
  async getIntent({ commit, dispatch, state }, payload) {
    try {
      const res = await axios.get(`intend/getIntends/${payload.companyId}/${payload.bidId}/${payload.companyName}`);
      if (res.status === 200) {
        if (res.data && res.data.answer) {
          commit('setBidIntent', res.data.answer);
          commit('setIntentId', res.data.id);
        } else {
          commit('setBidIntent', null);
        }
      }
    } catch (err) {
      if (state.apiCounter == 2) {
        dispatch('apiSignOutAction');
      } else if (err.response.status === 403) {
        await dispatch('refreshToken');
        state.apiCounter = 2;
        dispatch('getIntent', payload);
      }
    }
  },
  async updateIntent({ commit, state, dispatch }, payload) {
    try {
      const res = await axios.post('intend/editIntend/', {
        answer: payload.answer,
        intendId: payload.intendId,
      });

      if (res.status === 200) {
        commit('setBidIntent', payload.answer);
      }
    } catch (err) {
      if (state.apiCounter == 2) {
        dispatch('apiSignOutAction');
      } else if (err.response.status === 403) {
        await dispatch('refreshToken');
        state.apiCounter = 2;
        dispatch('updateIntent', payload);
      }
    }
  },
  async makeIntent({ commit, state, dispatch }, payload) {
    try {
      const res = await axios.post('intend/createIntend/', {
        bidId: payload.bidId,
        owner: payload.owner,
        ownerCompany: payload.ownerCompany,
        companyId: payload.companyId,
        answer: payload.answer,
      });

      if (res.status === 200) {
        commit('setBidIntent', payload.answer);
        commit('setIntentId', res.data.id);
      }
    } catch (err) {
      if (state.apiCounter == 2) {
        dispatch('apiSignOutAction');
      } else if (err.response.status === 403) {
        await dispatch('refreshToken');
        state.apiCounter = 2;
        dispatch('makeIntent', payload);
      }
    }
  },

  async awardCompany({ commit, dispatch, state }, payload) {
    try {
      const res = await axios.post('bid/bidAwardees/', {
        companyId: payload.companyId,
        bidId: payload.bidId,
        userId: payload.userId,
      });

      if (res.status === 200) {
        dispatch('getBidBySerial', {
          id: payload.userId,
          serial: payload.serial,
        });
      }
    } catch (err) {
      if (state.apiCounter == 2) {
        dispatch('apiSignOutAction');
      } else if (err.response.status === 403) {
        await dispatch('refreshToken');
        state.apiCounter = 2;
        dispatch('awardCompany', payload);
      }
    }
  },
  async rejectCompany({ commit, dispatch, state }, payload) {
    try {
      const res = await axios.post('bid/bidRejectees/', {
        companyId: payload.companyId,
        bidId: payload.bidId,
        userId: payload.userId,
      });

      if (res.status === 200) {
        dispatch('getBidBySerial', {
          id: payload.userId,
          serial: payload.serial,
        });
      }
    } catch (err) {
      if (state.apiCounter == 2) {
        dispatch('apiSignOutAction');
      } else if (err.response.status === 403) {
        await dispatch('refreshToken');
        state.apiCounter = 2;
        dispatch('rejectCompany', payload);
      }
    }
  },
  async submitBid({ commit, state, dispatch }, payload) {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
      },
    };

    const formData = new FormData();
    formData.append('userId', payload.userId);
    formData.append('companyId', payload.companyId);
    formData.append('bidId', payload.bidId);
    formData.append('supplierNote', payload.supplierNote);

    if (payload.supplierAttachments) {
      for (let i = 0; i < payload.supplierAttachments.length; i++) {
        formData.append(`supplierAttachments[${i}]`, payload.supplierAttachments[i].attachment);
      }
    }

    if (payload.lineItems) {
      for (let i = 0; i < payload.lineItems.length; i++) {
        formData.append(`lineItems[${i}][price]`, payload.lineItems[i].price);
      }
    }

    if (payload.answers) {
      for (let i = 0; i < payload.answers.length; i++) {
        formData.append(`answers[${i}][questionId]`, payload.answers[i].questionId);
        formData.append(`answers[${i}][answer]`, payload.answers[i].answer);
      }
    }
    try {
      const res = await axios.post('bidSubmission/submitBid/', formData, config);

      if (res.status === 200) {
        commit('setIsBidSubmitted', true);
        dispatch('getBidBySerial', {
          id: payload.userId,
          serial: payload.serial,
        });
      }
    } catch (err) {
      if (state.apiCounter == 2) {
        dispatch('apiSignOutAction');
      } else if (err.response.status === 403) {
        await dispatch('refreshToken');
        state.apiCounter = 2;
        dispatch('submitBid', payload);
      }
    }
  },

  async editSubmitBid({ commit, dispatch, state }, payload) {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
      },
    };

    const formData = new FormData();

    formData.append('userId', payload.userId);
    formData.append('companyId', payload.companyId);
    formData.append('bidId', payload.bidId);
    formData.append('submitBidId', payload.submitBidId);
    formData.append('supplierNote', payload.supplierNote);

    if (payload.supplierAttachments) {
      for (let i = 0; i < payload.supplierAttachments.length; i++) {
        formData.append(`supplierAttachments[${i}]`, payload.supplierAttachments[i]);
      }
    }

    if (payload.lineItems) {
      for (let i = 0; i < payload.lineItems.length; i++) {
        formData.append(`lineItems[${i}][price]`, payload.lineItems[i].price);
      }
    }

    if (payload.answers) {
      for (let i = 0; i < payload.answers.length; i++) {
        formData.append(`answers[${i}][questionId]`, payload.answers[i].questionId);
        formData.append(`answers[${i}][answer]`, payload.answers[i].answer);
        if (payload.answers[i].fileName) {
          formData.append(`answers[${i}][fileName]`, payload.answers[i].fileName);
        }

        if (payload.answers[i].fileSize) {
          formData.append(`answers[${i}][fileSize]`, payload.answers[i].fileSize);
        }
      }
    }
    try {
      const res = await axios.post('bidSubmission/editSubmitBid/', formData, config);

      if (res.status === 200) {
        dispatch('getBidBySerial', {
          id: payload.userId,
          serial: payload.serial,
        });
      }
    } catch (err) {
      if (state.apiCounter == 2) {
        dispatch('apiSignOutAction');
      } else if (err.response.status === 403) {
        await dispatch('refreshToken');
        state.apiCounter = 2;
        dispatch('editSubmitBid', payload);
      }
    }
  },

  async getQA({ commit, dispatch, state }, payload) {
    try {
      const res = await axios.get(`bidSubmission/getQA/${payload.bidId}/${payload.userId}`);

      if (res.status === 200) {
        commit('setQAndA', res.data);

        let count = 0;
        res.data.forEach((el) => {
          if (!el.answer) count++;
        });

        commit('setUnansweredQuestionCount', count);
      }
    } catch (err) {
      if (state.apiCounter === 2) {
        console.log(state.apiCounter, 'counter');
        dispatch('apiSignOutAction');
      } else if (err.response.status === 403) {
        await dispatch('refreshToken');
        state.apiCounter = 2;
        dispatch('getQA', payload);
      }
    }
  },

  async askQuestion({ commit, dispatch, state }, payload) {
    try {
      const res = await axios.post('bidSubmission/questionAsked/', {
        question: payload.question,
        userId: payload.userId,
        companyId: payload.companyId,
        bidId: payload.bidId,
      });

      if (res.status === 200) {
        dispatch('getQA', { bidId: payload.bidId, userId: payload.userId });
      }
    } catch (err) {
      if (state.apiCounter == 2) {
        dispatch('apiSignOutAction');
      } else if (err.response.status === 403) {
        await dispatch('refreshToken');
        state.apiCounter = 2;
        dispatch('askQuestion', payload);
      }
    }
  },

  async answerQuestion({ commit, dispatch, state }, payload) {
    try {
      const res = await axios.post('bidSubmission/questionAnswer/', {
        answer: payload.answer,
        userId: payload.userId,
        questionId: payload.questionId,
        bidId: payload.bidId,
      });

      if (res.status === 200) {
        dispatch('getQA', { bidId: payload.bidId, userId: payload.userId });
      }
    } catch (err) {
      if (state.apiCounter == 2) {
        dispatch('apiSignOutAction');
      } else if (err.response.status === 403) {
        await dispatch('refreshToken');
        state.apiCounter = 2;
        dispatch('answerQuestion', payload);
      }
    }
  },

  async editAnswer({ commit, dispatch, state }, payload) {
    try {
      const res = await axios.post('bidSubmission/editAnswer/', {
        answer: payload.answer,
        questionId: payload.questionId,
      });

      if (res.status === 200) {
        dispatch('getQA', { bidId: payload.bidId, userId: payload.userId });
      }
    } catch (err) {
      if (state.apiCounter == 2) {
        dispatch('apiSignOutAction');
      } else if (err.response.status === 403) {
        await dispatch('refreshToken');
        state.apiCounter = 2;
        dispatch('editAnswer', payload);
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
    const formData = new FormData();
    formData.append('title', state.bidData.title);
    formData.append('type', state.bidData.type);
    formData.append('dueDate', state.bidData.dueDate);
    formData.append('dueTime', state.bidData.dueTime);
    formData.append('regions', state.bidData.regions);
    formData.append('qAndAEnabled', state.bidData.qAndAEnabled);
    formData.append('bidDescriptions[0][body]', state.bidData.bidDescriptions[0].body);
    if (state.bidData.bidDescriptions.length > 1) {
      for (let d = 1; d < state.bidData.bidDescriptions.length; d++) {
        formData.append(`bidDescriptions[${d}][name]`, state.bidData.bidDescriptions[d].name);
        formData.append(`bidDescriptions[${d}][body]`, state.bidData.bidDescriptions[d].body);
      }
    }
    formData.append('userId', payload.userId);
    formData.append('companyId', payload.companyId);
    formData.append('company', payload.company);

    try {
      const res = await axios.post('bid/draft/createDraft', formData, config);
      if (res.status == 200) {
        commit('setBidData', res.data);
        dispatch('getTeamMembers', payload.company);
        dispatch('getSalesReps', { query: '', basin: 'all' });
        dispatch('getCategories');
        dispatch('searchByCompany', { query: '', basin: 'all' });
        commit('setDraftBidsList', res.data.id);
        commit('setBidSerial', res.data.serial);
        state.bidData.statusType = 'draftBid';
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

    if (state.bidData.id) {
      state.draftBidsList = state.bidData.id;
      state.bidSerial = state.bidData.serial;
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
    formData.append('serial', state.bidSerial);

    formData.append('bidDescriptions[0][body]', state.bidData.bidDescriptions[0].body);
    if (state.bidData.bidDescriptions.length > 1) {
      for (let d = 1; d < state.bidData.bidDescriptions.length; d++) {
        formData.append(`bidDescriptions[${d}][name]`, state.bidData.bidDescriptions[d].name);
        formData.append(`bidDescriptions[${d}][body]`, state.bidData.bidDescriptions[d].body);
      }
    }

    if (state.invitedSuppliers != null) {
      for (let i = 0; i < state.invitedSuppliers.length; i++) {
        if (!state.invitedSuppliers[i].type) {
          formData.append(`invitedSuppliers[${i}]`, state.invitedSuppliers[i]);
        } else if (state.invitedSuppliers[i].type == 'user') {
          formData.append(`invitedSuppliers[${i}]`, state.invitedSuppliers[i].item.companyId);
        } else {
          formData.append(`invitedSuppliers[${i}]`, state.invitedSuppliers[i].item.objectID);
        }
      }
    }
    if (state.invitedTeamMembers != null) {
      for (let t = 0; t < state.invitedTeamMembers.length; t++) {
        if (!state.invitedTeamMembers[t].id) {
          formData.append(`invitedTeamMembers[${t}]`, state.invitedTeamMembers[t]);
        } else {
          formData.append(`invitedTeamMembers[${t}]`, state.invitedTeamMembers[t].id);
        }
      }
    }

    if (state.bidlines != null) {
      for (let i = 0; i < state.bidlines.length; i++) {
        formData.append(`lineItems[${i}][id]`, state.bidlines[i].id);
        formData.append(`lineItems[${i}][description]`, state.bidlines[i].description);
        formData.append(`lineItems[${i}][unit]`, state.bidlines[i].unit);
        formData.append(`lineItems[${i}][inputType]`, state.bidlines[i].inputType);
        formData.append(`lineItems[${i}][quantity]`, state.bidlines[i].quantity);
        formData.append(`lineItems[${i}][buyerComment]`, state.bidlines[i].buyerComment);
        formData.append(`lineItems[${i}][required]`, state.bidlines[i].required);
      }
    }

    if (state.attachement != null) {
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

    if (state.questions != null) {
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
  async publishBid({ commit, state, dispatch }, payload) {
    try {
      await dispatch('updateDraftBid', 'update');
      const res = await axios.post('bid/publishBid', {
        draftBidId: state.draftBidsList,
      });
      if (res.status == 200) {
        commit('setDraftBidsList', null);
        commit('setDraftTime', null);
        commit('setDraftTime', null);
        commit('setAttachData', null);
        commit('setBidData', null);
        commit('setInvitedSuppliersData', null);
        commit('setInvitedTeamMembers', null);
        commit('setBidlines', null);
        commit('setAttachement', null);
        commit('setQuestions', null);
        commit('setDraftBidData', null);
        const bidDetail = await axios.get(`bid/getBid/${res.data._path.segments[1]}`);
        return bidDetail.data.serial;
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
        // commit('setAttachement',res.data);
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
  async getBidTemplates({ commit, state, dispatch }, payload) {
    try {
      const res = await axios.get('bid/getBidTemplates/');
      if (res.status == 200) {
        commit('setBidTemplates', res.data);
      }
    } catch (err) {
      if (state.apiCounter == 2) {
        dispatch('apiSignOutAction');
      } else if (err.response.status === 403) {
        await dispatch('refreshToken');
        state.apiCounter = 2;
        dispatch('getBidTemplates', payload);
      }
    }
  },
  async deleteTemplate({ commit, state, dispatch }, payload) {
    try {
      const res = await axios.post('bid/deleteTemplateBid/', { templateId: payload.id });
      if (res.status == 200) {
        commit('setDraftBidsList', null);
        commit('setDraftTime', null);
        commit('setDraftTime', null);
        commit('setAttachData', null);
        commit('setBidTitle', '');
        commit('setBidType', '');
        commit('setBidDueDate', '');
        commit('setBidDueTime', '');
        commit('setBidRegions', '');
        commit('setBidEnabled', '');
        state.bidData.id = '';
        state.bidData.status = '';
        state.bidData.statusType = '';
        commit('setInvitedSuppliersData', null);
        commit('setInvitedTeamMembers', null);
        commit('setBidlines', null);
        commit('setAttachement', null);
        commit('setQuestions', null);
        commit('setDraftBidData', null);
        dispatch('getBidTemplates');
      }
    } catch (err) {
      if (state.apiCounter == 2) {
        dispatch('apiSignOutAction');
      } else if (err.response.status === 403) {
        await dispatch('refreshToken');
        state.apiCounter = 2;
        dispatch('deleteTemplate', payload);
      }
    }
  },
  async updateTemplateNote({ commit, state, dispatch }, payload) {
    try {
      const res = await axios.post('bid/editTemplateNote/', { templateId: payload.templateId, note: payload.note });
      if (res.status == 200) {
        dispatch('getBidTemplates');
      }
    } catch (err) {
      if (state.apiCounter == 2) {
        dispatch('apiSignOutAction');
      } else if (err.response.status === 403) {
        await dispatch('refreshToken');
        state.apiCounter = 2;
        dispatch('deleteTemplate', payload);
      }
    }
  },
  async getEditTemplate({ commit, state, dispatch }, payload) {
    commit('setPageLoader', true);
    try {
      const res = await axios.get(`bid/getBidDetailsById/${payload.id}`);
      if (res.status == 200) {
        commit('getSingleTemplate', res.data);
        commit('setBidData', res.data);
        dispatch('getTeamMembers', payload.company);
        dispatch('getSalesReps', { query: '', basin: 'all' });
        dispatch('getCategories');
        dispatch('searchByCompany', { query: '', basin: 'all' });
        // commit('setDraftBidData', res.data);
        state.bidData.status = 'templateUpdate';
        state.bidData.statusType = 'template';
        commit('setPageLoader', false);
        router.replace('/create-template');
      }
    } catch (err) {
      if (state.apiCounter == 2) {
        dispatch('apiSignOutAction');
      } else if (err.response.status === 403) {
        await dispatch('refreshToken');
        state.apiCounter = 2;
        dispatch('getEditTemplate', payload);
      }
    }
  },
  async saveTemplateBid({ commit, dispatch, state }, payload) {
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
    formData.append('bidDescriptions[0][body]', state.bidData.bidDescriptions[0].body);
    if (state.bidData.bidDescriptions.length > 1) {
      for (let d = 1; d < state.bidData.bidDescriptions.length; d++) {
        formData.append(`bidDescriptions[${d}][name]`, state.bidData.bidDescriptions[d].name);
        formData.append(`bidDescriptions[${d}][body]`, state.bidData.bidDescriptions[d].body);
      }
    }
    formData.append('userId', payload.userId);
    formData.append('userName', payload.userName);
    formData.append('companyId', payload.companyId);
    formData.append('company', payload.company);
    formData.append('lineItems', []);
    formData.append('invitedSuppliers', []);
    formData.append('invitedNewSuppliers', []);
    formData.append('invitedTeamMembers', []);
    formData.append('questions', []);
    formData.append('attachment', []);

    try {
      const res = await axios.post('bid/createTemplateBid', formData, config);
      if (res.status == 200) {
        commit('setBidData', res.data);
        dispatch('getTeamMembers', payload.company);
        dispatch('getSalesReps', { query: '', basin: 'all' });
        dispatch('getCategories');
        dispatch('searchByCompany', { query: '', basin: 'all' });
        commit('setDraftBidsList', res.data.id);
        state.bidData.status = 'templateCreate';
        state.bidData.statusType = 'template';
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
        dispatch('saveTemplateBid', payload);
      }
    }
  },
  async getDraftBySerial({ commit, state, dispatch }, payload) {
    commit('setPageLoader', true);
    try {
      const res = await axios.get(
        `bid/draft/getDraftBySerial/${payload.serial}`,
      );

      if (res.status === 200) {
        dispatch('getTeamMembers', payload.company);
        dispatch('getSalesReps', { query: '', basin: 'all' });
        dispatch('getCategories');
        dispatch('searchByCompany', { query: '', basin: 'all' });
        // commit('setDraftBidData', res.data);
        commit('setBidData', res.data);
        commit('setPageLoader', false);
        state.bidData.statusType = 'draftBid';
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
  },
  async updateTemplate({ commit, state }, payload) {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
      },
    };
    const formData = new FormData();

    if (state.bidData.id) {
      state.draftBidsList = state.bidData.id;
    }
    formData.append('templateId', state.draftBidsList);
    formData.append('title', state.bidData.title);
    formData.append('type', state.bidData.type);
    formData.append('dueDate', state.bidData.dueDate);
    formData.append('dueTime', state.bidData.dueTime);
    formData.append('regions', state.bidData.regions);
    formData.append('qAndAEnabled', state.bidData.qAndAEnabled);
    formData.append('userId', state.bidData.userId);
    formData.append('userName', state.bidData.userName);
    formData.append('companyId', state.bidData.companyId);
    formData.append('company', state.bidData.company);

    formData.append('bidDescriptions[0][body]', state.bidData.bidDescriptions[0].body);
    if (state.bidData.bidDescriptions.length > 1) {
      for (let d = 1; d < state.bidData.bidDescriptions.length; d++) {
        formData.append(`bidDescriptions[${d}][name]`, state.bidData.bidDescriptions[d].name);
        formData.append(`bidDescriptions[${d}][body]`, state.bidData.bidDescriptions[d].body);
      }
    }

    if (state.bidData.status == 'templateCreate') {
      if (state.invitedSuppliers) {
        for (let i = 0; i < state.invitedSuppliers.length; i++) {
          if (!state.invitedSuppliers[i].type) {
            formData.append(`invitedSuppliers[${i}]`, state.invitedSuppliers[i]);
          } else if (state.invitedSuppliers[i].type == 'user') {
            formData.append(`invitedSuppliers[${i}]`, state.invitedSuppliers[i].item.companyId);
          } else {
            formData.append(`invitedSuppliers[${i}]`, state.invitedSuppliers[i].item.objectID);
          }
        }
      } else {
        formData.append('invitedSuppliers', '');
      }
    } else if (state.invitedSuppliers != null) {
      for (let i = 0; i < state.invitedSuppliers.length; i++) {
        if (!state.invitedSuppliers[i].type) {
          formData.append(`invitedSuppliers[${i}]`, state.invitedSuppliers[i]);
        } else if (state.invitedSuppliers[i].type == 'user') {
          formData.append(`invitedSuppliers[${i}]`, state.invitedSuppliers[i].item.companyId);
        } else {
          formData.append(`invitedSuppliers[${i}]`, state.invitedSuppliers[i].item.objectID);
        }
      }
    } else {
      formData.append('invitedSuppliers', '');
    }
    if (state.bidData.status == 'templateCreate') {
      if (state.invitedTeamMembers) {
        for (let t = 0; t < state.invitedTeamMembers.length; t++) {
          if (!state.invitedTeamMembers[t].id) {
            formData.append(`invitedTeamMembers[${t}]`, state.invitedTeamMembers[t]);
          } else {
            formData.append(`invitedTeamMembers[${t}]`, state.invitedTeamMembers[t].id);
          }
        }
      } else {
        formData.append('invitedTeamMembers', '');
      }
    } else if (state.invitedTeamMembers != null) {
      for (let t = 0; t < state.invitedTeamMembers.length; t++) {
        if (!state.invitedTeamMembers[t].id) {
          formData.append(`invitedTeamMembers[${t}]`, state.invitedTeamMembers[t]);
        } else {
          formData.append(`invitedTeamMembers[${t}]`, state.invitedTeamMembers[t].id);
        }
      }
    } else {
      formData.append('invitedTeamMembers', '');
    }

    if (state.bidData.status == 'templateCreate') {
      if (state.bidlines) {
        for (let i = 0; i < state.bidlines.length; i++) {
          formData.append(`lineItems[${i}][id]`, state.bidlines[i].id);
          formData.append(`lineItems[${i}][description]`, state.bidlines[i].description);
          formData.append(`lineItems[${i}][unit]`, state.bidlines[i].unit);
          formData.append(`lineItems[${i}][inputType]`, state.bidlines[i].inputType);
          formData.append(`lineItems[${i}][quantity]`, state.bidlines[i].quantity);
          formData.append(`lineItems[${i}][buyerComment]`, state.bidlines[i].buyerComment);
          formData.append(`lineItems[${i}][required]`, state.bidlines[i].required);
        }
      } else {
        formData.append('lineItems', '');
      }
    } else if (state.bidlines != null) {
      for (let i = 0; i < state.bidlines.length; i++) {
        formData.append(`lineItems[${i}][id]`, state.bidlines[i].id);
        formData.append(`lineItems[${i}][description]`, state.bidlines[i].description);
        formData.append(`lineItems[${i}][unit]`, state.bidlines[i].unit);
        formData.append(`lineItems[${i}][inputType]`, state.bidlines[i].inputType);
        formData.append(`lineItems[${i}][quantity]`, state.bidlines[i].quantity);
        formData.append(`lineItems[${i}][buyerComment]`, state.bidlines[i].buyerComment);
        formData.append(`lineItems[${i}][required]`, state.bidlines[i].required);
      }
    } else {
      formData.append('lineItems', '');
    }

    if (state.bidData.status == 'templateCreate') {
      if (state.attachement) {
        for (let i = 0; i < state.attachement.length; i++) {
          formData.append(`attachment[${i}][fileName]`, state.attachement[i].fileName);
          formData.append(`attachment[${i}][fileSize]`, state.attachement[i].fileSize);
          formData.append(`attachment[${i}][uploadedBy]`, state.attachement[i].uploadedBy);
          formData.append(`attachment[${i}][url]`, state.attachement[i].url);
          formData.append(`attachment[${i}][uploadedAt]`, state.attachement[i].uploadedAt);
          formData.append(`attachment[${i}][comment]`, state.attachement[i].comment);
          formData.append(`attachment[${i}][id]`, state.attachement[i].id);
        }
      } else {
        formData.append('attachment', '');
      }
    } else if (state.attachement != null) {
      for (let i = 0; i < state.attachement.length; i++) {
        formData.append(`attachment[${i}][fileName]`, state.attachement[i].fileName);
        formData.append(`attachment[${i}][fileSize]`, state.attachement[i].fileSize);
        formData.append(`attachment[${i}][uploadedBy]`, state.attachement[i].uploadedBy);
        formData.append(`attachment[${i}][url]`, state.attachement[i].url);
        formData.append(`attachment[${i}][uploadedAt]`, state.attachement[i].uploadedAt);
        formData.append(`attachment[${i}][comment]`, state.attachement[i].comment);
        formData.append(`attachment[${i}][id]`, state.attachement[i].id);
      }
    } else {
      formData.append('attachment', '');
    }

    if (state.bidData.status == 'templateCreate') {
      if (state.questions) {
        for (let i = 0; i < state.questions.length; i++) {
          formData.append(`questions[${i}][id]`, state.questions[i].id);
          formData.append(`questions[${i}][order]`, state.questions[i].order);
          formData.append(`questions[${i}][title]`, state.questions[i].title);
          formData.append(`questions[${i}][type]`, state.questions[i].type);
          formData.append(`questions[${i}][questionType]`, state.questions[i].questionType);
          formData.append(`questions[${i}][required]`, state.questions[i].required);
          if (state.questions[i].options) {
            for (let j = 0; j < state.questions[i].options.length; j++) {
              formData.append(`questions[${i}][options][${j}][id]`, state.questions[i].options[j].id);
              formData.append(`questions[${i}][options][${j}][label]`, state.questions[i].options[j].label);
              formData.append(`questions[${i}][options][${j}][title]`, state.questions[i].options[j].title);
            }
          }
        }
      } else {
        formData.append('questions', '');
      }
    } else if (state.questions != null) {
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
    } else {
      formData.append('questions', '');
    }

    try {
      const res = await axios.post('bid/editTemplateBid/', formData, config);
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

        dispatch('updateTemplate', payload);
      }
    }
  },

  async publishTemplate({ commit, state, dispatch }, payload) {
    try {
      await dispatch('updateTemplate', 'update');
      commit('setDraftBidsList', null);
      commit('setDraftTime', null);
      commit('setDraftTime', null);
      commit('setAttachData', null);
      // commit('setBidData', null);

      commit('setInvitedSuppliersData', null);
      commit('setInvitedTeamMembers', null);
      commit('setBidlines', null);
      commit('setAttachement', null);
      commit('setQuestions', null);
      commit('setDraftBidData', null);
      commit('setBidTitle', '');
      commit('setBidType', '');
      commit('setBidDueDate', '');
      commit('setBidDueTime', '');
      commit('setBidRegions', '');
      commit('setBidEnabled', '');
      state.bidData.id = '';
      state.bidData.status = '';
      state.bidData.statusType = '';
      commit('setBidDescription', [{ body: '' }]);

      return;
    } catch (err) {
      console.log(err);
    }
  },

  async deleteDraftBid({ commit, state, dispatch }, payload) {
    try {
      const res = await axios.post('bid/draft/deleteDraft/', { draftId: payload.draftId });
      if (res.status == 200) {
        router.replace('/view-bids');
      }
    } catch (err) {
      if (state.apiCounter == 2) {
        dispatch('apiSignOutAction');
      } else if (err.response.status === 403) {
        await dispatch('refreshToken');
        state.apiCounter = 2;
        dispatch('deleteDraftBid', payload);
      }
    }
  },
  async getUpdateBid({ commit, state, dispatch }, payload) {
    try {
      commit('setPageLoader', true);
      const res = await axios.get(
        `bid/getBidBySerial/${payload.serial}/${payload.id}`,
      );

      if (res.status === 200) {
        console.log(res.data, 'dd');
        dispatch('getTeamMembers', payload.company);
        dispatch('getSalesReps', { query: '', basin: 'all' });
        dispatch('getCategories');
        dispatch('searchByCompany', { query: '', basin: 'all' });
        commit('setBidData', res.data.bidData);
        commit('setPageLoader', false);
      } else {
        commit('setPageLoader', false);
      }
    } catch (err) {
      commit('setPageLoader', false);
      if (state.apiCounter == 2) {
        dispatch('apiSignOutAction');
      } else if (err.response.status === 403) {
        await dispatch('refreshToken');
        state.apiCounter = 2;
        dispatch('getUpdateBid', payload);
      }
    }
  },
  async updateBid({ commit, state }, payload) {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
      },
    };
    const formData = new FormData();

    if (state.bidData.id) {
      state.draftBidsList = state.bidData.id;
      state.bidSerial = state.bidData.serial;
    }
    if (state.bidData.company == '') {
      state.bidData.company = payload.company;
    }
    formData.append('bidId', state.draftBidsList);
    formData.append('title', state.bidData.title);
    formData.append('type', state.bidData.type);
    formData.append('dueDate', state.bidData.dueDate);
    formData.append('dueTime', state.bidData.dueTime);
    formData.append('regions', state.bidData.regions);
    formData.append('qAndAEnabled', state.bidData.qAndAEnabled);
    formData.append('userId', state.bidData.userId.id);
    formData.append('companyId', state.bidData.companyId);
    formData.append('company', state.bidData.company);
    // formData.append('serial', state.bidSerial);

    formData.append('bidDescriptions[0][body]', state.bidData.bidDescriptions[0].body);
    if (state.bidData.bidDescriptions.length > 1) {
      for (let d = 1; d < state.bidData.bidDescriptions.length; d++) {
        formData.append(`bidDescriptions[${d}][name]`, state.bidData.bidDescriptions[d].name);
        formData.append(`bidDescriptions[${d}][body]`, state.bidData.bidDescriptions[d].body);
      }
    }

    if (state.invitedSuppliers != '') {
      for (let i = 0; i < state.invitedSuppliers.length; i++) {
        if (!state.invitedSuppliers[i].type) {
          formData.append(`invitedSuppliers[${i}]`, state.invitedSuppliers[i].id);
        } else if (state.invitedSuppliers[i].type == 'user') {
          formData.append(`invitedSuppliers[${i}]`, state.invitedSuppliers[i].item.companyId);
        } else {
          formData.append(`invitedSuppliers[${i}]`, state.invitedSuppliers[i].item.objectID);
        }
      }
    } else {
      formData.append('invitedSuppliers', '');
    }
    if (state.invitedTeamMembers != '') {
      for (let t = 0; t < state.invitedTeamMembers.length; t++) {
        if (!state.invitedTeamMembers[t].id) {
          formData.append(`invitedTeamMembers[${t}]`, state.invitedTeamMembers[t]);
        } else {
          formData.append(`invitedTeamMembers[${t}]`, state.invitedTeamMembers[t].id);
        }
      }
    } else {
      formData.append('invitedTeamMembers', '');
    }

    if (state.bidlines != '') {
      for (let i = 0; i < state.bidlines.length; i++) {
        formData.append(`lineItems[${i}][id]`, state.bidlines[i].id);
        formData.append(`lineItems[${i}][description]`, state.bidlines[i].description);
        formData.append(`lineItems[${i}][unit]`, state.bidlines[i].unit);
        formData.append(`lineItems[${i}][inputType]`, state.bidlines[i].inputType);
        formData.append(`lineItems[${i}][quantity]`, state.bidlines[i].quantity);
        formData.append(`lineItems[${i}][buyerComment]`, state.bidlines[i].buyerComment);
        formData.append(`lineItems[${i}][required]`, state.bidlines[i].required);
      }
    } else {
      formData.append('lineItems', '');
    }

    if (state.attachement != '') {
      for (let i = 0; i < state.attachement.length; i++) {
        formData.append(`attachments[${i}][fileName]`, state.attachement[i].fileName);
        formData.append(`attachments[${i}][fileSize]`, state.attachement[i].fileSize);
        formData.append(`attachments[${i}][uploadedBy]`, state.attachement[i].uploadedBy);
        formData.append(`attachments[${i}][url]`, state.attachement[i].url);
        formData.append(`attachments[${i}][uploadedAt]`, state.attachement[i].uploadedAt);
        formData.append(`attachments[${i}][comment]`, state.attachement[i].comment);
        formData.append(`attachments[${i}][id]`, state.attachement[i].id);
      }
    } else {
      formData.append('attachments', '');
    }

    if (state.questions != '') {
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
    } else {
      formData.append('questions', '');
    }
    try {
      const res = await axios.post('bid/editBid/', formData, config);
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
        dispatch('updateBid', payload);
      }
    }
  },

  async publishUpdateBid({ commit, state, dispatch }, payload) {
    try {
      await dispatch('updateBid', 'update');

      commit('setDraftBidsList', null);
      commit('setDraftTime', null);
      commit('setDraftTime', null);
      commit('setAttachData', null);
      commit('setBidData', null);
      commit('setInvitedSuppliersData', null);
      commit('setInvitedTeamMembers', null);
      commit('setBidlines', null);
      commit('setAttachement', null);
      commit('setQuestions', null);
      commit('setDraftBidData', null);
      return;
    } catch (err) {
      if (state.apiCounter == 2) {
        dispatch('apiSignOutAction');
      } else if (err.response.status === 403) {
        await dispatch('refreshToken');
        state.apiCounter = 2;

        dispatch('publishUpdateBid', payload);
      }
    }
  },

};
