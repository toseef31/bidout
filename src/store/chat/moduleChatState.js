export default {
  unreadCount: 0,
  conversations: null,
  bidConversations: null,
  messages: null,
  messageSend: null,
  unMessageCount: null,
  lastMessageRead: null,
  userId: JSON.parse(localStorage.getItem('userData')),
  archiveStatus: null,
  membersList: [],
  suppliersUsers: [],
  archiveList: [],
  createMsg: null,
  alertBroadcast: false,
  errorBroadcast: false,
  bidMessageUnreadCount: 0
};
