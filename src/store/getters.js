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
    pageSubLoader (state){
      return state.pageSubLoader
    }, 
}

export default getters
