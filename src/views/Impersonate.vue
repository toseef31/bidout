<template>
  <div class=""></div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Impersonate',
  methods: {
    ...mapActions(['signInWithCustomToken']),
  },
  async created() {
    await this.signInWithCustomToken(this.$route.query.token);
  },
};
</script>

<style>

</style>
