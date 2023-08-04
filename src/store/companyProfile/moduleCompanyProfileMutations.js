export default {
  setCompany(state, payload) {
    state.companyData = payload;
  },
  setSubCategories(state, payload) {
    state.subCategories = payload;
  },
  setBasinLoading(state, payload) {
    state.loadingBasin = payload;
  },
  setProgressCount(state, payload) {
    state.progressCount += payload;
  },
  setModuleCOunt(state, payload) {
    state.moduleCOunt += payload;
  },
  setModuleWeight(state, payload) {
    if (payload.status === "add") {
      const index = state.moduleWeight.findIndex(
        (x) => x.module === payload.module
      );

      if (index === -1) {
        state.moduleWeight.push(payload);
      }
    } else {
      const afterRemove = state.moduleWeight.filter(
        (y) => y.module !== payload.module
      );
      state.moduleWeight = afterRemove;
    }
  },
  setSaveInfoLoading(state, payload) {
    state.saveInfoLoading = payload;
  },
  setKeyFactsLoading(state, payload) {
    state.keyfactsLoading = payload;
  },
  setNewsLoading(state, payload) {
    state.newsLoading = payload;
  },
  setManageCompanyError(state, message) {
    state.manageCompanyError = message;
    setTimeout(() => {
      state.manageCompanyError = null;
    }, 5000);
  },
  setCompanyExecutiveLoading(state, payload) {
    state.companyExecutiveLoading = payload;
  },
  setNDADocumentAlert(state) {
    state.ndaDocumentAlert = true;
    setTimeout(() => {
      state.ndaDocumentAlert = false;
    }, 5000);
  },
  setNDADocument(state,payload) {
    state.ndaDocument = payload
  }
};
