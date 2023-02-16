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
  setStatusMessage(state, payload) {
    state.statusMessage = payload;
    setTimeout(() => {
        state.statusMessage = null;
    }, 8000);
  },
   setResponseId (state, payload){
      state.responseId = payload
  },
  setActivityList (state, payload){
      state.activities = payload
  },
  setInvitedUsersList (state, payload){
      state.invitedList = payload
  },
  setPendingCount (state, payload){
   state.pendingCount = payload
  },
  setAllLocations (state, payload){
   state.allLocations = payload
  },
  setLocationLoader (state, payload){
    state.locationLoader = payload;
  }
}
