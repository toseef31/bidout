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
