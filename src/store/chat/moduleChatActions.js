import axios from 'axios';

export default {
  unreadMessagesCount({ commit }, payload) {
    axios
      .post('/chat/countUnreadMessages', { userId: payload.userId })
      .then((responce) => {
        commit('setUnreadCount', responce.data.totalUnreadMessages);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  getAllConversations({ commit,state }, payload) {
    if(state.chatRefreshToken != 1){
      commit('setPageLoader', true);
    }
    axios
      .get(`/chat/getConversations/${payload}`)
      .then((responce) => {
        console.log('hhyyy',responce.data);
        commit('setConverstaionList', responce.data.conversations);
        if(state.chatRefreshToken != 1){
          commit('setPageLoader', false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  async getBidAllConversations({ commit, state }, payload) {
    await axios
      .get(`/chat/getBidConversations/${payload}/${state.userId.id}`)
      .then((responce) => {
        commit('setBidConversationList', responce.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  getAllMessages({ commit, dispatch, state }, payload) {
    axios
      .get(`/chat/getMessages/${payload.conversationId}`)
      .then((responce) => {
        commit('setMessagesList', responce.data.messages);
        dispatch('unreadMessagesCount', { userId: payload.userId });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  sendMessage({ commit, state, dispatch,rootState }, payload) {
    const config = {
      header: {
        'Content-Type': 'multipart/form-data',
      },
    };
    const formData = new FormData();
    formData.append('conversationId', payload.conversationId);
    formData.append('sender[id]', payload.sender.id);
    formData.append('sender[name]', payload.sender.name);
    formData.append('sender[company]', payload.sender.company);
    formData.append('sender[profilePicture]', payload.sender.profilePicture);
    formData.append('content', payload.content);
    formData.append('attachment', payload.attachment);
    axios
      .post('chat/sendMessage', formData, config)
      .then((responce) => {
        state.chatRefreshToken = 1;
        dispatch('getAllConversations', rootState.auth.userInfo.id);
        commit('setNewMessages', responce.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  unreadMessagesCountCon({ commit }, payload) {
    axios
      .post('/chat/countUnreadMessagesInConversation', {
        userId: payload.userId,
        conversationId: payload.conversationId,
      })
      .then((responce) => {
        commit('setUnMessageCount', responce.data.count);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  lastMessageRead({ commit }, payload) {
    axios
      .post('/chat/setLastMessageReadAt', {
        userId: payload.userId,
        conversationId: payload.conversationId,
      })
      .then((responce) => {})
      .catch((err) => {
        console.log(err);
      });
  },
  // Archive Chat
  archiveChat({ commit, state, dispatch,rootState }, payload) {
    axios
      .post('/chat/archiveConversation', {
        userId: payload.userId,
        conversationId: payload.conversationId,
      })
      .then((responce) => {
        commit('setMessagesList', null);
        state.chatRefreshToken = 1;
        dispatch('getAllConversations', rootState.auth.userInfo.id);
        dispatch('getArchiveChats', rootState.auth.userInfo.id);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  // Supplier List
  supplierList({ commit }, payload) {
    axios
      .get('/company/getSupplierCompaniesAndUsers')
      .then((responce) => {
        commit('setMembersList', responce.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  // Supplier Users List
  supplierUserList({ commit }, payload) {
    axios
      .get(`/user/searchSupplierUser/${payload}`)
      .then((responce) => {
        commit('setSuppliersUsers', responce.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  // Supplier Users List
  createConversation({ commit, state, dispatch, rootState }, payload) {
    axios
      .post('/chat/createConversation/', payload)
      .then((responce) => {
        state.chatRefreshToken = 1;
        dispatch('getAllConversations', rootState.auth.userInfo.id);
        commit('setCreateMsg', responce.data.message);
        setTimeout(() => {
          commit('setCreateMsg', null);
        }, 5000);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  removeConvUser({ commit, state, dispatch, rootState }, payload) {
    axios
      .post('/chat/removeParticipantsFromConversation/', payload)
      .then((responce) => {
        state.chatRefreshToken = 1;
        dispatch('getAllConversations', rootState.auth.userInfo.id);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  // Get Archive Chat
  getArchiveChats({ commit }, payload) {
    axios
      .get(`/chat/getArchivedConversations/${payload}`)
      .then((responce) => {
        commit('setArchiveConverstaionList', responce.data.conversations);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  unArchiveConversation({ commit, dispatch, rootState }, payload) {
    axios
      .post('/chat/unarchiveConversation/', {
        conversationId: payload.conversationId,
        userId: payload.userId,
      })
      .then((responce) => {
        state.chatRefreshToken = 1;
        dispatch('getAllConversations', rootState.auth.userInfo.id);
        dispatch('getArchiveChats', payload.userId);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  async sendBroadcast({ commit }, payload) {
    await axios
      .post('/chat/newbroadcastMessage/', {
        messageContent: payload.messageContent,
        bidId: payload.bidId,
        buyerUserId: payload.buyerUserId,
      })
      .then((responce) => {
        commit('showBroadcastAlert');
      })
      .catch((err) => {
        if (err.response.status === 404 && err.response.data.message === 'No suppliers found with current bid id') {
          commit('setSupplierBroadcastError');
        } else {
          commit('setErrorBroadcast');
        }
      });
  },
  bidMessageUnreadCount({ commit }, payload) {
    axios
      .post('/chat/countUnreadMessagesInBid', { userId: payload.userId, bidId: payload.bidId })
      .then((responce) => {
        commit('setBidMessageUnreadCount', responce.data.totalUnreadMessages);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
