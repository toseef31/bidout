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
  bidDetailsComplete(state) {
    return state.bidDetailsComplete;
  },
  bidTemplates(state) {
    return state.bidTemplates;
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
  singleTemplate(state) {
    return state.singleTemplate;
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
  userType(state) {
    return state.userType;
  },
  intentId(state) {
    return state.intentId;
  },
  isBidSubmitted(state) {
    return state.isBidSubmitted;
  },
  supplierBid(state) {
    return state.supplierBid;
  },
  qAndA(state) {
    return state.qAndA;
  },
  draftBidData(state) {
    return state.draftBidData;
  },
  draftBidsListId(state) {
    return state.draftBidsListId;
  },
  unansweredQuestionCount(state) {
    return state.unansweredQuestionCount;
  },
  answeredQuestionCount(state) {
    return state.answeredCount;
  },
  invitedNewSuppliers(state) {
    return state.invitedNewSuppliers;
  },
  bidAllIntend(state) {
    return state.bidAllIntend;
  },
  alertEditBidSubmissionSuccess(state) {
    return state.alertEditBidSubmissionSuccess;
  },
  bidSubmissionAlert(state) {
    return state.bidSubmissionAlert;
  },
  loweringPriceAlert(state) {
    return state.loweringPriceAlert;
  },
  entryCheckForEditBid(state) {
    return state.entryCheckForEditBid;
  },
  saveBidLoading(state){
    return state.saveBidLoading;
  },
  loadingInvite(state){
    return state.loadingInvite;
  }
};
