/*=========================================================================================
  File Name: actions.js
  Description: Vuex Store - actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

const actions = {
  // Toggle Side Menu
  toggleSideMenu({ commit }){
    commit('toggleSideBar')
  },
  // Toggle Activity Panel
  activityPanel({ commit }){
    commit('toggleActivityPanel')
  },

}

export default actions
