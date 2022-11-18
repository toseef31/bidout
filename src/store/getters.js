const getters = {
    g_sideBarOpen(state){
        return state.sideBarOpen
    },
    g_activityPanel(state){
        return state.activityPanel
    },
    pageLoader (state){
      return state.pageLoader
    }, 
    userToken (state){
      return state.userToken
    },
}

export default getters
