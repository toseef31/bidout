<template>
  <v-footer
    color="#010603" class="footer-module"
  >
    <v-row
      justify="center"
    >
      <v-col
        class="py-4 text-left white--text"
        cols="12" md="3"
      >
        <div class="first-col">
          <div class="footer-logo">
            <img :src="require('@/assets/images/green-white.png')">
          </div>
          <p class="mb-0"><font color="#0D9647">Bid</font><font color="#fff">Out</font>. Inc &copy; {{ new Date().getFullYear() }}</p>
          <p class="text-uppercase mb-5">All Rights Reserved</p>
          <p class="mt-10 made-by">Proudly Made in Texas</p>
        </div>
      </v-col>
      <v-col
        class="py-4 text-left white--text"
        cols="12" md="3"
      >
        <div class="second-col">
          <h4 class="text-uppercase pl-2 mb-6">Information</h4>
          <div class="footer-menu">
            <v-list>
              <a href="https://bidout.app" class="text-decoration-none white--text"><v-list-item-title>Home</v-list-item-title></a>
            </v-list>
            <v-list>
              <router-link to="/login" class="text-decoration-none white--text"><v-list-item-title>Login</v-list-item-title></router-link>
            </v-list>
            <v-list>
              <a href="https://bidoutapp.com/faq/" class="text-decoration-none white--text"><v-list-item-title>FAQ</v-list-item-title></a>
            </v-list>
            <v-divider></v-divider>
            <v-list class="pt-7">
              <router-link to="/get-started" class="text-decoration-none white--text"><v-list-item-title>Get Started</v-list-item-title></router-link>
            </v-list>
            <v-list>
              <a href="https://bidout.app/privacy-policy/" class="text-decoration-none white--text"><v-list-item-title>Privacy Policy</v-list-item-title></a>
            </v-list>
          </div>
        </div>
      </v-col>
      <v-col
        class="py-4 text-left white--text"
        cols="12" md="3"
      >
        <div class="second-col">
          <h4 class="text-uppercase pl-2 mb-6">Contact Us</h4>
          <div class="d-flex light-text align-center">
            <v-icon color="#747474">mdi-map-marker-outline</v-icon>
            <h5 class="text-uppercase pl-3 sub-heading">Our Office</h5>
          </div>
            <a href="https://g.page/cannoncommunity" class="white--text text-decoration-none"><p class="pl-9">1334 Brittmoore Road <br>Suite 1000B <br>Houston, Texas 77043</p></a>
            <div class="d-flex light-text align-center">
              <v-icon color="#747474">mdi-phone-outline</v-icon>
              <h5 class="text-uppercase pl-3 sub-heading">Call Us</h5>
            </div>
            <a href="tel:8327862400" class="white--text text-decoration-none"><p class="pl-9 phone">832-786-2400</p></a>
        </div>
      </v-col>
      <v-col
        class="py-4 text-left white--text"
        cols="12" md="3"
      >
        <div class="second-col last-col">
          <div class="d-flex light-text align-center">
            <v-icon color="#747474">mdi-email-outline</v-icon>
            <h5 class="text-uppercase pl-3 sub-heading">General Inquiries</h5>
          </div>
            <a href="mailto:hello@bidout.app" class="text-decoration-none white--text pl-9">hello@bidout.app</a>
            <div class="d-flex light-text align-center mt-6">
              <v-icon color="#747474">mdi-email-outline</v-icon>
              <h5 class="text-uppercase pl-3 sub-heading">Sales Inquiries</h5>
            </div>
            <a href="mailto:sales@bidout.app" class="text-decoration-none white--text pl-9">sales@bidout.app</a>
        </div>
      </v-col>
    </v-row>
  </v-footer>
</template>
<script>
  export default {
    data: () => ({
      links: [
        'Home',
        'About Us',
        'Team',
        'Services',
        'Blog',
        'Contact Us',
      ],
    }),
  }
</script>