<template>
	<div>
		<div class="attachment-list">
		  <v-simple-table
		      fixed-header
		      height="300px"
		    >
		    <template v-slot:default>
		      <thead>
		        <tr>
		          <th class="text-left">
		            
		          </th>
		          <th class="text-left">
		            File Name
		          </th>
		          <th class="text-left">
		            Comment
		          </th>
		          <th class="text-left">
		            File Size
		          </th>
		          <th class="text-left">
		            Uploaded By
		          </th>
		          <th class="text-left">
		            Uploaded Date
		          </th>
		          <th class="text-left">
		            
		          </th>
		        </tr>
		      </thead>
		      <tbody>
		        <tr>
		          <td class="text-left"><img :src="require('@/assets/images/bids/FilePdf.png')"></td>
		          <td class="text-left">SafetyPlan.pdf</td>
		          <td class="text-left">
		          	
		          	<span v-show="!edit">Safety Plan</span>
		          	<div v-show="edit" class="d-flex"><v-text-field outlined height="30px" style="min-height:30px" hide-details></v-text-field><v-checkbox></v-checkbox></div>
		          </td>
		          <td class="text-left">16kb</td>
		          <td class="text-left">Tyler Cherry</td>
		          <td class="text-left">08/08/2022 1:29 pm</td>
		          <td>
		            <div class="d-flex">
		              <img :src="require('@/assets/images/bids/chatdots.png')" class="mr-3" @click="edit = !edit">
		              <v-icon color="#F32349">mdi-trash-can-outline</v-icon>
		            </div>
		          </td>
		        </tr>
		        <tr>
		          <td class="text-left"><img :src="require('@/assets/images/bids/FilePdf.png')"></td>
		          <td class="text-left">SafetyPlan.pdf</td>
		          <td class="text-left">Safety Plan</td>
		          <td class="text-left">16kb</td>
		          <td class="text-left">Tyler Cherry</td>
		          <td class="text-left">08/08/2022 1:29 pm</td>
		          <td>
		            <div class="d-flex">
		              <img :src="require('@/assets/images/bids/chatdots.png')" class="mr-3"><v-icon color="#F32349">mdi-trash-can-outline</v-icon>
		            </div>
		          </td>
		        </tr>
		      </tbody>
		    </template>
		  </v-simple-table>
		</div>
		<v-row no-gutters align="center" class="px-6 mt-16">
		  <v-col cols="12" sm="12" md="12">
		    <div class="upload-attach">
		      <label for="uploadFile" class="upload-file pa-8 d-block font-weight-medium">
		        <v-file-input
		            label="File input"
		            filled
		            color="#fff" id="uploadFile"
		          ></v-file-input> Upload or Drop Attachments Here
		      </label>
		    </div>
		  </v-col>
		  <!-- <v-col cols="12" sm="4" md="3" class="pl-0 pl-sm-6 mt-3 mt-sm-0">
		    <v-btn large elevation="0" color="#0D9648" height="56px" width="100%" class="white--text font-weight-bold text-capitalize py-4 px-9 attach-btn" @click="changeTab">Save Changes</v-btn>
		  </v-col> -->
		</v-row>
	</div>
</template>
<script>
  import { mapActions } from "vuex";
export default {
  data() {
    return {
    	edit: false,
    };
  },
  computed:{
    
  },
  methods: {
    changeTab(){
      this.$emit('changetab', 'tab-6');
    },
  },
  mounted() {
    
	}	
};
</script>