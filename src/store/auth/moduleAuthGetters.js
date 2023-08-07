export default {
  userToken(state) {
    return state.userToken;
  },
  userInfo(state) {
    return state.userInfo;
  },
  isAuthenticated(state) {
    return state.isAuthenticated;
  },
  supplierId(state) {
    return state.supplierId;
  },
  error(state) {
    return state.error;
  },
  passError(state) {
    return state.passError;
  },
  authShowErrorAlert(state) {
    return state.alerts.showErrorAlert;
  },
  showSuccessAlert(state) {
    return state.alerts.showSuccessAlert;
  },
  successMessage(state) {
    return state.successMessage;
  },
  errorMessage(state) {
    return state.errorMessage;
  },
  supplier(state) {
    return state.supplier;
  },
  emailExists(state) {
    return state.emailExists;
  },
  companyError(state) {
    return state.companyError;
  },
  userIp(state) {
    return state.userIp;
  },
  companyName(state) {
    return state.companyName;
  },
  verifyData(state) {
    return state.verifyData;
  },
  resetEmail(state) {
    return state.resetEmail;
  },
  contractData(state) {
    return state.contractData;
  },
  plan(state) {
    return state.plan;
  },
  sameAsData(state) {
    return state.sameAsData;
  },
  loginLoading(state) {
    return state.loginLoading;
  },
  forgetEmail(state) {
    return state.forgetEmail;
  },
  tokenInvitedSupplier(state) {
    return state.tokenInvitedSupplier;
  },
  tokenInvitedSupplierError(state) {
    return state.tokenInvitedSupplierError;
  },
  buyerSignUpSuccess(state) {
    return state.buyerSignUpSuccess;
  },
  admins(state) {
    return state.admins;
  },
  supplierExistingSignUpSuccess(state) {
    return state.supplierExistingSignUpSuccess;
  },
  goToModuleSelection(state) {
    return state.goToModuleSelection;
  },
  goToAgreement(state) {
    return state.goToAgreement;
  },
  supplierSignUpSuccess(state) {
    return state.supplierSignUpSuccess;
  },
  invitedSupplierEmailExists(state) {
    return state.invitedSupplierEmailExists;
  },
  contractType(state) {
    return state.contractType
  }
};
