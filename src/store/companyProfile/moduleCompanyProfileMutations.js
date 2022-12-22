export default {
    setCompany(state,payload){
      state.companyData = payload
    },
    setSubCategories(state,payload){
      state.subCategories = payload
    },
    setBasinLoading(state,payload){
      state.loadingBasin = payload
    },
    setBasicLoading(state,payload){
      state.loadingBasic = payload
    }
}