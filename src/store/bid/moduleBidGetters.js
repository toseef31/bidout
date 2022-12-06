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
  bidViewData(state) {
    return state.bidViewData;
  },
  submittedBid(state) {
    return state.submittedBids;
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
  showViewBidError(state) {
    return state.viewBidError;
  },
  bidSerial(state) {
    return state.bidSerial;
  },
  invitedSuppliersData(state) {
    return state.invitedSuppliersData;
  },
  bidIntent(state) {
    return state.bidIntent;
  },
  supplierAttachment(state) {
    return state.supplierAttachment;
  },
  questionAttachment(state) {
    return state.questionAttachment;
  },
  userType(state) {
    return state.userType;
  },
  intentId(state) {
    return state.intentId;
  },
  isBidSubmitted(state) {
    return state.isBidSubmitted;
  },
};
