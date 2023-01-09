import axios from 'axios';
import store from "../../store";

export default {
    userInfo: JSON.parse(localStorage.getItem('userData')),
    userToken: JSON.parse(localStorage.getItem('token')),
    isAuthenticated: false,
    userId: '',
    companyId: '',
    error: null,
    passError: null,
    alerts: {
      showErrorAlert: false,
      showSuccessAlert: false
    },
    successMessage: null,
    errorMessage: null,
    supplier: [],
    emailExists: null,
    companyError: null,
    userIp: null,
    companyName: '',
    verifyData: {},
    contractData: '',
    plan: null,
    id: null,
    customerId: null,
    price: null,
    credentials: null,
    // companyAdmins: null,
    sameAsData: null,
}