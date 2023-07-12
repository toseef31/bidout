/* eslint-disable no-lonely-if */
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import router from '@/router';
import axios from 'axios';

export default {
  updateProfileImg({ commit, dispatch, state }, payload) {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      },
    };
    const formData = new FormData();
    formData.append('files', payload.files);
    axios.post('/v2/user/updateProfilePicture/'+payload.userid,formData, config)
      .then((responce) => {
        if (responce.status === 200) {
          axios.get(`/v2/user/getUserData/${payload.email}`)
            .then((responce) => {
              commit('setUser', responce.data);
              localStorage.setItem('userData', JSON.stringify(responce.data));
            }).catch(async (err) => {
              if (state.apiCounter === 2) {
                dispatch('apiSignOutAction');
              } else {
                // eslint-disable-next-line no-lonely-if
                if (err.response && err.response.status === 403) {
                  await dispatch('refreshToken');
                  state.apiCounter = 2;
                  dispatch('updateProfileImg',payload);
                }
              }
              console.log(err);
            });
        }
      }).catch(async (err) => {
        commit('setMessage', 'Something went wrong, Please try again in few moments.');
        commit('showErrorAlert');
        if (state.apiCounter === 2) {
          dispatch('apiSignOutAction');
        } else {
          // eslint-disable-next-line no-lonely-if
          if (err.response && err.response.status === 403) {
            await dispatch('refreshToken');
            state.apiCounter = 2;
            dispatch('updateProfileImg',payload);

          }
        }
        console.log(err);
      });
  },
  updateProfile({ commit, dispatch, state }, payload) {
    commit('editProfileLoading', true);
    axios.post('/v2/user/updateUser/'+payload.userid,{'email': payload.email,'firstName': payload.firstName,'lastName': payload.lastName,'phoneNumber': payload.phoneNumber,'title':payload.title,'timezone':payload.timezone})
      .then((responce) => {
        if (responce.status === 200) {
          axios.get(`/v2/user/getUserData/${payload.email}`)
            .then((responce) => {
              commit('setUser', responce.data);
              commit('editProfileLoading', false);
            }).catch(async(err) => {
              commit('editProfileLoading', false);
              if (state.apiCounter === 2) {
                dispatch('apiSignOutAction');
              } else {
                // eslint-disable-next-line no-lonely-if
                if (err.response && err.response.status === 403) {
                  await dispatch('refreshToken');
                  state.apiCounter = 2;
                  dispatch('updateProfile',payload);
                }
              }
              console.log(err);
            });
        }
      }).catch(async (err) => {
        commit('setMessage', 'Something went wrong, Please try again in few moments.');
        commit('showErrorAlert');
        commit('editProfileLoading', false);
        if (state.apiCounter === 2) {
          dispatch('apiSignOutAction');
        } else {
          // eslint-disable-next-line no-lonely-if
          if (err.response && err.response.status === 403) {
            await dispatch('refreshToken');
            state.apiCounter = 2;
            dispatch('updateProfile',payload);
          }
        }
        console.log(err);
      });
  },
  changePassword({ commit, dispatch, state }, payload) {
    commit('setPasswordLoading', true);
    axios.post('/v2/user/changePassword/'+payload.userid, {'currentPassword': payload.currentPassword,'newPassword': payload.newPassword})
      .then((responce) => {
        if (responce.status === 200) {
          const data = {
            message: responce.data.message,
            status: responce.status,
          };
          commit('setResetPasswordMsg', data);
          commit('setPasswordLoading', false);
        }
      }).catch(async (err) => {
        commit('setPasswordLoading', false);
        if (state.apiCounter === 2) {
          dispatch('apiSignOutAction');
        } else {
          // eslint-disable-next-line no-lonely-if
          if (err.response && err.response.status === 403) {
            await dispatch('refreshToken');
            state.apiCounter = 2;
            dispatch('changePassword', payload);
          }
        }
        console.log(err);
        const data = {
          message: err.response.data.message,
          status: err.response.status,
        };
        commit('setResetPasswordMsg', data);
      });
  },
  loginHistory({ commit,dispatch}, payload) {
    axios.get(`/v2/user/getUserLoginHistory/${payload.userid}`)
      .then((responce) => {
        commit('setLoginHistory', responce.data);
      }).catch((err) => {
        console.log(err);
      });
  },
  adminsCompany({ commit, dispatch, state }, payload) {
    axios.get(`/v2/company/getCompanyAdmins/${payload.company}`)
      .then((responce) => {
        if (responce.status === 200) {
          commit('setCompanyAdmin', responce.data);
        }
      }).catch(async(err) => {
        if (state.apiCounter === 2) {
          dispatch('apiSignOutAction');
        } else {
          // eslint-disable-next-line no-lonely-if
          if (err.response && err.response.status === 403) {
            await dispatch('refreshToken');
            state.apiCounter = 2;
            dispatch('adminsCompany',payload);
          }
        }
        console.log(err);
      });
  },
  updateNotifications({ commit, dispatch, state }, payload) {
    axios.post('/v2/user/updateNotificationPreference/'+payload.userid,{'notificationPreference':payload.notificationPreference})
      .then(responce => {
        if (responce.status === 200) {
          axios.get(`/v2/user/getUserData/${payload.email}`)
            .then(responce => {
              commit('setUser', responce.data);
              localStorage.setItem('userData', JSON.stringify(responce.data));
            }).catch(async (err) => {
              if (err.response && err.response.status === 403) {
                await dispatch('refreshToken');
                state.apiCounter = 2;
                dispatch('updateNotifications',payload);
              }
              console.log(err);
            });
        }
      }).catch(async (err) => {
        if (state.apiCounter === 2) {
          dispatch('apiSignOutAction');
        } else {
          // eslint-disable-next-line no-lonely-if
          if (err.response && err.response.status === 403) {
            await dispatch('refreshToken');
            state.apiCounter = 2;
            dispatch('updateNotifications',payload);
          }
        }
        console.log(err);
      });
  },
  inviteUser({ commit, dispatch, state }, payload) {
    commit('editProfileLoading', true);
    commit('setInviteMessage', null);
    axios.post('/v2/company/addInvitedUser/', {'firstName':payload.firstName,'lastName': payload.lastName,'company': payload.company,'companyId':payload.companyId,'email':payload.email,'parent': payload.parent,'role': payload.role})
      .then((responce) => {
        if (responce.status === 200) {
          commit('editProfileLoading', false);
          commit('setMessage', 'User invited successfully');
          router.replace({ name: 'ManageUsers' });
        } else {
          commit('editProfileLoading', false);
        }
      }).catch(async (err) => {
        commit('setInviteMessage', err.response.data.message);
        commit('editProfileLoading', false);
        if (state.apiCounter === 2) {
          dispatch('apiSignOutAction');
        } else {
          // eslint-disable-next-line no-lonely-if
          if (err.response && err.response.status === 403) {
            await dispatch('refreshToken');
            state.apiCounter = 2;
            dispatch('inviteUser', payload);
          }
        }
        console.log(err);
      });
  },
  editData({ commit }, payload) {
    commit('setEditData', payload);
    router.replace({ name: 'EditUser' });
  },
  updateUser({ commit, dispatch, state }, payload) {
    axios.post('/v2/company/updateUser/'+payload.id,{'firstName':payload.firstName,'lastName': payload.lastName,'role': payload.role})
      .then((responce) => {
        if (responce.status === 200) {
          commit('setMessage', 'User updated successfully');
          commit('showErrorAlert');
          router.replace({ name: 'ManageUsers' });
        }
      }).catch(async (err) => {
        if (state.apiCounter === 2) {
          dispatch('apiSignOutAction')
        } else {
          if (err.response && err.response.status === 403) {
            await dispatch('refreshToken');
            state.apiCounter = 2;
            dispatch('updateUser', payload);
          }
        }
        console.log(err);
      });
  },
  updateInvite({ commit, dispatch, state }, payload) {
    axios.post('/v2/company/updateInvitedUser/'+payload.id,{'firstName':payload.firstName,'lastName': payload.lastName,'role': payload.role})
      .then((responce) => {
        if (responce.status === 200) {
          commit('setMessage', 'User updated successfully');
          commit('showErrorAlert');
          router.replace({ name: 'ManageUsers' });
        }
      }).catch(async (err) => {
        if (state.apiCounter === 2) {
          dispatch('apiSignOutAction');
        } else {
          if (err.response && err.response.status === 403) {
            await dispatch('refreshToken');
            state.apiCounter = 2;
            dispatch('updateInvite',payload);
          }
        }
        console.log(err);
      });
  },
  getDisabledUsers({ commit, dispatch, state }, payload) {
    axios.get('/v2/company/getDisabledUsersByCompany/'+ payload)
      .then((responce) => {
        if (responce.status === 200) {
          commit('setDisableUsersList', responce.data);
          commit('showErrorAlert');
        }
      }).catch(async (err) => {
        if (state.apiCounter === 2) {
          dispatch('apiSignOutAction');
        } else {
          if (err.response && err.response.status === 403) {
            await dispatch('refreshToken');
            state.apiCounter = 2;
            dispatch('getDisabledUsers',payload);
          }
        }
        console.log(err);
      });
  },
  getPendingUsers({ commit, dispatch, state }, payload) {
    axios.get('/v2/user/getPendingUsers/'+ payload)
      .then((responce) => {
        if (responce.status === 200) {
          commit('setPendingUsersList', responce.data);
          commit('showErrorAlert');
        }
      }).catch(async (err) => {
        if (state.apiCounter === 2) {
          dispatch('apiSignOutAction');
        } else {
          if (err.response && err.response.status === 403) {
            await dispatch('refreshToken');
            state.apiCounter = 2;
            dispatch('getPendingUsers',payload);
          }
        }
        console.log(err);
      });
  },
  verifyInviteToken({ commit }, payload) {
    axios.get('/v2/auth/checkIfInvitationIsValid/'+payload)
      .then((responce) => {
        commit('setInviteData', responce.data);
      }).catch((err) => {
        console.log(err);
      });
  },
  resetInvitePassword({ commit }, payload) {
    axios.post('/v2/auth/signUpInvitedUser/',{'invitationId': payload.invitationId, 'password': payload.password})
      .then((responce) => {
        if (responce.status === 200) {
          commit('setEmailSuccess', 'Login here to continue with your account!');
          commit('setInviteData', {});
          commit('showSuccessAlert');
          router.replace({ name: 'Login' });
        }
        else {
          commit('setEmailError', 'Something wrong please try again');
        }
      }).catch((err) => {

        console.log(err);
      });
  },
};
