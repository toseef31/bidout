export default {
  setTeamMembers(state, payload) {
    state.teamMembers = payload;
  },
  setSalesReps(state, payload) {
    state.salesRepsList = payload.sort((a, b) => {
      const aHasOfsPremium = a.contracts.some(
        (contract) => contract === 'ofs-premium',
      );
      if (aHasOfsPremium) {
        return -1;
      }
      return 1;
    });
  },
  setCompaniesList(state, payload) {
    state.companiesList = payload.sort((a, b) => {
      const aHasOfsPremium = a.contracts.some(
        (contract) => contract.contractType === 'ofs-premium',
      );
      if (aHasOfsPremium) {
        return -1;
      }
      return 1;
    });
  },
  setServiceCompanies(state, payload) {
    state.serviceCompaniesList = payload.sort((a, b) => {
      const aHasOfsPremium = a.contracts.some(
        (contract) => contract.contractType === 'ofs-premium',
      );
      if (aHasOfsPremium) {
        return -1;
      }
      return 1;
    });
  },
  setDraftBidsList(state, payload) {
    state.draftBidsList = payload;
  },
  setBidSerial(state, payload) {
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
  spliceAttachData(state, id) {
    const indexToRemove = state.attachData.findIndex((obj) => obj.id === id);
    if (indexToRemove !== -1) {
      state.attachData = null;
    }
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
    state.supplierAttachment = state.supplierAttachment.filter(
      (value, index, self) => index === self.findIndex((t) => t.fileName === value.fileName),
    );
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
    state.isEditBidChanges = true;
  },
  setBidType(state, payload) {
    state.bidData.type = payload;
    state.isEditBidChanges = true;
  },
  setBidDueDate(state, payload) {
    state.bidData.dueDate = payload;
    state.isEditBidChanges = true;
  },
  setBidDueTime(state, payload) {
    state.bidData.dueTime = payload;
    state.isEditBidChanges = true;
  },
  setBidRegions(state, payload) {
    state.bidData.regions = payload;
    state.isEditBidChanges = true;
  },
  setBidEnabled(state, payload) {
    state.bidData.qAndAEnabled = payload;
    state.isEditBidChanges = true;
  },
  setBidDescription(state, payload) {
    state.bidData.bidDescriptions = payload;
    state.isEditBidChanges = true;
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
  setLoweringPriceAlert(state, payload) {
    state.loweringPriceAlert = payload;
    setTimeout(() => {
      state.loweringPriceAlert = null;
    }, 8000);
  },
  setEntryCheckForEditBid(state, payload) {
    state.entryCheckForEditBid = payload;
  },
  spliceCompanies(state, index) {
    state.companiesList.splice(index, 1);
  },
  pushCompanies(state, company) {
    state.companiesList.push(company);
  },
  spliceSalesRepsList(state, index) {
    state.salesRepsList.splice(index, 1);
  },
  pushSalesRepsList(state, list) {
    state.salesRepsList.push(list);
  },
  setSaveBidLoading(state, payload) {
    state.saveBidLoading = payload;
  },
  setLoadingInvite(state, payload) {
    state.loadingInvite = payload;
  },
  setBidActivities(state, payload) {
    state.bidActivities = payload;
  },
  spliceTeamMember(state, index) {
    state.teamMembers.splice(index, 1);
  },
  pushTeamMember(state, member) {
    state.teamMembers.push(member);
  },
  setIsEditBidChanges(state, payload) {
    state.isEditBidChanges = payload;
  },
  setSupplierAddAlert(state) {
    state.supplierAddAlert = true;
    setTimeout(() => {
      state.supplierAddAlert = false;
    }, 8000);
  },
  setDateAlert(state) {
    state.dateAlert = true;
    setTimeout(() => {
      state.dateAlert = false;
    }, 8000);
  },
  setTeamMemberAddAlert(state) {
    state.teamMemberAddAlert = true;
    setTimeout(() => {
      state.teamMemberAddAlert = false;
    }, 8000);
  },
  setTeamMembersForBid(state, payload) {
    state.teamMembersForBid = payload;
  },
  pushTeamMembersForBid(state, member) {
    state.teamMembersForBid.push(member);
  },
  spliceTeamMembersForBid(state, member) {
    state.teamMembersForBid = [
      ...new Map(
        state.teamMembersForBid.map((item) => [item.id, item]),
      ).values(),
    ];

    const index = state.teamMembersForBid.findIndex((el) => el.id === member);

    if (index !== -1) {
      state.teamMembersForBid.splice(index, 1);
    }
  },
  setTeamMembersInitial(state, payload) {
    state.teamMembersInitial = payload;
  },
  spliceTeamMembersInitial(state, member) {
    const index = state.teamMembersInitial.findIndex((el) => el.id === member);

    if (index !== -1) {
      state.teamMembersInitial.splice(index, 1);
    }
  },
  pushTeamMembersInitial(state, member) {
    state.teamMembersInitial.push(member);
  },
  setBidSubmissionValidationAlert(state, payload) {
    state.bidSubmissionValidationAlert = payload;
    setTimeout(() => {
      state.bidSubmissionValidationAlert = null;
    }, 8000);
  },
};
