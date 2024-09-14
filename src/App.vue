<template>
  <v-app id="inspire">
    <v-app-bar class="bg-secondary" flat>
      <v-container class="mx-auto d-flex align-center justify-center">
        <!-- Drawer Icon: Visible only on small screens -->
        <v-app-bar-nav-icon class="d-sm-none" variant="text" @click.stop="drawer = !drawer" />

        <v-avatar
          class="me-4"
          color="grey-darken-1"
          :image="woxomBotImage"
          size="42"
        />
        <div class="text-h6">Health & Tech, Together</div>
        <v-spacer />

        <!-- Links: Visible only on medium and larger screens -->
        <div class="d-none d-sm-flex">
          <v-btn
            v-for="link in links"
            :key="link.path"
            class="text-none"
            text=""
            :to="link.path"
            variant="text"
          >
            {{ link.name }}
          </v-btn>
        </div>
      </v-container>
    </v-app-bar>

    <!-- Navigation Drawer: Visible on small screens only -->
    <v-navigation-drawer v-model="drawer" class="bg-secondary" temporary>
      <v-list density="compact" nav>
        <v-list-item
          v-for="link in links"
          :key="link.path"
          :to="link.path"
        >
          <v-list-item-content>
            <v-list-item-title>{{ link.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>

    <!-- Include the Chat Bot Component -->
    <ChatBot />

    <div class="position-fixed bottom-0 start-0 ma-6" style="z-index: 10;">
      <v-tooltip text="Page updated Nov 7, 2023 Report abuse">
        <template
          #activator="{ props }"
        >
          <v-btn
            density="comfortable"
            icon="mdi-information"
            v-bind="props"
            variant="tonal"
          />
        </template>
      </v-tooltip>
    </div>
  </v-app>
</template>

<script lang="ts">
  // ** Composables
  import { ref } from 'vue'

  // ** Components
  import ChatBot from '../src/components/ChatBot.vue' // Import the ChatBot component

  // ** Assets
  import woxomBotImage from '@/assets/woxom_bot.png' // Use alias for image path

  // ** Code
  export default {
    components: {
      ChatBot,
    },
    setup () {
      const drawer = ref(false)
      const links = [
        { name: 'Home', path: '/' },
        { name: 'Health', path: '/health' },
        { name: 'Life', path: '/life' },
        { name: 'Supplemental', path: '/supplemental' },
        { name: 'About', path: '/about' },
      ]

      return {
        links,
        drawer,

        woxomBotImage,
      };
    },
  };
</script>
