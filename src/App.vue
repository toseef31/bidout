<template>
  <router-view />
</template>

<script>
  
export default {
  name: 'Settings',
  
  metaInfo:{
    title: 'BidOut – Oil & Gas Procurement Platform',
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
