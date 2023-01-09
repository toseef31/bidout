export default {
  setCatgeoryList(state, payload) {
    state.categories = payload;
  },
  setCompanies(state, payload) {
    state.serviceCompanies = payload;
  },
  setServiceCategory(state, payload) {
    state.serviceCategory = payload;
  },
  setPremiumList(state, payload) {
    state.premiumCompanies = payload;
  },
  setPublicCompany(state, payload) {
    state.publicCompany = payload;
  },
  setSupplierCompany(state, payload) {
    state.supplierCompany = payload;
  },
  setPageTitle(state, payload) {
    state.pageTitle = payload;
  },
  setPageDescription(state, payload) {
    state.pageDescription = payload;
  },
  setLoader(state, payload) {
    state.innerLoader = payload;
  },
  setOrderStatus(state, payload) {
    state.orderStatus = payload;
  },
  setOfsLoader(state, payload) {
    state.ofsLoader = payload;
  },
};
