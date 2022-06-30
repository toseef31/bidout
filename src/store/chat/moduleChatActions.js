import axios from 'axios'

export default {
	unreadMessagesCount({commit}, payload){
		axios.post('/chat/countUnreadMessages',{payload})
		 .then(responce => {
		 	commit('setUnreadCount',responce.data.totalUnreadMessages)
		})
	}    
}