// /////////////////////////////////////////////
// Variables
// /////////////////////////////////////////////

let userDefaults = {
  uid         : 0,          // From Auth
  displayName: 'Loading', // From Auth
  about       : 'Dessert chocolate cake lemon drops jujubes. Biscuit cupcake ice cream bear claw brownie brownie marshmallow.',
  status      : 'online',
  cellPhone : '',
  userRole: 'agent'
};

// /////////////////////////////////////////////
// State
// /////////////////////////////////////////////

const state = {
    authenticated: false,
    sideBarOpen: true,
    activityPanel: false
}

export default state
