import router from '@/router';
import axios from 'axios';
import * as Sentry from '@sentry/vue';

export default {
  getCategories({ commit }) {
    axios
      .get('/v2/serviceCategory/getAllCategories')
      .then((responce) => {
        commit('setCatgeoryList', responce.data);
      })
      .catch((err) => {
        Sentry.captureException(err);
        console.log(err);
      });
  },
  getCompanyByservice({ commit }, payload) {
    const url = encodeURIComponent(payload.service);
    axios
      .get(`/v2/company/getCompaniesByService/${payload.subSlug}`)
      .then((responce) => {
        const data = {
          data: responce.data,
          name: payload.service,
        };
        commit('setCompanies', data);
        // router.replace(`v2/ofs-directory/${payload.slug}/${payload.subSlug}`);
      })
      .catch((err) => {
        Sentry.captureException(err);
        console.log(err);
      });
  },

  getSupplierCompanyByservice({ commit }, payload) {
    const url = encodeURIComponent(payload.service);
    axios
      .get(`/v2/company/getCompaniesByService/${payload.subSlug}`)
      .then((responce) => {
        const data = {
          data: responce.data,
          name: payload.service,
          slug: payload.slug,
        };
        commit('setCompanies', data);
      })
      .catch((err) => {
        Sentry.captureException(err);
        console.log(err);
      });
  },
  getSupplierMainService({ commit }, payload) {
    const url = encodeURIComponent(payload.name);
    axios
      .get(`/v2/company/getCompaniesByMainService/${payload.slug}`)
      .then((responce) => {
        const data = {
          data: responce.data,
          name: payload.name,
          id: payload.id,
        };
        commit('setCompanies', data);
      })
      .catch((err) => {
        Sentry.captureException(err);
        console.log(err);
      });
  },
  getCompanyMainService({ commit }, payload) {
    const url = encodeURIComponent(payload.name);
    axios
      .get(`/v2/company/getCompaniesByMainService/${payload.slug}`)
      .then((responce) => {
        const data = {
          data: responce.data,
          name: payload.name,
          id: payload.id,
        };
        commit('setCompanies', data);
        router.replace(`v2/ofs-directory/${payload.slug}`);
      })
      .catch((err) => {
        Sentry.captureException(err);
        console.log(err);
      });
  },
  getCompanyByBasin({ commit }, payload) {
    commit('setOfsLoader', true);
    axios
      .get(`/v2/company/getCompanyByBasin/${payload.basin}/${payload.slug}`)
      .then((responce) => {
        const data = {
          data: responce.data,
        };
        console.log('response', responce);
        commit('setCompanies', responce.data.companies);
        commit('setServiceCategory', responce.data.category);
        commit('setOfsLoader', false);
      })
      .catch((err) => {
        Sentry.captureException(err);
        console.log(err);
        commit('setOfsLoader', false);
      });
  },
  getCompanyInfo({ commit }, payload) {
    commit('setPageLoader', true);
    axios
      .get(`/v2/company/getCompanyBySlug/${payload.slug}`)
      .then((responce) => {
        commit('setSupplierCompany', responce.data);
        commit('setPageTitle', `${responce.data.companyData.companyName} - ${responce.data.companyData.companyHq} - BidOut Profile`);
        commit('setPageDescription', responce.data.companyData.overview);
        commit('setPageLoader', false);
      })
      .catch((err) => {
        Sentry.captureException(err);
        console.log(err);
      });
  },
  getPublicCompanyInfo({ commit }, payload) {
    commit('setPageLoader', true);
    axios
      .get(`/v2/company/getCompanyBySlug/${payload.slug}`)
      .then((responce) => {
        commit('setPublicCompany', responce.data);
        commit('setPageTitle', `${responce.data.companyData.companyName} - ${responce.data.companyData.companyHq} - BidOut Profile`);
        commit('setPageDescription', responce.data.companyData.overview);
        commit('setPageLoader', false);
      })
      .catch((err) => {
        Sentry.captureException(err);
        console.log(err);
      });
  },
  getPremiumCompanies({ commit }, payload) {
    axios
      .get('v2/admin/getPremiumCompanies')
      .then((responce) => {
        commit('setPremiumList', responce.data);
      })
      .catch((err) => {
        Sentry.captureException(err);
        console.log(err);
      });
  },
  searchCompany({ commit }, payload) {
    axios
      .get(`v2/ofs/searchSuppliers/${payload}`)
      .then((responce) => {
        commit('setCompanies', responce.data.hits);
      })
      .catch((err) => {
        Sentry.captureException(err);
        console.log(err);
      });
  },
  async placeOrder({ commit, dispatch, state }, payload) {
    try {
      const res = await axios.post('v2/order/placeOrder', {
        companyId: payload.companyId,
        companyName: payload.companyName,
        content: payload.content,
        buyerId: payload.buyerId,
      });
      if (res.status == 200) {
        router.replace(`/confirm-order/${payload.slug}`);
        commit('setOrderStatus', true);
      } else {
        commit('setOrderStatus', false);
      }
    } catch (err) {
      console.log(err);
    }
  },
};
