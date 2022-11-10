<template>
  <v-col class="my-7 pa-0 qanda-section" align="start">
    <div class="px-6">
      <span class="title-detail">Unanswered questions</span>

      <v-avatar rounded size="35" color="#0D9648" class="ml-4">
        <span class="white--text badge">2</span>
      </v-avatar>

      <v-expansion-panels accordion multiple>
        <v-expansion-panel v-for="(item, i) in 2" :key="i">
          <v-expansion-panel-header>
            <template v-slot:actions>
              <v-col align="center">
                <span class="icon-desc">Open to replay</span
                ><v-icon> $expand </v-icon></v-col
              >
            </template>
            <template v-slot:default="{ open }">
              <div class="header d-flex flex-column">
                <span>Question:</span>

                <span class="sub-title mt-1"
                  >Is this bid suppouse to include shipping code?</span
                >

                <span class="sub-title mt-4"
                  >By Randall Smith (Baker Hughes)</span
                >
                <span class="sub-title mt-1">08/22/2022 - 1:19pm</span>
              </div>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-textarea
              placeholder="Answer here..."
              single-line
              outlined
              type="text"
              v-model="bidDescriptions"
            >
            </v-textarea>

            <div class="text-center">
              <v-btn
                color="#0D9648"
                height="32"
                class="text-capitalize white--text font-weight-bold save-button px-12"
                @click="changeTab"
                large
                >Replay</v-btn
              >
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

      <div class="title-detail mt-6">Answer questions</div>

      <div class="header d-flex flex-column pt-4">
        <span>Question:</span>

        <span class="sub-title mt-1"
          >Is this bid suppouse to include shipping code?</span
        >

        <span class="sub-title mt-4">By Randall Smith (Baker Hughes)</span>
        <span class="sub-title mt-1">08/22/2022 - 1:19pm</span>
      </div>

      <div class="header d-flex flex-column pt-4">
        <span>Answer:</span>

        <span class="sub-title mt-1"
          >Yes, this would be all-inclusive on the bid.</span
        >

        <span class="sub-title mt-4">By Rodney Giles (Patterson-UTI) </span>
        <span class="sub-title mt-1">08/22/2022 - 2:09pm</span>
      </div>
    </div>
  </v-col>
</template>

<script></script>
