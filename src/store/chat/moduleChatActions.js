import axios from "axios";

export default {
  unreadMessagesCount({ commit }, payload) {
    axios
      .post("/chat/countUnreadMessages", { userId: payload.userId })
      .then((responce) => {
        commit("setUnreadCount", responce.data.totalUnreadMessages);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  async getAllConversations({ commit }, payload) {
    await axios
      .get(`/chat/getConversations/${payload}`)
      .then((responce) => {
        commit("setConverstaionList", responce.data.conversations);
        commit("setPageLoader", false);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  async getBidAllConversations({ commit }, payload) {
    await axios
      .get(`/chat/getBidConversations/${payload}`)
      .then((responce) => {
        commit("setBidConversationList", responce.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  getAllMessages({ commit, dispatch, state }, payload) {
    axios
      .get(`/chat/getMessages/${payload.conversationId}`)
      .then((responce) => {
        commit("setMessagesList", responce.data.messages);
        dispatch("unreadMessagesCount", { userId: payload.userId });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  sendMessage({ commit, state, dispatch }, payload) {
    const config = {
      header: {
        "Content-Type": "multipart/form-data",
      },
    };
    const formData = new FormData();
    formData.append("conversationId", payload.conversationId);
    formData.append("sender[id]", payload.sender.id);
    formData.append("sender[name]", payload.sender.name);
    formData.append("sender[company]", payload.sender.company);
    formData.append("sender[profilePicture]", payload.sender.profilePicture);
    formData.append("content", payload.content);
    formData.append("attachment", payload.attachment);
    axios
      .post("chat/sendMessage", formData, config)
      .then((responce) => {
        dispatch("getAllConversations", state.userId.id);
        commit("setNewMessages", responce.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  unreadMessagesCountCon({ commit }, payload) {
    axios
      .post("/chat/countUnreadMessagesInConversation", {
        userId: payload.userId,
        conversationId: payload.conversationId,
      })
      .then((responce) => {
        commit("setUnMessageCount", responce.data.count);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  lastMessageRead({ commit }, payload) {
    axios
      .post("/chat/setLastMessageReadAt", {
        userId: payload.userId,
        conversationId: payload.conversationId,
      })
      .then((responce) => {})
      .catch((err) => {
        console.log(err);
      });
  },
  // Archive Chat
  archiveChat({ commit, state, dispatch }, payload) {
    axios
      .post("/chat/archiveConversation", {
        userId: payload.userId,
        conversationId: payload.conversationId,
      })
      .then((responce) => {
        commit("setMessagesList", null);
        dispatch("getAllConversations", state.userId.id);
        dispatch("getArchiveChats", state.userId.id);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  // Supplier List
  supplierList({ commit }, payload) {
    axios
      .get("/company/getSupplierCompaniesAndUsers")
      .then((responce) => {
        commit("setMembersList", responce.data);
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
        commit("setSuppliersUsers", responce.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  // Supplier Users List
  createConversation({ commit, state, dispatch }, payload) {
    axios
      .post("/chat/createConversation/", payload)
      .then((responce) => {
        dispatch("getAllConversations", state.userId.id);
        commit("setCreateMsg", responce.data.message);
        setTimeout(() => {
          commit("setCreateMsg", null);
        }, 5000);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  removeConvUser({ commit, state, dispatch }, payload) {
    axios
      .post("/chat/removeParticipantsFromConversation/", payload)
      .then((responce) => {
        dispatch("getAllConversations", state.userId.id);
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
        commit("setArchiveConverstaionList", responce.data.conversations);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  unArchiveConversation({ commit, dispatch }, payload) {
    axios
      .post("/chat/unarchiveConversation/", {
        conversationId: payload.conversationId,
        userId: payload.userId,
      })
      .then((responce) => {
        dispatch("getAllConversations", payload.userId);
        dispatch("getArchiveChats", payload.userId);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
