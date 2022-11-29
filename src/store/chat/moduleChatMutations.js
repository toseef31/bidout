export default {
  setUnreadCount(state, payload) {
    state.unreadCount = payload;
  },
  setConverstaionList(state, payload) {
    state.conversations = payload;
  },
  setBidConversationList(state, payload) {
    state.bidConversations = payload;
  },
  setMessagesList(state, payload) {
    state.messages = payload;
  },
  setNewMessages(state, payload) {
    state.messages.push(payload);
  },
  setSendMessage(state, payload) {
    state.messageSend = payload;
  },
  setUnMessageCount(state, payload) {
    state.unMessageCount = payload;
  },
  setLastMessageRead(state, payload) {
    state.lastMessageRead = payload;
  },
  setArchiveStatus(state, payload) {
    state.archiveStatus = payload;
  },
  setMembersList(state, payload) {
    state.membersList = payload;
  },
  setSuppliersUsers(state, payload) {
    state.suppliersUsers = payload;
  },
  setArchiveConverstaionList(state, payload) {
    state.archiveList = payload;
  },
  setCreateMsg(state, payload) {
    state.createMsg = payload;
  },
  showBroadcastAlert(state) {
    state.alertBroadcast = true;
    setTimeout(() => {
      state.alertBroadcast = false;
    }, 5000);
  },
  setErrorBroadcast(state, payload) {
    state.errorBroadcast = payload;
    setTimeout(() => {
      state.errorBroadcast = null;
    }, 5000);
  },
  setBidMessageUnreadCount(state, payload) {
    state.bidMessageUnreadCount = payload;
  },
};
