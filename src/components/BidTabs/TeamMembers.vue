<template>
	<div>
		<v-row class="my-4 supplier-row fill-height" no-gutters>
		  <v-col cols="12" sm="6" class="available-data">
		    <div class="d-flex justify-space-between align-center pl-4 pa-3 supplier-head">
		      <div>
		        <h4 class="mb-0 black--text font-weight-bold">Invite Team Members</h4>
		      </div>
		      
		    </div>
		    
		      <div>
		        <div class="available-search mt-5 px-4">
		          <div>
		          	<input type="hidden" name="" :value="validat">
		            <v-text-field
		              type="text" hide-details
		              outlined
		              placeholder="Search"
		              prepend-inner-icon="mdi-magnify" v-model="searchMember"
		            >
		            </v-text-field>
		          </div>
		        </div>
		        <div class="companies-list">
		          <div class="d-flex align-center justify-space-between list-company pa-4" v-for="(team,index) in teamMembers" v-if="user.id != team.id">
		            <div class="comapny-data d-flex align-center">
		              <div class="company-img">
		                <img v-if="!team.image" :src="require('@/assets/images/chat/chatUser.png')">
		                <img v-else :src="team.image" width="48px" height="48px">
		              </div>
		              <div class="company-title text-left pl-4">
		                <h4>{{team.firstName}} {{team.lastName}}</h4>
		                <p class="mb-0">{{team.company}}</p>
		              </div>
		            </div>
		            <div class="add-company">
		              <v-btn color="rgba(13, 150, 72, 0.1)" tile min-width="32px" height="32" class="pa-0" elevation="0" @click="addMember(team,index)"> <v-icon color="#0D9648">mdi-plus</v-icon></v-btn>
		            </div>
		          </div>
		        </div>
		      </div>
		  </v-col>
		  <v-col cols="12" sm="6" class="invited-data available-data">
		    <div class="d-flex justify-space-between align-center pl-4 py-3 invited-head">
		      <div>
		        <h4 class="mb-0 black--text font-weight-bold">Added</h4>
		      </div>
		    </div>
		    <div class="companies-list">
		    	{{filterTeam}}
		      <div class="d-flex align-center justify-space-between list-company pa-4" v-for="(team,index) in membersAdded">
		        <div class="comapny-data d-flex align-center">
		          <div class="company-img">
		            <img v-if="!team.image" :src="require('@/assets/images/chat/chatUser.png')">
		            <img v-else :src="team.image" width="48px" height="48px">
		          </div>
		          <div class="company-title text-left pl-4">
		            <h4>{{team.firstName}} {{team.lastName}}</h4>
		            <p class="mb-0">{{team.company}} </p>
		          </div>
		        </div>
		        <div class="add-company">
		          <v-btn color="rgba(243, 35, 73, 0.1)" tile min-width="32px" height="32" class="pa-0" elevation="0" @click="remove(team,index)"> <v-icon color="#F32349">mdi-minus</v-icon></v-btn>
		        </div>
		      </div>
		    </div>
		  </v-col>
		</v-row>
		<v-row justify="center" align="center" no-gutters>
		  <v-col cols="12" md="12">
		    <v-btn color="#0D9648" elevation="0" height="56px" width="220px" large class="white--text text-capitalize font-weight-bold mt-8 mb-8 save-btn" @click="changeTab">Save Changes</v-btn>
		  </v-col>
		</v-row>
	</div>
</template>
<script>
  import { mapActions } from "vuex";
export default {
  data() {
    return {
      inviteTeam: null,
      searchMember: '',
      membersAdded: [],
      valid: false,
      user: '',
      oldCount: 0,
      newCount: 0,
    };
  },
  computed:{
    teamMembers(){
    	if(this.$store.getters.bidData != null){
    		if(this.$store.getters.bidData.invitedTeamMembers != ''){ 
    			return this.$store.getters.teamMembers.filter((el) => { return !this.$store.getters.bidData.invitedTeamMembers.includes(el.id); })
    		}else{
    			return this.$store.getters.teamMembers;
    		}
    	}else{
	    	if(this.searchMember){
					return this.$store.getters.teamMembers.filter((item)=>{
	  			  return (this.searchMember.toLowerCase().split(' ').every(v => item.firstName.toLowerCase().includes(v)) || this.searchMember.toLowerCase().split(' ').every(v => item.lastName.toLowerCase().includes(v)))
	  			})
	    	}else{
	  			return this.$store.getters.teamMembers;
	    	}
    	}
    },
    filterTeam(){
			if(this.$store.getters.bidData.invitedTeamMembers != ''){
		  	this.membersAdded = this.$store.getters.teamMembers.filter((el) => { return this.$store.getters.bidData.invitedTeamMembers.includes(el.id); })
			}
    },
    validat(){
    	if(this.membersAdded.length > 0){
    		this.$emit('validation',{'valid': true,'team': '3'});
    		return this.valid;
    	}else{
    		this.$emit('validation',{'valid': false,'team': '3'});
    		return this.valid;
    	}
    },
  },
  methods: {
  	...mapActions(["getTeamMembers","getCompanyInfo","updateDraftBid","updateTemplate"]),
    changeTab(){
    	if(this.$route.name == 'EditTemplate'){
    	  this.updateTemplate({'invitedTeamMembers':this.membersAdded});
    	}else{
    		this.updateDraftBid({'invitedTeamMembers':this.membersAdded});
    	}
      this.$emit('changetab', 'tab-4');
    },
    viewCompany(id,name){
      this.getCompanyInfo({'id':id,'name':name});
    },
    addMember(member,index){
    	this.oldCount = this.membersAdded.length;
    	this.membersAdded.push(member);
    	this.newCount = this.membersAdded.length;
  		this.$store.getters.teamMembers.splice(index,1);
  		this.$store.commit('setInvitedTeamMembers',this.membersAdded);
    },
    remove(member,index){
    	this.oldCount = this.membersAdded.length;
	  	this.$store.getters.teamMembers.push(member);
	  	this.newCount = this.membersAdded.length;
			this.membersAdded.splice(index,1);
  		this.$store.commit('setInvitedTeamMembers',this.membersAdded);
    },
    savedraftOnInterval(){
      const timer = setInterval(() => {
      	if(this.oldCount != this.newCount){
        	if(this.$route.name == 'EditTemplate'){
  	    	  this.updateTemplate({'invitedTeamMembers':this.membersAdded});
  	    	}else{
  	    		this.updateDraftBid({'invitedTeamMembers':this.membersAdded});
  	    	}
        	this.oldCount = this.newCount;
      	}
      }, 60000);

      this.$once("hook:beforeDestroy", () => {
        clearInterval(timer);
      });
    },
  },
  created() {
    // this.interval = setInterval(() => this.updateDraftBid({'invitedTeamMembers':this.membersAdded}));
  },
  mounted() {
  	this.user = this.$store.getters.userInfo
    this.getTeamMembers(this.$store.getters.userInfo.company.company);
    this.savedraftOnInterval();
	}	
};
</script>