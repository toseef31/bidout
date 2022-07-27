export default {
  setUnreadCount (state, payload){
   	state.unreadCount = payload
  }, 
  setConverstaionList (state, payload){
    state.conversations = payload
  }, 
  setMessagesList (state, payload){
    state.messages = payload
  },
  setSendMessage (state, payload){
    state.messageSend = payload
  }, 
}