import axios from 'axios';
import store from "../../store";

export default {
    userInfo: JSON.parse(localStorage.getItem('userData')),
    userToken: JSON.parse(localStorage.getItem('token')),
    userId: JSON.parse(localStorage.getItem('userId')),
    error: null,
    successMessage: null,
    errorMessage: null,
    supplier: [],
    emailExists: null,
    companyError: null,
    userIp: null,
    companyName: '',
}