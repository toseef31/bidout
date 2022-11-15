export default {
   validate (state){
   	return state.validate 
   },
   teamMembers(state){
      return state.teamMembers;
   },
   salesRepsList(state){
      return state.salesRepsList;
   },
   companiesList(state){
      return state.companiesList;
   },
   serviceCompaniesList(state){
      return state.serviceCompaniesList;
   },
   draftBidsList(state){
      return state.draftBidsList;
   },
   bidsList(state){
      return state.bidsLists;
   }
   itemBidData(state){
      return state.itemBidData;
   },
   attachData(state){
      return state.attachData;
   },
   draftTime(state){
      return state.draftTime;
   },
   newSupplier(state){
      return state.newSupplier;
   },
}