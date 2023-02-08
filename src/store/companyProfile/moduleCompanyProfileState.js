import axios from 'axios';
import store from "../../store";

export default {
  companyData: null,
  subCategories: null,
  loadingBasin: true,
  progressCount: 9,
  moduleCOunt: 1,
  moduleWeight: [
    {
      'module': 'companyName',
      'weight': 10,
      'status': 'add',
    },
    {
      'module' : 'facts',
      'weight': 8,
      'status': 'add',
    }
  ],
  saveInfoLoading: false,
  keyfactsLoading: false,
  newsLoading: false,
}