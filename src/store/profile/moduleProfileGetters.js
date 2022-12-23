export default {
   userImg (state){
    	return state.userImg
   },
   historyData (state){
      return state.historyData
   },
   companyAdmins (state){
      return state.companyAdmins
   },
   message (state){
      return state.message
   },
   userData (state){
      return state.userData
   },
   disableList (state){
      return state.disableList
   },
   pendingList (state){
      return state.pendingList
   },
   showErrorAlert (state) {
     return state.alerts.showErrorAlert;
   },
   inviteData (state) {
     return state.inviteData;
   },
}