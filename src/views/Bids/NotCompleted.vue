<template>
  <section class="section-container fill-height createBid-module">
    <Navbar></Navbar>
     <v-row class="mx-0">
       <v-col :class="[ showSideBar ? 'col-12' : 'toggleLeft-sidebar']" class="left-sidebar pr-1">
          <LeftSidebar></LeftSidebar>
       </v-col>
       <v-col class="mid-content pa-0 pa-sm-3" :class="[ showSideBar ? 'col-md-9 col-12 col-sm-7' : 'mid-content-collapse', activityPanel ? 'd-sm-block' : 'd-md-block']" v-show="!activityPanel">
          <div class="content-section fill-height pa-0">
            <v-row align="center" justify="space-between" no-gutters class="px-6 my-4 not-completd-title">
              <v-col cols="6" class="text-left">
                <div class="d-flex align-center">
                  <h3 class="pl-1 mr-4">Annual Chemical Bid</h3>
                  <p class="preview-text mb-0 ml-3">
                    <a href="" class="text-decoration-none"><v-icon color="#0D9648" class="pr-2">mdi-open-in-new</v-icon>Preview Bid in Supplier View</a>
                  </p>
                </div>
              </v-col>
              <v-col cols="6" class="text-right">
                <div class="d-flex align-center justify-end">
                  <p class="mb-0 mr-4 auto-text"><strong>Autosaved Draft:</strong> 07/22/2022 12:51 pm</p>
                  <v-btn color="#B8B8B8" class="white--text text-capitalize publish-btn" width="250px" height="52px" large>
                    Publish Bid
                  </v-btn>
                </div>
              </v-col>
            </v-row>
            <div class="bidtabs-section">
              <v-tabs
                v-model="currentItem" class="bids-tabs"
                fixed-tabs
                hide-slider
              >
                <v-tab
                  v-for="(item, index) in tabs"
                  :key="item.value"
                  :href="'#tab-' + item.value" class="text-capitalize black--text font-weight-bold"
                >
                  {{ item.text }} {{item.index}}
                  <v-icon right small color="#F32349">
                    {{item.icon}}
                  </v-icon>
                </v-tab>
              </v-tabs>
              <v-tabs-items v-model="currentItem">
                <v-tab-item
                  value="tab-1"
                >
                  <v-row class="my-8" justify="center">
                    <v-col cols="12" sm="9">
                      <v-form @submit.prevent="bidForm" ref="form">
                        <v-container>
                          <v-row justify="center">
                            <v-col cols="12" sm="12" text="left">
                              <label class="d-block text-left input-label mb-2 font-weight-bold">Bid Title</label>
                              <v-text-field placeholder="Bid Title" single-line outlined type="text" hide-details>
                              </v-text-field>
                            </v-col>
                          </v-row>
                          <v-row justify="center">
                            <v-col cols="12" sm="6" text="left">
                              <label class="d-block text-left input-label mb-2 font-weight-bold">Bid Type <v-icon small>mdi-information-outline</v-icon></label>
                              <v-select outlined hide-details :items="bidType">
                                
                              </v-select>
                            </v-col>
                            <v-col cols="12" sm="6" text="left">
                              <label class="d-block text-left input-label mb-2 font-weight-bold">Due/Date Time</label>
                              <v-text-field placeholder="Bid Title" single-line outlined type="date" hide-details>
                              </v-text-field>
                            </v-col>
                          </v-row>
                          <v-row justify="center">
                            <v-col cols="12" sm="6" text="left">
                              <label class="d-block text-left input-label mb-2 font-weight-bold">Region </label>
                              <v-select outlined hide-details>
                                
                              </v-select>
                            </v-col>
                            <v-col cols="12" sm="6" text="left">
                              <label class="d-block text-left input-label mb-2 font-weight-bold">Q&A <v-icon small>mdi-information-outline</v-icon></label>
                              <v-radio-group
                                row
                                v-model="qa"
                              >
                                <v-radio
                                  label="Yes"
                                  value="yes" checked
                                ></v-radio>
                                <v-radio
                                  label="No"
                                  value="no"
                                ></v-radio>
                              </v-radio-group>
                            </v-col>
                          </v-row>
                          <v-row justify="center">
                            <v-col cols="12" sm="12" text="left">
                              <label class="d-block text-left input-label mb-2 font-weight-bold">Bid Description</label>
                              <v-textarea placeholder="Describe here..." single-line outlined type="text" hide-details>
                              </v-textarea>
                            </v-col>
                          </v-row>
                          <v-row justify="center">
                            <v-col cols="12" sm="12" text="left" v-show="showAdditional">
                              <label class="d-block text-left input-label mb-2 font-weight-bold">Additional Information <v-icon color="#F32349">mdi-trash-can-outline</v-icon></label> 
                              <v-text-field placeholder="Title" single-line outlined type="text">
                              </v-text-field>
                              <v-textarea placeholder="Desribe here" single-line outlined type="text" hide-details>
                              </v-textarea>
                            </v-col>
                            <v-col cols="12" sm="12" class="text-left">
                              <v-btn color="rgba(13, 150, 72, 0.1)" rounded class="text-capitalize adtn-btn font-weight-bold" @click="showAdditional = !showAdditional"><v-icon>mdi-plus</v-icon>Add Aditional Description</v-btn>
                            </v-col>
                          </v-row>
                          <v-row justify="center">
                            <v-col cols="12">
                              <v-btn color="#0D9648" height="56" class="text-capitalize white--text font-weight-bold save-btn px-9" large>Save Changes</v-btn>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-form>
                    </v-col>
                  </v-row>
                </v-tab-item>
                <v-tab-item
                  value="tab-2"
                >
                  <v-row class="my-4 supplier-row fill-height" no-gutters>
                    <v-col cols="12" sm="6" class="available-data">
                      <div class="d-flex justify-space-between align-center pl-4 supplier-head">
                        <div>
                          <h4 class="mb-0 black--text font-weight-bold">Available Suppliers</h4>
                        </div>
                        <div>
                          <v-tabs class="supplier-tabs" hide-slider v-model="availableSuppl">
                            <v-tab class="text-capitalize font-weight-bold" href="#companyName" >Company Name</v-tab>
                            <v-tab class="text-capitalize font-weight-bold" href="#salesRep">Sales Rep</v-tab>
                            <v-tab class="text-capitalize font-weight-bold" href="#serviceCategory">Service Category</v-tab>
                          </v-tabs>
                        </div>
                      </div>
                      
                      <v-tabs-items v-model="availableSuppl">
                        <v-tab-item value="companyName">
                          <div class="available-search d-flex justify-space-between align-center mt-5 px-4">
                            <div>
                              <v-text-field
                                type="text" hide-details
                                outlined
                                placeholder="Search"
                                prepend-inner-icon="mdi-magnify"
                              >
                              </v-text-field>
                            </div>
                            <div class="d-flex align-center">
                              <label class="input-label black--text pr-2 font-weight-bold">Basin</label>
                              <v-select rounded hide-details outlined class="available-select" :items="availableSearch" width="122px"></v-select>
                            </div>
                          </div>
                          <div class="companies-list">
                            <div class="d-flex align-center justify-space-between list-company pa-4">
                              <div class="comapny-data d-flex align-center">
                                <div class="company-img">
                                  <img :src="require('@/assets/images/bids/patterson.png')">
                                </div>
                                <div class="company-title text-left pl-4">
                                  <h4>Patterson-UTI, Inc</h4>
                                  <p class="mb-0"><router-link to="">View Profile</router-link></p>
                                </div>
                              </div>
                              <div class="add-company">
                                <v-btn color="rgba(13, 150, 72, 0.1)" tile min-width="32px" height="32" class="pa-0" elevation="0"> <v-icon color="#0D9648">mdi-plus</v-icon></v-btn>
                              </div>
                            </div>
                            <div class="d-flex align-center justify-space-between list-company pa-4 bg-light">
                              <div class="comapny-data d-flex align-center">
                                <div class="company-img">
                                  <img :src="require('@/assets/images/bids/ms.png')">
                                </div>
                                <div class="company-title text-left pl-4">
                                  <h4>MS Directional, Inc</h4>
                                  <p class="mb-0"><router-link to="">View Profile</router-link></p>
                                </div>
                              </div>
                              <div class="add-company">
                                <v-btn color="rgba(13, 150, 72, 0.1)" tile min-width="32px" height="32" class="pa-0" elevation="0"> <v-icon color="#0D9648">mdi-plus</v-icon></v-btn>
                              </div>
                            </div>
                            <div class="d-flex align-center justify-space-between list-company pa-4">
                              <div class="comapny-data d-flex align-center">
                                <div class="company-img">
                                  <img :src="require('@/assets/images/bids/superior.png')">
                                </div>
                                <div class="company-title text-left pl-4">
                                  <h4>Superior QC</h4>
                                  <p class="mb-0"><router-link to="">View Profile</router-link></p>
                                </div>
                              </div>
                              <div class="add-company">
                                <v-btn color="rgba(13, 150, 72, 0.1)" tile min-width="32px" height="32" class="pa-0" elevation="0"> <v-icon color="#0D9648">mdi-plus</v-icon></v-btn>
                              </div>
                            </div>
                          </div>
                        </v-tab-item>
                        <v-tab-item value="salesRep">
                          <div class="available-search d-flex justify-space-between align-center mt-5 px-4">
                            <div>
                              <v-text-field
                                type="text" hide-details
                                outlined
                                placeholder="Search"
                                prepend-inner-icon="mdi-magnify"
                              >
                              </v-text-field>
                            </div>
                            <div class="d-flex align-center">
                              <label class="input-label black--text pr-2 font-weight-bold">Basin</label>
                              <v-select rounded hide-details outlined class="available-select" :items="availableSearch" width="122px"></v-select>
                            </div>
                          </div>
                          <div class="companies-list">
                            <div class="d-flex align-center justify-space-between list-company pa-4">
                              <div class="comapny-data d-flex align-center">
                                <div class="company-img">
                                  <img :src="require('@/assets/images/chat/chatUser.png')">
                                </div>
                                <div class="company-title text-left pl-4">
                                  <h4>Patrick Smith</h4>
                                  <p class="mb-0">Baker Hughes <router-link to="">View Profile</router-link></p>
                                </div>
                              </div>
                              <div class="add-company">
                                <v-btn color="rgba(13, 150, 72, 0.1)" tile min-width="32px" height="32" class="pa-0" elevation="0"> <v-icon color="#0D9648">mdi-plus</v-icon></v-btn>
                              </div>
                            </div>
                            <div class="d-flex align-center justify-space-between list-company pa-4 bg-light">
                              <div class="comapny-data d-flex align-center">
                                <div class="company-img">
                                  <img :src="require('@/assets/images/chat/chatUser.png')">
                                </div>
                                <div class="company-title text-left pl-4">
                                  <h4>Pat Hodges</h4>
                                  <p class="mb-0">Halli Burton <router-link to="">View Profile</router-link></p>
                                </div>
                              </div>
                              <div class="add-company">
                                <v-btn color="rgba(13, 150, 72, 0.1)" tile min-width="32px" height="32" class="pa-0" elevation="0"> <v-icon color="#0D9648">mdi-plus</v-icon></v-btn>
                              </div>
                            </div>
                          </div>
                        </v-tab-item>
                        <v-tab-item value="serviceCategory">
                          <div class="available-search d-flex justify-space-between align-center mt-5 px-4">
                            <div>
                              <v-text-field
                                type="text" hide-details
                                outlined
                                placeholder="Search"
                                prepend-inner-icon="mdi-magnify"
                              >
                              </v-text-field>
                            </div>
                            <div class="d-flex align-center">
                              <label class="input-label black--text pr-2 font-weight-bold">Basin</label>
                              <v-select rounded hide-details outlined class="available-select" :items="availableSearch" width="122px"></v-select>
                            </div>
                          </div>
                          <div class="companies-list">
                            <div>
                              <div class="d-flex align-center justify-space-between list-company pa-4">
                                <div class="comapny-data d-flex align-center">
                                  <div class="pr-4">
                                    <v-icon>mdi-chevron-down</v-icon>
                                  </div>
                                  <div class="company-img">
                                    <img :src="require('@/assets/images/bids/patterson.png')">
                                  </div>
                                  <div class="company-title text-left pl-4">
                                    <h4>Patterson-UTI, Inc</h4>
                                    <p class="mb-0"><router-link to="">View Profile</router-link></p>
                                  </div>
                                </div>
                                <div class="add-company">
                                  <v-btn color="rgba(13, 150, 72, 0.1)" tile min-width="32px" height="32" class="pa-0" elevation="0"> <v-icon color="#0D9648">mdi-plus</v-icon></v-btn>
                                </div>
                              </div>
                              <div class="d-flex align-center justify-space-between list-company pa-4 pl-16">
                                <div class="comapny-data d-flex align-center">
                                  <div class="company-img">
                                    <img :src="require('@/assets/images/chat/chatUser.png')">
                                  </div>
                                  <div class="company-title text-left pl-4">
                                    <h4>Pat Hodges</h4>
                                    <p class="mb-0">Patterson-UTI<router-link to="">View Profile</router-link></p>
                                  </div>
                                </div>
                                <div class="add-company">
                                  <v-btn color="rgba(13, 150, 72, 0.1)" tile min-width="32px" height="32" class="pa-0" elevation="0"> <v-icon color="#0D9648">mdi-plus</v-icon></v-btn>
                                </div>
                              </div>
                            </div>
                            <div>
                              <div class="d-flex align-center justify-space-between list-company pa-4">
                                <div class="comapny-data d-flex align-center">
                                  <div class="pr-4">
                                    <v-icon>mdi-chevron-down</v-icon>
                                  </div>
                                  <div class="company-img">
                                    <img :src="require('@/assets/images/bids/greatplans.png')">
                                  </div>
                                  <div class="company-title text-left pl-4">
                                    <h4>Great Plains Oilfield Rental </h4>
                                    <p class="mb-0"><router-link to="">View Profile</router-link></p>
                                  </div>
                                </div>
                                <div class="add-company">
                                  <v-btn color="rgba(13, 150, 72, 0.1)" tile min-width="32px" height="32" class="pa-0" elevation="0"> <v-icon color="#0D9648">mdi-plus</v-icon></v-btn>
                                </div>
                              </div>
                              <div class="d-flex align-center justify-space-between list-company pa-4 pl-16">
                                <div class="comapny-data d-flex align-center">
                                  <div class="company-img">
                                    <img :src="require('@/assets/images/chat/chatUser.png')">
                                  </div>
                                  <div class="company-title text-left pl-4">
                                    <h4>Pat Hodges</h4>
                                    <p class="mb-0">Great Plains Oilfield Rental <router-link to="">View Profile</router-link></p>
                                  </div>
                                </div>
                                <div class="add-company">
                                  <v-btn color="rgba(13, 150, 72, 0.1)" tile min-width="32px" height="32" class="pa-0" elevation="0"> <v-icon color="#0D9648">mdi-plus</v-icon></v-btn>
                                </div>
                              </div>
                            </div>
                            
                          </div>
                          
                        </v-tab-item>
                      </v-tabs-items>
                    </v-col>
                    <v-col cols="12" sm="6" class="invited-data">
                      <div class="d-flex justify-space-between align-center pl-4 py-3 invited-head">
                        <div>
                          <h4 class="mb-0 black--text font-weight-bold">Invited Services Suppliers</h4>
                        </div>
                      </div>
                      <div>
                        <div class="companies-list">
                          <div class="d-flex align-center justify-space-between list-company pa-4">
                            <div class="comapny-data d-flex align-center">
                              <div class="company-img">
                                <img :src="require('@/assets/images/bids/greatplans.png')">
                              </div>
                              <div class="company-title text-left pl-4">
                                <h4>Great Plains Oilfield Rental </h4>
                                <p class="mb-0"><router-link to="">View Profile</router-link></p>
                              </div>
                            </div>
                            <div class="add-company">
                              <v-btn color="rgba(243, 35, 73, 0.1)" tile min-width="32px" height="32" class="pa-0" elevation="0"> <v-icon color="#F32349">mdi-minus</v-icon></v-btn>
                            </div>
                          </div>
                          <div class="d-flex align-center justify-space-between list-company pa-4">
                            <div class="comapny-data d-flex align-center">
                              <div class="company-img">
                                <img :src="require('@/assets/images/chat/chatUser.png')">
                              </div>
                              <div class="company-title text-left pl-4">
                                <h4>Pat Hodges</h4>
                                <p class="mb-0">Halli Burton <router-link to="">View Profile</router-link></p>
                              </div>
                            </div>
                            <div class="add-company">
                              <v-btn color="rgba(243, 35, 73, 0.1)" tile min-width="32px" height="32" class="pa-0" elevation="0"> <v-icon color="#F32349">mdi-minus</v-icon></v-btn>
                            </div>
                          </div>
                        </div>
                      </div>
                    </v-col>
                  </v-row>
                  <v-row justify="center" align="center" no-gutters>
                    <v-col cols="12" md="12">
                      <v-btn color="#0D9648" elevation="0" height="56px" width="220px" large class="white--text text-capitalize font-weight-bold mt-8 mb-8">Save Changes</v-btn>
                    </v-col>
                  </v-row>
                </v-tab-item>
                <v-tab-item
                  value="tab-3"
                >
                  <v-row class="my-4 supplier-row fill-height" no-gutters>
                    <v-col cols="12" sm="6" class="available-data">
                      <div class="d-flex justify-space-between align-center pl-4 supplier-head">
                        <div>
                          <h4 class="mb-0 black--text font-weight-bold">Invite Team Members</h4>
                        </div>
                        <div>
                          <v-tabs class="supplier-tabs" hide-slider v-model="inviteTeam">
                            <v-tab class="text-capitalize font-weight-bold" href="#inviteCompanyName" >Company Name</v-tab>
                            <v-tab class="text-capitalize font-weight-bold" href="#inviteSalesRep">Sales Rep</v-tab>
                            <v-tab class="text-capitalize font-weight-bold" href="#inviteServiceCategory">Service Category</v-tab>
                          </v-tabs>
                        </div>
                      </div>
                      
                      <v-tabs-items v-model="inviteTeam">
                        <v-tab-item value="inviteCompanyName">
                          <div class="available-search mt-5 px-4">
                            <div>
                              <v-text-field
                                type="text" hide-details
                                outlined
                                placeholder="Search"
                                prepend-inner-icon="mdi-magnify"
                              >
                              </v-text-field>
                            </div>
                          </div>
                          <div class="companies-list">
                            <div class="d-flex align-center justify-space-between list-company pa-4">
                              <div class="comapny-data d-flex align-center">
                                <div class="company-img">
                                  <img :src="require('@/assets/images/chat/chatUser.png')">
                                </div>
                                <div class="company-title text-left pl-4">
                                  <h4>Patrick Smith</h4>
                                  <p class="mb-0">Baker Hughes <router-link to="">View Profile</router-link></p>
                                </div>
                              </div>
                              <div class="add-company">
                                <v-btn color="rgba(13, 150, 72, 0.1)" tile min-width="32px" height="32" class="pa-0" elevation="0"> <v-icon color="#0D9648">mdi-plus</v-icon></v-btn>
                              </div>
                            </div>
                            <div class="d-flex align-center justify-space-between list-company pa-4 bg-light">
                              <div class="comapny-data d-flex align-center">
                                <div class="company-img">
                                  <img :src="require('@/assets/images/chat/chatUser.png')">
                                </div>
                                <div class="company-title text-left pl-4">
                                  <h4>Patrick Smith</h4>
                                  <p class="mb-0">Baker Hughes <router-link to="">View Profile</router-link></p>
                                </div>
                              </div>
                              <div class="add-company">
                                <v-btn color="rgba(13, 150, 72, 0.1)" tile min-width="32px" height="32" class="pa-0" elevation="0"> <v-icon color="#0D9648">mdi-plus</v-icon></v-btn>
                              </div>
                            </div>
                            <div class="d-flex align-center justify-space-between list-company pa-4">
                              <div class="comapny-data d-flex align-center">
                                <div class="company-img">
                                  <img :src="require('@/assets/images/chat/chatUser.png')">
                                </div>
                                <div class="company-title text-left pl-4">
                                  <h4>Patrick Smith</h4>
                                  <p class="mb-0">Baker Hughes <router-link to="">View Profile</router-link></p>
                                </div>
                              </div>
                              <div class="add-company">
                                <v-btn color="rgba(13, 150, 72, 0.1)" tile min-width="32px" height="32" class="pa-0" elevation="0"> <v-icon color="#0D9648">mdi-plus</v-icon></v-btn>
                              </div>
                            </div>
                          </div>
                        </v-tab-item>
                        <v-tab-item value="inviteSalesRep">
                          <div class="available-search mt-5 px-4">
                            <div>
                              <v-text-field
                                type="text" hide-details
                                outlined
                                placeholder="Search"
                                prepend-inner-icon="mdi-magnify"
                              >
                              </v-text-field>
                            </div>
                          </div>
                          <div class="companies-list">
                            <div class="d-flex align-center justify-space-between list-company pa-4">
                              <div class="comapny-data d-flex align-center">
                                <div class="company-img">
                                  <img :src="require('@/assets/images/chat/chatUser.png')">
                                </div>
                                <div class="company-title text-left pl-4">
                                  <h4>Patrick Smith</h4>
                                  <p class="mb-0">Baker Hughes <router-link to="">View Profile</router-link></p>
                                </div>
                              </div>
                              <div class="add-company">
                                <v-btn color="rgba(13, 150, 72, 0.1)" tile min-width="32px" height="32" class="pa-0" elevation="0"> <v-icon color="#0D9648">mdi-plus</v-icon></v-btn>
                              </div>
                            </div>
                            <div class="d-flex align-center justify-space-between list-company pa-4 bg-light">
                              <div class="comapny-data d-flex align-center">
                                <div class="company-img">
                                  <img :src="require('@/assets/images/chat/chatUser.png')">
                                </div>
                                <div class="company-title text-left pl-4">
                                  <h4>Pat Hodges</h4>
                                  <p class="mb-0">Halli Burton <router-link to="">View Profile</router-link></p>
                                </div>
                              </div>
                              <div class="add-company">
                                <v-btn color="rgba(13, 150, 72, 0.1)" tile min-width="32px" height="32" class="pa-0" elevation="0"> <v-icon color="#0D9648">mdi-plus</v-icon></v-btn>
                              </div>
                            </div>
                          </div>
                        </v-tab-item>
                        <v-tab-item value="inviteServiceCategory">
                          <div class="available-search  mt-5 px-4">
                            <div>
                              <v-text-field
                                type="text" hide-details
                                outlined
                                placeholder="Search"
                                prepend-inner-icon="mdi-magnify"
                              >
                              </v-text-field>
                            </div>
                          </div>
                          <div class="companies-list">
                            <div>
                              <div class="d-flex align-center justify-space-between list-company pa-4">
                                <div class="comapny-data d-flex align-center">
                                  <div class="pr-4">
                                    <v-icon>mdi-chevron-down</v-icon>
                                  </div>
                                  <div class="company-img">
                                    <img :src="require('@/assets/images/bids/patterson.png')">
                                  </div>
                                  <div class="company-title text-left pl-4">
                                    <h4>Patterson-UTI, Inc</h4>
                                    <p class="mb-0"><router-link to="">View Profile</router-link></p>
                                  </div>
                                </div>
                                <div class="add-company">
                                  <v-btn color="rgba(13, 150, 72, 0.1)" tile min-width="32px" height="32" class="pa-0" elevation="0"> <v-icon color="#0D9648">mdi-plus</v-icon></v-btn>
                                </div>
                              </div>
                              <div class="d-flex align-center justify-space-between list-company pa-4 pl-16">
                                <div class="comapny-data d-flex align-center">
                                  <div class="company-img">
                                    <img :src="require('@/assets/images/chat/chatUser.png')">
                                  </div>
                                  <div class="company-title text-left pl-4">
                                    <h4>Pat Hodges</h4>
                                    <p class="mb-0">Patterson-UTI<router-link to="">View Profile</router-link></p>
                                  </div>
                                </div>
                                <div class="add-company">
                                  <v-btn color="rgba(13, 150, 72, 0.1)" tile min-width="32px" height="32" class="pa-0" elevation="0"> <v-icon color="#0D9648">mdi-plus</v-icon></v-btn>
                                </div>
                              </div>
                            </div>
                            <div>
                              <div class="d-flex align-center justify-space-between list-company pa-4">
                                <div class="comapny-data d-flex align-center">
                                  <div class="pr-4">
                                    <v-icon>mdi-chevron-down</v-icon>
                                  </div>
                                  <div class="company-img">
                                    <img :src="require('@/assets/images/bids/greatplans.png')">
                                  </div>
                                  <div class="company-title text-left pl-4">
                                    <h4>Great Plains Oilfield Rental </h4>
                                    <p class="mb-0"><router-link to="">View Profile</router-link></p>
                                  </div>
                                </div>
                                <div class="add-company">
                                  <v-btn color="rgba(13, 150, 72, 0.1)" tile min-width="32px" height="32" class="pa-0" elevation="0"> <v-icon color="#0D9648">mdi-plus</v-icon></v-btn>
                                </div>
                              </div>
                              <div class="d-flex align-center justify-space-between list-company pa-4 pl-16">
                                <div class="comapny-data d-flex align-center">
                                  <div class="company-img">
                                    <img :src="require('@/assets/images/chat/chatUser.png')">
                                  </div>
                                  <div class="company-title text-left pl-4">
                                    <h4>Pat Hodges</h4>
                                    <p class="mb-0">Great Plains Oilfield Rental <router-link to="">View Profile</router-link></p>
                                  </div>
                                </div>
                                <div class="add-company">
                                  <v-btn color="rgba(13, 150, 72, 0.1)" tile min-width="32px" height="32" class="pa-0" elevation="0"> <v-icon color="#0D9648">mdi-plus</v-icon></v-btn>
                                </div>
                              </div>
                            </div>
                          </div>
                        </v-tab-item>
                      </v-tabs-items>
                    </v-col>
                    <v-col cols="12" sm="6" class="invited-data">
                      <div class="d-flex justify-space-between align-center pl-4 py-3 invited-head">
                        <div>
                          <h4 class="mb-0 black--text font-weight-bold">Added</h4>
                        </div>
                      </div>
                    </v-col>
                  </v-row>
                  <v-row justify="center" align="center" no-gutters>
                    <v-col cols="12" md="12">
                      <v-btn color="#0D9648" elevation="0" height="56px" width="220px" large class="white--text text-capitalize font-weight-bold mt-8 mb-8">Save Changes</v-btn>
                    </v-col>
                  </v-row>
                </v-tab-item>
                <v-tab-item
                  value="tab-4" class="bidline-tab"
                >
                  <div class="bidline-section">
                    <h4 class="text-left pl-6 font-weight-bold black--text my-4">Bid Line Items</h4>
                    <div class="bidline-list d-flex align-center px-6 my-2">
                      <div class="mt-6 mr-2">
                        <img :src="require('@/assets/images/bids/DotsSix.png')">
                      </div>
                      <div class="mr-2">
                        <label class="d-block input-label text-left">Line Item Description</label>
                        <v-text-field placeholder="Line Item Description" height="31pxx" single-line outlined type="text" hide-details>
                        </v-text-field>
                      </div>
                      <div class="mr-2">
                        <label class="d-block input-label text-left">Unit/Measure</label>
                        <v-select outlined hide-details :items="units"></v-select>
                      </div>
                      <div class="mr-2">
                        <label class="d-block input-label text-left">Input Type</label>
                        <v-select outlined hide-details :items="inputType"></v-select>
                      </div>
                      <div class="mr-2">
                        <label class="d-block input-label text-left">QTY</label>
                        <v-text-field placeholder="Line Item Description" height="31pxx" single-line outlined type="text" hide-details>
                        </v-text-field>
                      </div>
                      <div class="mr-2">
                        <label class="d-block input-label text-left">Buyer Comment</label>
                        <v-text-field placeholder="Line Item Description" height="31pxx" single-line outlined type="text" hide-details>
                        </v-text-field>
                      </div>
                      <div class="mr-2 d-flex">
                        <v-switch
                          v-model="switch1"
                          inset class="mr-4"
                        ></v-switch>
                        <v-icon color="#0D9648" class="mr-4">mdi-content-copy</v-icon>
                        <v-icon color="#F32349" class="mr-4">mdi-trash-can-outline</v-icon>
                      </div>
                    </div>
                    <div class="bidline-list d-flex align-center px-6 my-2">
                      <div class="mt-6 mr-2">
                        <img :src="require('@/assets/images/bids/DotsSix.png')">
                      </div>
                      <div class="mr-2">
                        <label class="d-block input-label text-left">Line Item Description</label>
                        <v-text-field placeholder="Line Item Description" height="31pxx" single-line outlined type="text" hide-details>
                        </v-text-field>
                      </div>
                      <div class="mr-2">
                        <label class="d-block input-label text-left">Unit/Measure</label>
                        <v-select outlined hide-details :items="units"></v-select>
                      </div>
                      <div class="mr-2">
                        <label class="d-block input-label text-left">Input Type</label>
                        <v-select outlined hide-details :items="inputType"></v-select>
                      </div>
                      <div class="mr-2">
                        <label class="d-block input-label text-left">QTY</label>
                        <v-text-field placeholder="Line Item Description" height="31pxx" single-line outlined type="text" hide-details>
                        </v-text-field>
                      </div>
                      <div class="mr-2">
                        <label class="d-block input-label text-left">Buyer Comment</label>
                        <v-text-field placeholder="Line Item Description" height="31pxx" single-line outlined type="text" hide-details>
                        </v-text-field>
                      </div>
                      <div class="mr-2 d-flex">
                        <v-switch
                          v-model="switch1"
                          inset class="mr-4"
                        ></v-switch>
                        <v-icon color="#0D9648" class="mr-4">mdi-content-copy</v-icon>
                        <v-icon color="#F32349" class="mr-4">mdi-trash-can-outline</v-icon>
                      </div>
                    </div>
                  </div>
                  <v-row justify="center" align="center" class="my-8" no-gutters>
                    <v-col cols="12">
                      <v-btn rounded color="rgba(13, 150, 72, 0.1)" elevation="0" class="text-capitalize font-weight-bold"><v-icon color="#0D9648" class="pr-2">mdi-plus</v-icon> Add 5 Line Items</v-btn>
                    </v-col>
                  </v-row>
                  <div class="bidline-section bid-list">
                    <h4 class="text-left pl-6 font-weight-bold black--text my-4">Bid Example</h4>
                    <div class="bidline-list d-flex align-center px-6 my-2">
                      <div class="mt-6 mr-2">
                        <img :src="require('@/assets/images/bids/DotsSix.png')">
                      </div>
                      <div class="mr-2">
                        <label class="d-block input-label text-left">Line Item Description</label>
                        <v-text-field placeholder="Line Item Description" height="31pxx" single-line outlined type="text" hide-details>
                        </v-text-field>
                      </div>
                      <div class="mr-2">
                        <label class="d-block input-label text-left">Unit/Measure</label>
                        <v-select outlined hide-details :items="units"></v-select>
                      </div>
                      <div class="mr-2">
                        <label class="d-block input-label text-left">Input Type</label>
                        <v-select outlined hide-details :items="inputType"></v-select>
                      </div>
                      <div class="mr-2">
                        <label class="d-block input-label text-left">QTY</label>
                        <v-text-field placeholder="Line Item Description" height="31pxx" single-line outlined type="text" hide-details>
                        </v-text-field>
                      </div>
                      <div class="mr-2">
                        <label class="d-block input-label text-left">Buyer Comment</label>
                        <v-text-field placeholder="Line Item Description" height="31pxx" single-line outlined type="text" hide-details>
                        </v-text-field>
                      </div>
                      <div class="mr-2 d-flex">
                        <v-switch
                          v-model="switch1"
                          inset class="mr-4"
                        ></v-switch>
                        <v-icon color="#0D9648" class="mr-4">mdi-content-copy</v-icon>
                        <v-icon color="#F32349" class="mr-4">mdi-trash-can-outline</v-icon>
                      </div>
                    </div>
                  </div>
                  <v-row justify="center" align="center" no-gutters class="mt-16">
                    <v-col cols="12">
                      <v-btn color="#0D9648" elevation="0" class="white--text text-capitalize font-weight-bold save-btn py-4 px-9" large height="56px">Save Changes</v-btn>
                    </v-col>
                  </v-row>
                </v-tab-item>
                <v-tab-item
                  value="tab-5" class="attachment-tab mt-5"
                >
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
                  <div class="row">
                    <v-col cols="9">
                      <div class="upload-attach">
                        <label for="uploadFile">
                          <v-file-input
                              label="File input"
                              filled
                              color="#fff" id="uploadFile"
                            ></v-file-input>
                        </label>
                      </div>
                    </v-col>
                    <v-col cols="3">
                      <v-btn large elevation="0" color="#0D9648" height="56px" class="white--text font-weight-bold text-capitalize py-4 px-9">Save Changes</v-btn>
                    </v-col>
                  </div>
                </v-tab-item>
              </v-tabs-items>
            </div>
          </div>
       </v-col>
     </v-row>
   </section>
