export default {
  validate: false,
  teamMembers: null,
  salesRepsList: null,
  companiesList: null,
  serviceCompaniesList: null,
  draftBidsList: null,
  bidsLists: [],
  itemBidData: null,
  bidData: JSON.parse(localStorage.getItem('bidData')),
  attachData: null,
  draftTime: null,
  newSupplier: [],
  lineItemsComplete: false,
  bidDetailsComplete: false,
  alertDeleteBidSuccess: false,
  alertDeleteBidError: false
};
