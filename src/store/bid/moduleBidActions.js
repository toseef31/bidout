import router from "@/router";
import axios from "axios";
import store from "..";

export default {
  async getTeamMembers({ commit }, payload) {
    const res = await axios.get(`company/getTeamMembers/${payload}`);
    if (res.status == 200) {
      commit("setTeamMembers", res.data);
    } else {
      commit("setTeamMembers", null);
    }
  },
  async getSalesReps({ commit }, payload) {
    const res = await axios.post("company/getSalesReps/", {
      query: payload.query,
      basin: payload.basin,
    });
    if (res.status == 200) {
      commit("setSalesReps", res.data);
    } else {
      commit("setSalesReps", null);
    }
  },
  async searchByCompany({ commit }, payload) {
    const res = await axios.post("company/searchCompanies/", {
      query: payload.query,
      basin: payload.basin,
    });
    if (res.status == 200) {
      commit("setCompaniesList", res.data);
    } else {
      commit("setCompaniesList", null);
    }
  },

  async getCompanyByServices({ commit }, payload) {
    const res = await axios.get(`company/getCompaniesByService/${payload}`);
    if (res.status == 200) {
      commit("setCompaniesList", res.data);
    } else {
      commit("setCompaniesList", null);
    }
  },
  async getDraftBids({ commit }, payload) {
    const res = await axios.get(`bid/draft/getUserDrafts/${payload}`);
    console.log(res);
    commit("setDraftBidsList", res.data);
  },
  async getBidsLists({ commit }, payload) {
    const res = await axios.get(`bid/getBidList/${payload}`);
    console.log(res);
    commit("setBidsList", res.data);
  },
  async getBidsLists({ commit }, payload) {
    const res = await axios.get(`bid/getBidList/${payload}`);
    if (res.status == 200) {
      commit("setBidsList", res.data);
    } else {
      commit("setBidsList", null);
    }
  },
  async getBidBySerial({ commit }, payload) {
    const res = await axios.get(
      `bid/getBidBySerial/${payload.serial}/${payload.id}`
    );

    if (res.status === 200) {
      localStorage.setItem("bidData", JSON.stringify(res.data));
      commit("setBidData", res.data);
    }
  },
  async saveDraftBid({ commit }, payload) {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    };
    const bidData = {
      title: payload.title,
      type: payload.type,
      dueDate: payload.dueDate,
      dueTime: payload.dueTime,
      regions: payload.regions,
      qAndAEnabled: payload.qAndAEnabled,
      bidDescriptions: payload.bidDescriptions,
      userId: payload.userId,
      companyId: payload.companyId,
      description: payload.description,
    };
    localStorage.setItem("bidData", JSON.stringify(bidData));
    commit("setBidData", bidData);
    const formData = new FormData();
    formData.append("title", payload.title);
    formData.append("type", payload.type);
    formData.append("dueDate", payload.dueDate);
    formData.append("dueTime", payload.dueTime);
    formData.append("regions", payload.regions);
    formData.append("qAndAEnabled", payload.qAndAEnabled);
    formData.append("bidDescriptions[0][body]", payload.bidDescriptions);
    console.log(payload.description);
    if (payload.description) {
      for (let d = 0; d < payload.description.length; d++) {
        formData.append(
          `bidDescriptions[${d}][name]`,
          payload.description[d].name
        );
        formData.append(
          `bidDescriptions[${d}][body]`,
          payload.description[d].body
        );
      }
    }
    formData.append("userId", payload.userId);
    formData.append("companyId", payload.companyId);

    formData.append("lineItems", []);
    formData.append("exampleItems", []);

    const res = await axios.post("bid/draft/createDraft", formData, config);
    if (res.status == 200) {
      commit("setDraftBidsList", res.data);
      commit("setDraftTime", new Date().toLocaleString());
    } else {
      commit("setDraftBidsList", null);
    }
  },
  async updateDraftBid({ commit, state }, payload) {
    console.log(payload, "update");
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    };
    const formData = new FormData();
    formData.append("title", state.bidData.title);
    formData.append("type", state.bidData.type);
    formData.append("dueDate", state.bidData.dueDate);
    formData.append("dueTime", state.bidData.dueTime);
    formData.append("regions", state.bidData.regions);
    formData.append("qAndAEnabled", state.bidData.qAndAEnabled);
    formData.append("bidDescriptions", state.bidData.bidDescriptions);
    formData.append("userId", state.bidData.userId);
    formData.append("companyId", state.bidData.companyId);
    if (payload.invitedSuppliers) {
      for (let i = 0; i < payload.invitedSuppliers.length; i++) {
        formData.append(
          `invitedSuppliers[${i}]`,
          payload.invitedSuppliers[i].objectID
        );
      }
    }
    if (payload.invitedTeamMembers) {
      for (let t = 0; t < payload.invitedTeamMembers.length; t++) {
        formData.append(
          `invitedTeamMembers[${t}]`,
          payload.invitedTeamMembers[t].id
        );
      }
    }
    if (payload.bidlines) {
      for (let i = 0; i < payload.bidlines.length; i++) {
        formData.append(
          `lineItems[${i}][description]`,
          payload.bidlines[i].description
        );
        formData.append(`lineItems[${i}][unit]`, payload.bidlines[i].unit);
        formData.append(`lineItems[${i}][inputType]`, payload.bidlines[i].type);
        formData.append(
          `lineItems[${i}][quantity]`,
          payload.bidlines[i].quantity
        );
        formData.append(
          `lineItems[${i}][buyerComment]`,
          payload.bidlines[i].buyerComment
        );
      }
    }
    if (payload.exampleItems) {
      for (let i = 0; i < payload.exampleItems.length; i++) {
        formData.append(
          `exampleItems[${i}][description]`,
          payload.exampleItems[i].description
        );
        formData.append(
          `exampleItems[${i}][unit]`,
          payload.exampleItems[i].unit
        );
        formData.append(
          `exampleItems[${i}][inputType]`,
          payload.exampleItems[i].type
        );
        formData.append(
          `exampleItems[${i}][quantity]`,
          payload.exampleItems[i].quantity
        );
        formData.append(
          `exampleItems[${i}][buyerComment]`,
          payload.exampleItems[i].buyerComment
        );
      }
    }
    if (payload.attachement) {
      for (let i = 0; i < payload.attachement.length; i++) {
        formData.append(
          `attachment[${i}][fileName]`,
          payload.attachement[i].fileName
        );
        formData.append(
          `attachment[${i}][fileSize]`,
          payload.attachement[i].fileSize
        );
        formData.append(
          `attachment[${i}][uploadedBy]`,
          payload.attachement[i].uploadedBy
        );
        formData.append(`attachment[${i}][url]`, payload.attachement[i].url);
        formData.append(
          `attachment[${i}][uploadedAt]`,
          payload.attachement[i].uploadedAt
        );
        formData.append(
          `attachment[${i}][comment]`,
          payload.attachement[i].comment
        );
        formData.append(`attachment[${i}][id]`, payload.attachement[i].id);
      }
    }

    const res = await axios.post(
      `bid/draft/updateDraft/${state.draftBidsList}`,
      formData,
      config
    );
    if (res.status == 200) {
      console.log(res);
      // commit('setDraftBidsList',null);
      commit("setDraftTime", new Date().toLocaleString());
    } else {
      // commit('setDraftBidsList',null);
    }
  },
  async inviteNewSupplier({ commit, state }, payload) {
    const res = await axios.post("bid/inviteSupplier/", {
      firstName: payload.firstName,
      lastName: payload.lastName,
      company: payload.company,
      phone: payload.phone,
      email: payload.email,
      bidTitle: payload.bidTitle,
      bidType: payload.bidType,
      bidDueDate: payload.bidDueDate,
      bidDueTime: payload.bidDueTime,
    });
    if (res.status == 200) {
      localStorage.removeItem("bidData");
      commit("setBidData", null);
    } else {
      commit("setBidData", null);
    }
  },
  async uploadBidAttach({ commit, state }, payload) {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    };
    const formData = new FormData();
    if (payload.attachement) {
      formData.append("uploadedBy", payload.uploadedBy);
      for (let i = 0; i < payload.attachement.length; i++) {
        formData.append(`attachement[${i}]`, payload.attachement[i]);
      }
    }
    const res = await axios.post("bid/uploadBidAttachment/", formData, config);
    if (res.status == 200) {
      commit("setAttachData", res.data);
    } else {
      commit("setAttachData", null);
    }
  },
};
