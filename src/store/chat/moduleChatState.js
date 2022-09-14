export default {
    unreadCount: 0,
    conversations: [],
    messages: [],
    messageSend: null,
    unMessageCount: null,
    lastMessageRead: null,
    userId: JSON.parse(localStorage.getItem('userData')),
    archiveStatus: null,
    membersList: [],
    suppliersUsers: [],
    archiveList: [],
}