
const state = {
    authenticated: false,
    sideBarOpen: true,
    activityPanel: false,
    pageLoader: false,
    isCreateBid: false,
    userToken: JSON.parse(localStorage.getItem('token')),
}

export default state
