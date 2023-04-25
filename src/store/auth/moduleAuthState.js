export default {
  userInfo: null,
  userToken: JSON.parse(localStorage.getItem("token")),
  isAuthenticated: false,
  supplierId: "",
  error: null,
  passError: null,
  alerts: {
    showErrorAlert: false,
    showSuccessAlert: false,
  },
  successMessage: null,
  errorMessage: null,
  supplier: [],
  emailExists: false,
  companyError: null,
  userIp: null,
  companyName: "",
  verifyData: {},
  contractData: "",
  plan: null,
  sameAsData: null,
  isUserData: false,
  loginLoading: false,
  forgetEmail: null,
  tokenInvitedSupplier: null,
  tokenInvitedSupplierError: false,
  buyerSignUpSuccess: null,
  admins: [],
  supplierExistingSignUpSuccess: null,
  goToModuleSelection: null,
  goToAgreement: null,
  supplierSignUpSuccess: null,
};
