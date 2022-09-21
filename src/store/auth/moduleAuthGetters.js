export default {
    userInfo (state){
    	return state.userInfo
    },
    userToken (state){
      return state.userToken
    },
    userId (state){
      return state.userId
    },
    error (state){
    	return state.error
    },
    passError (state){
      return state.passError
    },
    showErrorAlert (state) {
      return state.alerts.showErrorAlert;
    },
    showSuccessAlert (state) {
      return state.alerts.showSuccessAlert;
    },
    successMessage (state){
    	return state.successMessage
    },
    errorMessage (state){
    	return state.errorMessage
    },
    supplier (state){
       return state.supplier
    },
    emailExists (state){
       return state.emailExists
    },
    companyError (state){
       return state.companyError
    },
    userIp (state){
       return state.userIp
    },
    companyName (state){
       return state.companyName
    },
    verifyData (state){
       return state.verifyData
    },
    resetEmail (state){
       return state.resetEmail
    },
    contractData (state){
       return state.contractData
    },
}