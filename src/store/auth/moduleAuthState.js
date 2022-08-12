import axios from 'axios';
import store from "../../store";

export default {
    userInfo: JSON.parse(localStorage.getItem('userData')),
    error: null,
    successMessage: null,
    errorMessage: null,
    supplier: [],
    emailExists: null,
    companyError: null,
    userIp: null,
}