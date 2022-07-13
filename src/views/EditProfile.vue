<template>
  <section class="section-container fill-height profile-module">
    <Navbar></Navbar>
     <v-row class="mx-0">
       <v-col :class="[ showSideBar ? 'col-12' : 'toggleLeft-sidebar']" class="left-sidebar pr-1">
          <LeftSidebar></LeftSidebar>
       </v-col>
       <v-col class="mid-content pa-0 pa-sm-3" :class="[ showSideBar ? 'col-md-9 col-12 col-sm-9' : 'mid-content-collapse', activityPanel ? 'd-sm-block' : 'd-md-block']" v-show="!activityPanel">
          <div class="content-section">
            <v-row class="mx-0">
              <v-col cols="12" sm="12" md="12" class="d-sm-block pt-0">
                <div class="manage-sections pa-4 pt-0">
                  <div class="top-section d-flex">
                    <v-btn 
                    color="#0d964814" 
                    large
                    min-width="200px"
                    class="text-capitalize admin-tag">Admin</v-btn>
                  </div>
                  <div class="editprofile-section mt-16">
                    <v-form>
                        <v-container>
                          <v-row>
                            <v-col
                              cols="12"
                              sm="6"
                            >
                              <v-text-field
                                v-model="title"
                                :rules="rules"
                                counter="25"
                                hint="This field uses counter prop"
                                label="Regular"
                              ></v-text-field>
                            </v-col>

                            <v-col
                              cols="12"
                              sm="6"
                            >
                              <v-text-field
                                v-model="description"
                                :rules="rules"
                                counter
                                maxlength="25"
                                hint="This field uses maxlength attribute"
                                label="Limit exceeded"
                              ></v-text-field>
                            </v-col>

                            <v-col
                              cols="12"
                              sm="6"
                            >
                              <v-text-field
                                v-model="title"
                                :rules="wordsRules"
                                counter="5"
                                hint="This field counts words instead of characters"
                                label="Custom counter from prop"
                                :counter-value="v => v.trim().split(' ').length"
                              ></v-text-field>
                            </v-col>

                            <v-col
                              cols="12"
                              sm="6"
                            >
                              <v-text-field
                                v-model="title"
                                :rules="wordsRules"
                                counter="5"
                                hint="This field counts words instead of characters"
                                label="Custom counter from slot"
                              >
                                <template v-slot:counter="{ props }">
                                  <v-counter v-bind="props" :value="title.trim().split(' ').length"></v-counter>
                                </template>
                              </v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-form>
                  </div>
                </div>
              </v-col>
            </v-row>
          </div>
       </v-col>
     </v-row>
   </section>
</template>
<script>
  import Navbar from './Layout/Navbar.vue'
  import LeftSidebar from './Layout/Dashboard/LeftSidebar.vue'
  import RightSidebar from './Layout/Dashboard/RightSidebar.vue'
  import axios from 'axios'
export default {
  name : "EditProfile",
  components: {
    Navbar,
    LeftSidebar,
    RightSidebar
  },
  
  data() {
    return {
      isHidden : false,
    };
  },
  computed:{
    showSideBar(){
        return this.$store.getters.g_sideBarOpen;
    },
    activityPanel(){
        return this.$store.getters.g_activityPanel;
    },
  },
  methods: {
    
  },
  mounted() {
    
  }
};
</script>
<style scoped lang="scss">

</style>
