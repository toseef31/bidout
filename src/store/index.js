import Vue from 'vue';
import Vuex from 'vuex';
import toast from './moduleToast';
import dialog from './moduleDialog';
import auth from './auth/moduleAuth';
import dashboard from './dashboard/moduleDashboard';
import chat from './chat/moduleChat';
import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex);

export default new Vuex.Store({
  namespaced: true,
  getters,
  mutations,
  state,
  actions,
  strict: process.env.NODE_ENV !== 'production',

  modules: {
    toast,
    dialog,
    auth,
    dashboard,
    chat,
  },
});
