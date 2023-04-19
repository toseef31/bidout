export default {
  setUser(state, payload) {
    state.userInfo = payload;
    state.isAuthenticated = Boolean(payload);
    state.isUserData = false;
  },
  setToken(state, payload) {
    state.userToken = payload;
  },
  setUserId(state, payload) {
    state.userId = payload;
  },
  setCompanyId(state, payload) {
    state.companyId = payload;
  },
  setError(state, payload) {
    state.error = payload;
    setTimeout(() => {
      state.error = null;
    }, 12000);
  },
  setPassError(state, payload) {
    state.passError = payload;
    setTimeout(() => {
      state.passError = null;
    }, 5000);
  },
  showErrorAlert(state) {
    state.alerts.showErrorAlert = true;
    setTimeout(() => {
      state.alerts.showErrorAlert = false;
      state.companyError = null;
      state.error = null;
    }, 12000);
  },
  showSuccessAlert(state) {
    state.alerts.showSuccessAlert = true;
    setTimeout(() => {
      state.alerts.showSuccessAlert = false;
    }, 5000);
  },
  setEmailSuccess(state, payload) {
    state.successMessage = payload;
    setTimeout(() => {
      state.successMessage = null;
    }, 5000);
  },
  setEmailError(state, payload) {
    state.errorMessage = payload;
  },
  setSupplierList(state, payload) {
    state.supplier = payload;
  },
  setEmailExistSuccess(state, payload) {
    state.emailExists = payload;
  },
  setCompanyError(state, payload) {
    state.companyError = payload;
  },
  setLocalIp(state, payload) {
    state.userIp = payload;
  },
  setCompanyName(state, payload) {
    state.companyName = payload;
  },
  setVerifyData(state, payload) {
    state.verifyData = payload;
  },
  setResetEmail(state, payload) {
    state.resetEmail = payload;
  },
  setContract(state, payload) {
    state.contractData = payload;
  },
  setPlan(state, payload) {
    state.plan = payload;
  },
  setSameAsData(state, payload) {
    state.sameAsData = payload;
  },
  setIsUserData(state, payload) {
    state.isUserData = payload;
  },
  setLoginLoading(state, payload) {
    state.loginLoading = payload;
  },
  setForgetEmail(state, payload) {
    state.forgetEmail = payload;
  },
  setTokenInvitedSupplier(state, payload) {
    state.tokenInvitedSupplier = payload;
  },
  setTokenInvitedSupplierError(state, payload) {
    state.tokenInvitedSupplierError = payload;
  },
  setBuyerSignUpSuccess(state, payload) {
    state.buyerSignUpSuccess = payload;
  },
  setAdmins(state, payload) {
    state.admins = payload;
  },
  setSupplierExistingSignUpSuccess(state, payload) {
    state.supplierExistingSignUpSuccess = payload;
  },
};
