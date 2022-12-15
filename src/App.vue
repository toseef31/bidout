<template>
  <router-view />
</template>

<script>
export default {
  name: 'Settings',
  metaInfo: {
    // title: 'BidOut – Oil & Gas Procurement Platform',
    meta: [
      {
        vmid: 'title',
        name: 'title',
        content: 'BidOut – Oil & Gas Procurement Platform',
      },
      {
        vmid: 'description',
        name: 'description',
        content: 'BidOut is the leading oil & gas procurement platform with offices based in Houston, TX.',
      },
    ],

  },
  data() {
    return {
      timer: null,
    };
  },
  mounted() {
    this.timer = setInterval(() => {
      this.$store.dispatch('refreshToken');
    }, 3480000);
    window.addEventListener('beforeunload', () => { 
      localStorage.setItem('userData', JSON.stringify(this.$store.state.auth.userInfo)); 
    });
    window.addEventListener('load', (event) => {
      this.$store.state.auth.userInfo = JSON.parse(localStorage.getItem('userData'));
      localStorage.removeItem('userData');
    });
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
};
</script>
<style lang="scss">
#app {
  font-family: 'Mulish', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #0D1139;
}
body{
  color: #0D1139 !important;
  a{
    color: #0D1139 !important;
  }
}

</style>
