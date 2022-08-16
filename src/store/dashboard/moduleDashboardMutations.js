export default {
   getBids (state, payload){
   	state.bids = payload
  },
   getUsersList (state, payload){
      state.userList = payload
  },
   setUserStatus (state, payload){
      state.userStatus = payload
  },
   setStatusMessage (state, payload){
      state.statusMessage = payload
  },
   setResponseId (state, payload){
      state.responseId = payload
  },
}