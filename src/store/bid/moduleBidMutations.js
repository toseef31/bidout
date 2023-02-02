export default {
  setTeamMembers(state, payload) {
    state.teamMembers = payload;
  },
  setSalesReps(state, payload) {
    state.salesRepsList = payload.sort((a, b) => {
      let aHasOfsPremium = a.contracts.some(contract => contract === 'ofs-premium');
      if (aHasOfsPremium) {
        return -1;
      }
      return 1;
    });
  },
  setCompaniesList(state, payload) {
    state.companiesList = payload.sort((a, b) => {
      let aHasOfsPremium = a.contracts.some(contract => contract.contractType === 'ofs-premium');
      if (aHasOfsPremium) {
        return -1;
      }
      return 1;
    });
  },
  setServiceCompanies(state, payload) {
    state.serviceCompaniesList = payload.sort((a, b) => {
      let aHasOfsPremium = a.contracts.some(contract => contract.contractType === 'ofs-premium');
      if (aHasOfsPremium) {
        return -1;
      }
      return 1;
    });
  },
  setDraftBidsList(state, payload) {
    state.draftBidsList = payload;
  },
  setBidSerial(state, payload){
    state.bidSerial = payload;
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
  spliceAttachData(state,index){
    state.attachData.splice(index,1);
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
  setBidTemplates(state, payload) {
    state.bidTemplates = payload;
  },
  setBidViewData(state, payload) {
    state.bidViewData = payload;
  },
  setViewBidError(state, payload) {
    state.viewBidError = payload;
  },
  setSuccessDeleteBid(state) {
    state.alertDeleteBidSuccess = true;
    setTimeout(() => {
      state.alertDeleteBidSuccess = false;
    }, 8000);
  },
  setErrorDeleteBid(state) {
    state.alertDeleteBidError = true;
    setTimeout(() => {
      state.alertDeleteBidError = false;
    }, 8000);
  },
  setAlertEditBidSubmissionSuccess(state) {
    state.alertEditBidSubmissionSuccess = true;
    setTimeout(() => {
      state.alertEditBidSubmissionSuccess = false;
    }, 8000);
  },
  setBidSerial(state, payload) {
    state.bidSerial = payload;
  },
  getSingleTemplate(state, payload) {
    state.singleTemplate = payload;
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
  removeSupplierAttachment(state) {
    state.supplierAttachment = [];
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
  setInvitedNewSuppliers(state, payload) {
    state.invitedNewSuppliers = payload;
  },
  setUnansweredQuestionCount(state, payload) {
    state.unansweredQuestionCount = payload;
  },
  setAnsweredQuestionCount(state, payload) {
    state.answeredCount = payload;
  },
  setAllIntend(state, payload) {
    state.bidAllIntend = payload;
  },
  setAwardAlert(state) {
    state.bidSubmissionAlert.award = true;
    setTimeout(() => {
      state.bidSubmissionAlert.award = false;
    }, 8000);
  },
  setDisqualifyAlert(state) {
    state.bidSubmissionAlert.disqualify = true;
    setTimeout(() => {
      state.bidSubmissionAlert.disqualify = false;
    }, 8000);
  },
  setUnAwardAlert(state) {
    state.bidSubmissionAlert.unAward = true;
    setTimeout(() => {
      state.bidSubmissionAlert.unAward = false;
    }, 8000);
  },
  setUnDisqualifyAlert(state) {
    state.bidSubmissionAlert.unDisqualify = true;
    setTimeout(() => {
      state.bidSubmissionAlert.unDisqualify = false;
    }, 8000);
  },
  setLoweringPriceAlert(state) {
    state.loweringPriceAlert = true;
    setTimeout(() => {
      state.loweringPriceAlert = false;
    }, 8000);
  },
  setEntryCheckForEditBid(state, payload) {
    state.entryCheckForEditBid = payload;
  },
  spliceCompanies(state,index){
    state.companiesList.splice(index,1);
  },
  pushCompanies(state,company){
    state.companiesList.push(company);
  },
  spliceSalesRepsList(state,index){
    state.salesRepsList.splice(index,1);
  },
  pushSalesRepsList(state,list){
    state.salesRepsList.push(list);
  },
};
