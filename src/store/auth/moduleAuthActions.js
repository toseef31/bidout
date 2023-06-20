import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// eslint-disable-next-line import/no-cycle
import router from "@/router";
import axios from "axios";


let isNavigating = false;

function navigate(route) {
  if (isNavigating) {
    return;
  }
  isNavigating = true;
  router.push(route).finally(() => {
    isNavigating = false;
  });
}

export default {
  signInAction({ commit }, payload) {
    // Try to sigin
    commit("setLoginLoading", true);
    firebase
      .auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then((result) => {
        commit("setForgetEmail", null);
        commit("setError", null);
        commit("setToken", result.user.multiFactor.user.accessToken);
        localStorage.setItem(
          "token",
          JSON.stringify(result.user.multiFactor.user.accessToken)
        );
        axios
          .get(`/v2/user/getUserData/${result.user.multiFactor.user.email}`)
          .then(
            (responce) => {
              if (responce.data.status === false) {
                commit(
                  "setError",
                  "Disabled account! You cannot login with this account"
                );
                commit("showErrorAlert");
                commit("setLoginLoading", false);
              } else {
                axios
                  .get(`/v2/auth/addUserLoginHistory/${responce.data._id}`)
                  .then((response) => {});
                  if (responce.data.company) {
                    axios
                      .get(`v2/company/getCompanyById/${responce.data.company?._id}`)
                      .then((response) => {
                        commit("setCompany", response.data);
                      }); 
                  }
                commit("setUser", responce.data);
                commit("setLoginLoading", false);
                window.location.href = "/dashboard";
              }
            },
            (error) => {
              if (error.response.status === 404) {
                commit("setError", error.response.data.message);
              }
              if (error.response.status === 403) {
                commit("setError", error.response.data.message);
              }
              if (error.response.status === 401) {
                commit("setError", "Please try again after few moments.");
              }
              commit("setLoginLoading", false);
            }
          );
      })
      .catch((error) => {
        console.log("the errors", error)
        if (error.code === "auth/too-many-requests") {
          commit("setPassError", null);
          commit(
            "setError",
            "Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later."
          );
        } else {
          commit("setError", null);
          commit(
            "setPassError",
            "Oops! You have entered an incorrect email or password, Please try again, if you are still unsure of your password, please Reset Password"
          );
        }
        commit("setLoginLoading", false);
        // commit('showErrorAlert')
      });
  },
  getCurrentUser({ commit, dispatch }) {
    commit("setIsUserData", true);
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((users) => {
        if (users) {
          axios
            .get(`/v2/user/getUserData/${users.multiFactor.user.email}`)
            .then((responce) => {
              commit("setUser", responce.data);
              resolve(responce.data);
            });
        } else {
          dispatch("signOutAction");
          // eslint-disable-next-line prefer-promise-reject-errors
          reject("User is not logged In");
        }
      });
    });
  },
  signOutAction({ commit }) {
    // Try to sigout
    firebase
      .auth()
      .signOut()
      .then(() => {
        commit("setToken", null);
        commit("setError", null);
        commit("setCompany", null);
        commit("setUser", null);

        localStorage.removeItem("userData");

        localStorage.removeItem("token");
        localStorage.removeItem("companyData");

        navigate("/login");
      })
      .catch((error) => {
        commit("setError", error.message);
      });
  },

  apiSignOutAction({ commit }) {
    // Try to sigout
    firebase
      .auth()
      .signOut()
      .then(() => {
        commit("setUser", null);
        commit("setToken", null);
        commit("setError", null);
        commit("setCompany", null);

        localStorage.removeItem("userData");

        localStorage.removeItem("token");
        localStorage.removeItem("companyData");
        localStorage.removeItem("companyId");
        router.replace({
          name: "Login",
        });
      })
      .catch((error) => {
        commit("setError", error.message);

      });
  },

  forgotEmail({ commit }, payload) {
    // Try to sendForgot email
    axios.post("/v2/auth/sendPasswordResetEmail", { email: payload.email }).then(
      () => {
        // if(responce.status == 200){
        commit(
          "setEmailSuccess",
          "If this account exists, a password reset email has been sent to the email address for the account."
        );
        commit("setForgetEmail", null);
      },
      () => {
        commit(
          "setEmailSuccess",
          "If this account exists, a password reset email has been sent to the email address for the account."
        );
        commit("setForgetEmail", null);
      }
    );
  },
  verifyToken({ commit }, payload) {
    axios
      .get(`/v2/auth/verifyPasswordResetToken/${payload}`)
      .then((responce) => {
        commit("setVerifyData", responce.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  resetPassword({ commit }, payload) {
    axios
      .post("/v2/auth/updatePassword", {
        email: payload.email,
        oobCode: payload.oobCode,
        password: payload.password,
      })
      .then((responce) => {
        if (responce.status === 200) {
          commit("setEmailSuccess", "Password reset successfully!");
          commit("setVerifyData", {});
          commit("setResetEmail", payload.email);
          commit("showSuccessAlert");
          router.replace({ name: "Login" });
        } else {
          commit("setEmailError", "Something wrong please try again");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  async checkEmail({ commit }, payload) {
    if (payload.indexOf("@") !== -1) {
      try {
        const res = await axios.post("/v2/user/checkIfUserWithEmailExists", {
          email: payload,
        });

        if (res.data.exists) {
          commit("setEmailExistSuccess", true);
        } else {
          commit("setEmailExistSuccess", false);
        }
        if (res.data.invitedSupplier) {
          commit("setInvitedSupplierEmailExists", true);
        } else {
          commit("setInvitedSupplierEmailExists", false);
        }
      } catch (err) {
        console.log(err);
        commit("setEmailExistSuccess", false);
      }
    }
  },
  async supplierSignUpAction({ commit }, payload) {
    try {
      const { companyName } = payload;

      commit("setCompanyName", companyName);

      delete payload.companyName;

      const res = await axios.post("/v2/ofs/supplierSignup", {
        ...payload,
      });

      if (res.status === 200) {
        commit("setSupplierId", res.data.id);
        commit("setSameAsData", {
          firstName: payload.firstName,
          lastName: payload.lastName,
        });
        commit("setGoToModuleSelection", true);
      }
    } catch (err) {
      commit("setCompanyName", "");
      commit("showErrorAlert");
      commit("setCompanyError", err.response.data.message);
      console.log(err);
    }
  },

  async searchSupplier({ commit }, payload) {
    try {
      const res = await axios.get(`/v2/ofs/searchSuppliers/${payload}`);

      if (res.status === 200) {
        commit("setSupplierList", res.data);
      }
    } catch (err) {
      console.log(err);
    }
  },

  async queueSupplierUser({ commit }, payload) {
    try {
      const res = await axios.post("/v2/ofs/queueSupplierUser", {
        id: payload.id,
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        phoneNumber: payload.phoneNumber,
        title: payload.title,
        password: payload.password,
      });

      if (res.status === 200) {
        commit("setAdmins", res.data.admins);
        commit("setCompanyName", payload.companyName);
        commit("setSupplierExistingSignUpSuccess", true);
      }
    } catch (err) {
      commit("showErrorAlert");
      commit(
        "setCompanyError",
        "Error in executing your operation! Please try again."
      );
      console.log(err);
    }
  },
  // Buyer SignUp Acton
  async buyerSignUpAction({ commit }, payload) {
    try {
      const res = await axios.post("/v2/ofs/pendingBuyerRegistration", {
        firstName: payload.firstName,
        lastName: payload.lastName,
        companyName: payload.company,
        email: payload.email,
        phoneNumber: payload.phoneNumber,
      });

      if (
        res.status === 200 &&
        res.data.message === "Buyer added successfully"
      ) {
        commit("setBuyerSignUpSuccess", true);
      }

      if (res.status === 200 && res.data.message === "Buyer already exists") {
        commit("showErrorAlert");
        commit(
          "setCompanyError",
          "Buyer already exists! Please try again with different email."
        );
      }
    } catch (err) {
      commit("showErrorAlert");
      commit(
        "setCompanyError",
        "Error in executing your operation! Please try again."
      );

      console.log(err);
    }
  },
  // Get IP
  getIpAddress({ commit }) {
    const res = fetch("https://api.ipify.org?format=json", {
      method: "get",
    })
      .then((response) => response.json())
      .then((json) => {
        commit("setLocalIp", json.ip);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  async contractGenerate({ commit }, payload) {
    try {
      const res = await axios.post("/v2/ofs/generateSupplierContract", {
        ...payload,
      });

      if (res.status === 200) {
        commit("setContractData", res.data);
        commit("setPlan", payload.plan);
        commit("setGoToModuleSelection", null);
        commit("setGoToAgreement", true);
      }
    } catch (err) {
      commit("showErrorAlert");
      commit("setCompanyError", err.response.data.message);
    }
  },
  async signAgreement({ commit }, payload) {
    try {
      const res = await axios.post("/v2/ofs/signSupplierContract", { ...payload });
      if (res.status === 200) {
        commit("setGoToAgreement", null);
        commit("setSupplierSignUpSuccess", true);
      }
    } catch (err) {
      commit("showErrorAlert");
      commit("setCompanyError", err.response.data.message);
    }
  },

  signInWithCustomToken({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await firebase.auth().signInWithCustomToken(payload);
        commit("setError", null);
        commit("setToken", result.user.multiFactor.user.accessToken);
        localStorage.setItem(
          "token",
          JSON.stringify(result.user.multiFactor.user.accessToken)
        );
        const userResp = await axios.get(
          `/v2/user/getUserData/${result.user.multiFactor.user.email}`
        );
        if (userResp.data.status === false) {
          commit(
            "setError",
            "Disabled account! You cannot login with this account"
          );
          commit("showErrorAlert");
        } else {
          const companyResp = await axios.get(
            `v2/company/getCompanyById/${userResp.data.company?._id}`
          );
          commit("setCompany", companyResp.data);
          localStorage.setItem("companyData", JSON.stringify(companyResp.data));
          commit("setUser", userResp.data);
          localStorage.setItem("userData", JSON.stringify(userResp.data));
          router.replace({ name: "Dashboard" }).then(() => {
            window.location.reload();
          });
        }
        resolve(result);
      } catch (err) {
        Sentry.captureException(err);
        console.log(err);
        reject(err);
      }
    });
  },
  async getInvitedSupplierByToken({ commit }, payload) {
    try {
      const res = await axios.get(`v2/bid/getInvitedSupplierByToken/${payload}`);

      if (res.status === 200) {
        commit("setTokenInvitedSupplier", res.data);
        commit("setTokenInvitedSupplierError", false);
      }
    } catch (err) {
      if (
        err.response &&
        err.response.status === 404 &&
        err.response.data === "Supplier not found"
      ) {
        commit("setTokenInvitedSupplierError", true);
      }
      console.log(err);
    }
  },
};
