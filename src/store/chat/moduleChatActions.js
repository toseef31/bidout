import axios from "axios";
import * as Sentry from "@sentry/vue";

export default {
  unreadMessagesCount({ commit }, payload) {
    axios
      .post("/v2/chat/countUnreadMessages", { userId: payload.userId })
      .then((responce) => {
        commit("setUnreadCount", responce.data.totalUnreadMessages);
      })
      .catch((err) => {
        Sentry.captureException(err);
        console.log(err);
      });
  },
  getAllConversations({ commit, state }, payload) {
    if (state.chatRefreshToken !== 1) {
      commit('setPageLoader', true);
    }
    axios
      .get(`/v2/chat/getConversations/${payload.id}?page=${state.page}&limit=10`)
      .then((responce) => {
        if (responce.status === 200) {
          commit('addConverstaionList', responce.data.conversations);
          if (state.chatRefreshToken !== 1) {
            commit('setPageLoader', false);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  getAllConversationsLoadMore({ commit, state, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get(`/v2/chat/getConversations/${payload.id}?page=${payload.page}&limit=10`)
        .then((responce) => {
          if (state.searchApiCount === 0) {
            dispatch('getAllConversationsSearch', payload.id);
          }
          if (state.searchApiCount === 1){
            commit('addConverstaionList', responce.data.conversations)
          }
          resolve(responce.data.conversations);
        }).catch((err) => {
          console.log(err);
        });
    });
  },
  getAllConversationsSearch({ commit, state, rootState, dispatch }, payload) {
    axios
      .get(`/v2/chat/getConversations/${payload}?page=${state.searchPage}&limit=10`)
      .then((responce) => {
        if (responce.status === 200) {
          if (responce.data.conversations.length > 0) {
            commit('searchIncrement');
            commit('setAllConversations', responce.data.conversations);
            dispatch('getAllConversationsSearch', rootState.auth.userInfo._id);
          }
          if (state.chatRefreshToken !== 1) {
            commit('setPageLoader', false);
          }
        }
      })
      .catch((err) => {
        Sentry.captureException(err);
        console.log(err);
      });
  },
  async getBidAllConversations({ commit, state }, payload) {
    await axios
      .get(`/v2/chat/getBidConversations/${payload.bidId}/${payload.userId}`)
      .then((responce) => {
        commit("setBidConversationList", responce.data);
      })
      .catch((err) => {
        Sentry.captureException(err);
        console.log(err);
      });
  },
  getAllMessages({ commit, dispatch, state }, payload) {
    axios
      .get(`/v2/chat/getMessages/${payload.conversationId}`)
      .then((responce) => {
        commit("setMessagesList", responce.data);
        dispatch("unreadMessagesCount", { userId: payload.userId });
        if (payload.bidId) {
          dispatch("bidMessageUnreadCount", { userId: payload.userId, bidId: payload.bidId})
        }
      })
      .catch((err) => {
        Sentry.captureException(err);
        console.log(err);
      });
  },
  sendMessage({ commit, dispatch, rootState, state }, payload) {
    const config = {
      header: {
        "Content-Type": "multipart/form-data",
      },
    };
    const formData = new FormData();
    formData.append("conversationId", payload.conversationId);
    formData.append("sender[id]", payload.sender.id);
    formData.append("sender[name]", payload.sender.name);
    formData.append("sender[company]", payload.sender.company._id);

    if (payload.sender.profilePicture) {
      formData.append("sender[profilePicture]", payload.sender.profilePicture);
    }

    if (payload.attachment) {
      formData.append("attachment", payload.attachment);
    }
    
    if (payload.content && payload.content !== '') {
      formData.append("content", payload.content);
    } else {
      formData.append("content", ' ');
    }
   
    axios
      .post("/v2/chat/sendMessage", formData, config)
      .then((responce) => {
        commit("setChatRefreshToken", 1);
        state.searchApiCount = 1;
        const obj = {
          id: rootState.auth.userInfo._id,
          page: 1,
        };

        dispatch("getAllConversationsLoadMore", obj);
        const newMsgObj = {
          "conversationId": responce.data.message.conversation,
          "sender": {
              "firstName": payload.sender.firstName,
              "lastName": payload.sender.lastName,
          },
          "content": responce.data.message.content,
          "attachment": responce.data.message.attachment,
          "_id": responce.data.message._id,
          "createdAt": responce.data.message.createdAt,
          "updatedAt": responce.data.message.updatedAt,
          "__v": 0
        };
        commit("setNewMessages", newMsgObj);
      })
      .catch((err) => {
        Sentry.captureException(err);
        console.log(err);
      });
  },
  unreadMessagesCountCon({ commit }, payload) {
    axios
      .post("/v2/chat/countUnreadMessagesInConversation", {
        userId: payload.userId,
        conversationId: payload.conversationId,
      })
      .then((responce) => {
        commit("setUnMessageCount", responce.data.count);
      })
      .catch((err) => {
        Sentry.captureException(err);
        console.log(err);
      });
  },
  lastMessageRead({ commit }, payload) {
    axios
      .post("/v2/chat/setLastMessageReadAt", {
        userId: payload.userId,
        conversationId: payload.conversationId,
      })
      .then((responce) => {})
      .catch((err) => {
        Sentry.captureException(err);
        console.log(err);
      });
  },
  // Archive Chat
  archiveChat({ commit, state, dispatch, rootState }, payload) {
    axios
      .post("/v2/chat/archiveConversation", {
        userId: payload.userId,
        conversationId: payload.conversationId,
      })
      .then((responce) => {
        commit("setMessagesList", null);
        commit("setChatRefreshToken", 1);
        const obj = {
          id: rootState.auth.userInfo._id,
          page: 1,
        };
        dispatch("getAllConversations", obj);
        dispatch("getArchiveChats", rootState.auth.userInfo._id);
      })
      .catch((err) => {
        Sentry.captureException(err);
        console.log(err);
      });
  },
  // Supplier List
  supplierList({ commit }, payload) {
    axios
      .get("/v2/company/getSupplierCompaniesAndUsers")
      .then((responce) => {
        commit("setMembersList", responce.data);
      })
      .catch((err) => {
        Sentry.captureException(err);
        console.log(err);
      });
  },
  // Supplier Users List
  supplierUserList({ commit }, payload) {
    axios
      .get(`/v2/user/searchSupplierUser/${payload}`)
      .then((responce) => {
        commit("setSuppliersUsers", responce.data);
      })
      .catch((err) => {
        Sentry.captureException(err);
        console.log(err);
      });
  },
  // Supplier Users List
  createConversation({ commit, state, dispatch, rootState }, payload) {
    axios
      .post("/v2/chat/createConversation/", payload)
      .then((responce) => {
        commit("setChatRefreshToken", 1);
        const obj = {
          id: rootState.auth.userInfo._id,
          page: 1,
        }
        dispatch("getAllConversations", obj);
        commit("setCreateMsg", responce.data.message);
        setTimeout(() => {
          commit("setCreateMsg", null);
        }, 5000);
      })
      .catch((err) => {
        Sentry.captureException(err);
        console.log(err);
      });
  },

  removeConvUser({ commit, state, dispatch, rootState }, payload) {
    axios
      .post("/v2/chat/removeParticipantsFromConversation/", payload)
      .then((responce) => {
        commit("setChatRefreshToken", 1);
        const obj = {
          id: rootState.auth.userInfo._id,
          page: 1,
        }
        dispatch("getAllConversations", obj);
      })
      .catch((err) => {
        Sentry.captureException(err);
        console.log(err);
      });
  },
  // Get Archive Chat
  getArchiveChats({ commit }, payload) {
    axios
      .get(`/v2/chat/getArchivedConversations/${payload}`)
      .then((responce) => {
        commit("setArchiveConverstaionList", responce.data.conversations);
      })
      .catch((err) => {
        Sentry.captureException(err);
        console.log(err);
      });
  },
  unArchiveConversation({ commit, state, dispatch, rootState }, payload) {
    axios
      .post("/v2/chat/unarchiveConversation/", {
        conversationId: payload.conversationId,
        userId: payload.userId,
      })
      .then((responce) => {
        commit('setChatRefreshToken', 1);
        dispatch('getArchiveChats', payload.userId);
        const obj = {
          id: rootState.auth.userInfo._id,
          page: 1,
        }
        dispatch('getAllConversations', obj);
        
        // dispatch('getAllConversationsLoadMore', obj);
      })
      .catch((err) => {
        Sentry.captureException(err);
        console.log(err);
      });
  },
  async sendBroadcast({ commit }, payload) {
    await axios
      .post("/v2/chat/newbroadcastMessage/", {
        messageContent: payload.messageContent,
        bidId: payload.bidId,
        buyerUserId: payload.buyerUserId,
      })
      .then((responce) => {
        commit("showBroadcastAlert");
      })
      .catch((err) => {
        Sentry.captureException(err);
        if (
          err.response.status === 404 &&
          err.response.data.message === "No suppliers found with current bid id"
        ) {
          commit("setSupplierBroadcastError");
        } else {
          commit("setErrorBroadcast");
        }
      });
  },
  bidMessageUnreadCount({ commit }, payload) {
    axios
      .post("/v2/chat/countUnreadMessagesInBid", {
        userId: payload.userId,
        bidId: payload.bidId,
      })
      .then((responce) => {
        commit("setBidMessageUnreadCount", responce.data.totalUnreadMessages);
      })
      .catch((err) => {
        Sentry.captureException(err);
        console.log(err);
      });
  },
};
