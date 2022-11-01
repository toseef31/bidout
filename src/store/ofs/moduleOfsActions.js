import router from "@/router";
import axios from "axios";

export default {
  getCategories({ commit }) {
    axios
      .get("/serviceCategory/getAllCategories")
      .then((responce) => {
        commit("setCatgeoryList", responce.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  getCompanyByservice({ commit }, payload) {
    const url = encodeURIComponent(payload.service);
    axios
      .get(`/company/getCompaniesByService/${url}`)
      .then((responce) => {
        const data = {
          data: responce.data,
          name: payload.service,
        };
        commit("setCompanies", data);
        router.replace(`/ofs-directory/${payload.slug}/${payload.subSlug}`);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getSupplierCompanyByservice({ commit }, payload) {
    const url = encodeURIComponent(payload.service);
    axios
      .get(`/company/getCompaniesByService/${url}`)
      .then((responce) => {
        const data = {
          data: responce.data,
          name: payload.service,
          slug: payload.slug,
        };
        commit("setCompanies", data);
        router.replace(`/ofs-supplier/${payload.slug}/${payload.subSlug}`);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  getSupplierMainService({ commit }, payload) {
    const url = encodeURIComponent(payload.name);
    axios
      .get(`/company/getCompaniesByMainService/${payload.name}/${payload.id}`)
      .then((responce) => {
        const data = {
          data: responce.data,
          name: payload.name,
          id: payload.id,
        };
        commit("setCompanies", data);
        router.replace(`/ofs-supplier/${payload.slug}`);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  getCompanyMainService({ commit }, payload) {
    const url = encodeURIComponent(payload.name);
    axios
      .get(`/company/getCompaniesByMainService/${payload.name}/${payload.id}`)
      .then((responce) => {
        const data = {
          data: responce.data,
          name: payload.name,
          id: payload.id,
        };
        commit("setCompanies", data);
        router.replace(`/ofs-directory/${payload.slug}`);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  getCompanyByBasin({ commit }, payload) {
    axios
      .get(`/company/getCompanyByBasin/${payload.basin}/${payload.id}`)
      .then((responce) => {
        const data = {
          data: responce.data,
          id: payload.id,
        };
       
        commit("setCompanies", data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  getCompanyInfo({ commit }, payload) {
    const url = encodeURIComponent(payload.name);
    axios
      .get(`/company/getCompanyBySlug/${payload.slug}`)
      .then((responce) => {
        commit("setCompany", responce.data);
        localStorage.setItem("companyData", JSON.stringify(responce.data));
        router.replace(`/company/${payload.slug}`);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  getPublicCompanyInfo({ commit }, payload) {
    const url = encodeURIComponent(payload.name);
    axios
      .get(`/company/getCompanyBySlug/${payload.slug}`)
      .then((responce) => {
        commit("setCompany", responce.data);
        localStorage.setItem("companyData", JSON.stringify(responce.data));
        router.replace(`/company-profiles/${payload.slug}`);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  getPremiumCompanies({ commit }, payload) {
    axios
      .get("admin/getPremiumCompanies")
      .then((responce) => {
        commit("setPremiumList", responce.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  searchCompany({ commit }, payload) {
    axios
      .get(`/ofs/searchSuppliers/${payload}`)
      .then((responce) => {
        commit("setCompanies", responce.data.hits);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
