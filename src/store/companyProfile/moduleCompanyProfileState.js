import axios from 'axios';
import store from "../../store";

export default {
   companyData: JSON.parse(localStorage.getItem('companyData')),
   subCategories: null,
}