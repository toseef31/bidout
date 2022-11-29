export default {
  validate(state) {
    return state.validate;
  },
  teamMembers(state) {
    return state.teamMembers;
  },
  salesRepsList(state) {
    return state.salesRepsList;
  },
  companiesList(state) {
    return state.companiesList;
  },
  serviceCompaniesList(state) {
    return state.serviceCompaniesList;
  },
  draftBidsList(state) {
    return state.draftBidsList;
  },
  bidsList(state) {
    return state.bidsLists;
  },
  itemBidData(state) {
    return state.itemBidData;
  },
  attachData(state) {
    return state.attachData;
  },
  draftTime(state) {
    return state.draftTime;
  },
  bidData(state) {
    return state.bidData;
  },
  newSupplier(state) {
    return state.newSupplier;
  },
  lineItemsComplete(state) {
    return state.lineItemsComplete;
  },
  bidDetailsComplete(state) {
    return state.bidDetailsComplete;
  },
  showSuccessDeleteBid(state) {
    return state.alertDeleteBidSuccess;
  },
  showErrorDeleteBid(state) {
    return state.alertDeleteBidError;
  },
  bidSerial(state) {
    return state.bidSerial;
  },
};
