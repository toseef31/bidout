export default {
    userInfo (state){
        console.log('sdsdfsd',state.userInfo);
    	return state.userInfo
    },
    error (state){
    	return state.error
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
}