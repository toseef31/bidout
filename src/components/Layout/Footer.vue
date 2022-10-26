<template>
  <v-footer
    color="transparent" class="footer-module"
  >
    <div class="footer-overlay"></div>
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
          <!-- <p class="mb-0"><font color="#0D9647">Bid</font><font color="#fff">Out</font>. Inc &copy; {{ new Date().getFullYear() }}</p> -->
          <p class="my-7">The Leading Oil & Gas Procurement Platform</p>
          <div class="mb-10">
            <v-btn color="#747B89" height="40px" min-width="40px" href="https://www.linkedin.com/company/bidout/" target="_blank" class="rounded-0 pa-0 mr-3"
              >
             <v-icon>fab fa-linkedin-in</v-icon>
            </v-btn>
            <v-btn color="#747B89" height="40px" min-width="40px" href="https://www.facebook.com/bidoutapp" target="_blank" class="rounded-0 pa-0"
              >
             <v-icon>fab fa-facebook-f</v-icon>
            </v-btn>
            
          </div>
          <p class="mt-10 made-by">Proudly Made in Texas</p>
        </div>
      </v-col>
      <v-col
        class="py-4 text-left white--text"
        cols="12" md="3"
      >
        <div class="second-col">
          <a href="https://bidout.app" class="text-decoration-none"><h4 class="text-uppercase mb-6">Home</h4></a>
          <h4 class="text-uppercase mb-2">Product</h4>
          <div class="footer-menu">
            <v-list>
              <a href="https://bidout.app/rfx-procurement-platform/" class="text-decoration-none white--text"><v-list-item-title>RFx Procurement Platform</v-list-item-title></a>
            </v-list>
            <v-list>
              <router-link to="/" class="text-decoration-none white--text"><v-list-item-title>OFS Provider Directory</v-list-item-title></router-link>
            </v-list>
            <v-list>
              <a href="https://bidout.app/3-bids-a-buy/" class="text-decoration-none white--text"><v-list-item-title>3-Bid & A Buy</v-list-item-title></a>
            </v-list>
            <v-divider></v-divider>
            <v-list class="pt-7">
              <a href="https://bidout.app/pricing/" class="text-decoration-none white--text"><v-list-item-title>Pricing</v-list-item-title></a>
            </v-list>
          </div>
        </div>
      </v-col>
      <v-col
        class="py-4 text-left white--text"
        cols="12" md="2"
      >
        <div class="second-col">
          <!-- <h4 class="text-uppercase mb-6">Information</h4> -->
          <div class="footer-menu">
            <v-list>
              <a href="https://bidout.app/about-bidout/" class="text-decoration-none white--text"><v-list-item-title>About BidOut</v-list-item-title></a>
            </v-list>
            <v-list>
              <a to="https://bidout.app/news/" class="text-decoration-none white--text"><v-list-item-title>News Releases</v-list-item-title></a>
            </v-list>
            <v-list>
              <a href="https://www.linkedin.com/company/bidout/jobs" target="_blank" class="text-decoration-none white--text"><v-list-item-title>Careers</v-list-item-title></a>
            </v-list>
            <v-divider></v-divider>
            <v-list class="pt-7">
              <router-link to="/get-started" class="text-decoration-none white--text"><v-list-item-title>Get Started</v-list-item-title></router-link>
            </v-list>
            <v-list>
              <router-link to="/login" class="text-decoration-none white--text"><v-list-item-title>Login</v-list-item-title></router-link>
            </v-list>
            <v-divider></v-divider>
            <v-list class="pt-7">
              <a href="https://bidout.app/privacy-policy/" class="text-decoration-none white--text"><v-list-item-title>Privacy Policy</v-list-item-title></a>
            </v-list>
          </div>
        </div>
      </v-col>
      <v-col
        class="py-4 text-left white--text"
        cols="12" md="2"
      >
        <div class="second-col">
          <h4 class="text-uppercase pl-1 mb-6">Contact Us</h4>
          <div class="d-flex light-text align-center">
            <v-icon color="#ffffff">mdi-map-marker-outline</v-icon>
            <h5 class="text-uppercase pl-3 sub-heading white--text">Address</h5>
          </div>
            <a href="https://g.page/cannoncommunity" class="white--text text-decoration-none"><p class="pl-9">1334 Brittmoore Road <br>Suite 1000B <br>Houston, Texas 77043</p></a>
            <div class="d-flex light-text align-center">
              <v-icon color="#ffffff">mdi-phone-outline</v-icon>
              <h5 class="text-uppercase pl-3 sub-heading white--text">Call Us</h5>
            </div>
            <a href="tel:8327862400" class="white--text text-decoration-none"><p class="pl-9 phone">832-786-2400</p></a>
        </div>
      </v-col>
      <v-col
        class="py-4 text-left white--text"
        cols="12" md="2"
      >
        <div class="second-col last-col">
          <div class="d-flex light-text align-center">
            <v-icon color="#ffffff">mdi-email-outline</v-icon>
            <h5 class="text-uppercase pl-3 sub-heading white--text">General Inquiries</h5>
          </div>
            <a href="mailto:hello@bidout.app" class="text-decoration-none white--text pl-9">hello@bidout.app</a>
            <div class="d-flex light-text align-center mt-6">
              <v-icon color="#ffffff">mdi-email-outline</v-icon>
              <h5 class="text-uppercase pl-3 sub-heading white--text">Sales Inquiries</h5>
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