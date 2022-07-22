export default {
    setUser (state, payload){
    	state.user = payload
    },
    removeUser (state){
    	state.user = null
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
}