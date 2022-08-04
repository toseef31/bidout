import axios from 'axios'

export default {
	unreadMessagesCount({commit}, payload){
		axios.post('/chat/countUnreadMessages',{'userId':payload.userId})
		 .then(responce => {
		 	commit('setUnreadCount',responce.data.totalUnreadMessages)
		})
	},
	getAllConversations({commit}, payload){
		console.log(payload,'Payload');
		axios.get('/chat/getConversations/'+payload)
		 .then(responce => {
		 	console.log(responce);
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
		var config = {
		  header: {
		    "Content-Type": "multipart/form-data",
		  },
		};
		console.log(payload);
		axios.post('/chat/sendMessage/',{'conversationId': payload.conversationId, 'content': payload.content,'attachment':payload.attachment, 'sender': payload.sender, config})
		 .then(responce => {
		 	commit('setNewMessages',responce.data.message)
		})
	},   
	unreadMessagesCountCon({commit}, payload){
		axios.post('/chat/countUnreadMessagesInConversation',{'userId':payload.userId,'conversationId':payload.conversationId})
		 .then(responce => {
		 	commit('setUnMessageCount',responce.data.count)
		})
	}, 
	lastMessageRead({commit}, payload){
		axios.post('/chat/setLastMessageReadAt',{'userId':payload.userId,'conversationId':payload.conversationId})
		 .then(responce => {
		 	commit('setLastMessageRead',responce.data.count)
		})
	},
}