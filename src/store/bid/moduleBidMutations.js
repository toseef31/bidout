export default {
  setTeamMembers(state, payload) {
    state.teamMembers = payload;
  },
  setSalesReps(state, payload) {
    state.salesRepsList = payload;
  },
  setCompaniesList(state, payload) {
    state.companiesList = payload;
  },
  setServiceCompanies(state, payload) {
    state.serviceCompaniesList = payload;
  },
  setDraftBidsList(state, payload) {
    state.draftBidsList = payload;
  },
  setBidsList(state, payload) {
    state.bidsLists = payload;
  },
  setBidData(state, payload) {
    state.bidData = payload;
  },
  setItemBidData(state, payload) {
    state.itemBidData = payload;
  },
  setAttachData(state, payload) {
    state.attachData = payload;
  },
  setDraftTime(state, payload) {
    state.draftTime = payload;
  },
  setNewSupplier(state, payload) {
    state.newSupplier.push(payload.id);
  },
  setLineItemsComplete(state, payload) {
    state.lineItemsComplete = payload;
  },
  setBidDetailsComplete(state, payload) {
    state.bidDetailsComplete = payload;
  },
  setBidViewData(state, payload) {
    state.bidViewData = payload;
  },
  setViewBidError(state, payload) {
    state.viewBidError = payload;
  },
  setSubmittedBids(state, payload) {
    state.submittedBids = payload;
  },
  setSuccessDeleteBid(state) {
    state.alertDeleteBidSuccess = true;
    setTimeout(() => {
      state.alertDeleteBidSuccess = false;
    }, 5000);
  },
  setErrorDeleteBid(state) {
    state.alertDeleteBidError = true;
    setTimeout(() => {
      state.alertDeleteBidError = false;
    }, 5000);
  },
  setBidSerial(state, payload) {
    state.bidSerial = payload;
  },
  setInvitedSuppliersData(state, payload) {
    state.invitedSuppliers = payload;
  },
  setInvitedTeamMembers(state, payload) {
    state.invitedTeamMembers = payload;
  },
  setBidlines(state, payload) {
    state.bidlines = payload;
  },
  setAttachement(state, payload) {
    state.attachement = payload;
  },
  setQuestions(state, payload) {
    state.questions = payload;
  },
  setBidIntent(state, payload) {
    state.bidIntent = payload;
  },
  setSupplierAttachment(state, payload) {
    state.supplierAttachment.push(payload);
    state.supplierAttachment = state.supplierAttachment.filter((value, index, self) => index === self.findIndex((t) => (
      t.fileName === value.fileName
    )));
  },
  setUserType(state, payload) {
    state.userType = payload;
  },
  setIntentId(state, payload) {
    state.intentId = payload;
  },
  setIsBidSubmitted(state, payload) {
    state.isBidSubmitted = payload;
  },
  setSupplierBid(state, payload) {
    state.supplierBid = payload;
  },
  setQAndA(state, payload) {
    state.qAndA = payload;
  },
  setDraftBidData(state, payload) {
    state.draftBidData = payload;
  },
  setDraftBidsListId(state, payload) {
    state.draftBidsListId = payload;
  },
  setBidTitle(state, payload) {
    state.bidData.title = payload;
  },
  setBidType(state, payload) {
    state.bidData.type = payload;
  },
  setBidDueDate(state, payload) {
    state.bidData.dueDate = payload;
  },
  setBidDueTime(state, payload) {
    state.bidData.dueTime = payload;
  },
  setBidRegions(state, payload) {
    state.bidData.regions = payload;
  },
  setBidEnabled(state, payload) {
    state.bidData.qAndAEnabled = payload;
  },
  setBidDescription(state, payload) {
    state.bidData.bidDescriptions = payload;
  },
  setUnansweredQuestionCount(state, payload) {
    state.unansweredQuestionCount = payload;
  },
};
