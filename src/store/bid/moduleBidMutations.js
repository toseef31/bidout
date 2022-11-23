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
};
