<template>
  <div>
    <v-row class="mt-4 bid-chat-row fill-height" no-gutters>
      <v-col cols="12" sm="5" class="available-data pt-6">
        <v-row class="pl-6" align="center">
          <v-col>
            <v-text-field
              type="text"
              color="#b8b8b8"
              hide-details
              solo
              flat
              placeholder="Search..."
              prepend-inner-icon="mdi-magnify"
              v-model="companySearch"
            >
            </v-text-field>
          </v-col>
          <v-sheet
            class="pa-2 setting mr-7"
            style="background-color: rgba(13, 150, 72, 0.1)"
          >
            <v-icon color="#0D9648"> mdi-plus</v-icon>
          </v-sheet>
        </v-row>

        <div class="companies-list pt-8">
          <div
            class="d-flex align-center list-company px-8 py-6"
            v-for="n in 5"
            :tabindex="n"
          >
            <div class="d-flex align-center">
              <div class="company-img">
                <img :src="require('@/assets/images/bids/patterson.png')" />
              </div>
              <div class="company-title text-left pl-4">
                <h4>Hey Company</h4>
                <p class="mb-0">
                  <a href="#" class="text-decoration-underline">View Profile</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </v-col>
      <v-col cols="12" sm="7">
        <div class="message-area">
          <!-- Message Header -->
          <div class="msg-header px-5 pb-5">
            <v-row align="center">
              <v-col cols="12" md="6">
                <div class="company-title text-left">
                  <h4>Hey Company</h4>
                  <p class="mb-0">
                    <a href="#" class="text-decoration-underline"
                      >View Profile</a
                    >
                  </p>
                </div>
              </v-col>
              <v-col cols="12" md="6">
                <div class="msg-options d-flex mt-2 justify-end">
                  <div class="search">
                    <v-text-field
                      v-model="searchMessage"
                      type="text"
                      align-center
                      outlined
                      class="pt-0 mt-0"
                      placeholder="Search this conversation"
                    >
                      <template v-slot:prepend>
                        <v-icon>mdi-magnify</v-icon>
                      </template>
                    </v-text-field>
                  </div>
                  <div class="toggle-btn ml-5">
                    <v-btn fab small color="#0d964814" class="active-btn">
                      <v-icon dark> mdi-dots-horizontal </v-icon>
                    </v-btn>
                  </div>
                </div>
              </v-col>
            </v-row>
          </div>

          <div class="message-send-area px-5 pt-5">
            <span class="fileName" v-if="filename">{{ filename }}</span>
            <v-row>
              <v-col cols="12" sm="10" md="10">
                <div class="msg-text-box">
                  <v-textarea
                    solo
                    name="input-7-4"
                    placeholder="Message here ..."
                    rows="3"
                    v-model="message"
                  ></v-textarea>
                </div>
              </v-col>
              <v-col cols="12" sm="2" md="2">
                <div class="msg-send-btn">
                  <v-btn block tile height="43px" color="#0D9648">Send</v-btn>
                  <label
                    for="attach-file"
                    class="mt-2 attach-btn d-flex justify-center align-center"
                  >
                    <input
                      id="attach-file"
                      type="file"
                      class="d-none"
                      truncate-length="8"
                      ref="msgFile"
                    />
                    <v-img
                      :src="require('@/assets/images/chat/attach.png')"
                      max-width="28px"
                      height="32px"
                    ></v-img>
                  </label>
                </div>
              </v-col>
            </v-row>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  computed: {},
  methods: {},

  mounted() {},
};
</script>
