import _ from 'lodash';

export default {
  setUnreadCount(state, payload) {
    state.unreadCount = payload;
  },
  setConverstaionList(state, payload) {
    state.unsortedConv = payload;
    state.conversations.forEach((msg, index) => {
      if (!msg.latestMessage) {
        msg.latestMessage = msg.createdAt; // add the new field
      }
    });
    const dataa = _.orderBy(state.unsortedConv, 'latestMessage', 'desc');
    state.conversations = state.unsortedConv;
  },
  addConverstaionList(state, payload) {
    state.unsortedConv.push(...payload);
    state.unsortedConv.forEach((msg, index) => {
      if (!msg.latestMessage) {
        msg.latestMessage = msg.createdAt; // add the new field
      }
      // msg.sort = index
      // console.log(index ,'created', msg.createdAt);
      // console.log(index, 'latest', msg.latestMessage);
    });
    // console.log(state.unsortedConv);
    // state.unsortedConv.sort(
    //   (a, b) =>
    //     new Date(b?.latestMessage) - new Date(a?.latestMessage)
    // );
    // const dataa = _.orderBy(state.unsortedConv, 'latestMessage', 'desc');
    // console.log('after', dataa);
    state.conversations = state.unsortedConv;
  },
  setNoMoreConversation(state, payload) {
    state.noConversation = payload;
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
  setErrorBroadcast(state) {
    state.errorBroadcast = true;
    setTimeout(() => {
      state.errorBroadcast = false;
    }, 5000);
  },
  setBidMessageUnreadCount(state, payload) {
    state.bidMessageUnreadCount = payload;
  },
  setSupplierBroadcastError(state) {
    state.supplierBroadcastError = true;
    setTimeout(() => {
      state.supplierBroadcastError = false;
    }, 5000);
  },
  setsearchConv(state, payload) {
    state.searchConv = payload;
  },
  setChatRefreshToken(state, payload) {
    state.chatRefreshToken = payload;
  },
  setSpliceToConversation(state, id) {
    const index = state.conversations.findIndex(item => item._id === id);
    state.conversations.splice(index, 1);
  },
  INCREMENT_PAGE(state) {
    console.log('before satte', state.page);

    state.page += 1;
    console.log('after satte', state.page);
  }
};
