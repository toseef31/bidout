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
    setProgressCount(state,payload){
      state.progressCount += payload
    },
    setModuleCOunt(state,payload){
      state.moduleCOunt += payload
    }
}