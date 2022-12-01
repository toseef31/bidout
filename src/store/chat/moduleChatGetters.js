export default {
  unreadCount(state) {
    return state.unreadCount;
  },
  conversations(state) {
    return state.conversations;
  },
  bidConversations(state) {
    return state.bidConversations;
  },
  messages(state) {
    return state.messages;
  },
  messageSend(state) {
    return state.messageSend;
  },
  unMessageCount(state) {
    return state.unMessageCount;
  },
  lastMessageRead(state) {
    return state.lastMessageRead;
  },
  archiveStatus(state) {
    return state.archiveStatus;
  },
  membersList(state) {
    return state.membersList;
  },
  suppliersUsers(state) {
    return state.suppliersUsers;
  },
  archiveList(state) {
    return state.archiveList;
  },
  createMsg(state) {
    return state.createMsg;
  },
  showSuccessBroadcast(state) {
    return state.alertBroadcast;
  },
  showErrorBroadcast(state) {
    return state.errorBroadcast;
  },
  bidMessageUnreadCount(state) {
    return state.bidMessageUnreadCount;
  },
  showSupplierBroadcastError(state) {
    return state.supplierBroadcastError;
  },
};
