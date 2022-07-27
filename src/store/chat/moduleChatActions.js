import axios from 'axios'

export default {
	unreadMessagesCount({commit}, payload){
		axios.post('/chat/countUnreadMessages',{payload})
		 .then(responce => {
		 	commit('setUnreadCount',responce.data.totalUnreadMessages)
		})
	},
	getAllConversations({commit}, payload){
		axios.get('/chat/getConversations/'+payload)
		 .then(responce => {
		 	commit('setConverstaionList',responce.data.conversations)
		})
	},
	getAllMessages({commit}, payload){
		axios.get('/chat/getMessages/'+payload)
		 .then(responce => {
		 	commit('setMessagesList',responce.data.messages)
		})
	},
	sendMessage({commit}, payload){
		axios.post('/chat/sendMessage/',{'conversationId': payload.conversationId, 'content': payload.content, 'sender': payload.sender})
		 .then(responce => {
		 	// console.log(responce.data.message);
		 	commit('setMessagesList',responce.data.message)
		})
	},   
}