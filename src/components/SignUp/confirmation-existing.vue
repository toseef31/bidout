<template>
    <v-row justify="center">
        <v-col cols="12" md="10">
            <div class="alert-section mb-5 mt-14">
                <v-img :src="require('@/assets/images/getStarted/warning.png')" max-width="120px"
                    class="mx-auto mb-8"></v-img>
                <p class="existing-title">An existing account already exists for <strong>{{ companyName }}</strong>.</p>
                <p class="existing-title">A notification has been sent to the Administrator on the account to approve your
                    access request. For immediate assistance, please reach out your team members at Patterson-UTI which
                    include: <strong v-for="(admins,index) in companyAdmins" :key="index">{{admins.firstName}} {{admins.lastName}}<span v-if="index < companyAdmins.length - 1">, </span></strong>.</p>
            </div>
        </v-col>
    </v-row>
</template>

<script>

export default {
  computed: {
    companyName() {
      return this.$store.getters.companyName;
    },
    companyAdmins() {
      return this.$store.getters.admins;
    },
  },
  mounted() {
    document.title = 'Existing Account - BidOut';
  },
};
</script>
<style lang="scss"></style>
