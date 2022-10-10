export default {
  setCatgeoryList (state, payload){
    state.categories = payload
  },
  setCompanies(state, payload){
    state.serviceCompanies = payload
  },
  setPremiumList(state, payload){
    state.premiumCompanies = payload
  },
}