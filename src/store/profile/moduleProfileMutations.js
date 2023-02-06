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
    setPendingUsersList (state, payload){
      state.pendingList = payload
    },
    showErrorAlert(state){
      state.alerts.showErrorAlert = true
      setTimeout(() => {
        state.alerts.showErrorAlert = false
      }, 2000);
    },
    showSuccessAlert(state){
      state.alerts.showSuccessAlert = true
      setTimeout(() => {
        state.alerts.showSuccessAlert = false
      }, 3000);
    },
    setInviteData(state,payload){
      state.inviteData = payload;
    },
    editProfileLoading(state,payload){
      state.profileLoading = payload;
    },
    setPasswordLoading(state,payload){
      state.passwordLoading = payload;
    }
}