export default {
  unreadCount (state){
    return state.unreadCount
  }, 
  conversations (state){
    return state.conversations
  }, 
  messages (state){
    return state.messages
  },
  messageSend (state){
    return state.messageSend
  }, 
  unMessageCount (state){
    return state.unMessageCount
  },
  lastMessageRead (state){
    return state.lastMessageRead
  },  
}