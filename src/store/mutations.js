const mutations = {
    setAuthentication(state, status) {
        state.authenticated = status;
    },
    toggleSideBar(state){
        return state.sideBarOpen = !state.sideBarOpen;
    },
    toggleActivityPanel(state){
        return state.activityPanel = !state.activityPanel;
        return state.sideBarOpen = false;
    },
    setPageLoader (state, payload){
        state.pageLoader = payload;
    },
    setPageSubLoader (state, payload){
        state.pageSubLoader = payload;
    },
}

export default mutations