import axios from 'axios';
import store from "../../store";

export default {
   validate : false,
   teamMembers: null,
   salesRepsList: null,
   companiesList: null,
   serviceCompaniesList: null,
   draftBidsList: null,
   bidsLists: [],
   bidData: JSON.parse(localStorage.getItem('bidData')),
   attachData: null,
   draftTime: null,
   newSupplier: [],
}