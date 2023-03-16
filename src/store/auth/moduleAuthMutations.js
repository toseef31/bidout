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
    }, 7000);
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
    }, 7000);
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
  setId(state, payload) {
    state.id = payload;
  },
  setCustomerId(state, payload) {
    state.customerId = payload;
  },
  setPrice(state, payload) {
    state.price = payload;
  },
  setCredentials(state, payload) {
    state.credentials = payload;
  },
  setQueueAdmins(state, payload) {
    state.queueAdmins = payload;
  },
  setSameAsData(state, payload) {
    state.sameAsData = payload;
  },
  setPackage(state, payload) {
    state.packageValue = payload;
  },
  setModuleRfxOption(state, payload) {
    state.moduleRfxOption = payload;
  },
  setModuleOfsOption(state, payload) {
    state.moduleOfsOption = payload;
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
};