</template>
<script>
  import Navbar from '../Layout/Navbar.vue'
  import LeftSidebar from '../Layout/Dashboard/LeftSidebar.vue'
  import RightSidebar from '../Layout/Dashboard/RightSidebar.vue'
  import { mapActions } from "vuex";
export default {
  name : "Dashboard",
  components: {
    Navbar,
    LeftSidebar,
    RightSidebar,
  },
  
  data() {
    return {
      users: '',
      templates: [
        {
          name: 'Water Transfer Bid - Egle Ford',
          type: 'RFI',
          createdDate: '06/01/2022',
          creator: 'Jennifer Hazelton',
          notes: 'This is Lewis’ primary water template used in the Eagle Ford, please only update mileage and date requested.',
        },
        {
          name: 'Wireline Services - Annual',
          type: 'RFP',
          createdDate: '03/10/2022',
          creator: 'John Jones',
          notes: '-',
        },
      ],
      currentItem: 'tab-Web',
      tabs: [
        { text: 'Bid Detail', icon: 'mdi-information-outline', value: 1 },
        { text: 'Supplier Invitation', icon: 'mdi-information-outline', value: 2}, 
        { text: 'Team Members', icon: 'mdi-information-outline', value: 3}, 
        { text: 'Line Items', icon: 'mdi-information-outline', value: 4}, 
        { text: 'Attachment', icon: 'mdi-information-outline', value: 5}, 
        { text: 'Questions', icon: 'mdi-information-outline', value: 6},
      ],
      qa: 'yes',
      showAdditional: false,
      bidType: ['RFP','RFI'],
      availableSearch: ['All','Company'],
      availableSuppl: null,
      inviteTeam: null,
      subCompany: false,
      switch1: true,
      inputType: ['USD','EUR'],
      units: ['Gallon','Liter'],
    };
  },
  computed:{
    showSideBar(){
        return this.$store.getters.g_sideBarOpen;
    },
    activityPanel(){
        return this.$store.getters.g_activityPanel;
    },
    userDatas(){
        return this.$store.getters.userInfo;
    },
  },
  methods: {
    
  },
  mounted() {
    document.title = "Create Bid - BidOut";
    this.users = JSON.parse(localStorage.getItem("userData")).user;
}
};
</script>
<style scoped lang="scss">

</style>
