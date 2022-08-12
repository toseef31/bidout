export default {
  setUnreadCount (state, payload){
   	state.unreadCount = payload
  }, 
  setConverstaionList (state, payload){
    state.conversations = payload
  }, 
  setMessagesList (state, payload){
    state.messages= payload
  },
  setNewMessages (state, payload){
    state.messages.push(payload)
  },
  setSendMessage (state, payload){
    state.messageSend = payload
  }, 
  setUnMessageCount (state, payload){
    state.unMessageCount = payload
  }, 
  setLastMessageRead (state, payload){
    state.lastMessageRead = payload
  }, 
}