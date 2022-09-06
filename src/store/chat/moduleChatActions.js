import axios from 'axios'

export default {
	unreadMessagesCount({commit}, payload){
		axios.post('/chat/countUnreadMessages',{'userId':payload.userId})
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
		var config = {
		  header: {
		    "Content-Type": "multipart/form-data",
		  },
		};
		console.log('send',payload);
		const formData = new FormData()
		formData.append('conversationId', payload.conversationId)
		formData.append('sender[id]', payload.sender.id)
		formData.append('sender[name]', payload.sender.name)
		formData.append('sender[company]', payload.sender.company)
		formData.append('sender[profilePicture]', payload.sender.profilePicture)
		formData.append('content', payload.content)
		formData.append('attachment', payload.attachment)
		axios.post('chat/sendMessage',formData, config)
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
	// Archive Chat
	archiveChat({commit}, payload){
		axios.post('/chat/archiveConversation',{'userId':payload.userId,'conversationId':payload.conversationId})
		 .then(responce => {
		 	commit('setArchiveStatus',responce.data.count)
		})
	},
	// Supplier List
	supplierList({commit}, payload){
		axios.get('/company/getSupplierCompaniesAndUsers')
		 .then(responce => {
		 	commit('setMembersList',responce.data)
		})
	},
	// Supplier Users List
	supplierUserList({commit}, payload){
		console.log(payload);
		axios.get('/user/searchSupplierUser/'+payload)
		 .then(responce => {
		 	commit('setSuppliersUsers',responce.data)
		})
	},
	// Supplier Users List
	createConversation({commit}, payload){
		console.log(payload);
		axios.post('/chat/createConversation/',payload)
		 .then(responce => {
		 	// console.log(responce);
		 	commit('setConverstaionList',responce.data.conversation)
		})
	},
}