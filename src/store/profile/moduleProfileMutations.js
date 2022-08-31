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
}