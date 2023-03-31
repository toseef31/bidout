<template>
    <v-row justify="center">
        <v-col cols="12" md="10">
            <div class="alert-section mb-5">
                <v-img :src="require('@/assets/images/getStarted/confirm.png')" max-width="120px"
                    class="mx-auto mb-8"></v-img>
                <h1 class=" mt-16 alert-title">Congratulations!</h1>
                <h1 class="alert-sub-title mt-1">Your account at BidOut is now setup, we will log you in to our Dashboard in
                    3
                    seconds. </h1>

                <div class="confirm-box pt-5">
                    <h1 class="font-weight-medium">If you are not automatically redirected, click here</h1>
                    <div class="mt-6">
                        <v-btn color="#0D9647" large dense height="56" class="font-weight-bold white--text text-capitalize"
                            @click="loginRequest">Access BidOut Dashboard <v-icon class="pl-2"
                                color="#fff">mdi-arrow-right-circle</v-icon></v-btn>
                    </div>
                </div>
            </div>
        </v-col>
    </v-row>
</template>

<style lang="scss"></style>
