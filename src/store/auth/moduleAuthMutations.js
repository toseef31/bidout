export default {
    setUser (state, payload){
    	state.userInfo = payload
    },
    setToken (state, payload){
      state.userToken = payload
    },
    setUserId (state, payload){
      state.userId = payload
    },
    setError (state, payload){
    	state.error = payload
    },
    showErrorAlert(state){
      state.alerts.showErrorAlert = true
      setTimeout(() => {
        state.alerts.showErrorAlert = false
      }, 2000);
    },
    setEmailSuccess (state, payload){
    	state.successMessage = payload
    },
    setEmailError (state, payload){
    	state.errorMessage = payload
    },
    setSupplierList (state, payload){
      state.supplier = payload
    },
    setEmailExistSuccess (state, payload){
      state.emailExists = payload
    },
    setCompanyError (state, payload){
      state.companyError = payload
    },
    setLocalIp (state, payload){
      state.userIp = payload
    },
    setCompanyName (state, payload){
      state.companyName = payload
    },
    setVerifyData (state, payload){
      state.verifyData = payload
    },
    setContract (state, payload){
      state.contractData = payload
    },
}