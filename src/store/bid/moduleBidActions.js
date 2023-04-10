/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line import/no-cycle
import router from '@/router';
import axios from 'axios';

export default {
  async getTeamMembers({ commit, dispatch, state }, payload) {
    try {
      const res = await axios.get(`v2/company/getTeamMembers/${payload}`);
      if (res.status === 200) {
        commit('setTeamMembers', res.data);
        commit('setTeamMembersInitial', res.data);
        commit('setPageLoader', false);
      } else {
        commit('setTeamMembers', null);
      }
    } catch (err) {
      if (state.apiCounter === 2) {
        dispatch('apiSignOutAction');
      } else if (err.response && err.response.status === 403) {
        await dispatch('refreshToken');
        state.apiCounter = 2;
        dispatch('getTeamMembers', payload);
      }
    }
  },
  async getSalesReps({ commit, dispatch, state }, payload) {
    try {
      const res = await axios.get('v2/company/getSalesReps/', { query: payload.query, basin: payload.basin });

      if (res.status === 200) {
        commit('setSalesReps', res.data);
      } else {
        commit('setSalesReps', null);
      }
    } catch (err) {
      if (state.apiCounter === 2) {
        dispatch('apiSignOutAction');
      } else if (err.response && err.response.status === 403) {
        await dispatch('refreshToken');
        state.apiCounter = 2;
        dispatch('getSalesReps', payload);
      }
    }
  },
  async searchByCompany({ commit, dispatch, state }, payload) {
    try {
      const res = await axios.post('v2/company/searchCompanies/', { query: payload.query, basin: payload.basin });

      if (res.status === 200) {
        commit('setCompaniesList', res.data);
      } else {
        commit('setCompaniesList', null);
      }
    } catch (err) {
      if (state.apiCounter === 2) {
        dispatch('apiSignOutAction');
      } else if (err.response && err.response.status === 403) {
        await dispatch('refreshToken');
        state.apiCounter = 2;
        dispatch('searchByCompany', payload);
      }
    }
  },

  async getCompanyByServices({ commit, dispatch, state }, payload) {
    try {
      const res = await axios.get(`v2/company/getCompaniesByService/${payload}`);

      if (res.status === 200) {
        commit('setCompaniesList', res.data);
      } else {
        commit('setCompaniesList', null);
      }
    } catch (err) {
      if (state.apiCounter === 2) {
        dispatch('apiSignOutAction');
      } else if (err.response && err.response.status === 403) {
        await dispatch('refreshToken');
        state.apiCounter = 2;
        dispatch('getCompanyByServices', payload);
      }
    }
  },
  async getDraftBids({ commit, dispatch, state }, payload) {
    try {
      const res = await axios.get(`v2/bid/draft/getUserDrafts/${payload}`);

      if (res.status === 200) {
        commit('setDraftBidsList', res.data);
      }
    } catch (err) {
      if (state.apiCounter === 2) {
        dispatch('apiSignOutAction');
      } else if (err.response && err.response.status === 403) {
        await dispatch('refreshToken');
        state.apiCounter = 2;
        dispatch('getDraftBids', payload);
      }
    }
  },
  async getBidsLists({ commit, dispatch, state }, payload) {
    commit('setPageLoader', true);
    try {
      const res = await axios.get(`v2/bid/getBidList/${payload}`);
      if (res.status === 200) {
        commit('setBidsList', res.data);
        commit('setPageLoader', false);
      }
    } catch (err) {
      if (state.apiCounter === 2) {
        dispatch('apiSignOutAction');
      } else if (err.response && err.response.status === 403) {
        await dispatch('refreshToken');
        state.apiCounter = 2;
        dispatch('getBidsLists', payload);
      }
    }
  },

  async getBidBySerial({ commit, dispatch, state }, payload) {
    if (payload.reload === false) {
      commit('setPageLoader', false);
    } else {
      commit('setPageLoader', true);
    }
    try {
      console.log("PAYLOAAD", payload)
      commit('removeSupplierAttachment');
      const res = await axios.get(
        `v2/bid/getBidBySerial/${payload.serial}/${payload.id}`,
      );

      if (res.status === 200) {
        commit('setBidViewData', res.data);
        commit('setViewBidError', false);
        commit('setUserType', res.data.user_type);
        commit('setTeamMembersForBid', []);
        if (res.data.user_type === 'buyer') {
          await dispatch('getSalesReps', { query: '', basin: 'all' });
          await dispatch('getCategories');
          await dispatch('searchByCompany', { query: '', basin: 'all' });

          await dispatch('getTeamMembers', payload.company);

          commit('setInvitedSuppliersData', res.data.bidData.invitedSuppliers);

          commit('setInvitedNewSuppliers', res.data.bidData.invitedNewSuppliers);

          commit('setTeamMembersForBid', res.data.bidData.invitedTeamMembers);
        }

        if (res.data.user_type === 'supplier' && res.data.supplierSubmissions) {
          commit('setSupplierBid', res.data.supplierSubmissions);
          commit('setIsBidSubmitted', true);
        } else {
          commit('setIsBidSubmitted', false);
        }
        commit('setPageLoader', false);
      } else {
        commit('setPageLoader', false);
        commit('setViewBidError', false);
      }
    } catch (err) {
      commit('setPageLoader', false);
      commit('setViewBidError', true);
      if (state.bidApiCounter === 2) {
        dispatch('apiSignOutAction');
      } else if (err.response && err.response.status === 403) {
        await dispatch('refreshToken');
        state.bidApiCounter = 2;
        dispatch('getBidBySerial', payload);
      }
    }
  },

  async deleteBid({ commit, dispatch, state }, payload) {
    try {
      const res = await axios.post('v2/bid/deleteBid/', {
        bidId: payload.bidId,
      });

      if (res.status === 200) {
        commit('setBidViewData', null);
        router.replace({ name: 'ViewBids' });
        commit('setSuccessDeleteBid');
      }
    } catch (err) {
      commit('setErrorDeleteBid');
      if (state.apiCounter === 2) {
        dispatch('apiSignOutAction');
      } else if (err.response && err.response.status === 403) {
        await dispatch('refreshToken');
        state.apiCounter = 2;
        dispatch('deleteBid', payload);
      }
    }
  },
  async getIntent({ commit, dispatch, state }, payload) {
    if (payload.reload === false) {
      commit('setPageLoader', false);
    } else {
      commit('setPageLoader', true);
    }
    try {
      const res = await axios.get(`intend/getIntends/${payload.companyId}/${payload.bidId}/${payload.companyName}`);

      if (res.status === 200) {
        if (res.data) {
          commit('setBidIntent', res.data.answer);
          commit('setIntentId', res.data.id);
        } else {
          commit('setBidIntent', null);
        }
        commit('setPageLoader', false);
      }
    } catch (err) {
      commit('setPageLoader', false);
      if (state.apiCounter === 2) {
        dispatch('apiSignOutAction');
      } else if (err.response && err.response.status === 403) {
        await dispatch('refreshToken');
        state.apiCounter = 2;
        dispatch('getIntent', payload);
      }
    }
  },

  async getAllIntent({ commit, dispatch, state }, payload) {
    if (payload.reload === false) {
      commit('setPageLoader', false);
    } else {
      commit('setPageLoader', true);
    }
    try {
      console.log("intend payload", payload)
      const res = await axios.get(`intend/getAllIntends/${payload.bidId}`);

      if (res.status === 200) {
        commit('setAllIntend', res.data);
        commit('setPageLoader', false);
      }
    } catch (err) {
      commit('setPageLoader', false);
      if (state.apiCounter === 2) {
        dispatch('apiSignOutAction');
      } else if (err.response && err.response.status === 403) {
        await dispatch('refreshToken');
        state.apiCounter = 2;
        dispatch('getAllIntent', payload);
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
      if (state.apiCounter === 2) {
        dispatch('apiSignOutAction');
      } else if (err.response && err.response.status === 403) {
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
        commit('setIntentId', res.data);
      }
    } catch (err) {
      if (state.apiCounter === 2) {
        dispatch('apiSignOutAction');
      } else if (err.response && err.response.status === 403) {
        await dispatch('refreshToken');
        state.apiCounter = 2;
        dispatch('makeIntent', payload);
      }
    }
  },

  async awardCompany({ commit, dispatch, state }, payload) {
    try {
      const res = await axios.post('v2/bid/bidAwardees/', {
        companyId: payload.companyId,
        bidId: payload.bidId,
        userId: payload.userId,
      });

      if (res.status === 200) {
        dispatch('getBidBySerial', {
          id: payload.userId,
          serial: payload.serial,
          company: payload.company,
        });
        commit('setAwardAlert');
      }
    } catch (err) {
      if (state.apiCounter === 2) {
        dispatch('apiSignOutAction');
      } else if (err.response && err.response.status === 403) {
        await dispatch('refreshToken');
        state.apiCounter = 2;
        dispatch('awardCompany', payload);
      }
    }
  },
  async rejectCompany({ commit, dispatch, state }, payload) {
    try {
      const res = await axios.post('v2/bid/bidRejectees/', {
        companyId: payload.companyId,
        bidId: payload.bidId,
        userId: payload.userId,
      });

      if (res.status === 200) {
        dispatch('getBidBySerial', {
          id: payload.userId,
          serial: payload.serial,
          company: payload.company,
        });
        commit('setDisqualifyAlert');
      }
    } catch (err) {
      if (state.apiCounter === 2) {
        dispatch('apiSignOutAction');
      } else if (err.response && err.response.status === 403) {
        await dispatch('refreshToken');
        state.apiCounter = 2;
        dispatch('rejectCompany', payload);
      }
    }
  },

  async UnAwardCompany({ commit, dispatch, state }, payload) {
    try {
      const res = await axios.post('v2/bid/bidUnaward/', {
        companyId: payload.companyId,
        bidId: payload.bidId,
      });

      if (res.status === 200) {
        dispatch('getBidBySerial', {
          id: payload.userId,
          serial: payload.serial,
          company: payload.company,
        });
        commit('setUnAwardAlert');
      }
    } catch (err) {
      if (state.apiCounter === 2) {
        dispatch('apiSignOutAction');
      } else if (err.response && err.response.status === 403) {
        await dispatch('refreshToken');
        state.apiCounter = 2;
        dispatch('UnAwardCompany', payload);
      }
    }
  },
  async UnDisqualifyCompany({ commit, dispatch, state }, payload) {
    try {
      const res = await axios.post('v2/bid/bidUndisqualify/', {
        companyId: payload.companyId,
        bidId: payload.bidId,
      });

      if (res.status === 200) {
        dispatch('getBidBySerial', {
          id: payload.userId,
          serial: payload.serial,
          company: payload.company,
        });
        commit('setUnDisqualifyAlert');
      }
    } catch (err) {
      if (state.apiCounter === 2) {
        dispatch('apiSignOutAction');
      } else if (err.response && err.response.status === 403) {
        await dispatch('refreshToken');
        state.apiCounter = 2;
        dispatch('UnDisqualifyCompany', payload);
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
        formData.append(`lineItems[${i}][id]`, payload.lineItems[i].id);
        formData.append(`lineItems[${i}][Qty]`, payload.lineItems[i].quantity);
        formData.append(`lineItems[${i}][required]`, payload.lineItems[i].required);
      }
    }

    if (payload.answers) {
      for (let i = 0; i < payload.answers.length; i++) {
        formData.append(`answers[${i}][questionId]`, payload.answers[i].questionId);
        formData.append(`answers[${i}][answer]`, payload.answers[i].answer);
      }
    }
    try {
      const res = await axios.post('v2/bid/submitBid/', formData, config);

      if (res.status === 200) {
        commit('setIsBidSubmitted', true);
        commit('removeSupplierAttachment');
        dispatch('getBidBySerial', {
          id: payload.userId,
          serial: payload.serial,
        });
      }
    } catch (err) {
      if (err.response && err.response.status === 400 && err.response.data.message === 'Please add a price for all required items') {
        commit('setBidSubmissionValidationAlert', 'Please add a price for all required line items');
      }

      if (err.response && err.response.status === 400 && err.response.data.message === 'Please add a valid price for all items') {
        commit('setBidSubmissionValidationAlert', 'Please add a valid price or click the "X" button that you are no-biding for each line item');
      }
      if (state.apiCounter === 2) {
        dispatch('apiSignOutAction');
      } else if (err.response && err.response.status === 403) {
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
        formData.append(`lineItems[${i}][id]`, payload.lineItems[i].id);
        formData.append(`lineItems[${i}][Qty]`, payload.lineItems[i].quantity);
        formData.append(`lineItems[${i}][required]`, payload.lineItems[i].required);
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
      const res = await axios.post('v2/bid/editSubmitBid/', formData, config);

      if (res.status === 200) {
        commit('removeSupplierAttachment');
        dispatch('getBidBySerial', {
          id: payload.userId,
          serial: payload.serial,
        });
        commit('setAlertEditBidSubmissionSuccess');
      }
    } catch (err) {
      if (err.response && err.response.status === 400 && err.response.data.message === 'Please add a price for all required items') {
        commit('setBidSubmissionValidationAlert', 'Please add a price for all required line items');
      }

      if (err.response && err.response.status === 400 && err.response.data.message === 'Please add a valid price for all items') {
        commit('setBidSubmissionValidationAlert', 'Please add a valid price or click the "X" button that you are no-biding for each line item')
      }
      if (state.apiCounter === 2) {
        dispatch('apiSignOutAction');
      } else if (err.response && err.response.status === 403) {
        await dispatch('refreshToken');
        state.apiCounter = 2;
        dispatch('editSubmitBid', payload);
      }
    }
  },

  async getQA({ commit, dispatch, state }, payload) {
    if (payload.reload === false) {
      commit('setPageLoader', false);
    } else {
      commit('setPageLoader', true);
    }
    try {
      const res = await axios.get(`v2/bid/getQA/${payload.bidId}/${payload.userId}`);

      if (res.status === 200) {
        commit('setQAndA', res.data);

        let unAnsweredCount = 0;
        let answeredCount = 0;

        res.data.forEach((el) => {
          if (!el.answer) { unAnsweredCount++; } else { answeredCount++; }
        });

        commit('setUnansweredQuestionCount',
          unAnsweredCount);
        commit('setAnsweredQuestionCount', answeredCount);

        commit('setPageLoader', false);
      }
    } catch (err) {
      commit('setPageLoader', false);
      if (state.apiCounter === 2) {
        dispatch('apiSignOutAction');
      } else if (err.response && err.response.status === 403) {
        await dispatch('refreshToken');
        state.apiCounter = 2;
        dispatch('getQA', payload);
      }
    }
  },

  async askQuestion({ commit, dispatch, state }, payload) {
    try {
      const res = await axios.post('v2/bid/questionAsked/', {
        question: payload.question,
        userId: payload.userId,
        companyId: payload.companyId,
        bidId: payload.bidId,
      });

      if (res.status === 200) {
        dispatch('getQA', { bidId: payload.bidId, userId: payload.userId });
      }
    } catch (err) {
      if (state.apiCounter === 2) {
        dispatch('apiSignOutAction');
      } else if (err.response && err.response.status === 403) {
        await dispatch('refreshToken');
        state.apiCounter = 2;
        dispatch('askQuestion', payload);
      }
    }
  },

  async answerQuestion({ commit, dispatch, state }, payload) {
    try {
      const res = await axios.post('v2/bid/questionAnswer/', {
        answer: payload.answer,
        userId: payload.userId,
        questionId: payload.questionId,
        bidId: payload.bidId,
      });

      if (res.status === 200) {
        dispatch('getQA', { bidId: payload.bidId, userId: payload.userId });
      }
    } catch (err) {
      if (state.apiCounter === 2) {
        dispatch('apiSignOutAction');
      } else if (err.response && err.response.status === 403) {
        await dispatch('refreshToken');
        state.apiCounter = 2;
        dispatch('answerQuestion', payload);
      }
    }
  },

  async editAnswer({ commit, dispatch, state }, payload) {
    try {
      const res = await axios.post('v2/editAnswer/', {
        answer: payload.answer,
        questionId: payload.questionId,
      });

      if (res.status === 200) {
        dispatch('getQA', { bidId: payload.bidId, userId: payload.userId });
      }
    } catch (err) {
      if (state.apiCounter === 2) {
        dispatch('apiSignOutAction');
      } else if (err.response && err.response.status === 403) {
        await dispatch('refreshToken');
        state.apiCounter = 2;
        dispatch('editAnswer', payload);
      }
    }
  },

  async saveDraftBid({ commit, dispatch, state }, payload) {
    commit('setSaveBidLoading', true);
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

    if (state.invitedSuppliers != null) {
      for (let i = 0; i < state.invitedSuppliers.length; i++) {
        if (Array.isArray(state.invitedSuppliers) && state.invitedSuppliers.length > 0 && typeof state.invitedSuppliers[0] === 'object') {
          if (!state.invitedSuppliers[i].companyId && !state.invitedSuppliers[i].objectID) {
            formData.append(`invitedSuppliers[${i}]`, state.invitedSuppliers[i].id);
          } else if (state.invitedSuppliers[i].companyId) {
            formData.append(`invitedSuppliers[${i}]`, state.invitedSuppliers[i].companyId);
          } else {
            formData.append(`invitedSuppliers[${i}]`, state.invitedSuppliers[i].objectID);
          }
        } else {
          formData.append(`invitedSuppliers[${i}]`, state.invitedSuppliers[i]);
        }
      }
    }
    if (state.invitedNewSuppliers != null) {
      for (let i = 0; i < state.invitedNewSuppliers.length; i++) {
        formData.append(`invitedNewSuppliers[${i}]`, state.invitedNewSuppliers[i].id);
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
      let lineItemsindex = 0;
      for (let i = 0; i < state.bidlines.length; i++) {
        if (state.bidlines[i].description !== '' && state.bidlines[i].quantity !== '') {
          formData.append(`lineItems[${lineItemsindex}][id]`, state.bidlines[i]._id);
          formData.append(`lineItems[${lineItemsindex}][description]`, state.bidlines[i].description);
          formData.append(`lineItems[${lineItemsindex}][unit]`, state.bidlines[i].unit);
          formData.append(`lineItems[${lineItemsindex}][inputType]`, state.bidlines[i].inputType);
          formData.append(`lineItems[${lineItemsindex}][quantity]`, state.bidlines[i].quantity);
          if(state.bidlines[i].buyerComment === 'undefined' || state.bidlines[i].buyerComment === '' || state.bidlines[i].buyerComment === undefined){
            formData.append(`lineItems[${lineItemsindex}][buyerComment]`, '');
          }else{
            formData.append(`lineItems[${lineItemsindex}][buyerComment]`, state.bidlines[i].buyerComment);
          }
          formData.append(`lineItems[${lineItemsindex}][required]`, state.bidlines[i].required);
          lineItemsindex++;
        }
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
        formData.append(`attachment[${i}][id]`, state.attachement[i]._id);
      }
    }

    if (state.questions != null) {
      for (let i = 0; i < state.questions.length; i++) {
        formData.append(`questions[${i}][id]`, state.questions[i]._id);
        formData.append(`questions[${i}][order]`, state.questions[i].order);
        formData.append(`questions[${i}][title]`, state.questions[i].title);
        formData.append(`questions[${i}][type]`, state.questions[i].type);
        formData.append(`questions[${i}][questionType]`, state.questions[i].questionType);
        formData.append(`questions[${i}][required]`, state.questions[i].required);
        if (state.questions[i].options) {
          for (let j = 0; j < state.questions[i].options.length; j++) {
            formData.append(`questions[${i}][options][${j}][id]`, state.questions[i].options[j]._id);
            formData.append(`questions[${i}][options][${j}][label]`, state.questions[i].options[j].label);
            formData.append(`questions[${i}][options][${j}][title]`, state.questions[i].options[j].title);
          }
        }
      }
    }

    try {
      const res = await axios.post('v2/bid/draft/createDraft', formData, config);
      if (res.status === 200) {
        commit('setBidData', res.data);
        commit('setAttachement', res.data.attachments);
        dispatch('getTeamMembers', payload.company);
        dispatch('getSalesReps', { query: '', basin: 'all' });
        dispatch('getCategories');
        dispatch('searchByCompany', { query: '', basin: 'all' });
        commit('setDraftBidsList', res.data._id);
        commit('setBidSerial', res.data.serial);
        state.bidData.statusType = 'draftBid';
        commit('setDraftTime', new Date().toLocaleString());
        commit('setSaveBidLoading', false);
        commit('setIsEditBidChanges', false);
      } else {
        commit('setDraftBidsList', null);
        commit('setSaveBidLoading', false);
        commit('setIsEditBidChanges', false);
      }
    } catch (err) {
      commit('setSaveBidLoading', false);
      commit('setIsEditBidChanges', false);
      if (state.apiCounter === 2) {
        dispatch('apiSignOutAction');
      } else if (err.response && err.response.status === 403) {
        await dispatch('refreshToken');
        state.apiCounter = 2;
        dispatch('saveDraftBid', payload);
      }
    }
  },
  async updateDraftBid({ commit, state, dispatch }, payload) {
    commit('setSaveBidLoading', true);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
      },
    };
    const formData = new FormData();

    if (state.bidData._id) {
      console.log("AAAAAAAAAAAAAAA BUCETA")
      commit('setDraftBidsList', state.bidData._id);
      commit('setBidSerial', state.bidData.serial);
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
      alert("invited not null")
      for (let i = 0; i < state.invitedSuppliers.length; i++) {
        if (Array.isArray(state.invitedSuppliers) && state.invitedSuppliers.length > 0 && typeof state.invitedSuppliers[0] === 'object') {
          if (!state.invitedSuppliers[i].companyId && !state.invitedSuppliers[i].objectID) {
            formData.append(`invitedSuppliers[${i}]`, state.invitedSuppliers[i]._id);
          } else if (state.invitedSuppliers[i].companyId) {
            formData.append(`invitedSuppliers[${i}]`, state.invitedSuppliers[i].companyId);
          } else {
            formData.append(`invitedSuppliers[${i}]`, state.invitedSuppliers[i].objectID);
          }
        } else {
          formData.append(`invitedSuppliers[${i}]`, state.invitedSuppliers[i]);
        }
      }
    }
    if (state.invitedNewSuppliers != null) {
      for (let i = 0; i < state.invitedNewSuppliers.length; i++) {
        formData.append(`invitedNewSuppliers[${i}]`, state.invitedNewSuppliers[i]._id);
      }
    }
    if (state.invitedTeamMembers != null) {
      for (let t = 0; t < state.invitedTeamMembers.length; t++) {
        if (!state.invitedTeamMembers[t]._id) {
          formData.append(`invitedTeamMembers[${t}]`, state.invitedTeamMembers[t]);
        } else {
          formData.append(`invitedTeamMembers[${t}]`, state.invitedTeamMembers[t]._id);
        }
      }
    }

    if (state.bidlines != null) {
      let lineItemsindex = 0;
      for (let i = 0; i < state.bidlines.length; i++) {
        if (state.bidlines[i].description !== '' && state.bidlines[i].quantity !== '') {
          formData.append(`lineItems[${lineItemsindex}][id]`, state.bidlines[i]._id);
          formData.append(`lineItems[${lineItemsindex}][description]`, state.bidlines[i].description);
          formData.append(`lineItems[${lineItemsindex}][unit]`, state.bidlines[i].unit);
          formData.append(`lineItems[${lineItemsindex}][inputType]`, state.bidlines[i].inputType);
          formData.append(`lineItems[${lineItemsindex}][quantity]`, state.bidlines[i].quantity);
          if(state.bidlines[i].buyerComment === 'undefined' || state.bidlines[i].buyerComment === '' || state.bidlines[i].buyerComment === undefined){
            formData.append(`lineItems[${lineItemsindex}][buyerComment]`, '');
          }else{
            formData.append(`lineItems[${lineItemsindex}][buyerComment]`, state.bidlines[i].buyerComment);
          }
          formData.append(`lineItems[${lineItemsindex}][required]`, state.bidlines[i].required);
          lineItemsindex++;
        }
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
        formData.append(`attachment[${i}][id]`, state.attachement[i]._id);
      }
    }

    if (state.questions != null) {
      for (let i = 0; i < state.questions.length; i++) {
        formData.append(`questions[${i}][id]`, state.questions[i]._id);
        formData.append(`questions[${i}][order]`, state.questions[i].order);
        formData.append(`questions[${i}][title]`, state.questions[i].title);
        formData.append(`questions[${i}][type]`, state.questions[i].type);
        formData.append(`questions[${i}][questionType]`, state.questions[i].questionType);
        formData.append(`questions[${i}][required]`, state.questions[i].required ? state.questions[i].required : false);
        if (state.questions[i].options) {
          for (let j = 0; j < state.questions[i].options.length; j++) {
            formData.append(`questions[${i}][options][${j}][id]`, state.questions[i].options[j]._id);
            formData.append(`questions[${i}][options][${j}][label]`, state.questions[i].options[j].label);
            formData.append(`questions[${i}][options][${j}][title]`, state.questions[i].options[j].title);
          }
        }
      }
    }
    try {
      const res = await axios.post(`v2/bid/draft/updateDraft/${state.draftBidsList}`, formData, config);
      if (res.status === 200) {
        commit('setIsEditBidChanges', false);
        commit('setBidSerial', res.data.serial);
        commit('setDraftTime', new Date().toLocaleString());
        commit('setDraftBidsList', null);
        commit('setSaveBidLoading', false);
      } else {
        commit('setSaveBidLoading', false);
      }
    } catch (err) {
      commit('setSaveBidLoading', false);
      commit('setIsEditBidChanges', false);
      if (state.apiCounter === 2) {
        dispatch('apiSignOutAction');
      } else if (err.response && err.response.status === 403) {
        await dispatch('refreshToken');
        state.apiCounter = 2;
        dispatch('updateDraftBid', payload);
      }
    }
  },
  // eslint-disable-next-line consistent-return
  async inviteNewSupplier({ commit, state, dispatch }, payload) {
    commit('setLoadingInvite', true);
    try {
      const res = await axios.post('v2/bid/inviteSupplier/', {
        firstName: payload.firstName, lastName: payload.lastName, company: payload.company, phone: payload.phone, email: payload.email, bidTitle: payload.bidTitle, bidType: payload.bidType, bidDueDate: payload.bidDueDate, bidDueTime: payload.bidDueTime,
      });

      if (res.status === 200) {
        commit('setLoadingInvite', false);
        let userData = '';
        if (res.data.message) {
          userData = res.data.user;
        } else {
          userData = res.data;
        }
        return userData;
      }
    } catch (err) {
      commit('setLoadingInvite', false);
      if (state.apiCounter === 2) {
        dispatch('apiSignOutAction');
      } else if (err.response && err.response.status === 403) {
        await dispatch('refreshToken');
        state.apiCounter = 2;
        dispatch('inviteNewSupplier', payload);
      }
    }
  },
  // eslint-disable-next-line consistent-return
  async publishBid({ commit, state, dispatch }) {
    try {
      await dispatch('updateDraftBid', 'update');
      const res = await axios.post('v2/bid/publishBid', {
        draftBidId: state.draftBidsList,
      });
      if (res.status === 200) {
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
        commit('setIsEditBidChanges', false);
        state.bidData.lastSerial = res.data.serial;
        state.bidData.serial = '';
        state.bidData._id = '';
        state.bidData.status = '';
        state.bidData.statusType = '';
        commit('setBidDescription', [{ body: '' }]);
        state.bidData.attachments = '';
        state.bidData.invitedSuppliers = '';
        state.bidData.invitedTeamMembers = '';
        state.bidData.lineItems = '';
        state.bidData.questions = '';
        const bidDetail = await axios.get(`v2/bid/getv2/Bid/${res.data._path.segments[1]}`);
        return bidDetail.data.serial;
      }

      // eslint-disable-next-line consistent-return
      return;
    } catch (err) {
      console.log(err);
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
      const res = await axios.post('v2/bid/uploadBidAttachment/', formData, config);

      if (res.status === 200) {
        commit('setAttachData', res.data);
        // commit('setAttachement',res.data);
      } else {
        commit('setAttachData', null);
      }
    } catch (err) {
      if (state.apiCounter === 2) {
        dispatch('apiSignOutAction');
      } else if (err.response && err.response.status === 403) {
        await dispatch('refreshToken');
        state.apiCounter = 2;
        dispatch('uploadBidAttach', payload);
      }
    }
  },
  async getBidTemplates({ commit, state, dispatch }, payload) {
    try {
      const res = await axios.get('v2/bid/getBidTemplates/');
      if (res.status === 200) {
        commit('setBidTemplates', res.data);
      }
    } catch (err) {
      if (state.apiCounter === 2) {
        dispatch('apiSignOutAction');
      } else if (err.response && err.response.status === 403) {
        await dispatch('refreshToken');
        state.apiCounter = 2;
        dispatch('getBidTemplates', payload);
      }
    }
  },
  async deleteTemplate({ commit, state, dispatch }, payload) {
    try {
      const res = await axios.post('v2/bid/deleteTemplateBid/', { templateId: payload.id });
      if (res.status === 200) {
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
        commit('setBidTitle', '');
        commit('setBidType', '');
        commit('setBidDueDate', '');
        commit('setBidDueTime', '');
        commit('setBidRegions', '');
        commit('setBidEnabled', '');
        state.bidData.serial = '';
        state.bidData._id = '';
        state.bidData.status = '';
        state.bidData.statusType = '';
        commit('setBidDescription', [{ body: '' }]);
        state.bidData.attachments = '';
        state.bidData.invitedSuppliers = '';
        state.bidData.invitedTeamMembers = '';
        state.bidData.lineItems = '';
        state.bidData.questions = '';
        commit('setInvitedSuppliersData', null);
        commit('setInvitedTeamMembers', null);
        commit('setBidlines', null);
        commit('setAttachement', null);
        commit('setQuestions', null);
        commit('setDraftBidData', null);
        dispatch('getBidTemplates');
      }
    } catch (err) {
      if (state.apiCounter === 2) {
        dispatch('apiSignOutAction');
      } else if (err.response && err.response.status === 403) {
        await dispatch('refreshToken');
        state.apiCounter = 2;
        dispatch('deleteTemplate', payload);
      }
    }
  },
  async updateTemplateNote({ state, dispatch }, payload) {
    try {
      const res = await axios.post('v2/bid/editTemplateNote/', { templateId: payload.templateId, note: payload.note });
      if (res.status === 200) {
        dispatch('getBidTemplates');
      }
    } catch (err) {
      if (state.apiCounter === 2) {
        dispatch('apiSignOutAction');
      } else if (err.response && err.response.status === 403) {
        await dispatch('refreshToken');
        state.apiCounter = 2;
        dispatch('deleteTemplate', payload);
      }
    }
  },
  async getEditTemplate({ commit, state, dispatch }, payload) {
    commit('setPageLoader', true);
    try {
      console.log("HAHAHAHAHAHAHAH", payload)
      const res = await axios.get(`v2/bid/getBidDetailsById/${payload.id}`);
      if (res.status === 200) {
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
      if (state.apiCounter === 2) {
        dispatch('apiSignOutAction');
      } else if (err.response && err.response.status === 403) {
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
      const res = await axios.post('v2/bid/createTemplateBid', formData, config);
      if (res.status === 200) {
        commit('setBidData', res.data);
        commit('setAttachement', res.data.attachment);
        dispatch('getTeamMembers', payload.company);
        dispatch('getSalesReps', { query: '', basin: 'all' });
        dispatch('getCategories');
        dispatch('searchByCompany', { query: '', basin: 'all' });
        commit('setDraftBidsList', res.data._id);
        state.bidData.status = 'templateCreate';
        state.bidData.statusType = 'template';
        commit('setDraftTime', new Date().toLocaleString());
      } else {
        commit('setDraftBidsList', null);
      }
    } catch (err) {
      if (state.apiCounter === 2) {
        dispatch('apiSignOutAction');
      } else if (err.response && err.response.status === 403) {
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
        `v2/bid/draft/getDraftBySerial/${payload.serial}`,
      );

      if (res.status === 200) {
        dispatch('getTeamMembers', payload.company);
        dispatch('getSalesReps', { query: '', basin: 'all' });
        dispatch('getCategories');
        dispatch('searchByCompany', { query: '', basin: 'all' });
        // commit('setDraftBidData', res.data);
        commit('setIsEditBidChanges', false);
        commit('setBidData', res.data);
        commit('setPageLoader', false);
        state.bidData.statusType = 'draftBid';
        router.replace('/create-bid');
      }
    } catch (err) {
      commit('setIsEditBidChanges', false);
      if (state.apiCounter === 2) {
        dispatch('apiSignOutAction');
      } else if (err.response && err.response.status === 403) {
        await dispatch('refreshToken');
        state.apiCounter = 2;
        dispatch('getBidBySerial', payload);
      }
    }
  },
  async updateTemplate({ commit, state, dispatch }, payload) {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
      },
    };
    const formData = new FormData();

    if (state.bidData._id) {
      // state.draftBidsList = state.bidData._id;
      commit('setDraftBidsList', state.bidData._id);
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

    if (state.bidData.status === 'templateCreate') {
      if (state.invitedSuppliers) {
        for (let i = 0; i < state.invitedSuppliers.length; i++) {
          if (!state.invitedSuppliers[i].companyId && !state.invitedSuppliers[i].objectID) {
            formData.append(`invitedSuppliers[${i}]`, state.invitedSuppliers[i]._id);
          } else if (state.invitedSuppliers[i].companyId) {
            formData.append(`invitedSuppliers[${i}]`, state.invitedSuppliers[i].companyId);
          } else {
            formData.append(`invitedSuppliers[${i}]`, state.invitedSuppliers[i].objectID);
          }
        }
      } else {
        formData.append('invitedSuppliers', '');
      }
    } else if (state.invitedSuppliers != null) {
      for (let i = 0; i < state.invitedSuppliers.length; i++) {
        if (!state.invitedSuppliers[i].companyId && !state.invitedSuppliers[i].objectID) {
          formData.append(`invitedSuppliers[${i}]`, state.invitedSuppliers[i]._id);
        } else if (state.invitedSuppliers[i].companyId) {
          formData.append(`invitedSuppliers[${i}]`, state.invitedSuppliers[i].companyId);
        } else {
          formData.append(`invitedSuppliers[${i}]`, state.invitedSuppliers[i].objectID);
        }
      }
    } else {
      formData.append('invitedSuppliers', '');
    }
    if (state.bidData.status === 'templateCreate') {
      if (state.invitedTeamMembers) {
        for (let t = 0; t < state.invitedTeamMembers.length; t++) {
          if (!state.invitedTeamMembers[t]._id) {
            formData.append(`invitedTeamMembers[${t}]`, state.invitedTeamMembers[t]);
          } else {
            formData.append(`invitedTeamMembers[${t}]`, state.invitedTeamMembers[t]._id);
          }
        }
      } else {
        formData.append('invitedTeamMembers', '');
      }
    } else if (state.invitedTeamMembers != null) {
      for (let t = 0; t < state.invitedTeamMembers.length; t++) {
        if (!state.invitedTeamMembers[t]._id) {
          formData.append(`invitedTeamMembers[${t}]`, state.invitedTeamMembers[t]);
        } else {
          formData.append(`invitedTeamMembers[${t}]`, state.invitedTeamMembers[t]._id);
        }
      }
    } else {
      formData.append('invitedTeamMembers', '');
    }

    if (state.bidData.status === 'templateCreate') {
      if (state.bidlines) {
        let lineItemsindex = 0;
        for (let i = 0; i < state.bidlines.length; i++) {
          if (state.bidlines[i].description !== '' && state.bidlines[i].quantity !== '') {
            formData.append(`lineItems[${lineItemsindex}][id]`, state.bidlines[i]._id);
            formData.append(`lineItems[${lineItemsindex}][description]`, state.bidlines[i].description);
            formData.append(`lineItems[${lineItemsindex}][unit]`, state.bidlines[i].unit);
            formData.append(`lineItems[${lineItemsindex}][inputType]`, state.bidlines[i].inputType);
            formData.append(`lineItems[${lineItemsindex}][quantity]`, state.bidlines[i].quantity);
            if(state.bidlines[i].buyerComment === 'undefined' || state.bidlines[i].buyerComment === '' || state.bidlines[i].buyerComment === undefined){
              formData.append(`lineItems[${lineItemsindex}][buyerComment]`, '');
            }else{
              formData.append(`lineItems[${lineItemsindex}][buyerComment]`, state.bidlines[i].buyerComment);
            }
            formData.append(`lineItems[${lineItemsindex}][required]`, state.bidlines[i].required);
            lineItemsindex++;
          }
        }
      } else {
        formData.append('lineItems', '');
      }
    } else if (state.bidlines != null) {
      let lineItemsindex = 0;
      for (let i = 0; i < state.bidlines.length; i++) {
        if (state.bidlines[i].description !== '' && state.bidlines[i].quantity !== '') {
          formData.append(`lineItems[${lineItemsindex}][id]`, state.bidlines[i]._id);
          formData.append(`lineItems[${lineItemsindex}][description]`, state.bidlines[i].description);
          formData.append(`lineItems[${lineItemsindex}][unit]`, state.bidlines[i].unit);
          formData.append(`lineItems[${lineItemsindex}][inputType]`, state.bidlines[i].inputType);
          formData.append(`lineItems[${lineItemsindex}][quantity]`, state.bidlines[i].quantity);
          if(state.bidlines[i].buyerComment === 'undefined' || state.bidlines[i].buyerComment === '' || state.bidlines[i].buyerComment === undefined){
            formData.append(`lineItems[${lineItemsindex}][buyerComment]`, '');
          }else{
            formData.append(`lineItems[${lineItemsindex}][buyerComment]`, state.bidlines[i].buyerComment);
          }
          formData.append(`lineItems[${lineItemsindex}][required]`, state.bidlines[i].required);
          lineItemsindex++;
        }
      }
    } else {
      formData.append('lineItems', '');
    }

    if (state.bidData.status === 'templateCreate') {
      if (state.attachement) {
        for (let i = 0; i < state.attachement.length; i++) {
          formData.append(`attachment[${i}][fileName]`, state.attachement[i].fileName);
          formData.append(`attachment[${i}][fileSize]`, state.attachement[i].fileSize);
          formData.append(`attachment[${i}][uploadedBy]`, state.attachement[i].uploadedBy);
          formData.append(`attachment[${i}][url]`, state.attachement[i].url);
          formData.append(`attachment[${i}][uploadedAt]`, state.attachement[i].uploadedAt);
          formData.append(`attachment[${i}][comment]`, state.attachement[i].comment);
          formData.append(`attachment[${i}][id]`, state.attachement[i]._id);
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

    if (state.bidData.status === 'templateCreate') {
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

    try {
      const res = await axios.post('v2/bid/editTemplateBid/', formData, config);
      if (res.status === 200) {
        // commit('setDraftBidsList',null);
        commit('setIsEditBidChanges', false);
        commit('setDraftTime', new Date().toLocaleString());
      } else {
        // commit('setDraftBidsList',null);
      }
    } catch (err) {
      commit('setIsEditBidChanges', false);
      if (state.apiCounter === 2) {
        dispatch('apiSignOutAction');
      } else if (err.response && err.response.status === 403) {
        await dispatch('refreshToken');
        state.apiCounter = 2;

        dispatch('updateTemplate', payload);
      }
    }
  },

  async publishTemplate({ commit, state, dispatch }) {
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
      commit('setIsEditBidChanges', false);
      state.bidData.serial = '';
      state.bidData.id = '';
      state.bidData.status = '';
      state.bidData.statusType = '';
      commit('setBidDescription', [{ body: '' }]);
      state.bidData.attachments = '';
      state.bidData.invitedSuppliers = '';
      state.bidData.invitedTeamMembers = '';
      state.bidData.lineItems = '';
      state.bidData.questions = '';

      return;
    } catch (err) {
      console.log(err);
    }
  },

  async deleteDraftBid({ state, dispatch }, payload) {
    try {
      const res = await axios.post('v2/bid/draft/deleteDraft/', { draftId: payload.draftId });
      if (res.status === 200) {
        router.replace('/view-bids');
      }
    } catch (err) {
      if (state.apiCounter === 2) {
        dispatch('apiSignOutAction');
      } else if (err.response && err.response.status === 403) {
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
        `v2/bid/getBidBySerial/${payload.serial}/${payload.id}`,
      );

      if (res.status === 200) {
        dispatch('getTeamMembers', payload.company);
        dispatch('getSalesReps', { query: '', basin: 'all' });
        dispatch('getCategories');
        dispatch('searchByCompany', { query: '', basin: 'all' });
        commit('setBidData', res.data.bidData);
        commit('setUserType', res.data.user_type);

        if (res.data.supplierSubmissions
          && res.data.supplierSubmissions
            .length) {
          commit('setEntryCheckForEditBid', true);
        }
        commit('setPageLoader', false);
      } else {
        commit('setPageLoader', false);
      }
    } catch (err) {
      commit('setPageLoader', false);
      if (state.apiCounter === 2) {
        dispatch('apiSignOutAction');
      } else if (err.response && err.response.status === 403) {
        await dispatch('refreshToken');
        state.apiCounter = 2;
        dispatch('getUpdateBid', payload);
      }
    }
  },
  async updateBid({ commit, state, dispatch,rootState }, payload) {
    commit('setSaveBidLoading', true);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
      },
    };
    const formData = new FormData();

    if (state.bidData.id) {
      commit('setDraftBidsList', state.bidData.id);
      commit('setBidSerial', state.bidData.serial);
      // state.draftBidsList = state.bidData.id;
      // state.bidSerial = state.bidData.serial;
    }
    if (state.bidData.company === '') {
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
    formData.append('editedByUserId',rootState.auth.userInfo.id)

    formData.append('bidDescriptions[0][body]', state.bidData.bidDescriptions[0].body);
    if (state.bidData.bidDescriptions.length > 1) {
      for (let d = 1; d < state.bidData.bidDescriptions.length; d++) {
        formData.append(`bidDescriptions[${d}][name]`, state.bidData.bidDescriptions[d].name);
        formData.append(`bidDescriptions[${d}][body]`, state.bidData.bidDescriptions[d].body);
      }
    }

    if (state.invitedSuppliers !== '' && state.invitedSuppliers && state.invitedSuppliers.length > 0) {
      for (let i = 0; i < state.invitedSuppliers.length; i++) {
        if (state.invitedSuppliers[i].id) {
          formData.append(`invitedSuppliers[${i}]`, state.invitedSuppliers[i].id);
        } else if (state.invitedSuppliers[i].companyId) {
          formData.append(`invitedSuppliers[${i}]`, state.invitedSuppliers[i].companyId);
        } else {
          formData.append(`invitedSuppliers[${i}]`, state.invitedSuppliers[i].objectID);
        }
      }
    } else {
      formData.append('invitedSuppliers', []);
    }
    if (state.invitedNewSuppliers != null) {
      for (let i = 0; i < state.invitedNewSuppliers.length; i++) {
        formData.append(`invitedNewSuppliers[${i}]`, state.invitedNewSuppliers[i].id);
      }
    } else {
      formData.append('invitedNewSuppliers', '');
    }
    if (state.invitedTeamMembers !== '' && state.invitedTeamMembers && state.invitedTeamMembers.length > 0) {
      for (let t = 0; t < state.invitedTeamMembers.length; t++) {
        if (!state.invitedTeamMembers[t].id) {
          formData.append(`invitedTeamMembers[${t}]`, state.invitedTeamMembers[t]);
        } else {
          formData.append(`invitedTeamMembers[${t}]`, state.invitedTeamMembers[t].id);
        }
      }
    } else {
      formData.append('invitedTeamMembers', []);
    }

    if (state.bidlines !== '') {
      let lineItemsindex = 0;
      for (let i = 0; i < state.bidlines.length; i++) {
        if (state.bidlines[i].description !== '' && state.bidlines[i].quantity !== '') {
          formData.append(`lineItems[${lineItemsindex}][id]`, state.bidlines[i].id);
          formData.append(`lineItems[${lineItemsindex}][description]`, state.bidlines[i].description);
          formData.append(`lineItems[${lineItemsindex}][unit]`, state.bidlines[i].unit);
          formData.append(`lineItems[${lineItemsindex}][inputType]`, state.bidlines[i].inputType);
          formData.append(`lineItems[${lineItemsindex}][quantity]`, state.bidlines[i].quantity);
          if(state.bidlines[i].buyerComment === 'undefined' || state.bidlines[i].buyerComment === '' || state.bidlines[i].buyerComment === undefined){
            formData.append(`lineItems[${lineItemsindex}][buyerComment]`, '');
          }else{
            formData.append(`lineItems[${lineItemsindex}][buyerComment]`, state.bidlines[i].buyerComment);
          }
          formData.append(`lineItems[${lineItemsindex}][required]`, state.bidlines[i].required);
          lineItemsindex++;
        }
      }
    } else {
      formData.append('lineItems', '');
    }
    if (state.attachement !== '' && state.attachement && state.attachement.length > 0) {
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
      formData.append('attachments', []);
    }

    if (state.questions !== '') {
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

    try {
      const res = await axios.post('v2/bid/editBid/', formData, config);
      if (res.status === 200) {
        // commit('setDraftBidsList',null);
        commit('setIsEditBidChanges', false);
        commit('setDraftTime', new Date().toLocaleString());
        commit('setSaveBidLoading', false);
      } else {
        commit('setSaveBidLoading', false);
        // commit('setDraftBidsList',null);
      }
    } catch (err) {
      commit('setIsEditBidChanges', false);
      commit('setSaveBidLoading', false);
      if (state.apiCounter === 2) {
        dispatch('apiSignOutAction');
      } else if (err.response && err.response.status === 403) {
        await dispatch('refreshToken');
        state.apiCounter = 2;
        dispatch('updateBid', payload);
      }
    }
  },

  async publishUpdateBid({ commit, state, dispatch }) {
    try {
      await dispatch('updateBid', 'update');

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
      commit('setIsEditBidChanges', false);
      state.bidData.serial = '';
      state.bidData.id = '';
      state.bidData.status = '';
      state.bidData.statusType = '';
      commit('setBidDescription', [{ body: '' }]);
      state.bidData.attachments = '';
      state.bidData.invitedSuppliers = '';
      state.bidData.invitedTeamMembers = '';
      state.bidData.lineItems = '';
      state.bidData.questions = '';
      return;
    } catch (err) {
      console.log(err);
    }
  },
  async getBidActivityList({ commit, state, dispatch }, payload) {
    if (payload.reload === false) {
      commit('setPageLoader', false);
    } else {
      commit('setPageLoader', true);
    }
    try {
      const res = await axios.get(`/activity/getBidActivities/${payload.bidId}/${payload.userId}`);

      if (res.status === 200) {
        commit('setBidActivities', res.data);
        commit('setPageLoader', false);
      }
    } catch (err) {
      commit('setPageLoader', false);
      if (state.apiCounter === 2) {
        dispatch('apiSignOutAction');
      } else if (err.response && err.response.status === 403) {
        await dispatch('refreshToken');
        state.apiCounter = 2;
        dispatch('getBidActivityList', payload);
      }
    }
  },
  async inviteSupplierToBid({ commit, state, dispatch }, payload) {
    try {
      const res = await axios.post('v2/bid/addSupplierToBid/', {
        userId: payload.userId,
        bidId: payload.bidId,
        invitedSuppliers: payload.invitedSuppliers,
        invitedNewSuppliers: payload.invitedNewSuppliers,
      });

      if (res.status === 200) {
        await dispatch('getBidBySerial', {
          serial: payload.serial,
          id: payload.userId,
          company: payload.company,
        });

        commit('setSupplierAddAlert');
      }
    } catch (err) {
      if (state.apiCounter === 2) {
        dispatch('apiSignOutAction');
      } else if (err.response && err.response.status === 403) {
        await dispatch('refreshToken');
        state.apiCounter = 2;
        dispatch('inviteSupplierToBid', payload);
      }
    }
  },
  async changeBidDate({ commit, state, dispatch }, payload) {
    try {
      const res = await axios.post('v2/bid/changeDueDate/', payload);

      if (res.status === 200) {
        commit('setDateAlert');
      }
    } catch (err) {
      if (state.apiCounter === 2) {
        dispatch('apiSignOutAction');
      } else if (err.response && err.response.status === 403) {
        await dispatch('refreshToken');
        state.apiCounter = 2;
        dispatch('changeBidDate', payload);
      }
    }
  },

  async addTeamMemberToBid({ commit, state, dispatch }, payload) {
    try {
      const res = await axios.post('v2/bid/addTeamMemberToBid/', {
        userId: payload.userId,
        bidId: payload.bidId,
        teamMemberIds: payload.teamMembersIds,
      });

      if (res.status === 200) {
        await dispatch('getBidBySerial', {
          serial: payload.serial,
          id: payload.userId,
          company: payload.company,
        });

        commit('setTeamMemberAddAlert');
      }
    } catch (err) {
      if (state.apiCounter === 2) {
        dispatch('apiSignOutAction');
      } else if (err.response && err.response.status === 403) {
        await dispatch('refreshToken');
        state.apiCounter = 2;
        dispatch('addTeamMemberToBid', payload);
      }
    }
  },
};
