<template>
  <div>
    <v-form>
      <hr>
      <v-container class="pa-sm-10 pa-4">
        <v-row>
          <v-col cols="12" sm="12">
          <label class="d-block text-left main-label mb-4">Key Facts</label>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12"sm="6" text="left">
            <label class="d-block text-left input-label mb-2">Founded</label>
            <v-text-field placeholder="Enter year ..." single-line outlined type="text"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" text="left">
            <label class="d-block text-left input-label mb-2">Employess</label>
            <v-text-field placeholder="Enter Employees ..." single-line outlined type="text"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6" text="left" >
            <label class="d-block text-left input-label mb-2">HQ Location</label>
            <v-text-field placeholder="Enter year ..." single-line outlined type="text"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" text="left">
            <label class="d-block text-left input-label mb-2">Stock Price</label>
            <v-text-field placeholder="Enter Employees ..." single-line outlined type="text"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6" text="left">
            <label class="d-block text-left input-label mb-2">Website</label>
            <v-text-field placeholder="Enter year ..." single-line outlined type="text"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" text="left">
            <label class="d-block text-left input-label mb-2">Company's LinkedIn</label>
            <v-text-field placeholder="Enter Employees ..." single-line outlined type="text"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6" text="left">
            <label class="d-block text-left input-label mb-2">Careers Page</label>
            <v-text-field placeholder="Enter Employees ..." single-line outlined type="text"></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <hr>
      <v-container class="pa-sm-10 pa-4">
        <v-row>
          <v-col cols="12" sm="12">
          <label class="d-block text-left main-label mb-4">Account Contacts</label>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6" text="left">
            <label class="d-block text-left input-label mb-2">Name</label>
            <v-text-field placeholder="Full name ..." single-line outlined type="text"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" text="left">
            <label class="d-block text-left input-label mb-2">Role</label>
            <v-text-field placeholder="Role ..." single-line outlined type="text"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6" text="left">
            <label class="d-block text-left input-label mb-2">Email</label>
            <v-text-field placeholder="Enter Email ..." single-line outlined type="email"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" text="left">
            <label class="d-block text-left input-label mb-2">Phone Number</label>
            <v-text-field placeholder="Phone Number ..." single-line outlined type="text"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6" text="left">
            <label class="d-block text-left input-label mb-2">LinkedIn Profile</label>
            <v-text-field placeholder="LinkedIn Profile ..." single-line outlined type="text"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col  cols="12" sm="12">
            <v-btn color="#0D9648" large class="text-capitalize white--text" width="20%">Add</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <v-container class="pa-sm-10 pa-4">
      <div class="contact-list text-left mt-5 align-center" v-for="contact in contactList">
        <div class="profile-list">
          <h6>{{contact.name}}</h6>
        </div>
        <div class="profile-list">
          <h6>{{contact.name}}</h6>
        </div>
        <div class="profile-list">
          <h6>{{contact.email}}</h6>
        </div>
        <div class="profile-list">
          <h6>{{contact.phone}}</h6>
        </div>
        <div class="profile-list text-right">
          <v-btn default color="transparent" class="text-capitalize dele-btn"><v-icon>mdi-close</v-icon>Delete</v-btn>
        </div>
      </div>
    </v-container>
  </div>
</template>
<script>
  import { mapActions } from "vuex";
export default {
  data() {
    return {
      contactList: [
        { name: 'Keith Chometsky', role: 'Sr. Account Rep', email: 'keith@bidout.app', phone: '(281) 782-5332',},
        { name: 'Randy Jones', role: 'Permian Basin Sales', email: 'randy@bidout.app', phone: '(281) 782-5332', },
        { name: 'Keith Chometsky', role: 'Sr. Account Rep', email: 'keith@bidout.app', phone: '(281) 782-5332',},
        { name: 'Rodney Giles', role: 'Inside Sales Cordina', email: 'rodney@bidout.app', phone: '(281) 782-5332',},
      ],
    };
  },
  computed:{
    
  },
  methods: {
    
  },
  mounted() {
    
  } 
};
</script>