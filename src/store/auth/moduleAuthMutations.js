export default {
    setUser (state, payload){
      console.log('ffff',payload);
    	state.userInfo = payload
    },
    
    setError (state, payload){
    	state.error = payload
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
}