export default {
   companyData (state){
      return state.companyData
   },
   subCategories (state){
      return state.subCategories
   },
   loadingBasin (state){
      return state.loadingBasin
   },
   progressCount (state){
      return state.progressCount
   },
   moduleCOunt (state){
      return state.moduleCOunt
   },
   moduleWeight (state){
      return state.moduleWeight
   },
   saveInfoLoading (state){
      return state.saveInfoLoading;
   },
   keyfactsLoading (state){
      return state.keyfactsLoading;
   },
   newsLoading (state){
      return state.newsLoading;
   },
   manageCompanyError (state){
      return state.manageCompanyError;
   },
   companyExecutiveLoading(state) {
    return state.companyExecutiveLoading
   },
   ndaDocument(state) {
    return state.ndaDocument
   },
   ndaDocumentAlert(state) {
    return state.ndaDocumentAlert
   },
   ndaDocumentUpdateAlert(state) {
    return state.ndaDocumentUpdateAlert
   }
}
