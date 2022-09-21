import Vue from 'vue';
import LogRocket from 'logrocket';
import createPlugin from 'logrocket-vuex';
import Vuex from 'vuex';
import toast from './moduleToast';
import dialog from './moduleDialog';
import auth from './auth/moduleAuth';
import dashboard from './dashboard/moduleDashboard';
import chat from './chat/moduleChat';
import ofs from './ofs/moduleOfs';
import profile from './profile/moduleProfile';
import bid from './bid/moduleBid';
import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex);
const logrocketPlugin = createPlugin(LogRocket);
export default new Vuex.Store({
  namespaced: true,
  getters,
  mutations,
  state,
  actions,
  strict: process.env.NODE_ENV !== 'production',
  plugins: [logrocketPlugin],
  modules: {
    toast,
    dialog,
    auth,
    dashboard,
    chat,
    ofs,
    profile,
    bid
  },
});
