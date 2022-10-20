export default {
  setTeamMembers(state, payload){
  	state.teamMembers = payload
  },
  setSalesReps(state, payload){
  	state.salesRepsList = payload
  },
  setCompaniesList(state, payload){
  	state.companiesList = payload
  },
  setServiceCompanies(state, payload){
  	state.serviceCompaniesList = payload
  },
}