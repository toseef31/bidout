export default {
    userss (state){
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
}