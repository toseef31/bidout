<template>
  <v-col class="pa-0 pb-3 audit-tab fill-height" align="start">
    <!-- <div class="title-detail px-6 title-border">Activity</div> -->

    <!-- <v-list>
      <v-list-item-group
        v-model="selected"
        active-class="success--text"
        multiple
      >
        <template v-for="(item, index) in itemsActive">
          <v-list-item :key="item.title" class="py-1">
            <template v-slot:default="{ active }">
              <v-list-item-avatar>
                <v-icon
                  v-text="item.icon"
                  :class="[
                    item.color ? 'icon-color' : '',
                    !item.color ? 'default-color' : '',
                    'notification-icon',
                  ]"
                >
                </v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
              </v-list-item-content>

              <v-list-item-action>
                <v-list-item-action-text
                  v-text="item.action"
                ></v-list-item-action-text>
              </v-list-item-action>
            </template>
          </v-list-item>

          <v-divider
            v-if="index < itemsActive.length - 1"
            :key="index"
          ></v-divider>
        </template>
      </v-list-item-group>
    </v-list> -->
    <div class="text-center a-title-detail">Audit Trail Data is Currently Being Collected</div>
  </v-col>
</template>

<script>
export default {
  data() {
    return {
      selected: [2],
      itemsActive: [
        {
          action: '12min',
          title: 'Laura sent you new messages.',
          icon: 'mdi-email-outline',
          color: true,
        },
        {
          action: '32min',
          title: 'Aubrey sent you a new message.',
          icon: 'mdi-email-outline',
          color: true,
        },
        {
          action: '1hr',
          title: 'Laura sent you new messages.',
          icon: 'mdi-email-outline',
          color: false,
        },
        {
          action: '1d',
          title: 'Your bid Water Job was created.',
          icon: 'mdi-check',
          color: false,
        },
        {
          action: '1d',
          title: 'Your bid Water Job was created.',
          icon: 'mdi-check',
          color: false,
        },
        {
          action: '1d',
          title: 'Peter sent you new messages.',
          icon: 'mdi-email-outline',
          color: false,
        },
        {
          action: '1d',
          title: 'Your bid Water Job was created.',
          icon: 'mdi-check',
          color: false,
        },
        {
          action: '1d',
          title: 'Your bid Water Job was created.',
          icon: 'mdi-check',
          color: false,
        },
        {
          action: '1d',
          title: 'Your bid Water Job was created.',
          icon: 'mdi-check',
          color: false,
        },
        {
          action: '1d',
          title: 'Your bid Water Job was created.',
          icon: 'mdi-check',
          color: false,
        },
        {
          action: '1d',
          title: 'Your bid Water Job was created.',
          icon: 'mdi-check',
          color: false,
        },
        {
          action: '1d',
          title: 'Your bid Water Job was created.',
          icon: 'mdi-check',
          color: false,
        },
      ],
    };
  },
};
</script>
