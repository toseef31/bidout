export default {
    setUserImg (state, payload){
    	state.userImg = payload
    },
    setLoginHistory (state, payload){
      state.historyData = payload
    },
    setCompanyAdmin (state, payload){
      state.companyAdmins = payload
    },
    setInviteUser (state, inviteUser){
      state.inviteUser = payload
    },
    setMessage (state, payload){
      state.message = payload
    },
    setEditData (state, payload){
      state.userData = payload
    },
    setDisableUsersList (state, payload){
      state.disableList = payload
    },
}