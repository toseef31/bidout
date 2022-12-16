export default {
  validate: false,
  teamMembers: null,
  salesRepsList: null,
  companiesList: null,
  serviceCompaniesList: null,
  draftBidsList: null,
  bidsLists: [],
  itemBidData: null,
  bidData: {
    title: '',
    type: '',
    regions: '',
    dueDate: '',
    dueTime: '',
    qAndAEnabled: '',
    bidDescriptions: [{ body: '' }],
  },
  attachData: [],
  draftTime: null,
  newSupplier: [],
  supplierBid: null,
  lineItemsComplete: false,
  bidDetailsComplete: false,
  bidTemplates: null,
  alertDeleteBidSuccess: false,
  alertDeleteBidError: false,
  alertEditBidSubmissionSuccess: false,
  bidViewData: null,
  viewBidError: false,
  invitedSuppliers: null,
  invitedTeamMembers: null,
  bidlines: null,
  attachement: null,
  questions: null,
  bidSerial: null,
  singleTemplate: null,
  invitedSuppliersData: null,
  bidIntent: null,
  bidAllIntend: null,
  supplierAttachment: [],
  userType: null,
  intentId: null,
  isBidSubmitted: false,
  qAndA: [],
  draftBidData: null,
  draftBidsListId: null,
  invitedNewSuppliers: null,
  unansweredQuestionCount: 0,
  bidApiCounter: 0,
  bidSubmissionAlert: {
    award: false,
    disqualify: false,
    unAward: false,
    unDisqualify: false,
  },
};
